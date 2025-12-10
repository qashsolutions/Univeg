'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export function Header({
  title = 'Kisan Mitra',
  showBack = false,
  showCart = false,
  rightAction,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40',
        'bg-cream/95 backdrop-blur-sm',
        'border-b border-parchment',
        'safe-top',
        className
      )}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        {/* Left: Back button or logo */}
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg hover:bg-earth-brown/5"
              aria-label="Go back"
            >
              <svg
                className="w-5 h-5 text-earth-brown"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading font-semibold text-lg text-earth-brown">
                {title}
              </span>
            </Link>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {showCart && (
            <Link
              href="/checkout"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-earth-brown/5 relative"
              aria-label="Shopping cart"
            >
              <svg
                className="w-5 h-5 text-earth-brown"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
          )}
          {rightAction}
        </div>
      </div>
    </header>
  );
}
