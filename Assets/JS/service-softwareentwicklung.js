"use strict";
const webBtn = document.getElementById("webBtn");
const desktopBtn = document.getElementById("desktopBtn");
const mobileBtn = document.getElementById("mobileBtn");
const apiBtn = document.getElementById("apiBtn");

// Software container Element->var
const webWrapper = document.getElementById("web-entwicklung");

const desktopWrapper = document.getElementById("desktop-apps");

const mobileWrapper = document.getElementById("mobile-app");

const apiWrapper = document.getElementById("api");

// Functions

function filterWeb() {
  webWrapper.classList.remove("hide");
  mobileWrapper.classList.add("hide");
  desktopWrapper.classList.add("hide");
  apiWrapper.classList.add("hide");
}
function filterMobile() {
  mobileWrapper.classList.remove("hide");
  webWrapper.classList.add("hide");
  desktopWrapper.classList.add("hide");
  apiWrapper.classList.add("hide");
}
function filterDesktop() {
  desktopWrapper.classList.remove("hide");
  webWrapper.classList.add("hide");
  mobileWrapper.classList.add("hide");
  apiWrapper.classList.add("hide");
}
function filterApi() {
  apiWrapper.classList.remove("hide");
  webWrapper.classList.add("hide");
  mobileWrapper.classList.add("hide");
  desktopWrapper.classList.add("hide");
}

// Clicks (auslösen der functionen)
webBtn.addEventListener("click", filterWeb);
desktopBtn.addEventListener("click", filterDesktop);
mobileBtn.addEventListener("click", filterMobile);
apiBtn.addEventListener("click", filterApi);

window.onload = function () {
  mobileWrapper.classList.add("hide");
  desktopWrapper.classList.add("hide");
  apiWrapper.classList.add("hide");
  changeImg();
};

/**
 * add event on element
 */
const sidebar = document.querySelector(".sidebar");
const navItems = document.querySelectorAll("nav .nav-item");
const toggle = document.querySelector(".sidebar .toggle");

toggle.addEventListener("click", () => {
  if (sidebar.className === "sidebar") sidebar.classList.add("open");
  else sidebar.classList.remove("open");
});

navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((navItem) => {
      navItem.classList.remove("active");
    });

    navItem.classList.add("active");
  });
});

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
};

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * img Slider about
 */

/**
 * Darkmode
 */

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected color (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

//current theme the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// validate if user chose a color before
if (selectedTheme) {
  // looking if dark activated or deactivated
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually per button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // save theme and selected icon
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

var splide = new Splide(".splide", {
  type: "loop",
  perPage: 1,
  autoplay: true,
  pauseOnHover: false,
  pauseOnFocus: false,
});

splide.mount();

/**
 * add event on element
 */

const addEventOnElem2 = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * accordion toggle
 */

const accordionAction = document.querySelectorAll("[data-accordion-action]");

const toggleAccordion = function () {
  this.classList.toggle("active");
};

addEventOnElem2(accordionAction, "click", toggleAccordion);

let swiper2 = new Swiper(".slide-content", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  autoplay: {
    delay: 6000,
  },
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 32,
  coverflowEffect: {
    rotate: 0,
  },
});

//   Slider
var i = 0; // Start Point
var images = []; // Images Array
var images1 = []; // Images Array
var images2 = []; // Images Array
var images3 = []; // Images Array
var time = 1000; // Time Between Switch

// Image List
images[0] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Web/web-section (1).png";
images[1] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Web/web-section (2).png";
images[2] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Web/web-section (3).png";
images[3] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Web/web-section (4).png";

images1[0] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Desk/desk-section (1).png";
images1[1] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Desk/desk-section (2).png";
images1[2] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Desk/desk-section (3).png";
images1[3] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Desk/desk-section (4).png";

images2[0] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Mobile/mobile-section (1).png";
images2[1] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Mobile/mobile-section (2).png";
images2[2] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Mobile/mobile-section (3).png";
images2[3] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Mobile/mobile-section (4).png";

images3[0] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Api/api-section (1).png";
images3[1] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Api/api-section (2).png";
images3[2] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Api/api-section (3).png";
images3[3] =
  "./Assets/Fotos/Service Softwareentwicklung/Fotos/Section 1 Api/api-section (4).png";

// Change Image
function changeImg() {
  document.slide.src = images[i];
  document.slide2.src = images1[i];
  document.slide3.src = images2[i];
  document.slide4.src = images3[i];
  // Check If Index Is Under Max
  if (i < images.length - 1) {
    // Add 1 to Index
    i++;
  } else {
    // Reset Back To O
    i = 0;
  }

  // Run function every x seconds
  setTimeout("changeImg()", time);
}

// Run function when page loads
