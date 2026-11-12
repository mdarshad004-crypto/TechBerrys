import 'dotenv/config';
import express from 'express';

const services = new Set([
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

const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMax = 5;
const rateLimitMaxEntries = 20_000;
const rateLimitByIp = new Map();
let lastRateLimitCleanup = 0;

function getWhatsAppConfig() {
  const {
    WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_BUSINESS_ACCOUNT_ID,
    WHATSAPP_RECIPIENT_NUMBER,
    WHATSAPP_TEMPLATE_NAME,
    WHATSAPP_TEMPLATE_LANGUAGE,
    WHATSAPP_API_VERSION,
  } = process.env;

  const apiVersion = WHATSAPP_API_VERSION?.trim();
  const recipient = WHATSAPP_RECIPIENT_NUMBER?.replace(/\D/g, '');
  const phoneNumberId = WHATSAPP_PHONE_NUMBER_ID?.trim();
  const businessAccountId = WHATSAPP_BUSINESS_ACCOUNT_ID?.trim();
  const templateName = WHATSAPP_TEMPLATE_NAME?.trim();
  const templateLanguage = WHATSAPP_TEMPLATE_LANGUAGE?.trim();

  if (
    !WHATSAPP_ACCESS_TOKEN?.trim()
    || !/^\d{5,30}$/.test(phoneNumberId || '')
    || !/^\d{5,30}$/.test(businessAccountId || '')
    || !/^\d{7,20}$/.test(recipient || '')
    || !/^[a-z0-9_]{2,100}$/.test(templateName || '')
    || !/^[a-z]{2}(?:_[A-Z]{2})?$/.test(templateLanguage || '')
    || !/^v\d+\.\d+$/.test(apiVersion || '')
  ) {
    return null;
  }

  return {
    accessToken: WHATSAPP_ACCESS_TOKEN.trim(),
    phoneNumberId,
    recipient,
    templateName,
    templateLanguage,
    apiVersion,
  };
}

function sanitizeText(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
}

function validateEnquiry(body) {
  const name = sanitizeText(body.name);
  const email = sanitizeText(body.email).toLowerCase();
  const contactNumber = sanitizeText(body.contactNumber);
  const service = sanitizeText(body.service);
  const message = sanitizeText(body.message);
  const normalizedPhone = contactNumber.replace(/[\s().-]/g, '');

  if (name.length < 2) return { error: 'Enter your full name.' };
  if (name.length > 120 || email.length > 254 || contactNumber.length > 32 || service.length > 80) {
    return { error: 'One or more fields exceed the allowed length.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid email address.' };
  if (!/^\+?[0-9]{7,20}$/.test(normalizedPhone)) return { error: 'Enter a valid WhatsApp or contact number.' };
  if (!services.has(service)) return { error: 'Select a service from the list.' };
  if (message.length < 10) return { error: 'Add a little more detail about your project or query.' };
  if (message.length > 1000) return { error: 'Project details must be 1,000 characters or fewer.' };
  if (body.consent !== true) return { error: 'Consent is required before sending your enquiry.' };
  if (body.website) return { error: 'Your enquiry could not be accepted.' };

  return {
    enquiry: {
      name,
      email,
      contactNumber: normalizedPhone,
      service,
      message,
    },
  };
}

function isSameOrigin(req) {
  const origin = req.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).host === req.get('host');
  } catch {
    return false;
  }
}

function checkRateLimit(req, res, next) {
  const now = Date.now();
  if (now - lastRateLimitCleanup > rateLimitWindowMs) {
    for (const [ip, record] of rateLimitByIp) {
      if (record.resetAt <= now) rateLimitByIp.delete(ip);
    }
    lastRateLimitCleanup = now;
  }

  const ip = req.ip;
  const record = rateLimitByIp.get(ip);
  if (!record || record.resetAt <= now) {
    if (rateLimitByIp.size >= rateLimitMaxEntries) {
      rateLimitByIp.delete(rateLimitByIp.keys().next().value);
    }
    rateLimitByIp.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return next();
  }

  if (record.count >= rateLimitMax) {
    res.set('Retry-After', String(Math.ceil((record.resetAt - now) / 1000)));
    return res.status(429).json({ error: 'Too many enquiries. Please try again later.' });
  }

  record.count += 1;
  return next();
}

function formatSubmissionDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

function createTemplatePayload(config, enquiry, submittedAt) {
  const parameters = [
    enquiry.name,
    enquiry.email,
    enquiry.contactNumber,
    enquiry.service,
    enquiry.message,
    formatSubmissionDate(submittedAt),
  ].map((text) => ({ type: 'text', text }));

  return {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: config.recipient,
    type: 'template',
    template: {
      name: config.templateName,
      language: { code: config.templateLanguage },
      components: [{ type: 'body', parameters }],
    },
  };
}

async function sendWhatsAppEnquiry(config, enquiry) {
  const submittedAt = new Date();
  const url = `https://graph.facebook.com/${config.apiVersion}/${encodeURIComponent(config.phoneNumberId)}/messages`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createTemplatePayload(config, enquiry, submittedAt)),
    signal: AbortSignal.timeout(12_000),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const apiError = result?.error;
    console.error('WhatsApp Cloud API rejected an enquiry', {
      httpStatus: response.status,
      code: apiError?.code,
      subcode: apiError?.error_subcode,
      traceId: apiError?.fbtrace_id,
    });
    throw new Error('WhatsApp delivery failed.');
  }

  if (!Array.isArray(result?.messages) || typeof result.messages[0]?.id !== 'string') {
    console.error('WhatsApp Cloud API returned an unexpected success response.');
    throw new Error('WhatsApp delivery could not be confirmed.');
  }
}

export function createWhatsAppApp() {
  const app = express();
  app.disable('x-powered-by');

  app.get('/enquiries/status', (_req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json({ configured: Boolean(getWhatsAppConfig()) });
  });

  app.post(
    '/enquiries',
    checkRateLimit,
    (req, res, next) => {
      if (!isSameOrigin(req)) {
        return res.status(403).json({ error: 'This enquiry could not be accepted.' });
      }
      if (!req.is('application/json')) {
        return res.status(415).json({ error: 'Submit the enquiry using the provided form.' });
      }
      return next();
    },
    express.json({ limit: '12kb', strict: true }),
    async (req, res) => {
      const { error, enquiry } = validateEnquiry(req.body || {});
      if (error) return res.status(400).json({ error });

      const config = getWhatsAppConfig();
      if (!config) {
        return res.status(503).json({
          code: 'whatsapp_not_configured',
          error: 'WhatsApp enquiry delivery is awaiting server configuration.',
        });
      }

      try {
        await sendWhatsAppEnquiry(config, enquiry);
        return res.status(200).json({ ok: true });
      } catch (sendError) {
        console.error('Could not deliver a TechBerry WhatsApp enquiry:', sendError.message);
        return res.status(502).json({
          error: 'We could not send your enquiry right now. Please try again later.',
        });
      }
    },
  );

  app.use((_req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  app.use((error, _req, res, _next) => {
    if (error.type === 'entity.too.large') {
      return res.status(413).json({ error: 'The submitted enquiry is too large.' });
    }
    if (error instanceof SyntaxError && 'body' in error) {
      return res.status(400).json({ error: 'The enquiry could not be read. Please check the form and try again.' });
    }
    console.error('WhatsApp enquiry request error:', error.message);
    return res.status(500).json({ error: 'The request could not be processed.' });
  });

  return app;
}

export function configureTrustedProxy(app) {
  const hops = process.env.TRUST_PROXY?.trim();
  if (hops) {
    if (!/^\d+$/.test(hops)) {
      throw new Error('TRUST_PROXY must be a non-negative proxy hop count.');
    }
    app.set('trust proxy', Number(hops));
  }
}
