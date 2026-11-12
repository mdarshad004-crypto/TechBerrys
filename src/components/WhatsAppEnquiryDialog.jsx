import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from './Button.jsx';

const serviceOptions = [
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

export default function WhatsAppEnquiryDialog({ onClose, mode = 'whatsapp', inline = false }) {
  const [deliveryStatus, setDeliveryStatus] = useState('checking');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [statusRetry, setStatusRetry] = useState(0);
  const idempotencyKeyRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !inline && !submitting) onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inline, onClose, submitting]);

  useEffect(() => {
    const controller = new AbortController();
    setDeliveryStatus('checking');
    fetch('/api/enquiries/status', {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Could not check enquiry delivery.');
        const status = await response.json();
        setDeliveryStatus(status.configured ? 'ready' : 'pending');
      })
      .catch((statusError) => {
        if (statusError.name !== 'AbortError') setDeliveryStatus('unavailable');
      });

    return () => controller.abort();
  }, [statusRetry]);

  const retryStatusCheck = () => {
    setDeliveryStatus('checking');
    setStatusRetry((attempt) => attempt + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const payload = {
      fullName: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('contactNumber'),
      company: formData.get('company'),
      service: formData.get('service'),
      budget: formData.get('budget'),
      projectDetails: formData.get('message'),
      privacyConsent: formData.get('consent') === 'on',
      website: formData.get('website'),
      idempotencyKey: idempotencyKeyRef.current || crypto.randomUUID(),
    };
    idempotencyKeyRef.current = payload.idempotencyKey;

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        if (result?.code === 'whatsapp_not_configured') setDeliveryStatus('pending');
        throw new Error(result?.error || 'We could not send your enquiry right now. Please try again later.');
      }
      if (result?.ok !== true) throw new Error('We could not confirm delivery of your enquiry. Please try again later.');
      formElement.reset();
      idempotencyKeyRef.current = null;
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError.message || 'We could not send your enquiry right now. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFieldChange = () => {
    idempotencyKeyRef.current = null;
  };

  const canSubmit = deliveryStatus === 'ready' && !submitting;

  const formSurface = (
      <motion.section
        className={`quote-dialog whatsapp-dialog${inline ? ' whatsapp-inline-dialog' : ''}`}
        role={inline ? undefined : 'dialog'}
        aria-modal={inline ? undefined : 'true'}
        aria-labelledby="whatsapp-dialog-title"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
      >
        {!inline && (
          <button className="whatsapp-dialog-close" type="button" onClick={onClose} disabled={submitting} aria-label="Close enquiry form">
            <X size={20} />
          </button>
        )}

        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              className="whatsapp-success"
              key="success"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              role="status"
            >
              <motion.span
                className="whatsapp-success-icon"
                initial={shouldReduceMotion ? false : { scale: 0.7, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <CheckCircle2 size={42} />
              </motion.span>
              <h2 id="whatsapp-dialog-title">Thank you for contacting TechBerry!</h2>
              <p>Your enquiry has been received successfully. Our team will contact you shortly.</p>
              <PrimaryButton type="button" onClick={() => (inline ? setSubmitted(false) : onClose?.())}>
                {inline ? 'Send Another Inquiry' : 'Done'}
              </PrimaryButton>
            </motion.div>
          ) : (
            <motion.div
              className="whatsapp-dialog-content"
              key="form"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="whatsapp-dialog-mark"><MessageCircle size={21} /></span>
              <span className="eyebrow eyebrow-blue">{mode === 'quote' ? 'PROJECT ENQUIRY' : 'TECHBERRY ENQUIRY'}</span>
              <h2 id="whatsapp-dialog-title">{mode === 'quote' ? 'Tell Us About Your Project' : "Let's Talk About Your Project"}</h2>
              <p className="whatsapp-dialog-subtitle">
                {inline
                  ? "We'd love to know more about what you're planning."
                  : 'Share a few details and our team will get back to you shortly.'}
              </p>

              {deliveryStatus === 'pending' && (
                <p className="whatsapp-delivery-status" role="status">
                  Enquiry submission is awaiting server configuration. Your enquiry has not been sent.
                </p>
              )}
              {deliveryStatus === 'unavailable' && (
                <p className="whatsapp-delivery-status" role="alert">
                  Enquiry submission is temporarily unavailable. Please try again in a moment.
                  {' '}
                  <button type="button" onClick={retryStatusCheck}>Try again</button>
                </p>
              )}
              {deliveryStatus === 'checking' && (
                <p className="whatsapp-delivery-status" role="status">Checking secure enquiry delivery…</p>
              )}

              <form className="enquiry-form whatsapp-enquiry-form" onSubmit={handleSubmit}>
                <label>
                  Full Name
                  <input name="name" autoComplete="name" autoFocus required minLength={2} maxLength={120} placeholder="Your full name" onChange={handleFieldChange} />
                </label>
                <label>
                  {inline ? 'Work Email Address' : 'Email Address'}
                  <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" onChange={handleFieldChange} />
                </label>
                <label>
                  {inline ? 'Phone Number' : 'Contact Number'}
                  <input name="contactNumber" type="tel" autoComplete="tel" required maxLength={32} pattern="[+]?[0-9\\s().-]{7,32}" placeholder="Include country code" onChange={handleFieldChange} />
                </label>
                <label>
                  Company Name (optional)
                  <input name="company" autoComplete="organization" maxLength={120} placeholder="Company name" onChange={handleFieldChange} />
                </label>
                <label>
                  {inline ? "Service You're Interested In" : 'Select Service'}
                  <select name="service" required defaultValue="" onChange={handleFieldChange}>
                    <option value="" disabled>Select a service</option>
                    {serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                </label>
                <label>
                  Estimated Project Budget (optional)
                  <input name="budget" maxLength={80} placeholder="Amount and currency" onChange={handleFieldChange} />
                </label>
                <label>
                  {inline ? 'Project Details' : 'Project Description / Your Query'}
                  <textarea name="message" rows="4" required minLength={10} maxLength={4000} placeholder="Tell us a little about your project" onChange={handleFieldChange} />
                </label>

                <label className="whatsapp-consent">
                  <input name="consent" type="checkbox" required onChange={handleFieldChange} />
                  <span>I agree to TechBerry using my details to respond to this enquiry. See the <Link to="/privacy-policy" onClick={onClose}>Privacy Policy</Link>.</span>
                </label>

                <label className="whatsapp-honeypot" aria-hidden="true">
                  Leave this field empty
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>

                {error && <p className="whatsapp-form-error" role="alert">{error}</p>}

                <div className="whatsapp-submit-row">
                  <PrimaryButton type="submit" disabled={!canSubmit} aria-busy={submitting}>
                    {submitting ? 'Sending…' : inline ? 'Send Project Inquiry' : 'Send Enquiry'} <ArrowRight size={18} />
                  </PrimaryButton>
                  <span><ShieldCheck size={15} /> Your details are sent securely.</span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
  );

  if (inline) {
    return <div className="whatsapp-inline-shell">{formSurface}</div>;
  }

  return (
    <div
      className="dialog-backdrop whatsapp-dialog-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && !submitting && onClose?.()}
    >
      {formSurface}
    </div>
  );
}
