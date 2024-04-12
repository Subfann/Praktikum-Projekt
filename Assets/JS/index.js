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

/* const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}); */

/**
 * img Slider about
 */

var i = 0; // Start Point
var images = []; // Images Array
var time = 2000; // Time Between Switch

// Image List
images[0] = "./Assets/Fotos/Index/Section/Über uns/1.png";
images[1] = "./Assets/Fotos/Index/Section/Über uns/2.png";
images[2] = "./Assets/Fotos/Index/Section/Über uns/3.png";
images[3] = "./Assets/Fotos/Index/Section/Über uns/4.png";
images[4] = "./Assets/Fotos/Index/Section/Über uns/5.png";
images[5] = "./Assets/Fotos/Index/Section/Über uns/6.png";
images[6] = "./Assets/Fotos/Index/Section/Über uns/7.png";
images[7] = "./Assets/Fotos/Index/Section/Über uns/8.png";
images[8] = "./Assets/Fotos/Index/Section/Über uns/9.png";
images[9] = "./Assets/Fotos/Index/Section/Über uns/10.png";
images[10] = "./Assets/Fotos/Index/Section/Über uns/11.png";
images[11] = "./Assets/Fotos/Index/Section/Über uns/12.png";
images[12] = "./Assets/Fotos/Index/Section/Über uns/13.png";
images[13] = "./Assets/Fotos/Index/Section/Über uns/14.png";
images[14] = "./Assets/Fotos/Index/Section/Über uns/15.png";
images[15] = "./Assets/Fotos/Index/Section/Über uns/16.png";
images[16] = "./Assets/Fotos/Index/Section/Über uns/17.png";

// Change Image
function changeImg() {
  document.slide.src = images[i];

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

/**
 * COOKIE POP UP
 */

function setUpCookie(allowedPlugins) {
  //setting cookie for 1 month, after one month it'll be expired automatically
  document.cookie = "CookieBy=ITMSolutionsHalime-" + allowedPlugins + "; max-age=" + 60 * 60 * 24 * 30;
  if (document.cookie) {
    if (JSON.parse(allowedPlugins).includes('GoogleMaps')) {
      enableGoogleMapsPlugin();
    }

    if (JSON.parse(allowedPlugins).includes('FacebookMessenger')) {
      enableFacebookMessengerPlugin();
    }
    //if cookie is set
    //cookieBox.classList.add("hide"); //hide cookie box
    enableSite();
  } else {
    //if cookie not set then alert an error
    alert(
      "Cookie can't be set! Please unblock this site from the cookie setting of your browser."
    );
  }
}

const cookieSettingsBox = document.querySelector('.cookie-settings-box');

cookieSettingsBox.querySelector('.accept-all-button').addEventListener('click', function () {
  const plugins = ['GoogleMaps', 'FacebookMessenger'];
  setUpCookie(JSON.stringify(plugins));
});

cookieSettingsBox.querySelector('.save-button').addEventListener('click', function () {
  const plugins = [];

  if (cookieSettingsBox.querySelector('.funktionelle-cookies .right input[type="checkbox"]').checked) {
    plugins.push('GoogleMaps');
    plugins.push('FacebookMessenger');
  } else {
    if (cookieSettingsBox.querySelector('.funktionelle-cookies .google-maps input[type="checkbox"]').checked) {
      plugins.push('GoogleMaps');
    } else {
      const cookieWarning = 'Sie müssen funktionelle Cookies aktiviert haben, um dieses Feature nutzen zu können.';
      const cookieWarningElement = document.createElement('b');
      cookieWarningElement.style.fontSize = '16px';
      cookieWarningElement.innerHTML = cookieWarning;
      document.querySelector('#maps .map-container').appendChild(cookieWarningElement); 
    }

    if (cookieSettingsBox.querySelector('.funktionelle-cookies .facebook-messenger input[type="checkbox"]').checked) {
      plugins.push('FacebookMessenger');
    }
  }

  setUpCookie(JSON.stringify(plugins));
});

function enableGoogleMapsPlugin() {
  document.querySelector('#maps .map-container iframe').src 
      = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2502.4915205236944!2d14.991429300000002!3d51.154727199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4708dc3ba55c3385%3A0x3999ec4917293c22!2sElisabethstra%C3%9Fe%2022%2C%2002826%20G%C3%B6rlitz!5e0!3m2!1sde!2sde!4v1658494673099!5m2!1sde!2sde";
}

function enableFacebookMessengerPlugin() {
  const fbScripts = document.querySelectorAll('.fb-plugin-script');
  fbScripts.forEach(function (e) {
    eval(e.innerHTML);
  });
}

let checkCookie = document.cookie.match("CookieBy=ITMSolutionsHalime"); //checking our cookie
if (checkCookie == null) {
  disableSite();
} else {
  const pluginsString = checkCookie.input.substring(28).split(';')[0];

  if (JSON.parse(pluginsString).includes('GoogleMaps')) {
    enableGoogleMapsPlugin();
  } else {
    const cookieWarning = 'Sie müssen funktionelle Cookies aktiviert haben, um dieses Feature nutzen zu können.';
    const cookieWarningElement = document.createElement('b');
    cookieWarningElement.style.fontSize = '16px';
    cookieWarningElement.innerHTML = cookieWarning;
    document.querySelector('#maps .map-container').appendChild(cookieWarningElement); 
  }

  if (JSON.parse(pluginsString).includes('FacebookMessenger')) {
    enableFacebookMessengerPlugin();
  }
}

function enableSite() {
  cookieSettingsBox.classList.add('hide');
  document.querySelector('#not-always-enabled').classList.remove('disabled');
  document.querySelector('body').classList.remove('no-scroll');
}

function disableSite() {
  cookieSettingsBox.classList.remove('hide');
  document.querySelector('#not-always-enabled').classList.add('disabled');
  document.querySelector('body').classList.add('no-scroll');
}

document.querySelector('.cookie-settings-box .funktionelle-cookies .more').addEventListener('click', function () {
  moreCookieTypeInformation('.cookie-settings-box .funktionelle-cookies');
});

document.querySelector('.cookie-settings-box .essenzielle-cookies .more').addEventListener('click', function () {
  moreCookieTypeInformation('.cookie-settings-box .essenzielle-cookies');
});

function moreCookieTypeInformation(cssSelector) {
  const cookieInfoBox = document.querySelector(cssSelector);
  if (cookieInfoBox.classList.contains('height-80px')) {
    cookieInfoBox.classList.remove('height-80px');
    cookieInfoBox.classList.add('height-auto');
  } else if (cookieInfoBox.classList.contains('height-auto')) {
    cookieInfoBox.classList.remove('height-auto');
    cookieInfoBox.classList.add('height-80px');
  }
}

const funktionelleCookies = document.querySelector('.cookie-settings-box .funktionelle-cookies');
const detailCheckBoxes = funktionelleCookies.querySelectorAll('.funktionell-details input[type="checkbox"]');

funktionelleCookies.querySelector('.right input[type="checkbox"]').addEventListener('click', function () {

  if (funktionelleCookies.querySelector('.right input[type="checkbox"]').checked) {
    enableDetailCheckBoxes();
  } else {
    disableDetailCheckBoxes();
  }
  
  document.querySelector('.cookie-settings-box .save-button').classList.remove('disabled');

  function enableDetailCheckBoxes() {
    detailCheckBoxes.forEach(function (e) {
      e.checked = true;
    });
  }

  function disableDetailCheckBoxes() {
    detailCheckBoxes.forEach(function (e) {
      e.checked = false;
    });
  }
});

funktionelleCookies.querySelector('.funktionell-details .google-maps input[type="checkbox"]').addEventListener('click', function () {
  document.querySelector('.cookie-settings-box .save-button').classList.remove('disabled');

  if (funktionelleCookies.querySelectorAll('.funktionell-details input[type="checkbox"]:checked').length == 2) {
    cookieSettingsBox.querySelector('.funktionelle-cookies .right input[type="checkbox"]').checked = true;
  } else {
    cookieSettingsBox.querySelector('.funktionelle-cookies .right input[type="checkbox"]').checked = false;
  }
});

funktionelleCookies.querySelector('.funktionell-details .facebook-messenger input[type="checkbox"]').addEventListener('click', function () {
  document.querySelector('.cookie-settings-box .save-button').classList.remove('disabled');

  if (funktionelleCookies.querySelectorAll('.funktionell-details input[type="checkbox"]:checked').length == 2) {
    cookieSettingsBox.querySelector('.funktionelle-cookies .right input[type="checkbox"]').checked = true;
  } else {
    cookieSettingsBox.querySelector('.funktionelle-cookies .right input[type="checkbox"]').checked = false;
  }
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
