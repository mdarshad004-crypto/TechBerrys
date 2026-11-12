import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Brand from './Brand.jsx';

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
    <header className={`site-header ${menuOpen ? 'nav-open' : ''}`} id="header">
      <div className="container nav-wrap">
        <Brand className="header-brand" onClick={closeMenu} />

        <nav className="main-nav" aria-label="Main navigation">
          <ul className="nav-list">
            <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
            <li className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}>
              <button
                className="dropdown-trigger"
                type="button"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services <ChevronDown className="caret-icon" size={15} />
              </button>
              <div className="dropdown-menu" aria-label="Services submenu">
                {serviceLinks.map(([label, slug]) => (
                  <Link key={slug} to={`/services/${slug}`} onClick={closeMenu}>{label}</Link>
                ))}
              </div>
            </li>
            <li><NavLink to="/projects" onClick={closeMenu}>Projects</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to="/blog" onClick={closeMenu}>Blog</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
          </ul>
        </nav>

        <button className="btn btn-primary quote-btn" type="button" onClick={onQuote}>
          Get a Quote <ArrowRight size={17} />
        </button>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
