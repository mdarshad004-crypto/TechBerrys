import Hero from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Projects from '../components/Projects.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CTA from '../components/CTA.jsx';

export default function Home({ onQuote }) {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Projects />
      <Testimonials />
      <CTA onQuote={onQuote} />
    </>
  );
}
