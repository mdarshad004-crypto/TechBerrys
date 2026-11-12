import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);
const elements = {
  button: motion.button,
  a: motion.a,
  link: MotionLink,
};

function Button({ as = 'button', variant, className = '', ...props }) {
  const Element = elements[as];

  if (!Element) {
    throw new Error(`Unsupported button element: ${as}`);
  }

  return <Element className={['btn', variant, className].filter(Boolean).join(' ')} {...props} />;
}

export function PrimaryButton(props) {
  return <Button variant="btn-primary" {...props} />;
}

export function SecondaryButton(props) {
  return <Button variant="btn-secondary" {...props} />;
}

export function IconButton({ className = '', ...props }) {
  return <Button className={`icon-button ${className}`.trim()} {...props} />;
}
