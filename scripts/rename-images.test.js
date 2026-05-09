'use strict';

/**
 * Unit tests for rename-images.js pure functions.
 * Run with: node scripts/rename-images.test.js
 * Requires Node 18+ (node:test built-in).
 */

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const { generateUniqueName, applyMapToHtml, FIVE_CHAR_RE } = require('./rename-images');

// ---------------------------------------------------------------------------
// FIVE_CHAR_RE
// ---------------------------------------------------------------------------

describe('FIVE_CHAR_RE', () => {
  test('matches valid 5-char lowercase alphanumeric strings', () => {
    assert.ok(FIVE_CHAR_RE.test('a3f9k'));
    assert.ok(FIVE_CHAR_RE.test('00000'));
    assert.ok(FIVE_CHAR_RE.test('fffff'));
    assert.ok(FIVE_CHAR_RE.test('abc12'));
    assert.ok(FIVE_CHAR_RE.test('09azz'));
  });

  test('rejects uppercase letters', () => {
    assert.ok(!FIVE_CHAR_RE.test('A3F9K'));
    assert.ok(!FIVE_CHAR_RE.test('ABC12'));
  });

  test('rejects wrong lengths', () => {
    assert.ok(!FIVE_CHAR_RE.test('ab12'));    // 4 chars
    assert.ok(!FIVE_CHAR_RE.test('abc123'));  // 6 chars
    assert.ok(!FIVE_CHAR_RE.test(''));        // empty
  });

  test('rejects special characters and spaces', () => {
    assert.ok(!FIVE_CHAR_RE.test('ab_12'));   // underscore
    assert.ok(!FIVE_CHAR_RE.test('ab-12'));   // hyphen
    assert.ok(!FIVE_CHAR_RE.test('ab 12'));   // space
    assert.ok(!FIVE_CHAR_RE.test('ab.12'));   // dot
  });

  test('rejects old-style device filenames', () => {
    assert.ok(!FIVE_CHAR_RE.test('IMG_1873'));
    assert.ok(!FIVE_CHAR_RE.test('21440aeb'));  // 8-char hex from cp67jan2024
    assert.ok(!FIVE_CHAR_RE.test('3a371d6a'));  // mp4 base name
  });
});

// ---------------------------------------------------------------------------
// generateUniqueName
// ---------------------------------------------------------------------------

describe('generateUniqueName', () => {
  test('returns a name matching FIVE_CHAR_RE', () => {
    const used = new Set();
    const name = generateUniqueName(used);
    assert.match(name, FIVE_CHAR_RE);
  });

  test('returned name has exactly 5 characters', () => {
    const used = new Set();
    const name = generateUniqueName(used);
    assert.equal(name.length, 5);
  });

  test('adds the generated name to usedNames', () => {
    const used = new Set();
    const name = generateUniqueName(used);
    assert.ok(used.has(name), 'usedNames should contain the generated name');
  });

  test('never produces a name already in usedNames', () => {
    const used = new Set();
    const names = new Set();
    for (let i = 0; i < 200; i++) {
      const name = generateUniqueName(used);
      assert.ok(!names.has(name), `Duplicate name generated: ${name}`);
      names.add(name);
    }
  });

  test('skips names pre-seeded in usedNames', () => {
    // Pre-fill with some names to prove the retry logic works
    const preseeded = new Set(['aaa00', 'bbb11', 'ccc22']);
    const used = new Set(preseeded);
    for (let i = 0; i < 50; i++) {
      const name = generateUniqueName(used);
      assert.match(name, FIVE_CHAR_RE);
      // All generated names must be distinct from each other
      assert.ok(used.has(name));
    }
    // usedNames grew by 50
    assert.equal(used.size, preseeded.size + 50);
  });

  test('grows usedNames by exactly one per call', () => {
    const used = new Set();
    for (let i = 1; i <= 10; i++) {
      generateUniqueName(used);
      assert.equal(used.size, i);
    }
  });
});

// ---------------------------------------------------------------------------
// applyMapToHtml — replacement logic
// ---------------------------------------------------------------------------

describe('applyMapToHtml', () => {
  test('replaces a single filename reference', () => {
    const content = '<img src="assets/images/projects/ChinarOct2025/IMG_1873.webp" />';
    const map = [{ folder: 'ChinarOct2025', old: 'IMG_1873.webp', new: 'a3f9k.webp' }];
    const { content: result, replacements } = applyMapToHtml(content, map);
    assert.ok(result.includes('ChinarOct2025/a3f9k.webp'));
    assert.ok(!result.includes('IMG_1873.webp'));
    assert.equal(replacements, 1);
  });

  test('replaces all occurrences in one pass (meta tag + preload + img src)', () => {
    const folder = 'ChinarOct2025';
    const content = [
      `<meta content="https://example.com/assets/images/projects/ChinarOct2025/IMG_1873.webp" />`,
      `<link rel="preload" href="assets/images/projects/ChinarOct2025/IMG_1873.webp" />`,
      `<img src="assets/images/projects/ChinarOct2025/IMG_1873.webp" />`,
    ].join('\n');
    const map = [{ folder, old: 'IMG_1873.webp', new: 'a3f9k.webp' }];
    const { content: result, replacements } = applyMapToHtml(content, map);
    assert.equal((result.match(/a3f9k\.webp/g) || []).length, 3);
    assert.ok(!result.includes('IMG_1873.webp'));
    assert.equal(replacements, 3);
  });

  test('handles WhatsApp filenames with spaces and parentheses', () => {
    const folder = 'cp67jan2024';
    const oldName = 'WhatsApp Image 2026-05-01 at 22.22.49 (1).jpeg';
    const newName = 'x7k2p.jpeg';
    const content = `<img src="assets/images/projects/cp67jan2024/${oldName}" />`;
    const map = [{ folder, old: oldName, new: newName }];
    const { content: result, replacements } = applyMapToHtml(content, map);
    assert.ok(result.includes(`cp67jan2024/${newName}`));
    assert.ok(!result.includes('WhatsApp Image'));
    assert.equal(replacements, 1);
  });

  test('handles folder names with spaces (Yamunanagar City Mall)', () => {
    const folder = 'Yamunanagar City Mall';
    const oldFile = 'IMG-20251024-WA0028.jpg';
    const newFile = 'b9m3q.jpg';
    const content = `<img src="assets/images/projects/Yamunanagar City Mall/${oldFile}" />`;
    const map = [{ folder, old: oldFile, new: newFile }];
    const { content: result, replacements } = applyMapToHtml(content, map);
    assert.ok(result.includes('Yamunanagar City Mall/b9m3q.jpg'));
    assert.ok(!result.includes('WA0028'));
    assert.equal(replacements, 1);
  });

  test('does NOT replace short filenames like "1.jpg" outside project path context', () => {
    const folder = 'KapoorResidenceModelTownjan2020';
    const oldFile = '1.jpg';
    const newFile = 'c2n5x.jpg';
    // "1.jpg" appears both in a project path and in unrelated body text
    const content = [
      `<img src="assets/images/projects/KapoorResidenceModelTownjan2020/1.jpg" />`,
      `<p>See figure 1.jpg for reference details</p>`,
    ].join('\n');
    const map = [{ folder, old: oldFile, new: newFile }];
    const { content: result } = applyMapToHtml(content, map);
    // Project path updated
    assert.ok(result.includes(`KapoorResidenceModelTownjan2020/${newFile}`));
    // Plain "1.jpg" in body text is unchanged (folder prefix not present)
    assert.ok(result.includes('figure 1.jpg'));
  });

  test('handles video source and poster attributes', () => {
    const folder = 'cp67jan2024';
    const oldMp4 = '3a371d6a.mp4';
    const newMp4 = 'qr7wz.mp4';
    const oldJpg = '21440aeb.jpg';
    const newJpg = 'mn3pk.jpg';
    const content = [
      `<video poster="assets/images/projects/cp67jan2024/${oldJpg}">`,
      `  <source src="assets/images/projects/cp67jan2024/${oldMp4}" type="video/mp4" />`,
      `</video>`,
    ].join('\n');
    const map = [
      { folder, old: oldMp4, new: newMp4 },
      { folder, old: oldJpg, new: newJpg },
    ];
    const { content: result, replacements } = applyMapToHtml(content, map);
    assert.ok(result.includes(`cp67jan2024/${newMp4}`));
    assert.ok(result.includes(`cp67jan2024/${newJpg}`));
    assert.ok(!result.includes(oldMp4));
    assert.ok(!result.includes(oldJpg));
    assert.equal(replacements, 2);
  });

  test('skips entries where old === new (no-op)', () => {
    const folder = 'ChinarOct2025';
    const content = '<img src="assets/images/projects/ChinarOct2025/a3f9k.webp" />';
    const map = [{ folder, old: 'a3f9k.webp', new: 'a3f9k.webp' }];
    const { content: result, replacements } = applyMapToHtml(content, map);
    assert.equal(result, content);
    assert.equal(replacements, 0);
  });

  test('processes multiple map entries in a single pass', () => {
    const content = [
      '<img src="assets/images/projects/ChinarOct2025/IMG_1873.webp" />',
      '<img src="assets/images/projects/KapsonsSolanOct2023/IMG-20251016-WA0012.webp" />',
    ].join('\n');
    const map = [
      { folder: 'ChinarOct2025', old: 'IMG_1873.webp', new: 'aaaaa.webp' },
      { folder: 'KapsonsSolanOct2023', old: 'IMG-20251016-WA0012.webp', new: 'bbbbb.webp' },
    ];
    const { content: result, replacements } = applyMapToHtml(content, map);
    assert.ok(result.includes('ChinarOct2025/aaaaa.webp'));
    assert.ok(result.includes('KapsonsSolanOct2023/bbbbb.webp'));
    assert.ok(!result.includes('IMG_1873'));
    assert.ok(!result.includes('WA0012'));
    assert.equal(replacements, 2);
  });

  test('returns original content unchanged if no matches', () => {
    const content = '<img src="assets/images/general/logo.png" />';
    const map = [{ folder: 'ChinarOct2025', old: 'IMG_1873.webp', new: 'a3f9k.webp' }];
    const { content: result, replacements } = applyMapToHtml(content, map);
    assert.equal(result, content);
    assert.equal(replacements, 0);
  });
});
