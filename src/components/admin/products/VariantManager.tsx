"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { AdminProductVariant } from "@/lib/shopify-admin/types";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";

interface VariantManagerProps {
  readonly variants: ReadonlyArray<AdminProductVariant>;
  readonly onVariantsChange: (
    variants: ReadonlyArray<AdminProductVariant>,
  ) => void;
  readonly currency?: string;
}

export function VariantManager({
  variants,
  onVariantsChange,
  currency = "INR",
}: VariantManagerProps) {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  function handleDelete(id: string) {
    onVariantsChange(variants.filter((v) => v.id !== id));
    setDeleteTargetId(null);
  }

  function formatPrice(amount: string): string {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
    }).format(Number(amount));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-charcoal">Variants</label>
        <button className="inline-flex items-center gap-1 rounded-md bg-green px-3 py-1.5 text-xs font-medium text-warm-white transition-colors hover:bg-green-light">
          <Plus className="h-3.5 w-3.5" />
          Add variant
        </button>
      </div>

      {variants.length === 0 ? (
        <p className="rounded-md border border-dashed border-cream-dark px-4 py-6 text-center text-sm text-charcoal-muted">
          No variants yet. Add a variant to offer different options.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-cream-dark">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-dark bg-cream">
                <th className="px-4 py-2 text-left font-medium text-charcoal-muted">
                  Variant
                </th>
                <th className="px-4 py-2 text-left font-medium text-charcoal-muted">
                  SKU
                </th>
                <th className="px-4 py-2 text-right font-medium text-charcoal-muted">
                  Price
                </th>
                <th className="px-4 py-2 text-right font-medium text-charcoal-muted">
                  Inventory
                </th>
                <th className="px-4 py-2 text-right font-medium text-charcoal-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr
                  key={variant.id}
                  className="border-b border-cream-dark last:border-0"
                >
                  <td className="px-4 py-2 font-medium text-charcoal">
                    {variant.title}
                  </td>
                  <td className="px-4 py-2 text-charcoal-muted">
                    {variant.sku ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-right text-charcoal">
                    {formatPrice(variant.price)}
                  </td>
                  <td className="px-4 py-2 text-right text-charcoal">
                    {variant.inventoryQuantity}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="rounded p-1 text-charcoal-muted hover:bg-cream hover:text-charcoal"
                        aria-label="Edit variant"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(variant.id)}
                        className="rounded p-1 text-charcoal-muted hover:bg-cream hover:text-error"
                        aria-label="Delete variant"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Delete variant"
        description="Are you sure you want to delete this variant? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={() => deleteTargetId && handleDelete(deleteTargetId)}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
