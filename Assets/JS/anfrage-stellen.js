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
/*==================== ANFRAGE STELLEN LOGIK ====================*/

// Anfrage-Stellen-Assistent
// nach jedem Schritt wird in path der Weg aufgelistet, welche Buttons geklickt worden sind und dies wird in einem Feld der Form ebenso geupdatet; bei einem Upload im Assitenten werden die Files auch in die Form übertragen
// zum Schluss erscheint Formular und kann abgesendet werden

let path = [];

const innerContainer = document.querySelector(
  "#anfrage-stellen-outer-container .anfrage-stellen-container"
);
displayAusgangsfrageContainer();

function displayAusgangsfrageContainer() {
  const dauerContainer = {
    containerId: "dauer-container",
    lastContainerId: "videografie-container",
    description: "Wie lange soll ihr fertiges Video sein?",
    customCssClass: "dauer-button",
    buttons: [
      { headline: "< 1 Minute", text: "Für einen sehr kurzen Auftritt" },
      { headline: "1-2 Minuten", text: "Für einen kurzen Auftritt" },
      { headline: "3-5 Minuten", text: "Für einen etwas längeren Auftritt" },
      { headline: "> 5 Minuten", text: "Für einen langen Auftritt" },
    ],
  };

  displayAssistant({
    containerId: "ausgangsfrage-container",
    lastContainerId: null,
    description: "Was möchten Sie anfragen?",
    customCssClass: "ausgangsfrage-button",
    buttons: [
      {
        headline: "Software-Entwicklung",
        text: "Entwicklung von modernen Anwendungen für Web, Desktop & Android",
        container: {
          containerId: "softwareentwicklung-container",
          lastContainerId: "ausgangsfrage-container",
          description: "Was benötigen Sie?",
          customCssClass: "softwareentwicklung-button",
          buttons: [
            {
              headline: "Webseite",
              text: "Wollen Sie einen Internetauftritt für Ihre Firma, einen Online-Shop oder einen Blog?",
              customContainer: displayFileUploadContainer,
            },
            {
              headline: "Android-App",
              text: "Haben Sie eine Idee für eine App und wollen Sie diese umsetzen?",
              customContainer: displayFileUploadContainer,
            },
            {
              headline: "Desktop-Anwendung",
              text: "Brauchen Sie eine Anwendung direkt für Windows oder eine grafische Oberfläche für ein Linux-System?",
              customContainer: displayFileUploadContainer,
            },
            {
              headline: "API-Schnittstelle",
              text: "Schnittstellen entwicklen",
              customContainer: displayFileUploadContainer,
            },
          ],
        },
      },

      {
        headline: "Videografie",
        text: "Werbungs- und Naturvideos, Drohnenaufnahmen und Montage",
        container: {
          containerId: "videografie-container",
          lastContainerId: "ausgangsfrage-container",
          description: "Welche Art von Video wünschen Sie sich?",
          customCssClass: "videografie-button",
          buttons: [
            {
              headline: "Werbevideo",
              text: "Sie besitzen eine Firma oder haben eine Idee und wollen sich in der Öffentlichkeit präsentieren?",
              container: dauerContainer,
            },
            {
              headline: "Interview",
              text: "Wenn Sie vorhaben, ein Gespräch zu führen und dies auf Video festzuhalten",
              container: dauerContainer,
            },
            {
              headline: "Drohnenaufnahme",
              text: "Sie möchten gerne qualitativ hochwertige Landschaftsvideos drehen lassen?",
              container: dauerContainer,
            },
            {
              headline: "Eventbegleitung",
              text: "",
              container: dauerContainer,
            },
          ],
        },
      },

      {
        headline: "Social Media-Management",
        text: "Suchmaschinenoptimierung und Management verschiedener Social-Media Plattformen",
        container: {
          containerId: "socialmedia-management",
          lastContainerId: "ausgangsfrage-container",
          description: "Wie können wir Ihnen helfen?",
          customCssClass: "socialmediamanagement-button",
          buttons: [
            {
              headline: "Facebook-Management",
              text: "Für Ihren Facebook-Auftritt",
            },
            {
              headline: "Instagram-Management",
              text: "Für Ihren Instagram-Auftritt",
            },
            {
              headline: "LinkedIn-Management",
              text: "Für Ihr LinkedIn-Account",
            },
            { headline: "WhatsApp-Business-Einrichtung", text: "" },
          ],
        },
      },

      {
        headline: "IT-Administration",
        text: "Kompetente Beratung und Lösung von häuslichen IT-Problemen aller Art",
        container: {
          containerId: "itadministration-container",
          lastContainerId: "ausgangsfrage-container",
          description: "Wo können wir Ihnen bei Ihrem Problemen helfen?",
          customCssClass: "itadministration-button",
          buttons: [
            { headline: "Wir kommen zu Ihnen", text: "" },
            {
              headline: "Sie kommen zu uns",
              text: "Elisabethstr. 22, 02826 Görlitz",
            },
            { headline: "Weiß ich noch nicht", text: "" },
          ],
        },
      },
    ],
  });
}

function displayAssistant(l) {
  const buttonsWithCallback = l.buttons;

  buttonsWithCallback.forEach(function (e) {
    e.clickCallback = function () {
      path.push(e.headline);
      console.log(path);

      if (e.container != null) {
        displayAssistant(e.container);
      } else {
        if (e.customContainer != null) {
          e.customContainer(l.containerId);
        } else {
          displayAnfrageForm(l.containerId);
        }
      }
    };
  });

  displayButtonContainer(
    l.containerId,
    l.lastContainerId,
    l.description,
    l.customCssClass,
    buttonsWithCallback
  );
}

function displayButtonContainer(
  containerId,
  lastContainerId,
  description,
  customCssClass,
  buttons
) {
  hideContainer(lastContainerId);

  window.scrollTo(0, 0);

  if (!document.body.contains(document.querySelector("#" + containerId))) {
    createButtonContainer(
      containerId,
      lastContainerId,
      description,
      customCssClass,
      buttons
    );
  } else {
    innerContainer.querySelector("#" + containerId).classList.remove("hide");
  }
}

function hideContainer(containerId) {
  if (containerId != null) {
    innerContainer.querySelector("#" + containerId).classList.add("hide");
  }
}

function createButtonContainer(
  containerId,
  lastContainerId,
  description,
  customCssClass,
  buttons
) {
  const frageContainer = document.createElement("div");
  frageContainer.id = containerId;
  frageContainer.classList.add("frage-container");

  const descriptionElement = document.createElement("p");
  descriptionElement.innerText = description;
  frageContainer.appendChild(descriptionElement);

  const list = document.createElement("ul");
  list.classList.add("responsive-list");

  buttons.forEach(function (e) {
    list.appendChild(
      createAnswerButton(e.headline, e.text, customCssClass, e.clickCallback)
    );
  });

  frageContainer.appendChild(list);

  if (lastContainerId != null) {
    const backButton = document.createElement("button");
    backButton.classList.add("btn");
    backButton.classList.add("btn-primary");
    backButton.classList.add("back-button");
    backButton.innerText = "< Zurück";
    backButton.addEventListener("click", function () {
      backClick(containerId, lastContainerId);
    });

    frageContainer.appendChild(backButton);
  }

  innerContainer.appendChild(frageContainer);
}

function createAnswerButton(headline, text, customCssClass, clickCallback) {
  const card = document.createElement("li");
  card.classList.add("default-item");
  card.classList.add("card");

  const h3 = document.createElement("h3");
  h3.innerText = headline;

  card.appendChild(h3);

  if (text != null && text != "") {
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = text;
    card.appendChild(cardText);
  }

  const cardIcon = document.createElement("div");
  cardIcon.classList.add("card-icon");
  card.appendChild(cardIcon);

  const chooseButton = document.createElement("button");
  chooseButton.classList.add("btn");
  chooseButton.classList.add("btn-primary");
  //chooseButton.id = btnId;
  chooseButton.innerText = "Auswählen";
  chooseButton.addEventListener("click", function () {
    clickCallback();
  });
  cardIcon.appendChild(chooseButton);

  return card;
}

function displayCustomContainer(containerId, lastContainerId) {
  document
    .querySelector("#" + containerId + " .back-button")
    .addEventListener("click", function () {
      backClick(containerId, lastContainerId);

      if (containerId == "file-upload-container") {
        clearFileInput();
      }

      this.removeEventListener("click", arguments.callee);
    });

  hideContainer(lastContainerId);
  document.querySelector("#" + containerId).classList.remove("hide");
}

function displayAnfrageForm(lastContainerId) {
  updateBetreff();
  updatePathField();
  displayCustomContainer("anfrage-form", lastContainerId);
}

function updatePathField() {
  document.querySelector('#anfrage-form textarea[name="path"]').innerText =
    path;
}

function updateBetreff() {
  document.querySelector('#anfrage-form textarea[name="Betreff"]').innerText =
    "Neue Anfrage für " + path[0];
}

function backClick(containerId, lastContainerId) {
  if (
    document
      .querySelector("#" + lastContainerId)
      .classList.contains("frage-container")
  ) {
    path.pop();
  }

  console.log(path);
  window.scrollTo(0, 0);

  innerContainer.querySelector("#" + containerId).classList.add("hide");
  innerContainer.querySelector("#" + lastContainerId).classList.remove("hide");
}

function displayFileUploadContainer(lastContainerId) {
  displayCustomContainer("file-upload-container", lastContainerId);
}

document.querySelector('#anfrage-form').addEventListener("submit", async function (event) {
  event.preventDefault();

  document.querySelector("#anfrage-stellen-outer-container .anfrage-stellen-container").classList.add("hide");

  const endeContainer = document.querySelector(".contact-end");
  endeContainer.classList.remove("hide");

  const statusElement = endeContainer.querySelector(".text");
  statusElement.innerHTML = 'Bitte warten Sie. Ihre Kontaktaufnahme wird verarbeitet.';
  statusElement.style.color = 'black';

  window.scrollTo(0, 0);

  let data = new FormData(event.target);
  let multerData = new FormData(event.target);

  data.delete('file');

  let response = await fetch('https://itm-solutions-halime.de:3000/anfrage', {
    method: document.querySelector("#anfrage-form").method,
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
    method: document.querySelector("#anfrage-form").method,
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

document.querySelector('.contact-end .back-button').addEventListener('click', function () {
  document.querySelector("#anfrage-stellen-outer-container .anfrage-stellen-container").classList.remove("hide");
  document.querySelector(".contact-end").classList.add("hide");
});


document
  .querySelector('#file-upload-container input[name="file"]')
  .addEventListener("change", function () {
    document.querySelector("#file-upload-container #filename").innerHTML =
      this.files[0].name;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(this.files[0]);

    document.querySelector('#anfrage-form input[name="file"]').files =
      dataTransfer.files; //.push(this.files[0]);

    document
      .querySelector("#file-upload-container #filename-outer")
      .classList.add("inline-flex");
    document
      .querySelector("#file-upload-container #filename-outer")
      .classList.remove("hide");

    //hideContainer('file-upload-container');
    //displayAnfrageForm('file-upload-container');
  });

document
  .querySelector("#file-upload-container .next-button")
  .addEventListener("click", function () {
    hideContainer("file-upload-container");
    displayAnfrageForm("file-upload-container");
  });

document
  .querySelector('#file-upload-container input[name="file"]')
  .addEventListener("click", function () {
    document.querySelector('#file-upload-container input[name="file"]').value =
      null;
  });

document
  .querySelector("#clear-file-button")
  .addEventListener("click", function () {
    clearFileInput();
  });

function clearFileInput() {
  document.querySelector("#file-upload-container #filename").innerHTML = "";

  const dataTransfer = new DataTransfer();
  document.querySelector('#anfrage-form input[name="file"]').files =
    dataTransfer.files; //.push(this.files[0]);

  document
    .querySelector("#file-upload-container #filename-outer")
    .classList.remove("inline-flex");
  document
    .querySelector("#file-upload-container #filename-outer")
    .classList.add("hide");
}

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
