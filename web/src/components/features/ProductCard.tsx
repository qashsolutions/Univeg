'use client';

import { memo } from 'react';
import Link from 'next/link';
import type { Product } from '@/types';
import { Card } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { CROP_EMOJI } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
}

/**
 * Memoized product card component to prevent unnecessary re-renders
 * when parent component (shop page) re-renders due to filter/sort changes
 */
export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`}>
      <Card padding="none" className="overflow-hidden hover:border-earth-brown/30 transition-colors h-full">
        <div className="aspect-[4/3] bg-parchment flex items-center justify-center">
          <span className="text-5xl">{CROP_EMOJI[product.cropType] || '🌱'}</span>
        </div>
        <div className="p-3">
          <h3 className="font-heading font-semibold text-sm text-earth-brown leading-tight mb-0.5">
            {product.name}
          </h3>
          <p className="text-[11px] text-charcoal/60 mb-2 line-clamp-1">
            {product.variety}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-sm font-semibold text-primary">
                {formatCurrency(product.price)}
              </p>
              <p className="text-[10px] text-charcoal/50">{product.packSize}</p>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-mono text-[10px] text-charcoal/70">{product.rating}</span>
            </div>
          </div>
          {product.stock < 50 && (
            <p className="text-[10px] text-primary mt-1.5 font-medium">
              Only {product.stock} left
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
});
