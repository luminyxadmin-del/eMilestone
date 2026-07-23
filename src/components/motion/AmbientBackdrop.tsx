'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Slow-drifting ink washes behind dark sections. Deliberately low contrast —
 *  it should register as depth, never as a gradient effect. */
export function AmbientBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-amber/10 blur-[120px]"
        animate={reduce ? {} : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-52 right-0 h-[560px] w-[560px] rounded-full bg-slate-400/10 blur-[130px]"
        animate={reduce ? {} : { x: [0, -70, 0], y: [0, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
