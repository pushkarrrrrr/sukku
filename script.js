// ===== GLOBAL VARIABLES =====
let isLoading = true;
let currentSection = 'home';
const startDate = new Date('2023-01-01'); // Change this to your actual start date

// ===== DOM ELEMENTS - Lazy loaded for better performance =====
let loadingScreen, navbar, hamburger, navMenu, navLinks, imageModal, modalImage, closeModal;

function initializeDOMElements() {
    loadingScreen = document.getElementById('loading-screen');
    navbar = document.getElementById('navbar');
    hamburger = document.getElementById('hamburger');
    navMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    imageModal = document.getElementById('image-modal');
    modalImage = document.getElementById('modal-image');
    closeModal = document.querySelector('.close-modal');
    
    console.log('DOM elements initialized:', {
        loadingScreen: !!loadingScreen,
        navbar: !!navbar,
        hamburger: !!hamburger,
        navMenu: !!navMenu,
        navLinks: navLinks.length,
        imageModal: !!imageModal,
        modalImage: !!modalImage,
        closeModal: !!closeModal
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    
    // Initialize DOM elements first
    let domInitError = false;
    try {
        initializeDOMElements();
    } catch (error) {
        domInitError = true;
        console.error('Error initializing DOM elements:', error);
    }

    // Always try to hide loading screen after DOM is ready, even if errors
    setTimeout(() => {
        try {
            if (typeof hideLoadingScreen === 'function') {
                hideLoadingScreen();
            } else if (typeof loadingScreen !== 'undefined' && loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        } catch (e) {
            if (typeof loadingScreen !== 'undefined' && loadingScreen) loadingScreen.classList.add('hidden');
        }
    }, 200);

    // Initialize components immediately - no need to wait for loading screen
    try {
        if (!domInitError) {
            initializeComponents();
            console.log('Components initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing components:', error);
    }
});

// Batch initialize components for better performance
function initializeComponents() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // Initialize Swiper
    initializeSwiper();

    // Initialize event listeners
    initializeEventListeners();

    // Initialize love counter
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);

    // Initialize scroll effects
    initializeScrollEffects();

    // Initialize video functionality
    initializeVideoPlayer();

    // Initialize image modal
    initializeImageModal();

    // Initialize navigation
    initializeNavigation();
});

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        isLoading = false;
        
        // Add fade-in animation to body content
        document.body.classList.add('fade-in');
        
        // Start floating hearts animation
        startFloatingHearts();
    }
}

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    // Check if DOM elements are available
    if (!hamburger || !navLinks || !navbar) {
        console.warn('Navigation elements not found, skipping navigation initialization');
        return;
    }

    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// ===== SCROLL FUNCTIONALITY =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function initializeScrollEffects() {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Navbar scroll effects
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation link
        updateActiveNavLink();

        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }

        lastScrollY = currentScrollY;
    });
}

function updateActiveNavLink() {
    if (!navLinks) return;
    
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== SWIPER INITIALIZATION =====
function initializeSwiper() {
    // Check if Swiper is loaded and element exists
    if (typeof Swiper === 'undefined' || !document.querySelector('.memory-swiper')) {
        return;
    }
    
    const swiper = new Swiper('.memory-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
        },
        effect: 'slide',
        speed: 600,
    });

    // Add hover pause functionality
    const swiperContainer = document.querySelector('.memory-swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            swiper.autoplay.stop();
        });

        swiperContainer.addEventListener('mouseleave', () => {
            swiper.autoplay.start();
        });
    }
}

// ===== VIDEO PLAYER =====
function initializeVideoPlayer() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const video = document.querySelector('.memory-video');

    if (videoPlaceholder && video) {
        videoPlaceholder.addEventListener('click', () => {
            videoPlaceholder.style.display = 'none';
            video.style.display = 'block';
            video.play();
        });
    }
}

// ===== IMAGE MODAL =====
function initializeImageModal() {
    const images = document.querySelectorAll('.memory-image, .gallery-item img');
    
    images.forEach(img => {
        img.addEventListener('click', () => {
            openImageModal(img.src, img.alt);
        });
    });

    // Close modal events - check if elements exist
    if (closeModal) {
        closeModal.addEventListener('click', closeImageModal);
    }
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

function openImageModal(src, alt) {
    if (!modalImage || !imageModal) return;
    
    modalImage.src = src;
    modalImage.alt = alt;
    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        if (imageModal) {
            imageModal.style.opacity = '1';
        }
    }, 10);
}

function closeImageModal() {
    if (!imageModal) return;
    
    imageModal.style.opacity = '0';
    setTimeout(() => {
        if (imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }, 300);
}

// ===== LOVE COUNTER =====
function updateLoveCounter() {
    const now = new Date();
    const timeDiff = now.getTime() - startDate.getTime();
    
    // Calculate different time units
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    const counterElement = document.getElementById('love-counter');
    if (counterElement) {
        // Create a romantic display of time
        if (days > 0) {
            counterElement.textContent = `${days.toLocaleString()}`;
        } else if (hours > 0) {
            counterElement.textContent = `${hours.toLocaleString()}`;
        } else if (minutes > 0) {
            counterElement.textContent = `${minutes.toLocaleString()}`;
        } else {
            counterElement.textContent = `${seconds.toLocaleString()}`;
        }
    }
}

// ===== FLOATING HEARTS ANIMATION =====
function startFloatingHearts() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    setInterval(() => {
        createFloatingHeart();
    }, 3000);
}

function createFloatingHeart() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    const heart = document.createElement('i');
    heart.className = 'fas fa-heart floating-heart-dynamic';
    heart.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: 100%;
        font-size: ${Math.random() * 20 + 10}px;
        color: rgba(255, 255, 255, 0.6);
        pointer-events: none;
        animation: floatUp 8s linear forwards;
    `;

    heroBackground.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 8000);
}

// Add CSS for floating heart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Add hover effects to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = ctaButton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            ctaButton.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Add typing effect to quotes
    initializeTypingEffect();

    // Add intersection observer for animations
    initializeIntersectionObserver();
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const quotes = document.querySelectorAll('.quote');
    
    quotes.forEach(quote => {
        const text = quote.textContent;
        quote.textContent = '';
        quote.style.borderRight = '2px solid var(--love-accent)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText(quote, text, 50);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(quote);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            element.style.borderRight = 'none';
        }
    }, speed);
}

// ===== INTERSECTION OBSERVER =====
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for gallery items
                if (entry.target.classList.contains('gallery-item')) {
                    const items = entry.target.parentNode.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = `fadeInUp 0.6s ease forwards`;
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.memory-card, .gallery-item, .final-message');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('keydown', (e) => {
    // Navigate with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentIndex = sections.findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        let nextIndex;
        if (e.key === 'ArrowDown') {
            nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
            nextIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (sections[nextIndex]) {
            scrollToSection(sections[nextIndex].id);
        }
    }
});

// ===== EASTER EGGS =====
let clickCount = 0;
document.querySelector('.hero-title')?.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        // Secret animation
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        clickCount = 0;
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===== GALLERY FUNCTIONALITY =====
let currentMediaIndex = 0;
let galleryItems = [];
let currentFilter = 'all';
let uploadedFiles = [];

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

function initializeGallery() {
    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            setActiveFilter(btn, filter);
            filterGalleryItems(filter);
        });
    });

    // Initialize gallery items
    galleryItems = Array.from(document.querySelectorAll('.gallery-item, .gallery-item-large, .gallery-item-wide'));
    
    // Initialize video play buttons
    const videoPlayButtons = document.querySelectorAll('.video-play-btn');
    videoPlayButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const video = btn.parentNode.querySelector('video');
            if (video) {
                btn.style.display = 'none';
                video.play();
            }
        });
    });

    // Initialize upload functionality
    initializeUpload();
}

function setActiveFilter(activeBtn, filter) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    activeBtn.classList.add('active');
    currentFilter = filter;
}

function filterGalleryItems(filter) {
    galleryItems.forEach((item, index) => {
        const categories = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        if (shouldShow) {
            item.classList.remove('filtered-out');
            item.classList.add('filtered-in');
            setTimeout(() => {
                item.style.display = 'block';
            }, index * 50);
        } else {
            item.classList.add('filtered-out');
            item.classList.remove('filtered-in');
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Media Modal Functions
function openMediaModal(element) {
    const mediaContainer = element.closest('.media-container');
    const img = mediaContainer.querySelector('img');
    const video = mediaContainer.querySelector('video');
    const info = mediaContainer.querySelector('.media-info');
    
    const modal = document.getElementById('media-modal');
    const modalImg = document.getElementById('modal-media-img');
    const modalVideo = document.getElementById('modal-media-video');
    const modalTitle = document.getElementById('modal-media-title');
    const modalDescription = document.getElementById('modal-media-description');
    const modalDate = document.getElementById('modal-media-date');
    
    // Find current item index
    const galleryItem = element.closest('.gallery-item, .gallery-item-large, .gallery-item-wide');
    currentMediaIndex = galleryItems.indexOf(galleryItem);
    
    // Display media
    if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
    } else if (video) {
        modalVideo.querySelector('source').src = video.querySelector('source').src;
        modalVideo.load();
        modalVideo.style.display = 'block';
        modalImg.style.display = 'none';
    }
    
    // Display info
    if (info) {
        modalTitle.textContent = info.querySelector('h4').textContent;
        modalDescription.textContent = info.querySelector('p').textContent;
        modalDate.textContent = info.querySelector('.media-date').textContent;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Update navigation buttons
    updateMediaNavigation();
}

function closeMediaModal() {
    const modal = document.getElementById('media-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Pause video if playing
    const modalVideo = document.getElementById('modal-media-video');
    if (modalVideo.style.display === 'block') {
        modalVideo.pause();
    }
}

function previousMedia() {
    if (currentMediaIndex > 0) {
        currentMediaIndex--;
        const prevItem = galleryItems[currentMediaIndex];
        const expandBtn = prevItem.querySelector('.action-btn');
        openMediaModal(expandBtn);
    }
}

function nextMedia() {
    if (currentMediaIndex < galleryItems.length - 1) {
        currentMediaIndex++;
        const nextItem = galleryItems[currentMediaIndex];
        const expandBtn = nextItem.querySelector('.action-btn');
        openMediaModal(expandBtn);
    }
}

function updateMediaNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    prevBtn.disabled = currentMediaIndex === 0;
    nextBtn.disabled = currentMediaIndex === galleryItems.length - 1;
}

// Download Media Function
function downloadMedia(element) {
    const mediaContainer = element.closest('.media-container');
    const img = mediaContainer.querySelector('img');
    const video = mediaContainer.querySelector('video');
    
    let mediaUrl = '';
    let filename = '';
    
    if (img) {
        mediaUrl = img.src;
        filename = img.alt.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
    } else if (video) {
        mediaUrl = video.querySelector('source').src;
        filename = 'video_' + Date.now() + '.mp4';
    }
    
    if (mediaUrl) {
        const link = document.createElement('a');
        link.href = mediaUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Upload Functionality
function initializeUpload() {
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');
    const uploadPreview = document.getElementById('upload-preview');
    
    // Click to upload
    uploadZone.addEventListener('click', () => {
        fileInput.click();
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--love-accent)';
        uploadZone.style.background = 'rgba(255, 192, 203, 0.2)';
    });
    
    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--love-pink)';
        uploadZone.style.background = 'rgba(255, 192, 203, 0.05)';
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--love-pink)';
        uploadZone.style.background = 'rgba(255, 192, 203, 0.05)';
        handleFiles(e.dataTransfer.files);
    });
}

function handleFiles(files) {
    const uploadPreview = document.getElementById('upload-preview');
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            uploadedFiles.push(file);
            
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-preview';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = () => {
                const index = uploadedFiles.indexOf(file);
                if (index > -1) {
                    uploadedFiles.splice(index, 1);
                }
                // Revoke object URL to prevent memory leaks
                const mediaElement = previewItem.querySelector('img, video');
                if (mediaElement && mediaElement.src.startsWith('blob:')) {
                    URL.revokeObjectURL(mediaElement.src);
                }
                previewItem.remove();
            };
            
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                previewItem.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.muted = true;
                previewItem.appendChild(video);
            }
            
            previewItem.appendChild(removeBtn);
            uploadPreview.appendChild(previewItem);
        }
    });
}

function openUploadModal() {
    const modal = document.getElementById('upload-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Set today's date as default
    const dateInput = document.getElementById('memory-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

function closeUploadModal() {
    const modal = document.getElementById('upload-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear form
    document.getElementById('memory-title').value = '';
    document.getElementById('memory-description').value = '';
    document.getElementById('memory-category').value = 'photos';
    document.getElementById('memory-date').value = '';
    
    // Clear file input to prevent ghost files
    const fileInput = document.getElementById('file-input');
    fileInput.value = '';
    
    // Clear uploaded files array first, then clear preview
    uploadedFiles = [];
    
    // Revoke all object URLs to prevent memory leaks
    const previewItems = document.querySelectorAll('#upload-preview .preview-item');
    previewItems.forEach(item => {
        const mediaElement = item.querySelector('img, video');
        if (mediaElement && mediaElement.src.startsWith('blob:')) {
            URL.revokeObjectURL(mediaElement.src);
        }
    });
    
    document.getElementById('upload-preview').innerHTML = '';
}

function saveMemory() {
    const title = document.getElementById('memory-title').value;
    const description = document.getElementById('memory-description').value;
    const category = document.getElementById('memory-category').value;
    const date = document.getElementById('memory-date').value;
    
    if (!title || !description || uploadedFiles.length === 0) {
        alert('Please fill in all fields and select at least one file.');
        return;
    }
    
    // Here you would typically upload files to a server
    // For now, we'll simulate adding to the gallery
    uploadedFiles.forEach(file => {
        addMemoryToGallery(file, title, description, category, date);
    });
    
    closeUploadModal();
    
    // Show success message
    showNotification('Memory saved successfully! 💕', 'success');
}

function addMemoryToGallery(file, title, description, category, date) {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', category);
    
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'media-container';
    
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = title;
        img.loading = 'lazy';
        mediaContainer.appendChild(img);
    } else if (file.type.startsWith('video/')) {
        mediaContainer.classList.add('video-container');
        const video = document.createElement('video');
        video.loading = 'lazy';
        const source = document.createElement('source');
        source.src = URL.createObjectURL(file);
        source.type = file.type;
        video.appendChild(source);
        
        const playBtn = document.createElement('div');
        playBtn.className = 'video-play-btn';
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playBtn.style.display = 'none';
            video.play();
        });
        
        mediaContainer.appendChild(video);
        mediaContainer.appendChild(playBtn);
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'media-overlay';
    overlay.innerHTML = `
        <div class="media-info">
            <h4>${title}</h4>
            <p>${description}</p>
            <span class="media-date">${new Date(date).toLocaleDateString()}</span>
        </div>
        <div class="media-actions">
            <button class="action-btn" onclick="openMediaModal(this)">
                <i class="fas fa-expand"></i>
            </button>
            <button class="action-btn" onclick="downloadMedia(this)">
                <i class="fas fa-download"></i>
            </button>
        </div>
    `;
    
    mediaContainer.appendChild(overlay);
    galleryItem.appendChild(mediaContainer);
    galleryGrid.appendChild(galleryItem);
    
    // Update gallery items array
    galleryItems.push(galleryItem);
    
    // Apply current filter
    if (currentFilter !== 'all' && !category.includes(currentFilter)) {
        galleryItem.style.display = 'none';
    }
}

// Load More Functionality
function loadMoreMedia() {
    const loadBtn = document.querySelector('.load-more-btn');
    const originalText = loadBtn.innerHTML;
    
    loadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadBtn.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
        // Here you would typically fetch more media from a server
        // For now, we'll show a message
        showNotification('All memories loaded! 💕', 'info');
        
        loadBtn.innerHTML = originalText;
        loadBtn.disabled = false;
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentNode.remove()">×</button>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--love-light);
                color: var(--love-dark);
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: var(--love-shadow);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
            }
            
            .notification-success {
                border-left: 4px solid #4CAF50;
            }
            
            .notification-error {
                border-left: 4px solid #f44336;
            }
            
            .notification-info {
                border-left: 4px solid var(--love-accent);
            }
            
            .notification button {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: var(--love-dark);
                margin-left: auto;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Keyboard Navigation for Gallery
document.addEventListener('keydown', (e) => {
    const mediaModal = document.getElementById('media-modal');
    if (mediaModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousMedia();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextMedia();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeMediaModal();
        }
    }
    
    const uploadModal = document.getElementById('upload-modal');
    if (uploadModal.style.display === 'block' && e.key === 'Escape') {
        e.preventDefault();
        closeUploadModal();
    }
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.scrollToSection = scrollToSection;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.openMediaModal = openMediaModal;
window.closeMediaModal = closeMediaModal;
window.previousMedia = previousMedia;
window.nextMedia = nextMedia;
window.downloadMedia = downloadMedia;
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.saveMemory = saveMemory;
window.loadMoreMedia = loadMoreMedia;

// ===== CONSOLE MESSAGE =====
console.log(`
💕 Welcome to Our Love Story! 💕
This website was built with love and modern web technologies.
Technologies used:
- HTML5 & CSS3
- Vanilla JavaScript
- AOS (Animate On Scroll)
- Swiper.js
- Font Awesome
- Google Fonts

Made with ❤️ for someone special.
`);

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the next lines if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
