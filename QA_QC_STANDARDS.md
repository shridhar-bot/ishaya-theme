# ISHAYA — QA / QC & Testing Standards

> A phase is not "Done" until it passes this checklist. Re-run relevant sections after every significant change.

---

## 1. Code Quality Gate
- [ ] `shopify theme check` run, zero unresolved errors
- [ ] No hardcoded product/collection data — everything pulled via Liquid objects
- [ ] No duplicate markup — shared UI extracted into `snippets/`
- [ ] All new sections have `{% schema %}` with sensible defaults, editable in Theme Editor
- [ ] No console errors in browser dev tools on any page
- [ ] No unused CSS/JS left in the theme

## 2. Responsive / Cross-Device QA
Test every page/section at these breakpoints minimum:
- [ ] 375px (mobile)
- [ ] 768px (tablet)
- [ ] 1024px (small desktop)
- [ ] 1440px+ (large desktop)
- [ ] No horizontal scroll/overflow at any breakpoint
- [ ] Touch targets (buttons/links) ≥ 44px on mobile

## 3. Cross-Browser QA
- [ ] Chrome
- [ ] Safari (iOS + macOS — layout bugs are common here)
- [ ] Firefox
- [ ] Edge

## 4. Functional QA
- [ ] Navigation links all resolve correctly (no dead links)
- [ ] Search works and returns expected results
- [ ] Add to cart works from: product page, quick-add, collection grid
- [ ] Cart quantity update / remove works
- [ ] Variant selection (size/color) updates price, image, availability correctly
- [ ] Out-of-stock states display correctly (disabled button / "Sold out")
- [ ] Newsletter form submits and shows success/error state
- [ ] Forms show validation errors clearly (email format, required fields)
- [ ] 404 page displays correctly for broken URLs

## 5. Content QA
- [ ] All images have descriptive alt text
- [ ] No placeholder/lorem ipsum text left in final sections
- [ ] No reference-site content, copy, or product names present anywhere (see `PROJECT_BRIEF.md` §2)
- [ ] Spelling/grammar check on all visible copy
- [ ] Pricing displays in correct currency/format

## 6. Performance
- [ ] Lighthouse Performance score ≥ 85 (mobile)
- [ ] Images compressed and served via Shopify CDN (`{{ image | image_url }}`, not raw uploads)
- [ ] Videos compressed, lazy-loaded below the fold
- [ ] No render-blocking third-party scripts in `<head>`
- [ ] Largest Contentful Paint (LCP) under 2.5s on mobile (test in Lighthouse)

## 7. Accessibility
- [ ] Semantic HTML (`<nav>`, `<header>`, `<main>`, `<footer>`, proper heading hierarchy)
- [ ] Keyboard-only navigation works (tab through header, menus, forms, product cards)
- [ ] Color contrast meets WCAG AA (check text on colored/glass backgrounds especially)
- [ ] Focus states visible on all interactive elements

## 8. SEO Basics
- [ ] Every page has a unique, descriptive title/meta description
- [ ] Heading hierarchy logical (one `<h1>` per page)
- [ ] Structured data / Open Graph tags present for product and social sharing
- [ ] `robots.txt` and sitemap not blocking important pages

## 9. Pre-Launch Only (Phase 6)
- [ ] Legal pages complete and accurate (shipping, returns, privacy, terms, contact)
- [ ] Payment gateway tested in test mode
- [ ] Domain + SSL confirmed
- [ ] Google Analytics / Meta Pixel (if used) firing correctly
- [ ] 301 redirects set up if migrating from an existing store
- [ ] Password protection removed before going live

---

## Bug/Issue Log
> Log anything found during QA here with date, so it's not forgotten or duplicated.

| Date | Issue | Section/Page | Status |
|---|---|---|---|
| | | | |
