"use client";

import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import {
  CollectionForm,
  type CollectionFormValues,
} from "@/components/admin/collections/CollectionForm";
import { CollectionProductPicker } from "@/components/admin/collections/CollectionProductPicker";
import type { PickerProduct } from "@/components/admin/collections/CollectionProductPicker";
import { useState } from "react";

export default function EditCollectionPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const collectionId = params.id;

  // TODO: Fetch collection by ID via React Query when data layer is wired
  const [products, setProducts] = useState<ReadonlyArray<PickerProduct>>([]);

  function handleSubmit(data: CollectionFormValues) {
    // TODO: Wire to updateExistingCollection server action
    toast.success(`Collection "${data.title}" updated`);
    router.push("/admin/collections");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit collection"
        description={`Collection ID: ${collectionId}`}
      />
      <CollectionForm onSubmit={handleSubmit} submitLabel="Update collection" />
      <CollectionProductPicker
        products={products}
        onProductsChange={setProducts}
      />
    </div>
  );
}
