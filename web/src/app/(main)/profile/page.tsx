'use client';

import { Header } from '@/components/layouts';
import { Card, Button } from '@/components/ui';
import { useStore } from '@/lib/stores/useStore';
import { languages } from '@/i18n/config';

export default function ProfilePage() {
  const { language, setLanguage, location, cart, cartTotal } = useStore();

  const selectedLanguage = languages.find((l) => l.code === language);

  return (
    <main className="min-h-screen bg-cream pb-20">
      <Header title="Profile" />

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {/* User Info Placeholder */}
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center">
              <svg className="w-8 h-8 text-earth-brown/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-semibold text-lg text-earth-brown">
                Guest User
              </h2>
              <p className="text-sm text-charcoal/60">
                Sign in to sync your data
              </p>
            </div>
          </div>
          <Button variant="secondary" className="w-full mt-4">
            Sign In with Phone
          </Button>
        </Card>

        {/* Location */}
        <Card>
          <h3 className="font-heading font-semibold text-sm text-earth-brown mb-3">
            Location
          </h3>
          {location ? (
            <div>
              <p className="text-sm text-charcoal/80">
                {location.village && `${location.village}, `}
                {location.district && `${location.district}, `}
                {location.state}
              </p>
              {location.pincode && (
                <p className="font-mono text-xs text-charcoal/50 mt-1">
                  PIN: {location.pincode}
                </p>
              )}
            </div>
          ) : (
            <div>
              <p className="text-sm text-charcoal/60 mb-3">
                Set your location for personalized recommendations
              </p>
              <Button variant="secondary" size="sm">
                Set Location
              </Button>
            </div>
          )}
        </Card>

        {/* Language */}
        <Card>
          <h3 className="font-heading font-semibold text-sm text-earth-brown mb-3">
            Language
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as typeof language)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  language === lang.code
                    ? 'border-earth-brown bg-earth-brown/5'
                    : 'border-parchment hover:border-earth-brown/30'
                }`}
              >
                <p className="font-medium text-sm text-earth-brown">
                  {lang.nativeName}
                </p>
                <p className="text-xs text-charcoal/50">{lang.name}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Cart Summary */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-sm text-earth-brown">
                Cart
              </h3>
              <p className="text-xs text-charcoal/60">
                {cart.length} item{cart.length !== 1 && 's'}
              </p>
            </div>
            {cart.length > 0 && (
              <p className="font-mono text-lg font-semibold text-primary">
                Rs {cartTotal().toLocaleString('en-IN')}
              </p>
            )}
          </div>
          {cart.length > 0 && (
            <Button className="w-full mt-3">
              View Cart
            </Button>
          )}
        </Card>

        {/* App Info */}
        <Card>
          <h3 className="font-heading font-semibold text-sm text-earth-brown mb-3">
            About
          </h3>
          <div className="space-y-2 text-sm text-charcoal/70">
            <div className="flex justify-between">
              <span>Version</span>
              <span className="font-mono">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Build</span>
              <span className="font-mono">2024.12</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-parchment space-y-2">
            <button className="w-full text-left text-sm text-charcoal/70 hover:text-earth-brown py-1">
              Privacy Policy
            </button>
            <button className="w-full text-left text-sm text-charcoal/70 hover:text-earth-brown py-1">
              Terms of Service
            </button>
            <button className="w-full text-left text-sm text-charcoal/70 hover:text-earth-brown py-1">
              Help & Support
            </button>
          </div>
        </Card>
      </div>
    </main>
  );
}
