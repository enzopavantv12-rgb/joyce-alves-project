import React from 'react';
import { cn } from '../../lib/utils';

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function SectionTitle({ children, as: Component = 'h2', className, ...props }: SectionTitleProps) {
  return (
    <Component className={cn('font-display font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-ink', className)} {...props}>
      {children}
    </Component>
  );
}
