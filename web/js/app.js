// const fixedMenu = require("./fixedMenu.js");

const BODY = this.document.querySelector("body"),
  btn_menu = this.document.querySelector("[data-menu-btn]"),
  form_mod = this.document.querySelector(".contact"),
  form_el = form_mod.querySelector("form"),
  form_req = form_mod.querySelectorAll("[required]"),
  nav = document.getElementById("nav"),
  cookie_bar = document.getElementById("cookie-bar");
document.getElementById("btn_cookie").addEventListener("click", cookieAccepted);

// window events
window.onload = () => {
  highlightCurrentBar();
  // set highlight current nav menu bar
  let navBtns = [...document.getElementsByClassName("nav-btn")];
  let highlightBars = [...document.getElementsByClassName("highlight-nav")];

  highlightBars.map((bar, i) => {
    bar.style.width = navBtns[i].clientWidth - 3 + "px";
  });
};
//on scroll events
window.onscroll = () => {
  fixedMenu();
  highlightCurrentBar();
};

// fixed menu
let fixedMenu = () => {
  if (window.pageYOffset > 100) {
    nav.style.paddingTop = "20px";
    nav.style.paddingBottom = "10px";
    nav.style.height = "80px";
    if (window.innerWidth > 1024) {
      nav.style.height = "80px";
    }

    nav.style.background = "rgba(112, 112, 112, 0.9)";
  } else {
    nav.style.paddingTop = "40px";
    nav.style.background = "transparent";
    nav.style.height = "100px";
  }
};

// hamburger menu
btn_menu.onclick = () => {
  if (BODY.classList != "open-menu") {
    BODY.classList.toggle("open-menu");
  }

  if (nav.style.height === "100vh") {
    nav.style.height = "70px";
    if (window.pageYOffset < 100) {
      nav.style.background = "transparent";
      nav.style.height = "100px";
    }
  } else {
    nav.style.background = "rgba(112, 112, 112, 0.9)";
    nav.style.height = "100vh";
  }
};

//form submit
form_el.onsubmit = function(event) {
  event.preventDefault();

  form_el.classList.add("is-submitted");
  let isError = false;

  for (i = 0; i < form_req.length; i++) {
    if (form_req[i].checkValidity() != true) {
      isError = true;
    }
  }

  if (!isError) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let data = {
          firstName: document.getElementById("firstName").value,
          companyName: document.getElementById("companyName").value,
          userTelephone: document.getElementById("userTelephone").value,
          email: document.getElementById("email").value,
          checkBox: document.getElementById("contact-checkbox").value
        };
        console.log(data);
        form_el.classList.remove("is-submitted");
        form_el.reset();
      }
    };
    xhttp.open("POST", "https://httpstat.us/200", true);
    xhttp.send(new FormData(form_el));
  } else {
    console.log("there are some not property validated fields");
  }
};

// cookie
function cookieAccepted() {
  cookie_bar.style.display = "none";
  console.log("cookie actepted");
}

// highlight nav

let curentBar = "hero";

let highlightCurrentBar = () => {
  let heroBar = document.getElementById("nav-hero"),
    missionNav = document.getElementById("nav-mission"),
    missionBar = document.getElementById("mission-bar"),
    clientsNav = document.getElementById("nav-clients"),
    clientsBar = document.getElementById("clients-bar"),
    productsNav = document.getElementById("nav-products"),
    productsBar = document.getElementById("products-bar"),
    contactsNav = document.getElementById("nav-contact"),
    contactsNavMap = document.getElementById("nav-contact-map"),
    contactBar = document.getElementById("contact-bar");

  if (window.pageYOffset >= 0) {
    curentBar = "hero";
  }

  if (window.pageYOffset >= missionNav.offsetTop) {
    curentBar = "mission";
  }
  if (window.pageYOffset >= clientsNav.offsetTop) {
    curentBar = "clients";
  }
  if (window.pageYOffset >= productsNav.offsetTop) {
    curentBar = "products";
  }
  if (
    window.pageYOffset >= contactsNav.offsetTop ||
    window.pageYOffset >= contactsNavMap.offsetTop
  ) {
    curentBar = "contact";
  }

  if (curentBar == "hero") {
    heroBar.style.background = "#62bf17";
  } else {
    heroBar.style.background = "transparent";
  }
  if (curentBar == "mission") {
    missionBar.style.background = "#62bf17";
  } else {
    missionBar.style.background = "transparent";
  }
  if (curentBar == "clients") {
    clientsBar.style.background = "#62bf17";
  } else {
    clientsBar.style.background = "transparent";
  }
  if (curentBar == "products") {
    productsBar.style.background = "#62bf17";
  } else {
    productsBar.style.background = "transparent";
  }
  if (curentBar == "contact") {
    contactBar.style.background = "#62bf17";
  } else {
    contactBar.style.background = "transparent";
  }
};
