// ==========================================
// MOBILE NAVIGATION
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');
    const navLinks  = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', function (e) {
        if (!navMenu || !hamburger) return;
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // ESC closes menu
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });

    // ==========================================
    // ACTIVE NAV LINK
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ==========================================
    // SCROLL REVEAL
    // ==========================================
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.07) + 's';
        revealObserver.observe(el);
    });

    // ==========================================
    // STATS COUNTER
    // ==========================================
    let counterStarted = false;

    function animateCounters() {
        document.querySelectorAll('.stat-item h3').forEach(item => {
            const finalText = item.textContent;
            const finalValue = parseInt(finalText.replace(/\D/g, ''), 10) || 0;
            if (!finalValue) return;
            let current = 0;
            const increment = Math.ceil(finalValue / 28);
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    item.textContent = finalText;
                    clearInterval(timer);
                } else {
                    item.textContent = current + (finalText.match(/[^\d]/g) || []).join('');
                }
            }, 35);
        });
    }

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterStarted) {
                    counterStarted = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 }).observe(statsSection);
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // BACK TO TOP
    // ==========================================
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    Object.assign(btn.style, {
        display: 'none',
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '40px',
        height: '40px',
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        fontSize: '1.1rem',
        cursor: 'pointer',
        zIndex: '99',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        fontFamily: 'var(--font-body)',
    });
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 400 ? 'block' : 'none';
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btn.addEventListener('mouseover', () => btn.style.transform = 'scale(1.1)');
    btn.addEventListener('mouseout',  () => btn.style.transform = 'scale(1)');
});
