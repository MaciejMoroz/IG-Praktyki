const BODY = this.document.querySelector("body"),
  btn_menu = this.document.querySelector("[data-menu-btn]");

// hamburger menu
btn_menu.onclick = () => {
  BODY.classList.toggle("open-menu");
};

//fixed menu
let nav = document.getElementById("nav");

window.onscroll = () => {
  if (window.innerWidth > 1024) {
    window.pageYOffset > 100
      ? (nav.style.background = "rgba(112, 112, 112, 0.9)")(
          (nav.style.height = "120px")
        )
      : (nav.style.background = "transparent");
  } else {
    (nav.style.background = "rgba(112, 112, 112, 0.9)")(
      (nav.style.height = "120px")
    );
  }
};
