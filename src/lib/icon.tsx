import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

type IconRegistry = Record<string, React.ComponentType<LucideProps>>;

const registry = Icons as unknown as IconRegistry;

interface IconProps extends LucideProps {
  name: string;
}

/**
 * Resolves a Lucide icon by name so content files can stay plain data.
 * Falls back to a neutral marker rather than crashing on a typo.
 */
export function Icon({ name, ...props }: IconProps) {
  const Component = registry[name] ?? Icons.Circle;
  return <Component aria-hidden="true" {...props} />;
}
