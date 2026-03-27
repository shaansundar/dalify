"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  readonly open: boolean;
  readonly title: string;
  readonly description: string;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly variant?: "danger" | "default";
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      className="rounded-lg border border-cream-dark bg-warm-white p-0 shadow-lg backdrop:bg-charcoal/40"
    >
      <div className="w-full max-w-md p-6">
        <div className="flex items-start gap-3">
          {variant === "danger" && (
            <div className="rounded-full bg-error/10 p-2">
              <AlertTriangle className="h-5 w-5 text-error" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              {title}
            </h2>
            <p className="mt-2 text-sm text-charcoal-muted">{description}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-md border border-cream-dark px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-cream"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-md px-4 py-2 text-sm font-medium text-warm-white transition-colors ${
              variant === "danger"
                ? "bg-error hover:bg-error/90"
                : "bg-green hover:bg-green-light"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
