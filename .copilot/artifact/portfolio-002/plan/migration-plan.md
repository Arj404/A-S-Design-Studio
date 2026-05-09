# Implementation Plan: Project Pages Migration to `projects/`
**Spec**: portfolio-002  
**Status**: Ready for development

---

## Overview

Move 6 project HTML pages from the site root into a new `projects/` sub-directory, then fix every affected path and URL across all pages and `sitemap.xml`. No other files move.

---

## Step 1 — Create the `projects/` directory

Create the directory `projects/` at the site root. It will be empty until Step 2.

---

## Step 2 — Copy each project page into `projects/`

Copy all 6 files verbatim (no edits yet):

| Source (root) | Destination |
|---|---|
| `chinar-factory-outlet.html` | `projects/chinar-factory-outlet.html` |
| `kapsons-solan.html` | `projects/kapsons-solan.html` |
| `kapkids-cp67.html` | `projects/kapkids-cp67.html` |
| `city-mall-yamunanagar.html` | `projects/city-mall-yamunanagar.html` |
| `kapoor-residence-model-town.html` | `projects/kapoor-residence-model-town.html` |
| `rohini-residence.html` | `projects/rohini-residence.html` |

> Copy first, edit second. This lets you diff cleanly and avoids losing work if an edit step fails.

---

## Step 3 — Fix relative asset paths in each moved page

Each page is now one level deeper, so every `assets/` reference needs a `../` prefix.

**Find → Replace** (apply to all 6 files in `projects/`):

| Pattern | Replacement |
|---|---|
| `href="assets/css/` | `href="../assets/css/` |
| `href="assets/images/` | `href="../assets/images/` |
| `src="assets/images/` | `src="../assets/images/` |
| `src="assets/js/` | `src="../assets/js/` |

**Exact occurrences per file** (verified against source):

- **CSS links** (4 per file) — lines with `main.css`, `components.css`, `responsive.css`, `project-page.css`
- **Favicon links** (3 per file) — lines with `title-logo.png` in `<link rel="icon">` / `<link rel="apple-touch-icon">`
- **Logo `<img>`** (1 per file) — `src="assets/images/general/logo.png"`
- **Project gallery `<img>` tags** (varies, 8–12 per file) — `src="assets/images/projects/...`
- **JS script** (1 per file, last line before `</body>`) — `src="assets/js/main.js"`

---

## Step 4 — Fix internal navigation links in each moved page

All `href="index.html..."` anchors become `href="../index.html..."`.

**Find → Replace** (all 6 files in `projects/`):

| Pattern | Replacement |
|---|---|
| `href="index.html"` | `href="../index.html"` |
| `href="index.html#home"` | `href="../index.html#home"` |
| `href="index.html#work"` | `href="../index.html#work"` |
| `href="index.html#about"` | `href="../index.html#about"` |
| `href="index.html#services"` | `href="../index.html#services"` |
| `href="index.html#contact"` | `href="../index.html#contact"` |

These appear in: nav logo link, nav `<li>` links, `project-hero__back` link, `project-nav__link` "Back to all projects" link, project CTA button, and footer links (7–10 occurrences per file).

---

## Step 5 — Update canonical URL and OG/Twitter URL meta tags in each moved page

For each file, update the 3 URL fields that reference the page's own absolute URL.

**Per-file changes** (use the new `projects/` path):

### `projects/chinar-factory-outlet.html`
```
https://asdesignstudio.com/chinar-factory-outlet.html
→ https://asdesignstudio.com/projects/chinar-factory-outlet.html
```
Applies to:
- `<link rel="canonical" href="...">`
- `<meta property="og:url" content="...">`
- `<meta name="twitter:url" content="...">` (line ~64)

### `projects/kapsons-solan.html`
```
https://asdesignstudio.com/kapsons-solan.html
→ https://asdesignstudio.com/projects/kapsons-solan.html
```

### `projects/kapkids-cp67.html`
```
https://asdesignstudio.com/kapkids-cp67.html
→ https://asdesignstudio.com/projects/kapkids-cp67.html
```

### `projects/city-mall-yamunanagar.html`
```
https://asdesignstudio.com/city-mall-yamunanagar.html
→ https://asdesignstudio.com/projects/city-mall-yamunanagar.html
```

### `projects/kapoor-residence-model-town.html`
```
https://theasdesignstudio.com/kapoor-residence-model-town.html
→ https://asdesignstudio.com/projects/kapoor-residence-model-town.html
```
> ⚠️ This file currently uses the old domain `theasdesignstudio.com` in its canonical/OG tags. Fix the domain to `asdesignstudio.com` at the same time.

### `projects/rohini-residence.html`
```
https://theasdesignstudio.com/rohini-residence.html
→ https://asdesignstudio.com/projects/rohini-residence.html
```
> ⚠️ Same stale domain issue as above — fix to `asdesignstudio.com`.

---

## Step 6 — Update breadcrumb JSON-LD in each moved page

Each page has a `BreadcrumbList` structured-data block. Item 3 (`position: 3`) has an `"item"` field pointing to the page's own old URL.

**Find → Replace** (same URL pairs as Step 5, applied to the `"item":` field inside `<script type="application/ld+json">`):

Example for `chinar-factory-outlet.html`:
```json
"item": "https://asdesignstudio.com/chinar-factory-outlet.html"
→
"item": "https://asdesignstudio.com/projects/chinar-factory-outlet.html"
```

Apply same logic (and domain fix) for all 6 files.

---

## Step 7 — Update project card links in `index.html`

In `index.html`, the work-grid section contains 6 `<a href>` tags pointing to project pages at root. Update each one to the new `projects/` path.

**File**: `index.html`  
**Lines** (approximate; verify in editor): 423, 442, 460, 478, 496, 514

| Old `href` | New `href` |
|---|---|
| `chinar-factory-outlet.html` | `projects/chinar-factory-outlet.html` |
| `kapsons-solan.html` | `projects/kapsons-solan.html` |
| `kapkids-cp67.html` | `projects/kapkids-cp67.html` |
| `city-mall-yamunanagar.html` | `projects/city-mall-yamunanagar.html` |
| `kapoor-residence-model-town.html` | `projects/kapoor-residence-model-town.html` |
| `rohini-residence.html` | `projects/rohini-residence.html` |

---

## Step 8 — Update `sitemap.xml`

`sitemap.xml` contains `<loc>` entries for all 6 project pages. Update each URL to the `projects/` path.

**Find → Replace** in `sitemap.xml`:

| Old `<loc>` | New `<loc>` |
|---|---|
| `.../kapsons-solan.html` | `.../projects/kapsons-solan.html` |
| `.../city-mall-yamunanagar.html` | `.../projects/city-mall-yamunanagar.html` |
| `.../kapkids-cp67.html` | `.../projects/kapkids-cp67.html` |
| `.../chinar-factory-outlet.html` | `.../projects/chinar-factory-outlet.html` |
| `.../kapoor-residence-model-town.html` | `.../projects/kapoor-residence-model-town.html` |
| `.../rohini-residence.html` | `.../projects/rohini-residence.html` |

> Note: sitemap uses `theasdesignstudio.com` as domain for some entries. Keep the existing domain per entry — only add `projects/` to the path; do not change domains in sitemap at this step.

---

## Step 9 — Delete the 6 original root-level files (FR-008)

After verifying the `projects/` copies are correct:

```bash
rm chinar-factory-outlet.html \
   kapsons-solan.html \
   kapkids-cp67.html \
   city-mall-yamunanagar.html \
   kapoor-residence-model-town.html \
   rohini-residence.html
```

> ⚠️ Irreversible. Confirm `projects/` copies look correct in the browser before running.

---

## Step 10 — Verify

Manual checklist before committing:

- [ ] Root directory contains no project HTML files (only `index.html`, `blog.html`, and directories).
- [ ] `projects/` directory contains exactly 6 `.html` files and nothing else.
- [ ] Open each project from `index.html` — all 6 cards navigate correctly.
- [ ] On each project page: no broken images, CSS loads (layout intact), JS loads (nav works).
- [ ] "Back to Projects" / nav links on each project page return to `index.html#work`.
- [ ] View page source of each project page — confirm `canonical`, `og:url`, `twitter:url`, and breadcrumb `item` all show `asdesignstudio.com/projects/<filename>.html`.
- [ ] Run a static link checker (e.g. `npx broken-link-checker http://localhost:PORT`) and confirm 0 broken internal links.

---

## Commit Strategy

Use two atomic commits:

1. **`feat: add projects/ directory with updated project pages`**  
   Includes: `projects/*.html` (all 6 files with all path/URL fixes applied), `index.html` (FR-004), `sitemap.xml` (FR-008).

2. **`feat: remove root-level project HTML files (portfolio-002)`**  
   Deletes: the 6 original root files.

---

## Files Changed Summary

| File | Change Type |
|---|---|
| `projects/chinar-factory-outlet.html` | Created (with path + URL fixes) |
| `projects/kapsons-solan.html` | Created (with path + URL fixes) |
| `projects/kapkids-cp67.html` | Created (with path + URL fixes) |
| `projects/city-mall-yamunanagar.html` | Created (with path + URL fixes) |
| `projects/kapoor-residence-model-town.html` | Created (with path + URL fixes + domain fix) |
| `projects/rohini-residence.html` | Created (with path + URL fixes + domain fix) |
| `index.html` | Updated — 6 `href` values in work grid |
| `sitemap.xml` | Updated — 6 `<loc>` paths |
| `chinar-factory-outlet.html` | Deleted |
| `kapsons-solan.html` | Deleted |
| `kapkids-cp67.html` | Deleted |
| `city-mall-yamunanagar.html` | Deleted |
| `kapoor-residence-model-town.html` | Deleted |
| `rohini-residence.html` | Deleted |

**`blog.html`**: confirmed no links to project pages — no changes required (FR-005 satisfied by absence).
