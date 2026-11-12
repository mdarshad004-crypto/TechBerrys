import { Component, lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CursorEffects from './components/CursorEffects.jsx';
import WhatsAppEnquiryDialog from './components/WhatsAppEnquiryDialog.jsx';
import { motionTransition } from './components/motion.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.About })));
const Blog = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.Blog })));
const Contact = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.Contact })));
const LegalPage = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.LegalPage })));
const NotFound = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.NotFound })));
const ProjectsPage = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.ProjectsPage })));
const ShopifyDevelopmentPage = lazy(() => import('./pages/ShopifyDevelopmentPage.jsx'));
const ShopifyServiceDetailPage = lazy(() => import('./pages/ShopifyServiceDetailPage.jsx'));
const ServicePage = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.ServicePage })));
const ServicesPage = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.ServicesPage })));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsConditions = lazy(() => import('./pages/TermsConditions.jsx'));

function PageLoading() {
  return (
    <section className="page-loading" role="status" aria-label="Loading page">
      <span className="page-loading-spinner" aria-hidden="true" />
      <span>Loading your page...</span>
      <span className="page-loading-skeleton" aria-hidden="true" />
    </section>
  );
}

class PageErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Page failed to render:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="page-error" role="alert">
          <h1>This page couldn't be loaded.</h1>
          <p>Try again, or use the navigation to continue browsing TechBerry.</p>
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user" transition={motionTransition}>
      <div className="page-shell">
        <Header onQuote={() => setQuoteOpen(true)} />
        <main className="route-stage">
          <AnimatePresence initial={false}>
            <motion.div
              className="route-transition"
              key={location.pathname}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.22, ease: motionTransition.ease }}
            >
              <PageErrorBoundary key={location.pathname}>
                <Suspense fallback={<PageLoading />}>
                  <Routes location={location}>
                    <Route path="/" element={<Home onQuote={() => setQuoteOpen(true)} onWhatsApp={() => setWhatsAppOpen(true)} />} />
                    <Route
                      path="/about"
                      element={<About onQuote={() => setQuoteOpen(true)} onWhatsApp={() => setWhatsAppOpen(true)} />}
                    />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/services/shopify-development" element={<ShopifyDevelopmentPage onQuote={() => setQuoteOpen(true)} />} />
                    <Route path="/services/shopify-theme-customization" element={<ShopifyServiceDetailPage onQuote={() => setQuoteOpen(true)} />} />
                    <Route path="/services/shopify-app-integration" element={<ShopifyServiceDetailPage onQuote={() => setQuoteOpen(true)} />} />
                    <Route path="/services/shopify-store-optimization" element={<ShopifyServiceDetailPage onQuote={() => setQuoteOpen(true)} />} />
                    <Route path="/services/product-collection-setup" element={<ShopifyServiceDetailPage onQuote={() => setQuoteOpen(true)} />} />
                    <Route path="/services/shopify-store-maintenance" element={<ShopifyServiceDetailPage onQuote={() => setQuoteOpen(true)} />} />
                    <Route path="/services/:slug" element={<ServicePage onQuote={() => setQuoteOpen(true)} />} />
                    <Route path="/projects" element={<ProjectsPage onQuote={() => setQuoteOpen(true)} />} />
                    <Route path="/contact" element={<Contact onQuote={() => setQuoteOpen(true)} />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
                    <Route path="/terms" element={<TermsConditions />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </PageErrorBoundary>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <AnimatePresence>
          {quoteOpen && <WhatsAppEnquiryDialog mode="quote" onClose={() => setQuoteOpen(false)} />}
        </AnimatePresence>
        <AnimatePresence>
          {whatsAppOpen && <WhatsAppEnquiryDialog onClose={() => setWhatsAppOpen(false)} />}
        </AnimatePresence>
        <CursorEffects />
      </div>
    </MotionConfig>
  );
}
