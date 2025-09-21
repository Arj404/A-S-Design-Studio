// Contact JavaScript - Form handling, validation, and submission

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForms();
    initializeFormValidation();
    initializeFileUpload();
});

// Initialize all contact forms
function initializeContactForms() {
    const contactForms = document.querySelectorAll('.contact-form, #contactForm');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.contact-btn, .btn[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Validate form before submission
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    setLoadingState(submitBtn, true);
    
    // Get form data
    const formData = new FormData(form);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simulate form submission (replace with actual API call)
    submitForm(formObject)
        .then(response => {
            showSuccessMessage(form, formObject.name || 'there');
            form.reset();
            clearValidationErrors(form);
        })
        .catch(error => {
            showErrorMessage(form, 'There was an error sending your message. Please try again.');
            console.error('Form submission error:', error);
        })
        .finally(() => {
            setLoadingState(submitBtn, false, originalText);
        });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Clear previous errors
    clearValidationErrors(form);
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Additional email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    // Phone validation if present
    const phoneFields = form.querySelectorAll('input[type="tel"], input[name="phone"]');
    phoneFields.forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id || 'This field';
    
    if (!value) {
        showFieldError(field, `${fieldName} is required`);
        return false;
    }
    
    // Minimum length validation
    const minLength = field.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
        showFieldError(field, `${fieldName} must be at least ${minLength} characters long`);
        return false;
    }
    
    // Maximum length validation
    const maxLength = field.getAttribute('maxlength');
    if (maxLength && value.length > parseInt(maxLength)) {
        showFieldError(field, `${fieldName} must be no more than ${maxLength} characters long`);
        return false;
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
    
    // Add error styles if not already present
    addErrorStyles();
}

// Clear validation errors
function clearValidationErrors(form) {
    const errorFields = form.querySelectorAll('.error');
    const errorMessages = form.querySelectorAll('.field-error');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Set loading state for submit button
function setLoadingState(button, isLoading, originalText = 'Send Message') {
    if (isLoading) {
        button.textContent = 'Sending...';
        button.disabled = true;
        button.classList.add('loading');
    } else {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    }
}

// Show success message
function showSuccessMessage(form, name) {
    const message = `Thank you ${name}! Your message has been sent successfully. We'll get back to you soon.`;
    showFormMessage(form, message, 'success');
}

// Show error message
function showErrorMessage(form, message) {
    showFormMessage(form, message, 'error');
}

// Show form message
function showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessages = form.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert message at the top of the form
    form.insertBefore(messageElement, form.firstChild);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // Add message styles if not already present
    addMessageStyles();
}

// Simulate form submission (replace with actual API call)
function submitForm(formData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate success/failure (90% success rate)
            if (Math.random() > 0.1) {
                resolve({ success: true, message: 'Form submitted successfully' });
            } else {
                reject(new Error('Network error'));
            }
        }, 1500);
    });
}

// Initialize real-time form validation
function initializeFormValidation() {
    const formFields = document.querySelectorAll('.contact-form input, .contact-form textarea, #contactForm input, #contactForm textarea');
    
    formFields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', () => {
            if (field.value.trim()) {
                validateField(field);
            }
        });
        
        // Clear errors on input
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                field.classList.remove('error');
                const errorMessage = field.parentNode.querySelector('.field-error');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
}

// File upload functionality
function initializeFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', handleFileUpload);
    });
}

// Handle file upload
function handleFileUpload(e) {
    const input = e.target;
    const files = input.files;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    // Clear previous errors
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    Array.from(files).forEach(file => {
        // Check file size
        if (file.size > maxSize) {
            showFieldError(input, 'File size must be less than 5MB');
            input.value = '';
            return;
        }
        
        // Check file type
        if (!allowedTypes.includes(file.type)) {
            showFieldError(input, 'Please upload only images, PDF, or Word documents');
            input.value = '';
            return;
        }
    });
    
    // Show file preview if it's an image
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        showFilePreview(input, files[0]);
    }
}

// Show file preview
function showFilePreview(input, file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Remove existing preview
        const existingPreview = input.parentNode.querySelector('.file-preview');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        // Create preview element
        const preview = document.createElement('div');
        preview.className = 'file-preview';
        preview.innerHTML = `
            <img src="${e.target.result}" alt="File preview" style="max-width: 200px; max-height: 200px; object-fit: cover; margin-top: 10px; border-radius: 4px;">
            <p style="margin: 5px 0; font-size: 14px; color: var(--text-light);">${file.name}</p>
        `;
        
        input.parentNode.appendChild(preview);
    };
    
    reader.readAsDataURL(file);
}

// Add error styles dynamically
function addErrorStyles() {
    if (document.getElementById('form-error-styles')) return;
    
    const styles = `
        <style id="form-error-styles">
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: #e74c3c;
            box-shadow: 0 0 10px rgba(231, 76, 60, 0.2);
        }
        
        .field-error {
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: block;
        }
        
        .btn.loading {
            opacity: 0.7;
            cursor: not-allowed;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Add message styles dynamically
function addMessageStyles() {
    if (document.getElementById('form-message-styles')) return;
    
    const styles = `
        <style id="form-message-styles">
        .form-message {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .form-message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .form-message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Multi-step form functionality
function initializeMultiStepForm() {
    const multiStepForms = document.querySelectorAll('.multi-step-form');
    
    multiStepForms.forEach(form => {
        const steps = form.querySelectorAll('.form-step');
        const nextButtons = form.querySelectorAll('.btn-next');
        const prevButtons = form.querySelectorAll('.btn-prev');
        const progressBar = form.querySelector('.progress-bar');
        
        let currentStep = 0;
        
        // Show initial step
        showStep(currentStep);
        
        // Next button handlers
        nextButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (validateCurrentStep()) {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        });
        
        // Previous button handlers
        prevButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep--;
                showStep(currentStep);
            });
        });
        
        function showStep(stepIndex) {
            steps.forEach((step, index) => {
                step.style.display = index === stepIndex ? 'block' : 'none';
            });
            
            // Update progress bar
            if (progressBar) {
                const progress = ((stepIndex + 1) / steps.length) * 100;
                progressBar.style.width = `${progress}%`;
            }
        }
        
        function validateCurrentStep() {
            const currentStepElement = steps[currentStep];
            const requiredFields = currentStepElement.querySelectorAll('[required]');
            
            let isValid = true;
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            return isValid;
        }
    });
}

// Export functions for external use
window.contactUtils = {
    validateForm,
    showSuccessMessage,
    showErrorMessage,
    initializeContactForms
};