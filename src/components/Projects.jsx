import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Layers3, Sparkles } from 'lucide-react';
import { revealScale, revealUp, staggerChildren, viewportOnce } from './motion.js';
import { PrimaryButton } from './Button.jsx';
import { portfolioCategories, portfolioProjects } from '../data/portfolioProjects.js';

const projects = [
  { title: 'E-Commerce Website', category: 'E-COMMERCE', type: 'commerce', filter: 'Commerce' },
  { title: 'Corporate Website', category: 'CORPORATE', type: 'business', filter: 'Websites' },
  { title: 'Mobile Application', category: 'MOBILE APP', type: 'mobile', filter: 'Apps' },
];

const projectFilters = ['All', 'Commerce', 'Websites', 'Apps'];

function ProjectArt({ type }) {
  if (type === 'commerce') {
    return (
      <div className="project-art project-art--commerce" aria-hidden="true">
        <div className="art-copy"><span>OBJECTS FOR EVERY DAY</span><strong>Find your<br />new favourite.</strong><i>Explore collection <ArrowRight size={13} /></i></div>
        <div className="art-product art-product--one" /><div className="art-product art-product--two" />
      </div>
    );
  }
  if (['business', 'business-website', 'it-services-website'].includes(type)) {
    return (
      <div className={`project-art project-art--business project-art--${type}`} aria-hidden="true">
        <div className="art-brand-mark">N</div><span className="art-line art-line--long" /><span className="art-line" />
        <div className="art-business-panel"><span /><span /><span /><span /></div>
      </div>
    );
  }
  if (['mobile', 'business-application', 'customer-application'].includes(type)) {
    return (
      <div className={`project-art project-art--mobile project-art--${type}`} aria-hidden="true">
        <div className="art-phone"><span className="art-phone-camera" /><i /><strong>Good morning</strong><span className="art-phone-card" /><span className="art-phone-row" /><span className="art-phone-row" /></div>
        <span className="art-mobile-orb" />
      </div>
    );
  }
  if (type === 'shopify' || type === 'shop-platform') {
    return (
      <div className={`project-art project-art--shopify project-art--${type}`} aria-hidden="true">
        <div className="art-store-label">STORE CONCEPT</div>
        <div className="art-store-caption"><strong>Everyday Objects</strong><i>COLLECTION</i></div>
        <div className="art-store-products"><span /><span /><span /></div>
      </div>
    );
  }
  if (type === 'dashboard') {
    return (
      <div className="project-art project-art--dashboard" aria-hidden="true">
        <div className="art-dashboard-window">
          <div className="art-dashboard-sidebar"><i /><i /><i /><i /></div>
          <div className="art-dashboard-main">
            <div className="art-dashboard-top"><span /><i /><i /></div>
            <div className="art-dashboard-stats"><i /><i /><i /></div>
            <div className="art-dashboard-chart">
              <span /><span /><span /><span /><span /><span /><span />
            </div>
            <div className="art-dashboard-lines"><i /><i /><i /></div>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'design') {
    return (
      <div className="project-art project-art--design" aria-hidden="true">
        <div className="art-design-copy"><span>PRODUCT DESIGN</span><strong>Clarity in<br />every detail.</strong><i /></div>
        <div className="art-design-board">
          <span className="art-design-board-top"><i /><i /><i /></span>
          <span className="art-design-color" />
          <span className="art-design-line art-design-line--wide" />
          <span className="art-design-line" />
          <span className="art-design-button" />
        </div>
        <span className="art-design-orb" />
      </div>
    );
  }
  if (type === 'mobile-ui') {
    return (
      <div className="project-art project-art--design project-art--mobile-ui" aria-hidden="true">
        <div className="art-design-copy"><span>MOBILE APP UI</span><strong>Simple steps.<br />Better flow.</strong><i /></div>
        <div className="art-phone"><span className="art-phone-camera" /><i /><strong>Good morning</strong><span className="art-phone-card" /><span className="art-phone-row" /><span className="art-phone-row" /></div>
        <span className="art-design-orb" />
      </div>
    );
  }
  return null;
}

function ProjectCard({ project }) {
  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--project-tilt-x', `${x * 2.5}deg`);
    event.currentTarget.style.setProperty('--project-tilt-y', `${y * -2.5}deg`);
    event.currentTarget.style.setProperty('--project-preview-tilt-x', `${x * 1.4}deg`);
    event.currentTarget.style.setProperty('--project-preview-tilt-y', `${y * -1.4}deg`);
  };
  const resetTilt = (event) => {
    event.currentTarget.style.removeProperty('--project-tilt-x');
    event.currentTarget.style.removeProperty('--project-tilt-y');
    event.currentTarget.style.removeProperty('--project-preview-tilt-x');
    event.currentTarget.style.removeProperty('--project-preview-tilt-y');
  };

  return (
    <motion.article
      className={`project-card project-card--${project.type}`}
      variants={revealScale}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      layout
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="project-preview" data-cursor-hover><ProjectArt type={project.type} /></div>
      <div className="project-meta"><div><span>{project.category}</span><h3>{project.title}</h3></div><ArrowRight size={18} aria-hidden="true" /></div>
      <div className="project-card-details">
        <span className="project-placeholder-status">Editable portfolio placeholder</span>
        <p>Add an approved project summary and outcomes before publishing this case study.</p>
        <span className="project-stack-placeholder">Add verified technology stack</span>
        <PrimaryButton type="button" disabled aria-describedby={`${project.type}-case-study-note`}>
          View Case Study <ArrowRight size={16} />
        </PrimaryButton>
        <span className="project-case-study-note" id={`${project.type}-case-study-note`}>Case study details are pending verification.</span>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const visibleProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.filter === activeFilter);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <motion.div
          className="project-section-head"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="project-head">
            <span className="eyebrow eyebrow-blue">PROJECT PREVIEWS</span>
            <h2>Real Projects, Real Results</h2>
            <p>Explore how TechBerry helps businesses create better digital experiences. Project details are placeholders until verified and approved for publication.</p>
          </div>
          <PrimaryButton as="link" to="/projects" className="btn-inline">View All Projects <ArrowRight size={18} /></PrimaryButton>
        </motion.div>
        <div className="project-filters" role="group" aria-label="Filter projects">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`project-filter${activeFilter === filter ? ' is-active' : ''}`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <motion.div
          className="project-grid"
          data-filtered={activeFilter !== 'All'}
          aria-label="Editable case study placeholders"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => <ProjectCard key={project.type} project={project} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function PortfolioCard({ project }) {
  const handlePreviewError = (event) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied === 'true') return;

    image.dataset.fallbackApplied = 'true';
    const label = project.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    const fallback = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eaf3ff"/><stop offset="1" stop-color="#f8faff"/></linearGradient></defs><rect width="1200" height="750" fill="url(#bg)"/><rect x="130" y="100" width="940" height="550" rx="28" fill="#fff"/><rect x="170" y="148" width="860" height="58" rx="14" fill="#f3f6fb"/><circle cx="200" cy="177" r="8" fill="#ff938b"/><circle cx="226" cy="177" r="8" fill="#f2ca6c"/><circle cx="252" cy="177" r="8" fill="#74c995"/><text x="190" y="330" fill="#172554" font-family="Arial,sans-serif" font-size="38" font-weight="700">${label}</text><text x="190" y="390" fill="#64748b" font-family="Arial,sans-serif" font-size="22">Original concept preview</text></svg>`;
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fallback)}`;
  };

  return (
    <motion.article
      className={`portfolio-card portfolio-card--${project.id}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.35 } }}
    >
      <div className="portfolio-card-preview">
        <img
          className="portfolio-project-image"
          src={project.image}
          alt={`${project.title} interface concept preview`}
          width="1200"
          height="780"
          loading="lazy"
          decoding="async"
          onError={handlePreviewError}
        />
        <span className="portfolio-concept-badge"><Sparkles size={13} /> Concept preview</span>
      </div>
      <div className="portfolio-card-body">
        <span className="portfolio-card-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="portfolio-tags" aria-label="Concept tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <span className="portfolio-tech-stack">Technology stack: to be confirmed</span>
        <a
          className="portfolio-card-link"
          href={project.projectUrl || project.image}
          target="_blank"
          rel="noreferrer"
        >
          View Project <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

export function PortfolioProjects({ onQuote }) {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const visibleProjects = activeFilter === 'All Projects'
    ? portfolioProjects
    : portfolioProjects.filter((project) => project.category.trim().toLowerCase() === activeFilter.trim().toLowerCase());

  const startProject = () => onQuote?.();

  return (
    <div className="projects-page">
      <section className="projects-page-hero">
        <div className="container projects-page-hero-grid">
          <motion.div
            className="projects-page-hero-copy"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="eyebrow eyebrow-blue" variants={revealUp}>PROJECT PORTFOLIO</motion.span>
            <motion.h1 variants={revealUp}>Ideas Into Reality.<br /><span>Digital Experiences That Deliver.</span></motion.h1>
            <motion.p variants={revealUp}>
              Explore selected digital project concepts and technology experiences designed to help businesses grow.
            </motion.p>
            <motion.div className="projects-page-actions" variants={revealUp}>
              <a className="projects-primary-link" href="#portfolio-project-grid">
                Explore Our Projects <ArrowDown size={17} aria-hidden="true" />
              </a>
              <button className="projects-secondary-link" type="button" onClick={startProject}>
                Start a Project <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            </motion.div>
            <motion.span className="projects-concept-note" variants={revealUp}>
              Portfolio visuals are design concepts, not verified client case studies.
            </motion.span>
          </motion.div>

          <motion.div
            className="projects-hero-visual"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="projects-visual-glow" />
            <div className="projects-visual-orbit projects-visual-orbit--one" />
            <div className="projects-visual-orbit projects-visual-orbit--two" />
            <div className="projects-visual-window">
              <div className="projects-window-bar"><i /><i /><i /><span>Digital experiences</span></div>
              <div className="projects-window-content">
                <span>DESIGN. BUILD. GROW.</span>
                <strong>Ideas, brought<br />to life.</strong>
                <i />
                <div><b /><b /><b /></div>
              </div>
            </div>
            <div className="projects-visual-float projects-visual-float--layers"><Layers3 size={19} /><span>Thoughtful design</span></div>
            <div className="projects-visual-float projects-visual-float--spark"><Sparkles size={18} /><span>Digital craft</span></div>
          </motion.div>
        </div>
      </section>

      <section className="featured-project-section" aria-labelledby="featured-project-title">
        <div className="container featured-project">
          <motion.div
            className="featured-project-preview"
            variants={revealScale}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ProjectArt type="dashboard" />
            <span className="portfolio-concept-badge"><Sparkles size={13} /> Concept preview</span>
          </motion.div>
          <motion.div
            className="featured-project-copy"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span className="eyebrow eyebrow-blue" variants={revealUp}>FEATURED CONCEPT</motion.span>
            <motion.span className="featured-project-category" variants={revealUp}>WEB APPLICATION · INTERFACE CONCEPT</motion.span>
            <motion.h2 id="featured-project-title" variants={revealUp}>A clearer view of your business.</motion.h2>
            <motion.p variants={revealUp}>
              An exploratory dashboard concept that brings useful information into a calm, easy-to-scan interface. This is a visual direction preview, not a published client project.
            </motion.p>
            <motion.div className="portfolio-tags" variants={revealUp}>
              <span>Dashboard concept</span><span>UI/UX direction</span><span>Stack to be confirmed</span>
            </motion.div>
            <motion.button className="featured-project-link" type="button" onClick={startProject} variants={revealUp}>
              Explore a similar project <ArrowRight size={18} aria-hidden="true" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="portfolio-projects-section" id="portfolio-project-grid" aria-labelledby="portfolio-projects-title">
        <div className="container">
          <motion.div
            className="portfolio-section-heading"
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="eyebrow eyebrow-blue">SELECTED CONCEPTS</span>
            <h2 id="portfolio-projects-title">Digital ideas, thoughtfully imagined.</h2>
            <p>These illustrative previews show possible design directions. They do not represent verified client work or outcomes.</p>
          </motion.div>
          <div className="portfolio-filters" role="group" aria-label="Filter project concepts">
            {portfolioCategories.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`portfolio-filter${activeFilter === filter ? ' is-active' : ''}`}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          {visibleProjects.length > 0 ? (
            <div className="portfolio-project-grid">
              {visibleProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="portfolio-empty-state" role="status">
              <h3>No projects available in this category yet.</h3>
              <button type="button" className="projects-primary-link" onClick={() => setActiveFilter('All Projects')}>
                Explore All Projects <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="projects-page-cta" aria-labelledby="projects-page-cta-title">
        <div className="container projects-page-cta-inner">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span className="eyebrow eyebrow-blue" variants={revealUp}>LET'S CREATE WHAT'S NEXT</motion.span>
            <motion.h2 id="projects-page-cta-title" variants={revealUp}>Have a Project in Mind?</motion.h2>
            <motion.p variants={revealUp}>Let's turn your next big idea into a powerful digital experience.</motion.p>
          </motion.div>
          <motion.button
            className="projects-primary-link"
            type="button"
            onClick={startProject}
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            Let's Build Something Great <ArrowRight size={18} aria-hidden="true" />
          </motion.button>
          <span className="projects-cta-orb projects-cta-orb--one" aria-hidden="true" />
          <span className="projects-cta-orb projects-cta-orb--two" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
}
