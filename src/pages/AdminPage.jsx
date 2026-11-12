import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronRight, LogOut, RefreshCw, Search, Trash2 } from 'lucide-react';

const statuses = ['New', 'Contacted', 'In Progress', 'Completed'];
const services = [
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
];

function basicAuthorization(credentials) {
  const bytes = new TextEncoder().encode(`${credentials.username}:${credentials.password}`);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return `Basic ${btoa(binary)}`;
}

async function requestJson(path, credentials, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      Accept: 'application/json',
      Authorization: basicAuthorization(credentials),
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) throw new Error(result?.error || 'The request could not be completed.');
  return result;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function AdminPage() {
  const [credentials, setCredentials] = useState(null);
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [enquiries, setEnquiries] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [service, setService] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    if (service) params.set('service', service);
    if (status) params.set('status', status);
    return params.toString();
  }, [search, service, status]);

  const loadEnquiries = useCallback(async (auth) => {
    setLoading(true);
    setError('');
    try {
      const result = await requestJson(`/api/admin/enquiries${query ? `?${query}` : ''}`, auth);
      setEnquiries(result.enquiries);
      setTotal(result.total);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (credentials) void loadEnquiries(credentials);
  }, [credentials, loadEnquiries]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const submittedCredentials = { username: loginName.trim(), password: loginPassword };
    try {
      const result = await requestJson('/api/admin/enquiries', submittedCredentials);
      setCredentials(submittedCredentials);
      setEnquiries(result.enquiries);
      setTotal(result.total);
      setLoginPassword('');
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  const loadDetails = async (id) => {
    setError('');
    try {
      const result = await requestJson(`/api/admin/enquiries/${encodeURIComponent(id)}`, credentials);
      setSelected(result.enquiry);
    } catch (detailError) {
      setError(detailError.message);
    }
  };

  const updateStatus = async (id, nextStatus) => {
    setError('');
    try {
      const result = await requestJson(`/api/admin/enquiries/${encodeURIComponent(id)}`, credentials, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus }),
      });
      setEnquiries((current) => current.map((item) => item.id === id ? result.enquiry : item));
      setSelected((current) => current?.id === id ? result.enquiry : current);
    } catch (updateError) {
      setError(updateError.message);
    }
  };

  const deleteEnquiry = async (enquiry) => {
    if (!window.confirm(`Permanently delete the enquiry from ${enquiry.full_name}?`)) return;
    setError('');
    try {
      await requestJson(`/api/admin/enquiries/${encodeURIComponent(enquiry.id)}`, credentials, { method: 'DELETE' });
      setEnquiries((current) => current.filter((item) => item.id !== enquiry.id));
      setTotal((current) => Math.max(0, current - 1));
      setSelected((current) => current?.id === enquiry.id ? null : current);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  if (!credentials) {
    return (
      <main className="admin-page">
        <section className="admin-login-card" aria-labelledby="admin-login-title">
          <span className="eyebrow eyebrow-blue">TECHBERRY ADMIN</span>
          <h1 id="admin-login-title">Enquiry management</h1>
          <p>Sign in with the administrator credentials configured on the server.</p>
          <form onSubmit={handleLogin}>
            <label>
              Username
              <input autoComplete="username" required value={loginName} onChange={(event) => setLoginName(event.target.value)} />
            </label>
            <label>
              Password
              <input type="password" autoComplete="current-password" required value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} />
            </label>
            {error && <p className="admin-error" role="alert">{error}</p>}
            <button type="submit" className="admin-primary-button" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <p className="admin-login-note">Administrator credentials are kept in memory only for this browser session.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-dashboard">
        <header className="admin-dashboard-header">
          <div>
            <span className="eyebrow eyebrow-blue">TECHBERRY ADMIN</span>
            <h1>Project enquiries</h1>
            <p>{total} {total === 1 ? 'enquiry' : 'enquiries'}</p>
          </div>
          <div className="admin-header-actions">
            <button type="button" className="admin-quiet-button" onClick={() => void loadEnquiries(credentials)} disabled={loading}>
              <RefreshCw size={16} aria-hidden="true" /> Refresh
            </button>
            <button type="button" className="admin-quiet-button" onClick={() => { setCredentials(null); setSelected(null); setEnquiries([]); }}>
              <LogOut size={16} aria-hidden="true" /> Sign out
            </button>
          </div>
        </header>

        <section className="admin-filters" aria-label="Filter enquiries">
          <label className="admin-search">
            <Search size={17} aria-hidden="true" />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or email" />
          </label>
          <label>
            <span className="admin-sr-only">Filter by service</span>
            <select value={service} onChange={(event) => setService(event.target.value)}>
              <option value="">All services</option>
              {services.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span className="admin-sr-only">Filter by status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">All statuses</option>
              {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </section>

        {error && <p className="admin-error" role="alert">{error}</p>}
        {loading && <p className="admin-loading" role="status">Loading enquiries…</p>}

        <div className="admin-content-grid">
          <section className="admin-enquiry-list" aria-label="Enquiries">
            {!loading && enquiries.length === 0 ? (
              <p className="admin-empty">No enquiries match these filters.</p>
            ) : enquiries.map((enquiry) => (
              <article className={`admin-enquiry-row${selected?.id === enquiry.id ? ' is-selected' : ''}`} key={enquiry.id}>
                <button type="button" className="admin-enquiry-open" onClick={() => void loadDetails(enquiry.id)}>
                  <span className="admin-enquiry-main">
                    <strong>{enquiry.full_name}</strong>
                    <span>{enquiry.email}</span>
                    <span>{enquiry.service} · {formatDate(enquiry.created_at)}</span>
                  </span>
                  <span className={`admin-status-pill admin-status-${enquiry.status.toLowerCase().replaceAll(' ', '-')}`}>{enquiry.status}</span>
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
                <button type="button" className="admin-delete-button" aria-label={`Delete enquiry from ${enquiry.full_name}`} onClick={() => void deleteEnquiry(enquiry)}>
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </article>
            ))}
          </section>

          {selected && (
            <aside className="admin-enquiry-detail" aria-labelledby="admin-detail-title">
              <div className="admin-detail-heading">
                <div>
                  <span className="eyebrow eyebrow-blue">ENQUIRY DETAILS</span>
                  <h2 id="admin-detail-title">{selected.full_name}</h2>
                </div>
                <button type="button" className="admin-back-button" onClick={() => setSelected(null)}>
                  <ArrowLeft size={16} aria-hidden="true" /> Close
                </button>
              </div>
              <dl>
                <div><dt>Email</dt><dd><a href={`mailto:${selected.email}`}>{selected.email}</a></dd></div>
                <div><dt>Phone</dt><dd>{selected.phone}</dd></div>
                <div><dt>Company</dt><dd>{selected.company || 'Not provided'}</dd></div>
                <div><dt>Service</dt><dd>{selected.service}</dd></div>
                <div><dt>Estimated budget</dt><dd>{selected.budget || 'Not provided'}</dd></div>
                <div><dt>Received</dt><dd>{formatDate(selected.created_at)}</dd></div>
                <div><dt>Privacy consent</dt><dd>{selected.privacy_consent ? 'Granted' : 'Not recorded'}</dd></div>
                <div className="admin-project-details"><dt>Project details</dt><dd>{selected.project_details}</dd></div>
              </dl>
              <label className="admin-status-control">
                Update status
                <select value={selected.status} onChange={(event) => void updateStatus(selected.id, event.target.value)}>
                  {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
