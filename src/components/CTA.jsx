import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Send } from 'lucide-react';

export default function CTA({ onQuote }) {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div className="cta-banner reveal visible" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="cta-content">
            <span className="eyebrow eyebrow-light">LET'S BUILD YOUR NEXT MOVE</span>
            <h2>Have a Project in Mind?</h2>
            <p>Let's discuss your project and turn your ideas into reality.</p>
          </div>
          <div className="cta-actions">
            <button type="button" className="btn btn-primary btn-light" onClick={onQuote}>Get a Free Quote <ArrowRight size={18} /></button>
            <a className="btn btn-secondary btn-dark" href="https://wa.me/?text=Hi%20Tech%20Berry%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
          <div className="rocket-icon" aria-hidden="true"><Send size={36} /></div>
        </motion.div>
      </div>
    </section>
  );
}
