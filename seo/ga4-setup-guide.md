# GA4 Setup Guide for Dalify

## Overview

This guide walks through setting up Google Analytics 4 (GA4) with enhanced e-commerce tracking on Dalify's storefront. Follow these steps in order.

### Architecture: Two-Layer Tracking

Dalify's checkout is Shopify-hosted. GA4 tracking is split across two systems:

| Layer | What it covers | How it's implemented |
|-------|---------------|---------------------|
| **Next.js storefront** | All storefront pages: product views, add-to-cart, begin-checkout, search | `src/lib/analytics.ts` — fires when `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var is set |
| **Shopify checkout** | Checkout pages + order confirmation (`purchase` event) | Shopify's Google & YouTube channel (this guide, Parts 1–2) |

**Both layers are required.** The Next.js analytics module fires `view_item`, `add_to_cart`, `begin_checkout`, and `search`. The Shopify-native channel fires `purchase` on the order confirmation page. Do not rely solely on the Shopify channel for storefront events.

---

## Part 1: Create the GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com) and sign in with your Google account.
2. Click **Admin** (gear icon, bottom left).
3. In the **Account** column, click **Create Account** (or select an existing account).
4. In the **Property** column, click **Create Property**.
5. Enter:
   - **Property name**: `Dalify - Production`
   - **Reporting time zone**: `India Standard Time (IST)`
   - **Currency**: `Indian Rupee (INR)`
6. Click **Next**, fill in business details (industry: Food & Beverages, size: Small), click **Create**.
7. Accept the terms of service.
8. In the setup wizard, select **Web** as the platform.
9. Enter your Shopify store URL and stream name (`Dalify Web`).
10. Click **Create stream** — copy the **Measurement ID** (format: `G-XXXXXXXXXX`).

---

## Part 2: Connect GA4 to Shopify (Native Integration — Recommended)

Shopify's native Google & YouTube channel handles GA4 without Google Tag Manager for most stores.

### Option A: Shopify Google & YouTube App (Simplest)

1. In Shopify Admin, go to **Apps** → **App and sales channel settings**.
2. Search for and install the **Google & YouTube** channel.
3. Connect your Google account.
4. Under **Google Analytics**, click **Connect** and select your GA4 property.
5. Enable **Enhanced conversions** if prompted.
6. Shopify will automatically inject the GA4 tag and e-commerce events.

### Option B: Google Tag Manager (Advanced — More Control)

Use this if you need custom events or data layer manipulation beyond what the native app provides.

1. Create a GTM account at [tagmanager.google.com](https://tagmanager.google.com).
2. Create a new container (Web) named `Dalify`.
3. Copy the GTM container snippet (head + body).
4. In `src/app/layout.tsx`, add the GTM head snippet inside the `<head>` section using Next.js `<Script>` component with `strategy="afterInteractive"`.
5. Add the GTM `<noscript>` body snippet immediately after the `<body>` opening tag.
8. In GTM, create a **GA4 Configuration tag**:
   - Tag type: Google Analytics: GA4 Configuration
   - Measurement ID: your `G-XXXXXXXXXX`
   - Trigger: All Pages
9. Publish the GTM container.

---

## Part 3: Configure Enhanced E-Commerce Tracking

Shopify's Google & YouTube app automatically sends these GA4 e-commerce events:

| GA4 Event | Trigger |
|-----------|---------|
| `view_item` | Product page viewed |
| `add_to_cart` | Item added to cart |
| `begin_checkout` | Checkout started |
| `add_shipping_info` | Shipping info entered |
| `add_payment_info` | Payment info entered |
| `purchase` | Order confirmed |
| `view_item_list` | Collection page viewed |
| `select_item` | Product clicked from list |

### Verify Enhanced E-Commerce is Enabled

1. In GA4 Admin → **Events** → confirm the events above appear after test purchases.
2. In GA4 Admin → **Conversions** — mark `purchase` as a conversion (it may be auto-marked).
3. Also mark `begin_checkout` and `add_to_cart` as conversions for funnel analysis.

### Key Custom Events to Add Manually (via GTM if needed)

| Event | When to Fire | Why |
|-------|-------------|-----|
| `search` | Site search performed | Track what customers look for |
| `view_promotion` | Homepage banner viewed | Measure banner effectiveness |
| `newsletter_signup` | Email form submitted | Lead capture tracking |

---

## Part 4: Key Events to Track for Dalify

Priority events for an organic food D2C brand:

```
purchase          → Revenue, ROAS measurement
add_to_cart       → Cart conversion rate
begin_checkout    → Checkout funnel start
view_item         → Product interest
search            → Demand signals (e.g., "organic chana dal")
newsletter_signup → Email list growth
```

### Setting Up Conversions in GA4

1. GA4 Admin → **Events**.
2. For each event below, toggle **Mark as conversion**:
   - `purchase`
   - `begin_checkout`
   - `add_to_cart`

---

## Part 5: Verification Steps

### 5.1 DebugView (Real-Time Testing)

1. Install the **Google Analytics Debugger** Chrome extension.
2. Visit your Shopify store with the extension enabled.
3. In GA4 → **Admin** → **DebugView** — you should see events streaming in real-time.
4. Add a product to cart, proceed to checkout — confirm `add_to_cart` and `begin_checkout` events appear.

### 5.2 Place a Test Order

1. Set up Shopify's Bogus Gateway for test payments: Admin → **Settings** → **Payments** → **Bogus Gateway**.
2. Place a test order on the storefront.
3. In GA4 DebugView, confirm a `purchase` event fires with correct `value` and `currency` parameters.

### 5.3 Realtime Report Check

1. GA4 → **Reports** → **Realtime**.
2. Browse the store — confirm page views appear.
3. Check **Event count by event name** section for e-commerce events.

### 5.4 Data Freshness Note

GA4 standard reports have up to 24–48 hour data lag. Use DebugView for same-session verification.

---

## Part 6: Recommended GA4 Audiences for Dalify

Create these audiences in GA4 → **Admin** → **Audiences** for retargeting:

| Audience | Definition |
|----------|-----------|
| All Visitors | All users, last 30 days |
| Cart Abandoners | `add_to_cart` event, did NOT trigger `purchase`, last 7 days |
| Checkout Abandoners | `begin_checkout`, did NOT trigger `purchase`, last 7 days |
| Purchasers | `purchase` event triggered, last 30 days |
| High-Intent Browsers | 3+ `view_item` events, no purchase, last 14 days |

Export these audiences to Google Ads for remarketing campaigns.

---

## Shopify Native vs GTM: Decision Guide

| Factor | Shopify Native | Google Tag Manager |
|--------|---------------|-------------------|
| Setup complexity | Low (plug-and-play) | Medium |
| E-commerce events | Automatic | Requires configuration |
| Custom events | Limited | Full flexibility |
| Data layer access | No | Yes |
| Recommended for Dalify | **Yes (start here)** | If advanced tracking needed later |

**Recommendation:** Start with Shopify's native Google & YouTube app. Add GTM later if you need custom events (e.g., tracking specific ingredient filter clicks or recipe page engagement).

---

*Last updated: 2026-04-01 | For Dalify Next.js 15 storefront + Shopify checkout*
