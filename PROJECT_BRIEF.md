# ISHAYA — Shopify Theme Project Brief

> **READ THIS FILE FIRST** before making any code changes. This is the source of truth for project scope, standards, and constraints.

---

## 1. Project Overview

- **Brand:** Ishaya
- **Industry:** Streetwear / apparel (D2C)
- **Platform:** Shopify (Online Store 2.0, Liquid + JSON templates)
- **Repo:** GitHub-connected theme repo (`ishaya-theme`)
- **Store type:** Development store (Partner account), to be transferred/migrated to production store later

## 2. Design Direction (IMPORTANT — read carefully)

The homepage **structure and UX pattern** is inspired by a reference streetwear site (full-width video hero, product grid rows, collection tile grid, manifesto/lifestyle banner, promo banner, newsletter block, multi-column footer). This is a **layout/UX pattern reference only.**

**Hard rules — do not violate:**
- Do NOT copy the reference site's brand name, logo, taglines, product names, product copy, or marketing copy verbatim.
- Do NOT reuse or scrape the reference site's images, videos, or media assets.
- Do NOT reuse the reference site's exact color hex values or visual identity as-is.
- All copy, imagery, color palette, and brand voice for Ishaya must be **original**.
- Structural/UX patterns (grid layouts, section ordering, hover interactions, animation *types*) are fair game to draw inspiration from — these are generic ecommerce UX patterns, not proprietary content.

If unsure whether something is "structure" (safe) or "content/branding" (not safe to copy), default to NOT copying and flag it for review.

## 3. Tech Stack & Standards

- Shopify **Online Store 2.0** — all homepage sections must use `{% schema %}` JSON so merchant can reorder/edit/remove blocks in the Theme Editor.
- Liquid + native Shopify objects (no hardcoded product data).
- Vanilla CSS/SCSS + minimal JS (or theme's existing JS framework) — avoid unnecessary heavy libraries.
- Mobile-first responsive build — every section must be tested at 375px, 768px, 1024px, 1440px.
- Accessibility: semantic HTML, alt text on all images, keyboard navigation on nav/menus, sufficient color contrast.
- Performance: lazy-load below-fold images/videos, compress video assets, avoid render-blocking scripts.
- Follow Shopify Theme Store code quality requirements even though this won't be submitted to Theme Store — treat it as the quality bar.
- Run `shopify theme check` before every commit — zero errors, warnings reviewed and justified if not fixed.

## 4. File/Folder Conventions

- Sections: `sections/[section-name].liquid` — one purpose per section, schema-driven settings.
- Snippets: reusable small pieces (`snippets/product-card.liquid` etc.) — do not duplicate markup across sections.
- Naming: kebab-case for all files.
- Every new section must have a matching entry added to `PHASE_PLAN.md` progress tracker.

## 5. Related Documents

- `PHASE_PLAN.md` — phase-wise build order and current status (update after every session)
- `QA_QC_STANDARDS.md` — testing checklist, must pass before marking any phase complete
- `CLAUDE.md` / `AGENTS.md` — AI agent operating instructions for this repo
