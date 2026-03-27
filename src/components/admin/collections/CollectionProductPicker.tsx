"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import Image from "next/image";
import { SearchInput } from "@/components/admin/shared/SearchInput";

export interface PickerProduct {
  readonly id: string;
  readonly title: string;
  readonly imageUrl?: string;
  readonly status: string;
}

interface CollectionProductPickerProps {
  readonly products: ReadonlyArray<PickerProduct>;
  readonly onProductsChange: (products: ReadonlyArray<PickerProduct>) => void;
}

export function CollectionProductPicker({
  products,
  onProductsChange,
}: CollectionProductPickerProps) {
  const [search, setSearch] = useState("");

  function handleRemove(id: string) {
    onProductsChange(products.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-4 rounded-lg border border-cream-dark bg-warm-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-charcoal">
          Products
        </h2>
        <button className="inline-flex items-center gap-1 rounded-md bg-green px-3 py-1.5 text-xs font-medium text-warm-white transition-colors hover:bg-green-light">
          <Plus className="h-3.5 w-3.5" />
          Add products
        </button>
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search products in collection..."
      />

      {products.length === 0 ? (
        <p className="rounded-md border border-dashed border-cream-dark px-4 py-8 text-center text-sm text-charcoal-muted">
          No products in this collection. Add products to get started.
        </p>
      ) : (
        <div className="space-y-1">
          {products
            .filter(
              (p) =>
                !search ||
                p.title.toLowerCase().includes(search.toLowerCase()),
            )
            .map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-md border border-cream-dark p-2 hover:bg-cream/50"
              >
                <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-charcoal-muted" />
                {product.imageUrl ? (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-cream text-xs text-charcoal-muted">
                    No img
                  </div>
                )}
                <span className="flex-1 text-sm font-medium text-charcoal">
                  {product.title}
                </span>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="rounded p-1 text-charcoal-muted hover:bg-cream-dark hover:text-error"
                  aria-label={`Remove ${product.title}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
