/* navigation dropdowns */

document.querySelectorAll(".menu-toggle").forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();
        e.stopPropagation();

        const parent = this.closest(".submenu-item, .nav-item");

        const expanded = this.getAttribute("aria-expanded") === "true";


        parent.classList.toggle(
            "is-open",
            !expanded
        );


        this.setAttribute(
            "aria-expanded",
            String(!expanded)
        );

    });

});


/* desktop dropdown hover */

const dropdownParents = document.querySelectorAll('.nav-item.has-children');

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


  if(window.innerWidth > 760){

    parent.addEventListener('mouseenter', openMenu);

    parent.addEventListener('mouseleave', closeMenu);


    parent.addEventListener('focusin', openMenu);

    parent.addEventListener('focusout', (event) => {

      if (!parent.contains(event.relatedTarget)) {
        closeMenu();
      }

    });


    if(menu){

      menu.addEventListener('mouseenter', openMenu);

      menu.addEventListener('mouseleave', closeMenu);

    }

  }

});


/* mobile navigation */

const mobileToggle = document.querySelector(".mobile-menu-toggle");
const siteNav = document.querySelector(".site-nav");


if (mobileToggle && siteNav) {

  mobileToggle.addEventListener("click", () => {

    const isOpen = siteNav.classList.toggle("open");

    mobileToggle.classList.toggle("open", isOpen);

    mobileToggle.setAttribute(
      "aria-expanded",
      isOpen
    );

    mobileToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });

}

/* contact form submission */
/* contact form */

const contactForm = document.querySelector('.contact-form');
const contactFormContent = document.querySelector('.contact-form-content');
const formSuccess = document.querySelector('.form-success');

if (contactForm && contactFormContent && formSuccess) {

  contactForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    const submitButton = contactForm.querySelector('[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {

      const formData = new FormData(contactForm);

      await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      contactFormContent.hidden = true;
      formSuccess.hidden = false;

    } catch (error) {

      console.error('Form submission error:', error);

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
      }

      alert(
        'There was a problem sending your message. Please try again.'
      );

    }

  });

}

/* recent projects slideshow */
const projectsSlideshow = document.querySelector('.projects-slideshow');

if (projectsSlideshow) {
  const track = projectsSlideshow.querySelector('.slideshow-track');
  const prevButton = projectsSlideshow.querySelector('.arrow-prev');
  const nextButton = projectsSlideshow.querySelector('.arrow-next');

  if (track && prevButton && nextButton) {
    const cards = Array.from(track.children);

    if (cards.length > 1) {
      let currentIndex = 0;

      const updatePosition = (withTransition = true) => {
        const card = cards[currentIndex];
        if (!card) return;

        const offset = card.offsetLeft;
        track.style.transition = withTransition ? 'transform 0.4s ease' : 'none';
        track.style.transform = `translateX(-${offset}px)`;
      };

      const updateControls = () => {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= cards.length - 1;
      };

      prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex -= 1;
          updatePosition(true);
          updateControls();
        }
      });

      nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
          currentIndex += 1;
          updatePosition(true);
          updateControls();
        }
      });

      window.addEventListener('resize', () => updatePosition(false));
      updateControls();
      updatePosition(false);
    }
  }
}

/* project filters */
document.querySelectorAll('.filter-bar').forEach((filterBar) => {
  const buttons = filterBar.querySelectorAll('.filter-btn');
  const projectsPage = filterBar.closest('.projects-page');

  if (!projectsPage) return;

  const grid = projectsPage.querySelector('.project-grid');
  const tiles = grid ? Array.from(grid.querySelectorAll('.project-tile')) : [];

  if (!tiles.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';
      const footer = document.querySelector('.site-footer');

      projectsPage.classList.add('is-filtering');
      footer?.classList.add('is-filtering');

      buttons.forEach((btn) => {
        btn.classList.toggle('active', btn === button);
      });

      tiles.forEach((tile) => {
        const matches = filter === 'all' || tile.dataset.category === filter;

        tile.classList.remove('is-visible', 'is-appearing');
        tile.classList.toggle('is-hidden', !matches);
        tile.classList.remove('is-removed');

        if (matches) {
          tile.style.display = '';
          tile.classList.add('is-appearing');

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              tile.classList.add('is-visible');
            });
          });
        } else {
          window.setTimeout(() => {
            if (tile.classList.contains('is-hidden')) {
              tile.classList.add('is-removed');
            }
          }, 280);
        }
      });

      window.setTimeout(() => {
        projectsPage.classList.remove('is-filtering');
        footer?.classList.remove('is-filtering');
      }, 220);
    });
  });
});

/* testimonials slideshow */
const testimonialsSlideshow = document.querySelector('.testimonials-slideshow');

if (testimonialsSlideshow) {
  const track = testimonialsSlideshow.querySelector('.slideshow-track');
  const breadcrumbs = testimonialsSlideshow.querySelector('.slideshow-breadcrumbs');
  const slides = track ? Array.from(track.children) : [];

  if (track && breadcrumbs && slides.length > 1) {
    let currentIndex = 0;
    let autoplayTimer = null;

    const updatePosition = () => {
      const slide = slides[currentIndex];
      if (!slide) return;

      const offset = slide.offsetLeft;
      track.style.transition = 'transform 0.4s ease';
      track.style.transform = `translateX(-${offset}px)`;

      breadcrumbs.querySelectorAll('.breadcrumb').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };

    const buildBreadcrumbs = () => {
      breadcrumbs.innerHTML = '';

      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'breadcrumb';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = index;
          updatePosition();
          restartAutoplay();
        });
        breadcrumbs.appendChild(dot);
      });

      updatePosition();
    };

    const restartAutoplay = () => {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
      }

      autoplayTimer = window.setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updatePosition();
      }, 5000);
    };

    buildBreadcrumbs();
    restartAutoplay();

    window.addEventListener('resize', updatePosition);
  }
}

/* faq accordion */
/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach((item) => {

  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer-wrapper');


  button.addEventListener('click', () => {

    const isOpen = item.classList.contains('active');


    if (isOpen) {

      // Close this FAQ
      answer.style.height = answer.scrollHeight + 'px';

      requestAnimationFrame(() => {
        answer.style.height = '0px';
      });

      item.classList.remove('active');

      button.setAttribute(
        'aria-expanded',
        'false'
      );


    } else {

      // Open this FAQ
      item.classList.add('active');

      button.setAttribute(
        'aria-expanded',
        'true'
      );

      answer.style.height = answer.scrollHeight + 'px';


      answer.addEventListener('transitionend', function handler() {

        if (item.classList.contains('active')) {
          answer.style.height = 'auto';
        }

        answer.removeEventListener(
          'transitionend',
          handler
        );

      });

    }

  });

});