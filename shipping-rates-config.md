# Dalify — Shipping Rates Configuration

Day 3 deliverable for the 1-week D2C build sprint.

---

## Rate Structure Summary

| Condition | Shipping Cost | Notes |
|-----------|--------------|-------|
| Cart total ≥ INR 499 | **Free** | Incentivizes higher AOV |
| Cart total < INR 499 | **Flat INR 49** | Covers partial logistics cost |

This two-tier structure is standard for Indian D2C. The INR 499 threshold is set slightly above a single-product average to encourage multi-item orders.

---

## 1. Configure Shipping Zones in Shopify

### 1a. Domestic Shipping Zone (India)

1. Go to **Settings → Shipping and delivery**
2. Under **General shipping rates**, click the default profile (or **Create new profile** if none exists)
3. Click **Create shipping zone** → name it `India`
4. Add country: **India**
5. You will add rate conditions inside this zone (next sections)

### 1b. Rate 1 — Free Shipping (≥ INR 499)

1. Inside the `India` zone, click **Add rate**
2. Configure:

| Field | Value |
|-------|-------|
| Rate name | `Free Shipping` |
| Price | `0` |
| Add conditions | **Based on order price** |
| Minimum price | `499` |
| Maximum price | *(leave blank — no upper limit)* |

3. Click **Done**

### 1c. Rate 2 — Flat Rate (< INR 499)

1. Click **Add rate** again
2. Configure:

| Field | Value |
|-------|-------|
| Rate name | `Standard Shipping` |
| Price | `49` |
| Add conditions | **Based on order price** |
| Minimum price | `0` |
| Maximum price | `498.99` |

3. Click **Done**

**Critical:** Use `498.99` as the maximum (not `499`) to avoid overlap with the free shipping tier.

### 1d. Save

1. Review the zone — you should see two rates listed:
   - `Free Shipping` — INR 0 (orders ≥ INR 499)
   - `Standard Shipping` — INR 49 (orders INR 0 – 498.99)
2. Click **Save**

**Exit check:** Add a product under INR 499 to the cart — shipping shows INR 49. Add more items to exceed INR 499 — shipping changes to Free.

---

## 2. Configure GST / Tax Settings

Indian D2C stores must charge GST. Shopify handles tax calculations per-product.

### 2a. Store-Level Tax Setup

1. Go to **Settings → Taxes and duties**
2. Under **Countries/regions**, click **India**
3. Verify:
   - **Country tax** rate: GST is applied per-product (not a single store rate)
   - **Include tax in prices**: **Enable** this toggle — Indian consumers expect prices to be MRP-inclusive (tax-inclusive)
4. Click **Save**

### 2b. Product-Level GST (HSN Codes)

Each product needs an HSN (Harmonized System of Nomenclature) code and GST rate.

| Product Category | HSN Code | GST Rate |
|-----------------|----------|----------|
| Dal / Pulses (unprocessed / raw) | 0713 | 0% (nil rate) |
| Dal / Pulses (packaged & branded) | 0713 | 5% |
| Ready-to-cook mixes | 1904 | 18% |
| Spice blends | 0910 | 5% |
| Gift boxes / hampers (composite supply) | *(highest GST item in box)* | Varies |

**To set HSN per product:**
1. Go to **Products → [Select product]**
2. Scroll to **Pricing** section
3. Check **Charge tax on this product**
4. In the **Tax code** or **HSN code** field (visible under Indian tax settings), enter the appropriate code
5. Repeat for all products

### 2c. Tax-Inclusive Pricing

Since **Include tax in prices** is enabled, your product MRP already contains GST. Shopify will back-calculate the tax component for invoicing.

Example for a branded dal pack priced at INR 199 (5% GST):
- Displayed price: INR 199
- Tax component: INR 199 × 5/105 = INR 9.48
- Pre-tax price: INR 189.52

**Exit check:** View a product page on the storefront — price shows as a clean MRP (e.g., ₹199). At checkout, the order summary shows the tax breakup line.

---

## 3. Shipping Rate Interaction with Shiprocket

**Important distinction:** The Shopify shipping rates above are what the *customer pays*. The actual shipping cost you pay to couriers via Shiprocket is separate.

| What | Where Configured | Who Pays |
|------|-----------------|----------|
| Customer-facing shipping fee | Shopify → Shipping and delivery | Customer |
| Actual courier cost per shipment | Shiprocket dashboard (auto-calculated per order) | Dalify (deducted from Shiprocket wallet) |

### Margin Consideration

| Scenario | Customer Pays | Dalify Pays (approx.) | Margin Impact |
|----------|--------------|----------------------|---------------|
| Order ≥ INR 499, metro delivery | INR 0 (free) | INR 40–60 | Absorbed in product margin |
| Order ≥ INR 499, non-metro | INR 0 (free) | INR 60–90 | Absorbed in product margin |
| Order < INR 499, metro | INR 49 | INR 40–60 | Roughly break-even |
| Order < INR 499, non-metro | INR 49 | INR 60–90 | Slight negative (~INR 20–40 subsidy) |

**Recommendation:** Monitor average shipping cost in Shiprocket monthly. If the margin impact is too high, consider:
- Raising the free shipping threshold to INR 599
- Raising the flat rate to INR 69
- Adding a weight-based surcharge for bulky combo packs

---

## 4. Additional Delivery Options (Optional / Post-Launch)

### 4a. Express Shipping Tier

If you want to offer a premium express option:

1. In Shopify → Shipping and delivery → India zone → **Add rate**
2. Configure:

| Field | Value |
|-------|-------|
| Rate name | `Express Shipping (2–3 days)` |
| Price | `99` |
| Add conditions | None (available for all orders) |

3. In Shiprocket, ensure express-capable couriers (BlueDart, DTDC Express) are enabled
4. When processing express orders, manually select the express courier

### 4b. Local Delivery (Same-City)

If Dalify has a physical presence or warehouse in a metro city:

1. **Settings → Shipping and delivery → Local delivery**
2. Enable local delivery for your warehouse pincode radius
3. Set: free or nominal fee (e.g., INR 29)
4. Deliver via own fleet or hyper-local partners (Dunzo, Porter)

---

## 5. Configuration Verification Checklist

Run through this after setup:

- [ ] India shipping zone exists with two rates (Free ≥499, Flat 49 <499)
- [ ] No other shipping zones are active that might conflict
- [ ] Tax setting: "Include tax in prices" is ON
- [ ] At least 5 products have correct HSN codes assigned
- [ ] Test cart under INR 499 shows INR 49 shipping
- [ ] Test cart at exactly INR 499 shows Free shipping
- [ ] Test cart over INR 499 shows Free shipping
- [ ] Checkout shows tax breakup line
- [ ] COD is available as a payment method at checkout
- [ ] Order confirmation email shows correct shipping + tax amounts
