// Contact Page JavaScript

// Language Toggle
function toggleLanguage() {
    console.log('toggleLanguage called on contact page');
    if (window.i18n) {
        const newLang = window.i18n.toggleLanguage();
        console.log('Language toggled to:', newLang);
    } else {
        console.error('i18n not available');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('mobile-open');
    }
}

// Contact Form Submission
function submitContact(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    if (!data.fullName || !data.email || !data.country || !data.mobile || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const message = window.i18n ? window.i18n.t('contact.success') : 'Thank you for your message! We will get back to you soon.';
    alert(message);
    
    // Reset form
    event.target.reset();
    
    // In a real application, you would send the data to a server
    console.log('Contact form data:', data);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page DOM loaded');

    // Setup language toggle
    const langToggle = document.querySelector('.language-toggle');
    console.log('Language toggle button found:', !!langToggle);

    if (langToggle) {
        // Remove any existing onclick handlers and use event listener
        langToggle.removeAttribute('onclick');
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLanguage();
        });
        console.log('Language toggle event listener added');
    }

    // Ensure i18n is initialized
    if (window.i18n) {
        window.i18n.updateAllText();
        console.log('i18n initialized, current language:', window.i18n.getCurrentLanguage());
    }
});
