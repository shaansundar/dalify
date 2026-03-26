/* ------------------------------------------------------------------ */
/*  Shopify Storefront API Client                                     */
/*  Typed, cacheable, server-side GraphQL client.                     */
/* ------------------------------------------------------------------ */

const SHOPIFY_STOREFRONT_ENDPOINT = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`
  : "";

const SHOPIFY_STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";

interface ShopifyFetchOptions {
  /** GraphQL query string */
  readonly query: string;
  /** Variables for the query */
  readonly variables?: Record<string, unknown>;
  /**
   * Next.js fetch cache behavior.
   * - "force-cache" (default): cache indefinitely until revalidated
   * - "no-store": bypass cache entirely
   */
  readonly cache?: RequestCache;
  /** Revalidate time in seconds (ISR). Defaults to 3600 (1 hour). */
  readonly revalidate?: number | false;
  /** Custom fetch tags for on-demand revalidation. */
  readonly tags?: ReadonlyArray<string>;
}

interface ShopifyResponse<T> {
  readonly data: T;
  readonly errors?: ReadonlyArray<{ readonly message: string }>;
}

/**
 * Execute a GraphQL query against the Shopify Storefront API.
 *
 * Uses Next.js extended `fetch` for automatic caching and ISR.
 * Runs server-side only — never ships the access token to the client.
 */
export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = "force-cache",
  revalidate = 3600,
  tags = [],
}: ShopifyFetchOptions): Promise<T> {
  if (!SHOPIFY_STOREFRONT_ENDPOINT || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error(
      "Missing Shopify Storefront API credentials. " +
        "Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and " +
        "NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variables.",
    );
  }

  const nextOptions: Record<string, unknown> = {};
  if (tags.length > 0) {
    nextOptions.tags = tags;
  }
  if (revalidate !== false) {
    nextOptions.revalidate = revalidate;
  }

  const response = await fetch(SHOPIFY_STOREFRONT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: nextOptions,
  });

  if (!response.ok) {
    throw new Error(
      `Shopify Storefront API error: ${response.status} ${response.statusText}`,
    );
  }

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    const messages = json.errors.map((e) => e.message).join(", ");
    throw new Error(`Shopify GraphQL errors: ${messages}`);
  }

  return json.data;
}

/**
 * Helper to flatten Shopify Relay-style connection edges into a plain array.
 */
export function flattenConnection<T>(
  connection: { readonly edges: ReadonlyArray<{ readonly node: T }> } | undefined,
): ReadonlyArray<T> {
  if (!connection) return [];
  return connection.edges.map((edge) => edge.node);
}
