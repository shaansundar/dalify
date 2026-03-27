"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EmptyState } from "./EmptyState";

interface DataTableProps<TData> {
  readonly columns: ReadonlyArray<ColumnDef<TData, unknown>>;
  readonly data: ReadonlyArray<TData>;
  readonly rowSelection?: RowSelectionState;
  readonly onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  readonly enableRowSelection?: boolean;
  /** Cursor-based pagination */
  readonly hasNextPage?: boolean;
  readonly hasPreviousPage?: boolean;
  readonly onNextPage?: () => void;
  readonly onPreviousPage?: () => void;
  readonly emptyTitle?: string;
  readonly emptyDescription?: string;
}

export function DataTable<TData>({
  columns,
  data,
  rowSelection = {},
  onRowSelectionChange,
  enableRowSelection = false,
  hasNextPage = false,
  hasPreviousPage = false,
  onNextPage,
  onPreviousPage,
  emptyTitle = "No results",
  emptyDescription = "No items match your current filters.",
}: DataTableProps<TData>) {
  const table = useReactTable({
    data: data as TData[],
    columns: columns as ColumnDef<TData, unknown>[],
    getCoreRowModel: getCoreRowModel(),
    state: { rowSelection },
    onRowSelectionChange,
    enableRowSelection,
  });

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-cream-dark">
        <table className="w-full text-sm" role="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-cream-dark bg-cream"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-medium text-charcoal-muted"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-cream-dark last:border-0 hover:bg-cream/50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-charcoal">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {(hasPreviousPage || hasNextPage) && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-charcoal-muted">
            {enableRowSelection &&
              Object.keys(rowSelection).length > 0 &&
              `${Object.keys(rowSelection).length} selected`}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onPreviousPage}
              disabled={!hasPreviousPage}
              className="inline-flex items-center gap-1 rounded-md border border-cream-dark px-3 py-1.5 text-sm font-medium text-charcoal transition-colors hover:bg-cream disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={onNextPage}
              disabled={!hasNextPage}
              className="inline-flex items-center gap-1 rounded-md border border-cream-dark px-3 py-1.5 text-sm font-medium text-charcoal transition-colors hover:bg-cream disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
