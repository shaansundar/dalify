"use server";

import { shopifyAdminFetch, flattenAdminConnection } from "../client";
import type { AdminCollection, AdminConnection, PageInfo } from "../types";

/* ------------------------------------------------------------------ */
/*  Collection Queries                                                */
/* ------------------------------------------------------------------ */

const COLLECTION_FIELDS = `
  id
  title
  handle
  descriptionHtml
  sortOrder
  productsCount { count }
  image { url altText }
  updatedAt
`;

export async function getAdminCollections(
  first: number = 20,
  after?: string | null,
  query?: string,
): Promise<{
  readonly collections: ReadonlyArray<AdminCollection>;
  readonly pageInfo: PageInfo;
}> {
  const { data } = await shopifyAdminFetch<{
    collections: AdminConnection<AdminCollection>;
  }>({
    query: `
      query GetCollections($first: Int!, $after: String, $query: String) {
        collections(first: $first, after: $after, query: $query) {
          edges {
            node { ${COLLECTION_FIELDS} }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    `,
    variables: { first, after, query },
  });

  return {
    collections: flattenAdminConnection(data.collections),
    pageInfo: data.collections.pageInfo,
  };
}

export async function getAdminCollection(
  id: string,
): Promise<AdminCollection | null> {
  const { data } = await shopifyAdminFetch<{
    collection: AdminCollection | null;
  }>({
    query: `
      query GetCollection($id: ID!) {
        collection(id: $id) { ${COLLECTION_FIELDS} }
      }
    `,
    variables: { id },
  });

  return data.collection;
}

/* ------------------------------------------------------------------ */
/*  Collection Mutations                                              */
/* ------------------------------------------------------------------ */

interface CollectionInput {
  readonly title: string;
  readonly descriptionHtml?: string;
  readonly sortOrder?: string;
}

export async function createCollection(input: CollectionInput): Promise<AdminCollection> {
  const { data } = await shopifyAdminFetch<{
    collectionCreate: {
      collection: AdminCollection;
      userErrors: ReadonlyArray<{ field: ReadonlyArray<string>; message: string }>;
    };
  }>({
    query: `
      mutation CreateCollection($input: CollectionInput!) {
        collectionCreate(input: $input) {
          collection { ${COLLECTION_FIELDS} }
          userErrors { field message }
        }
      }
    `,
    variables: { input },
  });

  if (data.collectionCreate.userErrors.length > 0) {
    const msg = data.collectionCreate.userErrors
      .map((e) => e.message)
      .join(", ");
    throw new Error(`Collection create failed: ${msg}`);
  }

  return data.collectionCreate.collection;
}

export async function updateCollection(
  id: string,
  input: CollectionInput,
): Promise<AdminCollection> {
  const { data } = await shopifyAdminFetch<{
    collectionUpdate: {
      collection: AdminCollection;
      userErrors: ReadonlyArray<{ field: ReadonlyArray<string>; message: string }>;
    };
  }>({
    query: `
      mutation UpdateCollection($input: CollectionInput!) {
        collectionUpdate(input: $input) {
          collection { ${COLLECTION_FIELDS} }
          userErrors { field message }
        }
      }
    `,
    variables: { input: { ...input, id } },
  });

  if (data.collectionUpdate.userErrors.length > 0) {
    const msg = data.collectionUpdate.userErrors
      .map((e) => e.message)
      .join(", ");
    throw new Error(`Collection update failed: ${msg}`);
  }

  return data.collectionUpdate.collection;
}

export async function deleteCollection(id: string): Promise<void> {
  const { data } = await shopifyAdminFetch<{
    collectionDelete: {
      deletedCollectionId: string | null;
      userErrors: ReadonlyArray<{ field: ReadonlyArray<string>; message: string }>;
    };
  }>({
    query: `
      mutation DeleteCollection($input: CollectionDeleteInput!) {
        collectionDelete(input: $input) {
          deletedCollectionId
          userErrors { field message }
        }
      }
    `,
    variables: { input: { id } },
  });

  if (data.collectionDelete.userErrors.length > 0) {
    const msg = data.collectionDelete.userErrors
      .map((e) => e.message)
      .join(", ");
    throw new Error(`Collection delete failed: ${msg}`);
  }
}

export async function addProductsToCollection(
  collectionId: string,
  productIds: ReadonlyArray<string>,
): Promise<void> {
  await shopifyAdminFetch({
    query: `
      mutation AddProductsToCollection($id: ID!, $productIds: [ID!]!) {
        collectionAddProducts(id: $id, productIds: $productIds) {
          collection { id }
          userErrors { field message }
        }
      }
    `,
    variables: { id: collectionId, productIds },
  });
}

export async function removeProductsFromCollection(
  collectionId: string,
  productIds: ReadonlyArray<string>,
): Promise<void> {
  await shopifyAdminFetch({
    query: `
      mutation RemoveProductsFromCollection($id: ID!, $productIds: [ID!]!) {
        collectionRemoveProducts(id: $id, productIds: $productIds) {
          userErrors { field message }
        }
      }
    `,
    variables: { id: collectionId, productIds },
  });
}
