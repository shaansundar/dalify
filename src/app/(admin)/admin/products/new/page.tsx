"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { ProductForm, type ProductFormValues } from "@/components/admin/products/ProductForm";
import type { ProductImage } from "@/components/admin/products/ImageUploader";
import type { AdminProductVariant } from "@/lib/shopify-admin/types";

export default function NewProductPage() {
  const router = useRouter();

  function handleSubmit(
    data: ProductFormValues,
    _images: ReadonlyArray<ProductImage>,
    _variants: ReadonlyArray<AdminProductVariant>,
  ) {
    // TODO: Wire to createProduct server action when NIM-61 is done
    toast.success(`Product "${data.title}" created`);
    router.push("/admin/products");
  }

  return (
    <div className="space-y-6">
      <PageHeader title="New product" />
      <ProductForm onSubmit={handleSubmit} submitLabel="Create product" />
    </div>
  );
}
