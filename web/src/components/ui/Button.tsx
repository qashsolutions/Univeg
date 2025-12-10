'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center font-body font-semibold',
      'transition-all duration-150 ease-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-earth-brown focus-visible:ring-offset-2',
      'disabled:opacity-40 disabled:cursor-not-allowed',
      'active:scale-[0.98]'
    );

    const variants = {
      primary: 'bg-primary text-white hover:brightness-90',
      secondary:
        'bg-transparent border-[1.5px] border-earth-brown text-earth-brown hover:bg-earth-brown/5',
      tertiary: 'bg-transparent text-primary hover:underline',
      ghost: 'bg-transparent text-earth-brown hover:bg-earth-brown/5',
    };

    const sizes = {
      sm: 'h-9 px-3 text-xs rounded-md',
      md: 'h-12 px-6 text-sm rounded-lg min-w-[120px]',
      lg: 'h-14 px-8 text-base rounded-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-current opacity-75 animate-pulse" />
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
