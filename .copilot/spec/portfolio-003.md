---
spec_id: portfolio-003
type: feature
status: approved
approved_by: human
approved_date: 2026-05-09
---

# Spec: Dynamic Gallery Template for Project Pages
**ID**: portfolio-003  
**Date**: 2026-05-09  
**Status**: Approved

## Overview
Project detail pages currently have hardcoded `<img>` tags in the gallery section. As a result, adding new images to a project folder requires manual HTML edits, and existing pages that had images added after initial creation fail to show the new files. This story introduces a data-driven gallery system: each project page declares a list of its images (in a small inline JSON or data attribute), and a shared JavaScript module renders the full gallery — every image, regardless of count — using a consistent CSS grid layout.

## Goals
- Decouple gallery content from page markup so adding images never requires touching HTML gallery structure.
- Guarantee all images for a project are always shown, regardless of how many there are (2 or 50).
- Provide a single shared gallery template/component so every project page looks and behaves identically.
- Make the gallery responsive and performant (lazy-loading, appropriate sizing).

## User Story
- As a site owner, I want to list a project's images once in a simple data structure so that all images are automatically rendered in the gallery — I never need to write repetitive `<img>` HTML again.
- As a visitor, I want to see every photo in a project gallery without pagination or hidden images so I get the full picture of each project.

## Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | A shared JavaScript module (`assets/js/gallery.js`) shall accept an array of image filenames + folder path and render them into a designated `<div id="project-gallery">` container. | Must |
| FR-002 | Each project page shall declare its gallery data as an inline `<script>` block with a `window.GALLERY_CONFIG` object containing: `folder` (relative path from `projects/` page), `images` (array of filenames), `projectName` (string for alt text). | Must |
| FR-003 | `gallery.js` must render ALL images in the provided array — no cap, no pagination. | Must |
| FR-004 | The rendered gallery layout must use the same CSS grid defined in `assets/css/project-page.css` (`.project-gallery__grid`), applying the same large/wide/standard variation classes for visual rhythm. A pattern shall cycle for groups of images (e.g. every 6 images follows the pattern: large, standard, standard, wide, standard, standard). | Must |
| FR-005 | Each rendered `<img>` must have a descriptive `alt` attribute using the format `"<projectName> — Photo <n>"`. | Must |
| FR-006 | All images must use `loading="lazy"` except the first image which uses `loading="eager"`. | Must |
| FR-007 | All existing project pages must be refactored to use `gallery.js` + `GALLERY_CONFIG`, replacing the current hardcoded `<img>` blocks. | Must |
| FR-008 | The new project pages created in `portfolio-004` must also use this template from the start. | Must |
| FR-009 | Video files (`.mp4`, `.mov`, `.webm`) in a project folder must also be supported in `GALLERY_CONFIG` via an optional `videos` array; `gallery.js` renders them as `<video controls>` elements within the same grid. | Should |

## Non-Functional Requirements
| ID | Requirement | Metric |
|----|-------------|--------|
| NFR-001 | Gallery renders correctly with as few as 1 image and as many as 50+ | Manual test with varying counts |
| NFR-002 | No layout breakage at 375 px, 768 px, 1440 px viewports | Visual regression check |
| NFR-003 | `gallery.js` must not depend on any third-party library — vanilla JS only | Code review |
| NFR-004 | First Contentful Paint not degraded — `gallery.js` loaded with `defer` | Lighthouse score maintained |

## Acceptance Criteria
1. `assets/js/gallery.js` exists and is loaded (with `defer`) on all project pages.
2. Removing or adding a filename from a page's `GALLERY_CONFIG.images` array and refreshing the browser shows the updated gallery with no other HTML changes needed.
3. The Chinar Factory Outlet page (12 images) shows all 12. Kapoor Residence page (5 images) shows all 5. Both use the same grid layout rhythm.
4. Kapkids CP67 page shows its 2 video files rendered as `<video controls>` elements within the gallery grid.
5. Gallery is usable on mobile (375 px) — images stack cleanly, no overflow.
6. No JavaScript errors in browser console on any project page.

## Out of Scope
- A CMS or server-side directory scanning (images must still be explicitly listed in `GALLERY_CONFIG`).
- Lightbox / full-screen image viewer (future enhancement).
- Image optimisation / format conversion.

## Success Metrics
- All 8 project pages show 100% of their images post-implementation.
- Zero console errors on any project page.
- Lighthouse Performance score remains ≥ 80 on mobile.

## Existing References
- `assets/css/project-page.css` — defines `.project-gallery__grid`, `.project-gallery__item--large`, `.project-gallery__item--wide`.
- `assets/js/main.js` — existing vanilla JS for nav and filters; `gallery.js` must not conflict.
- All current project pages under `projects/` after `portfolio-002` is implemented.

## Changelog
| Date | Change | Author |
|------|--------|--------|
| 2026-05-09 | Initial draft | Product |
| 2026-05-09 | Approved by human | Product |
