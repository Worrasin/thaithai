/**
 * Template Name: Restaurantly - v3.1.0
 * Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  let selectTopbar = select("#topbar");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
        if (selectTopbar) {
          selectTopbar.classList.add("topbar-scrolled");
        }
      } else {
        selectHeader.classList.remove("header-scrolled");
        if (selectTopbar) {
          selectTopbar.classList.remove("topbar-scrolled");
        }
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  // description menu
  const menuDescription = document.querySelector(".menu-description");
  menuDescription.innerHTML = `
              <hr>
              <p>Meat selection (Available for Curries, From the Wok, and Stir Fried Noodle only) : Vege **/ Chicken / Beef / Pork / BBQ Pork / Duck / Seafood * </p>
              <p class="description-marked">* contain imported seafood</p>
              <p class="description-marked">** for vegetarian meals</p>
          `;

  // order menu

  const menuOrder = document.querySelector(".menu-order");
  menuOrder.innerHTML = `
              <div class="download_menu">
                <a href="assets/img/menu/menu.pdf" download="Thai_Thai_Menu" class="book-a-table-btn"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
  <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/>
</svg>  Download Full Menu</a>
              </div>
              
          `;
  /**
   * Menu isotope and filter
   */
  window.addEventListener("load", () => {
    let menuContainer = select(".menu-container");

    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: ".menu-item",
        layoutMode: "fitRows",
      });

      let menuFilters = select("#menu-flters li", true);

      // Set a default filter on page load (e.g., "starter")
      let defaultFilter = ".starters"; // Replace with the appropriate class for the "starter" filter

      // Apply the default filter to the Isotope arrangement
      menuIsotope.arrange({
        filter: defaultFilter,
      });

      // Add initial "filter-active" class to the default filter
      menuFilters.forEach(function (el) {
        if (el.getAttribute("data-filter") === defaultFilter) {
          el.classList.add("filter-active");
        }
      });

      on(
        "click",
        "#menu-flters li",
        function (e) {
          e.preventDefault();
          menuFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");
          menuIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          menuIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Events slider
   */
  new Swiper(".events-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Initiate gallery lightbox
   */
  const galleryLightbox = GLightbox({
    selector: ".gallery-lightbox",
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();
// script.js

document.addEventListener("DOMContentLoaded", function () {
  var myCarousel = document.getElementById("carouselExampleCaptions");
  var carousel = new bootstrap.Carousel(myCarousel);

  myCarousel.addEventListener("swipe.bs.carousel", function (event) {
    if (event.direction === "right") {
      carousel.next();
    } else if (event.direction === "left") {
      carousel.prev();
    }
  });
});

        document.addEventListener('DOMContentLoaded', () => {
            // --- FORM AND INPUT ELEMENTS ---
            const reservationForm = document.querySelector('.php-email-form');
            const dateInput = document.getElementById('date');
            const timeInput = document.getElementById('time');
            const submitButton = reservationForm.querySelector('button[type="submit"]');

            // --- ERROR MESSAGE ELEMENTS ---
            const dateError = document.getElementById('date-error');
            const timeError = document.getElementById('time-error');

            // --- RESTAURANT HOURS CONFIGURATION ---
            // 24-hour format
            const openingHours = {
                weekdaysLunch: { open: '11:00', close: '14:00' }, // Mon-Fri: 11 AM to 10 PM
                weekdaysDinner: { open: '17:00', close: '21:00' }, // Mon-Fri: 11 AM to 10 PM
                weekends: { open: '17:00', close: '21:00' }, // Sat-Sun: 10 AM to 11 PM
            };

            // --- DATE VALIDATION ---
            function setMinDate() {
                // Get today's date based on the user's local time.
                const today = new Date();
                
                // Format the date as YYYY-MM-DD for the input's 'min' attribute
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const minDate = `${year}-${month}-${day}`;
                
                dateInput.setAttribute('min', minDate);
            }

            // --- TIME & DATE COMBINED VALIDATION ---
            function validateDateTime() {
                const selectedDateStr = dateInput.value;
                const selectedTime = timeInput.value;

                if (!selectedDateStr || !selectedTime) {
                    timeError.style.display = 'none';
                    submitButton.disabled = false;
                    return true; // Don't validate if inputs are empty
                }

                // Check 1: Is the selected date today?
                const today = new Date();
                const selectedDate = new Date(`${selectedDateStr}T00:00:00`);
                const isToday = today.getFullYear() === selectedDate.getFullYear() &&
                                today.getMonth() === selectedDate.getMonth() &&
                                today.getDate() === selectedDate.getDate();

                // If it's today, check if the selected time is in the past
                if (isToday) {
                    const now = new Date();
                    const currentHours = String(now.getHours()).padStart(2, '0');
                    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
                    const currentTime = `${currentHours}:${currentMinutes}`;
                    if (selectedTime < currentTime) {
                        timeError.textContent = "Please select a time in the future.";
                        timeError.style.display = 'block';
                        submitButton.disabled = true;
                        return false;
                    }
                }

                // Check 2: Check against opening hours
                const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
                // const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const isWeekend = dayOfWeek === 0;
                const isTuesday = dayOfWeek === 2;
                const hours = isWeekend ? openingHours.weekends : openingHours.weekdaysLunch && openingHours.weekdaysDinner;

                const isOpen = selectedTime >= hours.open && selectedTime <= hours.close;

                if (isOpen && !isTuesday) {
                    timeError.style.display = 'none';
                    submitButton.disabled = false;
                } else {
                    timeError.textContent = "Sorry, we are closed at that time.";
                    timeError.style.display = 'block';
                    submitButton.disabled = true;
                }
                return isOpen;
            }
            
            // --- FORM SUBMISSION HANDLING ---
            reservationForm.addEventListener('submit', function(event) {
                // Re-validate on submit just in case
                const isDateValid = dateInput.checkValidity(); // Checks the 'min' attribute
                const isDateTimeValid = validateDateTime();
                
                if (!isDateValid || !isDateTimeValid) {
                    event.preventDefault(); // Stop form submission
                    if (!isDateValid) {
                        dateError.style.display = 'block';
                    }
                }
            });
            
            // --- EVENT LISTENERS ---
            // Set the minimum date when the page loads
            setMinDate();
            
            // Add listeners to validate as the user changes inputs
            dateInput.addEventListener('input', () => {
                // Hide date error on new input
                if (dateInput.checkValidity()) {
                    dateError.style.display = 'none';
                }
                validateDateTime(); // Re-validate time if the date changes
            });
            timeInput.addEventListener('input', validateDateTime);
        });
