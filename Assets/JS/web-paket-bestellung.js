"use strict";


// NAV TOGGLE MOBILE 

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



// PAKETFILTER TOBIAS

const paketSButton = document.getElementById("paket-s-btn");
const paketLButton = document.getElementById("paket-l-btn");
const paketMButton = document.getElementById("paket-m-btn");

// Software container Element->var
const paketLWrapper = document.getElementById("paket-l");

const paketMWrapper = document.getElementById("paket-m");

const paketSWrapper = document.getElementById("paket-s");

const betreffField = document.querySelector(
  '.contact-form textarea[name="Betreff"]'
);

// Clicks (auslösen der functionen)
console.log(paketSButton);
paketSButton.addEventListener("click", filterPaketS);
paketLButton.addEventListener("click", filterPaketL);
paketMButton.addEventListener("click", filterPaketM);

// Functions

function filterPaketS() {
  paketSWrapper.classList.remove("hide");
  paketSButton.classList.add("color-this");

  // versteckt
  paketLWrapper.classList.add("hide");
  paketMWrapper.classList.add("hide");

  paketLButton.classList.remove("color-this");

  paketMButton.classList.remove("color-this");

  betreffField.innerText = "Bestellung von Paket S";
}

function filterPaketL() {
  paketLWrapper.classList.remove("hide");
  paketLButton.classList.add("color-this");

  // versteckt
  paketSWrapper.classList.add("hide");
  paketMWrapper.classList.add("hide");

  paketSButton.classList.remove("color-this");
  paketMButton.classList.remove("color-this");

  betreffField.innerText = "Bestellung von Paket L";
}

function filterPaketM() {
  paketMWrapper.classList.remove("hide");
  paketMButton.classList.add("color-this");

  // versteckt
  paketLWrapper.classList.add("hide");
  paketSWrapper.classList.add("hide");

  paketLButton.classList.remove("color-this");

  paketSButton.classList.remove("color-this");

  betreffField.innerText = "Bestellung von Paket M";
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const paket = urlParams.get("paket");

if (paket == "s") {
  filterPaketS();
} else if (paket == "m") {
  filterPaketM();
} else {
  filterPaketL();
}

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

// SUBMIT DES KONTAKTFORMULARS: DIENT DAZU, UM DIE DANKE-SEITE WEITERZULEITEN
const contactForm = document.querySelector(".contact-form");
const statusElement = document.querySelector(".contact-end .text");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  document.querySelector("#Paket .container").classList.add("hide");

  window.location = "#Paket";

  const endeContainer = document.querySelector(".contact-end");
  endeContainer.classList.remove("hide");

  const statusElement = endeContainer.querySelector(".contact-end .text");

  const data = new FormData(event.target);

  fetch(event.target.action, {
    method: contactForm.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then(function (response) {
      if (response.status == 200) {
        statusElement.innerHTML =
          "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt";
        statusElement.style.color = "green";

        document.querySelector(".contact-end .icon").classList.remove("hide");
      } else {
        statusElement.innerHTML =
          "Leider ist ein Fehler bei der Verarbeitung Ihrer Anfrage aufgetreten. Versuchen Sie es später nochmal.";
        statusElement.style.color = "red";
      }
    })
    .catch(function (error) {
      statusElement.innerHTML =
        "Leider ist ein Fehler bei der Verarbeitung Ihrer Anfrage aufgetreten. Versuchen Sie es später nochmal.";
      statusElement.style.color = "red";
      console.log(error);
    });
});
