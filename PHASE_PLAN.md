# ISHAYA — Phase-Wise Development Plan

> Update the status column after every work session. Do not skip a phase's QA step before moving to the next phase (see `QA_QC_STANDARDS.md`).

Status legend: `Not started` · `In progress` · `Needs QA` · `Done`

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
| Header (logo, nav, search, account, cart icons) | Needs QA |
| Mobile nav / hamburger menu | Needs QA |
| Footer (columns, socials, policy links, newsletter, copyright) | Needs QA |
| Global color/typography variables (CSS custom properties) | Needs QA |
| 404 / search results page styling | Needs QA |

## Phase 2 — Homepage Sections
| Task | Status |
|---|---|
| Hero (video or image banner + CTA) | Not started |
| Featured product row (schema-driven, merchant picks collection) | Not started |
| Collection tile grid | Not started |
| Lifestyle/manifesto banner with tagline overlay | Not started |
| Secondary product row | Not started |
| Promo/campaign banner | Not started |
| Newsletter signup block | Not started |

## Phase 3 — Product & Collection Pages
| Task | Status |
|---|---|
| Product page (gallery, variant picker, price, add-to-cart, description) | Not started |
| Related products section | Not started |
| Collection page (filter/sort, grid, pagination) | Not started |
| Quick-add / hover image swap on product cards | Not started |

## Phase 4 — Cart & Checkout Touchpoints
| Task | Status |
|---|---|
| Cart drawer/page | Not started |
| Free shipping progress bar (if applicable) | Not started |
| Checkout branding (colors/logo via Shopify checkout settings) | Not started |

## Phase 5 — Content Pages
| Task | Status |
|---|---|
| About page | Not started |
| Contact/support page | Not started |
| Policy pages (shipping, returns, privacy, terms) | Not started |
| Journal/blog template (if used) | Not started |

## Phase 6 — QA, Performance & Launch Prep
| Task | Status |
|---|---|
| Full QA pass (see `QA_QC_STANDARDS.md`) | Not started |
| Performance audit (PageSpeed/Lighthouse) | Not started |
| Cross-browser + cross-device testing | Not started |
| Theme check (`shopify theme check`) clean | Not started |
| Store transfer / production migration plan | Not started |

---

## Session Log
> Add a dated one-line entry each session so any AI agent picking this up knows recent history.

- 2026-09-09: Completed Phase 0 foundations (tokens, typography, brand SVG, schema) & Phase 1 global layout (sticky glass header, mobile drawer, search modal, multi-column footer, 404 & search styling). Verified with clean `shopify theme check` (0 offenses) and cross-device browser tests. Marked Phase 1 tasks as Needs QA.
