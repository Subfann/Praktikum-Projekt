"use strict";

/**
 * add event on element
 */

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

var i = 0; // Start Point
var images = []; // Images Array
var images1 = []; // Images Array
var images2 = []; // Images Array
var time = 1000; // Time Between Switch

// Image List
images[0] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/1.png";
images[1] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/2.png";
images[2] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/3.png";
images[3] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/4.png";
images[4] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/5.png";
images[5] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/6.png";
images[6] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/7.png";
images[7] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/8.png";
images[8] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/9.png";
images[9] = "./Assets/Fotos/Service Social Media/Fotos/Section 1/10.png";

images1[0] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/1.png";
images1[1] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/2.png";
images1[2] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/3.png";
images1[3] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/4.png";
images1[4] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/5.png";
images1[5] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/6.png";
images1[6] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/7.png";
images1[7] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/8.png";
images1[8] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/9.png";
images1[9] = "./Assets/Fotos/Service Social Media/Fotos/Section 2/10.png";

images2[0] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/1.png";
images2[1] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/2.png";
images2[2] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/3.png";
images2[3] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/4.png";
images2[4] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/5.png";
images2[5] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/6.png";
images2[6] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/7.png";
images2[7] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/8.png";
images2[8] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/9.png";
images2[9] = "./Assets/Fotos/Service Social Media/Fotos/Section 3/10.png";

// Change Image
function changeImg() {
  document.slide.src = images[i];
  document.slide1.src = images1[i];
  document.slide2.src = images2[i];
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
window.onload = changeImg;

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

/*==================== SWIPER ANGEBOTE ====================*/
let swiper = new Swiper(".slide-content", {
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
