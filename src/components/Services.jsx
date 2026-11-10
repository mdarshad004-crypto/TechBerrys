import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard.jsx';

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
        <motion.div className="section-header reveal visible" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="eyebrow eyebrow-blue">OUR SERVICES</span>
          <h2>Comprehensive IT Services for Your Business</h2>
          <p>A complete range of digital and technology services to help you build, manage and grow your business online.</p>
        </motion.div>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
