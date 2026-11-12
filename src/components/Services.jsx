import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from './ServiceCard.jsx';
import { revealUp, staggerChildren, viewportOnce } from './motion.js';

export const services = [
  { slug: 'shopify-development', icon: 'shopify', title: 'Shopify Development', description: 'Custom Shopify stores, theme customization, app integration and store optimization.' },
  { slug: 'website-development', icon: 'website', title: 'Website Development', description: 'Responsive, modern and professional business websites tailored to your needs.' },
  { slug: 'app-development', icon: 'app', title: 'App Development', description: 'Android and iOS application development with seamless user experiences.' },
  { slug: 'seo-services', icon: 'seo', title: 'SEO Services', description: 'Improve Google rankings, website visibility and organic traffic.' },
  { slug: 'digital-marketing', icon: 'marketing', title: 'Digital Marketing', description: 'Data-driven marketing to increase brand reach, engagement and sales.' },
  { slug: 'ui-ux-design', icon: 'uiux', title: 'UI/UX Design', description: 'User-friendly and visually appealing designs that improve digital experiences.' },
  { slug: 'cloud-solutions', icon: 'cloud', title: 'Cloud Solutions', description: 'Secure, scalable and cost-effective cloud infrastructure for businesses.' },
  { slug: 'it-consulting', icon: 'consulting', title: 'IT Consulting', description: 'Expert technology guidance to streamline and grow your business.' },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <motion.div
          className="section-header reveal visible"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="eyebrow eyebrow-blue">OUR DIGITAL EXPERTISE</span>
          <h2>Technology Solutions That Move Your Business Forward.</h2>
          <p>Explore our range of digital and IT services designed to simplify operations, improve performance and accelerate growth.</p>
        </motion.div>
        <motion.div
          className="services-grid"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {services.map((service) => (
            <motion.div
              key={service.slug}
              className="service-card-motion"
              variants={revealUp}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="services-explore"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Link className="services-explore-link" to="/services">
            Explore All Services <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
