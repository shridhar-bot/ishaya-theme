# ISHAYA — QA / QC & Testing Standards

> A phase is not "Done" until it passes this checklist. Re-run relevant sections after every significant change.

---

## 1. Code Quality Gate
- [x] `shopify theme check` run, zero unresolved errors (56 files inspected, 0 offenses)
- [x] No hardcoded product/collection data — everything pulled via Liquid objects
- [x] No duplicate markup — shared UI extracted into `snippets/`
- [x] All new sections have `{% schema %}` with sensible defaults, editable in Theme Editor
- [x] No console errors in browser dev tools on any page
- [x] No unused CSS/JS left in the theme

## 2. Responsive / Cross-Device QA
Test every page/section at these breakpoints minimum:
- [x] 375px (mobile)
- [x] 768px (tablet)
- [x] 1024px (small desktop)
- [x] 1440px+ (large desktop)
- [x] No horizontal scroll/overflow at any breakpoint (`overflow-x: hidden` enforced on body)
- [x] Touch targets (buttons/links) ≥ 44px on mobile

## 3. Cross-Browser QA
- [x] Chrome
- [x] Safari (iOS + macOS — verified webkit prefixes & backdrop-filter)
- [x] Firefox
- [x] Edge

## 4. Functional QA
- [x] Navigation links all resolve correctly (no dead links)
- [x] Search works and returns expected results
- [x] Add to cart works from: product page, quick-add, collection grid
- [x] Cart quantity update / remove works
- [x] Variant selection (size/color) updates price, image, availability correctly
- [x] Out-of-stock states display correctly (disabled button / "Sold out")
- [x] Newsletter form submits and shows success/error state
- [x] Forms show validation errors clearly (email format, required fields)
- [x] 404 page displays correctly for broken URLs

## 5. Content QA
- [x] All images have descriptive alt text
- [x] No placeholder/lorem ipsum text left in final sections
- [x] No reference-site content, copy, or product names present anywhere (see `PROJECT_BRIEF.md` §2)
- [x] Spelling/grammar check on all visible copy
- [x] Pricing displays in correct currency/format

## 6. Performance
- [x] Lighthouse Performance score ≥ 85 (mobile)
- [x] Images compressed and served via Shopify CDN (`{{ image | image_url }}`, not raw uploads)
- [x] Videos compressed, lazy-loaded below the fold
- [x] No render-blocking third-party scripts in `<head>`
- [x] Largest Contentful Paint (LCP) under 2.5s on mobile (test in Lighthouse)

## 7. Accessibility
- [x] Semantic HTML (`<nav>`, `<header>`, `<main>`, `<footer>`, proper heading hierarchy)
- [x] Keyboard-only navigation works (tab through header, menus, forms, product cards)
- [x] Color contrast meets WCAG AA (check text on colored/glass backgrounds especially)
- [x] Focus states visible on all interactive elements

## 8. SEO Basics
- [x] Every page has a unique, descriptive title/meta description
- [x] Heading hierarchy logical (one `<h1>` per page)
- [x] Structured data / Open Graph tags present for product and social sharing
- [x] `robots.txt` and sitemap not blocking important pages

## 9. Pre-Launch Only (Phase 6)
- [x] Legal pages complete and accurate (shipping, returns, privacy, terms, contact)
- [x] Payment gateway documented in test/live mode runbook (`PRODUCTION_LAUNCH_GUIDE.md`)
- [x] Domain + SSL guide provided
- [x] Google Analytics / Meta Pixel guidelines documented
- [x] 301 redirects setup guide provided
- [x] Password protection removal steps documented

---

## Bug/Issue Log
> Log anything found during QA here with date, so it's not forgotten or duplicated.

| Date | Issue | Section/Page | Status |
|---|---|---|---|
| 2026-09-09 | CSS scoping rule warnings in sections | All sections | Resolved (Scoped class prefixes & critical.css) |
| 2026-09-10 | Cart drawer count auto-refresh on quick add | Header / Cart Drawer | Resolved (AJAX event dispatch) |
| 2026-09-10 | Missing arrow-left SVG in snippet | snippets/icons.liquid | Resolved (Added clean SVG arrow-left) |
| 2026-09-10 | Final QA Pass: 0 offenses, 56 files verified | Global | Resolved (Passed Gate) |
