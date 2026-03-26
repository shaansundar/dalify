"use client";

import { useCallback } from "react";
import { formatPrice } from "@/lib/utils/format-price";

interface VariantOption {
  readonly name: string;
  readonly value: string;
}

interface Variant {
  readonly id: string;
  readonly title: string;
  readonly availableForSale: boolean;
  readonly price: { readonly amount: string; readonly currencyCode: string };
  readonly compareAtPrice: {
    readonly amount: string;
    readonly currencyCode: string;
  } | null;
  readonly selectedOptions: ReadonlyArray<VariantOption>;
}

interface VariantSelectorProps {
  readonly variants: ReadonlyArray<Variant>;
  readonly selectedVariantId: string;
  readonly onVariantChange: (variantId: string) => void;
}

/** Group variants by option name (e.g., "Weight" → ["250g", "500g", "1kg"]) */
function buildOptionGroups(
  variants: ReadonlyArray<Variant>,
): ReadonlyArray<{ name: string; values: ReadonlyArray<string> }> {
  const groupMap = new Map<string, Set<string>>();

  for (const variant of variants) {
    for (const opt of variant.selectedOptions) {
      const existing = groupMap.get(opt.name) ?? new Set();
      existing.add(opt.value);
      groupMap.set(opt.name, existing);
    }
  }

  return Array.from(groupMap.entries()).map(([name, valueSet]) => ({
    name,
    values: Array.from(valueSet),
  }));
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onVariantChange,
}: VariantSelectorProps) {
  const selectedVariant = variants.find((v) => v.id === selectedVariantId);
  const optionGroups = buildOptionGroups(variants);

  // For single-option products, find variant by matching the option value
  const findVariantByOption = useCallback(
    (optionName: string, optionValue: string): Variant | undefined => {
      // Build the target options: take current selection, override one option
      const currentOptions = selectedVariant?.selectedOptions ?? [];
      const targetOptions = currentOptions.map((opt) =>
        opt.name === optionName ? { ...opt, value: optionValue } : opt,
      );

      return variants.find((v) =>
        v.selectedOptions.every((opt) =>
          targetOptions.some(
            (t) => t.name === opt.name && t.value === opt.value,
          ),
        ),
      );
    },
    [variants, selectedVariant],
  );

  // If only one variant (e.g., "Default Title"), skip selector
  if (variants.length <= 1) {
    return null;
  }

  return (
    <div className="space-y-4">
      {optionGroups.map((group) => (
        <div key={group.name}>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            {group.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {group.values.map((value) => {
              const matchedVariant = findVariantByOption(group.name, value);
              const isSelected = selectedVariant?.selectedOptions.some(
                (opt) => opt.name === group.name && opt.value === value,
              );
              const isAvailable = matchedVariant?.availableForSale ?? false;

              return (
                <button
                  key={value}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => {
                    if (matchedVariant) {
                      onVariantChange(matchedVariant.id);
                    }
                  }}
                  className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "border-green bg-green-muted text-green"
                      : isAvailable
                        ? "border-cream-dark text-charcoal hover:border-charcoal-muted"
                        : "border-cream-dark text-charcoal-muted line-through opacity-50"
                  }`}
                  aria-pressed={isSelected}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Price display for selected variant */}
      {selectedVariant && (
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl font-semibold text-charcoal">
            {formatPrice(
              selectedVariant.price.amount,
              selectedVariant.price.currencyCode,
            )}
          </span>
          {selectedVariant.compareAtPrice &&
            parseFloat(selectedVariant.compareAtPrice.amount) >
              parseFloat(selectedVariant.price.amount) && (
              <span className="text-base text-charcoal-muted line-through">
                {formatPrice(
                  selectedVariant.compareAtPrice.amount,
                  selectedVariant.compareAtPrice.currencyCode,
                )}
              </span>
            )}
        </div>
      )}
    </div>
  );
}
