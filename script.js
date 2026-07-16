const LEAD =
  "小さな手で、ねこの毎日をあたためる。\n保護猫ボランティアを、ここから。";

const leadEl = document.getElementById("lead-text");
const cursorEl = document.querySelector(".hero__cursor");
const ctaEl = document.querySelector(".hero__cta");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function revealLeadInstant() {
  leadEl.textContent = LEAD;
  cursorEl.classList.add("is-done");
  ctaEl.classList.add("is-visible");
}

async function typeLead() {
  cursorEl.classList.add("is-on");

  // Wait for brand entrance before typing
  await wait(1200);

  for (const char of LEAD) {
    leadEl.textContent += char;
    await wait(char === "\n" ? 420 : char === "、" || char === "。" ? 160 : 78);
  }

  await wait(500);
  cursorEl.classList.remove("is-on");
  cursorEl.classList.add("is-done");
  ctaEl.classList.add("is-visible");
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

if (reduceMotion) {
  revealLeadInstant();
} else {
  typeLead();
}
