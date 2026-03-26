/* ------------------------------------------------------------------ */
/*  Search Queries                                                    */
/* ------------------------------------------------------------------ */

import { shopifyFetch, flattenConnection } from "../client";
import type { Product, Connection } from "../types";

const PREDICTIVE_SEARCH = /* GraphQL */ `
  query PredictiveSearch($query: String!, $first: Int!) {
    search(query: $query, first: $first, types: [PRODUCT]) {
      edges {
        node {
          ... on Product {
            id
            handle
            title
            productType
            tags
            availableForSale
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            featuredImage { url altText width height }
            variants(first: 3) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export async function searchProducts(
  query: string,
  first: number = 12,
): Promise<{
  products: ReadonlyArray<Product>;
  pageInfo: Connection<Product>["pageInfo"];
}> {
  const data = await shopifyFetch<{ search: Connection<Product> }>({
    query: PREDICTIVE_SEARCH,
    variables: { query, first },
    cache: "no-store",
  });

  return {
    products: flattenConnection(data.search),
    pageInfo: data.search.pageInfo,
  };
}
