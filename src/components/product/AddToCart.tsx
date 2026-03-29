"use client";

import { useState, useCallback, useTransition } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { trackAddToCart } from "@/lib/analytics";

interface AddToCartProps {
  readonly variantId: string;
  readonly availableForSale: boolean;
  readonly quantityAvailable: number | null;
  readonly productId?: string;
  readonly productName?: string;
  readonly price?: number;
  readonly currency?: string;
  readonly category?: string;
}

export function AddToCart({
  variantId,
  availableForSale,
  quantityAvailable,
  productId,
  productName,
  price,
  currency,
  category,
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const { addItem } = useCart();

  const maxQty = quantityAvailable ?? 10;

  const handleAddToCart = useCallback(() => {
    startTransition(async () => {
      await addItem(variantId, quantity);
    });
    if (productId && productName && price !== undefined) {
      trackAddToCart({
        id: productId,
        name: productName,
        price,
        currency,
        category,
        quantity,
      });
    }
  }, [addItem, variantId, quantity, productId, productName, price, currency, category]);

  if (!availableForSale) {
    return (
      <button
        type="button"
        disabled
        className="w-full rounded-md bg-cream-dark px-6 py-3 text-base font-medium text-charcoal-muted"
      >
        Sold Out
      </button>
    );
  }

  return (
    <div className="space-y-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <label htmlFor="quantity" className="text-sm font-medium text-charcoal">
          Quantity
        </label>
        <div className="flex items-center rounded-md border border-cream-dark">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="px-3 py-2 text-charcoal-muted transition-colors hover:text-charcoal disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <input
            id="quantity"
            type="number"
            min={1}
            max={maxQty}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1 && val <= maxQty) {
                setQuantity(val);
              }
            }}
            className="w-12 border-x border-cream-dark bg-transparent py-2 text-center text-sm text-charcoal [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
            disabled={quantity >= maxQty}
            className="px-3 py-2 text-charcoal-muted transition-colors hover:text-charcoal disabled:opacity-40"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isPending}
        className="w-full rounded-md bg-gold px-6 py-3 text-base font-semibold text-warm-white transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
