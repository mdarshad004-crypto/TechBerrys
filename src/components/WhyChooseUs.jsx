import { Award, Headset, Layers3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  { title: 'Expert Team', Icon: Award },
  { title: 'Reliable Solutions', Icon: Layers3 },
  { title: 'On-Time Delivery', Icon: Zap },
  { title: 'Ongoing Support', Icon: Headset },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose" id="about">
      <div className="container">
        <motion.div className="choice-banner reveal visible" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="choice-intro">
            <span className="eyebrow eyebrow-light">WHY CHOOSE US</span>
            <h2>Your Trusted Technology Partner</h2>
          </div>
          <div className="features-grid">
            {benefits.map(({ title, Icon }) => (
              <div className="feature-item" key={title}>
                <span className="feature-icon"><Icon size={34} strokeWidth={1.7} /></span>
                <span>{title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
