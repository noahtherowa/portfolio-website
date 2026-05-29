// ==========================================
// MOBILE NAVIGATION TOGGLE
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // ==========================================
    // ACTIVE NAV LINK INDICATOR
    // ==========================================

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveNavLink();

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // FADE IN ON SCROLL ANIMATION
    // ==========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards and contact cards for fade-in effect
    document.querySelectorAll('.project-card, .contact-card, .contact-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ==========================================
    // STATS COUNTER ANIMATION
    // ========================================== 

    let counterStarted = false;

    function animateCounters() {
        const statItems = document.querySelectorAll('.stat-item h3');
        
        statItems.forEach(item => {
            const finalValue = item.textContent.replace(/\D/g, '') || 0;
            const finalText = item.textContent;
            let currentValue = 0;
            const increment = Math.ceil(finalValue / 30);

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    item.textContent = finalText;
                    clearInterval(counter);
                } else {
                    item.textContent = currentValue + (finalText.match(/[^\d]/g) || []).join('');
                }
            }, 30);
        });
    }

    // Observe stats section for animation trigger
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterStarted) {
                    counterStarted = true;
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statsObserver.observe(statsSection);
    }

    // ==========================================
    // FORM HANDLING (if needed in future)
    // ==========================================

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic here
            console.log('Form submitted');
        });
    }

    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================

    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // ==========================================
    // BACK TO TOP FUNCTIONALITY
    // ==========================================

    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'backToTop';
    backToTopButton.innerHTML = '↑';
    backToTopButton.style.cssText = `
        display: none;
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 0.75rem 0.9rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 99;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-md);
    `;

    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopButton.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });

    backToTopButton.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================

    console.log('%cWelcome to Noah Thérowa\'s Portfolio!', 'font-size: 16px; font-weight: bold; color: #667eea;');
    console.log('%cCheck out the source code on GitHub: https://github.com/noahtherowa', 'font-size: 12px; color: #764ba2;');
});
