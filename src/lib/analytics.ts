/**
 * Analytics event helpers for GA4 and Meta Pixel e-commerce tracking.
 *
 * All functions are safe to call regardless of whether tracking scripts
 * are loaded — they silently no-op if gtag/fbq is unavailable.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

interface ProductItem {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly currency?: string;
  readonly variant?: string;
  readonly category?: string;
  readonly quantity?: number;
}

/** GA4: view_item — Meta: ViewContent */
export function trackViewProduct(item: ProductItem): void {
  const currency = item.currency ?? "INR";

  window.gtag?.("event", "view_item", {
    currency,
    value: item.price,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_variant: item.variant,
        item_category: item.category,
        quantity: 1,
      },
    ],
  });

  window.fbq?.("track", "ViewContent", {
    content_ids: [item.id],
    content_name: item.name,
    content_type: "product",
    value: item.price,
    currency,
  });
}

/** GA4: add_to_cart — Meta: AddToCart */
export function trackAddToCart(item: ProductItem): void {
  const currency = item.currency ?? "INR";
  const quantity = item.quantity ?? 1;

  window.gtag?.("event", "add_to_cart", {
    currency,
    value: item.price * quantity,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_variant: item.variant,
        item_category: item.category,
        quantity,
      },
    ],
  });

  window.fbq?.("track", "AddToCart", {
    content_ids: [item.id],
    content_name: item.name,
    content_type: "product",
    value: item.price * quantity,
    currency,
    num_items: quantity,
  });
}

/** GA4: view_item_list — Meta: ViewContent (list) */
export function trackViewCollection(
  listName: string,
  items: ReadonlyArray<ProductItem>,
): void {
  window.gtag?.("event", "view_item_list", {
    item_list_name: listName,
    items: items.map((item, index) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      index,
      item_category: item.category,
    })),
  });
}

/** GA4: begin_checkout — Meta: InitiateCheckout */
export function trackBeginCheckout(
  value: number,
  currency: string = "INR",
): void {
  window.gtag?.("event", "begin_checkout", {
    currency,
    value,
  });

  window.fbq?.("track", "InitiateCheckout", {
    value,
    currency,
  });
}

/** GA4: search — Meta: Search */
export function trackSearch(searchTerm: string): void {
  window.gtag?.("event", "search", {
    search_term: searchTerm,
  });

  window.fbq?.("track", "Search", {
    search_string: searchTerm,
  });
}
