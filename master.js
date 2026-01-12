// عند تحميل الصفحة
window.onload = () => {
    ///////////////////     Slide Show (عرض الشرائح)     ////////////////

    // تعريف متغير للتحكم في حركة السلايد
    let backgroundStory = true;

    // استرجاع  الخلفية المحفوظ في التخزين المحلي (localStorage)

    let getBackgroundOption = localStorage.getItem("background-option");

    // متغير للتحكم في المؤقت (المُسمى backgroundInterval)
    let backgroundInterval;

    // Global touch variables for all touch interactions
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelectorAll('.background-option span').forEach(Element=>{
        Element.classList.remove('active');
    });
    
    if(getBackgroundOption !== null){
        if(getBackgroundOption==='yes'){
            backgroundStory = true;
            document.querySelector('.background-option .yes').classList.add('active');
        }
        else{
            backgroundStory=false;
            document.querySelector('.background-option .no').classList.add('active');
        }

    }else{
        backgroundStory= true;
    }

    // دالة لبدء حركة السلايد
    function slideShow() {
        if (backgroundStory) {
            var landingPage = document.querySelector('.landing-page');

            // مصفوفة تحتوي على صور العرض
            let gallery = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'];

            // تحديث الصورة بشكل عشوائي كل ثانية
            backgroundInterval = setInterval(() => {
                let randomGallery = Math.floor(Math.random() * gallery.length);
                landingPage.style.backgroundImage = `url(./images/slide-show/${gallery[randomGallery]})`;
            }, 5000);
        }
    }

    // العناصر المتعلقة بخيارات الخلفية
    const backgroundOption = document.querySelectorAll('.background-option span');
    backgroundOption.forEach(span => {
        span.addEventListener("click", (e) => {
            // إزالة الكلاس 'active' من جميع العناصر الأخرى داخل نفس العنصر الأب
            e.target.parentElement.querySelectorAll('.active').forEach(Element => {
                Element.classList.remove('active');
            });

            // إضافة الكلاس 'active' إلى العنصر الحالي
            e.target.classList.add('active');

            // تعيين قيمة متغير backgroundStory بناءً على الخيار المُختار
            if (e.target.dataset.background === 'yes') {
                backgroundStory = true;
                slideShow();
            } else {
                backgroundStory = false;
                clearInterval(backgroundInterval); 
                slideShow();
            }
            //  وتعيين الخلفية المحفوظ في التخزين المحلي (localStorage)
            localStorage.setItem("background-option", e.target.dataset.background);
            
        });
    });
        

    ///////////////////     Sticky Navigation     ////////////////

    // Sticky navigation functionality
    const headerArea = document.querySelector('.header-area');
    const introductionText = document.querySelector('.introduction-text');
    
    function handleStickyNavigation() {
        if (window.scrollY > 100) {
            headerArea.classList.add('sticky');
            introductionText.style.paddingTop = headerArea.offsetHeight + 'px';
        } else {
            headerArea.classList.remove('sticky');
            introductionText.style.paddingTop = '0';
        }
    }

    window.addEventListener('scroll', handleStickyNavigation);
    window.addEventListener('resize', handleStickyNavigation);

    ///////////////////     Slide Bar Settings (إعدادات شريط الإعدادات)     ////////////////

    // العناصر المتعلقة بشريط الإعدادات
    let stopSpin = document.querySelector('.container-gear .fa-gear');
    let openSetting = document.querySelector('.setting-box');
    let gearButton = document.querySelector('.container-gear');

    // Toggle settings panel and handle gear icon animation
    gearButton.onclick = function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        openSetting.classList.toggle('active');
        
        // Toggle the 'settings-open' class on the body for global state management
        document.body.classList.toggle('settings-open', !isExpanded);
        
        // Add/remove spin class with a small delay for better visual feedback
        const gearIcon = this.querySelector('i');
        gearIcon.style.transition = 'transform 0.3s ease-in-out';
        if (!isExpanded) {
            gearIcon.classList.add('fa-spin');
        } else {
            // Wait for the rotation to complete before removing the spin class
            setTimeout(() => {
                gearIcon.classList.remove('fa-spin');
            }, 300);
        }
    }

    ///////////////////     Option Colors (خيارات الألوان)     ////////////////

    // العناصر المتعلقة بخيارات الألوان
    const setColor = document.querySelectorAll('.colors-list li');
    setColor.forEach(li => {
        li.addEventListener("click", (e) => {
            // تعيين اللون المحدد كمتغير في الجذر (الجذر الأساسي للصفحة)
            document.documentElement.style.setProperty('--color-4', e.target.dataset.color);
            localStorage.setItem("color-option", e.target.dataset.color);

            // إزالة الكلاس 'mainOption' من جميع العناصر الأخرى
            e.target.parentElement.querySelectorAll('.mainOption').forEach(Element => {
                Element.classList.remove('mainOption');
            });

            // إضافة الكلاس 'mainOption' إلى العنصر الحالي
            e.target.classList.add('mainOption');
        });
    });

    // استرجاع وتعيين اللون المحفوظ في التخزين المحلي (localStorage)
    let mainColor = localStorage.getItem("color-option");
    if (mainColor !== null) {
        document.documentElement.style.setProperty("--color-4", localStorage.getItem("color-option"));
    } else {
        document.documentElement.style.setProperty("--color-4", "#ff986f");
    }

    ///////////////////     Background color (لون الخلفية)     ////////////////

// العناصر المتعلقة بلون الخلفية
const setBackground = document.querySelectorAll('.backcolors-list li');
setBackground.forEach(li => {
    li.addEventListener("click", (e) => {
        // تعيين اللون المحدد كمتغير في الجذر (الجذر الأساسي للصفحة)
        document.documentElement.style.setProperty('--background-color-main', e.target.dataset.backcolor);
        localStorage.setItem("background-color", e.target.dataset.backcolor);

        // إزالة الكلاس 'setColor' من جميع العناصر الأخرى
        e.target.parentElement.querySelectorAll('.setColor').forEach(Element => {
            Element.classList.remove('setColor');
        });

        // إضافة الكلاس 'setColor' إلى العنصر الحالي
        e.target.classList.add('setColor');
    });
});

// استرجاع وتعيين لون الخلفية المحفوظ في التخزين المحلي (localStorage)
let backgroundColor = localStorage.getItem("background-color");
if (backgroundColor !== null) {
    document.documentElement.style.setProperty("--background-color-main", backgroundColor);
} else {
    document.documentElement.style.setProperty("--background-color-main", "#02617b");
}

/////////////////// Skills Selector ///////////////////

// الحصول على عناصر شريط العمل ومهارات المهارات
const skillProgressBars = document.querySelectorAll(".skill-progress span");

// دالة لتحريك شريط العمل
function animateProgressBar() {
    skillProgressBars.forEach(progressBar => {
        // الحصول على قيمة النسبة من السمة "data-progress"
        const progress = progressBar.getAttribute("data-progress");
        progressBar.style.width = progress; // تحديث عرض شريط العمل بناءً على القيمة المحددة
    });
}

// القيام بتنفيذ الدالة عندما يتم التمرير إلى قسم المهارات
window.addEventListener("scroll", function () {
    // الحصول على عنصر قسم المهارات
    const skillsSection = document.querySelector(".skills");
    
    // حساب موقع قسم المهارات بالنسبة لأعلى الصفحة
    const skillsSectionTop = skillsSection.offsetTop;
    
    // ارتفاع نافذة المستعرض
    const windowHeight = window.innerHeight;
    
    // موقع النص الحالي على الصفحة
    const scrollY = window.scrollY;

    // التحقق إذا كان تمرير الصفحة إلى منتصف قسم المهارات
    if (scrollY > skillsSectionTop - windowHeight / 2) {
        // تنفيذ دالة تحريك شريط العمل
        animateProgressBar();
    }
});

/////////////////// Enhanced Gallery System ///////////////////

// Gallery state management
let galleryState = {
    currentFilter: 'all',
    currentView: 'grid',
    searchTerm: '',
    currentImageIndex: 0,
    isZoomed: false
};

// Get gallery elements
const galleryItems = document.querySelectorAll('.gallery-item');
const filterButtons = document.querySelectorAll('.filter-btn');
const viewButtons = document.querySelectorAll('.view-btn');
const searchInput = document.getElementById('gallerySearch');
const galleryBox = document.querySelector('.gallery-box');
const noResultsMessage = document.querySelector('.gallery-no-results');

// Initialize gallery
function initGallery() {
    setupFilterButtons();
    setupViewButtons();
    setupSearch();
    setupGalleryItems();
    setupLazyLoading();
}

// Setup filter buttons
function setupFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Apply filter
            galleryState.currentFilter = filter;
            filterGallery();
        });
    });
}

// Setup view toggle buttons
function setupViewButtons() {
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            
            // Update active state
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Apply view
            galleryState.currentView = view;
            toggleGalleryView();
        });
    });
}

// Setup search functionality
function setupSearch() {
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            galleryState.searchTerm = e.target.value.toLowerCase();
            filterGallery();
        }, 300));
    }
}

// Setup gallery items
function setupGalleryItems() {
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        
        // Add click event for popup
        item.addEventListener('click', () => {
            galleryState.currentImageIndex = index;
            createEnhancedPopup(img);
        });
        
        // Add staggered animation delay
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Filter gallery items
function filterGallery() {
    let visibleCount = 0;
    
    galleryItems.forEach(item => {
        const category = item.dataset.category;
        const title = item.dataset.title.toLowerCase();
        const matchesFilter = galleryState.currentFilter === 'all' || category === galleryState.currentFilter;
        const matchesSearch = galleryState.searchTerm === '' || title.includes(galleryState.searchTerm);
        
        if (matchesFilter && matchesSearch) {
            item.classList.remove('hidden');
            item.style.animationDelay = `${visibleCount * 0.1}s`;
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = '';
            }, 10);
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Show/hide no results message
    if (noResultsMessage) {
        noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// Toggle gallery view
function toggleGalleryView() {
    if (galleryState.currentView === 'masonry') {
        galleryBox.classList.add('masonry');
    } else {
        galleryBox.classList.remove('masonry');
    }
}

// Enhanced popup creation
function createEnhancedPopup(img) {
    // Create overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    
    // Create popup box
    const popupBox = document.createElement('div');
    popupBox.classList.add('popup-box');
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.style.position = 'relative';
    
    // Create image
    const popupImg = document.createElement('img');
    popupImg.src = img.src;
    popupImg.alt = img.alt;
    
    // Add zoom functionality
    popupImg.addEventListener('click', () => {
        galleryState.isZoomed = !galleryState.isZoomed;
        popupImg.classList.toggle('zoomed');
    });
    
    imageContainer.appendChild(popupImg);
    
    // Create popup controls
    const popupControls = document.createElement('div');
    popupControls.className = 'popup-controls';
    
    // Add fullscreen button
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'popup-control-btn';
    fullscreenBtn.innerHTML = '<i class="fa fa-expand"></i>';
    fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen');
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Add download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'popup-control-btn';
    downloadBtn.innerHTML = '<i class="fa fa-download"></i>';
    downloadBtn.setAttribute('aria-label', 'Download image');
    downloadBtn.addEventListener('click', () => downloadImage(img.src));
    
    popupControls.appendChild(fullscreenBtn);
    popupControls.appendChild(downloadBtn);
    
    // Create content area
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    
    if (img.alt) {
        const title = document.createElement('h3');
        title.textContent = img.alt;
        popupContent.appendChild(title);
    }
    
    // Add image info
    const imageInfo = document.createElement('div');
    imageInfo.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-top: 10px; color: #666; font-size: 14px;';
    
    const imageIndex = document.createElement('span');
    imageIndex.textContent = `${galleryState.currentImageIndex + 1} / ${galleryItems.length}`;
    
    const imageCategory = document.createElement('span');
    const currentItem = galleryItems[galleryState.currentImageIndex];
    if (currentItem) {
        const category = currentItem.dataset.category;
        imageCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    imageInfo.appendChild(imageIndex);
    imageInfo.appendChild(imageCategory);
    popupContent.appendChild(imageInfo);
    
    // Add navigation arrows
    const prevButton = document.createElement('button');
    prevButton.className = 'gallery-nav prev';
    prevButton.innerHTML = '&#10094;';
    prevButton.setAttribute('aria-label', 'Previous image');
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(-1);
    });
    
    const nextButton = document.createElement('button');
    nextButton.className = 'gallery-nav next';
    nextButton.innerHTML = '&#10095;';
    nextButton.setAttribute('aria-label', 'Next image');
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(1);
    });
    
    // Add close button
    const closeButton = document.createElement('span');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', closeEnhancedPopup);
    
    // Assemble popup
    popupBox.appendChild(popupControls);
    popupBox.appendChild(imageContainer);
    popupBox.appendChild(popupContent);
    popupBox.appendChild(prevButton);
    popupBox.appendChild(nextButton);
    popupBox.appendChild(closeButton);
    
    popupOverlay.appendChild(popupBox);
    document.body.appendChild(popupOverlay);
    
    // Add event listeners
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closeEnhancedPopup();
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handlePopupKeyboard);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Navigate gallery
function navigateGallery(direction) {
    galleryState.currentImageIndex += direction;
    
    // Wrap around
    if (galleryState.currentImageIndex < 0) {
        galleryState.currentImageIndex = galleryItems.length - 1;
    } else if (galleryState.currentImageIndex >= galleryItems.length) {
        galleryState.currentImageIndex = 0;
    }
    
    // Update popup content
    const currentItem = galleryItems[galleryState.currentImageIndex];
    const img = currentItem.querySelector('img');
    const popupImg = document.querySelector('.popup-box img');
    const popupTitle = document.querySelector('.popup-box h3');
    const imageIndex = document.querySelector('.popup-content span:first-child');
    const imageCategory = document.querySelector('.popup-content span:last-child');
    
    if (popupImg && img) {
        popupImg.style.animation = 'none';
        setTimeout(() => {
            popupImg.src = img.src;
            popupImg.alt = img.alt;
            popupImg.style.animation = 'fadeIn 0.3s ease';
        }, 10);
    }
    
    if (popupTitle && img) {
        popupTitle.textContent = img.alt;
    }
    
    if (imageIndex) {
        imageIndex.textContent = `${galleryState.currentImageIndex + 1} / ${galleryItems.length}`;
    }
    
    if (imageCategory && currentItem) {
        const category = currentItem.dataset.category;
        imageCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    // Reset zoom
    galleryState.isZoomed = false;
    if (popupImg) {
        popupImg.classList.remove('zoomed');
    }
}

// Handle keyboard navigation in popup
function handlePopupKeyboard(e) {
    if (e.key === 'Escape') {
        closeEnhancedPopup();
    } else if (e.key === 'ArrowLeft') {
        navigateGallery(-1);
    } else if (e.key === 'ArrowRight') {
        navigateGallery(1);
    } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
    }
}

// Close enhanced popup
function closeEnhancedPopup() {
    const popupOverlay = document.querySelector('.popup-overlay');
    if (popupOverlay) {
        popupOverlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(popupOverlay);
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Remove keyboard listener
    document.removeEventListener('keydown', handlePopupKeyboard);
    
    // Reset state
    galleryState.isZoomed = false;
}

// Toggle fullscreen
function toggleFullscreen() {
    const popupBox = document.querySelector('.popup-box');
    if (!popupBox) return;
    
    if (!document.fullscreenElement) {
        popupBox.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Download image
function downloadImage(src) {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop() || 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Setup lazy loading
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img && img.src) {
            imageObserver.observe(img);
        }
    });
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize gallery when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}

///////////////////     Move Top Link     ///////////////////

const allLinks = document.querySelectorAll('.menu li a');

allLinks.forEach(link=>{
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    });
});




var showSidebarButton = document.querySelector('.Burger');
var sidebar = document.getElementById('sidebar');

showSidebarButton.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
});

/////////////////// Testimonials Slider Enhancement ///////////////////

// Testimonials slider functionality
const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
const testimonialsItems = document.querySelectorAll('.testimonials-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const totalSlides = testimonialsItems.length;
let currentSlide = 0;
let autoplayInterval;

// Function to update slider position
function updateSlider() {
    testimonialsWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Function to go to next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

// Function to go to previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Function to go to specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

// Function to start autoplay
function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

// Function to stop autoplay
function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Event listeners for navigation buttons
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });
}

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        stopAutoplay();
        startAutoplay();
    });
});

// Pause autoplay on hover
const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
    testimonialsSlider.addEventListener('mouseenter', stopAutoplay);
    testimonialsSlider.addEventListener('mouseleave', startAutoplay);
}

// Start autoplay on page load
startAutoplay();

// Touch/swipe support for mobile
testimonialsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeTestimonials();
});

function handleSwipeTestimonials() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    }
});

///////////////////     Contact Form Validation     ////////////////

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            let isValid = true;
            
            if (name.length < 2) {
                showError('name-error', 'Name must be at least 2 characters long');
                isValid = false;
            }
            
            if (!isValidEmail(email)) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (subject.length < 5) {
                showError('subject-error', 'Subject must be at least 5 characters long');
                isValid = false;
            }
            
            if (message.length < 10) {
                showError('message-error', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send the form data to a server here
                console.log('Form submitted with:', { name, email, subject, message });
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    }

/////////////////// Scroll-Triggered Animations ///////////////////

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Stop observing once animated
            if (entry.target.dataset.once === 'true') {
                animationObserver.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Function to initialize animations
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll([
        '.about-us .info-about',
        '.about-us .info-img',
        '.skills .skills-box',
        '.gallery .gallery-box img',
        '.features .features-box',
        '.testimonials .testimonials-box',
        '.contact .contact-info',
        '.contact .contact-form',
        '.introduction-text h1',
        '.introduction-text p'
    ].join(', '));

    animatedElements.forEach((element, index) => {
        // Add animation classes based on element type
        if (element.classList.contains('info-about')) {
            element.classList.add('animate-slide-left');
        } else if (element.classList.contains('info-img')) {
            element.classList.add('animate-slide-right');
        } else if (element.classList.contains('skills-box')) {
            element.classList.add('animate-scale');
            element.classList.add(`animate-stagger-${(index % 6) + 1}`);
        } else if (element.classList.contains('gallery-box') || element.tagName === 'IMG') {
            element.classList.add('animate-scale');
            element.classList.add(`animate-stagger-${(index % 6) + 1}`);
        } else if (element.classList.contains('features-box')) {
            element.classList.add('animate-rotate');
            element.classList.add(`animate-stagger-${(index % 6) + 1}`);
        } else if (element.classList.contains('testimonials-box')) {
            element.classList.add('animate-fade-in');
        } else if (element.classList.contains('contact-info') || element.classList.contains('contact-form')) {
            element.classList.add('animate-slide-left');
        } else if (element.tagName === 'H1') {
            element.classList.add('animate-scale');
        } else if (element.tagName === 'P') {
            element.classList.add('animate-fade-in');
        } else {
            element.classList.add('animate-on-scroll');
        }
        
        // Add data attribute for one-time animations
        element.dataset.once = 'true';
        
        // Start observing
        animationObserver.observe(element);
    });
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Re-initialize on dynamic content changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            initScrollAnimations();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

/////////////////// تشغيل حركة السلايد عند تحميل الصفحة ///////////////////

    slideShow();
}
