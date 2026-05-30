const heroLogo = document.querySelector("#about-hero-logo");
const heroDescCover = document.querySelector("#about-hero-desc-cover");

heroLogo.addEventListener(
  "mouseenter",
  () => (heroDescCover.style.width = "0%"),
);
heroLogo.addEventListener(
  "mouseleave",
  () => (heroDescCover.style.width = "100%"),
);
