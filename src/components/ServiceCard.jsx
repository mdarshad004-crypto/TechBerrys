import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceIllustration from '../assets/images/ServiceIllustrations.jsx';

export default function ServiceCard({ service }) {
  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--card-tilt-x', `${x * 3}deg`);
    event.currentTarget.style.setProperty('--card-tilt-y', `${y * -3}deg`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.removeProperty('--card-tilt-x');
    event.currentTarget.style.removeProperty('--card-tilt-y');
  };

  return (
    <Link
      className="service-card reveal visible"
      to={`/services/${service.slug}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
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
