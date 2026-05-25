import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center transition-all duration-300 ease-out font-medium tracking-wide';
    
    const variants = {
      primary: 'bg-cocoa-700 text-cream hover:bg-cocoa-600 rounded-none px-8 py-4',
      secondary: 'bg-gold-400 text-cocoa-800 hover:bg-gold-300 rounded-none px-8 py-4',
      outline: 'border border-gold-400 text-cocoa-700 hover:bg-gold-400/5 rounded-none px-8 py-4',
      ghost: 'text-cocoa-700 hover:text-cocoa-500 underline-offset-4 hover:underline px-4 py-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
