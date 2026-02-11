document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // MOBILE MENU
  // =========================
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');

      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });

    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // =========================
  // SCROLLED NAVBAR (DESKTOP ONLY)
  // =========================
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');

  function handleScrollNav() {
    if (!nav || !hero) return;

    // Only run on desktop
    if (window.innerWidth < 768) {
      nav.classList.remove('nav--scrolled');
      return;
    }

    const heroHeight = hero.offsetHeight;

    if (window.scrollY > heroHeight - 100) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleScrollNav);
  window.addEventListener('resize', handleScrollNav);

  handleScrollNav(); // Run once on load


  // =========================
  // IMAGE GALLERY / SLIDER
  // =========================
  const slides = document.querySelectorAll('.gallery__slide');
  const prevBtn = document.querySelector('.gallery__arrow--prev');
  const nextBtn = document.querySelector('.gallery__arrow--next');
  const dotsContainer = document.querySelector('.gallery__dots');

  if (slides.length && dotsContainer) {

    let currentIndex = 0;
    let autoScroll;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('gallery__dot');

      dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide();
        resetAutoScroll();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.gallery__dot');

    function showSlide() {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }

    function startAutoScroll() {
      autoScroll = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide();
      }, 3000);
    }

    function resetAutoScroll() {
      clearInterval(autoScroll);
      startAutoScroll();
    }

    nextBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide();
      resetAutoScroll();
    });

    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide();
      resetAutoScroll();
    });

    showSlide();
    startAutoScroll();
  }

}); // END DOMContentLoaded
