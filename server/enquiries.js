import 'dotenv/config';
import express from 'express';
import { randomUUID, timingSafeEqual } from 'node:crypto';
import pg from 'pg';

const { Pool } = pg;
const allowedServices = new Set([
  'Shopify Development',
  'Website Development',
  'App Development',
  'SEO Services',
  'Digital Marketing',
  'UI/UX Design',
  'Custom Software Development',
  'Cloud Solutions',
  'IT Consulting',
  'Other',
]);
const enquiryStatuses = new Set(['New', 'Contacted', 'In Progress', 'Completed']);
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMax = 5;
const rateLimitMaxEntries = 20_000;
const failedAdminLoginLimit = 10;
const publicRateLimit = new Map();
const failedAdminLogins = new Map();
let lastRateLimitCleanup = 0;
let pool;
let schemaPromise;
let emailWorker;

function getPool() {
  if (!process.env.DATABASE_URL?.trim()) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
    pool.on('error', (error) => console.error('Unexpected PostgreSQL pool error:', error.message));
  }
  return pool;
}

export async function initializeEnquiryDatabase() {
  const database = getPool();
  if (!database) return false;
  if (!schemaPromise) {
    schemaPromise = database.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id UUID PRIMARY KEY,
        idempotency_key UUID NOT NULL UNIQUE,
        full_name VARCHAR(120) NOT NULL,
        email VARCHAR(254) NOT NULL,
        phone VARCHAR(32) NOT NULL,
        company VARCHAR(120) NOT NULL DEFAULT '',
        service VARCHAR(80) NOT NULL,
        budget VARCHAR(80) NOT NULL DEFAULT '',
        project_details TEXT NOT NULL,
        privacy_consent BOOLEAN NOT NULL DEFAULT FALSE,
        status VARCHAR(20) NOT NULL DEFAULT 'New'
          CHECK (status IN ('New', 'Contacted', 'In Progress', 'Completed')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
      CREATE INDEX IF NOT EXISTS enquiries_service_idx ON enquiries (service);
      CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);

      CREATE TABLE IF NOT EXISTS enquiry_email_outbox (
        id BIGSERIAL PRIMARY KEY,
        enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
        kind VARCHAR(16) NOT NULL CHECK (kind IN ('admin', 'customer')),
        payload JSONB NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        available_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        locked_at TIMESTAMPTZ,
        sent_at TIMESTAMPTZ,
        failed_at TIMESTAMPTZ,
        last_error TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (enquiry_id, kind)
      );
      CREATE INDEX IF NOT EXISTS enquiry_email_outbox_pending_idx
        ON enquiry_email_outbox (available_at, created_at)
        WHERE sent_at IS NULL AND failed_at IS NULL;
    `).then(() => true).catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}

function cleanText(value) {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
    : '';
}

function validateEnquiry(body = {}) {
  const fullName = cleanText(body.fullName ?? body.name);
  const email = cleanText(body.email).toLowerCase();
  const phone = cleanText(body.phone ?? body.contactNumber);
  const company = cleanText(body.company);
  const service = cleanText(body.service);
  const budget = cleanText(body.budget);
  const projectDetails = cleanText(body.projectDetails ?? body.message);
  const normalizedPhone = phone.replace(/[\s().-]/g, '');
  const idempotencyKey = cleanText(body.idempotencyKey);

  if (fullName.length < 2) return { error: 'Enter your full name.', field: 'fullName' };
  if (fullName.length > 120 || email.length > 254 || phone.length > 32 || company.length > 120 || service.length > 80 || budget.length > 80) {
    return { error: 'One or more fields exceed the allowed length.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid email address.', field: 'email' };
  if (!/^\+?[0-9]{7,20}$/.test(normalizedPhone)) return { error: 'Enter a valid phone number.', field: 'phone' };
  if (!allowedServices.has(service)) return { error: 'Select a service from the list.', field: 'service' };
  if (projectDetails.length < 10) return { error: 'Add a little more detail about your project.', field: 'projectDetails' };
  if (projectDetails.length > 4000) return { error: 'Project details must be 4,000 characters or fewer.', field: 'projectDetails' };
  if (body.privacyConsent !== true && body.consent !== true) {
    return { error: 'Consent is required before sending your enquiry.', field: 'privacyConsent' };
  }
  if (body.website) return { error: 'Your enquiry could not be accepted.' };
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idempotencyKey)) {
    return { error: 'Refresh the page and try submitting again.' };
  }

  return {
    enquiry: {
      id: randomUUID(),
      idempotencyKey,
      fullName,
      email,
      phone: normalizedPhone,
      company,
      service,
      budget,
      projectDetails,
      privacyConsent: true,
    },
  };
}

function hasEmailConfiguration() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim()
    && process.env.ADMIN_EMAIL?.trim()
    && process.env.EMAIL_FROM?.trim(),
  );
}

function hasAdminConfiguration() {
  return Boolean(
    process.env.ADMIN_USERNAME?.trim()
    && process.env.ADMIN_PASSWORD
    && process.env.ADMIN_PASSWORD.length >= 16,
  );
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function formatSubmissionDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'long',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

export function createEmailMessages(enquiry, submittedAt, { from, adminEmail }) {
  const rows = [
    ['Customer Name', enquiry.fullName],
    ['Customer Email', enquiry.email],
    ['Contact Number', enquiry.phone],
    ['Company Name', enquiry.company || 'Not provided'],
    ['Selected Service', enquiry.service],
    ['Estimated Budget', enquiry.budget || 'Not provided'],
    ['Project Description', enquiry.projectDetails],
    ['Submission Date & Time', formatSubmissionDate(submittedAt)],
  ];
  const detailsText = rows.map(([label, value]) => `${label}:\n${value}`).join('\n\n');
  const detailsHtml = rows.map(([label, value]) => (
    `<tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e8eef7;color:#52637d;vertical-align:top">${escapeHtml(label)}</th>`
    + `<td style="padding:10px 12px;border-bottom:1px solid #e8eef7;color:#142544;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
  )).join('');
  const adminSubject = 'New Project Inquiry – TechBerry';
  const customerSubject = 'We Have Received Your Project Inquiry – TechBerry';
  const customerMessage = "Thank you for reaching out to TechBerry! We've successfully received your project inquiry. Our team will review your requirements and get back to you soon.";

  return [
    {
      kind: 'admin',
      from,
      to: adminEmail,
      subject: adminSubject,
      text: `A new project inquiry has been received.\n\n${detailsText}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#142544"><h1 style="font-size:22px">New Project Inquiry</h1><p>A new inquiry was submitted through the TechBerry website.</p><table style="width:100%;border-collapse:collapse">${detailsHtml}</table></div>`,
    },
    {
      kind: 'customer',
      from,
      to: enquiry.email,
      subject: customerSubject,
      text: customerMessage,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#142544"><h1 style="font-size:22px">Thank you for reaching out to TechBerry!</h1><p>${escapeHtml(customerMessage)}</p><p style="color:#52637d">TechBerry — Beyond Technology. Into Tomorrow.</p></div>`,
    },
  ];
}

function sameOrigin(req) {
  const origin = req.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === req.get('host');
  } catch {
    return false;
  }
}

function enforcePublicRateLimit(req, res, next) {
  const now = Date.now();
  if (now - lastRateLimitCleanup > rateLimitWindowMs) {
    for (const [ip, record] of publicRateLimit) {
      if (record.resetAt <= now) publicRateLimit.delete(ip);
    }
    lastRateLimitCleanup = now;
  }

  const ip = req.ip;
  const record = publicRateLimit.get(ip);
  if (!record || record.resetAt <= now) {
    if (publicRateLimit.size >= rateLimitMaxEntries) {
      publicRateLimit.delete(publicRateLimit.keys().next().value);
    }
    publicRateLimit.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return next();
  }
  if (record.count >= rateLimitMax) {
    res.set('Retry-After', String(Math.ceil((record.resetAt - now) / 1000)));
    return res.status(429).json({ error: 'Too many enquiries. Please try again later.' });
  }
  record.count += 1;
  return next();
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function requireAdmin(req, res, next) {
  if (!hasAdminConfiguration()) {
    return res.status(503).json({ error: 'Admin access is not configured on this server.' });
  }
  const now = Date.now();
  const ip = req.ip;
  const attempts = failedAdminLogins.get(ip);
  if (attempts && attempts.resetAt > now && attempts.count >= failedAdminLoginLimit) {
    res.set('Retry-After', String(Math.ceil((attempts.resetAt - now) / 1000)));
    return res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
  }

  const authorization = req.get('authorization') || '';
  const match = authorization.match(/^Basic ([A-Za-z0-9+/]+=*)$/);
  let username = '';
  let password = '';
  if (match) {
    const decoded = Buffer.from(match[1], 'base64').toString('utf8');
    const separator = decoded.indexOf(':');
    if (separator >= 0) {
      username = decoded.slice(0, separator);
      password = decoded.slice(separator + 1);
    }
  }

  const authorized = safeEqual(username, process.env.ADMIN_USERNAME) && safeEqual(password, process.env.ADMIN_PASSWORD);
  if (!authorized) {
    failedAdminLogins.set(ip, {
      count: attempts?.resetAt > now ? attempts.count + 1 : 1,
      resetAt: attempts?.resetAt > now ? attempts.resetAt : now + rateLimitWindowMs,
    });
    return res.status(401).json({ error: 'Enter valid administrator credentials.' });
  }

  failedAdminLogins.delete(ip);
  res.set('Cache-Control', 'no-store');
  return next();
}

async function requireDatabase(_req, res, next) {
  if (!getPool()) {
    return res.status(503).json({ error: 'Enquiry storage is not configured on this server.' });
  }
  try {
    await initializeEnquiryDatabase();
    return next();
  } catch (error) {
    console.error('Enquiry database is unavailable:', error.message);
    return res.status(503).json({ error: 'Enquiry storage is temporarily unavailable. Please try again later.' });
  }
}

function enqueueEmailRows(client, enquiryId, messages) {
  const query = 'INSERT INTO enquiry_email_outbox (enquiry_id, kind, payload) VALUES ($1, $2, $3::jsonb)';
  return Promise.all(messages.map((message) => client.query(query, [
    enquiryId,
    message.kind,
    JSON.stringify(message),
  ])));
}

async function claimEmail() {
  const database = getPool();
  const client = await database.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(`
      WITH next_email AS (
        SELECT id
        FROM enquiry_email_outbox
        WHERE sent_at IS NULL AND failed_at IS NULL
          AND available_at <= NOW()
          AND (locked_at IS NULL OR locked_at < NOW() - INTERVAL '2 minutes')
        ORDER BY created_at ASC
        FOR UPDATE SKIP LOCKED
        LIMIT 1
      )
      UPDATE enquiry_email_outbox AS outbox
      SET locked_at = NOW(), attempts = attempts + 1
      FROM next_email
      WHERE outbox.id = next_email.id
      RETURNING outbox.id, outbox.payload, outbox.attempts
    `);
    await client.query('COMMIT');
    return result.rows[0] || null;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function sendResendEmail(message) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) {
    console.error('Resend rejected an enquiry email:', { status: response.status });
    throw new Error('Email provider rejected the message.');
  }
}

async function deliverOneEmail() {
  const job = await claimEmail();
  if (!job) return false;
  const database = getPool();
  try {
    await sendResendEmail(job.payload);
    await database.query(
      'UPDATE enquiry_email_outbox SET sent_at = NOW(), locked_at = NULL, last_error = NULL WHERE id = $1',
      [job.id],
    );
  } catch (error) {
    const isFinalAttempt = job.attempts >= 8;
    const backoffSeconds = Math.min(60 * 60, 30 * (2 ** (job.attempts - 1)));
    await database.query(
      `UPDATE enquiry_email_outbox
       SET locked_at = NULL,
           last_error = $2,
           failed_at = CASE WHEN $3 THEN NOW() ELSE NULL END,
           available_at = CASE WHEN $3 THEN available_at ELSE NOW() + ($4 * INTERVAL '1 second') END
       WHERE id = $1`,
      [job.id, error.message.slice(0, 300), isFinalAttempt, backoffSeconds],
    );
    console.error('Could not deliver a queued enquiry email:', {
      outboxId: job.id,
      attempt: job.attempts,
      finalAttempt: isFinalAttempt,
      error: error.message,
    });
  }
  return true;
}

export function startEmailWorker() {
  if (emailWorker || !hasEmailConfiguration() || !getPool()) return;
  const run = async () => {
    try {
      while (await deliverOneEmail()) {
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    } catch (error) {
      console.error('Enquiry email worker could not process its queue:', error.message);
    }
  };
  emailWorker = setInterval(run, 5_000);
  emailWorker.unref();
  void run();
}

export function createEnquiriesApp() {
  const app = express();
  app.disable('x-powered-by');

  app.get('/enquiries/status', async (_req, res) => {
    const configured = Boolean(getPool() && hasEmailConfiguration());
    if (!configured) {
      res.set('Cache-Control', 'no-store');
      return res.json({ configured: false });
    }
    try {
      await initializeEnquiryDatabase();
      res.set('Cache-Control', 'no-store');
      return res.json({ configured: true });
    } catch (error) {
      console.error('Enquiry readiness check failed:', error.message);
      return res.json({ configured: false });
    }
  });

  app.post(
    '/enquiries',
    enforcePublicRateLimit,
    (req, res, next) => {
      if (!sameOrigin(req)) return res.status(403).json({ error: 'This enquiry could not be accepted.' });
      if (!req.is('application/json')) return res.status(415).json({ error: 'Submit the enquiry using the provided form.' });
      return next();
    },
    express.json({ limit: '12kb', strict: true }),
    requireDatabase,
    async (req, res) => {
      if (!hasEmailConfiguration()) {
        return res.status(503).json({ error: 'Email delivery is not configured on this server.' });
      }
      const { error, field, enquiry } = validateEnquiry(req.body || {});
      if (error) return res.status(400).json({ error, field });

      const database = getPool();
      const submittedAt = new Date();
      const client = await database.connect();
      try {
        await client.query('BEGIN');
        const inserted = await client.query(
          `INSERT INTO enquiries
             (id, idempotency_key, full_name, email, phone, company, service, budget, project_details, privacy_consent, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (idempotency_key) DO NOTHING
           RETURNING id`,
          [
            enquiry.id,
            enquiry.idempotencyKey,
            enquiry.fullName,
            enquiry.email,
            enquiry.phone,
            enquiry.company,
            enquiry.service,
            enquiry.budget,
            enquiry.projectDetails,
            enquiry.privacyConsent,
            submittedAt,
          ],
        );
        if (inserted.rowCount === 0) {
          await client.query('COMMIT');
          return res.status(200).json({ ok: true, duplicate: true });
        }

        const messages = createEmailMessages(enquiry, submittedAt, {
          from: process.env.EMAIL_FROM,
          adminEmail: process.env.ADMIN_EMAIL,
        });
        await enqueueEmailRows(client, enquiry.id, messages);
        await client.query('COMMIT');
        startEmailWorker();
        return res.status(201).json({ ok: true, queued: true });
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Could not store a project inquiry:', error.message);
        return res.status(500).json({ error: 'We could not save your enquiry. Please try again.' });
      } finally {
        client.release();
      }
    },
  );

  app.use('/admin', requireAdmin, requireDatabase);

  app.get('/admin/enquiries', async (req, res) => {
    const search = cleanText(req.query.search).slice(0, 120);
    const service = cleanText(req.query.service);
    const status = cleanText(req.query.status);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 25));
    const offset = Math.max(0, Number.parseInt(req.query.offset, 10) || 0);
    if (service && !allowedServices.has(service)) return res.status(400).json({ error: 'Unknown service filter.' });
    if (status && !enquiryStatuses.has(status)) return res.status(400).json({ error: 'Unknown status filter.' });

    const filters = [];
    const values = [];
    if (search) {
      values.push(`%${search}%`);
      filters.push(`(full_name ILIKE $${values.length} OR email ILIKE $${values.length})`);
    }
    if (service) {
      values.push(service);
      filters.push(`service = $${values.length}`);
    }
    if (status) {
      values.push(status);
      filters.push(`status = $${values.length}`);
    }
    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const database = getPool();
    const listValues = [...values, limit, offset];
    const [list, count] = await Promise.all([
      database.query(
        `SELECT id, full_name, email, phone, company, service, budget, project_details, privacy_consent, status, created_at
         FROM enquiries ${where} ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
        listValues,
      ),
      database.query(`SELECT COUNT(*)::INTEGER AS count FROM enquiries ${where}`, values),
    ]);
    return res.json({ enquiries: list.rows, total: count.rows[0].count });
  });

  app.get('/admin/enquiries/:id', async (req, res) => {
    const result = await getPool().query(
      `SELECT id, full_name, email, phone, company, service, budget, project_details, privacy_consent, status, created_at
       FROM enquiries WHERE id = $1`,
      [req.params.id],
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Enquiry not found.' });
    return res.json({ enquiry: result.rows[0] });
  });

  app.patch('/admin/enquiries/:id', async (req, res) => {
    if (!sameOrigin(req)) return res.status(403).json({ error: 'This request could not be accepted.' });
    if (!req.is('application/json')) return res.status(415).json({ error: 'Submit a JSON status update.' });
    const update = await parseJson(req, res);
    if (!update) return undefined;
    const status = cleanText(update.status);
    if (!enquiryStatuses.has(status)) return res.status(400).json({ error: 'Select a valid enquiry status.' });
    const result = await getPool().query(
      `UPDATE enquiries SET status = $2 WHERE id = $1
       RETURNING id, full_name, email, phone, company, service, budget, project_details, privacy_consent, status, created_at`,
      [req.params.id, status],
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Enquiry not found.' });
    return res.json({ enquiry: result.rows[0] });
  });

  app.delete('/admin/enquiries/:id', async (req, res) => {
    if (!sameOrigin(req)) return res.status(403).json({ error: 'This request could not be accepted.' });
    const result = await getPool().query('DELETE FROM enquiries WHERE id = $1 RETURNING id', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Enquiry not found.' });
    return res.json({ ok: true });
  });

  app.use((error, _req, res, _next) => {
    if (error.type === 'entity.too.large') return res.status(413).json({ error: 'The submitted enquiry is too large.' });
    if (error instanceof SyntaxError && 'body' in error) {
      return res.status(400).json({ error: 'The request could not be read. Please check the submitted data.' });
    }
    console.error('Enquiry API request failed:', error.message);
    return res.status(500).json({ error: 'The request could not be processed.' });
  });

  return app;
}

async function parseJson(req, res) {
  try {
    return await new Promise((resolve, reject) => {
      express.json({ limit: '4kb', strict: true })(req, res, (error) => {
        if (error) reject(error);
        else resolve(req.body);
      });
    });
  } catch {
    res.status(400).json({ error: 'The request could not be read. Please check the submitted data.' });
    return null;
  }
}
