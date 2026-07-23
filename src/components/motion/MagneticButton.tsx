'use client';

import { useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Pull strength as a fraction of cursor distance from centre. */
  strength?: number;
}

/** Wraps an element so it leans toward the pointer. Pure decoration, so it is
 *  disabled entirely for reduced-motion users and on touch input. */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse' || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setOffset({
          x: (event.clientX - (rect.left + rect.width / 2)) * strength,
          y: (event.clientY - (rect.top + rect.height / 2)) * strength,
        });
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}
