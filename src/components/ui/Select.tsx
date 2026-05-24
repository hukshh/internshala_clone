import React from 'react';
import { cn } from '@/utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string | number }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-semibold text-brand-gray mb-1.5 uppercase tracking-wider">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full h-10 px-3 border border-brand-gray-border rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all cursor-pointer hover:border-brand-gray',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';
