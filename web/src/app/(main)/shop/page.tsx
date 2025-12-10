'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/layouts';
import { Card, Input } from '@/components/ui';
import { ProductCard } from '@/components/features/ProductCard';
import { products, cropTypes } from '@/lib/data/products';
import type { CropType } from '@/types';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

const SEARCH_DEBOUNCE_MS = 300;

export default function ShopPage() {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<CropType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Debounce search input to avoid excessive filtering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by crop type
    if (selectedCrop !== 'all') {
      result = result.filter((p) => p.cropType === selectedCrop);
    }

    // Filter by search query (using debounced value)
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameHi?.includes(debouncedSearch) ||
          p.variety.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [debouncedSearch, selectedCrop, sortBy]);

  return (
    <main className="min-h-screen bg-cream">
      <Header title="Seed Catalog" showBack showCart />

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {/* Search */}
        <Input
          placeholder="Search seeds..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="bg-white"
        />

        {/* Crop Type Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          <button
            onClick={() => setSelectedCrop('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              selectedCrop === 'all'
                ? 'bg-earth-brown text-white'
                : 'bg-white border border-parchment text-earth-brown hover:border-earth-brown/30'
            }`}
          >
            All Seeds
          </button>
          {cropTypes.map((crop) => (
            <button
              key={crop.type}
              onClick={() => setSelectedCrop(crop.type)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                selectedCrop === crop.type
                  ? 'bg-earth-brown text-white'
                  : 'bg-white border border-parchment text-earth-brown hover:border-earth-brown/30'
              }`}
            >
              {crop.name}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-charcoal/60">
            {filteredProducts.length} product{filteredProducts.length !== 1 && 's'}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs text-earth-brown bg-transparent border-none focus:outline-none cursor-pointer font-medium"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="py-12 text-center">
            <p className="text-charcoal/60 text-sm">No products found</p>
            <p className="text-charcoal/40 text-xs mt-1">
              Try adjusting your search or filters
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
