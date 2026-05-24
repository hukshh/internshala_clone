import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'info' | 'warning' | 'neutral';
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium select-none border transition-colors',
        {
          'bg-brand-green-light text-brand-green border-transparent': variant === 'success',
          'bg-brand-blue-light text-brand-blue border-transparent': variant === 'info',
          'bg-amber-50 text-amber-700 border-amber-100': variant === 'warning',
          'bg-gray-100 text-gray-600 border-transparent': variant === 'neutral',
        },
        className
      )}
      {...props}
    />
  );
}
