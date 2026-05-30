const navbarBar = document.querySelector(".navbarBar");
const home = document.querySelector(".navbarTop>span");
const navbarPage = document.querySelector(".navbarPage");
const introContainer = document.querySelector(".introContainer");

export let introStatus = false;

document.addEventListener("DOMContentLoaded", () => {
  navbarBar.addEventListener("click", toggleNavbar);
  [...navbarPage.children].forEach((btn, index) => {
    btn.addEventListener("click", () => {
      goTo(btn.innerText.toLowerCase());
    });
  });
  home.addEventListener("click", () => goTo("home"))
});

function toggleNavbar(e) {
  if ([...e.currentTarget.classList].includes("active"))
    e.currentTarget.classList.remove("active");
  else e.currentTarget.classList.add("active");
}

async function goTo(loc) {
  await intro(false);
  if (loc == "home") window.location.href = "/";
  if (loc == "tentang") window.location.href = "about.html";
  if (loc == "layanan") window.location.href = "services.html";
}

export async function intro(isOpen = true) {
  return new Promise((resolve) => {
    if (!isOpen) introContainer.style.display = "flex";
    setTimeout(() => {
      introContainer.style.top = isOpen ? "100vh" : "0vh";

      setTimeout(() => {
        introStatus = isOpen;
        if (isOpen) introContainer.style.display = "none";
        resolve();
      }, 1200);
    }, isOpen ? 1000 : 100);
  });
}
