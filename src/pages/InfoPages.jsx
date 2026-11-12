import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  Braces,
  ClipboardCheck,
  Code2,
  Cloud,
  Clock3,
  Eye,
  Globe2,
  Handshake,
  Lightbulb,
  Map,
  MessageCircle,
  Mail,
  PhoneCall,
  Palette,
  Rocket,
  Search,
  ShoppingBag,
  Smartphone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { services } from '../components/Services.jsx';
import { PortfolioProjects } from '../components/Projects.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ServiceIllustration from '../assets/images/ServiceIllustrations.jsx';
import { revealLeft, revealRight, revealUp, staggerChildren, viewportOnce } from '../components/motion.js';
import { PrimaryButton, SecondaryButton } from '../components/Button.jsx';
import WhatsAppEnquiryDialog from '../components/WhatsAppEnquiryDialog.jsx';

function PageIntro({ label, title, description, children }) {
  return (
    <section className="info-page">
      <motion.div
        className="container info-page-inner"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="eyebrow eyebrow-blue" variants={revealUp}>{label}</motion.span>
        <motion.h1 variants={revealUp}>{title}</motion.h1>
        <motion.p variants={revealUp}>{description}</motion.p>
        {children}
      </motion.div>
    </section>
  );
}

export function About({ onQuote, onWhatsApp }) {
  const coreValues = [
    { title: 'Innovation', description: 'Embracing modern ideas and technologies.', Icon: Lightbulb },
    { title: 'Quality', description: 'Focusing on performance, reliability and detail.', Icon: ShieldCheck },
    { title: 'Transparency', description: 'Building honest and clear partnerships.', Icon: Eye },
    { title: 'Collaboration', description: 'Working closely with clients at every stage.', Icon: Handshake },
  ];
  const workSteps = [
    { number: '01', title: 'Discovery & Understanding', description: 'We start by understanding your business, goals, target audience and project requirements.', Icon: Search },
    { number: '02', title: 'Strategy & Planning', description: 'We create a clear roadmap, define the project scope and select the right technologies.', Icon: Map },
    { number: '03', title: 'UI/UX Design', description: 'We design intuitive, modern and visually appealing interfaces focused on user experience.', Icon: Palette },
    { number: '04', title: 'Development', description: 'Our development process transforms approved designs into responsive, scalable and functional digital solutions.', Icon: Code2 },
    { number: '05', title: 'Testing & Quality Assurance', description: 'We carefully test functionality, performance, responsiveness and compatibility before launch.', Icon: ClipboardCheck },
    { number: '06', title: 'Launch & Ongoing Support', description: 'We deploy the final solution and provide ongoing assistance, maintenance and improvements according to the agreed scope.', Icon: Rocket },
  ];

  return (
    <section className="info-page about-page" aria-labelledby="about-page-title">
      <div className="container about-page-inner">
        <div className="about-hero-grid">
          <motion.div
            className="about-page-copy"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="eyebrow eyebrow-blue" variants={revealUp}>ABOUT TECHBERRY</motion.span>
            <motion.h1 id="about-page-title" variants={revealUp}>Technology That Turns Ideas Into Digital Growth.</motion.h1>
            <motion.p variants={revealUp}>
              At TechBerry, we believe great technology starts with understanding your business goals. We bring together creative thinking, modern technology and user-focused design to build digital solutions that help businesses grow and move forward.
            </motion.p>
            <motion.p className="about-page-services-copy" variants={revealUp}>
              From website development and e-commerce solutions to mobile applications, UI/UX design, cloud services and digital marketing, we focus on creating meaningful digital experiences tailored to your needs.
            </motion.p>

            <motion.div
              className="about-purpose-grid"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.article className="about-purpose-card" variants={revealRight}>
                <span className="about-purpose-icon"><BadgeCheck size={23} aria-hidden="true" /></span>
                <h2>Our Mission</h2>
                <p>To empower businesses with reliable, innovative and scalable digital solutions that simplify operations and create better opportunities for growth.</p>
              </motion.article>
              <motion.article className="about-purpose-card" variants={revealRight}>
                <span className="about-purpose-icon"><Sparkles size={23} aria-hidden="true" /></span>
                <h2>Our Vision</h2>
                <p>To become a trusted technology partner for businesses by delivering meaningful digital experiences through innovation, quality and long-term collaboration.</p>
              </motion.article>
            </motion.div>

            <motion.div variants={revealUp}>
              <PrimaryButton type="button" onClick={onQuote}>
                Let's Build Something Great Together <ArrowRight size={18} />
              </PrimaryButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-tech-visual"
            role="img"
            aria-label="Technology illustration with web development, cloud, and mobile application elements"
            variants={revealLeft}
            initial="hidden"
            animate="visible"
          >
            <div className="about-visual-glow" />
            <div className="about-visual-orbit about-visual-orbit--outer" />
            <div className="about-visual-orbit about-visual-orbit--inner" />
            <div className="about-code-window">
              <div className="about-code-topbar"><i /><i /><i /><span>techberry.dev</span></div>
              <div className="about-code-lines" aria-hidden="true">
                <span /><span /><span /><span /><span /><span />
              </div>
              <Braces className="about-code-mark" size={40} aria-hidden="true" />
            </div>
            <div className="about-visual-core"><Code2 size={54} strokeWidth={1.5} /></div>
            <div className="about-float-card about-float-card--cloud">
              <Cloud size={21} aria-hidden="true" /><span>Cloud solutions</span>
            </div>
            <div className="about-float-card about-float-card--web">
              <Globe2 size={21} aria-hidden="true" /><span>Web experiences</span>
            </div>
            <div className="about-float-card about-float-card--mobile">
              <Smartphone size={21} aria-hidden="true" /><span>Mobile apps</span>
            </div>
            <span className="about-visual-particle about-visual-particle--one" />
            <span className="about-visual-particle about-visual-particle--two" />
            <span className="about-visual-particle about-visual-particle--three" />
          </motion.div>
        </div>

        <section className="about-values" aria-labelledby="about-values-title">
          <div className="about-values-heading">
            <span className="eyebrow eyebrow-blue">WHAT GUIDES US</span>
            <h2 id="about-values-title">Our Core Values</h2>
          </div>
          <motion.div
            className="about-values-grid"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {coreValues.map(({ title, description, Icon }) => (
              <motion.article
                className="about-value-card"
                key={title}
                variants={revealUp}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              >
                <span className="about-value-icon"><Icon size={21} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="about-process" aria-labelledby="about-process-title">
          <div className="about-process-heading">
            <span className="eyebrow eyebrow-blue">HOW WE WORK</span>
            <h2 id="about-process-title">From First Idea to Final Launch.</h2>
            <p>A structured and collaborative process that transforms your ideas into meaningful digital experiences.</p>
          </div>
          <motion.ol
            className="about-process-grid"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {workSteps.map(({ number, title: stepTitle, description: stepDescription, Icon }) => (
              <motion.li className="about-process-card" key={number} variants={revealUp}>
                <span className="about-process-icon"><Icon size={22} aria-hidden="true" /></span>
                <span className="about-process-number">{number}</span>
                <h3>{stepTitle}</h3>
                <p>{stepDescription}</p>
              </motion.li>
            ))}
          </motion.ol>
        </section>

        <motion.section
          className="cta-banner about-final-cta"
          aria-labelledby="about-final-cta-title"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="cta-content">
            <motion.h2 id="about-final-cta-title" variants={revealUp}>Have a Project in Mind?</motion.h2>
            <motion.p variants={revealUp}>Let's turn your ideas into powerful digital experiences.</motion.p>
          </div>
          <motion.div className="cta-actions" variants={revealUp}>
            <PrimaryButton className="btn-light" type="button" onClick={onQuote}>
              Get a Free Quote <ArrowRight size={18} />
            </PrimaryButton>
            <SecondaryButton className="btn-dark" type="button" onClick={onWhatsApp}>
              <MessageCircle size={18} /> Chat on WhatsApp
            </SecondaryButton>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}

export function ServicesPage() {
  return (
    <PageIntro label="OUR SERVICES" title="Digital solutions for the next stage of your business." description="Explore our full range of technology and growth services.">
      <motion.div className="services-grid info-services-grid" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        {services.map((service) => (
          <motion.div key={service.slug} variants={revealUp} whileHover={{ y: -5, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}>
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>
    </PageIntro>
  );
}

export function ServicePage({ onQuote }) {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  return (
    <PageIntro label="TECH BERRY SERVICES" title={service.title} description={service.description}>
      <motion.div className="service-detail-panel" variants={revealRight}>
        <div className={`service-illustration ${service.icon}-ill`} aria-hidden="true"><ServiceIllustration type={service.icon} /></div>
        <div><h2>Built around your business</h2><p>We pair practical expertise with thoughtful design to deliver a reliable solution tailored to your goals.</p></div>
      </motion.div>
      <PrimaryButton variants={revealUp} onClick={onQuote} type="button">Request a consultation <ArrowRight size={18} /></PrimaryButton>
    </PageIntro>
  );
}

export function ProjectsPage({ onQuote }) {
  return <PortfolioProjects onQuote={onQuote} />;
}

export function Contact() {
  const nextSteps = [
    { number: '01', title: 'We Listen', description: 'We understand your business, goals and project requirements.' },
    { number: '02', title: 'We Plan', description: 'We explore the right technology and approach for your needs.' },
    { number: '03', title: 'We Connect', description: 'Our team gets in touch to discuss the next steps.' },
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container contact-hero-inner">
          <span className="eyebrow eyebrow-blue">LET'S BUILD SOMETHING GREAT</span>
          <h1>Have a Project in Mind? <span>Let's Make It Happen.</span></h1>
          <p>
            Every great digital experience starts with a conversation. Whether you're looking to build a website, develop an application, grow your online business or transform your digital presence, we're here to help.
          </p>
          <p>Let's discuss your ideas and turn them into meaningful digital solutions.</p>
          <a className="contact-hero-link" href="#contact-form">Let's Talk About Your Project <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="contact-details-section" aria-labelledby="contact-details-title">
        <div className="container">
          <div className="contact-section-heading">
            <span className="eyebrow eyebrow-blue">GET IN TOUCH</span>
            <h2 id="contact-details-title">Let's start a conversation.</h2>
            <p>Have a question or a project idea? Our team would love to understand your requirements and explore how we can help.</p>
          </div>
          <div className="contact-details-grid">
            <article className="contact-detail-card">
              <span className="contact-detail-icon"><Mail size={21} aria-hidden="true" /></span>
              <span className="contact-detail-label">EMAIL US</span>
              <h3>Email Us</h3>
              <a href="mailto:hello@techberry.com">hello@techberry.com <ArrowUpRight size={16} aria-hidden="true" /></a>
            </article>
            <article className="contact-detail-card">
              <span className="contact-detail-icon"><PhoneCall size={21} aria-hidden="true" /></span>
              <span className="contact-detail-label">CALL US</span>
              <h3>Call Us</h3>
              <p>+91 XXXXX XXXXX</p>
            </article>
            <article className="contact-detail-card">
              <span className="contact-detail-icon"><MessageCircle size={21} aria-hidden="true" /></span>
              <span className="contact-detail-label">BUSINESS INQUIRIES</span>
              <h3>Business Inquiries</h3>
              <p>Let's discuss your next big idea.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-project-section" id="contact-form" aria-labelledby="contact-form-title">
        <div className="container contact-project-layout">
          <div className="contact-project-copy">
            <span className="eyebrow eyebrow-blue">TELL US ABOUT YOUR PROJECT</span>
            <h2 id="contact-form-title">A few details can get us started.</h2>
            <p>We'd love to know more about what you're planning. Share your goals and our team will be in touch to explore the right next step.</p>
            <div className="contact-next-steps">
              <h3>What Happens Next?</h3>
              <ol>
                {nextSteps.map(({ number, title, description }) => (
                  <li key={number}>
                    <span className="contact-step-number">{number}</span>
                    <span><strong>{title}</strong><span>{description}</span></span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <WhatsAppEnquiryDialog inline mode="quote" />
        </div>
      </section>

      <section className="contact-quick-question">
        <div className="container contact-quick-question-inner">
          <div>
            <span className="eyebrow eyebrow-blue">HAVE A QUICK QUESTION?</span>
            <h2>Not ready to start a project yet?</h2>
            <p>That's completely fine. Send us your questions and let's start a conversation.</p>
            <strong>TechBerry — Beyond Technology. Into Tomorrow.</strong>
          </div>
          <a className="contact-email-link" href="mailto:hello@techberry.com">Email TechBerry <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </section>
    </div>
  );
}

export function Blog() {
  const [activeTopic, setActiveTopic] = useState('All Topics');
  const topics = [
    {
      title: 'Web Development',
      description: 'Discover modern web technologies, development practices and strategies for building fast, responsive and scalable websites.',
      Icon: Code2,
      articles: ['professional-website', 'scalable-websites'],
    },
    {
      title: 'E-Commerce & Shopify',
      description: 'Explore Shopify development, online store optimization, customer experience and strategies for building successful e-commerce businesses.',
      Icon: ShoppingBag,
      articles: ['shopify-vs-ecommerce'],
    },
    {
      title: 'Artificial Intelligence',
      description: 'Understand how AI, automation and emerging technologies are transforming businesses and creating new opportunities.',
      Icon: BrainCircuit,
      articles: ['ai-business-operations'],
    },
    {
      title: 'UI/UX & Design',
      description: 'Learn about modern design principles, user experience, interface design and creating meaningful digital experiences.',
      Icon: Palette,
      articles: ['user-experience'],
    },
    {
      title: 'Digital Marketing & SEO',
      description: 'Explore search engine optimization, content strategies, online visibility and techniques for building a stronger digital presence.',
      Icon: Search,
      articles: ['seo-visibility'],
    },
    {
      title: 'Technology & Innovation',
      description: 'Stay informed about emerging technologies, software trends and innovations shaping tomorrow.',
      Icon: Lightbulb,
      articles: ['ai-business-operations', 'scalable-websites'],
    },
  ];
  const articles = [
    {
      id: 'professional-website',
      title: 'Why Every Business Needs a Professional Website in 2026',
      description: 'Understand how a professional website builds credibility, strengthens your brand and creates opportunities for business growth.',
      category: 'Web Development',
    },
    {
      id: 'shopify-vs-ecommerce',
      title: 'Shopify vs Traditional E-Commerce: Which Is Right for Your Business?',
      description: 'Explore the differences between Shopify and traditional e-commerce platforms and understand which approach suits your business requirements.',
      category: 'E-Commerce',
    },
    {
      id: 'ai-business-operations',
      title: 'How AI Is Transforming Modern Business Operations',
      description: 'Discover how artificial intelligence and automation can simplify workflows, improve productivity and support smarter business decisions.',
      category: 'Artificial Intelligence',
    },
    {
      id: 'user-experience',
      title: 'Why User Experience Matters More Than Ever',
      description: 'Learn how thoughtful UI/UX design improves customer satisfaction, website usability and digital engagement.',
      category: 'UI/UX Design',
    },
    {
      id: 'seo-visibility',
      title: 'SEO in 2026: Building Long-Term Organic Visibility',
      description: 'Explore modern SEO practices, technical optimization and content strategies that help businesses improve their search visibility.',
      category: 'SEO & Digital Marketing',
    },
    {
      id: 'scalable-websites',
      title: 'Building Scalable Websites for Growing Businesses',
      description: 'Discover the importance of performance, architecture, security and scalability when developing modern business websites.',
      category: 'Web Development',
    },
  ];
  const visibleArticles = activeTopic === 'All Topics'
    ? articles
    : articles.filter((article) => topics.find((topic) => topic.title === activeTopic)?.articles.includes(article.id));

  return (
    <div className="journal-page">
      <section className="journal-hero">
        <div className="container journal-hero-inner">
          <div className="journal-hero-copy">
            <span className="eyebrow eyebrow-blue"><Sparkles size={15} aria-hidden="true" /> THE TECHBERRY JOURNAL</span>
            <h1>Ideas, Insights &amp; Innovation <span>for the Digital Future.</span></h1>
            <p>
              Explore the latest technology trends, practical business insights and digital strategies that help businesses innovate, grow and stay ahead in an evolving digital world.
            </p>
            <p>
              From web development and e-commerce to AI, software engineering and digital transformation — discover ideas that move your business forward.
            </p>
            <a className="journal-explore-link" href="#journal-insights">
              Explore. Learn. Innovate. <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="journal-hero-art" aria-hidden="true">
            <div className="journal-art-orbit journal-art-orbit--outer" />
            <div className="journal-art-orbit journal-art-orbit--inner" />
            <div className="journal-art-card journal-art-card--back"><span /><span /><span /></div>
            <div className="journal-art-card journal-art-card--front">
              <span className="journal-art-label">IDEAS THAT MOVE YOU FORWARD</span>
              <strong>Explore<br />what's next.</strong>
              <span className="journal-art-line" />
              <span className="journal-art-line journal-art-line--short" />
              <span className="journal-art-mark"><BookOpen size={23} /></span>
            </div>
            <span className="journal-art-spark journal-art-spark--one">✳</span>
            <span className="journal-art-spark journal-art-spark--two">✦</span>
          </div>
        </div>
      </section>

      <section className="journal-featured-section" aria-labelledby="journal-featured-title">
        <div className="container">
          <div className="journal-section-heading">
            <span className="eyebrow eyebrow-blue">FEATURED ARTICLE</span>
            <span className="journal-featured-meta"><Clock3 size={15} aria-hidden="true" /> 5 min read <span aria-hidden="true">·</span> Digital Transformation</span>
          </div>
          <article className="journal-featured-card">
            <div className="journal-featured-art" aria-hidden="true">
              <span className="journal-featured-art-orbit" />
              <span className="journal-featured-art-window">
                <i /><i /><i />
                <b />
                <span />
                <span />
              </span>
              <span className="journal-featured-art-glow" />
            </div>
            <div className="journal-featured-copy">
              <span className="journal-featured-kicker">DIGITAL TRANSFORMATION</span>
              <h2 id="journal-featured-title">The Future Is Digital. Is Your Business Ready?</h2>
              <p>Technology is changing the way businesses operate, connect with customers and create value.</p>
              <p>A strong digital presence is no longer just an advantage. It is an essential part of building a competitive and future-ready business.</p>
              <p>At TechBerry, we believe successful digital transformation starts with the right strategy, thoughtful design and reliable technology.</p>
              <p>Discover how the right digital solutions can help your business move forward.</p>
              <PrimaryButton as="a" href="#journal-latest">
                Read Article <ArrowUpRight size={17} aria-hidden="true" />
              </PrimaryButton>
            </div>
          </article>
        </div>
      </section>

      <section className="journal-insights-section" id="journal-insights" aria-labelledby="journal-insights-title">
        <div className="container">
          <div className="journal-section-heading journal-section-heading--center">
            <span className="eyebrow eyebrow-blue">EXPLORE OUR INSIGHTS</span>
            <h2 id="journal-insights-title">Ideas for every step forward.</h2>
            <p>Choose a topic to find practical perspectives for your business.</p>
          </div>
          <div className="journal-topic-grid">
            {topics.map(({ title, description, Icon }) => (
              <a
                className="journal-topic-card"
                href="#journal-latest"
                key={title}
                onClick={() => setActiveTopic(title)}
              >
                <span className="journal-topic-icon"><Icon size={21} aria-hidden="true" /></span>
                <span className="journal-topic-card-copy">
                  <strong>{title}</strong>
                  <span>{description}</span>
                </span>
                <ArrowRight className="journal-topic-arrow" size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="journal-latest-section" id="journal-latest" aria-labelledby="journal-latest-title">
        <div className="container">
          <div className="journal-latest-heading">
            <div className="journal-section-heading">
              <span className="eyebrow eyebrow-blue">FRESH PERSPECTIVES</span>
              <h2 id="journal-latest-title">Latest Articles</h2>
            </div>
            <button
              className={`journal-all-topics${activeTopic === 'All Topics' ? ' is-active' : ''}`}
              type="button"
              aria-pressed={activeTopic === 'All Topics'}
              onClick={() => setActiveTopic('All Topics')}
            >
              All Topics
            </button>
          </div>
          <div className="journal-article-grid">
            {visibleArticles.map((article, index) => (
              <article className="journal-article-card" key={article.id}>
                <div className="journal-article-card-top">
                  <span className="journal-article-number">{String(articles.indexOf(article) + 1).padStart(2, '0')}</span>
                  <span className="journal-article-index">{String(index + 1).padStart(2, '0')} / {String(visibleArticles.length).padStart(2, '0')}</span>
                </div>
                <span className="journal-article-category">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </article>
            ))}
          </div>
          {visibleArticles.length === 0 && (
            <p className="journal-empty-state" role="status">No articles are available for this topic yet.</p>
          )}
        </div>
      </section>

      <section className="journal-perspective-section" aria-labelledby="journal-perspective-title">
        <div className="container journal-perspective-inner">
          <div className="journal-perspective-copy">
            <span className="eyebrow eyebrow-light">OUR PERSPECTIVE</span>
            <h2 id="journal-perspective-title">Technology Should Move Your Business Forward.</h2>
            <p>We believe technology is most powerful when it solves real problems, creates meaningful experiences and opens new possibilities.</p>
            <p>Through our insights and ideas, we aim to make technology easier to understand and more valuable for businesses.</p>
            <strong>TechBerry — Beyond Technology. Into Tomorrow.</strong>
          </div>
          <div className="journal-perspective-actions">
            <PrimaryButton as="link" to="/services">Explore Our Services <ArrowRight size={17} /></PrimaryButton>
            <SecondaryButton as="link" to="/contact">Get in Touch <ArrowUpRight size={17} /></SecondaryButton>
          </div>
          <span className="journal-perspective-orbit journal-perspective-orbit--one" aria-hidden="true" />
          <span className="journal-perspective-orbit journal-perspective-orbit--two" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
}

export function LegalPage({ type }) {
  const isPrivacy = type === 'privacy';
  return (
    <PageIntro
      label="LEGAL"
      title={isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
      description={`This page is a placeholder for Tech Berry’s ${isPrivacy ? 'privacy policy' : 'terms and conditions'}. Replace it with your organization’s approved legal content before publishing.`}
    />
  );
}

export function NotFound() {
  return <PageIntro label="404" title="We couldn’t find that page." description="It may have moved, or the link may be incorrect.">
    <PrimaryButton as="link" to="/">Back to homepage <ArrowRight size={18} /></PrimaryButton>
  </PageIntro>;
}
