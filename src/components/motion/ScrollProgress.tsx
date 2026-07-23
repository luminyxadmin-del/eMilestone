'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** The milestone rail, applied to the page itself: an amber marker that
 *  tracks how far through the document the reader has travelled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-amber"
    />
  );
}
