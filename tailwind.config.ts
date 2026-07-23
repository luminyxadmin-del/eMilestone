import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '3rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        /* Brand — Deep Slate ink base with Amber Gold accent (per Executive Distinction) */
        ink: {
          DEFAULT: '#0F172A',
          soft: '#1E293B',
          muted: '#334155',
        },
        amber: {
          DEFAULT: '#F59E0B',
          soft: '#FBBF24',
          /* One step down from DEFAULT — the minimum nudge needed for a
             heading-weight tail to clear WCAG AA on white/subtle (~3.2:1
             at large-text sizes) while still reading as bright amber. */
          strong: '#D97706',
          deep: '#B45309',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
          sunken: '#F1F5F9',
        },
        line: {
          DEFAULT: '#E2E8F0',
          strong: '#CBD5E1',
        },
        copy: {
          DEFAULT: '#0F172A',
          muted: '#64748B',
          faint: '#94A3B8',
        },
        /* shadcn tokens */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      fontFamily: {
        display: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'label-sm': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.08em', fontWeight: '600' }],
        'label-md': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'head-sm': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'head-md': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.02em', fontWeight: '600' }],
        'head-lg': ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-sm': ['3rem', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '700' }],
      },
      borderRadius: {
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },
      boxShadow: {
        level1: '0 4px 20px rgba(15,23,42,0.05)',
        level2: '0 12px 32px rgba(15,23,42,0.08)',
        level3: '0 24px 64px rgba(15,23,42,0.12)',
        glow: '0 0 0 4px rgba(15,23,42,0.05)',
      },
      backgroundImage: {
        'ink-fade': 'linear-gradient(180deg,#0F172A 0%,#1E293B 100%)',
        'amber-fade': 'linear-gradient(135deg,#F59E0B 0%,#B45309 100%)',
        grid: 'linear-gradient(#E2E8F0 1px,transparent 1px),linear-gradient(90deg,#E2E8F0 1px,transparent 1px)',
        /* Section shading — near-white with a whisper of warmth, settling
           into surface-subtle. Replaces flat bg-white so light sections
           read as atmosphere rather than a flat panel. */
        'warm-tint': 'linear-gradient(180deg,#FFFFFF 0%,#FDFBF7 50%,#F8FAFC 100%)',
        /* Amber radial glow bleeding from a corner, ~5% opacity — layers
           over bg-surface-subtle. Decorative only, see SectionGlow. */
        'amber-glow': 'radial-gradient(1000px circle at 12% -8%,rgba(245,158,11,0.05),transparent 60%)',
        'amber-glow-soft':
          'radial-gradient(1000px circle at 88% 108%,rgba(245,158,11,0.035),transparent 55%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
