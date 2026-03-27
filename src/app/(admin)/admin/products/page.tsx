"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createColumnHelper, type RowSelectionState } from "@tanstack/react-table";
import { Plus, MoreHorizontal, Pencil, Copy, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { SearchInput } from "@/components/admin/shared/SearchInput";
import { DataTable } from "@/components/admin/shared/DataTable";
import { ProductStatusBadge } from "@/components/admin/products/ProductStatusBadge";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import type { AdminProduct, ProductStatus } from "@/lib/shopify-admin/types";

// Column definitions
const columnHelper = createColumnHelper<AdminProduct>();

const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        className="rounded border-cream-dark"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="rounded border-cream-dark"
        aria-label="Select row"
      />
    ),
    size: 40,
  }),
  columnHelper.accessor("featuredImage", {
    header: "",
    cell: (info) => {
      const image = info.getValue();
      return image ? (
        <div className="relative h-10 w-10 overflow-hidden rounded">
          <Image
            src={image.url}
            alt={image.altText ?? "Product"}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded bg-cream text-xs text-charcoal-muted">
          No img
        </div>
      );
    },
    size: 56,
  }),
  columnHelper.accessor("title", {
    header: "Product",
    cell: (info) => (
      <span className="font-medium text-charcoal">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <ProductStatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor("vendor", {
    header: "Vendor",
  }),
  columnHelper.accessor("productType", {
    header: "Type",
  }),
  columnHelper.accessor("totalInventory", {
    header: "Inventory",
    cell: (info) => {
      const qty = info.getValue();
      return (
        <span className={qty <= 0 ? "text-error font-medium" : ""}>
          {qty} in stock
        </span>
      );
    },
  }),
  columnHelper.accessor("priceRangeV2", {
    header: "Price",
    cell: (info) => {
      const range = info.getValue();
      const min = Number(range.minVariantPrice.amount);
      const max = Number(range.maxVariantPrice.amount);
      const formatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: range.minVariantPrice.currencyCode,
      });
      return min === max
        ? formatter.format(min)
        : `${formatter.format(min)} – ${formatter.format(max)}`;
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: (info) => <RowActions product={info.row.original} />,
    size: 50,
  }),
];

function RowActions({ product }: { readonly product: AdminProduct }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded p-1 text-charcoal-muted hover:bg-cream hover:text-charcoal"
        aria-label="Row actions"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-40 rounded-md border border-cream-dark bg-warm-white py-1 shadow-lg">
            <Link
              href={`/admin/products/${encodeURIComponent(product.id)}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal hover:bg-cream"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Link>
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-charcoal hover:bg-cream">
              <Copy className="h-3.5 w-3.5" /> Duplicate
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error hover:bg-cream">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Filters
type StatusFilter = ProductStatus | "ALL";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // TODO: Replace with React Query + server actions when NIM-61 is done
  const products: ReadonlyArray<AdminProduct> = [];
  const hasNextPage = false;
  const hasPreviousPage = false;

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your product catalog"
        actions={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-md bg-green px-4 py-2 text-sm font-medium text-warm-white transition-colors hover:bg-green-light"
          >
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        }
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="w-full sm:max-w-xs">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search products..."
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
        >
          <option value="ALL">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        {/* Bulk actions */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-sm text-charcoal-muted">
              {selectedCount} selected
            </span>
            <button className="rounded-md border border-cream-dark px-3 py-1.5 text-xs font-medium text-charcoal hover:bg-cream">
              Publish
            </button>
            <button className="rounded-md border border-cream-dark px-3 py-1.5 text-xs font-medium text-charcoal hover:bg-cream">
              Unpublish
            </button>
            <button
              onClick={() => setDeleteConfirmOpen(true)}
              className="rounded-md border border-error/20 bg-error/5 px-3 py-1.5 text-xs font-medium text-error hover:bg-error/10"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={products}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableRowSelection
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        emptyTitle="No products yet"
        emptyDescription="Get started by adding your first product."
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete selected products"
        description={`Are you sure you want to delete ${selectedCount} product(s)? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={() => {
          // TODO: Wire to server action when NIM-61 is done
          setDeleteConfirmOpen(false);
          setRowSelection({});
        }}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
