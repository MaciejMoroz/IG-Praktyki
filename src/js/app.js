const BODY = this.document.querySelector("body"),
  btn_menu = this.document.querySelector("[data-menu-btn]");

// hamburger menu
btn_menu.onclick = function() {
  BODY.classList.toggle("open-menu");
};
