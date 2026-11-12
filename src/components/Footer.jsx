import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from './Services.jsx';
import Brand from './Brand.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand className="footer-brand-row" imageClassName="footer-brand-image" loading="lazy" />
          <p className="footer-tagline">IT Services &amp; Digital Solutions</p>
          <p>We design and build digital experiences that help ambitious businesses move faster, grow smarter and stand out online.</p>
          <div className="social-links" aria-label="Social media">
            <a href="https://facebook.com" aria-label="Facebook"><Facebook size={17} /></a>
            <a href="https://x.com" aria-label="X"><Twitter size={17} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a>
          </div>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li><li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li><li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li><li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Our Services</h3>
          <ul>{services.map((service) => <li key={service.slug}><Link to={`/services/${service.slug}`}>{service.title}</Link></li>)}</ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li><Phone size={16} /> +1 (000) 000-0000</li>
            <li><Mail size={16} /> hello@yourcompany.com</li>
            <li><MapPin size={16} /> Your business address</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>Copyright © 2026 Tech Berry. All Rights Reserved.</p>
          <div className="legal-links"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms &amp; Conditions</Link></div>
        </div>
      </div>
    </footer>
  );
}
