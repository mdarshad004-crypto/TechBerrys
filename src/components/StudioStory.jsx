import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Blocks,
  Cloud,
  Code2,
  Headset,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { revealLeft, revealRight, revealUp, staggerChildren, viewportOnce } from './motion.js';

const stories = [
  {
    id: 'technology',
    eyebrow: 'THOUGHTFUL TECHNOLOGY',
    title: 'Technology That Works for You',
    description: 'We start by understanding your business requirements, then help identify practical technology solutions aligned with your goals.',
    detail: 'Clear requirements. Considered choices. Useful outcomes.',
    Icon: Target,
    FloatIcon: Cloud,
    label: 'Business-first',
    reverse: false,
  },
  {
    id: 'goals',
    eyebrow: 'BUILT AROUND YOUR GOALS',
    title: 'Solutions Built Around Your Goals',
    description: 'Business-focused planning and customized development help shape user-friendly digital experiences for your audience.',
    detail: 'Design and development shaped around your needs.',
    Icon: Blocks,
    FloatIcon: Layers3,
    label: 'Made for your goals',
    reverse: true,
  },
  {
    id: 'support',
    eyebrow: 'A PARTNER FOR WHAT’S NEXT',
    title: 'Reliable Support and Long-Term Growth',
    description: 'We focus on quality, maintenance, improvements and ongoing technical assistance according to the agreed project scope.',
    detail: 'Support that follows the agreed scope.',
    Icon: ShieldCheck,
    FloatIcon: Headset,
    label: 'Quality-focused',
    reverse: false,
  },
];

function StoryVisual({ story }) {
  const { id, Icon, FloatIcon, label, detail } = story;
  const handlePointerMove = (event) => {
    if (id !== 'technology' || event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    const style = event.currentTarget.style;
    style.setProperty('--story-tilt-x', `${y * -1.5}deg`);
    style.setProperty('--story-tilt-y', `${x * 1.5}deg`);
    style.setProperty('--story-team-x', `${x * 4}px`);
    style.setProperty('--story-team-y', `${y * 3}px`);
    style.setProperty('--story-build-x', `${x * -3}px`);
    style.setProperty('--story-build-y', `${y * -2}px`);
    style.setProperty('--story-core-x', `${x * 2}px`);
    style.setProperty('--story-core-y', `${y * 2}px`);
  };
  const resetPointer = (event) => {
    if (id !== 'technology') return;
    ['--story-tilt-x', '--story-tilt-y', '--story-team-x', '--story-team-y', '--story-build-x', '--story-build-y', '--story-core-x', '--story-core-y']
      .forEach((property) => event.currentTarget.style.removeProperty(property));
  };
  return (
    <div className={`story-visual story-visual--${id}`} aria-hidden="true" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <div className="story-light" />
      <div className="story-orbit story-orbit--outer" />
      <div className="story-orbit story-orbit--inner" />
      <div className="story-core"><Icon size={34} strokeWidth={1.5} /></div>
      <div className="story-glass-card story-glass-card--team">
        <FloatIcon size={20} />
        <span>{label}</span>
        <strong>{detail}</strong>
      </div>
      <div className="story-glass-card story-glass-card--build">
        <Code2 size={20} />
        <span>TechBerry</span>
        <strong>Technology, creativity and collaboration.</strong>
      </div>
      <span className="story-dot story-dot--one" />
      <span className="story-dot story-dot--two" />
    </div>
  );
}

export default function StudioStory() {
  return (
    <section className="studio-story" aria-label="The TechBerry difference">
      <div className="container">
        {stories.map((story, index) => {
          const TextReveal = story.reverse ? revealLeft : revealRight;
          const VisualReveal = story.reverse ? revealRight : revealLeft;
          return (
            <div className={`story-layout${story.reverse ? ' story-layout--reverse' : ''}`} key={story.id}>
              <motion.div
                className="story-visual-wrap"
                variants={VisualReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <StoryVisual story={story} />
              </motion.div>
              <motion.div
                className="story-copy"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.span className="eyebrow eyebrow-blue" variants={revealUp}>{story.eyebrow}</motion.span>
                <motion.h2 variants={revealUp}>{story.title}</motion.h2>
                <motion.p variants={revealUp}>{story.description}</motion.p>
                {index === 0 && (
                  <motion.p variants={revealUp}>
                    We bring design, engineering and digital strategy together to create meaningful digital experiences.
                  </motion.p>
                )}
                {index === stories.length - 1 ? (
                  <motion.div variants={revealUp}>
                    <Link className="story-link" to="/contact">Talk through your project <ArrowUpRight size={17} /></Link>
                  </motion.div>
                ) : (
                  <motion.div className="story-capability" variants={revealUp}>
                    <Sparkles size={17} aria-hidden="true" />
                    <span>{index === 0 ? 'Clear, collaborative project planning' : 'Thoughtful design and development'}</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
