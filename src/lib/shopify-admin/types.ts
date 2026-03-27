/* ------------------------------------------------------------------ */
/*  Shopify Admin API Type Definitions                                */
/* ------------------------------------------------------------------ */

/** Shopify Money type with currency */
export interface MoneyV2 {
  readonly amount: string;
  readonly currencyCode: string;
}

/** Basic shop info from Admin API */
export interface AdminShop {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly myshopifyDomain: string;
  readonly plan: {
    readonly displayName: string;
  };
  readonly currencyCode: string;
}

/** Admin product status */
export type ProductStatus = "ACTIVE" | "ARCHIVED" | "DRAFT";

/** Admin product from the Admin API */
export interface AdminProduct {
  readonly id: string;
  readonly title: string;
  readonly handle: string;
  readonly descriptionHtml: string;
  readonly status: ProductStatus;
  readonly vendor: string;
  readonly productType: string;
  readonly tags: ReadonlyArray<string>;
  readonly totalInventory: number;
  readonly priceRangeV2: {
    readonly minVariantPrice: MoneyV2;
    readonly maxVariantPrice: MoneyV2;
  };
  readonly featuredImage: {
    readonly url: string;
    readonly altText: string | null;
  } | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/** Admin product variant */
export interface AdminProductVariant {
  readonly id: string;
  readonly title: string;
  readonly sku: string | null;
  readonly price: string;
  readonly compareAtPrice: string | null;
  readonly inventoryQuantity: number;
  readonly selectedOptions: ReadonlyArray<{
    readonly name: string;
    readonly value: string;
  }>;
}

/** Admin collection */
export interface AdminCollection {
  readonly id: string;
  readonly title: string;
  readonly handle: string;
  readonly descriptionHtml: string;
  readonly sortOrder: string;
  readonly productsCount: { readonly count: number };
  readonly image: {
    readonly url: string;
    readonly altText: string | null;
  } | null;
  readonly updatedAt: string;
}

/** Admin order */
export interface AdminOrder {
  readonly id: string;
  readonly name: string;
  readonly createdAt: string;
  readonly displayFinancialStatus: string;
  readonly displayFulfillmentStatus: string;
  readonly totalPriceSet: {
    readonly shopMoney: MoneyV2;
  };
  readonly customer: {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly email: string | null;
  } | null;
}

/** Paginated connection info */
export interface PageInfo {
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly startCursor: string | null;
  readonly endCursor: string | null;
}

/** Generic admin connection response */
export interface AdminConnection<T> {
  readonly edges: ReadonlyArray<{
    readonly node: T;
    readonly cursor: string;
  }>;
  readonly pageInfo: PageInfo;
}
