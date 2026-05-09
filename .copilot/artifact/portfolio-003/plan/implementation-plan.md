# Implementation Plan: Dynamic Gallery Template
**Spec**: portfolio-003  
**Status**: Ready for development

---

## Context & Baseline

Six project pages under `projects/` currently hardcode `<img>` (and in one case `<video>`) tags directly in the gallery section. Several pages are **missing images** that exist on disk:

| Page | Images in HTML | Images in folder | Gap |
|---|---|---|---|
| `chinar-factory-outlet.html` | 12 | 12 | none |
| `kapkids-cp67.html` | 3 + 2 videos | 8 + 2 videos | **5 images missing** |
| `kapoor-residence-model-town.html` | 5 | 16 | **11 images missing** |
| `kapsons-solan.html` | 9 | 10 | **1 image missing** |
| `city-mall-yamunanagar.html` | 7 | 7 | none |
| `rohini-residence.html` | 5 | 5 | none |

The CSS grid and item variant classes (`--large`, `--wide`) are defined in `assets/css/project-page.css` and duplicated in inline `<style>` blocks inside each project page. The inline blocks stay in place (they are intentional per-page overrides); only the gallery DOM content is replaced.

---

## Step 1 — Create `assets/js/gallery.js`

Create `assets/js/gallery.js` as a self-contained IIFE. No third-party dependencies.

**Layout cycle** (FR-004) — repeats every 6 items by array index:

| Index mod 6 | Class added |
|---|---|
| 0 | `project-gallery__item--large` |
| 1 | *(none — standard)* |
| 2 | *(none — standard)* |
| 3 | `project-gallery__item--wide` |
| 4 | *(none — standard)* |
| 5 | *(none — standard)* |

**`window.GALLERY_CONFIG` shape** (FR-002):

```js
window.GALLERY_CONFIG = {
  folder: '../assets/images/projects/<FolderName>/',  // trailing slash required
  images: ['filename1.webp', 'filename2.jpg', ...],   // FR-003: all images listed
  projectName: 'Human-readable project name',         // used in alt text (FR-005)
  videos: ['clip.mp4', ...]                           // optional (FR-009)
};
```

**Rendering rules**:
- Target element: `<div id="project-gallery" class="project-gallery__grid">`.
- Clear the container before rendering (idempotent, supports hot-reload dev workflows).
- Render all `images` entries first. Alt text format: `"<projectName> — Photo <n>"` where `n` is 1-based (FR-005).
- First image uses `loading="eager"` (FR-006); all others use `loading="lazy"`.
- Render `videos` entries after images. The cycle index **continues** from `images.length` so layout rhythm is uninterrupted.
- Each `<video>` gets `controls` and a `<source>` element with the correct MIME type derived from the file extension (`mp4 → video/mp4`, `mov → video/quicktime`, `webm → video/webm`). No `poster` attribute (spec does not require it).
- If `window.GALLERY_CONFIG` is absent or `#project-gallery` is not in the DOM, return silently.
- Use `DOMContentLoaded` guard so the IIFE is safe whether the browser runs the deferred script before or after DOM parsing completes.

**Skeleton** (implement exactly this structure):

```js
(function () {
  'use strict';

  const CYCLE = [
    'project-gallery__item--large',
    '',
    '',
    'project-gallery__item--wide',
    '',
    '',
  ];

  function variantClass(index) {
    return CYCLE[index % CYCLE.length];
  }

  function buildImageItem(folder, filename, projectName, index) { ... }
  function buildVideoItem(folder, filename, globalIndex) { ... }

  function initGallery() {
    const config = window.GALLERY_CONFIG;
    if (!config) return;
    const container = document.getElementById('project-gallery');
    if (!container) return;
    // clear, then render images then videos
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
```

---

## Step 2 — Create `scripts/gallery.test.js`

Use `node:test` (Node 18+, same pattern as `scripts/rename-images.test.js`). Export the two pure functions `variantClass` and `buildMimeType` from gallery.js for testing (wrap in a `module.exports` guard so the IIFE still runs in browsers):

```js
// at the very end of the IIFE, before the closing })():
if (typeof module !== 'undefined') {
  module.exports = { variantClass, buildMimeType };
}
```

**Test cases to cover:**

```
variantClass()
  ✓ index 0  → 'project-gallery__item--large'
  ✓ index 1  → '' (standard)
  ✓ index 2  → '' (standard)
  ✓ index 3  → 'project-gallery__item--wide'
  ✓ index 4  → '' (standard)
  ✓ index 5  → '' (standard)
  ✓ index 6  → 'project-gallery__item--large' (cycle wraps)
  ✓ index 9  → 'project-gallery__item--wide'  (second cycle)
  ✓ index 12 → 'project-gallery__item--large' (third cycle)

buildMimeType()
  ✓ 'clip.mp4'  → 'video/mp4'
  ✓ 'tour.mov'  → 'video/quicktime'
  ✓ 'walk.webm' → 'video/webm'
  ✓ uppercase extension 'clip.MP4' → 'video/mp4'
```

Run with: `node scripts/gallery.test.js`

---

## Step 3 — Refactor each project page (6 files)

Apply the same three-part change to every project page. Steps are identical; only the `GALLERY_CONFIG` values differ.

### 3a — Add `gallery.js` to `<head>`

In the `<head>` block, after the last existing `<link rel="stylesheet">` and before `<!-- Favicon -->`:

```html
<!-- Gallery -->
<script src="../assets/js/gallery.js" defer></script>
```

### 3b — Replace the hardcoded gallery grid content

Find the `<div class="project-gallery__grid">` element. Add `id="project-gallery"` and remove all child `<div class="project-gallery__item ...">` elements, leaving the container empty:

**Before:**
```html
<div class="project-gallery__grid">
  <div class="project-gallery__item project-gallery__item--large">
    <img src="..." alt="..." loading="lazy" />
  </div>
  <!-- ... more items ... -->
</div>
```

**After:**
```html
<div id="project-gallery" class="project-gallery__grid"></div>
```

### 3c — Add `GALLERY_CONFIG` inline script

Add the following block immediately before `</body>` (after the last `<script>` tag in the file, typically the gtag block):

```html
<script>
  window.GALLERY_CONFIG = {
    folder: '...',
    images: [...],
    projectName: '...'
  };
</script>
```

---

## Per-page `GALLERY_CONFIG` values

### `chinar-factory-outlet.html`
```js
window.GALLERY_CONFIG = {
  folder: '../assets/images/projects/ChinarOct2025/',
  images: [
    '82faf.webp', '88f03.webp', '3b9df.webp', '6dcd9.webp',
    '24408.webp', 'ec244.webp', '49dd6.webp', '99295.webp',
    '5ab82.webp', '23d60.webp', '6c021.webp', '26ad6.webp'
  ],
  projectName: 'Chinar Factory Outlet'
};
```
12 images — matches folder exactly. No videos.

---

### `kapkids-cp67.html`
```js
window.GALLERY_CONFIG = {
  folder: '../assets/images/projects/cp67jan2024/',
  images: [
    '83309.jpg', '6f462.jpg', '57999.jpg',
    '24ea2.jpeg', '34997.jpeg', '5489e.jpeg', '78426.jpeg', '84238.jpeg'
  ],
  projectName: 'Kapkids CP67',
  videos: ['091e2.mp4', '08c62.mp4']
};
```
8 images (5 were missing from the old HTML), 2 videos. Also fixes the bug where the old `<video poster="...">` paths were missing the `../` prefix.

---

### `kapoor-residence-model-town.html`
```js
window.GALLERY_CONFIG = {
  folder: '../assets/images/projects/KapoorResidenceModelTownjan2020/',
  images: [
    '03782.jpg', '0d6f5.jpg', '0e728.jpg', '1cfcc.jpg',
    '40504.jpg', '43a24.jpg', '583c2.jpg', '6a183.jpg',
    '6b307.jpg', '8c9bb.jpg', '9ec38.jpg', 'a1761.jpg',
    'aac49.jpg', 'b12c1.jpg', 'bef28.jpg', 'd1571.jpg'
  ],
  projectName: 'Kapoor Residence Model Town'
};
```
16 images (11 were missing from the old HTML). No videos.

---

### `kapsons-solan.html`
```js
window.GALLERY_CONFIG = {
  folder: '../assets/images/projects/KapsonsSolanOct2023/',
  images: [
    '3e6b8.webp', '4d841.webp', '68a62.webp', '93797.webp',
    'c5e8c.webp', 'ce3d0.webp', 'e066e.png', 'e878e.webp',
    'f0058.webp', 'fcc88.webp'
  ],
  projectName: 'Kapsons Solan'
};
```
10 images (1 was missing: `e066e.png`). No videos.

---

### `city-mall-yamunanagar.html`
```js
window.GALLERY_CONFIG = {
  folder: '../assets/images/projects/Yamunanagar City Mall/',
  images: [
    'e6fcd.jpg', 'ad2d0.jpg', '36543.jpg', 'b492e.jpg',
    'dbde7.jpg', 'ffbac.jpg', '3bcf7.jpg'
  ],
  projectName: 'Yamunanagar City Mall'
};
```
7 images — matches folder exactly. No videos.

> **Note**: The folder name contains a space (`Yamunanagar City Mall`). The `folder` path string is used directly as `img.src`, which browsers handle correctly. No URL-encoding required since it is set via JS property assignment, not HTML attribute parsing.

---

### `rohini-residence.html`
```js
window.GALLERY_CONFIG = {
  folder: '../assets/images/projects/rohiniapril2021/',
  images: [
    '3d59f.jpg', '79a38.jpg', 'ce90d.jpg', 'd107e.jpg', 'fc6af.jpg'
  ],
  projectName: 'Rohini Residence'
};
```
5 images — matches folder exactly. No videos.

---

## Step 4 — Run tests

```bash
node scripts/gallery.test.js
```

All test cases from Step 2 must pass before touching HTML files.

---

## Step 5 — Manual verification checklist

Open each page in a browser after implementation:

| Check | Chinar | KapKids | Kapoor | Kapsons | City Mall | Rohini |
|---|---|---|---|---|---|---|
| Gallery renders (no blank grid) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Correct image count | 12 | 8 | 16 | 10 | 7 | 5 |
| Videos render with controls | — | 2 | — | — | — | — |
| First image loads eagerly | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| No JS console errors | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Layout rhythm (large→std→std→wide→std→std) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Responsive at 375px (no overflow) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Files changed

| Action | File |
|---|---|
| **Create** | `assets/js/gallery.js` |
| **Create** | `scripts/gallery.test.js` |
| **Modify** | `projects/chinar-factory-outlet.html` |
| **Modify** | `projects/kapkids-cp67.html` |
| **Modify** | `projects/kapoor-residence-model-town.html` |
| **Modify** | `projects/kapsons-solan.html` |
| **Modify** | `projects/city-mall-yamunanagar.html` |
| **Modify** | `projects/rohini-residence.html` |

No CSS changes required — `project-page.css` already defines all needed classes.
