import React from 'react';
import { cn } from '../../lib/utils';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ className, orientation = 'horizontal', ...props }: DividerProps) {
  return (
    <div
      className={cn(
        'bg-gold-400',
        orientation === 'horizontal' ? 'h-px w-16 mx-auto' : 'w-px h-16 mx-auto',
        className
      )}
      {...props}
    />
  );
}
