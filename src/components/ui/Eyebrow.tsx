import React from 'react';
import { cn } from '../../lib/utils';

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <span className={cn('block text-gold-500 font-medium uppercase text-[13px] md:text-sm tracking-[0.3em] mb-6 md:mb-8', className)} {...props}>
      {children}
    </span>
  );
}
