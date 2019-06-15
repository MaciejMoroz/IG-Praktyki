const BODY = this.document.querySelector("body");
const btn_menu = this.document.querySelector("[data-menu-btn]");
const form_mod = this.document.querySelector(".contact");
const form_el = form_mod.querySelector("form");
const form_req = form_mod.querySelectorAll("[required]");

//fixed menu
let nav = document.getElementById("nav");

window.onscroll = () => {
  if (window.pageYOffset > 100) {
    nav.style.paddingTop = "10px";
    nav.style.paddingBottom = "10px";
    nav.style.height = "60px";
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
  BODY.classList.toggle("open-menu");
  nav.style.background = "rgba(112, 112, 112, 0.9)";

  if (nav.style.height === "100vh") {
    nav.style.height = "60px";
    if (window.pageYOffset < 100) {
      nav.style.background = "transparent";
      nav.style.height = "60px";
    }
  } else {
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
      console.log(form_req[i]);
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
