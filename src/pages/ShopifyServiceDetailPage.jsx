import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronRight, CircleHelp, Sparkles } from 'lucide-react';
import { PrimaryButton } from '../components/Button.jsx';
import ShopifyEcosystemVisual from '../components/ShopifyEcosystemVisual.jsx';
import './ShopifyServiceDetailPage.css';

const services = {
  'shopify-theme-customization': {
    title: 'Shopify Theme Customization', category: 'STOREFRONT DESIGN', image: '/images/shopify/theme-customization.jpg', alt: 'Desktop and mobile storefront previews with theme customization controls',
    intro: 'Make your Shopify theme feel distinctly yours. We refine the visual system, page layouts and storefront details around your brand while keeping the shopping experience clear across devices.',
    detail: 'From a focused refresh to deeper theme work, we adapt theme sections and Liquid templates to support the way your products should be discovered. The result is a storefront that expresses your identity and gives customers a consistent path through the store.',
    features: ['Brand-led visual styling and storefront layouts', 'Theme section and Liquid template customization', 'Responsive improvements for mobile, tablet and desktop', 'Product, collection and content page refinements'],
    benefits: ['A more cohesive expression of your brand', 'Layouts that support clear customer journeys', 'Flexible sections for everyday store updates'],
    approach: ['Review your current theme, brand and priorities', 'Plan the layouts and changes with you', 'Customize, test responsive behavior and review together'],
    faqs: [['Can you customize an existing Shopify theme?', 'Yes. We can tailor an existing theme to your brand and requirements, including supported layouts, sections and theme code.'], ['Will the customized theme work on mobile?', 'Responsive behavior is part of the implementation and review process across common screen sizes.'], ['Can you make updates to Liquid templates?', 'Yes, theme work can include Liquid customization where it supports the agreed storefront requirements.']],
    related: ['shopify-development', 'shopify-store-optimization', 'product-collection-setup']
  },
  'shopify-app-integration': {
    title: 'Shopify App Integration', category: 'CONNECTED COMMERCE', visual: 'ecosystem', alt: 'Shopify ecosystem with connected applications, automation, payments and shipping',
    intro: 'Bring the right tools into your Shopify workflow. We help connect third-party apps, APIs and approved payment-related services so store operations fit together more smoothly.',
    detail: 'We assess the systems you use, confirm what needs to connect and configure integrations with attention to the data and workflows involved. Where custom API work is appropriate, we scope the connection around your requirements and the capabilities of the services involved.',
    features: ['Third-party app selection and configuration support', 'API connections for agreed business workflows', 'Payment-related service integrations where supported', 'Integration checks and handover notes'],
    benefits: ['Fewer disconnected steps in day-to-day operations', 'Store tools configured around your processes', 'A clearer view of integration dependencies'],
    approach: ['Map the tools, data and workflow goals', 'Confirm service compatibility and implementation scope', 'Configure and test the agreed connections'],
    faqs: [['Can you connect any third-party app?', 'We review the app’s capabilities and compatibility first. The available integration depends on the provider and your store setup.'], ['Do you build custom API integrations?', 'Custom API work can be scoped when the relevant services expose suitable interfaces and the requirements are clear.'], ['Will you support payment integration?', 'We can help configure supported payment-related services. Provider eligibility and account setup remain subject to the provider’s requirements.']],
    related: ['shopify-development', 'shopify-store-maintenance', 'shopify-store-optimization']
  },
  'shopify-store-optimization': {
    title: 'Shopify Store Optimization', category: 'PERFORMANCE & EXPERIENCE', image: '/images/shopify/store-optimization.jpg', alt: 'Analytics dashboard with performance graphs and commerce metrics',
    intro: 'Make your storefront easier to use and improve the technical details that support a smoother shopping experience. We review performance, usability and foundational SEO considerations, then prioritize practical improvements.',
    detail: 'Optimization starts with understanding the current store and its customer journeys. We identify opportunities across loading behavior, content structure, navigation and key interactions, then implement agreed changes and review them across devices.',
    features: ['Storefront speed and asset review', 'Usability and key journey improvements', 'Technical SEO foundations and page structure', 'Responsive quality checks and follow-up recommendations'],
    benefits: ['A clearer and more comfortable shopping experience', 'Better visibility into practical improvement areas', 'A storefront maintained with performance in mind'],
    approach: ['Review current storefront and priorities', 'Agree a focused list of improvements', 'Implement changes and recheck core pages and journeys'],
    faqs: [['Can you guarantee a specific speed score?', 'No score can be guaranteed because results depend on platform behavior, third-party scripts, content and other factors. We focus on measured opportunities within the agreed scope.'], ['Do you include SEO work?', 'We can address technical SEO basics such as page structure and metadata as agreed; this is not a promise of search rankings.'], ['Can you optimize an existing store?', 'Yes. We can review an existing Shopify store and recommend or implement suitable improvements.']],
    related: ['shopify-theme-customization', 'shopify-app-integration', 'product-collection-setup']
  },
  'product-collection-setup': {
    title: 'Product & Collection Setup', category: 'CATALOG & MERCHANDISING', image: '/images/shopify/product-collections.jpg', alt: 'Product catalog interface with organized product tiles and categories',
    intro: 'Give your catalog a structure customers can browse and your team can manage. We organize product information, collections, variants and navigation into a coherent Shopify store experience.',
    detail: 'We work with the product information you provide to build consistent listings and useful collection structures. Product descriptions, options, filters and navigation are arranged to make the catalog easier to explore and maintain.',
    features: ['Product listings and description formatting', 'Collections and catalog organization', 'Variant and option setup', 'Filters, categories and navigation structure'],
    benefits: ['A catalog that is easier for customers to browse', 'More consistent product information', 'Store organization that supports ongoing updates'],
    approach: ['Review catalog data and store structure', 'Agree product fields, collections and browsing needs', 'Set up and review representative listings and navigation'],
    faqs: [['Can you import product data?', 'We can help structure and upload the product information provided, subject to its format and the agreed scope.'], ['Do you write product descriptions?', 'Description formatting and writing can be discussed as part of the project scope; product facts and claims must be supplied or approved by you.'], ['Can you set up filters and variants?', 'Yes, we can configure suitable options and filters based on your catalog and Shopify setup.']],
    related: ['shopify-development', 'shopify-theme-customization', 'shopify-store-optimization']
  },
  'shopify-store-maintenance': {
    title: 'Shopify Store Maintenance', category: 'ONGOING STORE CARE', image: '/images/shopify/store-maintenance.jpg', alt: 'Store management dashboard illustrating technical maintenance and support',
    intro: 'Keep your Shopify store current with ongoing technical care. We can support agreed updates, bug fixes, troubleshooting and monitoring tasks around your store’s needs.',
    detail: 'Maintenance is shaped around a clear support scope. We review reported issues, make agreed updates, help investigate storefront behavior and communicate findings so your team knows what was addressed and what may need further work.',
    features: ['Agreed content, theme and configuration updates', 'Bug investigation and fixes within scope', 'Technical monitoring and troubleshooting support', 'Maintenance notes and next-step recommendations'],
    benefits: ['A reliable point of contact for store tasks', 'Issues and updates handled through an agreed process', 'More confidence in day-to-day store upkeep'],
    approach: ['Understand the store and support priorities', 'Agree access, response process and maintenance scope', 'Handle requests, review changes and share updates'],
    faqs: [['Is maintenance available as ongoing support?', 'Support arrangements can be discussed and agreed based on your requirements and availability.'], ['Do you monitor the store continuously?', 'Monitoring activities depend on the agreed support scope; continuous monitoring is not implied unless explicitly arranged.'], ['Can you troubleshoot third-party app issues?', 'We can help investigate issues and coordinate relevant details, while fixes may depend on the app provider or other third parties.']],
    related: ['shopify-app-integration', 'shopify-development', 'shopify-store-optimization']
  }
};

const routeName = {
  'shopify-development': 'Custom Shopify Store Development',
  'shopify-theme-customization': 'Shopify Theme Customization',
  'shopify-app-integration': 'Shopify App Integration',
  'shopify-store-optimization': 'Shopify Store Optimization',
  'product-collection-setup': 'Product & Collection Setup',
  'shopify-store-maintenance': 'Shopify Store Maintenance',
};

function handleShopifyImageError(event) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === 'true') return;
  image.dataset.fallbackApplied = 'true';
  image.src = '/images/shopify/service-image-fallback.svg';
}

export default function ShopifyServiceDetailPage({ onQuote }) {
  const { slug } = useParams();
  const service = services[slug];
  useEffect(() => {
    if (!service) return undefined;
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.content;
    document.title = `${service.title} | TechBerry`;
    if (meta) meta.content = `${service.intro} TechBerry Shopify services.`;
    return () => { document.title = previousTitle; if (meta && previousDescription !== undefined) meta.content = previousDescription; };
  }, [service]);

  if (!service) return <main className="shopify-detail shopify-detail--missing"><h1>Service page not found</h1><p>This Shopify service may have moved.</p><Link to="/services/shopify-development">Back to Shopify services</Link></main>;
  return <main className="shopify-detail">
    <div className="shopify-detail-container">
      <nav className="shopify-detail-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><Link to="/services">Services</Link><ChevronRight size={14} /><Link to="/services/shopify-development#shopify-services">Shopify</Link><ChevronRight size={14} /><span aria-current="page">{service.title}</span></nav>
      <Link className="shopify-detail-back" to="/services/shopify-development#shopify-services"><ArrowLeft size={15} /> Back to Services</Link>
      <section className="shopify-detail-hero"><div className="shopify-detail-hero-copy"><span className="shopify-detail-eyebrow"><i /> {service.category}</span><h1>{service.title}</h1><p>{service.intro}</p><div className="shopify-detail-actions"><PrimaryButton type="button" onClick={onQuote}>Get a Quote <ArrowRight size={17} /></PrimaryButton><a href="#shopify-detail-features">Explore capabilities <ArrowRight size={16} /></a></div></div><figure className="shopify-detail-image">{service.visual === 'ecosystem' ? <ShopifyEcosystemVisual /> : <img src={service.image} alt={service.alt} width="1200" height="675" decoding="async" fetchPriority="high" onError={handleShopifyImageError} />}<span aria-hidden="true" /></figure></section>
      <section className="shopify-detail-overview"><div><span className="shopify-detail-eyebrow">A THOUGHTFUL APPROACH</span><h2>Commerce experiences made for the way you work.</h2></div><p>{service.detail}</p></section>
      <section className="shopify-detail-columns" id="shopify-detail-features"><article><span className="shopify-detail-eyebrow">WHAT'S INCLUDED</span><h2>Key features &amp; capabilities</h2><ul>{service.features.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul></article><article><span className="shopify-detail-eyebrow">WHY IT MATTERS</span><h2>Benefits for your business</h2><ul>{service.benefits.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul></article></section>
      <section className="shopify-detail-approach"><span className="shopify-detail-eyebrow">OUR DEVELOPMENT APPROACH</span><h2>Clear steps, shared decisions.</h2><ol>{service.approach.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></section>
      <section className="shopify-detail-faq"><div><span className="shopify-detail-eyebrow"><CircleHelp size={15} /> COMMON QUESTIONS</span><h2>Frequently asked questions</h2></div><div className="shopify-detail-faq-list">{service.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
      <section className="shopify-detail-related"><div><span className="shopify-detail-eyebrow">KEEP EXPLORING</span><h2>Related services</h2></div><div className="shopify-detail-related-links">{service.related.map((key) => <Link key={key} to={key === 'shopify-development' ? '/services/shopify-development#shopify-development-details' : `/services/${key}`}>{routeName[key]} <ArrowRight size={15} /></Link>)}</div></section>
      <section className="shopify-detail-cta"><span className="shopify-detail-cta-icon"><Sparkles size={19} /></span><div><span className="shopify-detail-eyebrow">LET'S TALK SHOPIFY</span><h2>Ready to discuss your store?</h2><p>Tell us what you are looking to build or improve, and we can talk through a suitable next step.</p></div><PrimaryButton type="button" onClick={onQuote}>Get a Quote <ArrowRight size={17} /></PrimaryButton></section>
    </div>
  </main>;
}
