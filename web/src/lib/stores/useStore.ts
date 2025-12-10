import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GeoLocation, LanguageCode, Product, FarmerProfile } from '@/types';

// Cart item with quantity
interface CartItem {
  product: Product;
  quantity: number;
}

// App state
interface AppState {
  // User location
  location: GeoLocation | null;
  setLocation: (location: GeoLocation) => void;

  // Language preference
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // User profile
  profile: FarmerProfile | null;
  setProfile: (profile: FarmerProfile | null) => void;

  // UI state
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Location
      location: null,
      setLocation: (location) => set({ location }),

      // Language
      language: 'hi',
      setLanguage: (language) => set({ language }),

      // Cart
      cart: [],
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existing = cart.find((item) => item.product.id === product.id);

        if (existing) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          set({ cart: cart.filter((item) => item.product.id !== productId) });
        } else {
          set({
            cart: cart.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => set({ cart: [] }),
      cartTotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      cartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Profile
      profile: null,
      setProfile: (profile) => set({ profile }),

      // Online status
      isOnline: true,
      setIsOnline: (isOnline) => set({ isOnline }),
    }),
    {
      name: 'kisan-mitra-storage',
      partialize: (state) => ({
        location: state.location,
        language: state.language,
        cart: state.cart,
        profile: state.profile,
      }),
    }
  )
);
