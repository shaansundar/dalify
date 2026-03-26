export { shopifyFetch, flattenConnection } from "./client";
export type * from "./types";

// Product
export {
  getProductByHandle,
  getProducts,
  getProductRecommendations,
} from "./queries/product";

// Collection
export {
  getCollectionByHandle,
  getCollections,
} from "./queries/collection";

// Cart
export {
  createCart,
  getCart,
  addToCart,
  updateCartLines,
  removeFromCart,
} from "./queries/cart";

// Search
export { searchProducts } from "./queries/search";
