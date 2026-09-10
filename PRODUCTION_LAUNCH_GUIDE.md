# ISHAYA — Production Launch & Store Migration Guide

This document provides the complete operational protocol for transferring, configuring, and launching the **Ishaya** Shopify theme into live production.

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

1. In Shopify Admin, navigate to **Settings > Domains**.
2. Click **Connect existing domain** (or **Buy new domain**).
3. If connecting an external registrar (Cloudflare, GoDaddy, Namecheap):
   - **A Record**: Point `@` to Shopify IP `23.227.38.65`
   - **CNAME Record**: Point `www` to `shops.myshopify.com`
4. Set the primary domain (e.g., `https://ishaya.com` with redirect from `www` or vice versa).
5. Allow up to 24 hours for automatic SSL certificate provisioning (usually active within 15–45 minutes).

---

## 3. Payment Gateway & Checkout Configuration

1. In Shopify Admin, go to **Settings > Payments**.
2. **Shopify Payments**:
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
