import {
  BriefcaseBusiness,
  CalendarDays,
  Cloud,
  Code2,
  Layers3,
  Sparkles,
  TrendingUp,
  Target,
  UsersRound,
} from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { revealUp, staggerChildren, viewportOnce } from './motion.js';

const approachPillars = [
  {
    title: 'Understand your goals',
    description: 'We begin by learning about your business, audience, goals and project requirements.',
    Icon: Target,
    status: 'Discovery first',
  },
  {
    title: 'Shape the right solution',
    description: 'We bring together creative thinking, modern technology and user-focused design.',
    Icon: UsersRound,
    status: 'Built around your needs',
  },
  {
    title: 'Support what comes next',
    description: 'Ongoing assistance and improvements are provided according to the agreed project scope.',
    Icon: Sparkles,
    status: 'Long-term collaboration',
  },
];

const achievementMetrics = [
  {
    id: 'completed-projects',
    value: null,
    suffix: '',
    label: 'Projects Successfully Delivered',
    Icon: BriefcaseBusiness,
  },
  {
    id: 'active-clients',
    value: null,
    suffix: '',
    label: 'Active Clients',
    Icon: UsersRound,
  },
  {
    id: 'years-of-experience',
    value: null,
    suffix: '',
    label: 'Years of Experience',
    Icon: CalendarDays,
  },
  {
    id: 'client-satisfaction',
    value: null,
    suffix: '',
    label: 'Client Satisfaction',
    Icon: TrendingUp,
  },
];

function AchievementNumber({ value, suffix }) {
  const numberRef = useRef(null);
  const isInView = useInView(numberRef, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (!isInView) return undefined;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return undefined;
    }

    let frameId;
    let startTime;
    const duration = 1100;
    const animate = (timestamp) => {
      startTime ??= timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * easedProgress));
      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, prefersReducedMotion, value]);

  return (
    <strong className="credibility-achievement-value" ref={numberRef} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">{displayValue.toLocaleString()}{suffix}</span>
    </strong>
  );
}

export default function BusinessCredibility() {
  const availableMetrics = achievementMetrics.filter(
    ({ value }) => Number.isFinite(value) && value >= 0,
  );

  return (
    <section className="business-credibility" aria-labelledby="credibility-title">
      <div className="container">
        <div className="credibility-hero">
          <motion.div
            className="credibility-intro"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span className="eyebrow eyebrow-blue" variants={revealUp}>OUR APPROACH</motion.span>
            <motion.h2 id="credibility-title" variants={revealUp}>
              Technology That Starts With Your Goals
            </motion.h2>
            <motion.p variants={revealUp}>
              We bring together creative thinking, modern technology and user-focused design to build digital solutions that help businesses grow and move forward.
            </motion.p>
          </motion.div>

          <motion.div
            className="credibility-visual"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="credibility-orbit credibility-orbit--outer" />
            <span className="credibility-orbit credibility-orbit--inner" />
            <span className="credibility-particle credibility-particle--one" />
            <span className="credibility-particle credibility-particle--two" />
            <span className="credibility-particle credibility-particle--three" />
            <span className="credibility-float credibility-float--code"><Code2 size={21} /></span>
            <span className="credibility-float credibility-float--cloud"><Cloud size={21} /></span>
            <span className="credibility-float credibility-float--layers"><Layers3 size={20} /></span>
            <span className="credibility-shield"><Code2 size={68} strokeWidth={1.5} /></span>
            <span className="credibility-sparkle"><Sparkles size={20} /></span>
          </motion.div>
        </div>

        <motion.div
          className="credibility-indicators"
          role="list"
          aria-label="Our approach"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {approachPillars.map(({ title, description, Icon, status }) => (
            <motion.article className="credibility-indicator" role="listitem" key={title} variants={revealUp}>
              <span className="credibility-indicator-icon"><Icon size={22} aria-hidden="true" /></span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="credibility-status">{status}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {availableMetrics.length > 0 && <section className="credibility-achievements" aria-labelledby="credibility-achievements-title">
          <div className="credibility-section-heading">
            <span className="eyebrow eyebrow-blue">BUSINESS ACHIEVEMENTS</span>
            <h2 id="credibility-achievements-title">TechBerry by the Numbers</h2>
            <p>Measurable progress, meaningful partnerships and technology-driven growth.</p>
            <span className="credibility-achievements-draft">
              Draft figures — confirm before publishing. These are not verified company achievements.
            </span>
          </div>
          <motion.ul
            className="credibility-achievements-grid"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {availableMetrics.map(({ id, value, suffix, label, Icon }) => (
              <motion.li
                className="credibility-achievement"
                key={id}
                variants={revealUp}
                aria-label={`${value}${suffix} ${label}`}
              >
                <span className="credibility-achievement-icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <AchievementNumber value={value} suffix={suffix} />
                <span>{label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </section>}
      </div>
    </section>
  );
}
