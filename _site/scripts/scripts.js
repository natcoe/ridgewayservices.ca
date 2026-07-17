const heroSlides = document.querySelectorAll('.hero-slide');
const heroBreadcrumbs = document.querySelectorAll('.hero-breadcrumb');
let heroIndex = 0;
let heroTimer;

function showHeroSlide(index) {
  heroIndex = index;

  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === heroIndex);
  });

  heroBreadcrumbs.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === heroIndex);
  });
}

function startHeroRotation() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    const nextIndex = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
  }, 5000);
}

heroBreadcrumbs.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showHeroSlide(index);
    startHeroRotation();
  });
});

startHeroRotation();
showHeroSlide(heroIndex);

const dropdownParents = document.querySelectorAll('.nav-item.has-dropdown');

dropdownParents.forEach((parent) => {
  const menu = parent.querySelector(':scope > .dropdown-menu');
  let closeTimer;

  const openMenu = () => {
    clearTimeout(closeTimer);
    parent.classList.add('is-open');
  };

  const closeMenu = () => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      parent.classList.remove('is-open');
    }, 180);
  };

  parent.addEventListener('mouseenter', openMenu);
  parent.addEventListener('mouseleave', closeMenu);
  parent.addEventListener('focusin', openMenu);
  parent.addEventListener('focusout', (event) => {
    if (!parent.contains(event.relatedTarget)) {
      closeMenu();
    }
  });

  if (menu) {
    menu.addEventListener('mouseenter', openMenu);
    menu.addEventListener('mouseleave', closeMenu);
  }
});
