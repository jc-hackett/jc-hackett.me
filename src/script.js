/* ===== Boot / Diagnostics ===== */
console.log("JS loaded");

/* ===== Menu Controller ===== */
(function menuController() {
  const options = Array.from(document.querySelectorAll(".menu-option"));
  const panels = Array.from(document.querySelectorAll(".menu-panel"));

  if (!options.length || !panels.length) return;

  function setActivePanel(index) {
    options.forEach((option, i) => {
      const isActive = i === index;
      option.classList.toggle("active", isActive);
      option.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel, i) => {
      const isActive = i === index;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  }

  const card = document.querySelector('.card');
const hour = new Date().getHours();

let x = 0;
let y = 12;

if (hour < 12) {
  x = -10;  // morning light from left
}
else if (hour < 17) {
  x = 0;    // midday overhead
}
else {
  x = 10;   // evening light from right
}

card.style.boxShadow = `${x}px ${y}px 28px rgba(0,0,0,0.18)`;

  options.forEach((option, index) => {
    option.addEventListener("click", function () {
      const isAlreadyOpen = option.classList.contains("active");

      if (isAlreadyOpen) {
        options.forEach((btn) => {
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
        });

        panels.forEach((panel) => {
          panel.classList.remove("active");
          panel.hidden = true;
        });

        return;
      }

      setActivePanel(index);
    });
  });

  panels.forEach((panel, index) => {
    panel.hidden = !panel.classList.contains("active");
    if (panel.classList.contains("active")) {
      options[index]?.classList.add("active");
      options[index]?.setAttribute("aria-selected", "true");
    }
  });
})();

/* ===== Consulting Form: Inline Success State ===== */
(function consultFormController() {
  const form = document.querySelector(".consult-form");
  const capture = document.querySelector(".consult-capture");
  const success = document.querySelector(".consult-success");

  if (!form || !capture || !success) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    capture.style.display = "none";
    success.hidden = false;

    requestAnimationFrame(() => {
      success.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
})();