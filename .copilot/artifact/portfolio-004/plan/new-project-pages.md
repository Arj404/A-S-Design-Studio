## Plan: New Project Pages — CP Office & Vijay Store
**ID**: portfolio-004  
**Date**: 2026-05-09  
**Spec**: .copilot/spec/portfolio-004.md  
**Depends on**: .copilot/artifact/portfolio-003/plan/dynamic-gallery.md

Create two new project detail pages and wire them into the `index.html` work grid. Both pages use the `GALLERY_CONFIG` pattern from portfolio-003. All image filenames are already renamed (confirmed in folder listings).

---

## Pre-flight Context

| Asset | Status |
|---|---|
| `assets/images/projects/CpOfficejan2024/` | 19 `.jpeg` files, all renamed to 5-char hex names. |
| `assets/images/projects/VijayStoreapril2023/` | 8 `.jpeg` files, all renamed to 5-char hex names. |
| `assets/js/gallery.js` | Fully implemented (after portfolio-003 Step 1 defensive patch applied). |
| `projects/chinar-factory-outlet.html` | Reference template for HTML structure. |
| `index.html` work grid | Has `retail` and `commercial` filter buttons — correct for both new projects. |

---

## Image File Lists (verbatim, for copy-paste into `GALLERY_CONFIG`)

**CpOfficejan2024** (19 files):
```
'06077.jpeg', '0afa5.jpeg', '14c92.jpeg', '16199.jpeg', '2dc1c.jpeg',
'505c6.jpeg', '688ec.jpeg', '6984a.jpeg', '70b99.jpeg', '796ba.jpeg',
'804eb.jpeg', '88219.jpeg', '89118.jpeg', '8b2dc.jpeg', '8b5dd.jpeg',
'96a05.jpeg', 'afd8b.jpeg', 'b1e06.jpeg', 'b53e8.jpeg'
```

**VijayStoreapril2023** (8 files):
```
'269fb.jpeg', '2d574.jpeg', '58920.jpeg', '60e24.jpeg',
'71388.jpeg', 'b96b2.jpeg', 'efb1d.jpeg', 'f681c.jpeg'
```

---

## Steps

### Step 1 — Create `projects/cp-office-cp-delhi.html`

**File**: [projects/cp-office-cp-delhi.html](../../../../projects/cp-office-cp-delhi.html) *(new)*

Use `projects/chinar-factory-outlet.html` as the structural template. Apply the values below. Do **not** copy the dead `<style display="none">` block from the source template.

#### `<head>` meta block

```html
<title>CP Office, Connaught Place — Commercial Design Project | The A&amp;S Design Studio</title>
<meta name="description" content="A contemporary commercial office interior in Connaught Place, New Delhi, designed by The A&S Design Studio. Completed January 2024." />
<link rel="canonical" href="https://asdesignstudio.com/projects/cp-office-cp-delhi.html" />
<meta property="og:title" content="CP Office, Connaught Place — The A&amp;S Design Studio" />
<meta property="og:description" content="Commercial office interior, Connaught Place, New Delhi. January 2024." />
<meta property="og:image" content="https://asdesignstudio.com/assets/images/projects/CpOfficejan2024/06077.jpeg" />
<meta property="og:url" content="https://asdesignstudio.com/projects/cp-office-cp-delhi.html" />
```

#### JSON-LD structured data (place before `</head>`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "CP Office, Connaught Place",
  "description": "Contemporary commercial office interior in Connaught Place, New Delhi.",
  "creator": { "@type": "Organization", "name": "The A&S Design Studio" },
  "datePublished": "2024-01-01",
  "genre": "Commercial Architecture",
  "locationCreated": { "@type": "Place", "name": "Connaught Place, New Delhi" }
}
</script>
```

#### `GALLERY_CONFIG` (place in `<head>` immediately before the `gallery.js` script tag)

```html
<script>
  window.GALLERY_CONFIG = {
    folder: '../assets/images/projects/CpOfficejan2024/',
    projectName: 'CP Office, Connaught Place',
    images: [
      '06077.jpeg', '0afa5.jpeg', '14c92.jpeg', '16199.jpeg', '2dc1c.jpeg',
      '505c6.jpeg', '688ec.jpeg', '6984a.jpeg', '70b99.jpeg', '796ba.jpeg',
      '804eb.jpeg', '88219.jpeg', '89118.jpeg', '8b2dc.jpeg', '8b5dd.jpeg',
      '96a05.jpeg', 'afd8b.jpeg', 'b1e06.jpeg', 'b53e8.jpeg'
    ],
    videos: []
  };
</script>
<script src="../assets/js/gallery.js" defer></script>
```

#### Hero section values

| Field | Value |
|---|---|
| Back link | `href="../index.html#work"` |
| Label | `Commercial Design` |
| Title | `CP Office, Connaught Place` |
| Client meta | `CP Office` |
| Location meta | `Connaught Place, New Delhi` |
| Year meta | `2024` |

#### Description section (placeholder copy, FR-015)

**Heading**: "A Modern Workspace in the Heart of Delhi"

**Body** (2–3 sentences):
> This commercial office interior in Connaught Place was designed to balance openness and focus. Clean lines, neutral tones, and considered material choices create a professional environment that reflects the client's brand.

**Highlights list** (4–6 items):
- Open-plan layout with defined collaboration zones
- Acoustic panelling and privacy screens
- Custom joinery for reception and workstation areas
- Natural light maximisation through glass partitions
- Consistent material palette: stone, timber, and matte metal

#### Gallery section

```html
<section class="project-gallery">
  <div id="project-gallery" class="project-gallery__grid"></div>
</section>
```

#### Project nav link

```html
<a href="../index.html#work" class="project-nav__link">← All Projects</a>
```

---

### Step 2 — Create `projects/vijay-store-delhi.html`

**File**: [projects/vijay-store-delhi.html](../../../../projects/vijay-store-delhi.html) *(new)*

Same structure as Step 1. Apply the values below.

#### `<head>` meta block

```html
<title>Vijay Store, Delhi — Retail Design Project | The A&amp;S Design Studio</title>
<meta name="description" content="A retail interior design project for Vijay Store in Delhi by The A&S Design Studio. Completed April 2023." />
<link rel="canonical" href="https://asdesignstudio.com/projects/vijay-store-delhi.html" />
<meta property="og:title" content="Vijay Store, Delhi — The A&amp;S Design Studio" />
<meta property="og:description" content="Retail interior design, Delhi. April 2023." />
<meta property="og:image" content="https://asdesignstudio.com/assets/images/projects/VijayStoreapril2023/269fb.jpeg" />
<meta property="og:url" content="https://asdesignstudio.com/projects/vijay-store-delhi.html" />
```

#### JSON-LD structured data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Vijay Store, Delhi",
  "description": "Retail interior design for Vijay Store, Delhi.",
  "creator": { "@type": "Organization", "name": "The A&S Design Studio" },
  "datePublished": "2023-04-01",
  "genre": "Retail Architecture",
  "locationCreated": { "@type": "Place", "name": "Delhi" }
}
</script>
```

#### `GALLERY_CONFIG`

```html
<script>
  window.GALLERY_CONFIG = {
    folder: '../assets/images/projects/VijayStoreapril2023/',
    projectName: 'Vijay Store, Delhi',
    images: [
      '269fb.jpeg', '2d574.jpeg', '58920.jpeg', '60e24.jpeg',
      '71388.jpeg', 'b96b2.jpeg', 'efb1d.jpeg', 'f681c.jpeg'
    ],
    videos: []
  };
</script>
<script src="../assets/js/gallery.js" defer></script>
```

#### Hero section values

| Field | Value |
|---|---|
| Back link | `href="../index.html#work"` |
| Label | `Retail Design` |
| Title | `Vijay Store, Delhi` |
| Client meta | `Vijay Store` |
| Location meta | `Delhi` |
| Year meta | `2023` |

#### Description section (placeholder copy)

**Heading**: "Retail Space Designed to Engage"

**Body**:
> Vijay Store's Delhi location required a retail environment that draws customers in and encourages exploration. The design uses bold display fixtures, warm lighting, and a flowing layout to guide movement through the space.

**Highlights list**:
- Customer flow-oriented floor plan
- Custom display shelving and feature wall
- Warm-toned lighting scheme
- Durable yet premium material finishes
- Brand-consistent signage integration

---

### Step 3 — Add CP Office card to `index.html` work grid

**File**: [index.html](../../../../index.html)

Insert the following `<article>` block inside `.work__grid`, after the last existing `<article>` and before the closing `</div>` of `.work__grid`:

```html
<article class="project-item" data-category="commercial">
  <a href="projects/cp-office-cp-delhi.html" class="project-item__link">
    <div class="project-item__image">
      <img
        src="assets/images/projects/CpOfficejan2024/06077.jpeg"
        alt="CP Office, Connaught Place"
        loading="lazy"
      />
    </div>
    <div class="project-item__info">
      <h3 class="project-item__title">CP Office, Connaught Place</h3>
      <p class="project-item__category">Commercial Design</p>
      <p class="project-item__location">January 2024</p>
    </div>
  </a>
</article>
```

---

### Step 4 — Add Vijay Store card to `index.html` work grid

**File**: [index.html](../../../../index.html)

Insert immediately after the CP Office `<article>` added in Step 3:

```html
<article class="project-item" data-category="retail">
  <a href="projects/vijay-store-delhi.html" class="project-item__link">
    <div class="project-item__image">
      <img
        src="assets/images/projects/VijayStoreapril2023/269fb.jpeg"
        alt="Vijay Store, Delhi"
        loading="lazy"
      />
    </div>
    <div class="project-item__info">
      <h3 class="project-item__title">Vijay Store, Delhi</h3>
      <p class="project-item__category">Retail Design</p>
      <p class="project-item__location">April 2023</p>
    </div>
  </a>
</article>
```

---

### Step 5 — Add new pages to `scripts/rename-images.js`

*(This step overlaps with portfolio-003 Step 8 — if done there already, just confirm both new page paths are in `HTML_FILES`.)*

Ensure `HTML_FILES` in [scripts/rename-images.js](../../../../scripts/rename-images.js) includes:
```js
'projects/cp-office-cp-delhi.html',
'projects/vijay-store-delhi.html',
```

---

## Verification

| Check | How |
|---|---|
| CP Office page loads at `projects/cp-office-cp-delhi.html` | Open in browser; no 404. |
| CP Office gallery shows all 19 images | Count rendered items in `#project-gallery`. |
| Vijay Store page loads at `projects/vijay-store-delhi.html` | Open in browser; no 404. |
| Vijay Store gallery shows all 8 images | Count rendered items. |
| Both cards appear in `index.html` work grid | Scroll to `#work`; both cards visible. |
| `data-filter="commercial"` shows CP Office card | Click "Commercial" filter button. |
| `data-filter="retail"` shows Vijay Store card | Click "Retail" filter button. |
| Canonical URL matches spec | View page source; confirm `<link rel="canonical">`. |
| JSON-LD present and valid | Use Google Rich Results Test or browser DevTools. |
| No broken images (404s) | DevTools Network tab filtered to `img`. |
| "Back to Projects" navigates to `index.html#work` | Click the nav link on each new page. |
| Both pages usable at 375 px | DevTools mobile emulation; no overflow. |

---

## Decisions

- **Thumbnail = first image in folder (alphabetical)**: Consistent with how `chinar-factory-outlet.html` picks its OG image; gives predictable behaviour without manual selection.
- **`data-category="commercial"` for CP Office, `"retail"` for Vijay Store**: Matches existing filter buttons in `index.html` and the spec categories. No new filter button is needed.
- **Placeholder copy acceptable for launch**: Spec FR-015 explicitly permits this; copy can be updated in a follow-up PR without structural changes.
- **No `project-item--featured` badge on new cards**: Both are standard additions; the featured badge is reserved for hero-tier projects (currently only Chinar).
