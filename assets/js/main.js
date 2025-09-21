// Main JavaScript - Core functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initializeHeader();
    initializeAnimations();
    initializeSmoothScroll();
    initializeNavigation();
    initializeBreadcrumbs();
    initializePageTransitions();
    initializeCarousel();
});

// Header scroll effects
function initializeHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
}

// Animation system using Intersection Observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right, .project-card, .service-card, .about-text, .card').forEach(element => {
        // Set initial state
        if (!element.classList.contains('visible')) {
            element.style.opacity = '0';
            element.style.transform = getInitialTransform(element);
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        observer.observe(element);
    });
}

// Get initial transform based on animation class
function getInitialTransform(element) {
    if (element.classList.contains('slide-in-left')) {
        return 'translateX(-30px)';
    } else if (element.classList.contains('slide-in-right')) {
        return 'translateX(30px)';
    } else {
        return 'translateY(30px)';
    }
}

// Enhanced smooth scrolling with easing and callbacks
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                // Add loading state to clicked link
                this.style.opacity = '0.7';
                
                // Enhanced smooth scroll with custom easing
                smoothScrollTo(targetPosition, 800, () => {
                    // Callback after scroll completes
                    this.style.opacity = '';
                    
                    // Add focus to target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    
                    // Add a subtle highlight effect to the target section
                    target.style.transition = 'background-color 0.3s ease';
                    target.style.backgroundColor = 'rgba(166, 124, 82, 0.05)';
                    setTimeout(() => {
                        target.style.backgroundColor = '';
                        setTimeout(() => {
                            target.style.transition = '';
                            target.removeAttribute('tabindex');
                        }, 300);
                    }, 1000);
                });
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(targetPosition, duration = 800, callback) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            if (callback) callback();
        }
    }
    
    // Easing function for smooth animation
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Enhanced navigation functionality
function initializeNavigation() {
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    const navMenu = document.querySelector('.header__menu');
    const navLinks = document.querySelectorAll('.header__menu-link');
    const header = document.getElementById('header');
    
    let lastScrollTop = 0;
    let isScrollingDown = false;
    
    // Enhanced mobile menu toggle with animations
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on a link with smooth animation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        closeMobileMenu();
                    }, 300); // Delay to allow smooth scroll to start
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && navMenu.classList.contains('header__menu--active')) {
                closeMobileMenu();
            }
        });
        
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (navMenu.classList.contains('header__menu--active')) {
                switch (e.key) {
                    case 'Escape':
                        closeMobileMenu();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        navigateMenu('down');
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        navigateMenu('up');
                        break;
                    case 'Home':
                        e.preventDefault();
                        navLinks[0]?.focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        navLinks[navLinks.length - 1]?.focus();
                        break;
                }
            }
        });
        
        // Keyboard navigation helper function
        function navigateMenu(direction) {
            const focusedElement = document.activeElement;
            const currentIndex = Array.from(navLinks).indexOf(focusedElement);
            
            if (currentIndex !== -1) {
                let nextIndex;
                if (direction === 'down') {
                    nextIndex = currentIndex < navLinks.length - 1 ? currentIndex + 1 : 0;
                } else {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : navLinks.length - 1;
                }
                navLinks[nextIndex]?.focus();
            }
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('header__menu--active')) {
                closeMobileMenu();
            }
        });
    }
    
    // Enhanced scroll-based header behavior with performance optimization
    const scrollHandler = utils.throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll effects with smooth transitions
        if (scrollTop > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        // Smart header hiding on scroll (can be enabled for better UX)
        if (scrollTop > lastScrollTop && scrollTop > 200 && !navMenu.classList.contains('header__menu--active')) {
            // Scrolling down and mobile menu is closed
            if (!isScrollingDown) {
                isScrollingDown = true;
                // Uncomment to enable header hiding on scroll down
                // header.classList.add('header--hidden');
            }
        } else {
            // Scrolling up or mobile menu is open
            if (isScrollingDown) {
                isScrollingDown = false;
                header.classList.remove('header--hidden');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        // Update active navigation
        updateActiveNavigation();
    }, 100);
    
    // Use passive listeners for better performance
    if (passiveSupported) {
        window.addEventListener('scroll', scrollHandler, { passive: true });
    } else {
        window.addEventListener('scroll', scrollHandler);
    }
    
    // Initialize active navigation
    updateActiveNavigation();
    
    // Mobile menu functions
    function toggleMobileMenu() {
        const isActive = mobileToggle.classList.contains('header__mobile-toggle--active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mobileToggle.classList.add('header__mobile-toggle--active');
        navMenu.classList.add('header__menu--active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add staggered animation to menu items
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            setTimeout(() => {
                link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 50);
        });
        
        // Focus first menu item for accessibility
        setTimeout(() => {
            navLinks[0]?.focus();
        }, 100);
    }
    
    function closeMobileMenu() {
        mobileToggle.classList.remove('header__mobile-toggle--active');
        navMenu.classList.remove('header__menu--active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset menu item styles
        navLinks.forEach(link => {
            link.style.transition = '';
            link.style.opacity = '';
            link.style.transform = '';
        });
        
        // Return focus to toggle button
        mobileToggle.focus();
    }
}

// Enhanced active navigation with improved detection
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__menu-link[href^="#"]');
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    let currentSection = '';
    const scrollPosition = window.scrollY + headerHeight + 50;
    
    // Find the current section based on scroll position
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // If we're at the top of the page, highlight home
    if (window.scrollY < 100) {
        currentSection = 'home';
    }
    
    // If we're near the bottom, highlight the last section
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
            currentSection = lastSection.getAttribute('id');
        }
    }
    
    // Update active states with smooth transitions
    navLinks.forEach(link => {
        const wasActive = link.classList.contains('header__menu-link--active');
        const shouldBeActive = link.getAttribute('href') === `#${currentSection}`;
        
        if (shouldBeActive && !wasActive) {
            link.classList.add('header__menu-link--active');
            // Add a subtle animation effect
            link.style.transform = 'scale(1.05)';
            setTimeout(() => {
                link.style.transform = '';
            }, 200);
        } else if (!shouldBeActive && wasActive) {
            link.classList.remove('header__menu-link--active');
        }
    });
}

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Get element offset from top of document
    getOffset: function(element) {
        let offsetTop = 0;
        while (element) {
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        return offsetTop;
    }
};

// Breadcrumb navigation functionality
function initializeBreadcrumbs() {
    // This function can be used to dynamically generate breadcrumbs
    // For now, it sets up the foundation for breadcrumb functionality
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    
    if (breadcrumbContainer) {
        // Add click handlers for breadcrumb items
        const breadcrumbLinks = breadcrumbContainer.querySelectorAll('.breadcrumb__item:not(.breadcrumb__item--current)');
        
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const header = document.getElementById('header');
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        smoothScrollTo(targetPosition, 600);
                    }
                }
            });
        });
    }
}

// Function to dynamically create breadcrumbs (can be called from other pages)
function createBreadcrumb(items) {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (!breadcrumbContainer) return;
    
    breadcrumbContainer.innerHTML = '';
    
    items.forEach((item, index) => {
        // Create breadcrumb item
        const breadcrumbItem = document.createElement(item.href ? 'a' : 'span');
        breadcrumbItem.className = `breadcrumb__item ${index === items.length - 1 ? 'breadcrumb__item--current' : ''}`;
        breadcrumbItem.textContent = item.text;
        
        if (item.href) {
            breadcrumbItem.href = item.href;
        }
        
        breadcrumbContainer.appendChild(breadcrumbItem);
        
        // Add separator (except for last item)
        if (index < items.length - 1) {
            const separator = document.createElement('span');
            separator.className = 'breadcrumb__separator';
            separator.innerHTML = '&raquo;';
            breadcrumbContainer.appendChild(separator);
        }
    });
}

// Navigation state management
const navigationState = {
    currentPage: 'home',
    previousPage: null,
    isTransitioning: false,
    
    setCurrentPage: function(page) {
        this.previousPage = this.currentPage;
        this.currentPage = page;
        this.updatePageState();
    },
    
    updatePageState: function() {
        // Update body class for page-specific styling
        document.body.className = document.body.className.replace(/page-\w+/g, '');
        document.body.classList.add(`page-${this.currentPage}`);
        
        // Update breadcrumbs if needed
        this.updateBreadcrumbs();
        
        // Dispatch custom event for other modules
        window.dispatchEvent(new CustomEvent('pageChanged', {
            detail: {
                current: this.currentPage,
                previous: this.previousPage
            }
        }));
    },
    
    updateBreadcrumbs: function() {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (!breadcrumb) return;
        
        // Show breadcrumb for non-home pages
        if (this.currentPage !== 'home') {
            breadcrumb.classList.add('breadcrumb--visible');
            
            // Update breadcrumb content based on current page
            const breadcrumbItems = this.getBreadcrumbItems(this.currentPage);
            createBreadcrumb(breadcrumbItems);
        } else {
            breadcrumb.classList.remove('breadcrumb--visible');
        }
    },
    
    getBreadcrumbItems: function(page) {
        const breadcrumbMap = {
            'about': [
                { text: 'Home', href: '#home' },
                { text: 'About' }
            ],
            'projects': [
                { text: 'Home', href: '#home' },
                { text: 'Projects' }
            ],
            'contact': [
                { text: 'Home', href: '#home' },
                { text: 'Contact' }
            ]
        };
        
        return breadcrumbMap[page] || [{ text: 'Home', href: '#home' }];
    }
};

// Enhanced page transition effects
function initializePageTransitions() {
    // Listen for navigation clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link && !navigationState.isTransitioning) {
            const targetId = link.getAttribute('href').substring(1);
            if (targetId && targetId !== navigationState.currentPage) {
                navigationState.setCurrentPage(targetId);
            }
        }
    });
    
    // Listen for scroll-based page detection
    window.addEventListener('scroll', utils.throttle(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (sectionId !== navigationState.currentPage) {
                    navigationState.setCurrentPage(sectionId);
                }
            }
        });
    }, 200));
}

// Page transitions initialized in main DOMContentLoaded event

// Export utils and functions for use in other modules
window.siteUtils = utils;
window.createBreadcrumb = createBreadcrumb;
window.navigationState = navigationState;

// Performance optimization: Use passive event listeners where appropriate
const passiveSupported = (() => {
    let passiveSupported = false;
    try {
        const options = {
            get passive() {
                passiveSupported = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passiveSupported = false;
    }
    return passiveSupported;
})();

// Optimized scroll listener
if (passiveSupported) {
    window.addEventListener('scroll', utils.throttle(updateActiveNavigation, 100), { passive: true });
} else {
    window.addEventListener('scroll', utils.throttle(updateActiveNavigation, 100));
}
//
 Featured Projects Carousel functionality
function initializeCarousel() {
    const carousel = document.getElementById('featuredCarousel');
    const slides = document.querySelectorAll('.carousel__slide');
    const prevBtn = document.querySelector('.carousel__btn--prev');
    const nextBtn = document.querySelector('.carousel__btn--next');
    const indicators = document.querySelectorAll('.carousel__indicator');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    let isTransitioning = false;
    let autoPlayInterval;
    
    // Initialize carousel
    function initCarousel() {
        updateCarousel();
        startAutoPlay();
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        
        // Indicator click handlers
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Keyboard navigation
        carousel.addEventListener('keydown', handleKeyboardNavigation);
        
        // Touch/swipe support
        initializeTouchSupport();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (isTransitioning) return;
        
        // Handle wrap around
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        } else if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        
        if (slideIndex === currentSlide) return;
        
        isTransitioning = true;
        currentSlide = slideIndex;
        
        updateCarousel();
        
        // Reset transition flag after animation
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Update carousel display
    function updateCarousel() {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('carousel__slide--active', index === currentSlide);
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('carousel__indicator--active', index === currentSlide);
        });
        
        // Update transform
        const translateX = -currentSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update ARIA attributes for accessibility
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== currentSlide);
        });
        
        // Announce slide change to screen readers
        const activeSlide = slides[currentSlide];
        const slideTitle = activeSlide.querySelector('.featured-project__title');
        if (slideTitle) {
            announceToScreenReader(`Now showing: ${slideTitle.textContent}`);
        }
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        stopAutoPlay(); // Clear any existing interval
        autoPlayInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Keyboard navigation
    function handleKeyboardNavigation(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                goToSlide(currentSlide - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                goToSlide(currentSlide + 1);
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(slides.length - 1);
                break;
        }
    }
    
    // Touch/swipe support
    function initializeTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let minSwipeDistance = 50;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        carousel.addEventListener('touchmove', (e) => {
            // Prevent default to avoid scrolling while swiping
            if (Math.abs(e.touches[0].clientX - startX) > Math.abs(e.touches[0].clientY - startY)) {
                e.preventDefault();
            }
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right - go to previous slide
                    goToSlide(currentSlide - 1);
                } else {
                    // Swipe left - go to next slide
                    goToSlide(currentSlide + 1);
                }
            }
        }, { passive: true });
    }
    
    // Accessibility helper function
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Initialize the carousel
    initCarousel();
    
    // Pause autoplay when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoPlay();
    });
}