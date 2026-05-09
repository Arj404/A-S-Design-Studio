// Dynamic Gallery Renderer — portfolio-003
// Reads window.GALLERY_CONFIG and populates #project-gallery with image/video items.
// Loaded with `defer`; safe for both early and late DOMContentLoaded.

(function () {
  'use strict';

  // Layout cycle: repeats every 6 items (FR-004) — landscape mode only
  var CYCLE = [
    'project-gallery__item--large', // index mod 6 === 0
    '',                             // index mod 6 === 1  (standard)
    '',                             // index mod 6 === 2  (standard)
    'project-gallery__item--wide',  // index mod 6 === 3
    '',                             // index mod 6 === 4  (standard)
    '',                             // index mod 6 === 5  (standard)
  ];

  function variantClass(index) {
    return CYCLE[index % CYCLE.length];
  }

  function buildMimeType(filename) {
    var ext = filename.split('.').pop().toLowerCase();
    var map = {
      mp4: 'video/mp4',
      mov: 'video/quicktime',
      webm: 'video/webm',
    };
    return map[ext] || 'video/mp4';
  }

  function buildImageItem(folder, filename, projectName, photoNumber, index, layout) {
    var wrapper = document.createElement('div');
    wrapper.className = 'project-gallery__item';

    if (layout === 'portrait') {
      // Portrait mode: uniform grid, no landscape-specific spanning variants
      wrapper.classList.add('project-gallery__item--portrait');
    } else {
      // Standard landscape mode: apply the repeating layout cycle
      var variant = variantClass(index);
      if (variant) {
        wrapper.classList.add(variant);
      }
    }

    var img = document.createElement('img');
    img.src = folder + filename;
    img.alt = projectName + ' \u2014 Photo ' + photoNumber; // — (em dash)
    img.loading = index === 0 ? 'eager' : 'lazy'; // FR-006

    // Auto-detect portrait images in standard/mixed galleries.
    // Runs after image loads to avoid layout shift in portrait-mode galleries.
    if (layout !== 'portrait') {
      img.addEventListener('load', function () {
        if (img.naturalHeight > img.naturalWidth) {
          wrapper.classList.add('project-gallery__item--portrait');
          wrapper.classList.remove(
            'project-gallery__item--large',
            'project-gallery__item--wide'
          );
        }
      });
    }

    wrapper.appendChild(img);
    return wrapper;
  }

  function buildVideoItem(folder, filename, globalIndex) {
    var wrapper = document.createElement('div');
    wrapper.className = 'project-gallery__item';
    var variant = variantClass(globalIndex);
    if (variant) {
      wrapper.classList.add(variant);
    }

    var video = document.createElement('video');
    video.controls = true;
    video.style.cssText = 'width:100%;height:100%;object-fit:cover';

    var source = document.createElement('source');
    source.src = folder + filename;
    source.type = buildMimeType(filename);

    video.appendChild(source);
    video.insertAdjacentText('beforeend', 'Your browser does not support the video tag.');

    wrapper.appendChild(video);
    return wrapper;
  }

  function initGallery() {
    var config = window.GALLERY_CONFIG;
    if (!config) return;

    var container = document.getElementById('project-gallery');
    if (!container) return;

    var folder = config.folder || '';
    var images = Array.isArray(config.images) ? config.images : [];
    var videos = Array.isArray(config.videos) ? config.videos : [];
    var projectName = config.projectName || 'Project';
    var layout = config.layout || 'standard';

    // Apply layout class to grid container
    if (layout === 'portrait') {
      container.classList.add('project-gallery__grid--portrait');
    }

    // Clear any existing content (idempotent)
    container.innerHTML = '';

    // Render images first (FR-003, FR-005, FR-006)
    images.forEach(function (filename, i) {
      container.appendChild(buildImageItem(folder, filename, projectName, i + 1, i, layout));
    });

    // Render videos after images; cycle index continues from images.length (FR-009)
    videos.forEach(function (filename, i) {
      container.appendChild(buildVideoItem(folder, filename, images.length + i));
    });
  }

  // Only run DOM code in a browser environment
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initGallery);
    } else {
      initGallery();
    }
  }

  // Export pure functions for unit testing (Node only — no-op in browser)
  if (typeof module !== 'undefined') {
    module.exports = { variantClass: variantClass, buildMimeType: buildMimeType };
  }
})();
