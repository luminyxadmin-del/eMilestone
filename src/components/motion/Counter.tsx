'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  /** Delay in ms before the count starts — lets a row of counters stagger
   *  left-to-right instead of all ticking up at once. Skipped entirely
   *  under reduced motion, which jumps straight to the final value. */
  delay?: number;
  className?: string;
}

export function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 1800,
  delay = 0,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start = 0;

    const run = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, long settle, which suits large figures.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(run);
    };

    const timeout = setTimeout(() => {
      start = performance.now();
      frame = requestAnimationFrame(run);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [inView, value, duration, delay, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(display)}
      {suffix}
    </span>
  );
}
