import { intro } from "./navbar.js";

const titleSection = document.querySelector(".title-section");
const content = document.querySelector(".content");
const back = document.querySelectorAll(".back");
const profileSectionWrapper = document.querySelectorAll(
  ".profileSectionWrapper",
);
const benefit = document.querySelectorAll(".benefit-wrapper");

const navbar = document.querySelector(".navbar");

const mintson = document.querySelector(".mintson");
const blokd = document.querySelector(".blokd");

const changeMode = document.querySelector("#changeMode");
const modeText = document.querySelector("#modeText");
const playerContainer = document.querySelector("#playerContainer");
const matchCard = document.querySelectorAll(".match-card");

const timer = document.getElementById("timer");
const pauseBtn = document.getElementById("pauseBtn");
const pauseText = document.getElementById("pauseText");

let mode = "double";
let introStatus = true;
let scrollY = 0;
let needUpdate = true;
let serviceSelected = null;

let totalSeconds = 10 * 60;
let isRunning = true;
let interval;

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
  ? [0, 500, 3000, 4000]
  : [0, 500, 2000, 2800];

document.addEventListener("DOMContentLoaded", async () => {
  interval = setInterval(() => {
    if (isRunning && totalSeconds >= 0) {
      updateTimer();
    }
  }, 1000);

  pauseBtn.addEventListener("click", () => {
    isRunning = !isRunning;

    pauseText.innerText = isRunning ? "PAUSE" : "PLAY";
  });
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
    navbar.classList.add("navbar-mintson");
    needUpdate = true;
  });
  blokd.addEventListener("click", () => {
    if (serviceSelected) return;
    scrollY = 500;
    serviceSelected = "blokd";
    navbar.classList.add("navbar-blokd");
    needUpdate = true;
  });
  back.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      navbar.classList.remove(`navbar-${serviceSelected}`);
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
  
  await intro();
  updateScroll();

});

function updateTimer() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  timer.innerText =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

  if (totalSeconds <= 0) {
    clearInterval(interval);
    pauseText.innerText = "DONE";
  }

  totalSeconds--;
}

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
  let animaL;
  let animaR;

  const isMobile = mobilePlatforms.includes(platform());
  const isMobileView = window.innerWidth <= 850;
  const viewHeight = window.innerHeight;
  const viewWidth = window.innerWidth;

  const key = animaKeyframe.findIndex(
    (_, i) => scrollY >= animaKeyframe[i] && scrollY <= animaKeyframe[i + 1],
  );

  animaL = (target) =>
    linear(target, animaKeyframe[key], animaKeyframe[key + 1]);
  animaR = (start) =>
    reverseLinear(start, animaKeyframe[key], animaKeyframe[key + 1]);

  if (
    (serviceSelected && scrollY < animaKeyframe[1]) ||
    (!serviceSelected && scrollY > animaKeyframe[1])
  ) {
    scrollY = animaKeyframe[1];
  }

  if (!serviceSelected) {
    mintson.style.width = isMobile || isMobileView ? "100vw" : "50vw";
    mintson.style.height = "100%";
    mintson.children[1].style.left = 0;
    blokd.style.width = isMobile || isMobileView ? "100vw" : "50vw";
    blokd.style.height = "100%";
    blokd.children[1].style.left = 0;
    
    titleSection.style.top = `-${animaL(300)}px`;
    content.style.top = `-${animaL(isMobile || isMobileView ? 148 : 196)}px`;
    content.style.height = `${viewHeight - animaR(isMobile || isMobileView ? 148 : 196)}px`;
  } else {
    const selected = serviceSelected === "blokd" ? blokd : mintson;
    const nonSelected = serviceSelected !== "blokd" ? blokd : mintson;

    if (isMobile || isMobileView) {
      selected.style.height = "100vh";
      nonSelected.style.height = 0;
    } else {
      selected.style.width = "100vw";
      nonSelected.style.width = 0;
    }
    selected.children[1].style.left = "100vw";

    titleSection.style.top = `-300px`;
    content.style.top = `-${isMobile || isMobileView ? 148 : 196}px`;
    content.style.height = `${viewHeight}px`;
  }
  profileSectionWrapper.forEach((item) => (item.scrollLeft = 0));

  if (key < 1) return;

  titleSection.style.top = `-300px`;
  content.style.top = `-${isMobile || isMobileView ? 148 : 196}px`;
  content.style.height = `${viewHeight}px`;

  if (!serviceSelected && key < 1) return;
  const serviceId = serviceSelected == "mintson" ? 0 : 1;

  profileSectionWrapper[serviceId].scrollLeft = animaL(
    profileSectionWrapper[serviceId].scrollWidth - window.innerWidth,
  );
  matchCard.forEach((item, index) => {
    item.style.transform = `translate${isMobile || isMobileView ? "X" : "Y"}(${(isMobile || isMobileView ? index < 6 : index % 2 == 0) ? `${animaL(75)}%` : `${-50 - animaL(75)}%`})`;
  });
  benefit[serviceId].style.top = `${window.innerHeight}px`;

  if (key < 2) return;

  profileSectionWrapper[serviceId].scrollLeft =
    profileSectionWrapper[serviceId].scrollWidth - window.innerWidth;

  const benefitPos = `${animaR(window.innerHeight) + 60}px`;
  benefit[serviceId].style.top = benefitPos;
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
