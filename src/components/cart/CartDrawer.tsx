"use client";

import { useCallback, useTransition } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { flattenConnection } from "@/lib/shopify";
import { formatPrice } from "@/lib/utils/format-price";
import { trackBeginCheckout } from "@/lib/analytics";

export function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, updateItem, removeItem } =
    useCart();
  const [isPending, startTransition] = useTransition();

  const lines = cart ? flattenConnection(cart.lines) : [];

  const handleQuantityChange = useCallback(
    (lineId: string, quantity: number) => {
      startTransition(async () => {
        if (quantity <= 0) {
          await removeItem(lineId);
        } else {
          await updateItem(lineId, quantity);
        }
      });
    },
    [updateItem, removeItem],
  );

  const handleRemove = useCallback(
    (lineId: string) => {
      startTransition(async () => {
        await removeItem(lineId);
      });
    },
    [removeItem],
  );

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40"
        onClick={closeDrawer}
        role="button"
        tabIndex={0}
        aria-label="Close cart"
        onKeyDown={(e) => e.key === "Escape" && closeDrawer()}
      />

      {/* Drawer */}
      <aside
        className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col bg-warm-white shadow-xl"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-dark px-6 py-4">
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Cart
            {cart && cart.totalQuantity > 0 && (
              <span className="ml-2 text-base font-normal text-charcoal-muted">
                ({cart.totalQuantity})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="text-2xl leading-none text-charcoal-muted transition-colors hover:text-charcoal"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {/* Cart lines */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-heading text-lg text-charcoal-muted">
                Your cart is empty
              </p>
              <p className="mt-2 text-sm text-charcoal-muted">
                Browse our collections to find something you love.
              </p>
              <Link
                href="/"
                onClick={closeDrawer}
                className="mt-6 rounded-md bg-green px-6 py-2.5 text-sm font-medium text-warm-white transition-colors hover:bg-green-light"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-cream-dark">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-4">
                  {/* Product image */}
                  <Link
                    href={`/products/${line.merchandise.product.handle}`}
                    onClick={closeDrawer}
                    className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-cream-dark"
                  >
                    {line.merchandise.product.featuredImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={line.merchandise.product.featuredImage.url}
                        alt={
                          line.merchandise.product.featuredImage.altText ??
                          line.merchandise.product.title
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-charcoal-muted">
                        ?
                      </div>
                    )}
                  </Link>

                  {/* Product info */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${line.merchandise.product.handle}`}
                      onClick={closeDrawer}
                      className="text-sm font-medium text-charcoal hover:text-green"
                    >
                      {line.merchandise.product.title}
                    </Link>
                    {line.merchandise.title !== "Default Title" && (
                      <p className="mt-0.5 text-xs text-charcoal-muted">
                        {line.merchandise.title}
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center rounded border border-cream-dark">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(line.id, line.quantity - 1)
                          }
                          disabled={isPending}
                          className="px-2 py-1 text-xs text-charcoal-muted hover:text-charcoal disabled:opacity-40"
                          aria-label="Decrease"
                        >
                          &minus;
                        </button>
                        <span className="w-8 text-center text-xs text-charcoal">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(line.id, line.quantity + 1)
                          }
                          disabled={isPending}
                          className="px-2 py-1 text-xs text-charcoal-muted hover:text-charcoal disabled:opacity-40"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-semibold text-charcoal">
                        {formatPrice(
                          line.cost.totalAmount.amount,
                          line.cost.totalAmount.currencyCode,
                        )}
                      </span>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => handleRemove(line.id)}
                      disabled={isPending}
                      className="mt-1 text-xs text-charcoal-muted underline transition-colors hover:text-error disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — subtotal + checkout */}
        {lines.length > 0 && cart && (
          <div className="border-t border-cream-dark px-6 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-charcoal-muted">Subtotal</span>
              <span className="text-lg font-semibold text-charcoal">
                {formatPrice(
                  cart.cost.subtotalAmount.amount,
                  cart.cost.subtotalAmount.currencyCode,
                )}
              </span>
            </div>
            <p className="mb-4 text-xs text-charcoal-muted">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href={cart.checkoutUrl}
              onClick={() =>
                trackBeginCheckout(
                  parseFloat(cart.cost.subtotalAmount.amount),
                  cart.cost.subtotalAmount.currencyCode,
                )
              }
              className="block w-full rounded-md bg-gold px-6 py-3 text-center text-base font-semibold text-warm-white transition-colors hover:bg-gold-light"
            >
              Checkout
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
