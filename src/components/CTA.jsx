import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Send } from 'lucide-react';
import { revealUp, staggerChildren, viewportOnce } from './motion.js';
import { PrimaryButton, SecondaryButton } from './Button.jsx';

export default function CTA({ onQuote, onWhatsApp }) {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div className="cta-banner reveal visible" variants={revealUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div className="cta-content" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <span className="eyebrow eyebrow-light">LET'S BUILD YOUR NEXT MOVE</span>
            <motion.h2 variants={revealUp}>Have a Project in Mind?</motion.h2>
            <motion.p variants={revealUp}>Let's turn your ideas into powerful digital experiences.</motion.p>
          </motion.div>
          <motion.div className="cta-actions" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <PrimaryButton className="btn-light" type="button" onClick={onQuote} variants={revealUp}>Get a Free Quote <ArrowRight size={18} /></PrimaryButton>
            <SecondaryButton className="btn-dark" type="button" onClick={onWhatsApp} variants={revealUp}>
              <MessageCircle size={18} /> Chat on WhatsApp
            </SecondaryButton>
          </motion.div>
          <div className="rocket-icon" aria-hidden="true"><Send size={36} /></div>
        </motion.div>
      </div>
    </section>
  );
}
