// Internationalization utility for English/Arabic support
class I18n {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.verify': 'Verify Products',
                'nav.products': 'Products',
                'nav.contact': 'Contact',
                'nav.language': 'العربية',
                
                // Hero Section
                'hero.title': 'ST. DALFOUR CREAM',
                'hero.subtitle': 'Best Cream in Dubai | Top Skin Care Products UAE',
                'hero.description': 'Original Whitening Cream with guaranteed results',
                'hero.verify': 'VERIFY PRODUCT',
                'hero.scan': '📷 SCAN QR CODE',
                
                // Featured Products
                'featured.title': 'Featured Skin Care Products',
                'featured.subtitle': 'Discover our collection of the best skin care and original whitening creams in UAE',
                'featured.viewAll': 'View All Products',
                
                // Why Choose Us
                'why.title': 'Why We Are The Best in Dubai?',
                'why.original.title': 'Guaranteed Original Products',
                'why.original.desc': 'All our products are 100% original with secure verification system',
                'why.best.title': 'Best Whitening Cream',
                'why.best.desc': 'Most effective whitening creams with fast and guaranteed results',
                'why.delivery.title': 'Fast Delivery in UAE',
                'why.delivery.desc': 'Free and fast delivery across United Arab Emirates',
                
                // Verify Page
                'verify.title': 'Verify Product',
                'verify.subtitle': 'Enter the unique product code found on the item.',
                'verify.placeholder': 'Unique Code *',
                'verify.button': 'VERIFY',
                'verify.scan': '📷 SCAN QR CODE',
                'verify.warning.title': '⚠️ Warning: Beware of Fraud',
                'verify.warning.text': 'This is the only official website for St. Dalfour Cream. Beware of fraudulent websites including www.stdalfourwhiteningcream.com and www.stdalfourofficial.com. We are not responsible for purchases made from unauthorized sources.',
                'verify.success': '✅ Product is authentic and verified!',
                'verify.error': '❌ Product code not found. This may be a counterfeit product.',
                'verify.loading': 'Verifying product...',
                'verify.networkError': '⚠️ Unable to verify at the moment. Please try again later.',
                
                // Products Page
                'products.title': 'Products',
                'products.viewDetails': 'View Details',
                
                // Product Details
                'details.features': 'Features',
                'details.ingredients': 'Ingredients',
                'details.usage': 'How to Use',
                'details.price': 'Price',
                'details.categories': 'Categories',
                'details.backToProducts': 'Back to Products',
                
                // Contact Page
                'contact.title': 'Contact Us',
                'contact.fullName': 'Full Name *',
                'contact.email': 'Email Address *',
                'contact.country': 'Country *',
                'contact.mobile': 'Mobile Number *',
                'contact.message': 'Message *',
                'contact.send': 'Send Message',
                'contact.success': 'Thank you for your message! We will get back to you soon.',
                
                // Footer
                'footer.quickLinks': 'Quick Links',
                'footer.contactUs': 'Contact Us',
                'footer.email': 'Email: info@stdalfours.com',
                'footer.sales': 'Sales: sales@stdalfours.com',
                'footer.copyright': '© 2025 St. Dalfour. All rights reserved.',
                
                // Breadcrumbs
                'breadcrumb.home': 'Home',
                'breadcrumb.products': 'Products',
                'breadcrumb.verify': 'Verify',
                'breadcrumb.contact': 'Contact',
                'breadcrumb.productDetails': 'Product Details',
                
                // Common
                'common.loading': 'Loading...',
                'common.error': 'Error occurred',
                'common.close': 'Close',
                'common.back': 'Back'
            },
            ar: {
                // Navigation
                'nav.home': 'الرئيسية',
                'nav.verify': 'التحقق من المنتجات',
                'nav.products': 'المنتجات',
                'nav.contact': 'اتصل بنا',
                'nav.language': 'English',
                
                // Hero Section
                'hero.title': 'كريم سانت دالفور',
                'hero.subtitle': 'أفضل كريم في دبي | منتجات العناية بالبشرة الأولى في الإمارات',
                'hero.description': 'كريم التبييض الأصلي مع نتائج مضمونة',
                'hero.verify': 'التحقق من المنتج',
                'hero.scan': '📷 مسح رمز الاستجابة السريعة',
                
                // Featured Products
                'featured.title': 'منتجات العناية بالبشرة المميزة',
                'featured.subtitle': 'اكتشف مجموعتنا من أفضل منتجات العناية بالبشرة وكريمات التبييض الأصلية في الإمارات',
                'featured.viewAll': 'عرض جميع المنتجات',
                
                // Why Choose Us
                'why.title': 'لماذا نحن الأفضل في دبي؟',
                'why.original.title': 'منتجات أصلية مضمونة',
                'why.original.desc': 'جميع منتجاتنا أصلية 100% مع نظام تحقق آمن',
                'why.best.title': 'أفضل كريم تبييض',
                'why.best.desc': 'كريمات التبييض الأكثر فعالية مع نتائج سريعة ومضمونة',
                'why.delivery.title': 'توصيل سريع في الإمارات',
                'why.delivery.desc': 'توصيل مجاني وسريع في جميع أنحاء دولة الإمارات العربية المتحدة',
                
                // Verify Page
                'verify.title': 'التحقق من المنتج',
                'verify.subtitle': 'أدخل رمز المنتج الفريد الموجود على العنصر.',
                'verify.placeholder': 'الرمز الفريد *',
                'verify.button': 'تحقق',
                'verify.scan': '📷 مسح رمز الاستجابة السريعة',
                'verify.warning.title': '⚠️ تحذير: احذر من الاحتيال',
                'verify.warning.text': 'هذا هو الموقع الرسمي الوحيد لكريم سانت دالفور. احذر من المواقع الاحتيالية بما في ذلك www.stdalfourwhiteningcream.com و www.stdalfourofficial.com. نحن لسنا مسؤولين عن المشتريات من مصادر غير مصرح بها.',
                'verify.success': '✅ المنتج أصلي ومتحقق منه!',
                'verify.error': '❌ لم يتم العثور على رمز المنتج. قد يكون هذا منتج مقلد.',
                'verify.loading': 'جاري التحقق من المنتج...',
                'verify.networkError': '⚠️ غير قادر على التحقق في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقاً.',
                
                // Products Page
                'products.title': 'المنتجات',
                'products.viewDetails': 'عرض التفاصيل',
                
                // Product Details
                'details.features': 'المميزات',
                'details.ingredients': 'المكونات',
                'details.usage': 'طريقة الاستخدام',
                'details.price': 'السعر',
                'details.categories': 'الفئات',
                'details.backToProducts': 'العودة إلى المنتجات',
                
                // Contact Page
                'contact.title': 'اتصل بنا',
                'contact.fullName': 'الاسم الكامل *',
                'contact.email': 'عنوان البريد الإلكتروني *',
                'contact.country': 'البلد *',
                'contact.mobile': 'رقم الهاتف المحمول *',
                'contact.message': 'الرسالة *',
                'contact.send': 'إرسال الرسالة',
                'contact.success': 'شكراً لك على رسالتك! سنعود إليك قريباً.',
                
                // Footer
                'footer.quickLinks': 'روابط سريعة',
                'footer.contactUs': 'اتصل بنا',
                'footer.email': 'البريد الإلكتروني: info@stdalfours.com',
                'footer.sales': 'المبيعات: sales@stdalfours.com',
                'footer.copyright': '© 2025 سانت دالفور. جميع الحقوق محفوظة.',
                
                // Breadcrumbs
                'breadcrumb.home': 'الرئيسية',
                'breadcrumb.products': 'المنتجات',
                'breadcrumb.verify': 'التحقق',
                'breadcrumb.contact': 'اتصل بنا',
                'breadcrumb.productDetails': 'تفاصيل المنتج',
                
                // Common
                'common.loading': 'جاري التحميل...',
                'common.error': 'حدث خطأ',
                'common.close': 'إغلاق',
                'common.back': 'رجوع'
            }
        };
        
        // Load saved language preference
        const savedLang = localStorage.getItem('stdalfour-language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        }
        
        this.updatePageDirection();
    }
    
    // Get translation for a key
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    // Toggle between English and Arabic
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
        localStorage.setItem('stdalfour-language', this.currentLanguage);
        this.updatePageDirection();
        this.updateAllText();
        return this.currentLanguage;
    }
    
    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // Check if current language is Arabic
    isArabic() {
        return this.currentLanguage === 'ar';
    }
    
    // Update page direction for RTL/LTR
    updatePageDirection() {
        document.documentElement.dir = this.isArabic() ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLanguage;
    }
    
    // Update all text elements on the page
    updateAllText() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // Update language toggle button
        const langToggle = document.querySelector('.language-toggle');
        if (langToggle) {
            langToggle.textContent = this.t('nav.language');
        }
        
        // Trigger custom event for components that need to update
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }
    
    // Format text with Arabic/English based on current language
    formatProductName(product) {
        return this.isArabic() ? product.nameAr : product.name;
    }
    
    formatProductDescription(product) {
        return this.isArabic() ? product.descriptionAr : product.description;
    }
    
    formatProductFeatures(product) {
        return this.isArabic() ? product.featuresAr : product.features;
    }
    
    formatProductUsage(product) {
        return this.isArabic() ? product.usageAr : product.usage;
    }
    
    formatCategoryName(category) {
        return this.isArabic() ? category.nameAr : category.name;
    }
    
    formatCategoryDescription(category) {
        return this.isArabic() ? category.descriptionAr : category.description;
    }
}

// Create global instance
window.i18n = new I18n();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    window.i18n.updateAllText();
});
