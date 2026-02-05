document.addEventListener('DOMContentLoaded', () => {
 const toggle = document.querySelector('.nav__toggle');
 const menu = document.querySelector('.nav__list');


 if (!toggle || !menu) return;


 // Toggle menu open / close
 toggle.addEventListener('click', () => {
   menu.classList.toggle('nav__list--open');


   const expanded = toggle.getAttribute('aria-expanded') === 'true';
   toggle.setAttribute('aria-expanded', !expanded);
 });


 // Close menu when a link is clicked (Option 3)
 menu.addEventListener('click', (e) => {
   if (e.target.tagName === 'A') {
     menu.classList.remove('nav__list--open');
     toggle.setAttribute('aria-expanded', 'false');
   }
 });
});
