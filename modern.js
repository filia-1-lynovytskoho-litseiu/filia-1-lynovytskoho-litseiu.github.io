// modern.js — покращені анімації для сайту Філії №1

document.addEventListener('DOMContentLoaded', () => {

    // === 1. Плавна поява секцій при скролі ===
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        observer.observe(el);
    });

    // === 2. Покращена анімація карток при наведенні ===
    const cards = document.querySelectorAll('.bg-white, .rounded-3xl, article, .news-item');

    cards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.03)';
            card.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });

    // === 3. Анімація hero-тексту ===
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroText.style.transition = 'all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 400);
    }

    // === 4. Підсвітка активної сторінки в меню ===
    function highlightActiveLink() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('nav a');

        links.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Для головної сторінки
            if (currentPath === '/' || currentPath.endsWith('index.html')) {
                if (linkHref === 'index.html' || linkHref === './' || linkHref === '/') {
                    link.classList.add('active-link');
                }
            } 
            // Для інших сторінок
            else if (currentPath.includes(linkHref) || 
                     (linkHref.includes('.html') && currentPath.endsWith(linkHref))) {
                link.classList.add('active-link');
            }
        });
    }

    highlightActiveLink();

    // === 5. Плавний скрол для якірних посилань ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === 6. Додатковий ефект для галереї (легке збільшення при наведенні) ===
    const galleryImages = document.querySelectorAll('.gallery-scroll img, .flex.gap-6 img');
    galleryImages.forEach(img => {
        img.style.transition = 'transform 0.4s ease';
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.08)';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

});

// === Стилі для активного посилання ===
const style = document.createElement('style');
style.innerHTML = `
    .active-link {
        color: #005bbb !important;
        font-weight: 600;
        position: relative;
    }
    .active-link:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(to right, #ffd500, #ffaa00);
        border-radius: 3px;
    }

    /* Додаткове покращення для мобільних */
    @media (max-width: 768px) {
        .fade-in {
            transition-duration: 0.6s !important;
        }
    }
`;
document.head.appendChild(style);
