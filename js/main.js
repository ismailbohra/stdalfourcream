// St. Dalfour Cream - Main JavaScript

// Global variables
let productsData = null;
let qrScanner = null;

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

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
    
    // Update breadcrumbs
    updateBreadcrumbs(pageId);
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Update page title
    updatePageTitle(pageId);
}

// Update breadcrumbs
function updateBreadcrumbs(pageId) {
    const breadcrumbsContainer = document.querySelector('.breadcrumbs');
    if (!breadcrumbsContainer) return;
    
    const breadcrumbPaths = {
        'homepage': [{ key: 'breadcrumb.home', href: '#', onclick: "showPage('homepage')" }],
        'products': [
            { key: 'breadcrumb.home', href: '#', onclick: "showPage('homepage')" },
            { key: 'breadcrumb.products', href: '#', onclick: "showPage('products')" }
        ],
        'verify': [
            { key: 'breadcrumb.home', href: '#', onclick: "showPage('homepage')" },
            { key: 'breadcrumb.verify', href: '#', onclick: "showPage('verify')" }
        ],
        'contact': [
            { key: 'breadcrumb.home', href: '#', onclick: "showPage('homepage')" },
            { key: 'breadcrumb.contact', href: '#', onclick: "showPage('contact')" }
        ],
        'product-details': [
            { key: 'breadcrumb.home', href: '#', onclick: "showPage('homepage')" },
            { key: 'breadcrumb.products', href: '#', onclick: "showPage('products')" },
            { key: 'breadcrumb.productDetails', href: '#', onclick: "showPage('product-details')" }
        ]
    };
    
    const path = breadcrumbPaths[pageId] || breadcrumbPaths['homepage'];
    
    const breadcrumbHTML = `
        <div class="container">
            <ul class="breadcrumb-list">
                ${path.map((item, index) => `
                    <li class="breadcrumb-item">
                        ${index === path.length - 1 
                            ? `<span data-i18n="${item.key}">${window.i18n ? window.i18n.t(item.key) : item.key}</span>`
                            : `<a href="${item.href}" onclick="${item.onclick}" data-i18n="${item.key}">${window.i18n ? window.i18n.t(item.key) : item.key}</a>`
                        }
                        ${index < path.length - 1 ? '<span class="breadcrumb-separator">></span>' : ''}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    breadcrumbsContainer.innerHTML = breadcrumbHTML;
}

// Update page title
function updatePageTitle(pageId) {
    const titles = {
        'homepage': 'St. Dalfour Cream - Best Cream in Dubai',
        'products': 'Products - St. Dalfour Cream',
        'verify': 'Verify Products - St. Dalfour Cream',
        'contact': 'Contact Us - St. Dalfour Cream',
        'product-details': 'Product Details - St. Dalfour Cream'
    };
    
    document.title = titles[pageId] || titles['homepage'];
}

// Product Verification
async function verifyProduct() {
    const code = document.getElementById('productCode').value.trim();
    const resultDiv = document.getElementById('verificationResult');
    
    if (!code) {
        showResult(window.i18n ? window.i18n.t('verify.error') : 'Please enter a product code', 'error');
        return;
    }
    
    // Show loading
    showResult(window.i18n ? window.i18n.t('verify.loading') : 'Verifying product...', 'info');
    
    try {
        const response = await fetch(`https://cream/verfiy?code=${encodeURIComponent(code)}`);
        const isValid = await response.json();
        
        if (isValid === true) {
            showResult(window.i18n ? window.i18n.t('verify.success') : '✅ Product is authentic and verified!', 'success');
        } else {
            showResult(window.i18n ? window.i18n.t('verify.error') : '❌ Product code not found. This may be a counterfeit product.', 'error');
        }
    } catch (error) {
        showResult(window.i18n ? window.i18n.t('verify.networkError') : '⚠️ Unable to verify at the moment. Please try again later.', 'error');
    }
}

function showResult(message, type) {
    const resultDiv = document.getElementById('verificationResult');
    if (resultDiv) {
        resultDiv.textContent = message;
        resultDiv.className = 'result-message result-' + type;
        resultDiv.style.display = 'block';
    }
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

                // Set the code in the input field
                const productCodeInput = document.getElementById('productCode');
                if (productCodeInput) {
                    productCodeInput.value = result.data;
                }

                // Close scanner and navigate to verify page
                closeQRScanner();
                showPage('verify');

                // Show success message
                alert(`QR Code detected: ${result.data}`);
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

    // Stop camera stream (fallback)
    if (window.currentStream) {
        window.currentStream.getTracks().forEach(track => track.stop());
        window.currentStream = null;
    }

    // Remove modal
    const modal = document.querySelector('.qr-scanner-modal');
    if (modal) {
        modal.remove();
    }
}

// Contact Form Submission
function submitContact(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const message = window.i18n ? window.i18n.t('contact.success') : 'Thank you for your message! We will get back to you soon.';
    alert(message);
    event.target.reset();
}

// Language Toggle
function toggleLanguage() {
    if (window.i18n) {
        const newLang = window.i18n.toggleLanguage();
        
        // Update products display if on products page
        if (document.getElementById('products').style.display !== 'none') {
            loadProductsPage();
        }
        
        // Update product details if on product details page
        if (document.getElementById('product-details') && document.getElementById('product-details').style.display !== 'none') {
            const productId = new URLSearchParams(window.location.search).get('product');
            if (productId) {
                showProductDetails(productId);
            }
        }
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
    
    const productsHTML = productsData.products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${window.i18n ? window.i18n.formatProductName(product) : product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-name">${window.i18n ? window.i18n.formatProductName(product) : product.name}</div>
                <div class="product-price">${product.price}</div>
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

// Show product details
async function showProductDetails(productId) {
    if (!productsData) {
        productsData = await loadProductsData();
    }
    
    if (!productsData) return;
    
    const product = productsData.products.find(p => p.id === productId);
    if (!product) return;
    
    // Create product details page if it doesn't exist
    let detailsPage = document.getElementById('product-details');
    if (!detailsPage) {
        detailsPage = document.createElement('div');
        detailsPage.id = 'product-details';
        detailsPage.className = 'page';
        detailsPage.style.display = 'none';
        document.body.appendChild(detailsPage);
    }
    
    const categories = product.categories.map(catId => {
        const category = productsData.categories.find(c => c.id === catId);
        return category ? (window.i18n ? window.i18n.formatCategoryName(category) : category.name) : catId;
    });
    
    detailsPage.innerHTML = `
        <!-- Header -->
        <header class="header">
            <div class="container">
                <div class="nav-container">
                    <div class="logo">ST. DALFOUR</div>
                    <nav>
                        <ul class="nav-menu">
                            <li><a href="#" onclick="showPage('homepage')" data-i18n="nav.home">Home</a></li>
                            <li><a href="#" onclick="showPage('verify')" data-i18n="nav.verify">Verify Products</a></li>
                            <li><a href="#" onclick="showPage('products')" data-i18n="nav.products">Products</a></li>
                            <li><a href="#" onclick="showPage('contact')" data-i18n="nav.contact">Contact</a></li>
                        </ul>
                    </nav>
                    <button class="language-toggle" onclick="toggleLanguage()" data-i18n="nav.language">العربية</button>
                </div>
            </div>
        </header>

        <!-- Breadcrumbs -->
        <div class="breadcrumbs"></div>

        <div class="page-content">
            <div class="container">
                <div class="product-details">
                    <div class="product-details-image">
                        <img src="${product.image}" alt="${window.i18n ? window.i18n.formatProductName(product) : product.name}">
                    </div>
                    <div class="product-details-info">
                        <h1>${window.i18n ? window.i18n.formatProductName(product) : product.name}</h1>
                        <div class="product-details-price">${product.price}</div>
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
                        
                        <button class="btn btn-secondary" onclick="showPage('products')" data-i18n="details.backToProducts">Back to Products</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showPage('product-details');
    
    // Update i18n text
    if (window.i18n) {
        window.i18n.updateAllText();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load products data
    loadProductsData();
    
    // Show homepage by default
    showPage('homepage');
    
    // Setup language toggle
    const langToggle = document.querySelector('.language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Handle form enter key for verification
    const productCodeInput = document.getElementById('productCode');
    if (productCodeInput) {
        productCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyProduct();
            }
        });
    }
    
    // Load products page if needed
    setTimeout(() => {
        if (document.getElementById('products')) {
            loadProductsPage();
        }
    }, 100);
});
