import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: 'content' | 'prose' | 'tight';
}

export function Container({ children, className, width = 'content', ...props }: ContainerProps) {
  const maxWidthClass = {
    content: 'max-w-content',
    prose: 'max-w-prose',
    tight: 'max-w-tight',
  }[width];

  return (
    <div className={cn('mx-auto px-6 md:px-10 lg:px-16', maxWidthClass, className)} {...props}>
      {children}
    </div>
  );
}
