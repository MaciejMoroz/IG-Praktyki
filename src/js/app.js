const BODY = this.document.querySelector("body"),
  btn_menu = this.document.querySelector("[data-menu-btn]"),
  form_mod = this.document.querySelector(".contact"),
  form_el = form_mod.querySelector("form"),
  form_req = form_mod.querySelectorAll("[required]"),
  nav = document.getElementById("nav"),
  cookie_bar = document.getElementById("cookie-bar"),
  cookie_btn = document
    .getElementById("btn_cookie")
    .addEventListener("click", cookieAccepted);

//fixed menu
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
  if (BODY.classList != "open-menu") {
    BODY.classList.toggle("open-menu");
  }

  if (nav.style.height === "100vh") {
    nav.style.height = "60px";
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

// cookie
function cookieAccepted() {
  cookie_bar.style.display = "none";
  console.log("cookie actepted");
}
