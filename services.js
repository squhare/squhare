const titleSection = document.querySelector(".title-section");
const content = document.querySelector(".content");
const back = document.querySelectorAll(".back");
const profileSectionWrapper = document.querySelector(".profileSectionWrapper");

const navbar = document.querySelector(".navbar");

const mintson = document.querySelector(".mintson");
const blokd = document.querySelector(".blokd");

const changeMode = document.querySelector("#changeMode");
const modeText = document.querySelector("#modeText");
const playerContainer = document.querySelector("#playerContainer");

let mode = "double";
let introStatus = true;
let scrollY = 0;
let needUpdate = true;
let serviceSelected = null;

const platform = () => navigator.platform;
const desktopPlatforms = [
  "Win32",
  "Win64",
  "Windows",
  "MacIntel",
  "Linux x86_64",
  "Linux i686",
  "Linux",
];

const mobilePlatforms = [
  "Android",
  "Linux armv8l",
  "Linux armv81",
  "Linux aarch64",
  "iPhone",
  "iPad",
  "iPod",
];
const pages = ["about", "products", "contacts"];
const animaKeyframe = desktopPlatforms.includes(platform())
  ? [0, 500, 3000]
  : [0, 500, 3000];

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (!introStatus) return;

      console.log(scrollY);

      scrollY += e.deltaY;
      needUpdate = true;
      limitScroll();
    },
    { passive: false },
  );

  window.addEventListener(
    "touchstart",
    (e) => {
      lastTouchY = e.touches[0].clientY;
    },
    { passive: true },
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      if (!introStatus) return;

      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      scrollY += deltaY;
      needUpdate = true;
      lastTouchY = touchY;

      limitScroll();
    },
    { passive: false },
  );

  mintson.addEventListener("click", () => {
    if (serviceSelected) return;
    scrollY = 500;
    serviceSelected = "mintson";
    navbar.classList.add('navbar-mintson')
    needUpdate = true;
  });
  blokd.addEventListener("click", () => {
    if (serviceSelected) return;
    scrollY = 500;
    serviceSelected = "blokd";
    navbar.classList.add('navbar-blokd')
    needUpdate = true;
  });
  back.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      navbar.classList.remove(`navbar-${serviceSelected}`)
      serviceSelected = null;
      scrollY = 0;
      needUpdate = true;
    });
  });
  changeMode.addEventListener("click", () => {
    mode = mode === "double" ? "single" : "double";

    renderPlayers();
  });

  renderPlayers();

  updateScroll();
});

function limitScroll() {
  const maxScroll = animaKeyframe[animaKeyframe.length - 1];

  if (scrollY < 0) scrollY = 0;
  if (scrollY > maxScroll) scrollY = maxScroll;
}

function updateScroll() {
  if (needUpdate) {
    console.log(serviceSelected);
    animate();
    needUpdate = false;
  }

  requestAnimationFrame(updateScroll);
}

function renderPlayers() {
  if (mode === "double") {
    modeText.textContent = "DOUBLE";

    playerContainer.innerHTML = `
      <div class="player-column">
        <input type="text" placeholder="Player 1">
        <input type="text" placeholder="Player 2">
      </div>

      <div class="player-column">
        <input type="text" placeholder="Player 3">
        <input type="text" placeholder="Player 4">
      </div>
    `;
  } else {
    modeText.textContent = "SINGLE";

    playerContainer.innerHTML = `
      <div class="player-column">
        <input type="text" placeholder="Player 1">
      </div>

      <div class="player-column">
        <input type="text" placeholder="Player 2">
      </div>
    `;
  }
}

function animate() {
  const isMobile = mobilePlatforms.includes(platform());
  const viewHeight = window.innerHeight;
  const viewWidth = window.innerWidth;

  const key = animaKeyframe.findIndex(
    (_, i) => scrollY >= animaKeyframe[i] && scrollY <= animaKeyframe[i + 1],
  );

  animaL = (target) =>
    linear(target, animaKeyframe[key], animaKeyframe[key + 1]);
  animaR = (start) =>
    reverseLinear(start, animaKeyframe[key], animaKeyframe[key + 1]);

  if ((serviceSelected && scrollY < animaKeyframe[1]) || (!serviceSelected && scrollY > animaKeyframe[1])) {
    scrollY = animaKeyframe[1]
  } 

  if (!serviceSelected) {
    mintson.style.width = "50vw";
    mintson.children[1].style.left = 0;
    blokd.style.width = "50vw";
    blokd.children[1].style.left = 0;

    titleSection.style.top = `-${animaL(300)}px`;
    content.style.top = `-${animaL(196)}px`;
    content.style.height = `${viewHeight - animaR(196)}px`;
  } else {
    const selected = serviceSelected === "blokd" ? blokd : mintson;
    const nonSelected = serviceSelected !== "blokd" ? blokd : mintson;

    selected.style.width = "100vw";
    selected.children[1].style.left = "100vw";
    nonSelected.style.width = 0;

    titleSection.style.top = `-300px`;
    content.style.top = `-196px`;
    content.style.height = `${viewHeight}px`;
  }
  profileSectionWrapper.scrollLeft = 0;

  if (key < 1) return;

  titleSection.style.top = `-300px`;
  content.style.top = `-196px`;
  content.style.height = `${viewHeight}px`;

  if (!serviceSelected && key < 1) return;
  profileSectionWrapper.scrollLeft = animaL(profileSectionWrapper.scrollWidth - window.innerWidth);
}

function styleValue(
  value,
  action,
  {
    baseValue = 0,
    baseSize = 0,
    negative = false,
    isDivide = true,
    divider = 10,
    unit = "px",
  } = {},
) {
  return (
    ((["deg"].includes(unit) ? 1 : [FIELD_HEIGHT, FIELD_WIDTH][baseSize]) *
      (negative ? -1 : 1) *
      (baseValue + (action ? action(value) : value))) /
      (isDivide ? divider : 1) +
    unit
  );
}

function reverseLinear(start, min, max) {
  const range = max - min;

  const value = Math.min(Math.max(scrollY - min, 0), range);

  return start * (1 - value / range);
}

function linear(target, min, max) {
  const range = max - min;

  const value = Math.min(Math.max(scrollY - min, 0), range);

  return (target * value) / range;
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
