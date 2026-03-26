/* ------------------------------------------------------------------ */
/*  Product Queries                                                   */
/* ------------------------------------------------------------------ */

import { shopifyFetch, flattenConnection } from "../client";
import type { Product, Connection } from "../types";

// --- Fragments ---

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    createdAt
    updatedAt
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    featuredImage {
      url altText width height
    }
    seo { title description }
    images(first: 10) {
      edges {
        node { url altText width height }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText width height }
        }
      }
    }
  }
`;

// --- Queries ---

const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

const GET_PRODUCTS = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
      edges {
        cursor
        node { ...ProductFields }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const GET_PRODUCT_RECOMMENDATIONS = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductFields
    }
  }
`;

// --- Fetchers ---

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const data = await shopifyFetch<{ product: Product | null }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    tags: [`product-${handle}`],
  });
  return data.product;
}

export async function getProducts(options?: {
  first?: number;
  after?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<{
  products: ReadonlyArray<Product>;
  pageInfo: Connection<Product>["pageInfo"];
}> {
  const { first = 20, after, sortKey = "BEST_SELLING", reverse = false } =
    options ?? {};

  const data = await shopifyFetch<{ products: Connection<Product> }>({
    query: GET_PRODUCTS,
    variables: { first, after, sortKey, reverse },
    tags: ["products"],
  });

  return {
    products: flattenConnection(data.products),
    pageInfo: data.products.pageInfo,
  };
}

export async function getProductRecommendations(
  productId: string,
): Promise<ReadonlyArray<Product>> {
  const data = await shopifyFetch<{
    productRecommendations: ReadonlyArray<Product>;
  }>({
    query: GET_PRODUCT_RECOMMENDATIONS,
    variables: { productId },
    tags: ["product-recommendations"],
  });
  return data.productRecommendations;
}
