"use client";

import { useState, useMemo } from "react";
import type { ShopifyImage, ProductVariant } from "@/lib/shopify/types";
import { ImageGallery } from "./ImageGallery";
import { VariantSelector } from "./VariantSelector";
import { AddToCart } from "./AddToCart";
import { Badge } from "@/components/ui/Badge";

interface ProductDetailsProps {
  readonly title: string;
  readonly vendor: string;
  readonly images: ReadonlyArray<ShopifyImage>;
  readonly variants: ReadonlyArray<ProductVariant>;
  readonly availableForSale: boolean;
}

export function ProductDetails({
  title,
  vendor,
  images,
  variants,
  availableForSale,
}: ProductDetailsProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id ?? "",
  );

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedVariantId) ?? variants[0],
    [variants, selectedVariantId],
  );

  // If selected variant has a specific image, show it first
  const orderedImages = useMemo(() => {
    if (!selectedVariant?.image) return images;
    const variantImageUrl = selectedVariant.image.url;
    const idx = images.findIndex((img) => img.url === variantImageUrl);
    if (idx <= 0) return images;
    return [images[idx], ...images.slice(0, idx), ...images.slice(idx + 1)];
  }, [images, selectedVariant]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      {/* Left: Image gallery */}
      <ImageGallery images={orderedImages} productTitle={title} />

      {/* Right: Product info */}
      <div className="space-y-6">
        {vendor && (
          <p className="text-sm font-medium uppercase tracking-wide text-charcoal-muted">
            {vendor}
          </p>
        )}

        <h1 className="font-heading text-3xl font-semibold text-charcoal sm:text-4xl">
          {title}
        </h1>

        {!availableForSale && (
          <Badge className="bg-charcoal text-warm-white">Sold Out</Badge>
        )}

        {/* Variant selector with price */}
        <VariantSelector
          variants={variants}
          selectedVariantId={selectedVariantId}
          onVariantChange={setSelectedVariantId}
        />

        {/* Price for single-variant products */}
        {variants.length <= 1 && selectedVariant && (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-charcoal">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: selectedVariant.price.currencyCode,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(parseFloat(selectedVariant.price.amount))}
            </span>
          </div>
        )}

        {/* Add to cart */}
        <AddToCart
          variantId={selectedVariantId}
          availableForSale={
            selectedVariant?.availableForSale ?? availableForSale
          }
          quantityAvailable={selectedVariant?.quantityAvailable ?? null}
        />
      </div>
    </div>
  );
}
