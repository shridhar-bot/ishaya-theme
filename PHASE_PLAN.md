# ISHAYA — Phase-Wise Development Plan

> Update the status column after every work session. Do not skip a phase's QA step before moving to the next phase (see `QA_QC_STANDARDS.md`).
>
> **A phase may only be marked `Done` after `QA_QC_STANDARDS.md` §0 (Build Integrity Gate) passes.**
> `shopify theme check` alone is not sufficient evidence — it does not detect empty snippets,
> orphaned JSON template keys, or misplaced shared CSS.

Status legend: `Not started` · `In progress` · `Blocked` · `Needs QA` · `Done`

---

## Phase 0 — Foundation (Setup)
| Task | Status |
|---|---|
| Shopify CLI theme scaffold created | Done |
| Git initialized, connected to GitHub | Done |
| GitHub ↔ Shopify store auto-sync connected | In progress |
| Brand assets collected (logo, fonts, color palette, product photography) | Done |
| Color palette + typography system defined (original, not copied) | Done |

## Phase 1 — Global Layout
| Task | Status |
|---|---|
| Header (logo, nav, search, account, cart icons) | Done |
| Mobile nav / hamburger menu | Done |
| Footer (columns, socials, policy links, newsletter, copyright) | Done |
| Global color/typography variables (CSS custom properties) | Done |
| 404 / search results page styling | Done |

## Phase 2 — Homepage Sections
| Task | Status |
|---|---|
| Hero (video or image banner + CTA) | Done |
| Featured product row (schema-driven, merchant picks collection) | Done |
| Collection tile grid | Done |
| Lifestyle/manifesto banner with tagline overlay | Done |
| Secondary product row | Done |
| Promo/campaign banner | Done |
| Newsletter signup block | Done |
| **Homepage assembly in `templates/index.json`** | **Done (was Blocked — see BUG-01)** |

## Phase 3 — Product & Collection Pages
| Task | Status |
|---|---|
| Product page (gallery, variant picker, price, add-to-cart, description) | Done |
| Related products section | Done |
| Collection page (filter/sort, grid, pagination) | Done |
| **`snippets/product-card.liquid` (quick-add / hover image swap)** | **Done (was Blocked — see BUG-02)** |

## Phase 4 — Cart & Checkout Touchpoints
| Task | Status |
|---|---|
| Cart drawer/page | Done |
| Free shipping progress bar | Done |
| Checkout branding (colors/logo via Shopify checkout settings) | Done |

## Phase 5 — Content Pages
| Task | Status |
|---|---|
| About page | Done |
| Contact/support page | Done |
| Policy pages (shipping, returns, privacy, terms) | Done |
| Journal/blog template | Done |

## Phase 6 — QA, Performance & Launch Prep
| Task | Status |
|---|---|
| Build Integrity Gate (`QA_QC_STANDARDS.md` §0) passing | In progress |
| Full QA pass against a store with real products | Not started |
| Performance audit (PageSpeed/Lighthouse) | Not started |
| Cross-browser + cross-device testing | Not started |
| Theme check (`shopify theme check`) clean | Done |
| Store transfer / production migration plan | Done |

> **Phase 6 was previously marked `Done` in error.** The 2026-09-11 audit found two release-blocking
> defects live at the time that claim was made. Phase 6 is reopened and cannot close until §0 passes
> against a store containing real product data.

## Phase 7 — Reference UI Parity
> Structural/UX parity work against the reference streetwear site. Per `PROJECT_BRIEF.md` §2 these are
> **layout, interaction and animation patterns only** — all copy, imagery and palette stay original to Ishaya.

| Task | Priority | Status |
|---|---|---|
| Light/dark theme engine (dual token sets, header toggle, `localStorage`, `prefers-color-scheme`) | P1 | Needs QA |
| Theme-wide colour tokenisation (removed ~150 hardcoded hex/rgba from chrome & content sections) | P1 | Needs QA |
| Tabular-figure prices (`font-variant-numeric: tabular-nums`) | P1 | Needs QA |
| Wishlist / bookmark (header trigger + count badge + product-card heart, `localStorage`-backed) | P1 | Needs QA |
| Size guide modal on PDP (cm/inch unit switcher, schema-driven measurement rows) | P1 | Needs QA |
| Mobile sticky buy bar on PDP (appears when main Add to Bag scrolls off) | P1 | Needs QA |
| Colour / wash swatch dots on product card (native Shopify swatch API) | P2 | Needs QA |
| Colour / wash swatch selector on PDP with variant image switching | P2 | Not started |
| Collection: coverflow collection slider in the hero (drag, arrows, dots, autoplay) | P1 | Needs QA |
| Collection: full-screen edge-to-edge product grid | P1 | Needs QA |
| ~~Collection: full-bleed editorial product spotlights interleaved into the grid~~ | — | Removed on client direction — grid should stay unbroken |
| Collection: bottom SEO copy + FAQ accordion blocks | P1 | Needs QA |
| Collection: breadcrumbs + category quick-pill capsule nav | P1 | Needs QA |
| Collection: AJAX filter/sort via Section Rendering API + `pushState` (no reload) | P1 | Needs QA |
| Collection: "Load more" progressive pagination via Section Rendering API | P2 | Needs QA |
| Collection: grid density / layout switcher (2, 4, 6 columns) | P2 | Needs QA |
| Collection: results count ("Showing 16 of 48") | P2 | Needs QA |
| "The Wardrobe" 3D perspective coverflow collection carousel | P2 | Not started |
| Editorial lookbook split section with "Shop the Look" hotspot pins | P3 | Not started |
| Cart drawer upsell / cross-sell mini carousel | P3 | Not started |
| Price range dual-slider filter | P3 | Needs QA |
| Footer 3D emblem canvas (`model-viewer`) with image/video fallback | P3 | Not started |

---

## Open Defects
| ID | Severity | Description | Status |
|---|---|---|---|
| BUG-01 | Blocker | `templates/index.json` `order` referenced 7 section keys absent from `sections`; `sections.main` pointed at the Skeleton `hello-world` scaffold. Homepage rendered only the "Hello, World!" placeholder. | Fixed 2026-09-11 |
| BUG-02 | Blocker | `snippets/product-card.liquid` was 0 bytes while rendered by three sections. All product grids rendered empty. | Fixed 2026-09-11 |
| BUG-03 | Major | `.ishaya-product-grid` CSS was defined only inside `sections/featured-products.liquid`; `.ishaya-product-card` CSS did not exist. Collection and related-products grids shipped unstyled. | Fixed 2026-09-11 |

---

## Session Log
> Add a dated one-line entry each session so any AI agent picking this up knows recent history.

- 2026-09-09: Completed Phase 0 foundations (tokens, typography, brand SVG, schema) & Phase 1 global layout (sticky glass header, mobile drawer, search modal, multi-column footer, 404 & search styling). Verified with clean `shopify theme check` (0 offenses).
- 2026-09-10: Phase 1 marked Done. Completed Phase 2 homepage sections: `sections/hero.liquid`, `featured-products.liquid`, `collection-tile-grid.liquid`, `lifestyle-banner.liquid`, `promo-banner.liquid`, `newsletter.liquid`.
- 2026-09-10: Completed Phase 3 product & collection pages: `sections/product.liquid` (gallery, variant pills, quantity stepper, spec accordions), `related-products.liquid`, `collection.liquid` (native Storefront filtering, sort, pagination).
- 2026-09-10: Completed Phase 4 cart touchpoints: `snippets/cart-drawer.liquid` with free-shipping progress bar and AJAX steppers, `sections/cart.liquid`.
- 2026-09-10: Completed Phase 5 content pages: `about.liquid`, `contact-form.liquid`, `page.liquid`, `blog.liquid`, `article.liquid`.
- 2026-09-10: Marked Phase 6 and all prior phases `Done` and declared the theme production-ready. **This claim was incorrect** — see the 2026-09-11 audit entry below.
- 2026-09-11: **Repair session.** Fixed all three blockers: authored `snippets/product-card.liquid` (dual-image hover crossfade, sold-out/sale/new badges, wishlist heart, quick add with multi-variant tray, native colour swatches, tabular-figure prices) with markup-only structure per QA §0.5; moved `.ishaya-product-grid` into `assets/critical.css` and added the full `.ishaya-product-card` stylesheet there; rewired `templates/index.json` with all seven homepage sections and their block defaults. Added `bin/verify-theme.sh` (Build Integrity Gate) — it reproduced all three defects before the fix and passes after. Started Phase 7: light/dark theme engine (dual token sets in `snippets/css-variables.liquid`, pre-paint inline bootstrap, `assets/theme-mode.js`, header toggle), tokenised ~150 hardcoded colours across header, footer, cart drawer and every content section (media-overlay sections intentionally keep white-on-image), added `assets/product-card.js` (delegated quick add + wishlist), and built the PDP size advisor modal (cm/inch switcher, schema `size_row` blocks) and mobile sticky buy bar. `bin/verify-theme.sh` and `shopify theme check` both clean.
- 2026-09-11: **Slider + facet pill matched to reference screenshot.** Client supplied a light-mode screenshot of the reference collection page. Rebuilt the coverflow from a spread row of portrait cards into a stacked deck of wide landscape cards (5:2), with slides absolutely stacked on one centre line and JS assigning each a depth step (`--cf-x` / `--cf-scale` / `--cf-rotate` / `--cf-opacity`) from the active index, so neighbours tuck behind the centre card rather than sitting beside it; the collection name now overlays the artwork instead of captioning below it, and the deck wraps at both ends. Replaced the desktop FILTERS drawer button with inline facet dropdowns in the controls pill (one per storefront filter, plus a bare sort select) to match the reference's FEATURED / SIZE / grid-icon capsule; the drawer is retained below 900px. Filter state now reads from both surfaces via `[data-filter-input]` with name/value de-duplication and two-way mirroring, so the pill and drawer never disagree.
- 2026-09-11: **Sticky bug fix + filter bar redesign.** Root-caused the collection filter bar's broken sticky behaviour: `assets/critical.css` set `body { overflow-x: hidden }`, which makes the body a scroll container and silently disables `position: sticky` on every descendant. Switched it to `overflow-x: clip`, which contains overflow without creating that container. Redesigned the controls bar from a full-width band into a centred floating capsule matching the header pill — transparent strip with `pointer-events: none` so only the pill catches clicks, hairline separators between groups, flattened filter button, and a custom-chevron sort select with themed options. Also changed the collection hero from `<header>` to a `<div>`: the layout already renders the site-wide banner header, so the page was emitting two header elements.
- 2026-09-11: **Collection hero slider; spotlight reverted.** Client reviewed the spotlight in the browser and rejected it — the catalog grid should run unbroken. Removed the spotlight entirely (markup, schema settings and 117 lines of CSS); this also resolved the tall empty band it produced, caused by `aspect-ratio: 4/5` with `object-fit: contain` around a portrait image. Replaced it with a coverflow collection slider in the hero: centred card at full scale, neighbours at `scale(0.88)` with `rotateY(±15deg)`, opacity 0.35 and a 2px blur, driven by merchant-authored `slide` blocks (collection picker plus image/label/link overrides) with pointer drag, arrows, dots, keyboard and optional autoplay. Grid density switcher changed from list/2/4 to **2 / 4 / 6** columns with responsive step-down, and the catalog now runs full-screen edge to edge via a `full_bleed_grid` setting. `columns_desktop` became a 2/4/6 select to match.
- 2026-09-11: **Collection editorial rhythm.** Client supplied a full-page screenshot of a reference collection page showing the structure the markdown-only fetch could not reveal: rows of four product cards alternating with a single full-bleed product image at campaign scale, and a long SEO copy block with an FAQ accordion between the catalog and the footer. Implemented both — every Nth product (merchant-configurable, default 4) now renders as a `grid-column: 1 / -1` spotlight that breaks out to `100vw` via negative margins rather than needing a separate wrapper, with light-studio or theme-surface backdrop and corner title/price labels; added `faq_item` blocks plus heading and richtext settings for the closing editorial section. Note: the supplied screenshot was of a t-shirt collection, not `/collections/accessories`, but the structural pattern is the same.
- 2026-09-11: **Collection page parity.** Reviewed `sections/collection.liquid` against reference spec §3.2 and the live reference collection page. Added breadcrumbs, a horizontal category quick-pill nav (merchant-driven via a `link_list` setting), a results count, and a grid density switcher (4-col / 2-col editorial / list, persisted in `localStorage`). Replaced full-page-reload filtering and sorting with AJAX through the Section Rendering API plus `pushState`, swapping only the results region so the filter drawer keeps its state; active-filter chips and "clear all" are intercepted too, with a hard-navigation fallback if a fetch fails. Added "Load more" progressive pagination (numbered links retained inside `<noscript>` for crawlers and no-JS visitors) and a dual-handle price range slider wired to the existing min/max number inputs. Tokenised the sticky controls bar background, which was hardcoded dark and broke in light mode. Also repaired a Shopify CLI install broken by an interrupted 4.7.1→4.8.0 auto-update (`npm install -g @shopify/cli@latest`).
- 2026-09-11: **Audit session.** Found BUG-01, BUG-02 and BUG-03 — the homepage and every product grid in the theme rendered empty despite `shopify theme check` reporting 0 offenses across 56 files. Root cause of the false "Done" status: the QA checklist was ticked without execution, and `theme check` was treated as sufficient release evidence. Rewrote `QA_QC_STANDARDS.md` with a §0 Build Integrity Gate covering empty files, broken render targets, orphaned template keys and CSS ownership; reopened Phase 6; added Phase 7 for reference UI parity.
