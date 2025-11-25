// Blog Language Switcher - Hindi/English Support

document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
    loadSavedLanguage();
});

// Language content storage
const LANG_KEY = 'blog_language';

// Initialize language switcher
function initLanguageSwitcher() {
    const toggle = document.getElementById('langToggle');
    const switcher = document.querySelector('.lang-switcher');
    
    if (!toggle || !switcher) return;

    toggle.addEventListener('change', function() {
        const lang = this.checked ? 'hi' : 'en';
        setLanguage(lang);
        updateSwitcherState(switcher, lang);
    });
}

// Set language and update content
function setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    
    // Toggle visibility of language-specific content
    const enContent = document.querySelectorAll('[data-lang="en"]');
    const hiContent = document.querySelectorAll('[data-lang="hi"]');
    
    if (lang === 'hi') {
        enContent.forEach(el => el.style.display = 'none');
        hiContent.forEach(el => el.style.display = '');
    } else {
        enContent.forEach(el => el.style.display = '');
        hiContent.forEach(el => el.style.display = 'none');
    }

    // Update static UI elements
    updateUILabels(lang);
}

// Load saved language preference
function loadSavedLanguage() {
    const savedLang = localStorage.getItem(LANG_KEY) || 'en';
    const toggle = document.getElementById('langToggle');
    const switcher = document.querySelector('.lang-switcher');
    
    if (toggle) {
        toggle.checked = (savedLang === 'hi');
    }
    
    if (switcher) {
        updateSwitcherState(switcher, savedLang);
    }
    
    setLanguage(savedLang);
}

// Update switcher visual state
function updateSwitcherState(switcher, lang) {
    if (lang === 'hi') {
        switcher.classList.add('hindi-active');
    } else {
        switcher.classList.remove('hindi-active');
    }
}

// Update UI labels based on language
function updateUILabels(lang) {
    const labels = {
        en: {
            backToBlog: '← Back to Blog',
            readTime: 'min read',
            scheduleConsultation: 'Schedule a Consultation',
            readyToStart: 'Ready to Start Your Dream Project?',
            readyToStartDesc: "Let's discuss how we can bring your architectural vision to life",
            insightsLabel: 'Insights & Inspiration',
            blogTitle: 'Architecture & Design Blog',
            blogSubtitle: 'Expert insights on luxury architecture, interior design, and creating exceptional spaces in Gurugram and beyond.'
        },
        hi: {
            backToBlog: '← ब्लॉग पर वापस जाएं',
            readTime: 'मिनट पढ़ें',
            scheduleConsultation: 'परामर्श शेड्यूल करें',
            readyToStart: 'अपने सपनों का प्रोजेक्ट शुरू करने के लिए तैयार हैं?',
            readyToStartDesc: 'आइए चर्चा करें कि हम आपके वास्तुशिल्प दृष्टिकोण को कैसे साकार कर सकते हैं',
            insightsLabel: 'अंतर्दृष्टि और प्रेरणा',
            blogTitle: 'वास्तुकला और डिज़ाइन ब्लॉग',
            blogSubtitle: 'गुरुग्राम और उससे आगे लक्जरी वास्तुकला, इंटीरियर डिज़ाइन और असाधारण स्थान बनाने पर विशेषज्ञ अंतर्दृष्टि।'
        }
    };

    const currentLabels = labels[lang];
    
    // Update elements with data-label attribute
    document.querySelectorAll('[data-label]').forEach(el => {
        const labelKey = el.getAttribute('data-label');
        if (currentLabels[labelKey]) {
            el.textContent = currentLabels[labelKey];
        }
    });
}

// Export for use in other scripts
window.BlogLang = {
    setLanguage,
    getCurrentLanguage: () => localStorage.getItem(LANG_KEY) || 'en'
};
