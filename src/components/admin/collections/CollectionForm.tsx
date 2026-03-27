"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const collectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  descriptionHtml: z.string(),
  seoTitle: z.string().max(70, "SEO title should be under 70 characters"),
  seoDescription: z
    .string()
    .max(160, "SEO description should be under 160 characters"),
  sortOrder: z.string(),
});

export type CollectionFormValues = z.infer<typeof collectionSchema>;

interface CollectionFormProps {
  readonly defaultValues?: Partial<CollectionFormValues>;
  readonly onSubmit: (data: CollectionFormValues) => void;
  readonly isSubmitting?: boolean;
  readonly submitLabel?: string;
}

export function CollectionForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save collection",
}: CollectionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      title: "",
      descriptionHtml: "",
      seoTitle: "",
      seoDescription: "",
      sortOrder: "BEST_SELLING",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 lg:col-span-2">
          <section className="space-y-4 rounded-lg border border-cream-dark bg-warm-white p-6">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              Collection details
            </h2>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-charcoal"
              >
                Title
              </label>
              <input
                id="title"
                {...register("title")}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal placeholder:text-charcoal-muted focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Collection title"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-error">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="descriptionHtml"
                className="block text-sm font-medium text-charcoal"
              >
                Description
              </label>
              <textarea
                id="descriptionHtml"
                {...register("descriptionHtml")}
                rows={4}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal placeholder:text-charcoal-muted focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Collection description (HTML supported)"
              />
            </div>
          </section>

          {/* SEO */}
          <section className="space-y-4 rounded-lg border border-cream-dark bg-warm-white p-6">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              SEO
            </h2>

            <div>
              <label
                htmlFor="seoTitle"
                className="block text-sm font-medium text-charcoal"
              >
                Meta title
              </label>
              <input
                id="seoTitle"
                {...register("seoTitle")}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="SEO title (max 70 characters)"
              />
              {errors.seoTitle && (
                <p className="mt-1 text-xs text-error">
                  {errors.seoTitle.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="seoDescription"
                className="block text-sm font-medium text-charcoal"
              >
                Meta description
              </label>
              <textarea
                id="seoDescription"
                {...register("seoDescription")}
                rows={3}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="SEO description (max 160 characters)"
              />
              {errors.seoDescription && (
                <p className="mt-1 text-xs text-error">
                  {errors.seoDescription.message}
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <section className="space-y-4 rounded-lg border border-cream-dark bg-warm-white p-6">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              Sort order
            </h2>
            <select
              {...register("sortOrder")}
              className="w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
            >
              <option value="BEST_SELLING">Best selling</option>
              <option value="ALPHA_ASC">Alphabetically, A-Z</option>
              <option value="ALPHA_DESC">Alphabetically, Z-A</option>
              <option value="PRICE_ASC">Price, low to high</option>
              <option value="PRICE_DESC">Price, high to low</option>
              <option value="CREATED">Date created, oldest first</option>
              <option value="CREATED_DESC">Date created, newest first</option>
              <option value="MANUAL">Manual</option>
            </select>
          </section>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 border-t border-cream-dark pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-green px-6 py-2.5 text-sm font-medium text-warm-white transition-colors hover:bg-green-light disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
