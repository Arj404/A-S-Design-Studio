## Plan: Image Rename — 5-Character Random Filenames
**ID**: portfolio-001  
**Date**: 2026-05-09  
**Spec**: [.copilot/spec/portfolio-001.md](../../../spec/portfolio-001.md)

Rename all 87 project media files to unique 5-char lowercase alphanumeric codes, then do a text-replace pass across all 8 HTML files to update every reference. A Node.js script handles both operations atomically and writes `rename-map.json` as a log. No HTML pages should have broken images after this is complete.

---

## File Inventory

### Files to rename (87 total)

**`assets/images/projects/ChinarOct2025/`** — 12 files  
`IMG_1873.webp`, `IMG_1874.webp`, `IMG_1876.webp`, `IMG_1877.webp`, `IMG_1878.webp`, `IMG_1879.webp`, `IMG_1881.webp`, `IMG_1883.webp`, `IMG_1887.webp`, `IMG_1890.webp`, `IMG_1895.webp`, `IMG_1898.webp`

**`assets/images/projects/KapsonsSolanOct2023/`** — 10 files  
`IMG-20251016-WA0012.webp`, `IMG-20251016-WA0015.png`, `IMG-20251016-WA0016.webp`, `IMG-20251016-WA0017.webp`, `IMG-20251016-WA0018.webp`, `IMG-20251016-WA0019.webp`, `IMG-20251016-WA0020.webp`, `IMG-20251016-WA0021.webp`, `IMG-20251016-WA0022.webp`, `IMG-20251016-WA0023.webp`

**`assets/images/projects/cp67jan2024/`** — 10 files  
`21440aeb.jpg`, `87658c41.jpg`, `a41105df.jpg`, `3a371d6a.mp4`, `51df8e5d.mp4`,  
`WhatsApp Image 2026-05-01 at 22.22.49 (1).jpeg`, `WhatsApp Image 2026-05-01 at 22.22.49 (2).jpeg`,  
`WhatsApp Image 2026-05-01 at 22.22.49.jpeg`, `WhatsApp Image 2026-05-01 at 22.22.50 (1).jpeg`,  
`WhatsApp Image 2026-05-01 at 22.22.50.jpeg`

**`assets/images/projects/Yamunanagar City Mall/`** — 7 files  
`IMG-20251024-WA0028.jpg`, `IMG-20251024-WA0029.jpg`, `IMG-20251024-WA0030.jpg`, `IMG-20251024-WA0031.jpg`, `IMG-20251024-WA0032.jpg`, `IMG-20251024-WA0033.jpg`, `IMG-20251024-WA0034.jpg`

**`assets/images/projects/KapoorResidenceModelTownjan2020/`** — 16 files  
`1.jpg`, `2.jpg`, `3.jpg`, `3 copy.jpg`, `4.jpg`, `5.jpg`, `1 FLOOR LOBBY.jpg`,  
`CAM_01.jpg`, `CAM_02.jpg`, `CAM_03.jpg`, `CAM_04.jpg`, `CAM_002.jpg`, `CAM_011.jpg`,  
`LOBBY.jpg`, `LOBBY_02.jpg`, `0f6ca575c7976d99b8ae02b0526540c8.jpg`  
> Note: HTML currently only references `1.jpg`–`5.jpg`. The other 11 files exist on disk but are unreferenced. All 16 are renamed; HTML updates only cover the 5 currently referenced.

**`assets/images/projects/rohiniapril2021/`** — 5 files  
`1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`  
> Skip `.DS_Store` in this folder.

**`assets/images/projects/CpOfficejan2024/`** — 19 files  
`WhatsApp Image 2026-05-01 at 22.19.29 (1).jpeg` through `WhatsApp Image 2026-05-01 at 22.19.30 (13).jpeg`  
(19 files; no HTML page yet — rename on disk only)

**`assets/images/projects/VijayStoreapril2023/`** — 8 files  
`WhatsApp Image 2026-05-01 at 22.21.37 (1).jpeg` through `WhatsApp Image 2026-05-01 at 22.21.38 (5).jpeg`  
(8 files; no HTML page yet — rename on disk only)

### Files to skip (do NOT rename)
- `assets/images/projects/project-placeholder.svg` — utility file in projects root, not a project image
- `assets/images/projects/**/.DS_Store` — OS metadata
- All files under `assets/images/general/` — logo, title-logo
- All files under `assets/images/team/` — founder photo

---

## Steps

### Step 1 — Create `scripts/rename-images.js`

Create the file at `scripts/rename-images.js` in the workspace root (not inside `assets/`).

The script must do the following in this exact order:

**1a. Define constants**  
- `PROJECT_IMAGES_DIR` = `path.resolve(__dirname, '../assets/images/projects')`  
- `HTML_FILES` = absolute paths of these 8 files in the workspace root:  
  `index.html`, `chinar-factory-outlet.html`, `kapsons-solan.html`, `kapkids-cp67.html`,  
  `city-mall-yamunanagar.html`, `kapoor-residence-model-town.html`, `rohini-residence.html`, `blog.html`
- `MAP_FILE` = `path.join(PROJECT_IMAGES_DIR, 'rename-map.json')`
- `IMAGE_EXTS` = `new Set(['.jpg', '.jpeg', '.webp', '.png', '.gif'])`
- `VIDEO_EXTS` = `new Set(['.mp4', '.mov', '.webm'])`
- `SKIP_FILES` = `new Set(['.ds_store', 'project-placeholder.svg'])`

**1b. `generateUniqueName(usedNames)` function**  
Use `crypto.randomBytes(3)` to generate 3 bytes, convert to a 6-char hex string, then take the first 5 chars. If the 5-char string already exists in `usedNames`, retry. The result must match `/^[a-z0-9]{5}$/`. Add each generated name to `usedNames` before returning.

**1c. `loadExistingMap()` function**  
If `MAP_FILE` exists, parse and return it as an array. Otherwise return `[]`.

**1d. `buildRenameMap()` function** (idempotency core)  
- Load existing map entries into a lookup: `existingByOld` keyed by `folder + "/" + old`.
- Collect `usedNames` from the existing map (all `new` basenames without extension).
- Walk every subdirectory of `PROJECT_IMAGES_DIR` using `fs.readdirSync` (one level only — do not recurse into sub-subdirectories).  
- For each file in each subfolder:  
  - Skip if `SKIP_FILES` has the lowercased filename.  
  - Skip if neither `IMAGE_EXTS` nor `VIDEO_EXTS` contains the lowercased extension.  
  - If file already matches `/^[a-z0-9]{5}\.[a-z0-9]+$/` AND it appears in `existingByOld` (meaning it was already renamed by this script), skip (idempotent).  
  - Otherwise, check `existingByOld` for a prior mapping entry. If one exists (old name from a prior run), use that same `new` name — don't regenerate.  
  - If no prior entry, generate a new unique 5-char name and create a map entry: `{ folder, old, new: newName + ext }`.
- Return the complete map array.

**1e. `renameFiles(map)` function**  
For each map entry, if `path.join(PROJECT_IMAGES_DIR, entry.folder, entry.old)` exists on disk (and `entry.old !== entry.new`), rename it to `entry.new` using `fs.renameSync`. Log each rename. If the old file no longer exists but the new file does, it was already renamed — skip silently.

**1f. `updateHtmlFiles(map)` function**  
Build a flat lookup: for each map entry, key = the exact string that appears in HTML src/content attributes (the filename portion only, e.g. `IMG_1873.webp`), value = new filename (e.g. `a3f9k.webp`).  
For each HTML file in `HTML_FILES`:  
  - Read the full file content as a UTF-8 string.  
  - For each map entry, replace ALL occurrences of `entry.old` with `entry.new` using a global string replace (`split(old).join(new)` — not regex, to avoid escaping issues with special chars like parentheses in WhatsApp filenames).  
  - If the content changed, write the file back.  
  - Log how many replacements were made per file.

**1g. `main()` function**  
Call in order: `buildRenameMap()` → `renameFiles(map)` → `updateHtmlFiles(map)` → `fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 2))`. Wrap in try/catch; on error, log and exit with code 1.

**1h. Error safety**  
Before running `renameFiles`, check that all `entry.old` files exist OR `entry.new` files exist (at least one must be true). If neither exists, abort with a clear error listing the missing file.

---

### Step 2 — Run the script

From the workspace root:

```
node scripts/rename-images.js
```

Expected console output:
- One line per renamed file: `[RENAME] ChinarOct2025: IMG_1873.webp → a3f9k.webp`
- One line per HTML file updated: `[HTML] index.html — 3 replacements`
- Final line: `[DONE] rename-map.json written (87 entries)`

---

### Step 3 — Verify `rename-map.json`

Open `assets/images/projects/rename-map.json`. Confirm:
- Exactly 87 entries (or however many files were found — confirm count matches the inventory above).
- Every `new` value matches `/^[a-z0-9]{5}\.[a-z0-9]+$/`.
- No two entries share the same `new` value.
- The 5 previously-named files in `cp67jan2024/` (`21440aeb.jpg`, `87658c41.jpg`, `a41105df.jpg`, `3a371d6a.mp4`, `51df8e5d.mp4`) each have entries with new 5-char names (they don't match the 5-char pattern so they ARE renamed).

---

### Step 4 — Verify HTML references (8 HTML files)

For each HTML file below, check the listed attributes contain new 5-char names. No old-format names should remain.

**`index.html`** — check these `<img src>` attributes still resolve (new names):
- Hero section: the Chinar hero image (was `IMG_1873.webp`)
- `<link rel="preload" href="...">` near top of `<head>`
- OG `content=` and Twitter `content=` meta tags
- Work grid thumbnails: one per project (6 `<img src>` in the grid)
- About section image (was `IMG_1881.webp`)
- Services section images (rohiniapril2021 and others)

**`chinar-factory-outlet.html`** — 12 gallery `<img src>` + `<link rel="preload" href>` + OG/Twitter meta + JSON-LD `image` array

**`kapsons-solan.html`** — 9 gallery `<img src>` + OG/Twitter meta + JSON-LD `image` array  
> Also verify `IMG-20251016-WA0015.png` rename doesn't break anything (it's on disk but not yet in HTML — that's expected at this stage)

**`kapkids-cp67.html`** — 3 `<img src>` + 2 `<source src>` + 2 `<video poster>` + OG/Twitter meta + JSON-LD  
> The `poster` attribute on the two `<video>` elements also references project images and must be updated.

**`city-mall-yamunanagar.html`** — 7 gallery `<img src>` + OG/Twitter meta + JSON-LD

**`kapoor-residence-model-town.html`** — 5 gallery `<img src>` (only `1.jpg`–`5.jpg` refs) + OG/Twitter meta + JSON-LD  
> The 11 unreferenced files (`CAM_*.jpg`, `LOBBY*.jpg`, etc.) have no HTML refs — no HTML update needed for them.

**`rohini-residence.html`** — 5 gallery `<img src>` + OG/Twitter meta

**`blog.html`** — 3 `<img src>` in article cards + OG `content=` meta + Twitter `content=` meta  
> Lines 38, 54 (meta tags), 137 (Yamunanagar image), 170 (Kapsons image), 203 (cp67 image)

---

### Step 5 — Browser smoke test

Open each of the following in a browser with DevTools Network panel open. Confirm 0 media 404s:
1. `index.html`
2. `chinar-factory-outlet.html`
3. `kapsons-solan.html`
4. `kapkids-cp67.html`
5. `city-mall-yamunanagar.html`
6. `kapoor-residence-model-town.html`
7. `rohini-residence.html`
8. `blog.html`

Also confirm the two Kapkids videos (`<video>`) still play in-browser (the `<source src>` and `poster` attribute both point to new names).

---

### Step 6 — Idempotency check

Run the script a second time:

```
node scripts/rename-images.js
```

Expected: `[DONE] 0 files renamed, 0 HTML changes` (or similar — all files already match pattern, nothing to do). If any renames happen on second run, the idempotency logic in Step 1d is broken — fix and rerun.

---

### Step 7 — Commit

Stage and commit all changed files:
- `scripts/rename-images.js` (new file)
- `assets/images/projects/rename-map.json` (new file)
- `assets/images/projects/**/*` (renamed files — git sees these as delete + add pairs)
- `index.html` (updated refs)
- All 6 project HTML files (updated refs)
- `blog.html` (updated refs)

Commit message: `feat(assets): rename all project images to 5-char random codes (portfolio-001)`

---

## Decisions

- **Node.js script over shell script**: shell `rename`/`mv` + `sed` combination handles spaces in filenames poorly on both macOS and Linux. Node's `fs.renameSync` treats the full string as-is and handles `WhatsApp Image 2026-05-01 at 22.22.49 (1).jpeg` without escaping issues.
- **`split().join()` over regex replace**: WhatsApp filenames contain `(`, `)`, `.` which are regex metacharacters. String split/join avoids escaping entirely.
- **Script in `scripts/` root, not `assets/`**: keeps tooling separate from static assets.
- **Skip `project-placeholder.svg`**: it lives in the projects root, not a project subfolder, and is a utility asset not a project image. Renaming it would break any future reference.
- **Existing 8-char hex names (`21440aeb`, etc.) ARE renamed**: they don't match the 5-char pattern so the script treats them as needing rename. The HTML is updated in the same pass.
- **Unreferenced files in `KapoorResidenceModelTownjan2020/`**: 11 files (`CAM_*.jpg`, `LOBBY*.jpg`, `1 FLOOR LOBBY.jpg`, `3 copy.jpg`, `0f6ca575...jpg`) are renamed on disk but require no HTML updates now. They will be included in `GALLERY_CONFIG` when `portfolio-003` is implemented.

---

## Verification

- `node -e "const m = require('./assets/images/projects/rename-map.json'); const names = m.map(e => e.new.split('.')[0]); console.log('unique:', new Set(names).size === names.length, 'count:', names.length)"` — must print `unique: true count: 87`
- `grep -r "IMG_1873\|IMG-20251016\|IMG-20251024\|WhatsApp Image" *.html` — must return no matches after script runs
- `find assets/images/projects -type f ! -name "*.json" ! -name "*.svg" ! -name ".DS_Store" | grep -vP "^assets/images/projects/[^/]+/[a-z0-9]{5}\.[a-z0-9]+$"` — must return empty (all files match the pattern)
