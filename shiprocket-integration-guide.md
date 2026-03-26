# Dalify — Shiprocket Integration Guide

Day 3 deliverable for the 1-week D2C build sprint.

---

## 1. Install Shiprocket App from Shopify App Store

1. In Shopify Admin, go to **Apps → Search** or visit the [Shiprocket Shopify App listing](https://apps.shopify.com/shiprocket)
2. Click **Add app** → **Install app**
3. You will be redirected to Shiprocket's onboarding flow
4. If you don't have a Shiprocket account, sign up:
   - Business name: `Dalify`
   - Email: your business email
   - Phone: business contact number
   - Select plan: **Lite** is sufficient for launch (upgrade later based on volume)
5. Authorize the Shopify integration when prompted — this syncs orders automatically

**Exit check:** Shiprocket app appears under **Apps** in your Shopify admin, and the Shiprocket dashboard opens without errors.

---

## 2. Register Warehouse Address

Your warehouse/pickup address is where courier partners collect packages.

1. In Shiprocket dashboard: **Settings → Manage Pickup Addresses → Add Pickup Address**
2. Fill in:

| Field | Value |
|-------|-------|
| Pickup Address Name | `Dalify Primary Warehouse` |
| Contact Person | Your name or warehouse manager |
| Phone | Pickup contact number |
| Address Line 1 | Full street address |
| City | Your city |
| State | Your state |
| Pincode | 6-digit PIN code |
| Country | India |

3. Click **Save** and mark as **Primary pickup address**
4. Shiprocket may send a verification request to confirm the address — complete it if prompted

**Critical:** The pincode determines which courier partners are available and their rates. Ensure it is correct.

**Exit check:** Pickup address shows as **Verified** in Shiprocket → Settings → Manage Pickup Addresses.

---

## 3. Select Courier Partners

Shiprocket aggregates multiple courier partners. You configure which ones to use.

1. Go to **Settings → Courier Selection** (or **Courier Preferences**)
2. Recommended courier partners for a new Dalify store:

| Courier | Strength | Best For |
|---------|----------|----------|
| Delhivery | Wide coverage, reliable tracking | Pan-India standard delivery |
| Ecom Express | Good COD settlement cycle | COD-heavy orders |
| DTDC | Strong in Tier 2/3 cities | Non-metro reach |
| BlueDart | Premium, fast delivery | High-value / express orders |
| Xpressbees | Cost-effective, good coverage | Budget-conscious shipping |

3. Enable at least **3 courier partners** for redundancy
4. Set courier priority:
   - **Option A — Automatic (Recommended):** Let Shiprocket's algorithm pick the cheapest/fastest based on pincode and weight. Go to **Settings → Courier Selection → Auto** and enable.
   - **Option B — Manual:** Select courier per order. Only recommended if you have specific courier SLAs.

**Exit check:** At least 3 couriers are enabled in Shiprocket courier settings.

---

## 4. Configure COD (Cash on Delivery)

COD is essential for Indian D2C — typically 40–60% of orders.

### 4a. Enable COD in Shiprocket

1. Go to **Settings → COD**
2. Toggle **Enable COD** → ON
3. Set COD remittance preferences:
   - **Early COD** — Shiprocket remits before delivery (charges a fee ~1–2%). Recommended for cash flow.
   - **Standard COD** — Remitted after delivery confirmation (no extra fee).
4. Set **COD order limit** (optional): e.g., max INR 5,000 per COD order to reduce fraud risk

### 4b. Enable COD in Shopify

1. In Shopify Admin: **Settings → Payments → Manual payment methods**
2. Click **Add manual payment method** → select **Cash on Delivery (COD)**
3. Additional details (shown to customer at checkout):
   ```
   Pay with cash when your order is delivered.
   COD available for orders up to ₹5,000.
   A small handling charge may apply.
   ```
4. Click **Activate**

### 4c. COD Fraud Prevention

- Enable **OTP verification on COD** in Shiprocket if available
- Consider adding a small COD surcharge (INR 30–50) to discourage non-serious orders — configure in Shopify via a COD fee app or Shiprocket's settings
- Monitor RTO (Return to Origin) rates weekly; disable COD for high-RTO pincodes

**Exit check:** Place a test order with COD selected at checkout. Verify the order syncs to Shiprocket with COD flag.

---

## 5. Configure Shipping Label Workflow

Shipping labels are generated per order for courier pickup.

### 5a. Auto-Sync Orders

1. In Shiprocket: **Settings → Channel Integration → Shopify**
2. Verify your Shopify store is connected and **auto-sync** is enabled
3. New Shopify orders should appear in Shiprocket → **Orders → New** within 5–10 minutes

### 5b. Process an Order (Manual Flow)

1. Go to Shiprocket → **Orders → New**
2. Select an order → click **Process / Ship Now**
3. Verify:
   - Customer address and pincode
   - Package dimensions and weight (set defaults under **Settings → Default Dimensions**)
   - Select courier (or accept auto-recommended courier)
4. Click **Create Shipment**
5. The **AWB (Air Waybill) number** is generated and tracking begins

### 5c. Generate Shipping Label

1. After shipment creation, click **Generate Label** on the order
2. Download the label PDF — it includes:
   - Sender address (your warehouse)
   - Receiver address
   - AWB barcode
   - Weight and dimensions
   - COD amount (if applicable)
3. Print the label and affix to the package

### 5d. Schedule Pickup

1. After label is generated: click **Schedule Pickup**
2. Select pickup date and preferred time slot
3. The courier partner will arrive at your warehouse to collect

### 5e. Set Default Package Dimensions

To speed up label generation:

1. Go to **Settings → Default Dimensions**
2. Set typical package sizes for Dalify products:

| Product Type | Length (cm) | Width (cm) | Height (cm) | Weight (g) |
|-------------|-------------|------------|-------------|------------|
| Single dal pack (500g) | 20 | 15 | 5 | 550 |
| Single dal pack (1kg) | 25 | 18 | 8 | 1100 |
| Combo pack (2–3 items) | 30 | 22 | 12 | 2500 |
| Gift box | 35 | 25 | 15 | 3500 |

3. These defaults pre-fill when processing orders, reducing manual entry

**Exit check:** Process a test order end-to-end: order in Shopify → syncs to Shiprocket → create shipment → generate label → download label PDF.

---

## 6. Tracking & Notifications

### 6a. Enable Customer Tracking

1. Shiprocket auto-updates tracking in Shopify once an AWB is assigned
2. Customers receive Shopify's default shipping notification email with tracking link
3. For branded tracking pages: enable **Shiprocket Engage** (optional add-on) under **Settings → Tracking Page**

### 6b. Webhook / Notification Setup

1. Shiprocket sends status updates to Shopify automatically via the app integration
2. Key status transitions customers see:
   - Order confirmed → Shipped → In transit → Out for delivery → Delivered
3. Verify email notifications in Shopify: **Settings → Notifications → Shipping confirmation** and **Shipping update**

**Exit check:** After processing a test order, the customer (test email) receives a shipping confirmation with a working tracking link.

---

## 7. Post-Launch Monitoring

Track these metrics weekly in the Shiprocket dashboard:

| Metric | Target | Action if Off-Target |
|--------|--------|---------------------|
| Delivery success rate | >95% | Review NDR (non-delivery report) reasons |
| RTO rate | <5% | Disable COD for high-RTO pincodes |
| Average delivery time | <5 days (metro), <7 days (non-metro) | Switch underperforming couriers |
| COD remittance cycle | <7 days | Switch to Early COD if cash flow tight |
| Pickup success rate | 100% | Ensure warehouse ready before scheduled time |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Orders not syncing from Shopify | Reconnect channel: Shiprocket → Settings → Channel Integration → Reconnect |
| Courier not available for pincode | Enable additional couriers; verify pincode is correct |
| AWB generation failed | Check package weight/dimensions; ensure Shiprocket wallet has balance |
| Label shows wrong address | Edit order in Shiprocket before generating label |
| COD option not showing at checkout | Verify manual payment method is active in Shopify → Settings → Payments |
