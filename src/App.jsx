import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import { About, Blog, Contact, LegalPage, NotFound, ProjectsPage, ServicePage, ServicesPage } from './pages/InfoPages.jsx';

function QuoteDialog({ open, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.section
        className="quote-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
      >
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close enquiry form">
          <X size={20} />
        </button>
        <span className="eyebrow eyebrow-blue">LET'S TALK</span>
        <h2 id="quote-title">Tell us about your project</h2>
        <p>Share a few details and your email app will open with your enquiry ready to send.</p>
        <form className="enquiry-form" action="mailto:hello@yourcompany.com" method="post" encType="text/plain">
          <label>
            Your name
            <input name="name" autoComplete="name" autoFocus required placeholder="Name" />
          </label>
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
          </label>
          <label>
            What can we help with?
            <textarea name="project" rows="4" required placeholder="A short overview of your project" />
          </label>
          <button className="btn btn-primary" type="submit">
            <Mail size={17} /> Prepare enquiry
          </button>
        </form>
      </motion.section>
    </div>
  );
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="page-shell">
      <Header onQuote={() => setQuoteOpen(true)} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          <Routes>
            <Route path="/" element={<Home onQuote={() => setQuoteOpen(true)} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServicePage onQuote={() => setQuoteOpen(true)} />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<Contact onQuote={() => setQuoteOpen(true)} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <AnimatePresence>
        {quoteOpen && <QuoteDialog open={quoteOpen} onClose={() => setQuoteOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
