"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product, StoreVariant } from "@/lib/products";

type CartItem = {
  key: string;
  handle: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  variantLabel?: string;
};

type StoreContextValue = {
  cart: CartItem[];
  itemCount: number;
  subtotal: number;
  cartOpen: boolean;
  searchOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  addToCart: (
    product: Product,
    variant?: StoreVariant,
    quantity?: number,
    openDrawer?: boolean,
  ) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const STORAGE_KEY = "your-craft-store-demo-cart-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleanItems = parsed.filter(
            (item): item is CartItem =>
              typeof item === "object" &&
              item !== null &&
              "key" in item &&
              typeof item.key === "string" &&
              "handle" in item &&
              typeof item.handle === "string" &&
              "title" in item &&
              typeof item.title === "string" &&
              "image" in item &&
              typeof item.image === "string" &&
              "price" in item &&
              typeof item.price === "number" &&
              "quantity" in item &&
              typeof item.quantity === "number" &&
              item.quantity > 0,
          );
          setCart(cleanItems);
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openSearch = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const addToCart = useCallback(
    (
      product: Product,
      variant?: StoreVariant,
      quantity = 1,
      openDrawer = true,
    ) => {
      const key = `${product.handle}::${variant?.id ?? "default"}`;
      const image = variant?.image ?? product.image;
      const price = variant?.price ?? product.price;
      setCart((current) => {
        const existing = current.find((item) => item.key === key);
        if (existing) {
          return current.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + Math.max(1, quantity) }
              : item,
          );
        }
        return [
          ...current,
          {
            key,
            handle: product.handle,
            title: product.title,
            image,
            price,
            quantity: Math.max(1, quantity),
            ...(variant?.label ? { variantLabel: variant.label } : {}),
          },
        ];
      });
      setSearchOpen(false);
      if (openDrawer) setCartOpen(true);
    },
    [],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((current) =>
      current.map((item) =>
        item.key === key ? { ...item, quantity: Math.floor(quantity) } : item,
      ),
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((current) => current.filter((item) => item.key !== key));
  }, []);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      subtotal,
      cartOpen,
      searchOpen,
      openCart,
      closeCart,
      openSearch,
      closeSearch,
      addToCart,
      setQuantity,
      removeFromCart,
    }),
    [
      cart,
      itemCount,
      subtotal,
      cartOpen,
      searchOpen,
      openCart,
      closeCart,
      openSearch,
      closeSearch,
      addToCart,
      setQuantity,
      removeFromCart,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
