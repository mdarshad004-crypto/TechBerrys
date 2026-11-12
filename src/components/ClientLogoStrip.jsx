import { motion } from 'framer-motion';
import { revealUp, viewportOnce } from './motion.js';

export default function ClientLogoStrip() {
  return (
    <section className="client-logo-strip" aria-label="Client and partner logos">
      <motion.div
        className="container client-logo-strip-content"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="eyebrow eyebrow-blue">CLIENTS &amp; PARTNERS</span>
        <p>Approved client and partner logos will be added here when assets and permission are available.</p>
      </motion.div>
    </section>
  );
}
