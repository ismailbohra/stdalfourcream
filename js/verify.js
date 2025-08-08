// Verify Page JavaScript

// Language Toggle
function toggleLanguage() {
    console.log('toggleLanguage called on verify page');
    if (window.i18n) {
        const newLang = window.i18n.toggleLanguage();
        console.log('Language toggled to:', newLang);
    } else {
        console.error('i18n not available');
    }
}

// Product Verification
async function verifyProduct() {
    const code = document.getElementById('productCode').value.trim().toUpperCase();
    const resultDiv = document.getElementById('verificationResult');

    if (!code) {
        showResult(window.i18n ? window.i18n.t('verify.error') : 'Please enter a product code', 'error');
        return;
    }

    // Show loading
    showResult(window.i18n ? window.i18n.t('verify.loading') : 'Verifying product...', 'info');

    // Verify product code format and range
    const isValid = verifyProductCode(code);

    // Simulate a small delay for better UX
    setTimeout(() => {
        if (isValid) {
            showResult(window.i18n ? window.i18n.t('verify.success') : '✅ Product is authentic and verified!', 'success');
        } else {
            showResult(window.i18n ? window.i18n.t('verify.error') : '❌ Product code not found. This may be a counterfeit product.', 'error');
        }
    }, 1000);
}

// Verify product code logic
function verifyProductCode(code) {
    // Check if code starts with B21
    if (!code.startsWith('B21')) {
        console.log('Code does not start with B21:', code);
        return false;
    }

    // Extract the numeric part after B21
    const numericPart = code.substring(3);

    // Check if the remaining part is a valid number
    if (!/^[0-9A-F]+$/.test(numericPart)) {
        console.log('Invalid characters in code:', code);
        return false;
    }

    // Convert to integer for range checking
    const codeNumber = parseInt(numericPart, 16);
    const minCode = parseInt('00053', 16); // B21F0053
    const maxCode = parseInt('10053', 16); // B2110053

    // Check if the code is within the valid range
    return codeNumber >= minCode && codeNumber <= maxCode;
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
                
                // Close scanner
                closeQRScanner();
                
                // Show success message
                alert(`QR Code detected: ${result.data}`);
                
                // Auto-verify the product
                verifyProduct();
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
    console.log('Verify page DOM loaded');

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

    // Handle form enter key for verification
    const productCodeInput = document.getElementById('productCode');
    if (productCodeInput) {
        productCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyProduct();
            }
        });

        // Check if code was passed in URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            productCodeInput.value = code;
            verifyProduct();
        }
    }
});
