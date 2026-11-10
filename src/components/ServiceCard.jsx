import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceIllustration from '../assets/images/ServiceIllustrations.jsx';

export default function ServiceCard({ service }) {
  return (
    <Link className="service-card reveal visible" to={`/services/${service.slug}`}>
      <div className={`service-illustration ${service.icon}-ill`} aria-hidden="true">
        <ServiceIllustration type={service.icon} />
        <span className="illustration-glint" />
      </div>
      <div className="service-content">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
      <span className="service-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
    </Link>
  );
}
