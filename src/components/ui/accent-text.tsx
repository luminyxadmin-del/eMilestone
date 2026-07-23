const ACCENT_TAIL_PATTERN = /^([\s\S]*)\*\*([\s\S]+)\*\*$/;

export interface AccentSplit {
  lead: string;
  accent: string | null;
}

/**
 * Parses a title authored with a trailing `**accent**` marker into its
 * plain lead and the accented tail. Titles without a marker pass through
 * unchanged. The marker must close at the very end of the string, so an
 * accent can only ever be a tail — never a mid-sentence span.
 */
export function splitAccentTitle(title: string): AccentSplit {
  const match = title.match(ACCENT_TAIL_PATTERN);
  if (!match) return { lead: title, accent: null };
  return { lead: match[1], accent: match[2] };
}

/**
 * The single source of truth for the accent tail color: bright amber on
 * dark ink, and the minimally-nudged `amber-strong` on light/white so it
 * still reads as bright amber (not brown) while holding WCAG AA at
 * heading sizes. AccentText and TextReveal both key off this — never
 * hardcode `text-amber` / `text-amber-strong` for a heading tail elsewhere.
 */
export const ACCENT_TONE_CLASS = {
  dark: 'text-amber',
  light: 'text-amber-strong',
} as const;

interface AccentTextProps {
  text: string;
  tone?: 'light' | 'dark';
}

/**
 * The one shared implementation every headline uses to render its final
 * `**word(s)**` in brand amber, so the tail treatment never drifts into
 * ad-hoc spans per section.
 */
export function AccentText({ text, tone = 'light' }: AccentTextProps) {
  const { lead, accent } = splitAccentTitle(text);
  if (!accent) return <>{text}</>;

  return (
    <>
      {lead}
      <span className={ACCENT_TONE_CLASS[tone]}>{accent}</span>
    </>
  );
}
