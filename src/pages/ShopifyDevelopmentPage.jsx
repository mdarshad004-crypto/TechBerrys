import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, Blocks, Braces, ChartNoAxesColumnIncreasing,
  Check, Code2, Gauge, Layers, LayoutDashboard, PackageCheck, Palette, PlugZap, Settings2,
  ShoppingBag, Smartphone, Sparkles, Store, Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../components/Button.jsx';
import ShopifyEcosystemVisual from '../components/ShopifyEcosystemVisual.jsx';
import { revealLeft, revealRight, revealUp, staggerChildren, viewportOnce } from '../components/motion.js';
import './ShopifyDevelopmentPage.css';

const shopifyServices = [
  { id: 'custom-store', title: 'Custom Shopify Store Development', description: 'A thoughtfully built storefront shaped around your products, customers and business goals.', Icon: Store, image: 'https://images.openai.com/static-rsc-4/wyP9-aKFo_bTyGVlRPdFoohdOfdjt-DbuZgQOKfZ3fi0qMZBf2ZGw0br8x-uNACFJNQh2FWdjPfW_LfDxtWKyjagIzJ1DefRIaP7PiMv6xmJA3WdRJHefbu5xyKiUanx6ftasJcsNGA8YtnUO29j7SB1C1Z0H3rziObtd1GmqwEKDknBaMy_5cAud0WGmNDs?purpose=fullsize', alt: 'Laptop displaying a custom eCommerce storefront with product browsing and shopping interface', href: '#shopify-development-details' },
  { id: 'theme-customization', title: 'Shopify Theme Customization', description: 'A distinctive, responsive storefront experience with a polished look and clear customer journeys.', Icon: Palette, image: 'https://images.openai.com/static-rsc-4/_V5oEW8LeM85nS9K7NbjFUL2S4U8h2n5w0OV9VpXqJvdlEm7H-uJUZbfhnNgcoYhDmzNvCYDPWa6XBzRdR4TJKOF1RmGFO_AcBL153G7pKhci5PovLgRyn81eIv2GrZNAf0uHc1n4vW_Ph6jbnIWe5k-rFG_deGwcdy4g5cQpF6BBra55NqZbMu8XwyK9hjo?purpose=fullsize', alt: 'Desktop and mobile storefront previews with a refined theme customization interface', href: '/services/shopify-theme-customization' },
  { id: 'app-integration', title: 'Shopify App Integration', description: 'Connect the tools and services your store needs with a considered, reliable implementation.', Icon: PlugZap, alt: 'Shopify ecosystem with connected applications, automation, payments and shipping', href: '/services/shopify-app-integration', ecosystem: true },
  { id: 'store-optimization', title: 'Shopify Store Optimization', description: 'Improve storefront speed, usability and the details that make shopping feel effortless.', Icon: Gauge, image: 'https://images.openai.com/static-rsc-4/_s98qb66uvFahz4ko43dnKOT_7M2mpuKOTbl_HNS0OXi2350zVS693cR0JIImnDBYVB2CtXlv7P7BiAr3tojI0HlvmfV9hsciqzDT8ExghAgj-wLVN5uZ85buRtfA2guFiVNvHiCln8VwOt6jHnv_ciQ2dEmsn_WjCh1dCBApjGViXsMICtdrsWBqAFBDyZf?purpose=fullsize', alt: 'eCommerce analytics dashboard showing store performance and growth charts', href: '/services/shopify-store-optimization' },
  { id: 'product-setup', title: 'Product & Collection Setup', description: 'Organize product information and collections into a store that is simple to browse and manage.', Icon: PackageCheck, image: 'https://images.openai.com/static-rsc-4/8KjfGYDpODRIZVqcWMPikmdVW2juO02-tABMAhC31gQW4Mq_uXKTj3MlNEpk7-n6HbN2d8Kchc-VDaBsYgN_q9JDfin-vfkAh667G4_NqYQHT9mkUZZNG2kwRxFQcvndDg93k0eG_Fva5EBOZKt0lCjH7MDhDnZYB_hQXJJFYNNaDs9VNhxw4QWl_kNW46Qh?purpose=fullsize', alt: 'Product management dashboard with organized product cards, collection grids, categories and inventory details', href: '/services/product-collection-setup' },
  { id: 'store-maintenance', title: 'Shopify Store Maintenance', description: 'Ongoing updates, improvements and technical care to help keep your store running smoothly.', Icon: Wrench, image: 'https://images.openai.com/static-rsc-4/VYVJ6FR-h4xaaqLKMNgDSk974MuWOTQGXLmFbnv58E2mQpJBCkhnv-jTvQTQMrRqMtYqZVbwYRu5kzRoo5uyRU8WJA6nBTp87rV5HqNX8GxmJs9k1PpWNop0ukeR7IHmvcjBWnHBrne3gWyF7UPs_Viy3wtcQblvt1sUf5yAxDwkMvKPvQYIbeuAe2_feXLL?purpose=fullsize', alt: 'Store management workspace illustrating ongoing technical care and maintenance', href: '/services/shopify-store-maintenance' },
];

const benefits = [
  ['Business-focused development', 'Store decisions shaped around your business model and customer needs.', Store],
  ['Responsive, mobile-first experiences', 'Layouts designed to feel clear and easy to use across screen sizes.', Smartphone],

  ['Scalable architecture', 'A flexible foundation that can grow with your catalog and requirements.', Layers],
  ['Seamless integrations', 'Thoughtful connections to the tools and services in your workflow.', PlugZap],
  ['User-friendly store management', 'Clear, manageable structures for everyday product and content updates.', Settings2],
  ['Performance-focused implementation', 'Careful attention to loading, interaction and storefront usability.', Gauge],
];

const processSteps = [
  ['01', 'Discovery & Planning', 'Understand your products, audience, goals and project requirements.'],
  ['02', 'UI/UX Design', 'Shape a storefront experience that is clear, considered and easy to navigate.'],
  ['03', 'Development & Integration', 'Build the store and connect the approved tools and services.'],
  ['04', 'Testing & Optimization', 'Review responsive behavior, key journeys and implementation details.'],
  ['05', 'Launch & Support', 'Prepare for launch and support the next stage of your store.'],
];

const capabilities = [
  ['Shopify', ShoppingBag], ['Liquid', Braces], ['HTML5', Code2], ['CSS3', Palette],
  ['JavaScript', Code2], ['Shopify APIs', Blocks], ['Third-party integrations', PlugZap], ['Responsive UI/UX', Smartphone],
];

function StorefrontMockup() {
  return (
    <figure className="shopify-hero-art" aria-label="Illustrative desktop and mobile storefront interface">
      <div className="shopify-art-orbit shopify-art-orbit--one" />
      <div className="shopify-art-orbit shopify-art-orbit--two" />
      <div className="shopify-browser">
        <div className="shopify-browser-bar"><span /><span /><span /><div>yourstore.com</div><i><ArrowUpRight size={12} /></i></div>
        <div className="shopify-storefront">
          <div className="shopify-store-nav"><strong>YOUR BRAND</strong><span>New arrivals&nbsp;&nbsp; Collections&nbsp;&nbsp; About</span><ShoppingBag size={16} /></div>
          <div className="shopify-store-hero">
            <div className="shopify-store-copy"><small>THE EVERYDAY EDIT</small><b>Made for<br />what's next.</b><span>Considered essentials, made to move with you.</span><i>Explore collection <ArrowRight size={12} /></i></div>
            <div className="shopify-product-art"><span className="shopify-product-shape" /><span className="shopify-product-sun" /></div>
          </div>
          <div className="shopify-store-products"><div><span className="product-art product-art--one" /><i>Everyday carry</i></div><div><span className="product-art product-art--two" /><i>Studio objects</i></div><div><span className="product-art product-art--three" /><i>New essentials</i></div></div>
        </div>
      </div>
      <div className="shopify-phone">
        <div className="shopify-phone-speaker" />
        <div className="shopify-phone-top"><strong>YOUR BRAND</strong><ShoppingBag size={13} /></div>
        <div className="shopify-phone-image"><span /></div>
        <small>JUST ARRIVED</small><b>Everyday<br />essentials</b><span className="shopify-phone-button">Explore</span>
      </div>
      <div className="shopify-order-toast"><span><Check size={15} /></span><div><b>Order received</b><small>Your store, ready to sell</small></div></div>
      <div className="shopify-analytics-toast"><ChartNoAxesColumnIncreasing size={17} /><div><b>Store insights</b><span><i /><i /><i /><i /><i /><i /><i /></span></div></div>
      <figcaption className="shopify-visually-hidden">A conceptual storefront preview showing a desktop shop, mobile product page and illustrative order and store insight cards.</figcaption>
    </figure>
  );
}

function DashboardVisual() {
  return (
    <div className="shopify-dashboard-visual" role="img" aria-label="Illustrative Shopify store management dashboard">
      <div className="shopify-dash-window">
        <div className="shopify-dash-sidebar"><span className="shopify-dash-brand"><ShoppingBag size={16} /></span><i /><i /><i /><i /><i /></div>
        <div className="shopify-dash-main">
          <div className="shopify-dash-top"><b>Store overview</b><span>Store workspace</span></div>
          <div className="shopify-dash-welcome"><span><small>YOUR STORE</small><b>Everything in one place.</b></span><span className="shopify-dash-action">Manage store <ArrowUpRight size={12} /></span></div>
          <div className="shopify-dash-panels"><div><small>Store activity</small><span className="shopify-dash-chart">{[35, 48, 42, 67, 56, 76, 61, 89, 70, 100, 78, 91].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</span></div><div><small>Store setup</small><span className="shopify-setup-ring"><Check size={15} /></span><b>On track</b></div></div>
          <div className="shopify-dash-list"><span><i /> Product catalog <b>Organized</b></span><span><i /> Storefront design <b>Ready to review</b></span><span><i /> Connected services <b>Configured</b></span></div>
        </div>
      </div>
      <span className="shopify-dashboard-glow" />
    </div>
  );
}

function handleShopifyImageError(event) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === 'true') return;
  image.dataset.fallbackApplied = 'true';
  image.src = '/images/shopify/service-image-fallback.svg';
}

function ServiceVisual({ image, alt, title, ecosystem }) {
  if (ecosystem) return <div className="shopify-service-visual shopify-service-visual--ecosystem"><ShopifyEcosystemVisual compact /><span className="shopify-visually-hidden">{title}</span></div>;
  return <div className="shopify-service-visual"><img src={image} alt={alt} loading="lazy" decoding="async" width="1200" height="675" onError={handleShopifyImageError} /><span className="shopify-service-image-wash" aria-hidden="true" /><span className="shopify-visually-hidden">{title}</span></div>;
}

export default function ShopifyDevelopmentPage({ onQuote }) {
  useEffect(() => {
    const originalTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const originalDescription = description?.content;
    let canonical = document.querySelector('link[rel="canonical"]');
    const hadCanonical = Boolean(canonical);
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    const originalCanonical = canonical.href;
    document.title = 'Shopify Development Services | TechBerry';
    if (description) description.content = 'Explore professional Shopify development services by TechBerry. Custom Shopify stores, theme customization, app integration and eCommerce optimization.';
    canonical.href = `${window.location.origin}/services/shopify-development`;
    return () => {
      document.title = originalTitle;
      if (description && originalDescription !== undefined) description.content = originalDescription;
      if (hadCanonical) canonical.href = originalCanonical;
      else canonical.remove();
    };
  }, []);

  return (
    <div className="shopify-page">
      <section className="shopify-hero" aria-labelledby="shopify-page-title">
        <div className="shopify-container shopify-hero-grid">
          <motion.div className="shopify-hero-copy" variants={staggerChildren} initial="hidden" animate="visible">
            <nav className="shopify-hero-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">Shopify</span></nav>
            <motion.span className="shopify-eyebrow" variants={revealUp}><i /> TECHBERRY SHOPIFY SOLUTIONS</motion.span>
            <motion.h1 id="shopify-page-title" variants={revealUp}>Custom Shopify Store Development Built for Your Business.</motion.h1>
            <motion.p variants={revealUp}>We create custom storefronts with responsive layouts, product pages, clear navigation and the eCommerce functionality your business needs to serve its customers.</motion.p>
            <motion.div className="shopify-hero-actions" variants={revealUp}>
              <PrimaryButton type="button" onClick={onQuote}>Start Your Shopify Project <ArrowRight size={17} /></PrimaryButton>
              <a className="shopify-text-link" href="#shopify-services">Explore Our Services <ArrowDownRight size={17} /></a>
            </motion.div>
            <motion.div className="shopify-hero-note" variants={revealUp}><BadgeCheck size={16} /> Thoughtful commerce experiences, built around your business.</motion.div>
          </motion.div>
          <motion.div variants={revealRight} initial="hidden" animate="visible"><StorefrontMockup /></motion.div>
        </div>
        <a className="shopify-scroll-cue" href="#shopify-services" aria-label="Scroll to Shopify services"><span /> Scroll to explore</a>
      </section>

      <section className="shopify-services-section" id="shopify-services" aria-labelledby="shopify-services-title">
        <div className="shopify-container">
          <motion.div className="shopify-section-heading" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.span className="shopify-eyebrow" variants={revealUp}>WHAT WE DO</motion.span>
            <motion.h2 id="shopify-services-title" variants={revealUp}>Complete Shopify Solutions Under One Roof.</motion.h2>
            <motion.p variants={revealUp}>From the first storefront idea to ongoing improvements, get the right expertise for every stage of your Shopify journey.</motion.p>
          </motion.div>
          <motion.div className="shopify-services-grid" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {shopifyServices.map(({ id, title, description, image, alt, href, ecosystem }) => (
              <motion.article className="shopify-service-card" id={`shopify-service-${id}`} key={id} variants={revealUp}>
                <ServiceVisual image={image} alt={alt} title={title} ecosystem={ecosystem} />
                <div className="shopify-service-card-content"><span className="shopify-card-index">SHOPIFY SOLUTION</span><h3>{title}</h3><p>{description}</p>{href.startsWith('#') ? <a href={href}>Learn More <ArrowUpRight size={16} aria-hidden="true" /></a> : <Link to={href}>Learn More <ArrowUpRight size={16} aria-hidden="true" /></Link>}</div>
              </motion.article>
            ))}
          </motion.div>
          <section className="shopify-service-detail-inline" id="shopify-development-details" aria-labelledby="shopify-development-details-title">
            <span className="shopify-eyebrow">CUSTOM SHOPIFY STORE DEVELOPMENT</span>
            <h2 id="shopify-development-details-title">A storefront built around your brand and customers.</h2>
            <img className="shopify-development-inline-image" src={shopifyServices[0].image} alt={shopifyServices[0].alt} loading="lazy" decoding="async" width="1200" height="675" onError={handleShopifyImageError} />
            <p>We create custom Shopify storefronts with responsive layouts, considered navigation, polished product pages and the eCommerce functionality your business needs. From the first structure to launch preparation, each decision is shaped around your catalog, customers and goals.</p>
            <div className="shopify-inline-detail-grid"><div><h3>What we can build</h3><ul><li>Custom storefront layouts and responsive page templates</li><li>Product pages, collection browsing and clear navigation</li><li>Shopping flows and approved store functionality</li></ul></div><div><h3>Our approach</h3><p>We begin with your requirements, shape the experience, build and connect agreed features, then review key journeys across screen sizes before launch.</p><a href="#shopify-services">Back to Shopify services <ArrowRight size={15} /></a></div></div>
            <div className="shopify-inline-faq"><h3>Common questions</h3><details><summary>Can you build a Shopify storefront around an existing brand?</summary><p>Yes. We can shape the storefront structure, page layouts and product experience around your existing brand assets and requirements.</p></details><details><summary>Will the store work across mobile and desktop?</summary><p>Responsive layouts are part of the design and implementation process, with key pages reviewed across screen sizes.</p></details><details><summary>Can the build include custom eCommerce functionality?</summary><p>We can scope functionality based on your needs and the capabilities of Shopify, apps and services in your store setup.</p></details></div>
          </section>
        </div>
      </section>

      <section className="shopify-why-section" aria-labelledby="shopify-why-title">
        <div className="shopify-container shopify-why-grid">
          <motion.div className="shopify-why-visual-wrap" variants={revealLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}><DashboardVisual /><span className="shopify-visual-caption"><LayoutDashboard size={15} /> A considered store, from the storefront to the back office</span></motion.div>
          <motion.div className="shopify-why-copy" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.span className="shopify-eyebrow" variants={revealUp}>A BETTER WAY TO BUILD</motion.span>
            <motion.h2 id="shopify-why-title" variants={revealUp}>More Than Just a Shopify Store.</motion.h2>
            <motion.p variants={revealUp}>A great store brings together a strong customer experience and practical tools for the people who run it. We keep both in view at every stage.</motion.p>
            <motion.ul className="shopify-benefits" variants={staggerChildren}>
              {benefits.map(([title, description, Icon]) => <motion.li key={title} variants={revealUp}><span><Icon size={18} /></span><div><b>{title}</b><small>{description}</small></div></motion.li>)}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      <section className="shopify-process-section" aria-labelledby="shopify-process-title">
        <div className="shopify-container">
          <motion.div className="shopify-section-heading" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.span className="shopify-eyebrow" variants={revealUp}>OUR APPROACH</motion.span>
            <motion.h2 id="shopify-process-title" variants={revealUp}>From Idea to Online Store.</motion.h2>
            <motion.p variants={revealUp}>A clear, collaborative process keeps your project moving from the first conversation through launch.</motion.p>
          </motion.div>
          <div className="shopify-process-track" aria-hidden="true"><motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={viewportOnce} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} /></div>
          <motion.ol className="shopify-process-grid" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {processSteps.map(([number, title, description]) => <motion.li key={number} variants={revealUp}><span className="shopify-process-number">{number}</span><h3>{title}</h3><p>{description}</p></motion.li>)}
          </motion.ol>
        </div>
      </section>

      <section className="shopify-capabilities-section" aria-labelledby="shopify-capabilities-title">
        <div className="shopify-container shopify-capabilities-layout">
          <motion.div className="shopify-capabilities-copy" variants={revealLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <span className="shopify-eyebrow">TECHNOLOGY &amp; CAPABILITIES</span><h2 id="shopify-capabilities-title">The right tools for a flexible storefront.</h2><p>We bring together Shopify platform capabilities and proven web technologies to create storefronts tailored to your needs.</p>
          </motion.div>
          <motion.div className="shopify-capabilities-grid" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {capabilities.map(([label, Icon]) => <motion.div className="shopify-capability-chip" key={label} variants={revealUp}><span><Icon size={20} /></span><b>{label}</b></motion.div>)}
          </motion.div>
        </div>
      </section>

      <section className="shopify-final-cta" aria-labelledby="shopify-cta-title">
        <div className="shopify-container shopify-cta-panel">
          <span className="shopify-cta-orb shopify-cta-orb--one" aria-hidden="true" /><span className="shopify-cta-orb shopify-cta-orb--two" aria-hidden="true" />
          <motion.div className="shopify-cta-copy" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.span className="shopify-eyebrow shopify-eyebrow--light" variants={revealUp}><Sparkles size={15} /> LET'S BUILD SOMETHING GREAT</motion.span>
            <motion.h2 id="shopify-cta-title" variants={revealUp}>Ready to Build Your Shopify Store?</motion.h2>
            <motion.p variants={revealUp}>Let's turn your eCommerce vision into a powerful digital experience. Tell us about your project and let's get started.</motion.p>
          </motion.div>
          <motion.div className="shopify-cta-actions" variants={revealUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <PrimaryButton className="shopify-cta-button" type="button" onClick={onQuote}>Get Your Free Consultation <ArrowRight size={17} /></PrimaryButton>
            <SecondaryButton as="link" to="/contact" className="shopify-cta-secondary">Talk to Our Team <ArrowUpRight size={16} /></SecondaryButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
