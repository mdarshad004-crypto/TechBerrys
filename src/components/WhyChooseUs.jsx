import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock3, Headset, Lightbulb, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { revealUp, staggerChildren, viewportOnce } from './motion.js';
import { Link } from 'react-router-dom';

const benefits = [
  {
    title: 'Easy Collaboration',
    description: 'Work closely with a team that listens to your goals and keeps communication clear.',
    Icon: UsersRound,
  },
  {
    title: 'Customized Solutions',
    description: 'Digital experiences shaped around your business needs, audience and project scope.',
    Icon: Sparkles,
  },
  {
    title: 'Modern Technology',
    description: 'Thoughtful use of modern tools to create useful, scalable digital solutions.',
    Icon: Lightbulb,
  },
  {
    title: 'Quality-Focused Development',
    description: 'Careful attention to functionality, performance, responsiveness and detail.',
    Icon: ShieldCheck,
  },
  {
    title: 'Transparent Communication',
    description: 'Clear conversations about decisions, progress, requirements and expectations.',
    Icon: Clock3,
  },
  {
    title: 'Ongoing Technical Support',
    description: 'Assistance and improvements according to the agreed project scope.',
    Icon: Headset,
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isIntersecting = false;
    const syncPlayback = () => {
      if (reducedMotion.matches || !isIntersecting) {
        video.pause();
        return;
      }
      video.play().catch(() => setVideoPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.12 });

    observer.observe(section);
    reducedMotion.addEventListener('change', syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncPlayback);
      video.pause();
    };
  }, []);

  const handleCardPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty('--card-glow-x', `${x}%`);
    event.currentTarget.style.setProperty('--card-glow-y', `${y}%`);
  };

  const resetCardPointer = (event) => {
    event.currentTarget.style.removeProperty('--card-glow-x');
    event.currentTarget.style.removeProperty('--card-glow-y');
  };

  return (
    <section className="why-choose" id="about" ref={sectionRef}>
      <img className="why-choose-poster" src="/assets/why-choose-poster.svg" alt="" aria-hidden="true" />
      <video
        ref={videoRef}
        className={`why-choose-video${videoPlaying ? ' is-playing' : ''}`}
        src="/assets/why-choose-background.mp4"
        poster="/assets/why-choose-poster.svg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlaying={() => setVideoPlaying(true)}
        onPause={() => setVideoPlaying(false)}
        onError={() => setVideoPlaying(false)}
      />
      <div className="why-choose-overlay" aria-hidden="true" />
      <div className="why-choose-lighting" aria-hidden="true">
        <span className="why-choose-ring why-choose-ring--outer" />
        <span className="why-choose-ring why-choose-ring--inner" />
        <span className="why-choose-streak" />
      </div>
      <div className="container why-choose-content">
        <div className="choice-banner">
          <motion.div
            className="choice-intro"
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="eyebrow eyebrow-light">WHY CHOOSE TECHBERRY</span>
            <h2>Why Businesses Choose <span>TechBerry.</span></h2>
            <p>At TechBerry, we combine technology, creativity and strategic thinking to help businesses build better digital experiences. Our focus is on delivering reliable solutions that support business growth and long-term success.</p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {benefits.map(({ title, description, Icon }) => (
              <motion.article
                className="feature-item"
                key={title}
                variants={revealUp}
                onPointerMove={handleCardPointerMove}
                onPointerLeave={resetCardPointer}
              >
                <span className="feature-icon"><Icon size={30} strokeWidth={1.7} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="why-choose-cta"
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Link className="why-choose-discover" to="/about">
              Discover the TechBerry Difference <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
