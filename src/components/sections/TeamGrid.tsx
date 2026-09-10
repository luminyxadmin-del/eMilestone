'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import type { TeamMember } from '@/types';

/**
 * A compact grid of clickable profile cards. Clicking one opens a modal with
 * the full photo and bio — the card itself never resizes or expands, so
 * clicking a member never disturbs the grid or its neighbours.
 */
export function TeamGrid({ team }: { team: TeamMember[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const active = team.find((member) => member.slug === activeSlug) ?? null;

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveSlug(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <>
      <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <StaggerItem key={member.slug}>
            <button
              type="button"
              onClick={() => setActiveSlug(member.slug)}
              className="card-premium group flex h-full w-full flex-col overflow-hidden text-left"
            >
              <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-surface-subtle">
                {member.avatarUrl ? (
                  <Image
                    src={member.avatarUrl}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center bg-ink font-display text-display-sm text-white">
                    {member.initials}
                  </span>
                )}
                <Badge
                  variant="accent"
                  className="absolute right-2 top-2 bg-ink/80 text-amber-soft backdrop-blur-sm"
                >
                  {member.focus}
                </Badge>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-body-lg font-semibold text-ink">{member.name}</h3>
                <p className="mt-1 text-label-md text-copy-muted">{member.role}</p>
                <p className="mt-2 text-label-md text-copy-muted line-clamp-2">{member.bio}</p>
              </div>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <AnimatePresence>
        {active && (
          <motion.div
            role="presentation"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.25 }}
            onClick={() => setActiveSlug(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="team-modal-name"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 16 }}
              transition={{ duration: reduce ? 0.01 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid max-h-[85vh] w-full max-w-3xl grid-cols-1 overflow-hidden rounded-lg bg-white shadow-level3 sm:grid-cols-2"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-line bg-white text-copy-muted transition-colors hover:border-ink hover:text-ink"
              >
                <X aria-hidden="true" className="size-4" />
              </button>

              <div className="relative aspect-[4/5] sm:aspect-auto">
                {active.avatarUrl ? (
                  <Image
                    src={active.avatarUrl}
                    alt={active.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center bg-ink font-display text-display-lg text-white">
                    {active.initials}
                  </span>
                )}
              </div>

              <div className="overflow-y-auto p-8 md:p-10">
                <h2 id="team-modal-name" className="text-head-md text-ink">
                  {active.name}
                </h2>
                <p className="mt-1 text-label-md font-semibold uppercase tracking-[0.1em] text-amber-deep">
                  {active.role}
                </p>
                <p className="mt-5 text-body-md text-copy-muted">{active.bio}</p>

                {(active.email || active.linkedin) && (
                  <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                    {active.email && (
                      <a
                        href={`mailto:${active.email}`}
                        aria-label={`Email ${active.name}`}
                        className="flex size-10 items-center justify-center rounded-full border border-line text-copy-muted transition-colors hover:border-ink hover:text-ink"
                      >
                        <Mail aria-hidden="true" className="size-4" />
                      </a>
                    )}
                    {active.linkedin && (
                      <a
                        href={active.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${active.name} on LinkedIn`}
                        className="flex size-10 items-center justify-center rounded-full border border-line text-copy-muted transition-colors hover:border-ink hover:text-ink"
                      >
                        <Linkedin aria-hidden="true" className="size-4" />
                      </a>
                    )}
                  </div>
                )}

                <div className="mt-8 border-t border-line pt-6">
                  <p className="eyebrow text-copy-faint">Focus</p>
                  <div className="mt-3">
                    <Badge variant="accent">{active.focus}</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
