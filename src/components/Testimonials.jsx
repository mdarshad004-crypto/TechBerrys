import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    review: '“Tech Berry transformed our digital presence with a sleek, conversion-focused website that genuinely elevated our brand.”',
    avatar: 'avatar-one',
  },
  {
    name: 'Michael Chen',
    role: 'Startup Founder',
    review: '“Their app development team delivered a smooth product experience and communicated with us every step of the way.”',
    avatar: 'avatar-two',
  },
  {
    name: 'Alicia Gomez',
    role: 'Operations Lead',
    review: '“From SEO to cloud infrastructure, Tech Berry helped us build a modern digital engine that keeps scaling with us.”',
    avatar: 'avatar-three',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="blog">
      <div className="container">
        <div className="section-header reveal visible testimonials-header"><h2>What Our Clients Say</h2></div>
        <div className="testimonial-grid">
          {testimonials.map((client, index) => (
            <motion.article
              className="testimonial-card reveal visible"
              key={client.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="stars" aria-label="Five star rating">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p>{client.review}</p>
              <div className="client-person">
                <div className={`avatar ${client.avatar}`} aria-hidden="true" />
                <div><strong>{client.name}</strong><span>{client.role}</span></div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
