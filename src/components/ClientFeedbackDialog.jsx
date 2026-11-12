import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageSquareQuote, ShieldCheck, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { PrimaryButton } from './Button.jsx';

const projectCategories = [
  'Shopify Development',
  'Website Development',
  'App Development',
  'SEO Services',
  'Digital Marketing',
  'UI/UX Design',
  'Cloud Solutions',
  'IT Consulting',
  'Other',
];

export default function ClientFeedbackDialog({ onClose }) {
  const [deliveryStatus, setDeliveryStatus] = useState('checking');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const scrollY = window.scrollY;
    const bodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    const documentOverflow = document.documentElement.style.overflow;
    const documentScrollBehavior = document.documentElement.style.scrollBehavior;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      Object.assign(document.body.style, bodyStyles);
      document.documentElement.style.overflow = documentOverflow;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = documentScrollBehavior;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !submitting) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, submitting]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/enquiries/status', {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Could not check secure feedback delivery.');
        const status = await response.json();
        setDeliveryStatus(status.configured ? 'ready' : 'pending');
      })
      .catch((statusError) => {
        if (statusError.name !== 'AbortError') setDeliveryStatus('unavailable');
      });

    return () => controller.abort();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const designation = String(formData.get('designation') || '').trim();
    const category = String(formData.get('category') || '');
    const review = String(formData.get('review') || '').trim();
    const details = [
      'CLIENT FEEDBACK SUBMISSION',
      `Project category: ${category}`,
      company ? `Company: ${company}` : '',
      designation ? `Designation: ${designation}` : '',
      '',
      'Client feedback:',
      review,
      '',
      'This feedback is private and is not approved for public display.',
    ].filter(Boolean).join('\n');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: formData.get('email'),
          contactNumber: formData.get('contactNumber'),
          service: category,
          message: details,
          consent: formData.get('consent') === 'on',
          website: formData.get('website'),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        if (result?.code === 'whatsapp_not_configured') setDeliveryStatus('pending');
        throw new Error(result?.error || 'We could not deliver your feedback right now. Please try again later.');
      }
      if (result?.ok !== true) throw new Error('We could not confirm delivery of your feedback. Please try again later.');
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError.message || 'We could not deliver your feedback right now. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = deliveryStatus === 'ready' && !submitting;

  return createPortal(
    <motion.div
      className="dialog-backdrop whatsapp-dialog-backdrop client-feedback-dialog-backdrop"
      role="presentation"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseDown={(event) => event.target === event.currentTarget && !submitting && onClose()}
    >
      <motion.section
        className="quote-dialog whatsapp-dialog client-feedback-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-feedback-title"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="whatsapp-dialog-close" type="button" onClick={onClose} disabled={submitting} aria-label="Close feedback form">
          <X size={20} />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              className="whatsapp-success"
              key="success"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
            >
              <span className="whatsapp-success-icon"><CheckCircle2 size={42} /></span>
              <h2 id="client-feedback-title">Thank you for sharing your experience.</h2>
              <p>Your feedback was sent privately to the TechBerry team. It will not be published without separate approval.</p>
              <PrimaryButton type="button" onClick={onClose}>Done</PrimaryButton>
            </motion.div>
          ) : (
            <motion.div
              className="whatsapp-dialog-content"
              key="form"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="whatsapp-dialog-mark"><MessageSquareQuote size={21} /></span>
              <span className="eyebrow eyebrow-blue">CLIENT FEEDBACK</span>
              <h2 id="client-feedback-title">Share Your Experience</h2>
              <p className="whatsapp-dialog-subtitle">Tell us about working with TechBerry. Your feedback is sent privately and won’t appear publicly without your separate approval.</p>

              {deliveryStatus === 'pending' && (
                <p className="whatsapp-delivery-status" role="status">
                  Secure feedback delivery is awaiting server configuration. Your feedback has not been sent.
                </p>
              )}
              {deliveryStatus === 'unavailable' && (
                <p className="whatsapp-delivery-status" role="alert">
                  Feedback delivery is temporarily unavailable. Please try again later.
                </p>
              )}
              {deliveryStatus === 'checking' && (
                <p className="whatsapp-delivery-status" role="status">Checking secure feedback delivery…</p>
              )}

              <form className="enquiry-form whatsapp-enquiry-form" onSubmit={handleSubmit}>
                <label>
                  Full Name
                  <input name="name" autoComplete="name" autoFocus required minLength={2} maxLength={120} placeholder="Your full name" />
                </label>
                <label>
                  Email Address
                  <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" />
                </label>
                <label>
                  Contact Number
                  <input name="contactNumber" type="tel" autoComplete="tel" required maxLength={32} placeholder="Include country code" />
                </label>
                <label>
                  Company (optional)
                  <input name="company" autoComplete="organization" maxLength={120} placeholder="Company name" />
                </label>
                <label>
                  Professional Designation (optional)
                  <input name="designation" maxLength={120} placeholder="Your role" />
                </label>
                <label>
                  Project Category
                  <select name="category" required defaultValue="">
                    <option value="" disabled>Select a project category</option>
                    {projectCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </label>
                <label>
                  Your Feedback
                  <textarea name="review" rows="4" required minLength={10} maxLength={500} placeholder="Share your honest experience" />
                </label>

                <label className="whatsapp-consent">
                  <input name="consent" type="checkbox" required />
                  <span>I agree to TechBerry using my details to receive and respond to this feedback. See the <Link to="/privacy-policy" onClick={onClose}>Privacy Policy</Link>.</span>
                </label>

                <label className="whatsapp-honeypot" aria-hidden="true">
                  Leave this field empty
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>

                {error && <p className="whatsapp-form-error" role="alert">{error}</p>}

                <div className="whatsapp-submit-row">
                  <PrimaryButton type="submit" disabled={!canSubmit} aria-busy={submitting}>
                    {submitting ? 'Sending…' : 'Send Feedback'} <ArrowRight size={18} />
                  </PrimaryButton>
                  <span><ShieldCheck size={15} /> Sent privately to our team.</span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>,
    document.body,
  );
}
