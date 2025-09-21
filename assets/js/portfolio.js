// Portfolio JavaScript - Portfolio filtering, search, and gallery functionality

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioFilters();
    initializePortfolioSearch();
    initializeLightbox();
    initializeLazyLoading();
});

// Portfolio filtering functionality
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('filter__btn--active'));
            
            // Add active class to clicked button
            button.classList.add('filter__btn--active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects with animation
            filterProjects(projectCards, filterValue);
        });
    });
}

// Filter projects with smooth animation
function filterProjects(projectCards, filterValue) {
    projectCards.forEach((card, index) => {
        const shouldShow = filterValue === 'all' || card.classList.contains(filterValue);
        
        if (shouldShow) {
            // Show card with staggered animation
            setTimeout(() => {
                card.style.display = 'flex';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Trigger reflow
                card.offsetHeight;
                
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            // Hide card with animation
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Portfolio search functionality
function initializePortfolioSearch() {
    const searchInput = document.querySelector('.portfolio-search input, #portfolio-search');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!searchInput || !projectCards.length) return;
    
    searchInput.addEventListener('input', window.siteUtils.debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-card__title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.project-card__description')?.textContent.toLowerCase() || '';
            const category = card.querySelector('.project-card__type')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          category.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = 'flex';
                card.classList.add('fade-up');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-up');
            }
        });
        
        // Update filter buttons if no search term
        if (searchTerm === '') {
            const activeFilter = document.querySelector('.filter__btn--active');
            if (activeFilter) {
                const filterValue = activeFilter.getAttribute('data-filter');
                filterProjects(projectCards, filterValue);
            }
        }
    }, 300));
}

// Lightbox gallery functionality
function initializeLightbox() {
    const projectImages = document.querySelectorAll('.project-card__image img, .gallery-image');
    
    if (!projectImages.length) return;
    
    // Create lightbox HTML
    createLightboxHTML();
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Add click listeners to images
    projectImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            images = Array.from(projectImages);
            currentImageIndex = index;
            openLightbox(img);
        });
    });
    
    // Lightbox controls
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function openLightbox(img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.alt || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(images[currentImageIndex]);
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(images[currentImageIndex]);
    }
}

// Create lightbox HTML structure
function createLightboxHTML() {
    if (document.getElementById('lightbox')) return;
    
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img id="lightbox-img" src="" alt="">
                <div id="lightbox-caption"></div>
                <button class="lightbox-prev">&#10094;</button>
                <button class="lightbox-next">&#10095;</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Add lightbox styles
    const lightboxStyles = `
        <style>
        .lightbox {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        }
        
        .lightbox.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            width: 100%;
            height: auto;
            max-height: 80vh;
            object-fit: contain;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
        }
        
        .lightbox-close:hover {
            color: var(--secondary-color);
        }
        
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: none;
            font-size: 24px;
            padding: 10px 15px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .lightbox-prev {
            left: -60px;
        }
        
        .lightbox-next {
            right: -60px;
        }
        
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: var(--secondary-color);
        }
        
        #lightbox-caption {
            text-align: center;
            color: white;
            padding: 10px 0;
            font-size: 16px;
        }
        
        @media (max-width: 768px) {
            .lightbox-prev,
            .lightbox-next {
                position: fixed;
                top: 50%;
                font-size: 20px;
                padding: 8px 12px;
            }
            
            .lightbox-prev {
                left: 10px;
            }
            
            .lightbox-next {
                right: 10px;
            }
            
            .lightbox-close {
                top: 10px;
                right: 10px;
                font-size: 30px;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', lightboxStyles);
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Portfolio masonry layout (if needed)
function initializeMasonryLayout() {
    const grid = document.querySelector('.grid, .portfolio-grid');
    
    if (!grid) return;
    
    // Simple masonry-like effect using CSS Grid
    function resizeGridItem(item) {
        const grid = document.querySelector('.grid, .portfolio-grid');
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        const rowSpan = Math.ceil((item.querySelector('.project-card__content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = `span ${rowSpan}`;
    }
    
    function resizeAllGridItems() {
        const allItems = document.querySelectorAll('.project-card');
        allItems.forEach(item => {
            resizeGridItem(item);
        });
    }
    
    // Resize on load and window resize
    window.addEventListener('load', resizeAllGridItems);
    window.addEventListener('resize', window.siteUtils.debounce(resizeAllGridItems, 250));
}

// Export functions for external use
window.portfolioUtils = {
    filterProjects,
    initializePortfolioFilters,
    initializePortfolioSearch,
    initializeLightbox
};