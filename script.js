const content = document.querySelector(".content");
const overlay = document.querySelector(".overlayScroll");
const fieldWrapper = document.querySelector(".fieldWrapper");
const field = document.querySelector(".field");
const page = document.querySelector(".page");
const loadingWrapper = document.querySelector(".loadingWrapper");
const viewer = document.querySelector(".viewer");
const slider = document.querySelector(".infoSlider");
const sliderArrow = document.querySelector(".infoSliderArrow");
const sliderBarActive = document.querySelector(".infoSliderBarActive");
const leftSection = document.querySelector(".left-section");
const tryBtn = document.querySelector(".tryBtn");

const containerAbout = document.querySelector(".containerAbout");
const aboutFiles = document.querySelectorAll(".aboutFile");

const navbarBar = document.querySelector(".navbarBar");
const home = document.querySelector(".navbarTop>span");
const navbarPage = document.querySelector(".navbarPage");

const introContainer = document.querySelector(".introContainer");
const infoScrollContent = document.querySelector(".infoScrollContent");

const hero = document.querySelector(".hero");

//? MISC
let score = [6, 7];
const displayScore = document.querySelectorAll(".score-section .score");
const buttonScore = document.querySelectorAll(".control-section button");

let scrollY = 0;
let ticking = false;
let needUpdate = true;
let mouseX = 0;
let mouseY = 0;
let lastTouchY = 0;

let diagonal = 0;

const FIELD_HEIGHT = 2000;
const FIELD_WIDTH = 4000;
const animaKeyframe = [0, 500, 1000, 2500, 4000];
const platform = () => navigator.userAgentData?.platform;
const cursorPlatform = ["Windows", "macOS", "Linux"];
const touchPlatform = ["Android", "iOS"];

const pages = ["about", "products", "contacts"];

let loading = JSON.parse(localStorage.getItem("loading")) || false;

document.addEventListener("DOMContentLoaded", async () => {
  //? setup start
  diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) + 100;

  document.documentElement.style.setProperty("--diagonal", `${diagonal}px`);

  // const lenCol = FIELD_WIDTH * 2
  const col = 24;
  const row = 8;
  const rangeDeg = 30;
  const viewerSize = 400;

  const alphaBusur = 90;
  const pBusur = (alphaBusur / 360) * 2 * Math.PI * (FIELD_WIDTH / 2);
  const tSegitiga = Math.sqrt(
    Math.PI * (FIELD_WIDTH / 2) ** 2 - (pBusur / 2) ** 2,
  );
  const tTembereng = FIELD_WIDTH / 2 - tSegitiga;

  const fragment = document.createDocumentFragment();

  for (let r = 0; r < row; r++) {
    const odd = r % 2 == 1;
    const dynamicCol = col - (odd ? 1 : 0);

    for (let c = 0; c < dynamicCol; c++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      svg.setAttribute("width", viewerSize);
      svg.setAttribute("height", viewerSize);
      svg.setAttribute("viewBox", "0 0 100 100");

      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");

      use.setAttribute("href", `#char${randint(1, 9)}`);

      svg.appendChild(use);

      const x =
        (c - dynamicCol / 2) * viewerSize + (odd ? viewerSize / 8 : 0) + "px";
      const y = r * ((viewerSize * 3) / 8) + "px";

      const transform = `
      rotateY(
        ${((rangeDeg * 2 * (c + 1)) / dynamicCol - rangeDeg) * -1}deg
      )
      translateZ(
        ${
          ((tTembereng * -1 * 0.5) / 50) * (c + 1 - dynamicCol / 2) ** 2 -
          r * 200
        }px
      )
    `;
      svg.style.cssText = `
      filter: brightness(${0.3 + row * 0.05 - 0.05 * (r + 1)});
      left:${x};
      bottom:${y};
      transform:${transform};
      `;

      fragment.appendChild(svg);
    }
  }

  viewer.appendChild(fragment);
  //? setup end

  if (loading) setLoading();
  updateScroll();

  [...loadingWrapper.children].forEach((item) => {
    item.style.transitionDuration =
      Math.max(window.innerHeight, window.innerWidth) / 1500 + "s";
  });

  // overlay.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", (e) => {
    if (e.key == "t") {
      toggleLoading();
    }
  });

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

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

      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      scrollY += deltaY;
      needUpdate = true;
      lastTouchY = touchY;

      limitScroll();
    },
    { passive: false },
  );

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // if (cursorPlatform.includes(platform()))
    needUpdate = true;
  });

  buttonScore.forEach((btn, index) => {
    btn.addEventListener("click", () =>
      handleScoreMisc(index % 2 == 0, index > 1),
    );
  });
  [...navbarPage.children].forEach((btn, index) => {
    btn.addEventListener("click", () => {
      location.hash = `/${btn.innerText.toLowerCase()}`;
      goTo()
    });
  });
  home.addEventListener("click", () => {
    location.hash = "/";
    scrollY = 0;
    needUpdate = true;
  });

  navbarBar.addEventListener("click", toggleNavbar);
  tryBtn.addEventListener("click", () => {
    scrollY = 1000;
    needUpdate = true;
  });

  await intro();
  if (location.hash.length > 0) goTo();
});

function ease(target) {
  scrollY += (target - scrollY) * 0.1;
}

function goTo() {
  const hash = location.hash.slice(2);
  console.log(hash);

  if (hash == "tentang") ease(4000);

  if (pages.includes(hash)) needUpdate = true;
}

async function intro() {
  return new Promise((resolve) => {
    setTimeout(() => {
      introContainer.style.transition = "all 1s ease-in";
      introContainer.style.height = 0;

      resolve();
    }, 1000);
  });
}

function toggleNavbar(e) {
  if ([...e.currentTarget.classList].includes("active"))
    e.currentTarget.classList.remove("active");
  else e.currentTarget.classList.add("active");
}

function handleScoreMisc(negative, team) {
  team = Number(team);

  console.log(team);
  if (score[team] == 0 && negative) return;

  score[team] += negative ? -1 : 1;
  displayScore[team].innerText = score[team];
}

function limitScroll() {
  const maxScroll = animaKeyframe[animaKeyframe.length - 1];

  if (scrollY < 0) scrollY = 0;
  if (scrollY > maxScroll) scrollY = maxScroll;
}

function updateScroll() {
  if (needUpdate) {
    animate();
    needUpdate = false;
  }

  requestAnimationFrame(updateScroll);
}

function setLoading() {
  console.log(loading);
  [...loadingWrapper.children].forEach((item) => {
    item.style.height = loading
      ? Math.max(window.innerHeight * 3, window.innerWidth * 3) + "px"
      : 0;
  });
}
function toggleLoading() {
  loading = !loading;
  localStorage.setItem("loading", loading);
  [...loadingWrapper.children].forEach((item) => {
    item.style.height = loading
      ? Math.max(window.innerHeight * 3, window.innerWidth * 3) + "px"
      : 0;
  });
}

function animate() {
  let animaL;
  let animaR;

  const halfWidth = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;

  // if (cursorPlatform.includes(platform()) || !!platform())
  content.style.transform = `translate(${(20 * (mouseX - halfWidth)) / halfWidth}px, ${(20 * (mouseY - halfHeight)) / halfHeight}px)`;

  const key = animaKeyframe.findIndex(
    (_, i) => scrollY >= animaKeyframe[i] && scrollY <= animaKeyframe[i + 1],
  );
  let hideView;

  infoScrollContent.style.opacity = key < 1 ? 1 : 0;
  leftSection.style.opacity = key < 1 ? 1 : 0;

  animaL = (target) =>
    linear(target, animaKeyframe[key], animaKeyframe[key + 1]);
  animaR = (start) =>
    reverseLinear(start, animaKeyframe[key], animaKeyframe[key + 1]);
  
  slider.style.opacity = key == 2 ? 1 : 0;
  sliderArrow.style.top =
  key >= 2 && key <= 3 ? (key == 3 ? "100%" : `${animaL(100)}%`) : 0;
  sliderBarActive.style.height =
    key >= 2 && key <= 3 ? (key == 3 ? "100%" : `${animaL(100)}%`) : 0;
    
    fieldWrapper.style.transform = `translateZ(
      ${styleValue(45, animaL, {
        baseValue: 25,
      divider: 100,
      negative: true,
    })}
  )
  rotateX(-2deg)
  rotateY(
    ${styleValue(20, animaR, {
      isDivide: false,
      unit: "deg",
    })}
    )
    translateX(
      ${styleValue(13, animaR)}
  )
  translateY(
    ${styleValue(3, animaR, {
      negative: true,
    })}
  )`;
  field.style.transform = `rotateX(90deg) 
  translateZ(calc(var(--height-field) / -2)) 
  translateY(calc(var(--height-field) * 0 / 10))`;
  page.style.transform = `translateZ(calc(var(--height-field) * -5 / 10))`;
  aboutFiles[0].style.top = 0
  
  if (key < 1) return;
  
  fieldWrapper.style.transform = `
  translateZ(
  ${styleValue(70, animaR, {
    negative: true,
    divider: 100,
  })}
  ) 
  rotateX(-${animaR(2)}deg) 
  rotateY(0deg) 
  translateX(0px) 
  translateY(0px)`;
  field.style.transform = `rotateX(90deg) 
  translateZ(
    ${FIELD_HEIGHT / -2}px
  ) 
  translateY(
    ${styleValue(5, animaL)}
  )`;
  page.style.transform = `translateZ(
    ${styleValue(5, animaR, {
      negative: true,
    })}
  )`;
  hero.style.borderColor = "rgba(255, 255, 255, 0.1)";
  //   if (getComputedStyle(viewer).display == "none" && key == 1) {
  //     viewer.style.display = "flex";
  //     if (hideView) clearTimeout(hideView);
  //   }
  // console.log(getComputedStyle(viewer).display, key)

  if (key < 2) return;

  //JEDA 1 FRAME
  fieldWrapper.style.transform = `
  rotateX(0deg) 
  rotateY(0deg) 
  translateX(0px) 
  translateY(0px)`;

  field.style.transform = `rotateX(90deg) 
  translateZ(
    ${FIELD_HEIGHT / -2}px
  ) 
  translateY(
    ${styleValue(5)}
  )`;
  page.style.transform = `translateZ(
    0px
  )`;
  hero.style.borderColor = `rgba(255, 255, 255, ${animaR(0.1)})`;
  // if (getComputedStyle(viewer).display == "flex" && key == 2)
  //   hideView = setTimeout(() => {
  //     viewer.style.display = "none";
  //   }, 1000);

  if (key < 3) return;

  aboutFiles[0].style.top = `-${animaL(window.innerHeight + 60)}px`
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
