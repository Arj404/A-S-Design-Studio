---
spec_id: RESIDENCE-001
type: feature
status: approved
approved_by: human
approved_date: 2026-04-30
---

# Spec: Add Residence Projects to Portfolio (Kapoor Residence & Rohini Residence)
**ID**: RESIDENCE-001
**Date**: 2026-04-30
**Status**: Approved

## Overview
Add two completed residential projects — Kapoor Residence (Model Town, New Delhi, 2020) and Rohini Residence (Rohini, Delhi, 2021) — to the A&S Design Studio portfolio website. Each project requires a dedicated project page and a portfolio card on the homepage, replacing the existing residential placeholder cards.

## Goals
- Showcase residential design capability alongside the existing retail/commercial projects.
- Replace placeholder cards with real, photographed/rendered projects to build credibility.
- Improve the `residential` filter tab on the portfolio grid with live content.

## User Story
- As a prospective residential client, I want to see completed home design projects on the portfolio so that I can assess the studio's residential design capability before reaching out.

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | Replace the "Modern Luxury Villa" placeholder card in `index.html` with a Kapoor Residence card linking to `kapoor-residence-model-town.html`. | Must |
| FR-002 | Replace the "Contemporary Home" placeholder card in `index.html` with a Rohini Residence card linking to `rohini-residence.html`. | Must |
| FR-003 | Create `kapoor-residence-model-town.html` — a full project page following the same structure as existing project pages (nav, hero, description, gallery, related projects, footer). | Must |
| FR-004 | Create `rohini-residence.html` — a full project page following the same structure as existing project pages. | Must |
| FR-005 | Gallery for Kapoor Residence uses images from `assets/images/projects/KapoorResidenceModelTownjan2020/` (confirmed files: `1.jpg` through `5.jpg`). | Must |
| FR-006 | Gallery for Rohini Residence uses images from `assets/images/projects/rohiniapril2021/`. ⚠️ **Image files not yet confirmed on disk — this is a pre-condition that must be met before implementation.** | Must |
| FR-007 | Each portfolio card must display: project name, category ("Residential Architecture"), and location. | Must |
| FR-008 | Each project page must include SEO meta tags (title, description, OG tags, Twitter card) and structured data (`CreativeWork` schema + `BreadcrumbList`). | Must |
| FR-009 | Both pages must be added to `sitemap.xml` with a `<url>` entry including `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>`. | Must |
| FR-010 | The `data-category="residential"` attribute must be set on both new portfolio cards so the filter works correctly. | Must |

## Non-Functional Requirements

| ID | Requirement | Metric |
|----|-------------|--------|
| NFR-001 | Page load | Images use `loading="lazy"` consistent with existing pages |
| NFR-002 | Accessibility | All images include descriptive `alt` text |
| NFR-003 | Consistency | HTML structure, CSS classes, and layout match existing project pages exactly |
| NFR-004 | SEO | Canonical URLs use `https://asdesignstudio.com/` base domain |

## Project Details

### Kapoor Residence
| Field | Value |
|-------|-------|
| Project name | Kapoor Residence, Model Town |
| Page filename | `kapoor-residence-model-town.html` |
| Client | Kapoor Family |
| Type | Residential Architecture |
| Location | Model Town, New Delhi |
| Year | 2020 |
| Image folder | `assets/images/projects/KapoorResidenceModelTownjan2020/` |
| Images | `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg` (architectural 3D renders) |
| Hero/card image | `1.jpg` (living room — main view) |
| Brief description | Modern luxury home featuring a contemporary living space with accent wall details, integrated dining, ornate partitions, and a statement staircase with in-step lighting. |

### Rohini Residence
| Field | Value |
|-------|-------|
| Project name | Rohini Residence |
| Page filename | `rohini-residence.html` |
| Client | Rohini Residence Owner |
| Type | Residential Architecture |
| Location | Rohini, Delhi |
| Year | 2021 |
| Image folder | `assets/images/projects/rohiniapril2021/` |
| Images | ⚠️ **To be confirmed** — folder not found on disk at time of spec. User to verify folder exists and provide image filenames before implementation. |
| Hero/card image | First image in folder |
| Brief description | Luxury residential interior design featuring sophisticated space planning and curated material selections. |

## Acceptance Criteria
1. Both residential placeholder cards ("Modern Luxury Villa" and "Contemporary Home") are replaced with live cards for Kapoor Residence and Rohini Residence respectively.
2. Clicking each card navigates to the correct project page.
3. The `residential` filter tab on the portfolio grid shows both new projects.
4. Both project pages render correctly on mobile and desktop.
5. All 5 Kapoor Residence images appear in the gallery; Rohini gallery images all load without 404 errors.
6. SEO meta tags and structured data are present on both pages.
7. Both pages appear in `sitemap.xml`.
8. Page structure passes visual inspection against existing project pages (nav, hero, description, gallery, footer are consistent).

## Pre-conditions / Blockers
- ⚠️ **Rohini image files**: The folder `assets/images/projects/rohiniapril2021/` was not found on disk during spec creation. Images must be added to this folder (or the correct folder name confirmed) before `rohini-residence.html` can be implemented.

## Out of Scope
- Changes to the blog, about, services, or contact sections.
- Adding video support to the gallery (existing `cp67jan2024` project has `.mp4` files, but these residence projects have no video).
- Replacing any retail or commercial placeholder cards.

## Success Metrics
- Both `data-category="residential"` cards show live project images (no SVG placeholders).
- Zero 404 errors on project page images.
- Both project pages are indexed by search engines via sitemap.

## Existing References
- Pattern reference: [chinar-factory-outlet.html](../../chinar-factory-outlet.html) — full project page structure to follow.
- Portfolio card pattern: [index.html](../../index.html) — `#work` section, lines ~420–500.
- Sitemap pattern: [sitemap.xml](../../sitemap.xml).
- Confirmed Kapoor images: `assets/images/projects/KapoorResidenceModelTownjan2020/1.jpg` through `5.jpg`.

## Changelog
| Date | Change | Author |
|------|--------|--------|
| 2026-04-30 | Initial draft | Product |
| 2026-04-30 | Approved by human | Product |
