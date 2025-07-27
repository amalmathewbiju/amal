/**
 * Enhanced Portfolio JavaScript
 * Features: Loading screen, 3D effects, animations, mouse trail, scroll effects
 */

// ===== GLOBAL VARIABLES =====
let mouseTrail = null;
let isLoading = true;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== INITIALIZE WEBSITE =====
function initializeWebsite() {
    // Initialize all components
    initLoadingScreen();
    initMouseTrail();
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initCounters();
    initCodeTypewriter();
    initParallaxBackground();
    initContactForm();
    initAOS();
    initFloatingElements();
    init3DObjects();
    initTimelineAnimations();
    
    // Debug: Force animations to be visible
    setTimeout(() => {
        const backgroundElements = document.querySelectorAll('.geometric-shape, .code-snippet, .cube-3d, .sphere-3d, .pyramid-3d, .particle-dot, .particle-line');
        backgroundElements.forEach(element => {
            element.style.display = 'block';
            element.style.visibility = 'visible';
        });
        console.log('Animation elements initialized:', backgroundElements.length);
    }, 1000);
    
    // Add smooth scrolling
    addSmoothScrolling();
    
    // Initialize scroll spy
    initScrollSpy();
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                isLoading = false;
                // Start other animations after loading
                startInitialAnimations();
            }, 500);
        }
    }, 100);
}

// ===== START INITIAL ANIMATIONS =====
function startInitialAnimations() {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Start code typewriter
    setTimeout(() => {
        startCodeTypewriter();
    }, 1000);
}

// ===== MOUSE TRAIL =====
function initMouseTrail() {
    mouseTrail = document.querySelector('.mouse-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isLoading) {
            mouseTrail.style.opacity = '0.6';
        }
    });
    
    // Smooth trail animation
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        mouseTrail.style.left = trailX + 'px';
        mouseTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Hide trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
        mouseTrail.style.opacity = '0';
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                updateActiveNavLink(link);
            }
        });
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

// ===== UPDATE ACTIVE NAV LINK =====
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
                
                if (entry.target.classList.contains('stats-grid')) {
                    animateCounters();
                }
                
                if (entry.target.classList.contains('portfolio-item')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.skill-category, .portfolio-item, .stats-grid, .contact-item, .about-image, .about-text'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    // This will be triggered by scroll animation
}

function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// ===== COUNTERS ANIMATION =====
function initCounters() {
    // This will be triggered by scroll animation
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const numberNode = counter.childNodes[0]; // The text node before the <span>

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            numberNode.textContent = Math.floor(current);
        }, 16);
    });
}


// ===== CODE TYPEWRITER EFFECT =====
function initCodeTypewriter() {
    // This will be triggered after loading
}

function startCodeTypewriter() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
            
            // Add typing sound effect (optional)
            // playTypingSound();
        }, index * 500);
    });
}

// ===== PARALLAX BACKGROUND =====
function initParallaxBackground() {
    const shapes = document.querySelectorAll('.geometric-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.querySelector('.form');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission(form);
        });
    }
}

// ===== HANDLE FORM SUBMISSION =====
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#28a745';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }, 2000);
}

// ===== SMOOTH SCROLLING =====
function addSmoothScrolling() {
    // Already handled in navigation, but add for any other links
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== INITIALIZE AOS (Animate On Scroll) =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
}

// ===== 3D TILT EFFECTS =====
function init3DTiltEffects() {
    const tiltElements = document.querySelectorAll('.portfolio-card, .skill-category, .contact-item');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// ===== FLOATING NAVIGATION SCROLL EFFECT =====
function initFloatingNavScroll() {
    const nav = document.querySelector('.floating-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateX(-50%) translateY(-100px)';
            nav.style.opacity = '0.8';
        } else {
            // Scrolling up
            nav.style.transform = 'translateX(-50%) translateY(0)';
            nav.style.opacity = '1';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== PORTFOLIO FILTER ANIMATION =====
function initPortfolioFilter() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add stagger animation to portfolio items
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== TECH ICONS HOVER EFFECTS =====
function initTechIconsEffects() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            icon.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-gold), var(--light-gold));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
}

// ===== EASTER EGGS =====
function initEasterEggs() {
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            triggerEasterEgg();
        }
    });
}

function triggerEasterEgg() {
    // Add rainbow effect to the page
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Add CSS for rainbow effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove effect after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional features after main initialization
    setTimeout(() => {
        init3DTiltEffects();
        initFloatingNavScroll();
        initPortfolioFilter();
        initTechIconsEffects();
        initScrollProgress();
        initEasterEggs();
        optimizePerformance();
    }, 1000);
});

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', () => {
    // Recalculate positions and sizes on resize
    debounce(() => {
        // Refresh AOS if available
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 250)();
});

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
    };
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initAccessibility() {
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.classList.add('skip-link');
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-gold);
        color: var(--vintage-white);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== FLOATING CODE ELEMENTS =====
function initFloatingElements() {
    const floatingCode = document.querySelector('.floating-code');
    if (!floatingCode) return;
    
    // Add random movement variation to code snippets
    const codeSnippets = document.querySelectorAll('.code-snippet');
    
    codeSnippets.forEach((snippet, index) => {
        // Add random horizontal drift
        const randomDelay = Math.random() * 5;
        const randomDuration = 20 + Math.random() * 15;
        
        snippet.style.animationDelay = `-${randomDelay}s`;
        snippet.style.animationDuration = `${randomDuration}s`;
        
        // Add subtle hover effect
        snippet.addEventListener('mouseenter', () => {
            snippet.style.animationPlayState = 'paused';
            snippet.style.transform += ' scale(1.2)';
            snippet.style.opacity = '0.9';
        });
        
        snippet.addEventListener('mouseleave', () => {
            snippet.style.animationPlayState = 'running';
            snippet.style.transform = snippet.style.transform.replace(' scale(1.2)', '');
            snippet.style.opacity = '0.6';
        });
    });
}

// ===== 3D OBJECTS INITIALIZATION =====
function init3DObjects() {
    const objects3D = document.querySelector('.floating-3d-objects');
    if (!objects3D) return;
    
    // Enhanced 3D cube animation
    const cube = document.querySelector('.cube-3d');
    if (cube) {
        // Add interactive rotation on hover
        cube.addEventListener('mouseenter', () => {
            cube.style.animationPlayState = 'paused';
            cube.style.transform += ' scale(1.2)';
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.style.animationPlayState = 'running';
            cube.style.transform = cube.style.transform.replace(' scale(1.2)', '');
        });
    }
    
    // Enhanced sphere animation
    const sphere = document.querySelector('.sphere-3d');
    if (sphere) {
        sphere.addEventListener('mouseenter', () => {
            sphere.style.animationPlayState = 'paused';
            sphere.style.boxShadow = '0 0 40px rgba(212, 165, 116, 0.8)';
        });
        
        sphere.addEventListener('mouseleave', () => {
            sphere.style.animationPlayState = 'running';
            sphere.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.3)';
        });
    }
    
    // Enhanced pyramid animation
    const pyramid = document.querySelector('.pyramid-3d');
    if (pyramid) {
        pyramid.addEventListener('mouseenter', () => {
            pyramid.style.animationPlayState = 'paused';
            pyramid.style.filter = 'drop-shadow(0 0 20px rgba(212, 165, 116, 0.6)) scale(1.1)';
        });
        
        pyramid.addEventListener('mouseleave', () => {
            pyramid.style.animationPlayState = 'running';
            pyramid.style.filter = 'drop-shadow(0 0 10px rgba(212, 165, 116, 0.3))';
        });
    }
}

// ===== TIMELINE ANIMATIONS =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const experienceCards = document.querySelectorAll('.experience-card');
    
    // Timeline scroll animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate timeline marker
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1)';
                    marker.style.opacity = '1';
                }
                
                // Animate timeline card
                const card = entry.target.querySelector('.timeline-card');
                if (card) {
                    card.style.transform = 'translateY(0)';
                    card.style.opacity = '1';
                }
                
                // Animate achievement tags
                const tags = entry.target.querySelectorAll('.achievement-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(0)';
                        tag.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Apply initial styles and observe timeline items
    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');
        const card = item.querySelector('.timeline-card');
        const tags = item.querySelectorAll('.achievement-tag');
        
        if (marker) {
            marker.style.transform = 'scale(0.5)';
            marker.style.opacity = '0';
            marker.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        if (card) {
            card.style.transform = 'translateY(50px)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        tags.forEach(tag => {
            tag.style.transform = 'translateY(20px)';
            tag.style.opacity = '0';
            tag.style.transition = 'all 0.4s ease';
        });
        
        timelineObserver.observe(item);
    });
    
    // Experience cards animations
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate company logo
                const logo = entry.target.querySelector('.company-logo');
                if (logo) {
                    logo.style.transform = 'scale(1) rotateY(0deg)';
                    logo.style.opacity = '1';
                }
                
                // Animate duties list
                const duties = entry.target.querySelectorAll('.experience-duties li');
                duties.forEach((duty, index) => {
                    setTimeout(() => {
                        duty.style.transform = 'translateX(0)';
                        duty.style.opacity = '1';
                    }, index * 150);
                });
                
                // Animate tech tags
                const techTags = entry.target.querySelectorAll('.tech-tag');
                techTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(0) scale(1)';
                        tag.style.opacity = '1';
                    }, (duties.length * 150) + (index * 50));
                });
            }
        });
    }, observerOptions);
    
    // Apply initial styles and observe experience cards
    experienceCards.forEach(card => {
        const logo = card.querySelector('.company-logo');
        const duties = card.querySelectorAll('.experience-duties li');
        const techTags = card.querySelectorAll('.tech-tag');
        
        if (logo) {
            logo.style.transform = 'scale(0.5) rotateY(180deg)';
            logo.style.opacity = '0';
            logo.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        duties.forEach(duty => {
            duty.style.transform = 'translateX(-30px)';
            duty.style.opacity = '0';
            duty.style.transition = 'all 0.6s ease';
        });
        
        techTags.forEach(tag => {
            tag.style.transform = 'translateY(20px) scale(0.8)';
            tag.style.opacity = '0';
            tag.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        experienceObserver.observe(card);
    });
}

// ===== ENHANCED BACKGROUND PARTICLES =====
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-system');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(212, 165, 116, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${15 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== ADVANCED SCROLL EFFECTS =====
function initAdvancedScrollEffects() {
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        // Clear timeout if it exists
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Add scrolling class to body
        document.body.classList.add('is-scrolling');
        
        // Remove scrolling class after scrolling stops
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 150);
        
        // Parallax effect for background elements
        const scrollTop = window.pageYOffset;
        const backgroundElements = document.querySelectorAll('.geometric-shape, .code-snippet, .cube-3d, .sphere-3d, .pyramid-3d');
        
        backgroundElements.forEach((element, index) => {
            const speed = 0.5 + (index % 3) * 0.2; // Varying speeds
            const yPos = -(scrollTop * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    }, { passive: true });
}

// ===== INITIALIZE NEW FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize new features after a delay to ensure DOM is ready
    setTimeout(() => {
        createParticleSystem();
        initAdvancedScrollEffects();
    }, 2000);
});

// ===== TEST ANIMATIONS FUNCTION =====
function testAnimations() {
    const animatedBg = document.querySelector('.animated-background');
    const geometricShapes = document.querySelectorAll('.geometric-shape');
    const codeSnippets = document.querySelectorAll('.code-snippet');
    const objects3D = document.querySelectorAll('.cube-3d, .sphere-3d, .pyramid-3d, .cube-3d-small, .sphere-3d-large, .diamond-3d, .prism-3d');
    const particles = document.querySelectorAll('.particle-dot, .particle-line, .particle-wave, .particle-spark');
    
    console.log('Background container:', animatedBg);
    console.log('Geometric shapes found:', geometricShapes.length);
    console.log('Code snippets found:', codeSnippets.length);
    console.log('3D objects found:', objects3D.length);
    console.log('Particles found:', particles.length);
    console.log('Section-specific code:', {
        about: document.querySelectorAll('.about-code').length,
        education: document.querySelectorAll('.education-code').length,
        experience: document.querySelectorAll('.experience-code').length,
        skills: document.querySelectorAll('.skills-code').length,
        portfolio: document.querySelectorAll('.portfolio-code').length,
        contact: document.querySelectorAll('.contact-code').length
    });
    
    // Make elements more visible for testing
    geometricShapes.forEach(shape => {
        shape.style.opacity = '0.8';
        shape.style.backgroundColor = '#D4A574';
        shape.style.border = '2px solid #8B4513';
    });
    
    codeSnippets.forEach(snippet => {
        snippet.style.opacity = '1';
        snippet.style.color = '#8B4513';
        snippet.style.backgroundColor = 'rgba(212, 165, 116, 0.3)';
        snippet.style.fontSize = '1rem';
        snippet.style.fontWeight = 'bold';
    });
    
    objects3D.forEach(obj => {
        obj.style.opacity = '1';
        obj.style.boxShadow = '0 0 30px rgba(212, 165, 116, 0.8)';
    });
    
    particles.forEach(particle => {
        particle.style.opacity = '1';
        particle.style.backgroundColor = '#D4A574';
        particle.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.8)';
    });
    
    alert('Animation test applied! Check if you can see moving elements in the background.');
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        initLoadingScreen,
        initMouseTrail,
        initNavigation,
        initScrollAnimations,
        animateCounters,
        handleFormSubmission
    };
}