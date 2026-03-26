/* ------------------------------------------------------------------ */
/*  Navigation configuration                                         */
/*  Derived from product-taxonomy.md collection hierarchy.            */
/* ------------------------------------------------------------------ */

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly children?: ReadonlyArray<NavItem>;
}

export const MAIN_NAV: ReadonlyArray<NavItem> = [
  { label: "Shop All", href: "/collections/all" },
  {
    label: "Spices",
    href: "/collections/spices",
    children: [
      { label: "All Spices", href: "/collections/spices" },
      { label: "Whole Spices", href: "/collections/whole-spices" },
      { label: "Ground Spices", href: "/collections/ground-spices" },
      { label: "Blended Masalas", href: "/collections/blended-masalas" },
      { label: "Seasoning & Herbs", href: "/collections/seasoning-herbs" },
    ],
  },
  {
    label: "Grains",
    href: "/collections/grains",
    children: [
      { label: "All Grains", href: "/collections/grains" },
      { label: "Rice", href: "/collections/rice" },
      { label: "Millets", href: "/collections/millets" },
      { label: "Wheat & Flour", href: "/collections/wheat-flour" },
    ],
  },
  {
    label: "Pulses",
    href: "/collections/pulses",
    children: [
      { label: "All Pulses", href: "/collections/pulses" },
      { label: "Dals", href: "/collections/dals" },
      { label: "Whole Lentils", href: "/collections/whole-lentils" },
      { label: "Legumes & Beans", href: "/collections/legumes-beans" },
    ],
  },
  {
    label: "Instant Mixes",
    href: "/collections/instant-mixes",
    children: [
      { label: "All Instant Mixes", href: "/collections/instant-mixes" },
      { label: "Breakfast Mixes", href: "/collections/breakfast-mixes" },
      { label: "Snack Mixes", href: "/collections/snack-mixes" },
      { label: "Meal Mixes", href: "/collections/meal-mixes" },
    ],
  },
  { label: "About", href: "/pages/about" },
] as const;

export const FOOTER_NAV = {
  shop: [
    { label: "All Products", href: "/collections/all" },
    { label: "Spices", href: "/collections/spices" },
    { label: "Grains", href: "/collections/grains" },
    { label: "Pulses", href: "/collections/pulses" },
    { label: "Instant Mixes", href: "/collections/instant-mixes" },
  ],
  company: [
    { label: "About Us", href: "/pages/about" },
    { label: "Contact", href: "/pages/contact" },
    { label: "FAQ", href: "/pages/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/pages/privacy-policy" },
    { label: "Terms of Service", href: "/pages/terms-of-service" },
    { label: "Refund Policy", href: "/pages/refund-policy" },
    { label: "Shipping Policy", href: "/pages/shipping-policy" },
  ],
} as const;
