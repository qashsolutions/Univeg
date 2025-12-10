'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-earth-brown"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-12 px-4',
            'bg-white border border-parchment rounded-lg',
            'font-body text-sm text-charcoal',
            'placeholder:text-earth-brown/50',
            'focus:outline-none focus:border-earth-brown focus:ring-1 focus:ring-earth-brown',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-primary focus:border-primary focus:ring-primary',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-primary font-medium">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-earth-brown/60">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
