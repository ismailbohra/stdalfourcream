// Products Page JavaScript

// Global variables
let productsData = null;

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
    console.log('toggleLanguage called on products page');
    if (window.i18n) {
        const newLang = window.i18n.toggleLanguage();
        console.log('Language toggled to:', newLang);
        loadProductsPage();
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

// Close mobile menu
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-open');
    }
}

// Load and display products
async function loadProductsPage() {
    if (!productsData) {
        productsData = await loadProductsData();
    }

    if (!productsData) return;

    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    // Get category filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');

    // Filter products by category if specified
    let filteredProducts = productsData.products;
    if (categoryFilter) {
        filteredProducts = productsData.products.filter(product =>
            product.categories.includes(categoryFilter)
        );

        // Update page title for category
        updateCategoryTitle(categoryFilter);
    }

    const productsHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${window.i18n ? window.i18n.formatProductName(product) : product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-name">${window.i18n ? window.i18n.formatProductName(product) : product.name}</div>
                <button class="btn btn-primary" style="width: 100%;" onclick="showProductDetails('${product.id}')" data-i18n="products.viewDetails">View Details</button>
            </div>
        </div>
    `).join('');

    productsGrid.innerHTML = productsHTML;

    // Update i18n text
    if (window.i18n) {
        window.i18n.updateAllText();
    }
}

// Update page title and header for category filtering
function updateCategoryTitle(categoryId) {
    if (!productsData) return;

    const category = productsData.categories.find(cat => cat.id === categoryId);
    if (!category) return;

    // Update page title
    const categoryName = window.i18n ? window.i18n.formatCategoryName(category) : category.name;
    document.title = `${categoryName} - St. Dalfour Cream`;

    // Update page header
    const pageHeader = document.querySelector('.page-header h1');
    if (pageHeader) {
        pageHeader.textContent = categoryName;
    }

    // Update breadcrumbs to show category
    const breadcrumbsContainer = document.querySelector('.breadcrumbs .container');
    if (breadcrumbsContainer) {
        breadcrumbsContainer.innerHTML = `
            <ul class="breadcrumb-list">
                <li class="breadcrumb-item">
                    <a href="index.html" data-i18n="breadcrumb.home">Home</a>
                    <span class="breadcrumb-separator">></span>
                </li>
                <li class="breadcrumb-item">
                    <a href="products.html" data-i18n="breadcrumb.products">Products</a>
                    <span class="breadcrumb-separator">></span>
                </li>
                <li class="breadcrumb-item">
                    <span>${categoryName}</span>
                </li>
            </ul>
        `;
    }
}

// Show product details
function showProductDetails(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// QR Code Scanner
async function startQRScan() {
    try {
        // Check if browser supports getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Camera access is not supported in this browser. Please enter the code manually.');
            return;
        }
        
        // Check if QrScanner is available
        if (typeof QrScanner === 'undefined') {
            alert('QR Scanner library not loaded. Please enter the code manually.');
            return;
        }
        
        // Create QR scanner modal
        const modal = document.createElement('div');
        modal.className = 'qr-scanner-modal';
        modal.innerHTML = `
            <div class="qr-scanner-content">
                <button class="qr-scanner-close" onclick="closeQRScanner()">&times;</button>
                <h3 data-i18n="hero.scan">Scan QR Code</h3>
                <video class="qr-scanner-video" id="qr-video" autoplay></video>
                <p>Position the QR code within the camera view</p>
                <button class="btn btn-secondary" onclick="closeQRScanner()">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const video = document.getElementById('qr-video');
        
        // Initialize QR Scanner
        const qrScanner = new QrScanner(
            video,
            result => {
                // QR code detected
                console.log('QR Code detected:', result.data);
                
                // Close scanner and navigate to verify page
                closeQRScanner();
                window.location.href = `verify.html?code=${encodeURIComponent(result.data)}`;
            },
            {
                returnDetailedScanResult: true,
                highlightScanRegion: true,
                highlightCodeOutline: true,
            }
        );
        
        // Store scanner for cleanup
        window.currentQrScanner = qrScanner;
        
        // Start scanning
        await qrScanner.start();
        
    } catch (error) {
        console.error('Error starting QR scanner:', error);
        alert('Unable to access camera. Please enter the code manually.');
        closeQRScanner();
    }
}

function closeQRScanner() {
    // Stop QR scanner
    if (window.currentQrScanner) {
        window.currentQrScanner.stop();
        window.currentQrScanner.destroy();
        window.currentQrScanner = null;
    }
    
    // Remove modal
    const modal = document.querySelector('.qr-scanner-modal');
    if (modal) {
        modal.remove();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Products page DOM loaded');

    // Load products data and display
    loadProductsPage();

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

    // Add click listeners to nav links to close mobile menu
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');

        if (navMenu && navMenu.classList.contains('mobile-open')) {
            if (!navContainer.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
});
