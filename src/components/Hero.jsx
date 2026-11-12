import { Fragment, useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight, Cloud, Code2, Play } from 'lucide-react';
import { revealUp, staggerChildren } from './motion.js';
import { PrimaryButton, SecondaryButton } from './Button.jsx';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const backgroundVideoRef = useRef(null);
  const sceneX = useSpring(useMotionValue(0), { stiffness: 70, damping: 22, mass: 0.6 });
  const sceneY = useSpring(useMotionValue(0), { stiffness: 70, damping: 22, mass: 0.6 });
  const backgroundX = useSpring(useMotionValue(0), { stiffness: 50, damping: 24, mass: 0.7 });
  const backgroundY = useSpring(useMotionValue(0), { stiffness: 50, damping: 24, mass: 0.7 });

  useEffect(() => {
    const hero = heroRef.current;
    const video = backgroundVideoRef.current;
    if (!hero || !video) return undefined;

    let isVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      const shouldPlay = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      if (shouldPlay === isVisible) return;
      isVisible = shouldPlay;

      if (!shouldPlay || shouldReduceMotion) {
        video.pause();
        video.classList.remove('is-playing');
        return;
      }

      video.play().then(() => {
        if (isVisible && !video.paused) video.classList.add('is-playing');
      }).catch((error) => {
        if (error.name !== 'AbortError') {
          console.warn('Hero background video could not start playback.', error);
        }
      });
    }, { threshold: [0, 0.2, 0.35] });

    observer.observe(hero);
    return () => {
      observer.disconnect();
      video.pause();
      video.classList.remove('is-playing');
    };
  }, [shouldReduceMotion]);

  const handlePointerMove = (event) => {
    if (shouldReduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    sceneX.set(pointerX * 6);
    sceneY.set(pointerY * 6);
    backgroundX.set(pointerX * -7);
    backgroundY.set(pointerY * -5);
    event.currentTarget.style.setProperty('--hero-light-x', `${50 + pointerX * 8}%`);
    event.currentTarget.style.setProperty('--hero-light-y', `${44 + pointerY * 8}%`);
  };

  const resetParallax = () => {
    sceneX.set(0);
    sceneY.set(0);
    backgroundX.set(0);
    backgroundY.set(0);
    heroRef.current?.style.removeProperty('--hero-light-x');
    heroRef.current?.style.removeProperty('--hero-light-y');
  };

  return (
    <section ref={heroRef} className="hero" id="home" onPointerMove={handlePointerMove} onPointerLeave={resetParallax}>
      <motion.div
        className="hero-video-background"
        aria-hidden="true"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <video
          ref={backgroundVideoRef}
          className="hero-background-video"
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          poster="/assets/hero-technology-poster.jpg"
          tabIndex={-1}
        >
          <source src="/assets/hero-technology-background.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="hero-bg-shapes" aria-hidden="true">
        <span className="shape shape-one" />
        <span className="shape shape-two" />
        <span className="shape shape-three" />
      </div>
      <div className="container hero-grid">
        <motion.div
          className="hero-copy reveal visible"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">IT SERVICES &amp; DIGITAL SOLUTIONS</span>
          <motion.h1 variants={staggerChildren} initial={shouldReduceMotion ? false : 'hidden'} animate="visible">
            {['Build,', 'Scale', 'and', 'Transform', 'Your', 'Business'].map((word) => (
              <Fragment key={word}>
                <motion.span className="hero-word" variants={revealUp}>{word}</motion.span>{' '}
              </Fragment>
            ))}
            <motion.span className="hero-word" variants={revealUp}><span className="gradient-text">With IT</span></motion.span>
          </motion.h1>
          <motion.p variants={revealUp} initial={shouldReduceMotion ? false : 'hidden'} animate="visible" transition={{ delay: 0.5 }}>
            End-to-end IT services — from websites and apps to cloud, SEO and digital growth — tailored for modern businesses.
          </motion.p>
          <motion.div className="hero-actions" variants={staggerChildren} initial={shouldReduceMotion ? false : 'hidden'} animate="visible">
            <motion.div variants={revealUp} transition={{ delay: 0.58 }}>
              <PrimaryButton as="a" className="hero-cta-match" href="#services">
                Our Services <ArrowRight size={18} />
              </PrimaryButton>
            </motion.div>
            <motion.div variants={revealUp} transition={{ delay: 0.68 }}>
              <SecondaryButton as="a" href="#projects">
                <span className="play-btn"><Play size={13} fill="currentColor" /></span> Watch Intro
              </SecondaryButton>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual reveal visible"
          aria-label="Floating 3D glass animation"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ x: sceneX, y: sceneY }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="visual-glow" />
          <span className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <span className="hero-orbit hero-orbit--two" aria-hidden="true" />
          <span className="hero-float-card hero-float-card--code" aria-hidden="true"><Code2 size={22} /></span>
          <span className="hero-float-card hero-float-card--cloud" aria-hidden="true"><Cloud size={24} /></span>
        </motion.div>
      </div>
    </section>
  );
}
