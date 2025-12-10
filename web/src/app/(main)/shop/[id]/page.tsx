'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layouts';
import { Button, Card, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { getProductById, products } from '@/lib/data/products';
import { formatCurrency, cn } from '@/lib/utils';
import { useStore } from '@/lib/stores/useStore';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProductById(id);
  const addToCart = useStore((state) => state.addToCart);

  if (!product) {
    notFound();
  }

  const cropEmoji: Record<string, string> = {
    tomato: '🍅',
    chilli: '🌶️',
    okra: '🥒',
    brinjal: '🍆',
    cucumber: '🥒',
    'bottle-gourd': '🫛',
    cotton: '☁️',
    maize: '🌽',
  };

  const relatedProducts = products
    .filter((p) => p.cropType === product.cropType && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-cream pb-24">
      <Header showBack showCart />

      {/* Product Image */}
      <div className="aspect-square bg-parchment flex items-center justify-center">
        <span className="text-8xl">{cropEmoji[product.cropType] || '🌱'}</span>
      </div>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-1">
            <h1 className="font-heading text-xl font-semibold text-earth-brown">
              {product.name}
            </h1>
            <div className="flex items-center gap-1 flex-shrink-0">
              <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-mono text-sm font-medium text-earth-brown">
                {product.rating}
              </span>
              <span className="text-xs text-charcoal/50">({product.reviews})</span>
            </div>
          </div>
          {product.nameHi && (
            <p className="text-sm text-charcoal/70 mb-1">{product.nameHi}</p>
          )}
          <p className="text-sm text-charcoal/60">{product.variety}</p>
        </div>

        {/* Price & Stock */}
        <Card padding="sm" className="flex items-center justify-between">
          <div>
            <p className="font-mono text-2xl font-bold text-primary">
              {formatCurrency(product.price)}
            </p>
            <p className="text-xs text-charcoal/60">{product.packSize}</p>
          </div>
          <Badge color={product.stock > 100 ? 'success' : product.stock > 50 ? 'secondary' : 'primary'}>
            {product.stock > 100 ? 'In Stock' : `${product.stock} left`}
          </Badge>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card padding="sm">
            <p className="text-[10px] text-charcoal/50 uppercase tracking-wide mb-1">
              Sowing Season
            </p>
            <p className="font-mono text-sm font-medium text-earth-brown">
              {product.sowingSeason}
            </p>
          </Card>
          <Card padding="sm">
            <p className="text-[10px] text-charcoal/50 uppercase tracking-wide mb-1">
              Days to Harvest
            </p>
            <p className="font-mono text-sm font-medium text-earth-brown">
              {product.harvestDays} days
            </p>
          </Card>
        </div>

        {/* Details Tabs */}
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="growing">Growing Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Card>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {product.description}
              </p>
            </Card>
          </TabsContent>
          <TabsContent value="growing">
            <Card className="space-y-4">
              <div>
                <h4 className="font-heading font-semibold text-sm text-earth-brown mb-2">
                  Recommended Sowing Period
                </h4>
                <p className="text-sm text-charcoal/70">{product.sowingSeason}</p>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-earth-brown mb-2">
                  Crop Duration
                </h4>
                <p className="text-sm text-charcoal/70">
                  First harvest expected in {product.harvestDays} days from sowing
                </p>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-earth-brown mb-2">
                  Seed Rate
                </h4>
                <p className="text-sm text-charcoal/70">
                  {product.packSize} - sufficient for approximately 0.1 acre
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-heading text-base text-earth-brown mb-3">
              More {product.cropType.charAt(0).toUpperCase() + product.cropType.slice(1)} Varieties
            </h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
              {relatedProducts.map((related) => (
                <a
                  key={related.id}
                  href={`/shop/${related.id}`}
                  className="flex-shrink-0 w-32"
                >
                  <Card padding="sm">
                    <div className="aspect-square bg-parchment rounded-md mb-2 flex items-center justify-center">
                      <span className="text-2xl">{cropEmoji[related.cropType]}</span>
                    </div>
                    <h3 className="font-medium text-xs text-earth-brown truncate">
                      {related.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-primary">
                      {formatCurrency(related.price)}
                    </p>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-parchment p-4 safe-bottom">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => addToCart(product, 1)}
          >
            Add to Cart
          </Button>
          <Button className="flex-1">Buy Now</Button>
        </div>
      </div>
    </main>
  );
}
