"use client";

import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { ProductForm, type ProductFormValues } from "@/components/admin/products/ProductForm";
import type { ProductImage } from "@/components/admin/products/ImageUploader";
import type { AdminProductVariant } from "@/lib/shopify-admin/types";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  // TODO: Fetch product by ID using React Query when NIM-61 is done
  const productId = params.id;

  function handleSubmit(
    data: ProductFormValues,
    _images: ReadonlyArray<ProductImage>,
    _variants: ReadonlyArray<AdminProductVariant>,
  ) {
    // TODO: Wire to updateProduct server action when NIM-61 is done
    toast.success(`Product "${data.title}" updated`);
    router.push("/admin/products");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit product"
        description={`Product ID: ${productId}`}
      />
      <ProductForm
        onSubmit={handleSubmit}
        submitLabel="Update product"
      />
    </div>
  );
}
