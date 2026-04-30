# Plan: A&S Design Studio Website Improvements
**ID**: website-improvements  
**Date**: 2026-04-30  
**Spec**: Analysis provided in Copilot chat session (2026-04-30)

This plan converts the content and design recommendations from the site analysis into discrete, developer-ready steps. All changes are to static HTML/CSS files — no build tools, no framework. Steps are ordered from highest to lowest priority. Each step is self-contained and can be executed independently.

---

## Steps

### 1. Fix copyright year in footer — `index.html` line 900

In `index.html`, find:
```
&copy; 2024 The A&S Design Studio. All rights reserved.
```
Change `2024` → `2026`.

Repeat for any other HTML files that contain a footer with the same string:
- `blog.html`
- `chinar-factory-outlet.html`
- `kapsons-solan.html`
- `kapkids-cp67.html`
- `city-mall-yamunanagar.html`

Search with: `grep -rn "2024 The A" *.html`

---

### 2. Remove the four placeholder portfolio items — `index.html` lines 495–565

In the `<!-- Work / Portfolio -->` section there are four `<article class="project-item">` blocks using `assets/images/projects/project-placeholder.svg`:

- Project 4 — "Modern Luxury Villa" (`data-category="residential"`)
- Project 5 — "Boutique Showroom" (`data-category="retail"`)
- Project 6 — "Corporate Office Complex" (`data-category="commercial"`)
- Project 7 — "Contemporary Home" (`data-category="residential"`)

**Action**: Delete all four `<article>` blocks entirely. The portfolio grid will then show the 4 real projects only (Chinar, Kapsons, Kapkids, City Mall).

**Filter button impact**: After removal, the `Residential` filter button will yield zero results. Either:
- Option A (recommended): Remove the `Residential` filter button from the filter bar until a real residential project is ready.
- Option B: Hide the filter bar row entirely and just show all projects (remove the `<div class="portfolio__filters">` block).

Update `assets/js/portfolio.js` if it references a minimum visible item count or empty-state check after filtering.

---

### 3. Replace "Award-Winning" with a credible differentiator — `index.html`

There are 5 occurrences of "award-winning" / "Award-Winning" across `index.html`:

| Line | Location | Current text | Replace with |
|------|----------|-------------|--------------|
| 313 | Hero `<p class="hero__subtitle">` | `Award-Winning Architecture & Interior Design Studio Specializing in Luxury Retail, Commercial & Residential Projects in Gurugram & Beyond` | `Architecture & Interior Design Studio Specialising in Retail, Commercial & Residential Projects — Based in Gurugram` |
| 363 | Value prop card heading | `Award-Winning Expertise` | `Expert-Led Studio` (or the name of a specific award if one exists) |
| 363 | Value prop card body text | `Led by Ar. Shreya Jain, our team brings decades of combined experience...` | keep as-is, it already substantiates the card |
| 17 | `<meta name="description">` | `Award-winning architecture firm in Gurugram...` | `Architecture and interior design firm in Gurugram specialising in retail, commercial and residential projects. Led by Ar. Shreya Jain. 50+ projects, 100% client satisfaction.` |
| 36, 56 | OG/Twitter meta | same "Award-winning" phrases | Update to match new meta description |

**Note to developer**: If the studio does hold a named award, insert the award name and year at line 363 heading instead of the generic replacement.

---

### 4. Rewrite the mid-page CTA banner copy — `index.html` lines 705–720

Current `<h2>`: `Let's Create Something Extraordinary Together`  
Current `<p>`: generic description of free consultation.

Replace with copy more specific to the studio's niche:

**`<h2>`**: `Have a retail or commercial space that needs to perform?`  
**`<p>`**: `Tell us about your project and we'll respond within 24 hours with a tailored design approach and transparent cost estimate — at zero obligation.`

The two CTA buttons remain unchanged.

---

### 5. Update footer tagline and add address — `index.html` lines 870–895

Current footer tagline: `Creating exceptional architectural experiences`

**Change tagline to**: `Architecture & Interior Design · Gurugram, Haryana, India`

This converts a generic brand phrase into a local trust signal visible in the footer of every page. Repeat on all project detail pages.

**Also add** a Google Maps link in the footer `Connect` column:
```html
<li><a href="https://maps.google.com/?q=Gurugram,Haryana,India" target="_blank" rel="noopener noreferrer">Find Us on Maps</a></li>
```

---

### 6. Wire up real social media URLs — `index.html` and all project detail pages

The social links in the contact section and footer all use `href="#"`. Replace with real URLs.

Locations to update in `index.html`:
- Contact section: three `<a class="contact__social-link">` anchors (approx. lines 760–800)
- Footer `Connect` column: Instagram and LinkedIn `<a>` elements (approx. lines 885–895)

Placeholder values to substitute (confirm real handles with the studio):
- Instagram → `https://www.instagram.com/theas_designstudio`
- Youtube → `https://www.youtube.com/@TheASDesignStudio`

These same `href="#"` anchors appear on all project detail HTML files — update them there too.

---

### 7. Add "How We Work" process section — `index.html`

**Insert** a new section between the Services section (`</section>` closing tag of `#services`) and the Testimonials section. This is approximately line 670 in `index.html`.

HTML structure:
```html
<section class="process">
  <div class="process__container">
    <span class="process__label">Our Process</span>
    <h2 class="process__title">How We Work</h2>
    <div class="process__steps">
      <div class="process__step">
        <span class="process__step-number">01</span>
        <h3 class="process__step-title">Brief &amp; Consult</h3>
        <p class="process__step-desc">We start with a free consultation to understand your vision, budget, and timeline — no obligations.</p>
      </div>
      <div class="process__step">
        <span class="process__step-number">02</span>
        <h3 class="process__step-title">Concept &amp; Design</h3>
        <p class="process__step-desc">We develop concept drawings, 3D visualisations, and material palettes for your approval before a single brick is laid.</p>
      </div>
      <div class="process__step">
        <span class="process__step-number">03</span>
        <h3 class="process__step-title">Documentation</h3>
        <p class="process__step-desc">Full technical drawings, BOQ, and specifications so contractors can execute the design precisely.</p>
      </div>
      <div class="process__step">
        <span class="process__step-number">04</span>
        <h3 class="process__step-title">On-Site Supervision</h3>
        <p class="process__step-desc">We stay involved through construction to ensure quality and handle changes as they arise.</p>
      </div>
    </div>
  </div>
</section>
```

**CSS** to add in `assets/css/main.css` (or a new section at the bottom of the file):
```css
/* Process Section */
.process {
  padding: var(--space-xl) 0;
  background: var(--gray-100);
}
.process__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}
.process__label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gray-500);
  margin-bottom: var(--space-xs);
}
.process__title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: var(--gray-900);
  margin-bottom: var(--space-lg);
}
.process__steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-md);
}
.process__step {
  padding: var(--space-md);
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
.process__step-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-200);
  margin-bottom: var(--space-xs);
}
.process__step-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: var(--space-xs);
}
.process__step-desc {
  font-size: 0.875rem;
  color: var(--gray-500);
  line-height: 1.6;
}
```

---

### 8. Add project thumbnail images to testimonial cards — `index.html` lines 673–700

Each of the three `<div class="testimonials__item">` blocks maps to a known project. Add a small project image inside each item **above** the rating stars.

Mapping:
- Item 1 (Chinar Factory Outlet) → `assets/images/projects/ChinarOct2025/IMG_1876.webp`
- Item 2 (Kapsons Solan) → `assets/images/projects/KapsonsSolanOct2023/IMG-20251016-WA0017.webp`
- Item 3 (City Mall Yamunanagar) → `assets/images/projects/Yamunanagar City Mall/IMG-20251024-WA0029.jpg`

Inside each `<div class="testimonials__item">`, insert before `<div class="testimonials__rating">`:
```html
<div class="testimonials__project-img">
  <img src="assets/images/projects/ChinarOct2025/IMG_1876.webp"
       alt="Chinar Factory Outlet project"
       loading="lazy" />
</div>
```

**CSS** to add:
```css
.testimonials__project-img {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-sm);
}
.testimonials__project-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

---

### 9. Add a project representative image to each service card — `index.html` lines 607–660

Each of the three `<div class="service">` blocks is text-only. Add a representative image above the service number.

Mapping:
- Service 01 (Residential Architecture) → `assets/images/projects/rohiniapril2021/` — pick the best image from that folder
- Service 02 (Retail Design) → `assets/images/projects/ChinarOct2025/IMG_1895.webp`
- Service 03 (Commercial Architecture) → `assets/images/projects/Yamunanagar City Mall/IMG-20251024-WA0031.jpg`

Inside each `<div class="service">`, insert before `<div class="service__number">`:
```html
<div class="service__image">
  <img src="[path]" alt="[Service name] by A&S Design Studio" loading="lazy" />
</div>
```

**CSS** to add:
```css
.service__image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  margin: calc(-1 * var(--space-md)) calc(-1 * var(--space-md)) var(--space-md);
}
.service__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.service:hover .service__image img {
  transform: scale(1.04);
}
```

Check that the `.service` card already has `overflow: hidden` or add it. The negative margin trick bleeds the image to the card edges; if the service card uses padding (which it does via `main.css`), verify the rendered result and adjust the margin/padding accordingly.

**Note to developer**: Check `assets/images/projects/rohiniapril2021/` first — list its contents and choose the strongest image before hardcoding a path for Service 01.

---

### 10. Add a warm accent color token — `assets/css/main.css`

The current accent is pure black (`#000000`). Add a secondary warm accent to use on hover states, category labels, and section sub-headings.

In `:root` in `assets/css/main.css`, add two new tokens after the existing `--accent-hover` line:
```css
--accent-warm: #c9a96e;
--accent-warm-hover: #b8913d;
```

Apply `--accent-warm` selectively to:
- Section label spans (classes like `.about__label`, `.services__label`, `.testimonials__label`, `.contact__label`) — change `color` from `var(--gray-500)` to `var(--accent-warm)`
- The `--accent-warm` color should **not** replace `--accent` on primary buttons or the nav; those stay black

Search for all `.--label` class rules: `grep -n "__label" assets/css/main.css` to find the exact lines.

---

### 11. Link the "5.0 Rating" trust bar item to a real review source — `index.html` line ~347

Current markup (inside `hero__trust`):
```html
<div class="hero__trust-item">
  <strong>⭐⭐⭐⭐⭐</strong>
  <span>5.0 Rating</span>
</div>
```

Wrap the `<div>` content in an `<a>` tag pointing to the studio's Google Business profile. If the profile URL is not yet known, add a `TODO` comment and use `#` temporarily — do **not** link to a generic Google search.

```html
<div class="hero__trust-item">
  <a href="https://g.page/r/[PLACE_ID]/review" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit">
    <strong>⭐⭐⭐⭐⭐</strong>
    <span>5.0 Rating on Google</span>
  </a>
</div>
```

---

### 12. Add founder profile to About section — `index.html` ~line 600

The `about__image` currently shows a project photo. The `/assets/images/` directory has no `team/` subfolder yet — one must be created.

**Pre-requisite (content, not code)**: The studio must provide a professional photo of Ar. Shreya Jain. Save it as `assets/images/team/shreya-jain.webp`.

Once the photo is available:

Add a founder card below the `about__stats` div and before the closing `</div>` of `about__content`:
```html
<div class="about__founder">
  <img
    src="assets/images/team/shreya-jain.webp"
    alt="Ar. Shreya Jain, Principal Architect"
    loading="lazy"
    class="about__founder-photo"
  />
  <div class="about__founder-info">
    <strong>Ar. Shreya Jain</strong>
    <span>Principal Architect &amp; Founder</span>
    <p>[B.Arch / M.Arch / Registration number — fill in actual credentials]</p>
  </div>
</div>
```

**CSS** to add:
```css
.about__founder {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  padding: var(--space-sm);
  background: var(--gray-100);
  border-radius: var(--radius-md);
}
.about__founder-photo {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.about__founder-info strong {
  display: block;
  font-size: 0.9rem;
  color: var(--gray-900);
}
.about__founder-info span {
  display: block;
  font-size: 0.75rem;
  color: var(--gray-500);
}
.about__founder-info p {
  font-size: 0.75rem;
  color: var(--gray-600);
  margin-top: 2px;
}
```

This step is **blocked** until the photo asset is provided. Mark it as pending with a `<!-- TODO: add founder photo -->` comment in the HTML.

---

### 13. Fix blog post thumbnails — `blog.html`

All blog card `<img>` elements currently pull from `ChinarOct2025/`. Each article should use a topic-representative image.

| Blog post | Current image | Replace with |
|-----------|--------------|--------------|
| Budget Planning in Construction | `ChinarOct2025/IMG_1890.webp` | A wide-angle interior/construction shot — use `Yamunanagar City Mall/IMG-20251024-WA0030.jpg` |
| Do You Need an Architect | `ChinarOct2025/IMG_1877.webp` | A design/drawing-table feel — use `KapsonsSolanOct2023/IMG-20251016-WA0018.webp` |
| Can Architect Design Within Budget | Check line content | Use `cp67jan2024/` folder image |

For any additional blog cards that also use Chinar images, apply the same principle: pick an image from a **different** project folder that loosely fits the article topic.

---

## Verification

After each step, open `index.html` in a browser locally (no server needed for static files):

1. **Step 1**: Footer shows `© 2026`.
2. **Step 2**: Portfolio grid shows exactly 4 cards; no broken image icons visible. Filter buttons work.
3. **Steps 3 & 4**: No "Award-Winning" text visible anywhere on the page. CTA banner shows updated copy.
4. **Step 5**: Footer shows location string. Maps link opens Google Maps in a new tab.
5. **Step 6**: Clicking Instagram/LinkedIn/Behance icons opens the correct profile page in a new tab.
6. **Step 7**: "How We Work" 4-step grid appears between Services and Testimonials. Renders cleanly on mobile (check at 375px width).
7. **Step 8**: Each testimonial card shows a project photo above the stars.
8. **Step 9**: Each service card shows a project photo at the top.
9. **Step 10**: Section labels (About, Services, etc.) render in warm gold (`#c9a96e`). Primary buttons remain black.
10. **Step 11**: Clicking the rating trust-bar item navigates to Google Business profile.
11. **Step 12**: Founder card visible in About section with circular photo (once asset is provided).
12. **Step 13**: Blog cards each show a distinct image; no two cards share the same photo.

**Responsive check**: After all steps, test at 375px, 768px, and 1440px viewport widths. Focus specifically on:
- Process section grid (Step 7) collapsing to single-column on mobile
- Testimonial images (Step 8) not breaking card height on small screens
- Service images (Step 9) not cropped unacceptably on mobile

---

## Decisions

- **Removed placeholders vs. "Coming Soon" cards**: Chose full removal over a "Coming Soon" state. A "Coming Soon" label still advertises absent work; an empty slot does not.
- **Warm accent scoped to labels only**: Applying `--accent-warm` only to label spans (not buttons or headings) avoids a full rebrand while still introducing warmth. The black primary buttons stay consistent with the iOS-inspired system.
- **Process section background `var(--gray-100)`**: Breaks the monotony of alternating white sections without introducing a new color.
- **Service images with negative margin bleed**: Matches the full-bleed card image pattern already used in `project-item__image`, keeping visual consistency.
- **Step 12 gated on asset**: No placeholder or silhouette should be shown for the founder photo — a low-quality or absent photo is worse than no photo. The step is marked blocked until the asset is ready.
