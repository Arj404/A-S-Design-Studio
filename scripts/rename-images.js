'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const PROJECT_IMAGES_DIR = path.join(WORKSPACE_ROOT, 'assets', 'images', 'projects');
const MAP_FILE = path.join(PROJECT_IMAGES_DIR, 'rename-map.json');

// Subdirectories under workspace root that may contain HTML project/blog pages.
// Add new subdirectory names here if the site structure expands.
const HTML_SUBDIRS = ['projects', 'blog'];

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.webp', '.png', '.gif']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm']);
// Files that live in project folders but must not be renamed
const SKIP_FILES = new Set(['.ds_store', 'project-placeholder.svg', 'rename-map.json']);

// Canonical pattern for a renamed filename (base name only, no extension)
const FIVE_CHAR_RE = /^[a-z0-9]{5}$/;

// ---------------------------------------------------------------------------
// CLI options (parsed once at module load; guards let tests override via env)
// ---------------------------------------------------------------------------

const CLI_ARGS = process.argv.slice(2);

/**
 * --dry-run   Print what would happen without writing anything to disk.
 * --folder X  Limit processing to a single project folder named X.
 *             Useful when adding one new project without touching existing ones.
 */
const IS_DRY_RUN = CLI_ARGS.includes('--dry-run');
const FOLDER_FILTER = (() => {
  const idx = CLI_ARGS.indexOf('--folder');
  return idx !== -1 && CLI_ARGS[idx + 1] ? CLI_ARGS[idx + 1] : null;
})();

// ---------------------------------------------------------------------------
// Pure helpers (exported for unit tests)
// ---------------------------------------------------------------------------

/**
 * Generate a unique 5-character lowercase alphanumeric name.
 * Uses crypto.randomBytes for randomness; retries on collision.
 *
 * @param {Set<string>} usedNames - Set of base names already in use.
 * @returns {string} A 5-char name not present in usedNames.
 */
function generateUniqueName(usedNames) {
  let name;
  do {
    // 3 bytes → 6-char hex → take first 5 chars (always [a-f0-9])
    name = crypto.randomBytes(3).toString('hex').slice(0, 5);
  } while (usedNames.has(name));
  usedNames.add(name);
  return name;
}

/**
 * Apply the rename map to a single HTML content string.
 * Uses folder/filename as the search key to avoid false positives on
 * short names like "1.jpg" that might appear elsewhere in content.
 *
 * @param {string} content - Full HTML file content.
 * @param {Array<{folder:string, old:string, new:string}>} map - Rename entries.
 * @returns {{ content: string, replacements: number }}
 */
function applyMapToHtml(content, map) {
  let replacements = 0;
  for (const entry of map) {
    if (entry.old === entry.new) continue;
    const searchStr = `${entry.folder}/${entry.old}`;
    const replaceStr = `${entry.folder}/${entry.new}`;
    const parts = content.split(searchStr);
    if (parts.length > 1) {
      replacements += parts.length - 1;
      content = parts.join(replaceStr);
    }
  }
  return { content, replacements };
}

// ---------------------------------------------------------------------------
// File-system operations (not exported — side-effectful)
// ---------------------------------------------------------------------------

/**
 * Discover all HTML files that may reference project images:
 *   - Every *.html in the workspace root
 *   - Every *.html inside HTML_SUBDIRS (projects/, blog/, etc.)
 *
 * This means new project pages are picked up automatically without editing
 * this script.
 *
 * @returns {string[]} Absolute paths to HTML files.
 */
function discoverHtmlFiles() {
  const htmlFiles = [];

  for (const entry of fs.readdirSync(WORKSPACE_ROOT, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) {
      htmlFiles.push(path.join(WORKSPACE_ROOT, entry.name));
    }
  }

  for (const subdir of HTML_SUBDIRS) {
    const subdirPath = path.join(WORKSPACE_ROOT, subdir);
    if (!fs.existsSync(subdirPath)) continue;
    for (const entry of fs.readdirSync(subdirPath, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.html')) {
        htmlFiles.push(path.join(subdirPath, entry.name));
      }
    }
  }

  return htmlFiles;
}

function loadExistingMap() {
  if (fs.existsSync(MAP_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Build the complete rename map for all project image/video files.
 * Idempotent: a file already renamed to a 5-char name and present in the
 * existing map will not be re-renamed.
 *
 * @param {{ folderFilter?: string|null }} [opts]
 * @returns {Array<{folder:string, old:string, new:string}>}
 */
function buildRenameMap({ folderFilter = null } = {}) {
  const existing = loadExistingMap();

  // Index existing entries two ways for O(1) idempotency checks
  const existingByOld = new Map(); // "folder/oldName" → entry
  const existingByNew = new Map(); // "folder/newName" → entry
  const usedNames = new Set();

  for (const entry of existing) {
    existingByOld.set(`${entry.folder}/${entry.old}`, entry);
    existingByNew.set(`${entry.folder}/${entry.new}`, entry);
    usedNames.add(path.parse(entry.new).name);
  }

  const map = [];
  const topEntries = fs.readdirSync(PROJECT_IMAGES_DIR, { withFileTypes: true });

  for (const dirent of topEntries) {
    if (!dirent.isDirectory()) continue;

    const folder = dirent.name;

    // --folder flag: skip any project folder that isn't the target
    if (folderFilter && folder !== folderFilter) {
      // Carry over existing map entries so the saved map stays complete
      for (const entry of existing) {
        if (entry.folder === folder) map.push(entry);
      }
      continue;
    }
    const folderPath = path.join(PROJECT_IMAGES_DIR, folder);
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const lowerName = file.toLowerCase();
      if (SKIP_FILES.has(lowerName)) continue;

      const ext = path.extname(lowerName);
      if (!IMAGE_EXTS.has(ext) && !VIDEO_EXTS.has(ext)) continue;

      const baseName = path.parse(file).name;
      const fileKey = `${folder}/${file}`;

      // Case 1: file on disk is already the renamed 5-char name from a prior run
      if (FIVE_CHAR_RE.test(baseName) && existingByNew.has(fileKey)) {
        map.push(existingByNew.get(fileKey));
        continue;
      }

      // Case 2: file still has its old name and we have a prior mapping for it
      if (existingByOld.has(fileKey)) {
        map.push(existingByOld.get(fileKey));
        continue;
      }

      // Case 3: net-new file — generate a fresh unique name
      const newBase = generateUniqueName(usedNames);
      map.push({ folder, old: file, new: newBase + ext });
    }
  }

  return map;
}

function renameFiles(map, { dryRun = false } = {}) {
  // Pre-flight: every entry must have at least one side of the rename on disk
  const missing = [];
  for (const entry of map) {
    const oldPath = path.join(PROJECT_IMAGES_DIR, entry.folder, entry.old);
    const newPath = path.join(PROJECT_IMAGES_DIR, entry.folder, entry.new);
    if (!fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
      missing.push(`${entry.folder}/${entry.old}`);
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `Neither old nor new path exists for:\n  ${missing.join('\n  ')}`
    );
  }

  let count = 0;
  for (const entry of map) {
    if (entry.old === entry.new) continue;
    const oldPath = path.join(PROJECT_IMAGES_DIR, entry.folder, entry.old);
    const newPath = path.join(PROJECT_IMAGES_DIR, entry.folder, entry.new);

    if (fs.existsSync(oldPath)) {
      const tag = dryRun ? '[DRY-RUN]' : '[RENAME]';
      console.log(`${tag} ${entry.folder}: ${entry.old} → ${entry.new}`);
      if (!dryRun) fs.renameSync(oldPath, newPath);
      count++;
    }
    // oldPath gone but newPath present → already renamed in a prior run, skip silently
  }
  return count;
}

function updateHtmlFiles(map, { dryRun = false } = {}) {
  const htmlFiles = discoverHtmlFiles();
  let filesChanged = 0;

  for (const htmlFile of htmlFiles) {
    if (!fs.existsSync(htmlFile)) continue;

    const original = fs.readFileSync(htmlFile, 'utf8');
    const { content, replacements } = applyMapToHtml(original, map);

    if (content !== original) {
      const rel = path.relative(WORKSPACE_ROOT, htmlFile);
      const tag = dryRun ? '[DRY-RUN]' : '[HTML]';
      console.log(`${tag} ${rel} — ${replacements} replacement(s)`);
      if (!dryRun) fs.writeFileSync(htmlFile, content, 'utf8');
      filesChanged++;
    }
  }

  return filesChanged;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main() {
  try {
    if (IS_DRY_RUN) console.log('[DRY-RUN] No files will be changed.');
    if (FOLDER_FILTER) console.log(`[INFO]  Targeting project folder: ${FOLDER_FILTER}`);

    console.log('[START] Building rename map...');
    const map = buildRenameMap({ folderFilter: FOLDER_FILTER });

    // Identify net-new entries (files not in the existing map) for reporting
    const existing = loadExistingMap();
    const existingKeys = new Set(existing.map(e => `${e.folder}/${e.old}`));
    const newEntries = map.filter(e => !existingKeys.has(`${e.folder}/${e.old}`));

    console.log(`[INFO]  ${map.length} project media files found (${newEntries.length} new)`);

    const renamedCount = renameFiles(map, { dryRun: IS_DRY_RUN });
    const htmlChanges = updateHtmlFiles(map, { dryRun: IS_DRY_RUN });

    if (!IS_DRY_RUN) {
      fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 2), 'utf8');
      console.log(
        `[DONE]  rename-map.json written (${map.length} entries), ` +
          `${renamedCount} file(s) renamed, ${htmlChanges} HTML file(s) updated`
      );
    } else {
      console.log(
        `[DONE]  Dry run complete — ${renamedCount} file(s) would be renamed, ` +
          `${htmlChanges} HTML file(s) would be updated`
      );
    }
  } catch (err) {
    console.error('[ERROR]', err.message);
    process.exit(1);
  }
}

module.exports = { generateUniqueName, applyMapToHtml, FIVE_CHAR_RE };

if (require.main === module) {
  main();
}
