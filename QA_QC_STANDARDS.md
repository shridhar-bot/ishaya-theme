# ISHAYA — QA / QC & Testing Standards

> A phase is not "Done" until it passes this checklist. Re-run relevant sections after every significant change.
>
> **Legend:** `[x]` verified · `[ ]` not yet verified · `[!]` verified FAILING (must be logged in the Bug Log)
>
> **Honesty rule:** Never tick a box you have not actually executed. A ticked box is a claim that the
> check was run and passed. The 2026-09-11 audit found an all-ticked checklist alongside two
> release-blocking defects — that is the failure mode this rule exists to prevent.

---

## 0. Build Integrity Gate (RUN FIRST — blocks every other gate)

> `shopify theme check` does **not** catch any of the defects below. These checks are mandatory and
> must pass before any phase may be marked `Done`. Run them all via `bin/verify-theme.sh` (§0.6).

- [x] **0.1 — No empty or stub source files.** Every `.liquid` in `sections/` and `snippets/` is larger than
      200 bytes. An empty snippet passes `theme check` cleanly but renders nothing at runtime.
- [x] **0.2 — Every `render` / `include` target exists and is non-empty.** A missing or empty snippet fails
      silently in Liquid — no error, no output, no theme-check offense.
- [x] **0.3 — Every JSON template's `order` array only references keys present in its `sections` object.**
      Shopify silently drops orphan keys, so the section simply never renders. Also assert that no
      production template still points at the Skeleton scaffold (`hello-world`, `custom-section`).
- [x] **0.4 — Every `type` referenced in a JSON template has a matching `sections/<type>.liquid` file.**
- [x] **0.5 — CSS ownership is correct.** Any class used by a *snippet*, or by more than one section, must be
      defined in `assets/critical.css` — never inside a single section's `{% style %}` block. Section-scoped
      styles only ship when that section is on the page, so a shared class defined there is unstyled everywhere else.
- [x] **0.6 — `bin/verify-theme.sh` exits 0.** Automates 0.1–0.4. Run before every commit, alongside `theme check`.

## 1. Code Quality Gate
- [x] `shopify theme check` run, zero unresolved errors (56 files, 0 offenses — 2026-09-18)
- [x] No hardcoded product/collection data — everything pulled via Liquid objects
- [x] No duplicate markup — shared UI extracted into `snippets/`
- [x] All new sections have `{% schema %}` with sensible defaults, editable in Theme Editor
- [ ] Every homepage-eligible section declares a `presets` block (without it a merchant cannot add the section in the Theme Editor)
- [x] No console errors in browser dev tools on any page
- [ ] No unused CSS/JS left in the theme

## 2. Responsive / Cross-Device QA
Test every page/section at these breakpoints minimum:
- [x] 375px (mobile)
- [x] 768px (tablet)
- [x] 1024px (small desktop)
- [x] 1440px+ (large desktop)
- [x] No horizontal scroll/overflow at any breakpoint (`overflow-x: clip` on body — measured `scrollWidth <= innerWidth` on every page)
- [ ] Touch targets (buttons/links) at least 44px on mobile

## 3. Cross-Browser QA
- [x] Chrome
- [ ] Safari (iOS + macOS — verify webkit prefixes and `backdrop-filter` fallback)
- [ ] Firefox
- [ ] Edge

## 4. Functional QA
> Every item here must be exercised against a store with **at least one real product and collection**.
> An empty dev store renders onboarding placeholders, which will mask a completely broken product grid.

- [ ] Navigation links all resolve correctly (no dead links)
- [ ] Search works and returns expected results
- [ ] **Product cards actually render** on: homepage featured row, collection page, related products, search results
- [ ] Add to cart works from: product page, quick-add, collection grid
- [ ] Cart quantity update / remove works
- [ ] Variant selection (size/color) updates price, image, availability correctly
- [ ] Out-of-stock states display correctly (disabled button / "Sold out")
- [ ] Newsletter form submits and shows success/error state
- [ ] Forms show validation errors clearly (email format, required fields)
- [x] 404 page displays correctly for broken URLs
- [x] Theme (light/dark) preference persists across page loads and respects `prefers-color-scheme` on first visit

## 5. Content QA
- [ ] All images have descriptive alt text
- [ ] No placeholder/lorem ipsum text left in final sections
- [x] **No Shopify Skeleton scaffold content reachable** — "Hello, World!", "The Skeleton theme is a minimal…", `shoppy-x-ray.svg`
- [ ] No reference-site content, copy, or product names present anywhere (see `PROJECT_BRIEF.md` §2)
- [ ] Spelling/grammar check on all visible copy
- [x] Pricing displays in correct currency/format

## 6. Performance
- [ ] Lighthouse Performance score at least 85 (mobile)
- [ ] Images compressed and served via Shopify CDN (`image_url`, not raw uploads)
- [ ] Videos compressed, lazy-loaded below the fold
- [ ] No render-blocking third-party scripts in `<head>`
- [ ] Largest Contentful Paint (LCP) under 2.5s on mobile
- [x] Below-fold images use `loading="lazy"`; the LCP/hero image does **not**

## 7. Accessibility
- [x] Semantic HTML (`<nav>`, `<header>`, `<main>`, `<footer>`, proper heading hierarchy)
- [ ] Keyboard-only navigation works (tab through header, menus, forms, product cards)
- [x] Color contrast meets WCAG AA **in both light and dark themes**
- [ ] Focus states visible on all interactive elements
- [ ] All animation respects `prefers-reduced-motion`

## 8. SEO Basics
- [ ] Every page has a unique, descriptive title/meta description
- [x] Heading hierarchy logical (one `<h1>` per page)
- [ ] Structured data / Open Graph tags present for product and social sharing
- [ ] `robots.txt` and sitemap not blocking important pages

## 9. Pre-Launch Only (Phase 6)
- [ ] Legal pages complete and accurate (shipping, returns, privacy, terms, contact)
- [ ] Payment gateway documented in test/live mode runbook (`PRODUCTION_LAUNCH_GUIDE.md`)
- [ ] Domain + SSL guide provided
- [ ] Google Analytics / Meta Pixel guidelines documented
- [ ] 301 redirects setup guide provided
- [ ] Password protection removal steps documented

---

## Bug/Issue Log
> Log anything found during QA here with date, so it's not forgotten or duplicated.

| Date | Issue | Section/Page | Status |
|---|---|---|---|
| 2026-09-09 | CSS scoping rule warnings in sections | All sections | Resolved (scoped class prefixes & critical.css) |
| 2026-09-10 | Cart drawer count auto-refresh on quick add | Header / Cart Drawer | Resolved (AJAX event dispatch) |
| 2026-09-10 | Missing arrow-left SVG in snippet | snippets/icons.liquid | Resolved (added arrow-left SVG) |
| 2026-09-11 | **BLOCKER** — `templates/index.json` `order` listed 7 section keys with no matching entry in `sections`, and `sections.main` still pointed at the Skeleton `hello-world` scaffold. The homepage rendered the "Hello, World!" placeholder and nothing else. | templates/index.json | Resolved 2026-09-11 |
| 2026-09-11 | **BLOCKER** — `snippets/product-card.liquid` was 0 bytes while being rendered by `collection.liquid`, `featured-products.liquid` and `related-products.liquid`. All product grids site-wide rendered empty. | snippets/product-card.liquid | Resolved 2026-09-11 |
| 2026-09-11 | `.ishaya-product-grid` CSS lived only inside `sections/featured-products.liquid`, so the collection and related-products grids shipped unstyled. `.ishaya-product-card` CSS did not exist anywhere. | CSS ownership | Resolved 2026-09-11 |
| 2026-09-11 | QA checklist and PHASE_PLAN were fully ticked / marked Done while the blockers above were live. Added §0 Build Integrity Gate and the honesty rule to prevent recurrence. | Process | Resolved |
| 2026-09-13 | Header wishlist icon linked to an empty search page instead of opening anything; no mobile trigger; saved IDs unresolvable client-side (BUG-04). Fixed with `snippets/wishlist-drawer.liquid` + `{ id, handle }` storage. Verified in a headless-Chrome harness: heart toggle, badge count, drawer open/close/Esc, item render, remove, clear. Still needs a pass on the live store with real products. | Header / product-card / wishlist drawer | Resolved 2026-09-13 |
| 2026-09-13 | **BLOCKER** — heart + quick-add unclickable on live: title-link `::after` overlay above the isolated media wrapper (BUG-05). Fixed with `z-index: 2` on `.ishaya-product-card__media-wrapper`. Verified on the live dev theme via headless Chrome. Lesson: an isolated harness missing sibling markup can pass while the real page fails — test overlay hit-targets on the real store. | snippets/product-card / critical.css | Resolved 2026-09-13 |
| 2026-09-13 | PDP breadcrumbs rendered under the fixed floating header pill (section `padding-top` was ~2.5rem; the pill occupies ~4rem). Set `.ishaya-pdp` to 5.5rem / 4.5rem mobile to match the collection page. Verified by screenshot on the live dev theme at 1400px and 400px. | sections/product.liquid | Resolved 2026-09-13 |
| 2026-09-13 | Collection grid density switcher stuck on 6 columns: `applyLayout()` stripped `--cols-2/3/4/list` but never `--cols-6`, so once chosen it stayed on the grid and (declared last in `critical.css`) beat 2 and 4. A stale `list` value from the old switcher in `localStorage` also produced a class with no CSS. Now strips every `--cols-*` class and ignores values outside 2/4/6. Verified live: 6→4→2→6→2 each apply exactly one class and the matching column count. | sections/collection.liquid | Resolved 2026-09-13 |
| 2026-09-15 | PDP rendered `Liquid error (sections/product line 159): invalid url input` once per variant when a variant had no featured media — `image_url` on a nil media throws. Guarded with `{% if variant.featured_media %}`; the JS already handles an empty `data-featured-media-src`. | sections/product.liquid | Resolved 2026-09-15 |
| 2026-09-18 | Light-mode audit (client screenshot: footer accordion + newsletter cards black with invisible headings). Root cause: ~30 hardcoded dark values left across about/article/blog/cart/collection/contact/footer/page/product/promo-banner + cart-drawer/mobile-drawer/search-modal. All tokenised (`--color-surface`, `--color-muted`, `--glass-scrim`, `--shadow-floating`). Media-overlay sections (hero, manifesto) now carry `.ishaya-dark-scope`, which re-declares the dark token set locally so nested `.btn--primary` / `.glass-panel` / muted text stay legible in light mode instead of inverting on the dark artwork. Also fixed: sold-out card badge text invisible in light mode; cart page heading under the fixed header + overlapping meta row on mobile; wishlist drawer footer showing while empty (`display:flex` beat `[hidden]`). Verified via full-page light-mode screenshots of home, collection, PDP, cart + all three drawers at 375px. | theme-wide | Resolved 2026-09-18 |
| 2026-09-18 | **Security review.** Reflected XSS on the search page: `search.terms` was passed unescaped into the `_html` translation keys (`/search?q=<img onerror=…>` executed). Also unescaped customer-controlled output in contact / newsletter / article-comment form re-population values, comment author, `cart.note` textareas (`</textarea>` breakout) and `current_tags` in `<title>`. All now `| escape` (search terms via an `assign` so the filter binds to the term, not the translation). Reviewed JS sinks: `innerHTML` only receives static markup or Shopify Section-Rendering HTML; wishlist/cart drawers use `textContent`; `localStorage` reads validated (theme value whitelist, wishlist entries shape-checked, JSON.parse in try/catch); handles `encodeURIComponent`-ed; no third-party scripts, no inline event handlers with data, `target=_blank` links carry `rel=noopener`. Shopify supplies HSTS, `X-Frame-Options: DENY`, `frame-ancestors 'none'`, nosniff. Verified live: payload now renders as text. | theme-wide | Resolved 2026-09-18 |
| 2026-09-18 | **Final QA pass before live upload.** Removed the Skeleton scaffold still shipping in the theme (`sections/hello-world.liquid`, `sections/custom-section.liquid` — both had presets, so a merchant could have added "Hello, World!" from the editor) and three unused SVG assets. Automated sweep on the live dev theme: 11 page types × 4 breakpoints (375/768/1024/1440) × dark+light = 88 renders — zero horizontal overflow, zero Liquid errors, zero theme JS errors, one `<h1>` everywhere. Gate + theme check clean, JS `node --check`, all JSON/schema parsed. Known: `/pages/about` and `/pages/contact` 404 until the merchant creates those pages; some mobile tap targets (breadcrumb/footer links, slider dots) are under 44px; Safari/Firefox/Edge and Lighthouse not run — see §3/§6. | theme-wide | Logged |
