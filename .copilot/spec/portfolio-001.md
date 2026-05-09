---
spec_id: portfolio-001
type: feature
status: approved
approved_by: human
approved_date: 2026-05-09
---

# Spec: Image Rename — 5-Character Random Filenames
**ID**: portfolio-001  
**Date**: 2026-05-09  
**Status**: Approved

## Overview
All project image (and video) files across the site currently have long, device-generated names such as `IMG_1873.webp`, `IMG-20251016-WA0012.webp`, and `1.jpg`. These need to be replaced with short, random 5-character alphanumeric codes (e.g. `a3f9k.webp`) that are consistent, compact, and do not leak device or timestamp metadata. Every HTML reference to those files must be updated atomically so no broken links result.

## Goals
- Remove verbose, metadata-leaking device filenames from the public web.
- Achieve short, uniform filenames that load faster in URLs and are easier to work with.
- Ensure zero broken image/video references across all HTML pages after the rename.

## User Story
- As a site owner, I want all project media files renamed to compact 5-char codes so that the site URLs are clean, uniform, and free of device-generated metadata.

## Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | Every image file (`jpg`, `jpeg`, `webp`, `png`, `gif`) inside `assets/images/projects/` shall be renamed to a unique 5-character lowercase alphanumeric string, preserving its original file extension. | Must |
| FR-002 | Every video file (`mp4`, `mov`, `webm`) inside `assets/images/projects/` shall also be renamed under the same scheme. | Must |
| FR-003 | No two files across the entire `assets/images/` tree shall share the same 5-character base name after renaming. | Must |
| FR-004 | All `src`, `href`, `content`, and `srcset` attribute values in every HTML file that reference the renamed files must be updated to the new names in the same operation. | Must |
| FR-005 | Structured-data JSON-LD `image` arrays inside `<script type="application/ld+json">` blocks must also be updated to new filenames. | Must |
| FR-006 | Files in `assets/images/general/` and `assets/images/team/` (non-project images) shall NOT be renamed. | Must |
| FR-007 | A rename mapping log (`assets/images/projects/rename-map.json`) shall be produced and committed alongside the changes, listing `{ "old": "original-name.webp", "folder": "ChinarOct2025", "new": "a3f9k.webp" }` for every renamed file. | Should |

## Non-Functional Requirements
| ID | Requirement | Metric |
|----|-------------|--------|
| NFR-001 | No broken image or video references after rename | 0 HTTP 404s for media paths |
| NFR-002 | Rename script must be idempotent — running it twice must not double-rename | Re-run produces no change |
| NFR-003 | Generated names must use only `[a-z0-9]` to be URL-safe without encoding | Validated by regex |

## Acceptance Criteria
1. Every file in each of the following folders has been renamed to a unique 5-char code:
   - `ChinarOct2025/` (12 `.webp`)
   - `KapsonsSolanOct2023/` (9 `.webp`)
   - `cp67jan2024/` (3 `.jpg`, 2 `.mp4`)
   - `Yamunanagar City Mall/` (7 `.jpg`)
   - `KapoorResidenceModelTownjan2020/` (5 `.jpg`)
   - `rohiniapril2021/` (5 `.jpg`)
   - `CpOfficejan2024/` (all files)
   - `VijayStoreapril2023/` (all files)
2. Opening every HTML page (`index.html`, all 6 existing project pages, `blog.html`) in a browser shows no broken images.
3. `rename-map.json` exists and every renamed file has an entry.
4. Files in `assets/images/general/` and `assets/images/team/` are unchanged.

## Out of Scope
- Renaming the project **folder** names (e.g. `ChinarOct2025/` stays as-is).
- Renaming non-image/video assets (CSS, JS, fonts).
- CDN cache invalidation (out of scope for this task).

## Success Metrics
- 0 broken media references detected via link checker post-rename.
- All filenames match regex `^[a-z0-9]{5}\.[a-z0-9]+$`.

## Existing References
- `assets/images/projects/` — 6 project subfolders, ~43 files total today.
- HTML files that contain image references: `index.html`, `chinar-factory-outlet.html`, `kapsons-solan.html`, `kapkids-cp67.html`, `city-mall-yamunanagar.html`, `kapoor-residence-model-town.html`, `rohini-residence.html`, `blog.html`.

## Changelog
| Date | Change | Author |
|------|--------|--------|
| 2026-05-09 | Initial draft | Product |
| 2026-05-09 | Approved by human | Product |
