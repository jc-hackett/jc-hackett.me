/* ===== Boot / Diagnostics ===== */
console.log("JS loaded");

/* ===== Details Accordion: Smooth Scroll On Open ===== */
(function detailsSmoothScrollOnOpen() {
  document.querySelectorAll("details").forEach((el) => {
    el.addEventListener("toggle", () => {
      if (!el.open) return;

      // Wait for expansion to render, then scroll the opened <details> into view.
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = 24; // breathing room above

        window.scrollBy({
          top: rect.top - offset,
          behavior: "smooth",
        });
      });
    });
  });
})();

/* ===== Learn More: Single-Open Panel Toggle ===== */
(function learnMoreSingleOpen() {
  const grid = document.querySelector("[data-learn-more]");
  if (!grid) return;

  const root = grid.closest(".learn-more") || document;
  const toggles = Array.from(grid.querySelectorAll(".learn-more-toggle"));
  const panels = Array.from(root.querySelectorAll(".learn-more-panel"));

  function closeAll() {
    toggles.forEach((t) => t.setAttribute("aria-expanded", "false"));
    panels.forEach((p) => p.classList.remove("is-active"));
  }

// ===== Learn More: FAQ accordion (only one open at a time) =====
document.querySelectorAll(".learn-more").forEach((root) => {
  const items = Array.from(root.querySelectorAll("details.faq-item"));

  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return; // only act when one is opened

      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
});

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-target");
      const panel = root.querySelector(`#${CSS.escape(id)}`);
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      closeAll();

      if (!isOpen && panel) {
        btn.setAttribute("aria-expanded", "true");
        panel.classList.add("is-active");
      }
    });
  });
})();

/* ===== Learn More: FAQ Accordion + recenter when none open ===== */
(function learnMoreFaqAccordion() {
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".learn-more").forEach((root) => {
    const topBtn = root.querySelector(".learn-more-toggle");
    const items = Array.from(root.querySelectorAll("details.faq-item"));

    const centerOnTopButton = () => {
      if (!topBtn) return;
      topBtn.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    };

    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open) {
          // opening one closes all others
          items.forEach((other) => {
            if (other !== item) other.open = false;
          });
          return;
        }

        // closing: if none are open, recenter
        if (items.every((d) => !d.open)) centerOnTopButton();
      });
    });
  });
})();

/* ===== Learn More: reveal menu but keep button visible ===== */
(function learnMoreRevealMenuKeepButton() {
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".learn-more").forEach((root) => {
    const btn = root.querySelector(".learn-more-toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      requestAnimationFrame(() => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        if (!expanded) return;

        const pad = 16;
        const desiredBtnTop = 24; // px from top

        const rootRect = root.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        // how much the menu overflows below the viewport
        let delta = rootRect.bottom - (window.innerHeight - pad);
        if (delta <= 0) return;

        // cap scroll so the Learn More button stays visible
        const maxDelta = btnRect.top - desiredBtnTop;
        if (maxDelta <= 0) return;

        delta = Math.min(delta, maxDelta);

        window.scrollBy({
          top: delta,
          left: 0,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      });
    });
  });
})();