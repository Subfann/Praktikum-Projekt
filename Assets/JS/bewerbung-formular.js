"use strict";

// URL-Parameter auswerten

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const stelle = urlParams.get("Stelle");

const betreffField = document.querySelector('.contact-form textarea[name="Betreff"]');
betreffField.innerText = 'Bewerbung: ' + stelle;

// Datei hochladen/Datei leeren

document
  .querySelector('.upload-table .lebenslauf input[name="lebenslauf"]')
  .addEventListener("change", function () {
    document.querySelector(".upload-table .lebenslauf .file-info .filename").innerHTML =
      this.files[0].name;

    document
      .querySelector(".upload-table .lebenslauf .file-info")
      .classList.remove("no-visible");
  });

document.querySelector('.upload-table .lebenslauf .file-info .clear-button').addEventListener('click', function () {
  const dataTransfer = new DataTransfer();
  document.querySelector('.upload-table .lebenslauf input[name="lebenslauf"]').files = dataTransfer.files;
  document.querySelector('.upload-table .lebenslauf .file-info .filename').innerHTML = '';
  document
      .querySelector(".upload-table .lebenslauf .file-info")
      .classList.add("no-visible");
});

document
  .querySelector('.upload-table .anschreiben input[name="anschreiben"]')
  .addEventListener("change", function () {
    document.querySelector(".upload-table .anschreiben .file-info .filename").innerHTML =
      this.files[0].name;

    document
      .querySelector(".upload-table .anschreiben .file-info")
      .classList.remove("no-visible");
  });

document.querySelector('.upload-table .anschreiben .file-info .clear-button').addEventListener('click', function () {
  const dataTransfer = new DataTransfer();
  document.querySelector('.upload-table .anschreiben input[name="anschreiben"]').files = dataTransfer.files;
  document.querySelector('.upload-table .anschreiben .file-info .filename').innerHTML = '';
  document
      .querySelector(".upload-table .anschreiben .file-info")
      .classList.add("no-visible");
});

// Formular abschicken

const contactForm = document.querySelector(".contact-form");
const statusElement = document.querySelector("#contact .contact-end .text");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  statusElement.innerHTML = 'Bitte warten Sie. Ihre Kontaktaufnahme wird verarbeitet.';
  statusElement.style.color = 'black';
  document.querySelector(".contact-end .icon").classList.add("hide");
  document.querySelector('.contact-end .back-button').classList.add("hide");

  document.querySelector("#contact .container").classList.add("hide");

  window.scrollTo(0, 0);

  const endeContainer = document.querySelector("#contact .contact-end");
  endeContainer.classList.remove("hide");

  let data = new FormData(event.target);
  let multerData = new FormData(event.target);

  data.delete('lebenslauf');
  data.delete('anschreiben');

  let response = await fetch('https://itm-solutions-halime.de:3000/bewerbungsunterlagen', {
    method: contactForm.method,
    body: multerData,
    headers: {
      Accept: 'multipart/form-data'
    }
  });

  if (response.status == 413) {
    statusElement.innerHTML =
      "Achten Sie auf die Größe der Dateien.";
    statusElement.style.color = "red";
    document.querySelector('.contact-end .back-button').classList.remove("hide");
    return;
  } else if (response.status == 429) {
    statusElement.innerHTML =
      "Zu viele Anfragen. Bitte haben Sie Geduld.";
    statusElement.style.color = "red";
    document.querySelector('.contact-end .back-button').classList.remove("hide");
    return;
  } else if (response.status == 500) {
    statusElement.innerHTML =
      "Leider ist ein Fehler bei der Verarbeitung Ihrer Anfrage aufgetreten. Versuchen Sie es später nochmal.";
    statusElement.style.color = "red";
    document.querySelector('.contact-end .back-button').classList.remove("hide");
    return;
  }

  response = await fetch('https://api.web3forms.com/submit', {
    method: contactForm.method,
    body: data,
    headers: {
      Accept: "application/json"
    },
  });

  if (response.status != 200) {
    statusElement.innerHTML =
      "Leider ist ein Fehler beim Senden der Mail aufgetreten. Versuchen Sie es später nochmal.";
    statusElement.style.color = "red";
  } else {
    statusElement.innerHTML =
      "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt";
    statusElement.style.color = "green";
    document.querySelector(".contact-end .icon").classList.remove("hide");

    document.querySelector(".contact-end .back-button").classList.remove("inline-block");
    document.querySelector(".contact-end .back-button").classList.add("hide");
  }
});

document.querySelector('#contact .contact-end .back-button').addEventListener('click', function () {
  document.querySelector("#contact .container").classList.remove("hide");
  document.querySelector("#contact .contact-end").classList.add("hide");
});

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