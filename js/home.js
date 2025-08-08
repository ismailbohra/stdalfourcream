// Home Page JavaScript

// Language Toggle
function toggleLanguage() {
    console.log('toggleLanguage called');
    if (window.i18n) {
        console.log('Current language:', window.i18n.getCurrentLanguage());
        const newLang = window.i18n.toggleLanguage();
        console.log('New language:', newLang);
    } else {
        console.error('i18n not available');
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
    console.log('Home page DOM loaded');

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
