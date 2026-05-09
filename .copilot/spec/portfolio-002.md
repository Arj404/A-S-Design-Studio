---
spec_id: portfolio-002
type: feature
status: approved
approved_by: human
approved_date: 2026-05-09
---

# Spec: Project Pages Migration to `projects/` Folder
**ID**: portfolio-002  
**Date**: 2026-05-09  
**Status**: Approved

## Overview
All project detail HTML pages currently live in the site root alongside `index.html`, `blog.html`, and other top-level files. This creates a cluttered root and makes scaling difficult. This story moves all project pages into a dedicated `projects/` sub-directory, updates every internal link and relative asset path, and ensures the site functions identically from a user's perspective after the move.

## Goals
- Organise the file tree so project pages are isolated in `projects/` and the root remains clean.
- Guarantee no broken navigation links, asset paths, or canonical URLs after the move.
- Establish a predictable location for all future project pages.

## User Story
- As a developer, I want all project HTML pages under `projects/` so that the root directory is uncluttered and new project pages have a clear, consistent home.

## Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | The following 6 HTML files shall be moved from the root to `projects/`: `chinar-factory-outlet.html`, `kapsons-solan.html`, `kapkids-cp67.html`, `city-mall-yamunanagar.html`, `kapoor-residence-model-town.html`, `rohini-residence.html`. | Must |
| FR-002 | All relative asset paths inside each moved page (CSS links, JS links, image `src`, logo `src`) must be updated from `assets/…` to `../assets/…` to account for the one-level-deeper location. | Must |
| FR-003 | All "Back to Projects" and internal nav links inside moved pages that point to `index.html` must be updated to `../index.html`. | Must |
| FR-004 | All project card `<a href>` links in `index.html` that reference the old root paths (e.g. `href="chinar-factory-outlet.html"`) must be updated to `projects/chinar-factory-outlet.html`. | Must |
| FR-005 | `blog.html` links (if any) referencing moved project pages must also be updated. | Must |
| FR-006 | Canonical `<link rel="canonical">` and Open Graph `og:url` meta tags inside each moved page must be updated to reflect the new URL path (e.g. `https://asdesignstudio.com/projects/chinar-factory-outlet.html`). | Must |
| FR-007 | Structured-data JSON-LD breadcrumb items and `url` fields inside moved pages must be updated to new paths. | Must |
| FR-008 | The original root-level HTML files shall be deleted after the move; no duplicates should remain. | Must |

## Non-Functional Requirements
| ID | Requirement | Metric |
|----|-------------|--------|
| NFR-001 | Zero broken internal links after migration | Verified by manual click-through of every project card and nav link |
| NFR-002 | Zero broken asset 404s (images, CSS, JS) on moved pages | Browser dev-tools network tab shows no 404s |
| NFR-003 | Canonical URLs must be syntactically valid and match the actual served URL | No canonical mismatch warnings in Google Search Console |

## Acceptance Criteria
1. `projects/` directory exists and contains exactly the 6 moved HTML files.
2. Root directory no longer contains those 6 HTML files.
3. Navigating to each project from `index.html` via the work grid opens the correct page without broken images or layout.
4. Every project page loads its CSS, JS, and images correctly (no 404s in network tab).
5. "Back to Projects" link on each project page navigates back to `index.html#work` correctly.
6. Canonical and OG URL tags reflect the `projects/` path.

## Out of Scope
- `index.html` and `blog.html` themselves — they stay in the root.
- Server-side redirects from old URLs (noted as a follow-up concern but not in scope here).
- SEO redirect strategy for old URLs (to be handled separately if needed).

## Success Metrics
- 0 broken links across all pages as measured by a static link checker.
- Developer confirms root directory contains only: `index.html`, `blog.html`, `assets/`, `projects/`, `.copilot/`.

## Existing References
- 6 project HTML pages currently at root — see [portfolio-001.md](portfolio-001.md) for list.
- `index.html` work grid section (lines ~470–535) contains all project card `<a href>` links.

## Changelog
| Date | Change | Author |
|------|--------|--------|
| 2026-05-09 | Initial draft | Product |
| 2026-05-09 | Approved by human | Product |
