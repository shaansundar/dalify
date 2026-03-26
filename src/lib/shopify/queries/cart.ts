/* ------------------------------------------------------------------ */
/*  Cart Queries & Mutations                                          */
/* ------------------------------------------------------------------ */

import { shopifyFetch } from "../client";
import type { Cart } from "../types";

// --- Fragments ---

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
            amountPerQuantity { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              selectedOptions { name value }
              image { url altText width height }
              product {
                handle
                title
                featuredImage { url altText width height }
              }
            }
          }
        }
      }
    }
  }
`;

// --- Queries ---

const CREATE_CART = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const GET_CART = /* GraphQL */ `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
`;

const ADD_TO_CART = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const UPDATE_CART_LINES = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const REMOVE_FROM_CART = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

// --- Fetchers ---

export async function createCart(
  lines: ReadonlyArray<{ merchandiseId: string; quantity: number }> = [],
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: Cart; userErrors: ReadonlyArray<{ message: string }> };
  }>({
    query: CREATE_CART,
    variables: { input: { lines } },
    cache: "no-store",
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
  }

  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: Cart | null }>({
    query: GET_CART,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart;
}

export async function addToCart(
  cartId: string,
  lines: ReadonlyArray<{ merchandiseId: string; quantity: number }>,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: Cart; userErrors: ReadonlyArray<{ message: string }> };
  }>({
    query: ADD_TO_CART,
    variables: { cartId, lines },
    cache: "no-store",
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(
      data.cartLinesAdd.userErrors.map((e) => e.message).join(", "),
    );
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: ReadonlyArray<{ id: string; quantity: number }>,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: Cart;
      userErrors: ReadonlyArray<{ message: string }>;
    };
  }>({
    query: UPDATE_CART_LINES,
    variables: { cartId, lines },
    cache: "no-store",
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(
      data.cartLinesUpdate.userErrors.map((e) => e.message).join(", "),
    );
  }

  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: ReadonlyArray<string>,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: Cart;
      userErrors: ReadonlyArray<{ message: string }>;
    };
  }>({
    query: REMOVE_FROM_CART,
    variables: { cartId, lineIds },
    cache: "no-store",
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(
      data.cartLinesRemove.userErrors.map((e) => e.message).join(", "),
    );
  }

  return data.cartLinesRemove.cart;
}
