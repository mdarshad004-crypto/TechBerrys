import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

function Counter({ value, suffix }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1300;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        node.textContent = `${Math.floor(progress * value)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix]);

  return <strong ref={ref}>0{suffix}</strong>;
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg-shapes" aria-hidden="true">
        <span className="shape shape-one" />
        <span className="shape shape-two" />
        <span className="shape shape-three" />
      </div>
      <div className="container hero-grid">
        <motion.div
          className="hero-copy reveal visible"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className="eyebrow">IT SERVICES &amp; DIGITAL SOLUTIONS</span>
          <h1>Build, Scale and Transform Your Business <span className="gradient-text">with IT</span></h1>
          <p>End-to-end IT services — from websites and apps to cloud, SEO and digital growth — tailored for modern businesses.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/services">Our Services <ArrowRight size={18} /></Link>
            <a className="btn btn-secondary" href="#projects"><span className="play-btn"><Play size={13} fill="currentColor" /></span> Watch Intro</a>
          </div>
          <div className="stats-row" aria-label="Key business statistics">
            <div className="stat-item"><Counter value={10} suffix="+" /><span>Years of Experience</span></div>
            <div className="stat-item"><Counter value={500} suffix="+" /><span>Projects Delivered</span></div>
            <div className="stat-item"><Counter value={99} suffix="%" /><span>Client Satisfaction</span></div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual reveal visible"
          aria-label="Technology dashboard illustration"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12 }}
        >
          <div className="visual-glow" />
          <div className="tech-scene">
            <div className="platform" />
            <motion.div className="floating-item cloud-item" animate={{ y: [0, -9, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <svg viewBox="0 0 80 64" aria-hidden="true">
                <path d="M22 52c-9.4 0-17-7.6-17-17 0-8.7 6.5-15.8 14.9-16.7C22.3 7.5 29.7 2 38 2c11.3 0 20.5 8.7 21.3 19.8 2 .8 3.7 2.6 3.7 5.2 0 3.1-2.5 5.5-5.5 5.5h-41.5Z" fill="url(#cloudGradient)" />
                <defs><linearGradient id="cloudGradient" x1="0" x2="1"><stop offset="0%" stopColor="#89d5ff" /><stop offset="100%" stopColor="#1877ff" /></linearGradient></defs>
              </svg>
            </motion.div>
            <motion.div className="floating-item code-item" animate={{ y: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
              <svg viewBox="0 0 86 86" aria-hidden="true">
                <rect x="12" y="18" width="62" height="48" rx="12" fill="#eaf5ff" />
                <path d="m26 32-10 11 10 11m34-22 10 11-10 11M46 24 36 62" stroke="#0a67ef" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <motion.div className="floating-item dashboard-item" animate={{ y: [0, -7, 0] }} transition={{ duration: 4.3, repeat: Infinity }}>
              <svg viewBox="0 0 90 90" aria-hidden="true">
                <rect x="12" y="18" width="66" height="46" rx="10" fill="#0b2f6e" />
                <path d="M20 58h50" stroke="#67d0ff" strokeWidth="4" strokeLinecap="round" />
                <path d="M22 48c10-12 16-18 22-18 10 0 16 10 24 10" stroke="#c7f7ff" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="48" cy="35" r="6" fill="#00a8ff" />
              </svg>
            </motion.div>
            <motion.div className="floating-item settings-item" animate={{ y: [0, 7, 0] }} transition={{ duration: 4.8, repeat: Infinity }}>
              <svg viewBox="0 0 84 84" aria-hidden="true">
                <circle cx="42" cy="42" r="15" fill="#dcecff" />
                <path d="M42 8v12M42 64v12M8 42h12M64 42h12M18 18l8 8M58 58l8 8M58 18l-8 8M26 58l-8 8" stroke="#008cff" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </motion.div>
            <div className="laptop-wrap">
              <div className="laptop-screen">
                <div className="screen-header"><span className="dot red" /><span className="dot yellow" /><span className="dot green" /></div>
                <div className="screen-body">
                  <div className="code-block code-one"><span /><span /><span /></div>
                  <div className="chart-wrap"><div className="bar b1" /><div className="bar b2" /><div className="bar b3" /><div className="bar b4" /><div className="bar b5" /></div>
                </div>
              </div>
              <div className="laptop-base" />
            </div>
            <div className="plant plant-left" aria-hidden="true" />
            <div className="plant plant-right" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
