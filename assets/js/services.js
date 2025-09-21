// Services Page JavaScript - Service-specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeServiceInquiry();
    initializeServiceAnimations();
    initializeProcessWorkflow();
});

// Service inquiry modal functionality
function initializeServiceInquiry() {
    const modal = document.getElementById('serviceInquiryModal');
    const inquiryButtons = document.querySelectorAll('.service-inquiry-btn');
    const closeButtons = document.querySelectorAll('.modal__close, .modal-close-btn');
    const form = document.getElementById('serviceInquiryForm');
    const serviceSelect = document.getElementById('inquiry-service');
    
    if (!modal || !form) return;
    
    // Open modal when service inquiry button is clicked
    inquiryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            openServiceModal(serviceType);
        });
    });
    
    // Close modal functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', closeServiceModal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeServiceModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
            closeServiceModal();
        }
    });
    
    // Form submission handling
    form.addEventListener('submit', handleServiceInquiry);
    
    // Form validation
    initializeFormValidation();
    
    function openServiceModal(serviceType = '') {
        modal.classList.add('modal--active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Pre-select service type if provided
        if (serviceType && serviceSelect) {
            serviceSelect.value = serviceType;
            updateProjectTypeOptions(serviceType);
        }
        
        // Focus first input for accessibility
        const firstInput = form.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        // Announce modal opening to screen readers
        announceToScreenReader('Service inquiry form opened');
    }
    
    function closeServiceModal() {
        modal.classList.remove('modal--active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Reset form
        form.reset();
        clearFormErrors();
        
        // Return focus to the button that opened the modal
        const activeButton = document.querySelector('.service-inquiry-btn:focus');
        if (activeButton) {
            activeButton.focus();
        }
        
        // Announce modal closing to screen readers
        announceToScreenReader('Service inquiry form closed');
    }
    
    function handleServiceInquiry(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const inquiryData = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success handling
            showSuccessMessage();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Close modal after short delay
            setTimeout(() => {
                closeServiceModal();
            }, 2000);
            
            // Log inquiry data (for development - remove in production)
            console.log('Service Inquiry Submitted:', inquiryData);
            
        }, 1500);
    }
    
    function updateProjectTypeOptions(serviceType) {
        const projectTypeSelect = document.getElementById('inquiry-project-type');
        if (!projectTypeSelect) return;
        
        // Clear existing options except the first one
        while (projectTypeSelect.children.length > 1) {
            projectTypeSelect.removeChild(projectTypeSelect.lastChild);
        }
        
        let options = [];
        
        switch (serviceType) {
            case 'residential':
                options = [
                    { value: 'custom-home', text: 'Custom Home Design' },
                    { value: 'luxury-villa', text: 'Luxury Villa' },
                    { value: 'apartment-complex', text: 'Apartment Complex' },
                    { value: 'renovation', text: 'Home Renovation' },
                    { value: 'interior-architecture', text: 'Interior Architecture' }
                ];
                break;
            case 'retail':
                options = [
                    { value: 'showroom', text: 'Showroom Design' },
                    { value: 'boutique', text: 'Boutique Store' },
                    { value: 'brand-experience', text: 'Brand Experience Center' },
                    { value: 'retail-renovation', text: 'Retail Space Renovation' },
                    { value: 'visual-merchandising', text: 'Visual Merchandising' }
                ];
                break;
            case 'commercial':
                options = [
                    { value: 'office-complex', text: 'Office Complex' },
                    { value: 'mixed-use', text: 'Mixed-Use Development' },
                    { value: 'corporate-headquarters', text: 'Corporate Headquarters' },
                    { value: 'coworking-space', text: 'Co-working Space' },
                    { value: 'hospitality', text: 'Hospitality Architecture' }
                ];
                break;
            default:
                options = [
                    { value: 'new-construction', text: 'New Construction' },
                    { value: 'renovation', text: 'Renovation' },
                    { value: 'interior-design', text: 'Interior Design' },
                    { value: 'consultation', text: 'Design Consultation' }
                ];
        }
        
        // Add new options
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            projectTypeSelect.appendChild(optionElement);
        });
    }
    
    function initializeFormValidation() {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Real-time validation on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear errors on input
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Additional custom validations
        const email = form.querySelector('#inquiry-email');
        if (email && email.value && !isValidEmail(email.value)) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        const phone = form.querySelector('#inquiry-phone');
        if (phone && phone.value && !isValidPhone(phone.value)) {
            showFieldError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.type === 'tel' && value && !isValidPhone(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
        
        clearFieldError(field);
        return true;
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        field.classList.add('form__input--error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'form__error-message';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorElement);
    }
    
    function clearFieldError(field) {
        field.classList.remove('form__input--error');
        
        const errorElement = field.parentNode.querySelector('.form__error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function clearFormErrors() {
        const errorElements = form.querySelectorAll('.form__error-message');
        const errorFields = form.querySelectorAll('.form__input--error');
        
        errorElements.forEach(element => element.remove());
        errorFields.forEach(field => field.classList.remove('form__input--error'));
    }
    
    function showSuccessMessage() {
        const modalBody = modal.querySelector('.modal__body');
        const successMessage = document.createElement('div');
        successMessage.className = 'form__success-message';
        successMessage.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--success-color); margin-bottom: 1rem;">Thank You!</h3>
                <p>Your service inquiry has been submitted successfully. We'll get back to you within 24 hours.</p>
            </div>
        `;
        
        modalBody.innerHTML = '';
        modalBody.appendChild(successMessage);
        
        // Announce success to screen readers
        announceToScreenReader('Service inquiry submitted successfully');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
    }
}

// Service-specific animations
function initializeServiceAnimations() {
    // Enhanced hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Benefit cards animation
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(27, 59, 54, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Process workflow interactions
function initializeProcessWorkflow() {
    const processSteps = document.querySelectorAll('.process-step');
    
    // Add click handlers for process steps
    processSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Toggle expanded state
            this.classList.toggle('process-step--expanded');
            
            // Smooth scroll to step if not visible
            if (!isElementInViewport(this)) {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
        
        // Add keyboard navigation
        step.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make steps focusable for accessibility
        step.setAttribute('tabindex', '0');
        step.setAttribute('role', 'button');
        step.setAttribute('aria-expanded', 'false');
    });
    
    // Intersection Observer for process steps
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('process-step--visible');
                
                // Add staggered animation to step details
                const details = entry.target.querySelectorAll('.process-step__details li');
                details.forEach((detail, index) => {
                    setTimeout(() => {
                        detail.style.opacity = '1';
                        detail.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    processSteps.forEach(step => {
        processObserver.observe(step);
        
        // Set initial state for step details
        const details = step.querySelectorAll('.process-step__details li');
        details.forEach(detail => {
            detail.style.opacity = '0';
            detail.style.transform = 'translateX(-20px)';
            detail.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });
}

// Utility functions
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Smooth scrolling for service navigation
function scrollToService(serviceId) {
    const serviceElement = document.getElementById(serviceId);
    if (serviceElement) {
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = serviceElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Export functions for external use
window.servicesPage = {
    scrollToService,
    announceToScreenReader
};