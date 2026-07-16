const LEAD =
  "小さな手で、ねこの毎日をあたためる。\n保護猫ボランティアを、ここから。";

const brandEl = document.querySelector(".hero__brand");
const leadEl = document.getElementById("lead-text");
const cursorEl = document.querySelector(".hero__cursor");
const ctaEl = document.querySelector(".hero__cta");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function showBrand() {
  brandEl.classList.remove("is-pending");
  brandEl.classList.add("is-entering");
}

function showCta() {
  ctaEl.classList.remove("is-pending");
  ctaEl.classList.add("is-entering");
}

function revealLeadInstant() {
  leadEl.textContent = LEAD;
  cursorEl.classList.remove("is-on");
  cursorEl.classList.add("is-done");
  showCta();
}

async function typeLead() {
  leadEl.textContent = "";
  cursorEl.classList.add("is-on");

  await wait(1200);

  for (const char of LEAD) {
    leadEl.textContent += char;
    await wait(char === "\n" ? 420 : char === "、" || char === "。" ? 160 : 78);
  }

  await wait(500);
  cursorEl.classList.remove("is-on");
  cursorEl.classList.add("is-done");
  showCta();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Default: text is already in HTML (works without JS / if timers are throttled).
// Enhance with animation only when motion is allowed.
if (reduceMotion) {
  revealLeadInstant();
} else {
  brandEl.classList.add("is-pending");
  ctaEl.classList.add("is-pending");

  // Force-show if iOS Low Power Mode pauses CSS animations.
  window.setTimeout(() => {
    brandEl.classList.remove("is-pending");
    brandEl.style.opacity = "1";
    brandEl.style.transform = "none";
  }, 1800);

  requestAnimationFrame(() => {
    showBrand();
    typeLead().catch(revealLeadInstant);
  });

  // Absolute failsafe: never leave CTA invisible.
  window.setTimeout(() => {
    ctaEl.classList.remove("is-pending");
    ctaEl.style.opacity = "1";
    ctaEl.style.transform = "none";
  }, 8000);
}
