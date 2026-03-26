"use client";

import { useState, useCallback } from "react";

interface AddToCartProps {
  readonly variantId: string;
  readonly availableForSale: boolean;
  readonly quantityAvailable: number | null;
}

export function AddToCart({
  variantId,
  availableForSale,
  quantityAvailable,
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const maxQty = quantityAvailable ?? 10;

  const handleAddToCart = useCallback(async () => {
    setIsAdding(true);
    try {
      // TODO: Wire to real server action from NIM-24 when ready
      // await addToCart({ variantId, quantity });
      console.log("Add to cart:", { variantId, quantity });

      // Temporary feedback
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsAdding(false);
    }
  }, [variantId, quantity]);

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
        disabled={isAdding}
        className="w-full rounded-md bg-gold px-6 py-3 text-base font-semibold text-warm-white transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
