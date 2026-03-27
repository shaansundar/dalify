"use server";

import {
  getAdminCollections,
  getAdminCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  addProductsToCollection,
  removeProductsFromCollection,
} from "@/lib/shopify-admin/queries/collections";
import type { AdminCollection, PageInfo } from "@/lib/shopify-admin/types";

/* ------------------------------------------------------------------ */
/*  Collection Server Actions                                         */
/*  Auth guard + audit logging stubs — will be wired with NIM-57.     */
/* ------------------------------------------------------------------ */

export async function listCollections(
  page: number = 1,
  query?: string,
): Promise<{
  readonly collections: ReadonlyArray<AdminCollection>;
  readonly pageInfo: PageInfo;
}> {
  // TODO: auth check (requireAdmin) when NIM-57 is done
  return getAdminCollections(20, undefined, query);
}

export async function getCollectionById(
  id: string,
): Promise<AdminCollection | null> {
  // TODO: auth check
  return getAdminCollection(id);
}

export async function createNewCollection(data: {
  readonly title: string;
  readonly descriptionHtml?: string;
}): Promise<AdminCollection> {
  // TODO: auth check + audit log
  return createCollection(data);
}

export async function updateExistingCollection(
  id: string,
  data: {
    readonly title: string;
    readonly descriptionHtml?: string;
  },
): Promise<AdminCollection> {
  // TODO: auth check + audit log
  return updateCollection(id, data);
}

export async function deleteExistingCollection(id: string): Promise<void> {
  // TODO: auth check + audit log
  return deleteCollection(id);
}

export async function addProductsToExistingCollection(
  collectionId: string,
  productIds: ReadonlyArray<string>,
): Promise<void> {
  // TODO: auth check + audit log
  return addProductsToCollection(collectionId, productIds);
}

export async function removeProductsFromExistingCollection(
  collectionId: string,
  productIds: ReadonlyArray<string>,
): Promise<void> {
  // TODO: auth check + audit log
  return removeProductsFromCollection(collectionId, productIds);
}
