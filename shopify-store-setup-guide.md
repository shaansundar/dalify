# Dalify — Shopify Store Setup Guide

Day 1 deliverable for the 1-week D2C build sprint.

---

## 1. Create Shopify Store

1. Go to [shopify.com](https://www.shopify.com) → **Start free trial**
2. Enter store name: `dalify` (or your preferred name)
3. Complete the onboarding questionnaire:
   - Industry: **Food & Drink**
   - Business type: **I'm just getting started**
   - Revenue: select current range
4. Once in the admin dashboard, go to **Settings → Plan** → select **Shopify Advanced** ($399/month)
   - Advanced is required for: third-party calculated shipping rates, advanced reports, lower credit card fees
5. Verify billing is active before proceeding

**Exit check:** You can access `admin.shopify.com/store/dalify`

---

## 2. Connect Custom Domain & DNS

### If purchasing a new domain through Shopify:
1. **Settings → Domains → Buy new domain** → search for `dalify.in` (or `.com`)
2. Shopify handles DNS automatically — skip to Step 3

### If connecting an existing domain:
1. **Settings → Domains → Connect existing domain**
2. Enter your domain (e.g., `dalify.in`)
3. At your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), update DNS records:

| Record Type | Host/Name | Value | TTL |
|-------------|-----------|-------|-----|
| A | `@` | `23.227.38.65` | 3600 |
| CNAME | `www` | `shops.myshopify.com` | 3600 |

4. Back in Shopify: click **Verify connection**
5. Wait for DNS propagation (up to 48 hours, typically 1–4 hours)
6. SSL certificate is auto-provisioned by Shopify once DNS resolves

**Critical:** Point DNS on Day 1 even before the store is ready. Propagation delay is the reason.

**Exit check:** Visiting your domain shows the Shopify storefront (or password page)

---

## 3. Select & Configure Dawn Theme

Dawn is Shopify's default theme — fast, lightweight, mobile-first. No code changes needed for Week 1.

### 3.1 Confirm Dawn is active
1. **Online Store → Themes** → Dawn should be your current theme
2. If not, go to **Theme library → Add Dawn** from the free theme store

### 3.2 Brand customization via Theme Editor
1. Click **Customize** on the Dawn theme
2. **Theme settings** (gear icon, bottom-left):

#### Colors
| Setting | Value | Notes |
|---------|-------|-------|
| Primary color | Brand green or earth tone | Used for buttons, links |
| Secondary color | Complementary accent | Used for highlights |
| Background | `#FFFFFF` or warm off-white | Keep clean for food imagery |
| Text | `#1A1A1A` or dark charcoal | High contrast for readability |

#### Typography
| Setting | Recommendation |
|---------|---------------|
| Heading font | **Playfair Display** or **Cormorant** (serif — conveys premium organic) |
| Body font | **Inter** or **Source Sans Pro** (clean, readable sans-serif) |
| Base size | 16px (default) |

#### Logo & Favicon
1. **Header → Logo** → Upload Dalify logo (PNG with transparent background, ≥400px wide)
2. **Theme settings → Favicon** → Upload 32×32 or 64×64 favicon

#### Header
1. **Header** section → **Logo position: Middle left** (Dawn default)
2. Enable **sticky header** for navigation persistence on scroll
3. Ensure navigation menu is linked (will auto-populate from **Online Store → Navigation**)

#### Footer
1. Add footer content blocks:
   - Quick links (About, FAQ, Contact)
   - Policy links (Privacy, Terms, Refund)
   - Social media icons
   - FSSAI license number display (use a text block)
   - Newsletter signup form

3. Click **Save**

**Exit check:** Preview the store — logo, colors, and fonts match the Dalify brand

---

## 4. Submit Razorpay Payment Gateway Application

**This is the critical path.** Razorpay approval can take 2–3 business days. Submit immediately on Day 1.

### 4.1 Apply for Razorpay
1. Go to [razorpay.com](https://razorpay.com) → **Sign Up**
2. Complete KYC:
   - Business type: **Proprietorship** or **Private Limited** (as applicable)
   - Business category: **E-commerce → Food & Beverages**
   - Upload: PAN card, GST certificate, bank account details, FSSAI license
3. Activate **Test mode** immediately (available before approval)

### 4.2 Install Razorpay on Shopify
1. **Settings → Payments → Add payment methods**
2. Search for **Razorpay** in third-party providers
3. Install the Razorpay Shopify app
4. Enter your Razorpay **Key ID** and **Key Secret** (use test credentials initially)
5. Enable payment methods in Razorpay dashboard:
   - UPI (critical for India D2C — highest conversion)
   - Credit/Debit cards
   - Wallets (Paytm, PhonePe)
   - Net banking
   - COD (via Shiprocket, configured Day 3)

### 4.3 Backup payment plan
If Razorpay approval is delayed past Day 5:
- **Option A:** Enable **Shopify Payments** (if available in your region)
- **Option B:** Apply for **PayU** as a parallel backup (faster approval for some business types)
- **Minimum viable:** COD + UPI can launch the store while full gateway approval completes

**Exit check:** Razorpay application submitted, test mode credentials configured in Shopify

---

## 5. Set Up GitHub Repo for Theme Version Control

### 5.1 Install Shopify CLI
```bash
npm install -g @shopify/cli @shopify/theme
```

### 5.2 Authenticate and pull theme
```bash
shopify theme pull --store dalify.myshopify.com
```
This downloads your Dawn theme files locally.

### 5.3 Initialize Git repository
```bash
cd dalify-theme
git init
git add .
git commit -m "feat: initial Dawn theme for Dalify D2C store"
```

### 5.4 Push to GitHub
```bash
gh repo create dalify/dalify-shopify-theme --private --source=. --push
```

### 5.5 Development workflow (post-launch)
```bash
# Preview changes locally
shopify theme dev --store dalify.myshopify.com

# Push changes to live theme
shopify theme push --store dalify.myshopify.com
```

**Important for Week 1:** All customization happens through the theme editor UI — no code changes. The Git repo is a safety net for rollback and future development.

**Exit check:** GitHub repo exists with initial theme commit

---

## 6. Essential Admin Configuration

Complete these settings before moving to Day 2.

### 6.1 Store details
**Settings → Store details:**
- Store name: **Dalify**
- Store contact email: `support@dalify.in`
- Sender email: `orders@dalify.in`
- Store industry: Food and beverages
- Store address: Business/warehouse address (used for shipping calculations)
- Store currency: **INR (₹)**
- Time zone: **(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi**
- Unit system: **Metric**
- Weight unit: **Grams**

### 6.2 Checkout settings
**Settings → Checkout:**
- Customer accounts: **Optional** (don't force registration — reduces friction)
- Customer contact method: **Email** (or Email + Phone if SMS marketing planned)
- Guest checkout: **Enabled**
- Order processing: Auto-fulfill only when payment captured

### 6.3 Tax settings
**Settings → Taxes and duties:**
- India tax region → Ensure GST is configured
- Set product tax collection to **included in price** (standard for Indian D2C)
- Add GSTIN in tax settings

### 6.4 Notification templates
**Settings → Notifications:**
- Review and customize the sender name to "Dalify" on:
  - Order confirmation
  - Shipping confirmation
  - Delivery update
- Leave templates as default for Week 1 (Klaviyo will handle marketing emails from Day 4)

### 6.5 Navigation menus
**Online Store → Navigation:**

**Main menu:**
| Label | Link |
|-------|------|
| Shop All | `/collections/all` |
| Spices | `/collections/spices` |
| Grains | `/collections/grains` |
| Pulses | `/collections/pulses` |
| Instant Mixes | `/collections/instant-mixes` |
| About | `/pages/about` |

**Footer menu:**
| Label | Link |
|-------|------|
| About Us | `/pages/about` |
| FAQ | `/pages/faq` |
| Contact | `/pages/contact` |
| Privacy Policy | `/policies/privacy-policy` |
| Terms of Service | `/policies/terms-of-service` |
| Refund Policy | `/policies/refund-policy` |

---

## 7. Day 1 Completion Checklist

- [ ] Shopify store created on Advanced plan
- [ ] Custom domain connected, DNS records set
- [ ] Dawn theme active with brand colors, logo, typography configured
- [ ] Razorpay application submitted (test credentials in Shopify)
- [ ] GitHub repo initialized with theme files
- [ ] Store details, checkout, tax, and notification settings configured
- [ ] Navigation menus created (main + footer)
- [ ] Product taxonomy and collections defined (see companion document)

**Next:** Day 2 — Product catalog bulk upload (dependent on product CSV and images being ready)
