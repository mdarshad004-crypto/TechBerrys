export const motionEase = [0.22, 1, 0.36, 1];
export const motionTransition = { duration: 0.5, ease: motionEase };

export const revealUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: motionEase },
  },
};

export const revealLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.58, ease: motionEase },
  },
};

export const revealRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.58, ease: motionEase },
  },
};

export const revealScale = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.58, ease: motionEase },
  },
};

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const viewportOnce = { once: true, amount: 0.18 };
