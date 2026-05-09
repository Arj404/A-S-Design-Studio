---
spec_id: portfolio-004
type: feature
status: approved
approved_by: human
approved_date: 2026-05-09
---

# Spec: New Project Pages — CP Office & Vijay Store
**ID**: portfolio-004  
**Date**: 2026-05-09  
**Status**: Approved

## Overview
Two new project image folders have been added to `assets/images/projects/` but have no corresponding project detail pages or index grid cards. This story creates those pages using the dynamic gallery template from `portfolio-003` and adds the projects to the `index.html` work grid.

## Goals
- Give both new projects a public-facing detail page consistent with all other project pages.
- Add the two new projects to the `index.html` work grid so visitors can discover and navigate to them.
- Ensure SEO metadata (title, description, canonical, OG, JSON-LD) is set up for each new page.

## User Story
- As a site owner, I want published project pages for CP Office and Vijay Store so that these completed projects appear on the portfolio and are discoverable by visitors and search engines.

## Functional Requirements

### New Project 1 — CP Office, Connaught Place
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | Create `projects/cp-office-cp-delhi.html` using the shared template (nav, project-hero, project-description, `GALLERY_CONFIG`-driven gallery, project-nav, CTA, footer). | Must |
| FR-002 | Page meta: title `"CP Office, Connaught Place — Commercial Design Project | The A&S Design Studio"`, category `Commercial Design`, client `CP Office`, location `Connaught Place, New Delhi`, year `2024`. | Must |
| FR-003 | `GALLERY_CONFIG.folder` set to `../assets/images/projects/CpOfficejan2024/` (relative from `projects/`); `images` array populated with all renamed 5-char filenames (depends on `portfolio-001`). | Must |
| FR-004 | Add a project card in `index.html` work grid with `data-category="commercial"`, linking to `projects/cp-office-cp-delhi.html`, using the first image as thumbnail. | Must |
| FR-005 | Canonical URL: `https://asdesignstudio.com/projects/cp-office-cp-delhi.html`. | Must |
| FR-006 | JSON-LD `CreativeWork` structured data with `datePublished: "2024-01-01"`, `genre: "Commercial Architecture"`. | Must |

### New Project 2 — Vijay Store, Delhi
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-007 | Create `projects/vijay-store-delhi.html` using the shared template. | Must |
| FR-008 | Page meta: title `"Vijay Store, Delhi — Retail Design Project | The A&S Design Studio"`, category `Retail Design`, client `Vijay Store`, location `Delhi`, year `2023`. | Must |
| FR-009 | `GALLERY_CONFIG.folder` set to `../assets/images/projects/VijayStoreapril2023/`; `images` array populated with all renamed 5-char filenames. | Must |
| FR-010 | Add a project card in `index.html` work grid with `data-category="retail"`, linking to `projects/vijay-store-delhi.html`, using the first image as thumbnail. | Must |
| FR-011 | Canonical URL: `https://asdesignstudio.com/projects/vijay-store-delhi.html`. | Must |
| FR-012 | JSON-LD `CreativeWork` structured data with `datePublished: "2023-04-01"`, `genre: "Retail Architecture"`. | Must |

### Shared Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-013 | Both pages must include the same nav, footer, and CSS/JS links as all other project pages; CSS paths must use `../assets/…` relative to `projects/`. | Must |
| FR-014 | Both pages must load `assets/js/gallery.js` (with `defer`) for the dynamic gallery. | Must |
| FR-015 | Project description copy for both pages should describe the project concisely (2–3 sentences) and list 4–6 project highlights; placeholder copy is acceptable for now and can be replaced. | Should |

## Non-Functional Requirements
| ID | Requirement | Metric |
|----|-------------|--------|
| NFR-001 | Both pages must render correctly at 375 px, 768 px, 1440 px | Manual visual check |
| NFR-002 | Lighthouse SEO score ≥ 90 on both pages | Lighthouse audit |
| NFR-003 | No broken asset references | 0 network 404s |

## Acceptance Criteria
1. `projects/cp-office-cp-delhi.html` exists and shows all images from `CpOfficejan2024/` via the dynamic gallery.
2. `projects/vijay-store-delhi.html` exists and shows all images from `VijayStoreapril2023/` via the dynamic gallery.
3. Both projects appear as clickable cards in the `index.html` work grid with the correct `data-category` filter.
4. Navigating to each page shows no broken images or layout issues.
5. Canonical, OG, and JSON-LD metadata are correctly set on both pages.
6. "Back to Projects" on both pages navigates to `../index.html#work`.

## Out of Scope
- Final copywriting / SEO-optimised descriptions (placeholder text acceptable for initial release).
- Photography sourcing for hero/thumbnail — uses first available image from the folder.
- Social media promotion of the new pages.

## Dependencies
- `portfolio-001` — images must be renamed before `GALLERY_CONFIG` filenames can be finalised.
- `portfolio-002` — `projects/` directory must exist before these files can be placed there.
- `portfolio-003` — `gallery.js` must exist before these pages can reference it.

## Success Metrics
- Both new projects visible and functional in the live work grid.
- Zero 404s on new pages.

## Existing References
- `index.html` work grid (for adding new project cards).
- [portfolio-003.md](portfolio-003.md) — `gallery.js` and `GALLERY_CONFIG` interface spec.
- Existing project page pattern: `chinar-factory-outlet.html` as reference template.

## Changelog
| Date | Change | Author |
|------|--------|--------|
| 2026-05-09 | Initial draft | Product |
| 2026-05-09 | Approved by human | Product |
