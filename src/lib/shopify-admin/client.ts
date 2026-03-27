/* ------------------------------------------------------------------ */
/*  Shopify Admin API Client                                          */
/*  Typed, server-side GraphQL client for admin operations.           */
/* ------------------------------------------------------------------ */

const SHOPIFY_ADMIN_ENDPOINT = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/${process.env.SHOPIFY_ADMIN_API_VERSION ?? "2025-01"}/graphql.json`
  : "";

const SHOPIFY_ADMIN_TOKEN =
  process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN ?? "";

interface AdminFetchOptions {
  /** GraphQL query or mutation string */
  readonly query: string;
  /** Variables for the query */
  readonly variables?: Record<string, unknown>;
}

interface ShopifyResponse<T> {
  readonly data: T;
  readonly errors?: ReadonlyArray<{ readonly message: string }>;
  readonly extensions?: {
    readonly cost?: {
      readonly requestedQueryCost: number;
      readonly actualQueryCost: number;
      readonly throttleStatus: {
        readonly maximumAvailable: number;
        readonly currentlyAvailable: number;
        readonly restoreRate: number;
      };
    };
  };
}

export interface RateLimitInfo {
  readonly requestedCost: number;
  readonly actualCost: number;
  readonly available: number;
  readonly maximum: number;
  readonly restoreRate: number;
}

/**
 * Execute a GraphQL query/mutation against the Shopify Admin API.
 *
 * - Uses `X-Shopify-Access-Token` header (NOT storefront token)
 * - Default cache: `no-store` (admin data is mutable)
 * - Returns rate limit info alongside data for caller awareness
 */
export async function shopifyAdminFetch<T>(
  options: AdminFetchOptions,
): Promise<{ readonly data: T; readonly rateLimit?: RateLimitInfo }> {
  if (!SHOPIFY_ADMIN_ENDPOINT || !SHOPIFY_ADMIN_TOKEN) {
    throw new Error(
      "Missing Shopify Admin API credentials. " +
        "Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, " +
        "SHOPIFY_ADMIN_API_ACCESS_TOKEN, and " +
        "SHOPIFY_ADMIN_API_VERSION environment variables.",
    );
  }

  const response = await fetch(SHOPIFY_ADMIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
    },
    body: JSON.stringify({
      query: options.query,
      variables: options.variables ?? {},
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Shopify Admin API error: ${response.status} ${response.statusText}`,
    );
  }

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    const messages = json.errors.map((e) => e.message).join(", ");
    throw new Error(`Shopify Admin GraphQL errors: ${messages}`);
  }

  const rateLimit = json.extensions?.cost
    ? {
        requestedCost: json.extensions.cost.requestedQueryCost,
        actualCost: json.extensions.cost.actualQueryCost,
        available: json.extensions.cost.throttleStatus.currentlyAvailable,
        maximum: json.extensions.cost.throttleStatus.maximumAvailable,
        restoreRate: json.extensions.cost.throttleStatus.restoreRate,
      }
    : undefined;

  return { data: json.data, rateLimit };
}

/**
 * Helper to flatten Shopify Relay-style connection edges into a plain array.
 */
export function flattenAdminConnection<T>(
  connection:
    | { readonly edges: ReadonlyArray<{ readonly node: T }> }
    | undefined,
): ReadonlyArray<T> {
  if (!connection) return [];
  return connection.edges.map((edge) => edge.node);
}
