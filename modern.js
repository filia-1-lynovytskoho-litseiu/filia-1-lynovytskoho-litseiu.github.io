// =============== MODERN.JS для Линовицького ліцею ===============

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hamburger menu (мобільне)
  const nav = document.querySelector('.main-nav') || document.querySelector('nav');
  if (nav) {
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger md:hidden fixed top-4 right-4 z-50 p-3 bg-[#005bbb] text-white rounded-xl shadow-lg';
    hamburger.innerHTML = '☰';
    document.body.appendChild(hamburger);

    let open = false;
    hamburger.addEventListener('click', () => {
      open = !open;
      nav.style.display = open ? 'flex' : 'none';
      hamburger.innerHTML = open ? '✕' : '☰';
    });

    // закривати при кліку на посилання
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        open = false;
        nav.style.display = 'none';
        hamburger.innerHTML = '☰';
      });
    });
  }

  // 2. Анімація при скролі (fade-in + slide-up)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.news-item, .pupil-block, .contact-block, .news-grid > div, section').forEach(el => {
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // 3. Dark mode + збереження вибору
  const toggleDark = document.createElement('button');
  toggleDark.className = 'fixed bottom-6 left-6 z-50 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700';
  toggleDark.innerHTML = '🌙';
  document.body.appendChild(toggleDark);

  const isDark = localStorage.getItem('dark') === 'true';
  if (isDark) document.documentElement.classList.add('dark');

  toggleDark.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const nowDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('dark', nowDark);
    toggleDark.innerHTML = nowDark ? '☀️' : '🌙';
  });

  // 4. Smooth scroll + Back to top
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const backToTop = document.createElement('button');
  backToTop.className = 'fixed bottom-6 right-6 z-50 p-4 bg-[#005bbb] text-white rounded-2xl shadow-xl opacity-0 transition-all duration-300 hover:scale-110';
  backToTop.innerHTML = '↑';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 5. Покращена галерея (кнопки + snap)
  const galleries = document.querySelectorAll('.gallery-scroll, .gallery');
  galleries.forEach(gallery => {
    gallery.style.scrollSnapType = 'x mandatory';
    gallery.style.scrollBehavior = 'smooth';

    const prev = document.createElement('button');
    const next = document.createElement('button');
    prev.className = next.className = 'absolute top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 text-[#005bbb] w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 text-2xl';
    prev.innerHTML = '‹';
    next.innerHTML = '›';
    prev.style.left = '10px';
    next.style.right = '10px';

    gallery.parentElement.style.position = 'relative';
    gallery.parentElement.append(prev, next);

    prev.addEventListener('click', () => gallery.scrollBy({ left: -300, behavior: 'smooth' }));
    next.addEventListener('click', () => gallery.scrollBy({ left: 300, behavior: 'smooth' }));
  });

  // 6. Lazy loading для всіх зображень (додатковий захист)
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });

  console.log('✅ Modern design activated for Линовицький ліцей – Філія №1');
});
