// modern.js — легкі анімації для шкільного сайту

document.addEventListener('DOMContentLoaded', () => {

  // 1. Плавна поява секцій при скролі (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

  // 2. Анімація карток при наведенні (трохи сильніший ефект)
  const cards = document.querySelectorAll('.news-item, .bg-white, .pupil-block, .contact-block');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // 3. Плавний скрол до секцій (якщо додаси посилання з #)
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

  // 4. Анімація hero-тексту при завантаженні
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
    heroText.style.opacity = '0';
    setTimeout(() => {
      heroText.style.transition = 'opacity 1.2s ease';
      heroText.style.opacity = '1';
    }, 300);
  }

  // 5. Підсвітка активної сторінки в меню
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage || 
        (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active-link');
    }
  });

});

// Додатковий клас для активного посилання
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
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #ffd500;
  }
`;
document.head.appendChild(style);
