"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createColumnHelper, type RowSelectionState } from "@tanstack/react-table";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { SearchInput } from "@/components/admin/shared/SearchInput";
import { DataTable } from "@/components/admin/shared/DataTable";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import type { AdminCollection } from "@/lib/shopify-admin/types";

const columnHelper = createColumnHelper<AdminCollection>();

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
  columnHelper.accessor("image", {
    header: "",
    cell: (info) => {
      const image = info.getValue();
      return image ? (
        <div className="relative h-10 w-10 overflow-hidden rounded">
          <Image
            src={image.url}
            alt={image.altText ?? "Collection"}
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
    header: "Collection",
    cell: (info) => (
      <span className="font-medium text-charcoal">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("productsCount", {
    header: "Products",
    cell: (info) => `${info.getValue().count} products`,
  }),
  columnHelper.accessor("sortOrder", {
    header: "Sort",
    cell: (info) => {
      const labels: Record<string, string> = {
        BEST_SELLING: "Best selling",
        ALPHA_ASC: "A-Z",
        ALPHA_DESC: "Z-A",
        PRICE_ASC: "Price asc",
        PRICE_DESC: "Price desc",
        CREATED: "Oldest first",
        CREATED_DESC: "Newest first",
        MANUAL: "Manual",
      };
      return labels[info.getValue()] ?? info.getValue();
    },
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated",
    cell: (info) =>
      new Intl.DateTimeFormat("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(info.getValue())),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: (info) => <RowActions collection={info.row.original} />,
    size: 50,
  }),
];

function RowActions({
  collection,
}: {
  readonly collection: AdminCollection;
}) {
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
              href={`/admin/collections/${encodeURIComponent(collection.id)}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal hover:bg-cream"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Link>
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error hover:bg-cream">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function CollectionsPage() {
  const [search, setSearch] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // TODO: Replace with React Query when data layer is wired
  const collections: ReadonlyArray<AdminCollection> = [];
  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Collections"
        description="Organize products into collections"
        actions={
          <Link
            href="/admin/collections/new"
            className="inline-flex items-center gap-2 rounded-md bg-green px-4 py-2 text-sm font-medium text-warm-white transition-colors hover:bg-green-light"
          >
            <Plus className="h-4 w-4" />
            Create collection
          </Link>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="w-full sm:max-w-xs">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search collections..."
          />
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-sm text-charcoal-muted">
              {selectedCount} selected
            </span>
            <button
              onClick={() => setDeleteConfirmOpen(true)}
              className="rounded-md border border-error/20 bg-error/5 px-3 py-1.5 text-xs font-medium text-error hover:bg-error/10"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <DataTable
        columns={columns}
        data={collections}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableRowSelection
        emptyTitle="No collections yet"
        emptyDescription="Create your first collection to organize products."
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete selected collections"
        description={`Are you sure you want to delete ${selectedCount} collection(s)? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={() => {
          setDeleteConfirmOpen(false);
          setRowSelection({});
        }}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
