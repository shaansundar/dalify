"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useTransition,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/shopify/types";
import {
  getCartAction,
  addToCartAction,
  updateCartLineAction,
  removeFromCartAction,
} from "@/lib/actions/cart";

interface CartContextValue {
  readonly cart: Cart | null;
  readonly isLoading: boolean;
  readonly isDrawerOpen: boolean;
  readonly openDrawer: () => void;
  readonly closeDrawer: () => void;
  readonly addItem: (variantId: string, quantity: number) => Promise<void>;
  readonly updateItem: (lineId: string, quantity: number) => Promise<void>;
  readonly removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Load cart on mount
  useEffect(() => {
    startTransition(async () => {
      const existingCart = await getCartAction();
      setCart(existingCart);
    });
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      const { cart: updatedCart, error } = await addToCartAction(
        variantId,
        quantity,
      );
      if (error) {
        console.error("Add to cart error:", error);
        return;
      }
      setCart(updatedCart);
      setIsDrawerOpen(true);
    },
    [],
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      const { cart: updatedCart, error } = await updateCartLineAction(
        lineId,
        quantity,
      );
      if (error) {
        console.error("Update cart error:", error);
        return;
      }
      setCart(updatedCart);
    },
    [],
  );

  const removeItem = useCallback(async (lineId: string) => {
    const { cart: updatedCart, error } = await removeFromCartAction(lineId);
    if (error) {
      console.error("Remove from cart error:", error);
      return;
    }
    setCart(updatedCart);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading: isPending,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
