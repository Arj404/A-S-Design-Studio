## Plan: Dynamic Gallery Template for Project Pages
**ID**: portfolio-003  
**Date**: 2026-05-09  
**Spec**: .copilot/spec/portfolio-003.md

Inject `window.GALLERY_CONFIG` into every existing project page so the already-implemented `gallery.js` has data to render. Fix one defensive bug in `gallery.js`. Remove two stale inline `<style>` blocks. Update `rename-images.js` so future renames propagate to project sub-pages.

---

## Pre-flight Context

| File | Status |
|---|---|
| `assets/js/gallery.js` | Fully implemented. Reads `window.GALLERY_CONFIG`, populates `#project-gallery`. |
| All 6 project pages | Have `<div id="project-gallery" class="project-gallery__grid"></div>` but **no `GALLERY_CONFIG` script** → gallery renders empty. |
| `kapkids-cp67.html` | Needs both `images[]` and `videos[]` (2 MP4 files exist in folder). |
| `gallery.js` line `config.videos.forEach` | Throws if `videos` is omitted — needs defensive guard. |

---

## Steps

### Step 1 — Patch `gallery.js`: guard against missing `videos`

**File**: [assets/js/gallery.js](../../../../assets/js/gallery.js)

Change:
```
config.videos.forEach(function(f, i) {
```
To:
```
(config.videos || []).forEach(function(f, i) {
```

This prevents a `TypeError` on any page whose `GALLERY_CONFIG` omits the `videos` key.

---

### Step 2 — Add `GALLERY_CONFIG` to `chinar-factory-outlet.html`

**File**: [projects/chinar-factory-outlet.html](../../../../projects/chinar-factory-outlet.html)

Insert the following `<script>` block immediately before the `<script src="../assets/js/gallery.js" defer>` tag in the `<head>`:

```html
<script>
  window.GALLERY_CONFIG = {
    folder: '../assets/images/projects/ChinarOct2025/',
    projectName: 'Chinar Factory Outlet',
    images: [
      '23d60.webp', '24408.webp', '26ad6.webp', '3b9df.webp',
      '49dd6.webp', '5ab82.webp', '6c021.webp', '6dcd9.webp',
      '82faf.webp', '88f03.webp', '99295.webp', 'ec244.webp'
    ],
    videos: []
  };
</script>
```

Also remove the dead `<style display="none">` block near the bottom of the file (it duplicates CSS already in `project-page.css`).

---

### Step 3 — Add `GALLERY_CONFIG` to `kapkids-cp67.html`

**File**: [projects/kapkids-cp67.html](../../../../projects/kapkids-cp67.html)

Insert immediately before the `<script src="../assets/js/gallery.js" defer>` tag:

```html
<script>
  window.GALLERY_CONFIG = {
    folder: '../assets/images/projects/cp67jan2024/',
    projectName: 'Kapkids CP67',
    images: [
      '24ea2.jpeg', '34997.jpeg', '5489e.jpeg', '57999.jpg',
      '6f462.jpg', '78426.jpeg', '83309.jpg', '84238.jpeg'
    ],
    videos: ['08c62.mp4', '091e2.mp4']
  };
</script>
```

Also remove the live (non-`display:none`) duplicate `<style>` block at the bottom of this file — it re-declares styles already in `project-page.css` and will conflict.

---

### Step 4 — Add `GALLERY_CONFIG` to `kapsons-solan.html`

**File**: [projects/kapsons-solan.html](../../../../projects/kapsons-solan.html)

Insert immediately before the `gallery.js` script tag:

```html
<script>
  window.GALLERY_CONFIG = {
    folder: '../assets/images/projects/KapsonsSolanOct2023/',
    projectName: 'Kapsons Solan',
    images: [
      '3e6b8.webp', '4d841.webp', '68a62.webp', '93797.webp',
      'c5e8c.webp', 'ce3d0.webp', 'e066e.png', 'e878e.webp',
      'f0058.webp', 'fcc88.webp'
    ],
    videos: []
  };
</script>
```

---

### Step 5 — Add `GALLERY_CONFIG` to `kapoor-residence-model-town.html`

**File**: [projects/kapoor-residence-model-town.html](../../../../projects/kapoor-residence-model-town.html)

Insert immediately before the `gallery.js` script tag:

```html
<script>
  window.GALLERY_CONFIG = {
    folder: '../assets/images/projects/KapoorResidenceModelTownjan2020/',
    projectName: 'Kapoor Residence, Model Town',
    images: [
      '03782.jpg', '0d6f5.jpg', '0e728.jpg', '1cfcc.jpg',
      '40504.jpg', '43a24.jpg', '583c2.jpg', '6a183.jpg',
      '6b307.jpg', '8c9bb.jpg', '9ec38.jpg', 'a1761.jpg',
      'aac49.jpg', 'b12c1.jpg', 'bef28.jpg', 'd1571.jpg'
    ],
    videos: []
  };
</script>
```

---

### Step 6 — Add `GALLERY_CONFIG` to `rohini-residence.html`

**File**: [projects/rohini-residence.html](../../../../projects/rohini-residence.html)

Insert immediately before the `gallery.js` script tag:

```html
<script>
  window.GALLERY_CONFIG = {
    folder: '../assets/images/projects/rohiniapril2021/',
    projectName: 'Rohini Residence',
    images: ['3d59f.jpg', '79a38.jpg', 'ce90d.jpg', 'd107e.jpg', 'fc6af.jpg'],
    videos: []
  };
</script>
```

---

### Step 7 — Add `GALLERY_CONFIG` to `city-mall-yamunanagar.html`

**File**: [projects/city-mall-yamunanagar.html](../../../../projects/city-mall-yamunanagar.html)

Insert immediately before the `gallery.js` script tag:

```html
<script>
  window.GALLERY_CONFIG = {
    folder: '../assets/images/projects/Yamunanagar City Mall/',
    projectName: 'City Mall Yamunanagar',
    images: [
      '36543.jpg', '3bcf7.jpg', 'ad2d0.jpg', 'b492e.jpg',
      'dbde7.jpg', 'e6fcd.jpg', 'ffbac.jpg'
    ],
    videos: []
  };
</script>
```

> **Note**: The folder path contains a space (`Yamunanagar City Mall`). The browser will URL-encode it automatically when `gallery.js` sets `img.src`. Verify this renders without 404s after implementation; if needed, encode as `Yamunanagar%20City%20Mall/`.

---

### Step 8 — Update `scripts/rename-images.js` to cover project sub-pages

**File**: [scripts/rename-images.js](../../../../scripts/rename-images.js)

Find the `HTML_FILES` array and add all project page paths so future renames propagate to `GALLERY_CONFIG` arrays:

```js
const HTML_FILES = [
  'index.html',
  'blog.html',
  'projects/chinar-factory-outlet.html',
  'projects/city-mall-yamunanagar.html',
  'projects/kapkids-cp67.html',
  'projects/kapoor-residence-model-town.html',
  'projects/kapsons-solan.html',
  'projects/rohini-residence.html',
  // portfolio-004 pages added here after they are created:
  'projects/cp-office-cp-delhi.html',
  'projects/vijay-store-delhi.html',
];
```

---

## Verification

| Check | How |
|---|---|
| Chinar page shows all 12 images | Open `projects/chinar-factory-outlet.html` in browser; count rendered items in `#project-gallery`. |
| Kapkids page shows 8 images + 2 `<video>` elements | Inspect DOM; both MP4 sources load. |
| Rohini page shows exactly 5 images | Visual count. |
| No `TypeError` in console on any page | Open DevTools console on each project page. |
| Gallery renders at 375 px | Use DevTools mobile emulation; no horizontal overflow. |
| `--large` item spans 2 cols on desktop | First item in each gallery is visually wider. |

---

## Decisions

- **Defensive `|| []` in `gallery.js` over requiring `videos: []` in every config**: Both work; the patch is minimal and prevents future developer mistakes.
- **`GALLERY_CONFIG` placed in `<head>` before the deferred `gallery.js` tag**: Inline scripts execute synchronously; deferred scripts execute after full parse. Placement before the `<script defer>` tag makes the dependency order visually clear to future developers.
- **Space in `Yamunanagar City Mall/` folder path left as-is**: The rename script and OS already use this name. Browsers handle space-containing `src` values correctly for relative paths. Flagged for manual verification.
