"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import {
  createCart,
  getCart,
  addToCart,
  updateCartLines,
  removeFromCart,
} from "@/lib/shopify";
import type { Cart } from "@/lib/shopify/types";

const CART_COOKIE = "dalify-cart-id";

async function getCartId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE)?.value;
}

async function setCartId(cartId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14, // 14 days
    path: "/",
  });
}

export async function getCartAction(): Promise<Cart | null> {
  const cartId = await getCartId();
  if (!cartId) return null;

  try {
    return await getCart(cartId);
  } catch {
    return null;
  }
}

export async function addToCartAction(
  variantId: string,
  quantity: number,
): Promise<{ cart: Cart | null; error: string | null }> {
  try {
    let cartId = await getCartId();

    if (!cartId) {
      const cart = await createCart([{ merchandiseId: variantId, quantity }]);
      await setCartId(cart.id);
      revalidateTag("cart");
      return { cart, error: null };
    }

    const cart = await addToCart(cartId, [
      { merchandiseId: variantId, quantity },
    ]);
    revalidateTag("cart");
    return { cart, error: null };
  } catch (err) {
    return {
      cart: null,
      error: err instanceof Error ? err.message : "Failed to add to cart",
    };
  }
}

export async function updateCartLineAction(
  lineId: string,
  quantity: number,
): Promise<{ cart: Cart | null; error: string | null }> {
  try {
    const cartId = await getCartId();
    if (!cartId) return { cart: null, error: "No cart found" };

    const cart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
    revalidateTag("cart");
    return { cart, error: null };
  } catch (err) {
    return {
      cart: null,
      error: err instanceof Error ? err.message : "Failed to update cart",
    };
  }
}

export async function removeFromCartAction(
  lineId: string,
): Promise<{ cart: Cart | null; error: string | null }> {
  try {
    const cartId = await getCartId();
    if (!cartId) return { cart: null, error: "No cart found" };

    const cart = await removeFromCart(cartId, [lineId]);
    revalidateTag("cart");
    return { cart, error: null };
  } catch (err) {
    return {
      cart: null,
      error: err instanceof Error ? err.message : "Failed to remove from cart",
    };
  }
}
