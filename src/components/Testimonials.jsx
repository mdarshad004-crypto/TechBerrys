import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageSquareQuote, Quote } from 'lucide-react';
import { revealUp, viewportOnce } from './motion.js';
import { PrimaryButton } from './Button.jsx';
import ClientFeedbackDialog from './ClientFeedbackDialog.jsx';

const feedbackSlots = Array.from({ length: 6 }, (_, index) => ({
  id: `feedback-slot-${index + 1}`,
  number: String(index + 1).padStart(2, '0'),
}));

const slideInterval = 4000;
const slideGap = 16;

function getVisibleCount(width) {
  if (width <= 600) return 1;
  if (width <= 1024) return 2;
  return 3;
}

export default function Testimonials() {
  const carouselRef = useRef(null);
  const viewportRef = useRef(null);
  const touchStartX = useRef(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [metrics, setMetrics] = useState({ width: 0, visibleCount: 3 });
  const prefersReducedMotion = useReducedMotion();
  const trackControls = useAnimationControls();
  const visibleCount = metrics.visibleCount;
  const slideWidth = metrics.width > 0
    ? (metrics.width - slideGap * (visibleCount - 1)) / visibleCount
    : 0;
  const stride = slideWidth + slideGap;
  const trackSlides = [
    ...feedbackSlots.slice(-visibleCount),
    ...feedbackSlots,
    ...feedbackSlots.slice(0, visibleCount),
  ];
  const normalizedIndex = (currentIndex + feedbackSlots.length) % feedbackSlots.length;
  const trackIndex = visibleCount + currentIndex;
  const trackWidth = stride * trackSlides.length - slideGap;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const nextCount = getVisibleCount(width);
      setMetrics((current) => (
        current.width === width && current.visibleCount === nextCount
          ? current
          : { width, visibleCount: nextCount }
      ));
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => index + 1);
    }, slideInterval);
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  useEffect(() => {
    if (!stride) return undefined;
    let active = true;
    const targetX = -trackIndex * stride;
    trackControls.start({
      x: targetX,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }).then(() => {
      if (!active) return;
      if (currentIndex >= feedbackSlots.length) {
        trackControls.set({ x: -visibleCount * stride });
        setCurrentIndex(0);
      } else if (currentIndex < 0) {
        const lastIndex = feedbackSlots.length - 1;
        trackControls.set({ x: -(visibleCount + lastIndex) * stride });
        setCurrentIndex(lastIndex);
      }
    });
    return () => {
      active = false;
    };
  }, [currentIndex, prefersReducedMotion, stride, trackControls, trackIndex, visibleCount]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) >= 45) {
      setCurrentIndex((index) => index + (delta < 0 ? 1 : -1));
    }
  };

  const goToSlide = (targetIndex) => {
    const difference = targetIndex - normalizedIndex;
    if (difference > feedbackSlots.length / 2) {
      setCurrentIndex(targetIndex - feedbackSlots.length);
    } else if (difference < -feedbackSlots.length / 2) {
      setCurrentIndex(targetIndex + feedbackSlots.length);
    } else {
      setCurrentIndex(targetIndex);
    }
  };

  return (
    <section className="testimonials testimonials--spotlight" aria-labelledby="testimonials-title">
      <div className="container">
        <motion.div
          className="section-header reveal visible testimonials-header"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="eyebrow eyebrow-blue">CLIENT SUCCESS</span>
          <h2 id="testimonials-title">Your Growth Is Our Greatest Achievement.</h2>
          <p>Approved customer stories will be featured here as they become available.</p>
        </motion.div>

        <motion.div
          ref={carouselRef}
          className="testimonial-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client feedback placeholders"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="testimonial-viewport" ref={viewportRef}>
            <motion.div
              className="testimonial-track"
              style={{ width: `${trackWidth}px`, gap: `${slideGap}px` }}
              initial={{ x: 0 }}
              animate={trackControls}
            >
              {trackSlides.map((slot, index) => (
                <motion.article
                  className="testimonial-placeholder-card"
                  key={`${slot.id}-${index}`}
                  style={{ flex: `0 0 ${slideWidth}px` }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.005 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  aria-label="Client feedback coming soon placeholder"
                >
                  <span className="testimonial-placeholder-quote" aria-hidden="true">
                    <Quote size={22} fill="currentColor" />
                  </span>
                  <span className="testimonial-placeholder-number">FEEDBACK SLOT {slot.number}</span>
                  <h3>Client feedback coming soon</h3>
                  <p>Approved client feedback will appear here when it is available.</p>
                  <span className="testimonial-placeholder-note">Placeholder — not a client review</span>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <div className="testimonial-carousel-footer">
            <div className="testimonial-carousel-status" aria-live="polite">
              {prefersReducedMotion ? 'Motion reduced' : isPaused ? 'Carousel paused' : 'Updates every 4 seconds'}
            </div>
            <div className="testimonial-carousel-controls">
              <button
                className="testimonial-carousel-arrow"
                type="button"
                aria-label="Previous feedback placeholder"
                onClick={() => setCurrentIndex((index) => index - 1)}
              >
                <ArrowLeft size={18} />
              </button>
              <div className="testimonial-pagination" role="group" aria-label="Choose feedback slide">
                {feedbackSlots.map((slot, index) => (
                  <button
                    className={`testimonial-pagination-dot${index === normalizedIndex ? ' is-active' : ''}`}
                    key={slot.id}
                    type="button"
                    aria-label={`Go to feedback slot ${slot.number}`}
                    aria-current={index === normalizedIndex ? 'true' : undefined}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
              <button
                className="testimonial-carousel-arrow"
                type="button"
                aria-label="Next feedback placeholder"
                onClick={() => setCurrentIndex((index) => index + 1)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="testimonial-share">
            <span className="testimonial-share-icon"><MessageSquareQuote size={20} aria-hidden="true" /></span>
            <div>
              <h3>Your Experience Matters</h3>
              <p>We're building lasting partnerships with our clients. Client feedback will be featured here as it becomes available.</p>
            </div>
            <PrimaryButton type="button" className="testimonial-share-button" onClick={() => setFeedbackOpen(true)}>
              Share Your Experience
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {feedbackOpen && <ClientFeedbackDialog onClose={() => setFeedbackOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
