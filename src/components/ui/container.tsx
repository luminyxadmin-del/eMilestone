import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  width?: 'default' | 'narrow' | 'wide';
}

const widths = {
  narrow: 'max-w-3xl',
  default: 'max-w-[1440px]',
  wide: 'max-w-[1680px]',
} as const;

export function Container({
  children,
  className,
  as: Tag = 'div',
  width = 'default',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-4 md:px-12', widths[width], className)}>
      {children}
    </Tag>
  );
}
