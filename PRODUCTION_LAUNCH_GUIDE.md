# ISHAYA — Production Launch & Store Migration Guide

This document provides the complete operational protocol for transferring, configuring, and launching the **Ishaya** Shopify theme into live production.

---

## 0. Select a Plan (DO THIS FIRST)

`ishaya-dev.myshopify.com` is a Partner **development store**. A development store cannot
connect a custom domain, cannot take payments, and its checkout stays disabled — so every
step below is blocked until a plan is selected.

1. Go to **Shopify Admin > Settings > Plan** (or Partner Dashboard > Stores > the store > **Select plan**).
2. Pick a plan (Basic is enough to launch).
3. If the store will be handed to a client, use **Transfer ownership** from the Partner
   Dashboard first — the client then selects and pays for the plan from their own account.

Confirm before continuing: **Settings > Plan** shows an active paid plan, not "Development store".

---

## 1. Theme Deployment & Store Transfer

### A. Publish the Theme
1. In your Shopify Admin, navigate to **Online Store > Themes**.
2. Locate the **Ishaya** theme under **Theme library**.
3. Verify all theme settings in the customizer (**Customize** button):
   - **Colors & Branding**: Confirm background (`#09090b`), surface colors, and typography.
   - **Header & Navigation**: Select your primary menu in Header settings.
   - **Cart & Checkout**: Enable Cart Drawer, configure Free Shipping threshold (e.g., $250).
   - **Policies**: Configure Directory links in the `Page` section.
4. Click **Publish** to make Ishaya the active live theme.

### B. GitHub CI/CD Auto-Sync (Optional / Recommended)
If deploying via GitHub:
1. In Shopify Admin, go to **Online Store > Themes > Add theme > Connect from GitHub**.
2. Select your repository (`ishaya-theme`) and `main` branch.
3. Any commits pushed to `main` will automatically build and synchronize to the Shopify theme.

---

## 2. Domain & SSL Setup

Two options. **Connect** is safer (registrar stays where it is, reversible);
**transfer** moves the domain into Shopify so renewals and DNS live in one place.

### Option A — Connect an existing domain (recommended)

1. Shopify Admin > **Settings > Domains** > **Connect existing domain**.
2. Type the domain (no `https://`, no `www`) and press **Next**.
3. Shopify offers **Connect automatically** for GoDaddy / Google Domains / 1&1 —
   log in there and it writes the DNS records for you. Otherwise choose **Connect manually**.
4. Manual DNS — in the registrar's DNS panel (Namecheap: Advanced DNS; GoDaddy: DNS Management;
   Cloudflare: DNS; Hostinger: DNS Zone):

   | Type | Host / Name | Value | TTL |
   |---|---|---|---|
   | A | `@` | `23.227.38.65` | Automatic |
   | CNAME | `www` | `shops.myshopify.com` | Automatic |

   - Delete any existing A or CNAME record on `@` and `www` first (parking pages break the connection).
   - **Cloudflare only:** set both records to **DNS only** (grey cloud), not Proxied —
     the orange cloud blocks Shopify's SSL provisioning.
5. Back in Shopify, press **Verify connection**. DNS propagation is usually 15–60 minutes
   (can be up to 48 hours).

### Option B — Transfer the domain to Shopify

Settings > Domains > **Transfer domain** — needs the auth/EPP code from the registrar and the
domain must be unlocked and older than 60 days. Takes 5–7 days.

### Set the primary domain

1. Settings > Domains > **Change primary domain** > select the custom domain.
2. Keep **Redirect all domains to this primary domain** ticked, so `ishaya-dev.myshopify.com`
   and the non-primary `www`/apex variant 301 to one canonical URL (important for SEO —
   the theme's `canonical_url` and Open Graph tags follow this setting automatically).

### SSL

Shopify provisions the certificate itself once DNS verifies — nothing to buy or upload.
Settings > Domains shows **SSL pending** then **SSL active** (15 min–24 h). Do not launch while
it still says pending.

### Verify from a terminal

```bash
nslookup yourdomain.com          # must answer 23.227.38.65
nslookup www.yourdomain.com      # must answer shops.myshopify.com
curl -sI https://yourdomain.com  # expect HTTP/2 200 (or 302 to the primary domain)
```

---

## 3. Payment Gateway & Checkout Configuration

1. In Shopify Admin, go to **Settings > Payments**.
2. **Shopify Payments** (in India this is Shopify Payments powered by a local acquirer;
   if unavailable, use Razorpay / PayU / Cashfree from the third-party provider list —
   these need their own KYC with PAN, GST and a business bank account):
   - Activate Shopify Payments with your registered business bank coordinates.
   - Enable digital wallets: **Apple Pay**, **Google Pay**, and **ShopPay**.
   - Enable credit cards: Visa, Mastercard, AMEX, Discover.
3. **Test Mode Verification**:
   - Enable **Test Mode** in Shopify Payments.
   - Run a test transaction using Shopify test card numbers (`4242 4242...`).
   - Verify cart drawer, order summary, shipping calculations, and order confirmation email.
   - **IMPORTANT**: Disable Test Mode before public announcement!

---

## 4. Taxes, Shipping & Fulfilment

1. In Shopify Admin, go to **Settings > Shipping and delivery**:
   - Create shipping zones (Domestic and International).
   - Set standard delivery rates and configure free shipping over the threshold matching your theme setting (e.g. $250).
2. Go to **Settings > Taxes and duties**:
   - Confirm automated tax collection based on your registered tax Nexus.
3. Go to **Settings > Policies**:
   - Confirm that the store policies are entered under **Legal** so that `/policies/shipping-policy`, `/policies/refund-policy`, `/policies/terms-of-service`, and `/policies/privacy-policy` resolve with legal terms.

---

## 5. Notifications & Branding

1. Go to **Settings > Notifications**:
   - Click **Customize email templates**.
   - Upload the **ISHAYA** SVG/PNG wordmark logo.
   - Set accent color to `#ffffff` or `#3b82f6` on dark background to match theme aesthetics.
   - Test **Order confirmation** and **Shipping update** previews.

---

## 6. SEO & 301 URL Redirects

1. If migrating from an existing website or store:
   - Export old URLs.
   - In Shopify Admin, go to **Online Store > Navigation > View URL Redirects**.
   - Create 301 permanent redirects from old product/collection paths to new paths to preserve search engine rankings and prevent 404 errors.
2. Submit your sitemap (`https://yourdomain.com/sitemap.xml`) to **Google Search Console**.

---

## 7. Launch Day Protocol (Removal of Storefront Password)

1. Perform final end-to-end checkout test on mobile and desktop.
2. In Shopify Admin, navigate to **Online Store > Preferences**.
3. Under **Password protection**, uncheck **Restrict access to visitors with the password**.
4. Click **Save**.
5. The **Ishaya** flagship atelier is now officially live to the world!
