const whoWeAre = document.querySelector("#about-who-we-are");
const awwaHeading = document.querySelector("#awwa-heading");
const whatWeDo = document.querySelector("#about-what-we-do");
const awwdHeading = document.querySelector("#awwd-heading");
const dsCover = document.querySelector("#awwd-ds-cover");

const about = document.querySelector("#about");
const scrollContainer = document.querySelector(".scroll-container");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const inSection = scrollTop / window.innerHeight;
  const translateX = inSection * window.innerWidth;

  if (inSection > 0.5 && inSection <= 1.5) {
    whoWeAre.style.opacity = 1;
    awwaHeading.style.width = "11ch";
  } else {
    whoWeAre.style.opacity = 0;
    awwaHeading.style.width = "0ch";
  }

  if (inSection > 1.5 && inSection <= 2.5) {
    whatWeDo.style.opacity = 1;
    dsCover.style.width = "0%";
    awwdHeading.style.width = "25ch";
  } else {
    whatWeDo.style.opacity = 0;
    dsCover.style.width = "100%";
    awwdHeading.style.width = "0ch";
  }

  if (inSection > 2.5 && inSection <= 3.5) {
    document.body.style.backgroundColor = "var(--squhare)";
  } else {
    document.body.style.backgroundColor = "var(--mint)";
  }

  if (inSection > 3.5 && inSection <= 4.5) {
    document.body.style.backgroundColor = "var(--grass)";
  }

  about.style.transform = `translateX(-${translateX}px)`;
});
