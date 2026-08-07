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