import { intro, introStatus } from "../../components/navbar.js";

const form = document.querySelector(".contentForm");

let scrollY = 0;
let needUpdate = true;

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
const animaKeyframe = desktopPlatforms.includes(platform())
  ? [0, 500, 1500, 2000]
  : [0, 500, 1500, 2000];

document.addEventListener("DOMContentLoaded", async () => {
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

  setup();

  await intro();
  updateScroll();
});

function setup() {
  // --- 1. DYNAMIC AUTO-RESIZING FOR INPUTS ---
  const inputs = document.querySelectorAll(
    '.madlib-input[type="text"], .madlib-input[type="email"]',
  );

  function resizeInput(el, first) {
    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "pre";
    tempSpan.style.font = window.getComputedStyle(el).font;

    tempSpan.textContent = el.value || el.placeholder;
    document.body.appendChild(tempSpan);

    const finalWidth = tempSpan.getBoundingClientRect().width;
    el.style.width = finalWidth + 16 + (first ? 16 : 0) + "px";

    document.body.removeChild(tempSpan);
  }

  inputs.forEach((input) => {
    resizeInput(input, true);
    input.addEventListener("input", () => resizeInput(input));
    input.addEventListener("propertychange", () => resizeInput(input));
  });

  // --- 2. CONDITIONAL DURATION LOGIC (1 DAY vs MULTIPLE DAYS) ---
  const durationType = document.getElementById("duration-type");
  const singleDateWrapper = document.getElementById("single-date-wrapper");
  const manualDurationWrapper = document.getElementById(
    "manual-duration-wrapper",
  );
  const singleDateInput = document.getElementById("single-date");
  const manualDurationInput = document.getElementById("manual-duration");

  durationType.addEventListener("change", () => {
    if (durationType.value === "1-day") {
      singleDateWrapper.classList.remove("hidden");
      manualDurationWrapper.classList.add("hidden");
      singleDateInput.setAttribute("required", "required");
      manualDurationInput.removeAttribute("required");
    } else {
      singleDateWrapper.classList.add("hidden");
      manualDurationWrapper.classList.remove("hidden");
      singleDateInput.removeAttribute("required");
      manualDurationInput.setAttribute("required", "required");
      resizeInput(manualDurationInput);
    }
    updateFormSteps();
  });

  // --- 3. PROGRESSIVE FORM LOCKING & BRACKET HIGHLIGHTS ---
  const senderName = document.getElementById("sender-name");
  const senderOrg = document.getElementById("sender-org");
  const projectType = document.getElementById("project-type");
  const projectLocation = document.getElementById("project-location");
  const senderEmail = document.getElementById("sender-email");
  const submitBtn = document.querySelector("#step-submit button");

  function checkValidity(input) {
    if (!input) return false;
    if (input.type === "email") {
      return input.checkValidity() && input.value.trim() !== "";
    }
    return input.value.trim() !== "";
  }

  function updateFormSteps() {
    const pipeline = [
      { current: document.getElementById("step-1"), input: senderName },
      { current: document.getElementById("step-2"), input: senderOrg },
      { current: document.getElementById("step-3"), input: projectType },
      { current: document.getElementById("step-4"), input: projectLocation },
      { current: document.getElementById("step-5"), input: durationType },
      {
        current: document.getElementById("step-6"),
        input:
          durationType.value === "1-day"
            ? singleDateInput
            : manualDurationInput,
      },
    ];

    let allPreviousValid = true;

    pipeline.forEach((step) => {
      const bracketWrapper = step.current.querySelector(".bracket-container");

      if (allPreviousValid) {
        step.current.classList.remove("opacity-20", "pointer-events-none");
        step.current.classList.add("opacity-100");

        const inputsInCurrent = step.current.querySelectorAll("input, select");
        inputsInCurrent.forEach((inp) => (inp.disabled = false));

        if (checkValidity(step.input)) {
          if (bracketWrapper) {
            bracketWrapper.classList.remove("text-zinc-600");
            bracketWrapper.classList.add("text-zinc-400");
          }
        } else {
          if (bracketWrapper) {
            bracketWrapper.classList.remove("text-zinc-400");
            bracketWrapper.classList.add("text-zinc-600");
          }
          allPreviousValid = false;
        }
      } else {
        step.current.classList.add("opacity-20", "pointer-events-none");
        step.current.classList.remove("opacity-100");

        const inputsInCurrent = step.current.querySelectorAll("input, select");
        inputsInCurrent.forEach((inp) => (inp.disabled = true));

        if (bracketWrapper) {
          bracketWrapper.classList.remove("text-zinc-400");
          bracketWrapper.classList.add("text-zinc-600");
        }
      }
    });

    const finalWrapper = document.getElementById("step-submit");
    if (allPreviousValid) {
      finalWrapper.classList.remove("opacity-20", "pointer-events-none");
      finalWrapper.classList.add("opacity-100");
      submitBtn.disabled = false;
    } else {
      finalWrapper.classList.add("opacity-20", "pointer-events-none");
      finalWrapper.classList.remove("opacity-100");
      submitBtn.disabled = true;
    }
  }

  const formInputs = [
    senderName,
    senderOrg,
    projectType,
    projectLocation,
    durationType,
    singleDateInput,
    manualDurationInput,
  ];
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      updateFormSteps();
      if (input.type === "text" || input.type === "email") {
        resizeInput(input);
      }
    });
    input.addEventListener("change", updateFormSteps);
  });

  // Jalankan inisialisasi awal penguncian progresif formulir
  updateFormSteps();

  // --- 4. FORM SUBMISSION & CUSTOM MODAL ---
  const form = document.getElementById("madlib-form");
  const modal = document.getElementById("success-modal");
  const modalCard = document.getElementById("modal-card");
  // const closeModalBtn = document.getElementById("close-modal-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("sender-name").value;
    const org = document.getElementById("sender-org").value;
    const project = document.getElementById("project-type").value;
    const location = document.getElementById("project-location").value;

    let durationText = "";
    if (durationType.value === "1-day") {
      const rawDate = singleDateInput.value;
      if (rawDate) {
        const dateObj = new Date(rawDate);
        durationText = `1 Hari (pada tanggal ${dateObj.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })})`;
      } else {
        durationText = "1 Hari";
      }
    } else {
      durationText = manualDurationInput.value || "Beberapa Hari";
    }

    const subject = encodeURIComponent(`Request ${projectType} di ${projectLocation}`);

    const body = encodeURIComponent(`
Halo! Nama saya ${senderName} saya berasal dari ${senderOrg}. Saya tertarik dengan layanan ${projectType}, kira-kira layanan ini akan kami digunakan di ${projectLocation}, selama ${durationType} yaitu pada tanggal ${durationType.value === "1-day" ? singleDateInput : manualDurationInput} dan saya berharap dapat berdiskusi lebih lanjut mengenai kebutuhan kami.

Terima kasih.
    `);

    window.location.href = `mailto:squhare@gmail.com?subject=${subject}&body=${body}`;

    // Munculkan Modal Sukses
  });
}

function updateScroll() {
  if (needUpdate) {
    animate();
    needUpdate = false;
  }

  requestAnimationFrame(updateScroll);
}

function limitScroll() {
  const maxScroll = animaKeyframe[animaKeyframe.length - 1];

  if (scrollY < 0) scrollY = 0;
  if (scrollY > maxScroll) scrollY = maxScroll;
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

  form.style.top = `${animaR(100)}vh`;
  form.style.transform = `scale(${0.8 + animaL(0.2)})`;
  form.style.borderRadius = "1rem";

  if (key < 1) return;
  form.style.top = 0;
  form.style.borderRadius = 0;
  form.style.transform = `scale(1)`;

  if (key < 2) return;
  form.style.top = `-${animaL(form.scrollHeight - window.innerHeight)}px`;
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
