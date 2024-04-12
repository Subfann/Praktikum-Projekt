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

// Buttons Element->var

const softwareButton = document.getElementById("software-btn");
const videoButton = document.getElementById("video-btn");
const smButton = document.getElementById("sm-btn");
const adminButton = document.getElementById("admin-btn");

const allButton = document.getElementById("all-btn");

// Software container Element->var
const software1Wrapper = document.getElementById("preise-wrapper-software1");
/*       const software2Wrapper = document.getElementById(
          "preise-wrapper-software2"
        ); */
const software3Wrapper = document.getElementById("preise-wrapper-software3");

// Videografie container Element->var
const video1Wrapper = document.getElementById("preise-wrapper-video1");
const video2Wrapper = document.getElementById("preise-wrapper-video2");
const video3Wrapper = document.getElementById("preise-wrapper-video3");

// Social Media container Element->var
const sm1Wrapper = document.getElementById("preise-wrapper-sm1");
const sm2Wrapper = document.getElementById("preise-wrapper-sm2");
const sm3Wrapper = document.getElementById("preise-wrapper-sm3");

// IT-Administration container Element->var
const admin1Wrapper = document.getElementById("preise-wrapper-admin1");
const admin2Wrapper = document.getElementById("preise-wrapper-admin2");
const admin3Wrapper = document.getElementById("preise-wrapper-admin3");

// Clicks (auslösen der functionen)
softwareButton.addEventListener("click", filterSoftware);
videoButton.addEventListener("click", filterVideo);
smButton.addEventListener("click", filterSm);
adminButton.addEventListener("click", filterAdmin);

allButton.addEventListener("click", showAll);

// Functions

function filterSoftware() {
  // zu filtern
  software1Wrapper.classList.remove("hide");
  /*         software2Wrapper.classList.remove("hide"); */
  software3Wrapper.classList.remove("hide");

  softwareButton.classList.add("color-this");

  // versteckt
  video1Wrapper.classList.add("hide");
  video2Wrapper.classList.add("hide");
  video3Wrapper.classList.add("hide");

  videoButton.classList.remove("color-this");

  sm1Wrapper.classList.add("hide");
  sm2Wrapper.classList.add("hide");
  sm3Wrapper.classList.add("hide");

  smButton.classList.remove("color-this");

  admin1Wrapper.classList.add("hide");
  admin2Wrapper.classList.add("hide");
  admin3Wrapper.classList.add("hide");

  adminButton.classList.remove("color-this");

  allButton.classList.remove("color-this");
}

function filterVideo() {
  // zu filtern
  video1Wrapper.classList.remove("hide");
  video2Wrapper.classList.remove("hide");
  video3Wrapper.classList.remove("hide");

  videoButton.classList.add("color-this");

  // versteckt
  software1Wrapper.classList.add("hide");
  /*      software2Wrapper.classList.add("hide"); */
  software3Wrapper.classList.add("hide");

  softwareButton.classList.remove("color-this");

  sm1Wrapper.classList.add("hide");
  sm2Wrapper.classList.add("hide");
  sm3Wrapper.classList.add("hide");

  smButton.classList.remove("color-this");

  admin1Wrapper.classList.add("hide");
  admin2Wrapper.classList.add("hide");
  admin3Wrapper.classList.add("hide");

  adminButton.classList.remove("color-this");

  allButton.classList.remove("color-this");
}

function filterSm() {
  // zu filtern
  sm1Wrapper.classList.remove("hide");
  sm2Wrapper.classList.remove("hide");
  sm3Wrapper.classList.remove("hide");

  smButton.classList.add("color-this");

  //versteckt
  software1Wrapper.classList.add("hide");
  /*       software2Wrapper.classList.add("hide"); */
  software3Wrapper.classList.add("hide");

  softwareButton.classList.remove("color-this");

  video1Wrapper.classList.add("hide");
  video2Wrapper.classList.add("hide");
  video3Wrapper.classList.add("hide");

  videoButton.classList.remove("color-this");

  admin1Wrapper.classList.add("hide");
  admin2Wrapper.classList.add("hide");
  admin3Wrapper.classList.add("hide");

  adminButton.classList.remove("color-this");

  allButton.classList.remove("color-this");
}

function filterAdmin() {
  //zu filtern
  admin1Wrapper.classList.remove("hide");
  admin2Wrapper.classList.remove("hide");
  admin3Wrapper.classList.remove("hide");

  adminButton.classList.add("color-this");

  //versteckt
  software1Wrapper.classList.add("hide");
  /*         software2Wrapper.classList.add("hide"); */
  software3Wrapper.classList.add("hide");

  softwareButton.classList.remove("color-this");

  video1Wrapper.classList.add("hide");
  video2Wrapper.classList.add("hide");
  video3Wrapper.classList.add("hide");

  videoButton.classList.remove("color-this");

  sm1Wrapper.classList.add("hide");
  sm2Wrapper.classList.add("hide");
  sm3Wrapper.classList.add("hide");

  smButton.classList.remove("color-this");

  allButton.classList.remove("color-this");
}

function showAll() {
  allButton.classList.add("color-this");

  software1Wrapper.classList.remove("hide");
  /*         software2Wrapper.classList.remove("hide"); */
  software3Wrapper.classList.remove("hide");

  softwareButton.classList.remove("color-this");

  admin1Wrapper.classList.remove("hide");
  admin2Wrapper.classList.remove("hide");
  admin3Wrapper.classList.remove("hide");

  adminButton.classList.remove("color-this");

  video1Wrapper.classList.remove("hide");
  video2Wrapper.classList.remove("hide");
  video3Wrapper.classList.remove("hide");

  videoButton.classList.remove("color-this");

  sm1Wrapper.classList.remove("hide");
  sm2Wrapper.classList.remove("hide");
  sm3Wrapper.classList.remove("hide");

  smButton.classList.remove("color-this");
}
