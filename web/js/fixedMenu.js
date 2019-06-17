// fixed menu
export let fixedMenu = () => {
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
