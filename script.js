(function () {
  const leadEl = document.getElementById("lead");
  if (!leadEl) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // iPhone / タッチ端末では最初から全文表示（消さない）
  if (reduceMotion || !isFinePointer) return;

  const source = leadEl.innerHTML;
  const parts = source.split(/(<br\s*\/?>)/i);
  leadEl.textContent = "";
  leadEl.classList.add("is-typing");

  const chars = [];

  parts.forEach((part) => {
    if (/^<br/i.test(part)) {
      leadEl.appendChild(document.createElement("br"));
      return;
    }

    Array.from(part).forEach((ch) => {
      if (ch === "\n" || ch === "\r") return;
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      leadEl.appendChild(span);
      chars.push(span);
    });
  });

  let index = 0;

  function tick() {
    if (index >= chars.length) {
      leadEl.classList.remove("is-typing");
      return;
    }

    const span = chars[index];
    span.classList.add("is-on");
    const ch = span.textContent;
    index += 1;

    const delay = ch === "、" || ch === "。" ? 160 : 70;
    window.setTimeout(tick, delay);
  }

  window.setTimeout(tick, 700);

  // 万一タイマーが止まっても全文を見える状態に戻す
  window.setTimeout(function () {
    chars.forEach(function (span) {
      span.classList.add("is-on");
    });
    leadEl.classList.remove("is-typing");
  }, 10000);
})();
