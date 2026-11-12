import { Link } from 'react-router-dom';
import { services } from './Services.jsx';
import Brand from './Brand.jsx';
import { motion } from 'framer-motion';
import { revealUp, staggerChildren, viewportOnce } from './motion.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <motion.div className="container footer-grid" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.div className="footer-brand" variants={revealUp}>
          <Brand className="footer-brand-row" imageClassName="footer-brand-image" loading="lazy" />
          <p>We bring together creative thinking, modern technology and user-focused design to build digital solutions tailored to business goals.</p>
        </motion.div>
        <motion.div className="footer-links" variants={revealUp}>
          <h3>Company</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/about#about-process-title">Our Working Process</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </motion.div>
        <motion.div className="footer-links" variants={revealUp}>
          <h3>Our Services</h3>
          <ul>{services.map((service) => <li key={service.slug}><Link to={`/services/${service.slug}`}>{service.title}</Link></li>)}</ul>
        </motion.div>
        <motion.div className="footer-links" variants={revealUp}>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/projects">Project Previews</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </motion.div>
      </motion.div>
      <motion.div className="footer-bottom" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce} transition={{ duration: 0.6 }}>
        <div className="container footer-bottom-inner">
          <p>Copyright © 2026 Tech Berry. All Rights Reserved.</p>
          <div className="legal-links"><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms">Terms &amp; Conditions</Link></div>
        </div>
      </motion.div>
    </footer>
  );
}
