import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function CursorEffects() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const trailX = useSpring(pointerX, { stiffness: 180, damping: 24, mass: 0.45 });
  const trailY = useSpring(pointerY, { stiffness: 180, damping: 24, mass: 0.45 });
  const ringX = useSpring(pointerX, { stiffness: 95, damping: 20, mass: 0.65 });
  const ringY = useSpring(pointerY, { stiffness: 95, damping: 20, mass: 0.65 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches || shouldReduceMotion) {
      setEnabled(false);
      return undefined;
    }

    setEnabled(true);
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';
    const handlePointerMove = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      const target = event.target instanceof Element ? event.target.closest(interactiveSelector) : null;
      const nextHovering = Boolean(target);
      setHovering((current) => current === nextHovering ? current : nextHovering);
    };
    const handlePointerDown = () => setPressed(true);
    const handlePointerUp = () => setPressed(false);
    const reset = () => {
      setHovering(false);
      setPressed(false);
      pointerX.set(-100);
      pointerY.set(-100);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('blur', reset);
    };
  }, [pointerX, pointerY, shouldReduceMotion]);

  if (!enabled) return null;

  return (
    <div className="cursor-effects" aria-hidden="true">
      <motion.span className="cursor-trail" style={{ x: trailX, y: trailY }} />
      <motion.span className={`cursor-ring${hovering ? ' is-hovering' : ''}${pressed ? ' is-pressed' : ''}`} style={{ x: ringX, y: ringY }} />
      <motion.span className="cursor-dot" style={{ x: pointerX, y: pointerY }} />
    </div>
  );
}
