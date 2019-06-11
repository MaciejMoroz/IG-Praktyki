var BODY = this.document.querySelector("body"),
  btn_menu = this.document.querySelector("[data-menu-btn]");

// hamburger menu
btn_menu.onclick = function() {
  BODY.classList.toggle("open-menu");
};

var coll = document.getElementsByClassName("colapse");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
