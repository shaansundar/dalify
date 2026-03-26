/* ------------------------------------------------------------------ */
/*  Collection Queries                                                */
/* ------------------------------------------------------------------ */

import { shopifyFetch, flattenConnection } from "../client";
import type { Collection, Product, Connection } from "../types";

// --- Queries ---

const GET_COLLECTION_BY_HANDLE = /* GraphQL */ `
  query GetCollectionByHandle(
    $handle: String!
    $first: Int!
    $after: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      image { url altText width height }
      seo { title description }
      updatedAt
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
        edges {
          cursor
          node {
            id
            handle
            title
            vendor
            productType
            tags
            availableForSale
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            compareAtPriceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            featuredImage { url altText width height }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  selectedOptions { name value }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

const GET_COLLECTIONS = /* GraphQL */ `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image { url altText width height }
          updatedAt
        }
      }
    }
  }
`;

// --- Fetchers ---

export async function getCollectionByHandle(
  handle: string,
  options?: {
    first?: number;
    after?: string;
    sortKey?: string;
    reverse?: boolean;
    filters?: ReadonlyArray<Record<string, unknown>>;
  },
): Promise<{
  collection: Collection | null;
  products: ReadonlyArray<Product>;
  pageInfo: Connection<Product>["pageInfo"];
}> {
  const {
    first = 16,
    after,
    sortKey = "BEST_SELLING",
    reverse = false,
    filters,
  } = options ?? {};

  const data = await shopifyFetch<{ collection: Collection | null }>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle, first, after, sortKey, reverse, filters },
    tags: [`collection-${handle}`],
  });

  if (!data.collection) {
    return { collection: null, products: [], pageInfo: emptyPageInfo() };
  }

  return {
    collection: data.collection,
    products: flattenConnection(data.collection.products),
    pageInfo: data.collection.products.pageInfo,
  };
}

export async function getCollections(
  first: number = 20,
): Promise<ReadonlyArray<Omit<Collection, "products" | "seo">>> {
  const data = await shopifyFetch<{
    collections: Connection<Omit<Collection, "products" | "seo">>;
  }>({
    query: GET_COLLECTIONS,
    variables: { first },
    tags: ["collections"],
  });
  return flattenConnection(data.collections);
}

function emptyPageInfo(): Connection<Product>["pageInfo"] {
  return {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  };
}
