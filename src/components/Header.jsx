import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Brand from './Brand.jsx';
import { IconButton, PrimaryButton } from './Button.jsx';
import { motionEase } from './motion.js';

const serviceLinks = [
  ['Shopify Development', 'shopify-development'],
  ['Website Development', 'website-development'],
  ['App Development', 'app-development'],
  ['SEO Services', 'seo-services'],
  ['Digital Marketing', 'digital-marketing'],
  ['UI/UX Design', 'ui-ux-design'],
  ['Cloud Solutions', 'cloud-solutions'],
  ['IT Consulting', 'it-consulting'],
];

export default function Header({ onQuote }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <motion.header
      className={`site-header ${menuOpen ? 'nav-open' : ''}`}
      id="header"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: motionEase }}
    >
      <div className="container nav-wrap">
        <Brand className="header-brand" onClick={closeMenu} />

        <nav className="main-nav" aria-label="Main navigation">
          <ul className="nav-list">
            <motion.li initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.38, ease: motionEase }}>
              <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            </motion.li>
            <motion.li
              className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.09, duration: 0.38, ease: motionEase }}
            >
              <button
                className="dropdown-trigger"
                type="button"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((open) => !open)}
                onFocus={() => setServicesOpen(true)}
              >
                Services <ChevronDown className="caret-icon" size={15} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    className="dropdown-menu"
                    aria-label="Services submenu"
                    initial={{ opacity: 0, y: 7, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: motionEase }}
                  >
                    {serviceLinks.map(([label, slug]) => (
                      <Link key={slug} to={`/services/${slug}`} onClick={closeMenu}>{label}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
            {[
              ['/projects', 'Projects'],
              ['/about', 'About'],
              ['/blog', 'Blog'],
              ['/contact', 'Contact'],
            ].map(([to, label], index) => (
              <motion.li
                key={to}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.13 + index * 0.04, duration: 0.38, ease: motionEase }}
              >
                <NavLink to={to} onClick={closeMenu}>{label}</NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>

        <PrimaryButton className="quote-btn" type="button" onClick={onQuote}>
          Get a Quote <ArrowRight size={17} />
        </PrimaryButton>

        <IconButton
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </IconButton>
      </div>
    </motion.header>
  );
}
