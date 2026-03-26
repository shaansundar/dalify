/**
 * Format a Shopify money amount for display.
 * Shopify Storefront API returns amounts as strings (e.g., "299.00").
 */
export function formatPrice(amount: string, currencyCode: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}
