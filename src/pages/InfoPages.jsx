import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { services } from '../components/Services.jsx';
import Projects from '../components/Projects.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ServiceIllustration from '../assets/images/ServiceIllustrations.jsx';

function PageIntro({ label, title, description, children }) {
  return (
    <section className="info-page">
      <div className="container info-page-inner">
        <span className="eyebrow eyebrow-blue">{label}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}

export function About() {
  return (
    <PageIntro label="ABOUT TECH BERRY" title="Technology that moves business forward." description="We bring design, engineering and digital strategy together to help ambitious teams build better experiences and grow with confidence.">
      <div className="info-highlights">
        {['A thoughtful, collaborative process', 'Reliable technology built to scale', 'Clear communication from start to finish'].map((item) => <div key={item}><CheckCircle2 size={19} /> {item}</div>)}
      </div>
      <Link className="btn btn-primary" to="/contact">Talk to our team <ArrowRight size={18} /></Link>
    </PageIntro>
  );
}

export function ServicesPage() {
  return (
    <PageIntro label="OUR SERVICES" title="Digital solutions for the next stage of your business." description="Explore our full range of technology and growth services.">
      <div className="services-grid info-services-grid">{services.map((service) => <ServiceCard service={service} key={service.slug} />)}</div>
    </PageIntro>
  );
}

export function ServicePage({ onQuote }) {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  return (
    <PageIntro label="TECH BERRY SERVICES" title={service.title} description={service.description}>
      <div className="service-detail-panel">
        <div className={`service-illustration ${service.icon}-ill`} aria-hidden="true"><ServiceIllustration type={service.icon} /></div>
        <div><h2>Built around your business</h2><p>We pair practical expertise with thoughtful design to deliver a reliable solution tailored to your goals.</p></div>
      </div>
      <button className="btn btn-primary" onClick={onQuote} type="button">Request a consultation <ArrowRight size={18} /></button>
    </PageIntro>
  );
}

export function ProjectsPage() {
  return <><PageIntro label="OUR WORK" title="Recent work, made for real-world impact." description="A selection of digital experiences across healthcare, commerce and business growth." /><Projects /></>;
}

export function Contact({ onQuote }) {
  return (
    <PageIntro label="CONTACT" title="Let’s make your next idea happen." description="Tell us what you’re planning. We’ll help you find a practical next step.">
      <button className="btn btn-primary" onClick={onQuote} type="button">Start an enquiry <ArrowRight size={18} /></button>
    </PageIntro>
  );
}

export function Blog() {
  return <PageIntro label="INSIGHTS" title="Ideas for building better digital experiences." description="Our insights on technology, design and sustainable digital growth are coming soon." />;
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
    <Link className="btn btn-primary" to="/">Back to homepage <ArrowRight size={18} /></Link>
  </PageIntro>;
}
