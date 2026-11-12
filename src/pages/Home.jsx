import Hero from '../components/Hero.jsx';
import Testimonials from '../components/Testimonials.jsx';
import ClientLogoStrip from '../components/ClientLogoStrip.jsx';
import Services from '../components/Services.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import BusinessCredibility from '../components/BusinessCredibility.jsx';
import Projects from '../components/Projects.jsx';
import StudioStory from '../components/StudioStory.jsx';
import HomeProcess from '../components/HomeProcess.jsx';
import CTA from '../components/CTA.jsx';

export default function Home({ onQuote, onWhatsApp }) {
  return (
    <>
      <Hero />
      <Testimonials />
      <ClientLogoStrip />
      <WhyChooseUs />
      <Services />
      <StudioStory />
      <HomeProcess />
      <Projects />
      <BusinessCredibility />
      <CTA onQuote={onQuote} onWhatsApp={onWhatsApp} />
    </>
  );
}
