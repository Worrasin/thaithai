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

  // Function to handle image loading errors
  window.handleImageError = function (img) {
    img.onerror = null; // Prevent infinite loop if "no-image.jpg" is also not found
    img.src = "./assets/img/menu/no-image.jpg"; // Replace with the path to your "no-image.jpg" file
  };

  document.addEventListener("DOMContentLoaded", function () {
    fetch("../assets/JSON/menu-data.json")
      .then((response) => response.json())
      .then((data) => {
        const menuContainer = document.querySelector(".menu-container");

        data.items.forEach((item) => {
          const menuItem = document.createElement("div");
          menuItem.classList.add(
            "col-lg-6",
            "menu-item",
            `filter-${item.category}`
          );

          menuItem.innerHTML = `
            <a href="${item.image}" target="_blank" data-glightbox="menu" data-title="${item.name}">
              <img src="${item.image}" onerror="handleImageError(this)" class="menu-img" alt="${item.name}" loading="lazy" />
            </a>
            <div class="menu-content">
              <p>${item.name}</p>
            </div>
            <div class="menu-descriptions">${item.descriptions}</div>
          `;

          menuContainer.appendChild(menuItem);
        });
      })
      .catch((error) => console.error("Error loading menu data:", error));
  });

  // description menu
  const menuDescription = document.querySelector(".menu-description");
  menuDescription.innerHTML = `
              <hr>
              <p>Meat selection : Vege **/ Chicken / Beef / Pork / BBQ Pork / Duck / Seafood * (Available for Curries, From the Wok, and Stir fried noodle only)</p>
              <p>* contain imported seafood</p>
              <p>** for vegetarian meals</p>
          `;

  // order menu

  const menuOrder = document.querySelector(".menu-order");
  menuOrder.innerHTML = `
              <h5>For additional information or to place a food order via phone, please feel free to contact us.</h5>
              <p>
              <a href="tel:+6189279263" target="_blank">+61 8927 9623</a>
              <span> , </span>
                <a href="tel:+6189454388" target="_blank">+61 8945 4388</a>
              </p>
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
