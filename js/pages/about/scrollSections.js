const whoWeAre = document.querySelector("#about-who-we-are");
const awwaHeading = document.querySelector("#awwa-heading");

const whatWeDo = document.querySelector("#about-what-we-do");
const awwdHeading = document.querySelector("#awwd-heading");
const dsCover = document.querySelector("#awwd-ds-cover");

const ah2Heading = document.querySelector("#ah2-heading");
const ah2QuoteCover = document.querySelector("#ah2-quote-cover");
const ah2Desc = document.querySelector("#ah2-desc");
const ah2cat1 = document.querySelector("#ah2-cat1");
const ah2cat2 = document.querySelector("#ah2-cat2");

const ah3Heading = document.querySelector("#ah3-heading");
const ah3Desc1 = document.querySelector("#ah3-desc-1");
const ah3Desc2 = document.querySelector("#ah3-desc-2");
const ah3Desc3 = document.querySelector("#ah3-desc-3");
const ah3Shuttlecock = document.querySelector("#ah3-shuttlecock");
const ah3Display = document.querySelector("#ah3-display");
const ah3Mintson = document.querySelector("#ah3-mintson");
const ah3Dt2 = document.querySelector("#ah3-dt2");

const ah4Heading = document.querySelector("#ah4-heading");
const ah4Desc1 = document.querySelector("#ah4-desc-1");
const ah4Desc2 = document.querySelector("#ah4-desc-2");
const ah4Desc3 = document.querySelector("#ah4-desc-3");
const ah4Racket = document.querySelector("#ah4-racket");

const ah5Heading = document.querySelector("#ah5-heading");
const ah5Desc1 = document.querySelector("#ah5-desc-1");
const ah5Desc2 = document.querySelector("#ah5-desc-2");
const ah5Desc3 = document.querySelector("#ah5-desc-3");

const ah6Heading = document.querySelector("#ah6-heading");
const ah6Desc1 = document.querySelector("#ah6-desc-1");
const ah6Desc2 = document.querySelector("#ah6-desc-2");
const ah6Desc3 = document.querySelector("#ah6-desc-3");
const ah6Desc4 = document.querySelector("#ah6-desc-4");
const ah6D1 = document.querySelector("#ah6-d-1");
const ah6D2 = document.querySelector("#ah6-d-2");
const ah6D3 = document.querySelector("#ah6-d-3");
const ah6D4 = document.querySelector("#ah6-d-4-in");

const ah7Heading = document.querySelector("#ah7-heading");
const ah7Desc1 = document.querySelector("#ah7-desc-1");
const ah7Desc2 = document.querySelector("#ah7-desc-2");
const ah7Desc3 = document.querySelector("#ah7-desc-3");
const ah7Bg = document.querySelector("#ah7-bg");

const ah8Heading = document.querySelector("#ah8-heading");
const ah8Quote = document.querySelector("#ah8-quote");
const ah8QuoteCover = document.querySelector("#ah8-quote-cover");
const ah8Desc1 = document.querySelector("#ah8-desc-1");
const ah8Desc2 = document.querySelector("#ah8-desc-2");
const ah8Desc3 = document.querySelector("#ah8-desc-3");

const ah9Heading = document.querySelector("#ah9-heading");
const ah9Quote = document.querySelector("#ah9-q");
const ah9Desc1 = document.querySelector("#ah9-desc-1");
const ah9Desc2 = document.querySelector("#ah9-desc-2");
const ah9Desc3 = document.querySelector("#ah9-desc-3");
const ah9Line = document.querySelector("#ah9-line");

const about = document.querySelector("#about");
const scrollContainer = document.querySelector(".scroll-container");
let inSection = window.pageYOffset / window.innerHeight;

window.addEventListener("scroll", () => {
  inSection = window.pageYOffset / window.innerHeight;
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
    ah2Heading.style.width = "34ch";
    ah2QuoteCover.style.transitionDelay = "0.25s";
    ah2QuoteCover.style.backdropFilter = "blur(0px)";
    ah2Desc.style.transitionDelay = "0.5s";
    ah2Desc.style.opacity = 1;
  } else {
    ah2Heading.style.width = "0ch";
    ah2QuoteCover.style.transitionDelay = "0s";
    ah2QuoteCover.style.backdropFilter = "blur(8px)";
    ah2Desc.style.transitionDelay = "0s";
    ah2Desc.style.opacity = 0;
  }

  if (inSection > 3.8 && inSection <= 4.5) {
    ah2cat1.style.bottom = "-50vh";
    ah2cat2.style.bottom = "-50vh";
  } else {
    ah2cat1.style.bottom = "-200vh";
    ah2cat2.style.bottom = "-125vh";
  }

  if (inSection > 4.5 && inSection <= 5.5) {
    ah3Heading.style.width = "31ch";
    ah3Desc1.style.transitionDelay = "0.25s";
    ah3Desc1.style.color = "var(--cloud)";
    ah3Desc2.style.transitionDelay = "0.5s";
    ah3Desc2.style.color = "var(--cloud)";
    ah3Desc3.style.transitionDelay = "0.75s";
    ah3Desc3.style.color = "var(--mint)";
  } else {
    ah3Heading.style.width = "0ch";
    ah3Desc1.style.transitionDelay = "0s";
    ah3Desc1.style.color = "var(--grass)";
    ah3Desc2.style.transitionDelay = "0s";
    ah3Desc2.style.color = "var(--grass)";
    ah3Desc3.style.transitionDelay = "0s";
    ah3Desc3.style.color = "var(--grass)";
  }

  if (inSection > 5.5 && inSection <= 6.5) {
    ah4Heading.style.width = "29ch";
    ah4Desc1.style.transitionDelay = "0.25s";
    ah4Desc1.style.opacity = 1;
    ah4Desc2.style.transitionDelay = "0.5s";
    ah4Desc2.style.opacity = 1;
    ah4Desc3.style.transitionDelay = "0.75s";
    ah4Desc3.style.opacity = 1;
  } else {
    ah4Heading.style.width = "0ch";
    ah4Desc1.style.transitionDelay = "0s";
    ah4Desc1.style.opacity = 0;
    ah4Desc2.style.transitionDelay = "0s";
    ah4Desc2.style.opacity = 0;
    ah4Desc3.style.transitionDelay = "0s";
    ah4Desc3.style.opacity = 0;
  }

  if (inSection > 6.5 && inSection <= 7.5) {
    ah5Heading.style.width = "34ch";
    ah5Desc1.style.transitionDelay = "0.25s";
    ah5Desc1.style.opacity = 1;
    ah5Desc2.style.transitionDelay = "0.5s";
    ah5Desc2.style.opacity = 1;
    ah5Desc3.style.transitionDelay = "0.75s";
    ah5Desc3.style.opacity = 1;
  } else {
    ah5Heading.style.width = "0ch";
    ah5Desc1.style.transitionDelay = "0s";
    ah5Desc1.style.opacity = 0;
    ah5Desc2.style.transitionDelay = "0s";
    ah5Desc2.style.opacity = 0;
    ah5Desc3.style.transitionDelay = "0s";
    ah5Desc3.style.opacity = 0;
  }

  if (inSection > 7.5 && inSection <= 8.5) {
    ah6Heading.style.width = "26ch";
    ah6Desc1.style.transitionDelay = "0.25s";
    ah6Desc1.style.opacity = 1;
    ah6Desc2.style.transitionDelay = "0.5s";
    ah6Desc2.style.opacity = 1;
    ah6Desc3.style.transitionDelay = "0.75s";
    ah6Desc3.style.opacity = 1;
    ah6Desc4.style.transitionDelay = "1s";
    ah6Desc4.style.opacity = 1;
    ah6D1.style.transitionDelay = "0s";
    ah6D1.style.height = "100vh";
    ah6D2.style.transitionDelay = "0.2s";
    ah6D2.style.width = "75vh";
    ah6D3.style.transitionDelay = "0.35s";
    ah6D3.style.height = "50vh";
    ah6D4.style.transitionDelay = "0.45s";
    ah6D4.style.width = "50vh";
  } else {
    ah6Heading.style.width = "0ch";
    ah6Desc1.style.transitionDelay = "0s";
    ah6Desc1.style.opacity = 0;
    ah6Desc2.style.transitionDelay = "0s";
    ah6Desc2.style.opacity = 0;
    ah6Desc3.style.transitionDelay = "0s";
    ah6Desc3.style.opacity = 0;
    ah6Desc4.style.transitionDelay = "0s";
    ah6Desc4.style.opacity = 0;
    ah6D1.style.transitionDelay = "0.35s";
    ah6D1.style.height = "0vh";
    ah6D2.style.transitionDelay = "0.2s";
    ah6D2.style.width = "0vh";
    ah6D3.style.transitionDelay = "0.1s";
    ah6D3.style.height = "0vh";
    ah6D4.style.transitionDelay = "0s";
    ah6D4.style.width = "0vh";
  }

  if (inSection > 8.5 && inSection <= 9.5) {
    ah7Heading.style.opacity = 1;
    ah7Desc1.style.transitionDelay = "0.25s";
    ah7Desc1.style.opacity = 1;
    ah7Desc2.style.transitionDelay = "0.5s";
    ah7Desc2.style.opacity = 1;
    ah7Desc3.style.transitionDelay = "0.75s";
    ah7Desc3.style.opacity = 1;
    ah7Bg.style.opacity = 0.3;
  } else {
    ah7Heading.style.opacity = 0;
    ah7Desc1.style.transitionDelay = "0s";
    ah7Desc1.style.opacity = 0;
    ah7Desc2.style.transitionDelay = "0s";
    ah7Desc2.style.opacity = 0;
    ah7Desc3.style.transitionDelay = "0s";
    ah7Desc3.style.opacity = 0;
    ah7Bg.style.opacity = 0;
  }

  if (inSection > 9.5 && inSection <= 10.5) {
    ah8Heading.style.opacity = 1;
    ah8Quote.style.opacity = 1;
    ah8Quote.style.transitionDelay = "0.5s";
    ah8QuoteCover.style.transitionDelay = "1s";
    ah8QuoteCover.style.backdropFilter = "blur(0px)";
    ah8Desc1.style.transitionDelay = "0.25s";
    ah8Desc1.style.opacity = 1;
    ah8Desc2.style.transitionDelay = "0.5s";
    ah8Desc2.style.opacity = 1;
    ah8Desc3.style.transitionDelay = "0.75s";
    ah8Desc3.style.opacity = 1;
  } else {
    ah8Heading.style.opacity = 0;
    ah8Quote.style.opacity = 0;
    ah8Quote.style.transitionDelay = "0s";
    ah8QuoteCover.style.transitionDelay = "0s";
    ah8QuoteCover.style.backdropFilter = "blur(8px)";
    ah8Desc1.style.transitionDelay = "0s";
    ah8Desc1.style.opacity = 0;
    ah8Desc2.style.transitionDelay = "0s";
    ah8Desc2.style.opacity = 0;
    ah8Desc3.style.transitionDelay = "0s";
    ah8Desc3.style.opacity = 0;
  }

  if (inSection > 10.5 && inSection <= 11.5) {
    ah9Heading.style.opacity = 1;
    ah9Quote.style.transitionDelay = "0.25s";
    ah9Quote.style.opacity = 1;
    ah9Desc1.style.transitionDelay = "0.5s";
    ah9Desc1.style.opacity = 1;
    ah9Desc2.style.transitionDelay = "0.75s";
    ah9Desc2.style.opacity = 1;
    ah9Desc3.style.transitionDelay = "1s";
    ah9Desc3.style.opacity = 1;
  } else {
    ah9Heading.style.opacity = 0;
    ah9Quote.style.transitionDelay = "0s";
    ah9Quote.style.opacity = 0;
    ah9Desc1.style.transitionDelay = "0s";
    ah9Desc1.style.opacity = 0;
    ah9Desc2.style.transitionDelay = "0s";
    ah9Desc2.style.opacity = 0;
    ah9Desc3.style.transitionDelay = "0s";
    ah9Desc3.style.opacity = 0;
  }

  if (inSection <= 4.5) {
    ah3Mintson.innerHTML = "SCOREPAPAN";
    ah3Display.style.opacity = 0;
    ah3Dt2.innerHTML = 0;
  } else if (inSection <= 5.5) {
    ah3Mintson.innerHTML = "SCOREPAPAN";
    ah3Display.style.opacity = 1;
    ah3Dt2.innerHTML = 0;
  } else if (inSection <= 6.5) {
    ah3Mintson.innerHTML = "NEOSCORE";
    ah3Display.style.opacity = 1;
    ah3Dt2.innerHTML = 0;
  } else if (inSection <= 7.5) {
    ah3Mintson.innerHTML = "NEOSCORE";
    ah3Display.style.opacity = 1;
    ah3Dt2.innerHTML = 1;
  } else {
    ah3Mintson.innerHTML = "NEOSCORE";
    ah3Display.style.opacity = 0;
    ah3Dt2.innerHTML = 1;
  }

  if (inSection <= 4.5) {
    ah3Shuttlecock.style.transform = "rotate(60deg)";
    ah3Shuttlecock.style.top = "-40vh";
    ah3Shuttlecock.style.right = "-80vw";
  } else if (inSection <= 5.5) {
    ah3Shuttlecock.style.transform = "rotate(60deg)";
    ah3Shuttlecock.style.top = "10vh";
    ah3Shuttlecock.style.right = "10vw";
  } else if (inSection <= 6.5) {
    ah3Shuttlecock.style.transform = "rotate(60deg)";
    ah3Shuttlecock.style.top = "40vh";
    ah3Shuttlecock.style.right = "60vw";
  } else {
    ah3Shuttlecock.style.transform = "rotate(-100deg)";
    ah3Shuttlecock.style.top = "80vh";
    ah3Shuttlecock.style.right = "-80vw";
  }

  if (inSection <= 5.5) {
    ah4Racket.style.bottom = "-80vh";
    ah4Racket.style.transform = "rotateZ(180deg) rotateY(180deg)";
  } else if (inSection <= 6.5) {
    ah4Racket.style.bottom = "-30vh";
    ah4Racket.style.transform = "rotateZ(40deg) rotateY(180deg)";
  } else {
    ah4Racket.style.bottom = "-80vh";
    ah4Racket.style.transform = "rotateZ(180deg) rotateY(180deg)";
  }

  if (inSection <= 2.5) {
    document.body.style.backgroundColor = "var(--mint)";
  } else if (inSection <= 6.5) {
    document.body.style.backgroundColor = "var(--grass)";
  } else if (inSection <= 9.5) {
    document.body.style.backgroundColor = "var(--squhare)";
  } else if (inSection <= 10.5) {
    document.body.style.backgroundColor = "var(--grass)";
  } else if (inSection <= 11.5) {
    document.body.style.backgroundColor = "var(--squhare)";
  } else {
    document.body.style.backgroundColor = "var(--cloud)";
  }

  if (inSection > 10.5 && inSection <= 12.5) {
    ah9Line.style.width = "100vw";
    ah9Line.style.opacity = 1;
  } else if (inSection > 12.5) {
    ah9Line.style.width = "100vw";
    ah9Line.style.opacity = 0;
  } else {
    ah9Line.style.width = "0vw";
    ah9Line.style.opacity = 0;
  }

  about.style.transform = `translateX(-${translateX}px)`;
});
