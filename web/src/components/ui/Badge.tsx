'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'status' | 'distance';
  color?: 'primary' | 'secondary' | 'success' | 'muted';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'status', color = 'primary', children, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center',
      'h-6 px-3 rounded',
      'text-[10px] font-semibold uppercase tracking-wider',
      'text-white'
    );

    const colors = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-success',
      muted: 'bg-muted',
    };

    const variantStyles = {
      status: 'font-body',
      distance: 'font-mono',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, colors[color], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
