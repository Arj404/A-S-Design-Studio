'use strict';

/**
 * Unit tests for gallery.js pure functions.
 * Run with: node scripts/gallery.test.js
 * Requires Node 18+ (node:test built-in).
 */

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const { variantClass, buildMimeType } = require('../assets/js/gallery.js');

// ---------------------------------------------------------------------------
// variantClass — layout cycle
// ---------------------------------------------------------------------------

describe('variantClass', () => {
  test('index 0 → large', () => {
    assert.equal(variantClass(0), 'project-gallery__item--large');
  });

  test('index 1 → standard (empty string)', () => {
    assert.equal(variantClass(1), '');
  });

  test('index 2 → standard (empty string)', () => {
    assert.equal(variantClass(2), '');
  });

  test('index 3 → wide', () => {
    assert.equal(variantClass(3), 'project-gallery__item--wide');
  });

  test('index 4 → standard (empty string)', () => {
    assert.equal(variantClass(4), '');
  });

  test('index 5 → standard (empty string)', () => {
    assert.equal(variantClass(5), '');
  });

  test('index 6 → large (cycle wraps to position 0)', () => {
    assert.equal(variantClass(6), 'project-gallery__item--large');
  });

  test('index 9 → wide (second cycle, position 3)', () => {
    assert.equal(variantClass(9), 'project-gallery__item--wide');
  });

  test('index 12 → large (third cycle, position 0)', () => {
    assert.equal(variantClass(12), 'project-gallery__item--large');
  });
});

// ---------------------------------------------------------------------------
// buildMimeType — video extension mapping
// ---------------------------------------------------------------------------

describe('buildMimeType', () => {
  test('mp4 → video/mp4', () => {
    assert.equal(buildMimeType('clip.mp4'), 'video/mp4');
  });

  test('mov → video/quicktime', () => {
    assert.equal(buildMimeType('tour.mov'), 'video/quicktime');
  });

  test('webm → video/webm', () => {
    assert.equal(buildMimeType('walk.webm'), 'video/webm');
  });

  test('uppercase extension → normalised to lowercase', () => {
    assert.equal(buildMimeType('clip.MP4'), 'video/mp4');
  });
});
