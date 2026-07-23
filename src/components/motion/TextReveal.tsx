'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { splitAccentTitle, ACCENT_TONE_CLASS } from '@/components/ui/accent-text';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  tone?: 'light' | 'dark';
}

/**
 * Word-by-word mask reveal. Each word rises out of its own clipping box,
 * which reads as typesetting rather than as a generic fade. A trailing
 * `**word(s)**` marker in `text` renders in brand amber, same convention
 * as AccentText, so the stagger animation and the accent tail stay in sync.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  as = 'h1',
  tone = 'dark',
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const { lead, accent } = splitAccentTitle(text);
  const accentClass = ACCENT_TONE_CLASS[tone];
  const words = [
    ...lead
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, accented: false })),
    ...(accent
      ? accent
          .trim()
          .split(' ')
          .filter(Boolean)
          .map((word) => ({ word, accented: true }))
      : []),
  ];
  const Tag = motion[as];

  if (reduce) {
    const Static = as;
    return (
      <Static className={className}>
        {lead}
        {accent && <span className={accentClass}>{accent}</span>}
      </Static>
    );
  }

  return (
    <Tag
      className={cn('flex flex-wrap', className)}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
      aria-label={text.replace(/\*\*/g, '')}
    >
      {words.map((item, i) => (
        <span
          key={`${item.word}-${i}`}
          className={cn(
            'mr-[0.25em] inline-block overflow-hidden py-[0.08em]',
            item.accented && accentClass,
          )}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              visible: { y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
