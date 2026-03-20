/* ===== Top-Level Disclosure: One Open At A Time ===== */
(function disclosureController() {
  const groups = Array.from(document.querySelectorAll(".disclosure-group > details"));

  if (!groups.length) return;

  groups.forEach((group) => {
    group.addEventListener("toggle", function () {
      if (!group.open) return;

      groups.forEach((otherGroup) => {
        if (otherGroup !== group) {
          otherGroup.open = false;
        }
      });
    });
  });
})();

/* ===== Top-Level Header Focus ===== */
document.addEventListener("DOMContentLoaded", () => {
  const topDetails = document.querySelectorAll(".disclosure-group > details");
  const firstRule = document.querySelector("#services-reset");

  function scrollToTarget(el) {
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - 18;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  }

  topDetails.forEach((details) => {
    const summary = details.querySelector(":scope > summary");
    if (!summary) return;

    summary.addEventListener("click", () => {
      const willOpen = !details.open;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (willOpen) {
            scrollToTarget(summary);
          } else if (firstRule) {
            scrollToTarget(firstRule);
          }
        });
      });
    });
  });
});

