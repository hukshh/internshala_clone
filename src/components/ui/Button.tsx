import React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:pointer-events-none disabled:opacity-50 active:scale-95',
          {
            'bg-brand-blue text-white hover:bg-brand-blue-hover shadow-sm': variant === 'primary',
            'bg-brand-gray-light text-brand-gray-dark hover:bg-brand-gray-border border border-brand-gray-border': variant === 'secondary',
            'border border-brand-blue text-brand-blue hover:bg-brand-blue-light': variant === 'outline',
            'text-[#333] hover:bg-gray-100': variant === 'ghost',
          },
          {
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
