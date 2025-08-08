// Product Details Page JavaScript

// Global variables
let productsData = null;
let currentProduct = null;

// Load products data
async function loadProductsData() {
    try {
        const response = await fetch('data/products.json');
        productsData = await response.json();
        return productsData;
    } catch (error) {
        console.error('Error loading products data:', error);
        return null;
    }
}

// Language Toggle
function toggleLanguage() {
    console.log('toggleLanguage called on product details page');
    if (window.i18n) {
        const newLang = window.i18n.toggleLanguage();
        console.log('Language toggled to:', newLang);
        if (currentProduct) {
            displayProductDetails(currentProduct);
        }
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

// Load and display product details
async function loadProductDetails() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showError('Product not found');
        return;
    }
    
    // Load products data if not already loaded
    if (!productsData) {
        productsData = await loadProductsData();
    }
    
    if (!productsData) {
        showError('Unable to load product data');
        return;
    }
    
    // Find the product
    const product = productsData.products.find(p => p.id === productId);
    if (!product) {
        showError('Product not found');
        return;
    }
    
    currentProduct = product;
    displayProductDetails(product);
}

// Display product details
function displayProductDetails(product) {
    const contentDiv = document.getElementById('product-content');
    if (!contentDiv) return;
    
    // Get categories for this product
    const categories = product.categories.map(catId => {
        const category = productsData.categories.find(c => c.id === catId);
        return category ? (window.i18n ? window.i18n.formatCategoryName(category) : category.name) : catId;
    });
    
    // Update page title
    document.title = `${window.i18n ? window.i18n.formatProductName(product) : product.name} - St. Dalfour Cream`;
    
    // Create product details HTML
    const productHTML = `
        <div class="product-details">
            <div class="product-details-image">
                <img src="${product.image}" alt="${window.i18n ? window.i18n.formatProductName(product) : product.name}">
            </div>
            <div class="product-details-info">
                <h1>${window.i18n ? window.i18n.formatProductName(product) : product.name}</h1>
                <div class="product-details-description">${window.i18n ? window.i18n.formatProductDescription(product) : product.description}</div>
                
                <div class="product-section">
                    <h3 data-i18n="details.features">Features</h3>
                    <ul class="product-features">
                        ${(window.i18n ? window.i18n.formatProductFeatures(product) : product.features).map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="product-section">
                    <h3 data-i18n="details.ingredients">Ingredients</h3>
                    <p>${product.ingredients}</p>
                </div>
                
                <div class="product-section">
                    <h3 data-i18n="details.usage">How to Use</h3>
                    <p>${window.i18n ? window.i18n.formatProductUsage(product) : product.usage}</p>
                </div>
                
                <div class="product-section">
                    <h3 data-i18n="details.categories">Categories</h3>
                    <div class="product-categories">
                        ${categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <a href="products.html" class="btn btn-secondary" data-i18n="details.backToProducts">Back to Products</a>
                    <a href="verify.html" class="btn btn-primary" style="margin-left: 15px;" data-i18n="hero.verify">Verify Product</a>
                </div>
            </div>
        </div>
    `;
    
    contentDiv.innerHTML = productHTML;
    
    // Update i18n text
    if (window.i18n) {
        window.i18n.updateAllText();
    }
}

// Show error message
function showError(message) {
    const contentDiv = document.getElementById('product-content');
    if (!contentDiv) return;
    
    contentDiv.innerHTML = `
        <div style="text-align: center; padding: 60px 0;">
            <h2 style="color: #721c24; margin-bottom: 20px;">Error</h2>
            <p style="color: #666; margin-bottom: 30px;">${message}</p>
            <a href="products.html" class="btn btn-primary">View All Products</a>
        </div>
    `;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Product details page DOM loaded');

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

    // Load product details
    loadProductDetails();
});
