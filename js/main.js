document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     NAVIGATION MENU
  ========================== */

  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__list');

  if (toggle && menu) {
    // Toggle menu open / close
    toggle.addEventListener('click', () => {
      menu.classList.toggle('nav__list--open');

      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when a link is clicked
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        menu.classList.remove('nav__list--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* =========================
     IMAGE GALLERY / SLIDER
  ========================== */

  const slides = document.querySelectorAll('.gallery__slide');
  const prevBtn = document.querySelector('.gallery__arrow--prev');
  const nextBtn = document.querySelector('.gallery__arrow--next');
  const dotsContainer = document.querySelector('.gallery__dots');

  // Only run gallery code if slides exist
  if (slides.length > 0 && dotsContainer) {

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoScroll;

    /* ---- Create dots automatically ---- */
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('gallery__dot');

      dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
        resetAutoScroll();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.gallery__dot');

    /* ---- Show slide + update dots ---- */
    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }

    /* ---- Auto scroll ---- */
    function startAutoScroll() {
      autoScroll = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
      }, 3000);
    }

    function resetAutoScroll() {
      clearInterval(autoScroll);
      startAutoScroll();
    }

    /* ---- Arrow navigation ---- */
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
        resetAutoScroll();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
        resetAutoScroll();
      });
    }

    /* ---- Init gallery ---- */
    showSlide(currentIndex);
    startAutoScroll();
  }

});
