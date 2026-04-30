## Plan: Add Kapoor & Rohini Residence to Portfolio
**ID**: RESIDENCE-001
**Date**: 2026-04-30
**Spec**: .copilot/spec/RESIDENCE-001.md

Add two residential project pages and replace their placeholder portfolio cards. Four files change: two new HTML pages created, `index.html` updated (two card swaps), `sitemap.xml` updated (two new `<url>` blocks). All markup follows the exact structure of `chinar-factory-outlet.html`.

---

## Pre-condition Check

Before starting Step 2 (Rohini page), verify that image files exist inside `assets/images/projects/rohiniapril2021/`. Kapoor (Step 1) is unblocked — 5 images confirmed at `KapoorResidenceModelTownjan2020/1.jpg` through `5.jpg`.

---

## Steps

### Step 1 — Create `kapoor-residence-model-town.html`

Create the file at the project root (same level as `chinar-factory-outlet.html`). Build it section by section matching the template exactly.

**`<head>` — fill in these values:**

| Tag | Value |
|-----|-------|
| `<title>` | `Kapoor Residence, Model Town - Residential Design Project \| The A&S Design Studio` |
| `meta[name=description]` | `A modern luxury residence in Model Town, New Delhi — minimal yet expressive, royal in experience. Designed by The A&S Design Studio.` |
| `meta[name=keywords]` | `Kapoor residence, residential design, luxury home interior, modern home Delhi, residential architecture India, A&S Design Studio, Ar. Shreya Jain` |
| `og:url` / `twitter:url` | `https://theasdesignstudio.com/kapoor-residence-model-town.html` |
| `og:title` / `twitter:title` | `Kapoor Residence, Model Town - Residential Design Project` |
| `og:description` | `Minimal yet expressive. A joint family residence in Delhi where every floor tells a story.` |
| `og:image` / `twitter:image` | `https://theasdesignstudio.com/assets/images/projects/KapoorResidenceModelTownjan2020/1.jpg` |
| `link[rel=canonical]` | `https://theasdesignstudio.com/kapoor-residence-model-town.html` |
| `article:published_time` | `2020-01-01T00:00:00+00:00` |
| `article:section` | `Residential Design` |
| `article:tag` (×3) | `Residential Architecture`, `Luxury Home Design`, `Interior Architecture` |

**Structured Data — `CreativeWork` (inline `<script type="application/ld+json">`):**
```
name: "Kapoor Residence, Model Town"
description: "Modern luxury residence for a joint family in Model Town, Delhi. Minimal foundation with pop colors, warm lighting, large-scale furniture, and layered textures."
datePublished: "2020-01-01"
dateModified: "2020-01-31"
genre: "Residential Architecture"
keywords: "residential design, luxury home, joint family residence, modern interior"
image[0]: .../KapoorResidenceModelTownjan2020/1.jpg
image[1]: .../KapoorResidenceModelTownjan2020/2.jpg
image[2]: .../KapoorResidenceModelTownjan2020/3.jpg
creator: same object as chinar page (Ar. Shreya Jain / The A&S Design Studio)
```

**Structured Data — `BreadcrumbList`:**
```
position 1: Home → https://theasdesignstudio.com/
position 2: Work  → https://theasdesignstudio.com/#work
position 3: Kapoor Residence, Model Town → https://theasdesignstudio.com/kapoor-residence-model-town.html
```

**`<nav>` block:** Copy verbatim from `chinar-factory-outlet.html`. Change active link to `Work` (already active in template). No other nav changes.

**`<section class="project-hero">` — fill in:**

| Meta label | Meta value |
|------------|------------|
| `project-hero__label` text | `Residential Project` |
| `project-hero__title` text | `Kapoor Residence, Model Town` |
| Client | `Kapoor Family` |
| Type | `Residential Design` |
| Location | `Model Town, New Delhi` |
| Year | `2020` |
| Status | `Completed` |

**`<section class="project-description">`:**

`<h2>` text: `About the Project`

First `<p>`:
> The Kapoor Residence in Model Town, Delhi, reflects a rare design balance — minimal yet expressive, modern yet royal. The client's vision was clear: keep the base clean, but let the personality speak through bold choices.

Second `<p>`:
> Being a joint family residence, the home was thoughtfully planned with each floor dedicated to a nuclear family — maintaining privacy without losing emotional connection. Common areas were designed to encourage interaction, creating individual comfort within a shared home.

**Project Highlights `<ul>`** (6 items):
- Pop color accents for spatial identity
- Warm lighting for depth and richness
- Large-scale furniture for a sense of luxury
- Layered textures across every room
- Floor-by-floor planning for joint family privacy
- Seamless flow between distinct room themes

**`<section class="project-gallery">`** — 5 items in this exact CSS class order:

| Item # | CSS modifier | Image src | `alt` text |
|--------|-------------|-----------|------------|
| 1 | `project-gallery__item--large` | `KapoorResidenceModelTownjan2020/1.jpg` | `Kapoor Residence - Living Room Main View` |
| 2 | _(none)_ | `KapoorResidenceModelTownjan2020/2.jpg` | `Kapoor Residence - Living Room and Dining Area` |
| 3 | _(none)_ | `KapoorResidenceModelTownjan2020/3.jpg` | `Kapoor Residence - Statement Staircase` |
| 4 | `project-gallery__item--wide` | `KapoorResidenceModelTownjan2020/4.jpg` | `Kapoor Residence - Dining Area with Ornate Partition` |
| 5 | _(none)_ | `KapoorResidenceModelTownjan2020/5.jpg` | `Kapoor Residence - Dining and Lounge Overview` |

All images use `loading="lazy"`.

**Remaining sections** (`project-nav`, `project-cta`, `<footer>`, `<script src="assets/js/main.js">`): Copy verbatim from `chinar-factory-outlet.html`. No changes needed.

---

### Step 2 — Create `rohini-residence.html`

⚠️ **Blocked until `assets/images/projects/rohiniapril2021/` is confirmed on disk with its image filenames.** Once unblocked, follow the identical structure as Step 1 with the values below.

**`<head>` — fill in these values:**

| Tag | Value |
|-----|-------|
| `<title>` | `Rohini Residence - Residential Design Project \| The A&S Design Studio` |
| `meta[name=description]` | `A luxury residence in Rohini, Delhi — quiet grandeur, double-height living, and timeless material elegance. Designed by The A&S Design Studio.` |
| `meta[name=keywords]` | `Rohini residence, residential design, luxury home interior, double height living, modern home Delhi, A&S Design Studio, Ar. Shreya Jain` |
| `og:url` / `twitter:url` | `https://theasdesignstudio.com/rohini-residence.html` |
| `og:title` | `Rohini Residence - Residential Design Project` |
| `og:description` | `Quiet luxury. A residence in Rohini, Delhi defined by grand volume, a double-height living space, and restrained material elegance.` |
| `og:image` / `twitter:image` | `https://theasdesignstudio.com/assets/images/projects/rohiniapril2021/` + first image filename |
| `link[rel=canonical]` | `https://theasdesignstudio.com/rohini-residence.html` |
| `article:published_time` | `2021-04-01T00:00:00+00:00` |
| `article:section` | `Residential Design` |
| `article:tag` (×3) | `Residential Architecture`, `Luxury Home Design`, `Interior Architecture` |

**Structured Data — `CreativeWork`:**
```
name: "Rohini Residence"
description: "A luxury residence in Rohini, Delhi featuring a double-height living area with skylight, soft neutral palette, and grand spatial planning."
datePublished: "2021-04-01"
dateModified: "2021-04-30"
genre: "Residential Architecture"
keywords: "residential design, luxury home, double height living, quiet luxury"
image[0..2]: first three images from rohiniapril2021/ (fill in once filenames known)
creator: same object as other pages
```

**Structured Data — `BreadcrumbList`:**
```
position 1: Home → https://theasdesignstudio.com/
position 2: Work  → https://theasdesignstudio.com/#work
position 3: Rohini Residence → https://theasdesignstudio.com/rohini-residence.html
```

**`<section class="project-hero">` — fill in:**

| Meta label | Meta value |
|------------|------------|
| `project-hero__label` text | `Residential Project` |
| `project-hero__title` text | `Rohini Residence` |
| Client | `Rohini Residence` |
| Type | `Residential Design` |
| Location | `Rohini, Delhi` |
| Year | `2021` |
| Status | `Completed` |

**`<section class="project-description">`:**

`<h2>` text: `About the Project`

First `<p>`:
> The Rohini Residence was envisioned as a space that speaks quiet luxury — not loud, not busy, but deeply refined and expansive. The client's vision was clear: create a sense of grandeur without overwhelming the senses. Luxury here is defined by proportion, scale, and restraint.

Second `<p>`:
> At the heart of the home is a double-height living area — a large screen wall anchors the space as a focal point, while a skylight above brings in natural light that shifts mood through the day. Wide circulation areas, oversized rooms, and open yet well-defined common zones give every corner an unrestricted, breathable quality.

**Project Highlights `<ul>`** (6 items):
- Double-height living area with skylight
- Large screen wall as a signature focal point
- Oversized rooms for comfort and flexibility
- Soft neutral palette with warm undertones
- Premium finishes with layered textures
- Proportion-led design for timeless elegance

**`<section class="project-gallery">`** — structure once filenames confirmed:
- Item 1: `--large` modifier → first image
- Items 2–3: no modifier
- Item 4: `--wide` modifier
- Remaining items: no modifier
- All `loading="lazy"`, all `alt` text descriptive of the visible space

**Remaining sections:** Copy verbatim from `chinar-factory-outlet.html` (same as Step 1).

---

### Step 3 — Update `index.html`: Replace Placeholder Cards

**Location:** `#work` section, the `.work__grid` div.

**Replace card 1** — the `<article>` with `<h3>Modern Luxury Villa</h3>` (data-category="residential"):

```
Old href:  #
Old img:   project-placeholder.svg
Old h3:    Modern Luxury Villa
Old p.category: Residential Architecture
Old p.location: Gurugram, India

New href:  kapoor-residence-model-town.html
New img:   assets/images/projects/KapoorResidenceModelTownjan2020/1.jpg
New img alt: Kapoor Residence Model Town - Modern Luxury Home
New h3:    Kapoor Residence, Model Town
New p.category: Residential Design
New p.location: Model Town, New Delhi
```

Keep `data-category="residential"` unchanged.

**Replace card 2** — the `<article>` with `<h3>Contemporary Home</h3>` (data-category="residential"):

```
Old href:  #
Old img:   project-placeholder.svg
Old h3:    Contemporary Home
Old p.category: Residential Architecture
Old p.location: Noida, India

New href:  rohini-residence.html
New img:   assets/images/projects/rohiniapril2021/ + first image filename (fill once confirmed)
New img alt: Rohini Residence Delhi - Luxury Home Design
New h3:    Rohini Residence
New p.category: Residential Design
New p.location: Rohini, Delhi
```

Keep `data-category="residential"` unchanged.

⚠️ The Rohini card `src` attribute must be filled with the actual first image filename before committing; use `project-placeholder.svg` as a temporary fallback until images are confirmed.

---

### Step 4 — Update `sitemap.xml`: Add Two `<url>` Entries

Insert both blocks **before the closing `</urlset>` tag**, after the last existing `</url>`.

**Block 1 — Kapoor Residence:**
```xml
<!-- Kapoor Residence Model Town Project -->
<url>
  <loc>https://theasdesignstudio.com/kapoor-residence-model-town.html</loc>
  <lastmod>2026-04-30</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
  <image:image>
    <image:loc>https://theasdesignstudio.com/assets/images/projects/KapoorResidenceModelTownjan2020/1.jpg</image:loc>
    <image:title>Kapoor Residence - Living Room</image:title>
  </image:image>
  <image:image>
    <image:loc>https://theasdesignstudio.com/assets/images/projects/KapoorResidenceModelTownjan2020/2.jpg</image:loc>
    <image:title>Kapoor Residence - Living and Dining Area</image:title>
  </image:image>
  <image:image>
    <image:loc>https://theasdesignstudio.com/assets/images/projects/KapoorResidenceModelTownjan2020/3.jpg</image:loc>
    <image:title>Kapoor Residence - Staircase</image:title>
  </image:image>
  <image:image>
    <image:loc>https://theasdesignstudio.com/assets/images/projects/KapoorResidenceModelTownjan2020/4.jpg</image:loc>
    <image:title>Kapoor Residence - Dining Area</image:title>
  </image:image>
  <image:image>
    <image:loc>https://theasdesignstudio.com/assets/images/projects/KapoorResidenceModelTownjan2020/5.jpg</image:loc>
    <image:title>Kapoor Residence - Lounge Overview</image:title>
  </image:image>
</url>
```

**Block 2 — Rohini Residence** (fill `<image:loc>` values once filenames are confirmed):
```xml
<!-- Rohini Residence Project -->
<url>
  <loc>https://theasdesignstudio.com/rohini-residence.html</loc>
  <lastmod>2026-04-30</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
  <!-- Add <image:image> entries for each rohiniapril2021/ image once filenames are confirmed -->
</url>
```

---

## Verification

1. Open `kapoor-residence-model-town.html` in a browser — confirm hero meta, all 5 gallery images load (no broken images), nav back-link goes to `index.html#work`.
2. On `index.html`, click the Kapoor Residence card — confirms navigation. Filter to "Residential" — both new cards appear, both placeholder cards are gone.
3. Validate `sitemap.xml` with [XML Sitemaps validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html) — no schema errors.
4. Run `grep -r "project-placeholder.svg" index.html` — the two residential placeholder `src` references must be gone.
5. Repeat steps 1–4 for Rohini once images are added.

---

## Decisions

- **Rohini card fallback**: Use `project-placeholder.svg` temporarily rather than leaving a broken `src`, so the page stays valid HTML while images are pending.
- **Gallery CSS modifier order for 5 images**: `--large` (img 1) → plain → plain → `--wide` (img 4) → plain. This mirrors the visual rhythm of the Chinar page and avoids back-to-back spanning items.
- **`project-hero__label` text**: Changed from "Featured Project" (used only on Chinar) to "Residential Project" — consistent with how a non-featured entry should read.
- **Rohini brief mentions "Gupta residence"**: The client confirmed the second brief is for Rohini Residence; the Gupta reference in the copy was treated as a brand name placeholder and not used in any output text.
