/* ------------------------------------------------------------------ */
/*  Shopify Storefront API — Core Types                               */
/*  Based on the 2025-01 Storefront API schema.                       */
/* ------------------------------------------------------------------ */

// --- Scalars & Enums ---

export type CurrencyCode = "INR" | "USD" | "EUR";

export type SortKey =
  | "TITLE"
  | "PRICE"
  | "BEST_SELLING"
  | "CREATED"
  | "MANUAL"
  | "RELEVANCE";

// --- Money ---

export interface MoneyV2 {
  readonly amount: string;
  readonly currencyCode: CurrencyCode;
}

export interface PriceRange {
  readonly minVariantPrice: MoneyV2;
  readonly maxVariantPrice: MoneyV2;
}

// --- Images ---

export interface ShopifyImage {
  readonly url: string;
  readonly altText: string | null;
  readonly width: number;
  readonly height: number;
}

// --- Connection (Relay-style pagination) ---

export interface PageInfo {
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly startCursor: string | null;
  readonly endCursor: string | null;
}

export interface Connection<T> {
  readonly edges: ReadonlyArray<{ readonly node: T; readonly cursor: string }>;
  readonly pageInfo: PageInfo;
}

// --- Product ---

export interface ProductVariant {
  readonly id: string;
  readonly title: string;
  readonly availableForSale: boolean;
  readonly quantityAvailable: number | null;
  readonly price: MoneyV2;
  readonly compareAtPrice: MoneyV2 | null;
  readonly selectedOptions: ReadonlyArray<{
    readonly name: string;
    readonly value: string;
  }>;
  readonly image: ShopifyImage | null;
}

export interface Product {
  readonly id: string;
  readonly handle: string;
  readonly title: string;
  readonly description: string;
  readonly descriptionHtml: string;
  readonly vendor: string;
  readonly productType: string;
  readonly tags: ReadonlyArray<string>;
  readonly availableForSale: boolean;
  readonly priceRange: PriceRange;
  readonly compareAtPriceRange: PriceRange;
  readonly featuredImage: ShopifyImage | null;
  readonly images: Connection<ShopifyImage>;
  readonly variants: Connection<ProductVariant>;
  readonly seo: SEO;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// --- Collection ---

export interface Collection {
  readonly id: string;
  readonly handle: string;
  readonly title: string;
  readonly description: string;
  readonly descriptionHtml: string;
  readonly image: ShopifyImage | null;
  readonly products: Connection<Product>;
  readonly seo: SEO;
  readonly updatedAt: string;
}

// --- Cart ---

export interface CartLine {
  readonly id: string;
  readonly quantity: number;
  readonly merchandise: ProductVariant & {
    readonly product: Pick<Product, "handle" | "title" | "featuredImage">;
  };
  readonly cost: {
    readonly totalAmount: MoneyV2;
    readonly amountPerQuantity: MoneyV2;
  };
}

export interface Cart {
  readonly id: string;
  readonly checkoutUrl: string;
  readonly totalQuantity: number;
  readonly cost: {
    readonly subtotalAmount: MoneyV2;
    readonly totalAmount: MoneyV2;
    readonly totalTaxAmount: MoneyV2 | null;
  };
  readonly lines: Connection<CartLine>;
}

// --- SEO ---

export interface SEO {
  readonly title: string | null;
  readonly description: string | null;
}

// --- Menu / Navigation ---

export interface MenuItem {
  readonly title: string;
  readonly url: string;
  readonly items: ReadonlyArray<MenuItem>;
}

export interface Menu {
  readonly items: ReadonlyArray<MenuItem>;
}

// --- Shop ---

export interface Shop {
  readonly name: string;
  readonly description: string | null;
  readonly primaryDomain: {
    readonly url: string;
  };
}
