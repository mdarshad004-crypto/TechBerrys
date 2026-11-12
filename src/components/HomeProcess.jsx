import { motion } from 'framer-motion';
import { ArrowRight, ClipboardCheck, Compass, Rocket, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { revealUp, staggerChildren, viewportOnce } from './motion.js';

const steps = [
  {
    number: '01',
    title: 'Discover & Align',
    description: 'Understand business goals, project requirements, target audience and expectations.',
    Icon: Compass,
  },
  {
    number: '02',
    title: 'Build & Prepare',
    description: 'Create a clear strategy, finalize designs and plan the development roadmap.',
    Icon: Workflow,
  },
  {
    number: '03',
    title: 'Launch & Refine',
    description: 'Build, test, optimize and deploy the approved digital solution.',
    Icon: Rocket,
  },
  {
    number: '04',
    title: 'Optimize & Grow',
    description: 'Provide ongoing support and improvements according to the agreed scope.',
    Icon: ClipboardCheck,
  },
];

export default function HomeProcess() {
  return (
    <section className="home-process" aria-labelledby="home-process-title">
      <div className="container">
        <motion.div
          className="home-process-heading"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="eyebrow eyebrow-blue">OUR WORKING PROCESS</span>
          <h2 id="home-process-title">Here's Our Proven, Flexible Framework.</h2>
          <p>From understanding your requirements to delivering the final solution, we follow a structured process.</p>
        </motion.div>
        <motion.ol
          className="home-process-grid"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map(({ number, title, description, Icon }) => (
            <motion.li className="home-process-card" key={number} variants={revealUp}>
              <span className="home-process-icon"><Icon size={24} aria-hidden="true" /></span>
              <span className="home-process-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.li>
          ))}
        </motion.ol>
        <Link className="home-process-link" to="/about#about-process-title">
          See how we work <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
