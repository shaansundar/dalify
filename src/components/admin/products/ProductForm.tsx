"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ProductStatus, AdminProductVariant } from "@/lib/shopify-admin/types";
import { ImageUploader, type ProductImage } from "./ImageUploader";
import { VariantManager } from "./VariantManager";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { useState } from "react";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  descriptionHtml: z.string(),
  vendor: z.string(),
  productType: z.string(),
  tags: z.string(),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]),
  price: z.string().min(1, "Price is required"),
  compareAtPrice: z.string(),
  seoTitle: z.string().max(70, "SEO title should be under 70 characters"),
  seoDescription: z.string().max(160, "SEO description should be under 160 characters"),
  handle: z.string(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  readonly defaultValues?: Partial<ProductFormValues>;
  readonly defaultImages?: ReadonlyArray<ProductImage>;
  readonly defaultVariants?: ReadonlyArray<AdminProductVariant>;
  readonly onSubmit: (
    data: ProductFormValues,
    images: ReadonlyArray<ProductImage>,
    variants: ReadonlyArray<AdminProductVariant>,
  ) => void;
  readonly isSubmitting?: boolean;
  readonly submitLabel?: string;
}

export function ProductForm({
  defaultValues,
  defaultImages = [],
  defaultVariants = [],
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save product",
}: ProductFormProps) {
  const [images, setImages] = useState<ReadonlyArray<ProductImage>>(defaultImages);
  const [variants, setVariants] = useState<ReadonlyArray<AdminProductVariant>>(defaultVariants);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      descriptionHtml: "",
      vendor: "",
      productType: "",
      tags: "",
      status: "DRAFT",
      price: "",
      compareAtPrice: "",
      seoTitle: "",
      seoDescription: "",
      handle: "",
      ...defaultValues,
    },
  });

  const currentStatus = watch("status") as ProductStatus;

  function handleFormSubmit(data: ProductFormValues) {
    onSubmit(data, images, variants);
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content - 2 cols */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic info */}
          <section className="rounded-lg border border-cream-dark bg-warm-white p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              Product details
            </h2>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-charcoal">
                Title
              </label>
              <input
                id="title"
                {...register("title")}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal placeholder:text-charcoal-muted focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Product title"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-error">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="descriptionHtml" className="block text-sm font-medium text-charcoal">
                Description
              </label>
              <textarea
                id="descriptionHtml"
                {...register("descriptionHtml")}
                rows={6}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal placeholder:text-charcoal-muted focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Product description (HTML supported)"
              />
            </div>
          </section>

          {/* Images */}
          <section className="rounded-lg border border-cream-dark bg-warm-white p-6">
            <ImageUploader images={images} onImagesChange={setImages} />
          </section>

          {/* Pricing */}
          <section className="rounded-lg border border-cream-dark bg-warm-white p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              Pricing
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-charcoal">
                  Price (INR)
                </label>
                <input
                  id="price"
                  type="text"
                  inputMode="decimal"
                  {...register("price")}
                  className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-error">{errors.price.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="compareAtPrice" className="block text-sm font-medium text-charcoal">
                  Compare-at price
                </label>
                <input
                  id="compareAtPrice"
                  type="text"
                  inputMode="decimal"
                  {...register("compareAtPrice")}
                  className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                  placeholder="0.00"
                />
              </div>
            </div>
          </section>

          {/* Variants */}
          <section className="rounded-lg border border-cream-dark bg-warm-white p-6">
            <VariantManager variants={variants} onVariantsChange={setVariants} />
          </section>

          {/* SEO */}
          <section className="rounded-lg border border-cream-dark bg-warm-white p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              SEO
            </h2>

            <div>
              <label htmlFor="seoTitle" className="block text-sm font-medium text-charcoal">
                Meta title
              </label>
              <input
                id="seoTitle"
                {...register("seoTitle")}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="SEO title (max 70 characters)"
              />
              {errors.seoTitle && (
                <p className="mt-1 text-xs text-error">{errors.seoTitle.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="seoDescription" className="block text-sm font-medium text-charcoal">
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
                <p className="mt-1 text-xs text-error">{errors.seoDescription.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="handle" className="block text-sm font-medium text-charcoal">
                URL handle
              </label>
              <div className="mt-1 flex items-center rounded-md border border-cream-dark bg-warm-white text-sm">
                <span className="border-r border-cream-dark bg-cream px-3 py-2 text-charcoal-muted">
                  /products/
                </span>
                <input
                  id="handle"
                  {...register("handle")}
                  className="flex-1 bg-transparent px-3 py-2 text-charcoal focus:outline-none"
                  placeholder="product-url-handle"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar - 1 col */}
        <div className="space-y-6">
          {/* Status */}
          <section className="rounded-lg border border-cream-dark bg-warm-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-charcoal">
                Status
              </h2>
              <ProductStatusBadge status={currentStatus} />
            </div>
            <select
              {...register("status")}
              className="w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
            >
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </section>

          {/* Organization */}
          <section className="rounded-lg border border-cream-dark bg-warm-white p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              Organization
            </h2>

            <div>
              <label htmlFor="vendor" className="block text-sm font-medium text-charcoal">
                Vendor
              </label>
              <input
                id="vendor"
                {...register("vendor")}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Vendor name"
              />
            </div>

            <div>
              <label htmlFor="productType" className="block text-sm font-medium text-charcoal">
                Product type
              </label>
              <input
                id="productType"
                {...register("productType")}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="e.g. Spices, Grains"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-charcoal">
                Tags
              </label>
              <input
                id="tags"
                {...register("tags")}
                className="mt-1 w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                placeholder="Comma-separated tags"
              />
            </div>
          </section>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 border-t border-cream-dark pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-green px-6 py-2.5 text-sm font-medium text-warm-white transition-colors hover:bg-green-light disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
