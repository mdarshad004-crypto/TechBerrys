import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Device({ type, heading, subtitle }) {
  return (
    <div className={`device ${type}`}>
      <div className="device-screen">
        <div className="screen-bar"><span /><span /><span /></div>
        <div className="mockup-content">
          <div className="mock-header"><strong>{heading}</strong><span>{subtitle}</span></div>
          {type === 'device-one' && <><div className="mock-chart" /><div className="mock-cards"><span /><span /><span /></div></>}
          {type === 'device-two' && <div className="shop-grid"><div /><div /><div /></div>}
          {type === 'device-three' && <div className="analytics-lines"><span /><span /><span /></div>}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container project-layout">
        <motion.div className="project-head reveal visible" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="eyebrow eyebrow-blue">FEATURED PROJECTS</span>
          <h2>Our Recent Work</h2>
          <p>A glimpse of the digital solutions we've built for our clients.</p>
          <Link to="/projects" className="btn btn-primary btn-inline">View All Projects <ArrowRight size={18} /></Link>
        </motion.div>
        <motion.div className="showcase reveal visible" aria-label="Project mockups" initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <Device type="device-one" heading="Healthcare" subtitle="Website" />
          <Device type="device-two" heading="E-commerce" subtitle="Store" />
          <Device type="device-three" heading="Business" subtitle="Growth" />
        </motion.div>
      </div>
    </section>
  );
}
