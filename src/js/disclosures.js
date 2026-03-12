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

/* ===== Services Intro / Hidden Reset ===== */
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector("#services-intro");
  const servicesTop = document.querySelector('section[aria-label="Services"] > details');
  const subItems = document.querySelectorAll(
    'section[aria-label="Services"] details.disclosure-item'
  );
  const reset = document.querySelector("#services-reset");

  if (!intro || !servicesTop || !reset) return;

  let introLockedHidden = true;

  servicesTop.addEventListener("toggle", () => {
    subItems.forEach((item) => {
      item.open = false;
    });

    if (servicesTop.open) {
      intro.style.display = "none";
    } else if (!introLockedHidden) {
      intro.style.display = "block";
    }
  });

  reset.addEventListener("click", () => {
    if (introLockedHidden) {
      introLockedHidden = false;
      intro.style.display = "block";
    } else {
      introLockedHidden = true;
      intro.style.display = "none";
    }

    servicesTop.open = false;

    subItems.forEach((item) => {
      item.open = false;
    });
  });
});
/* ===== Services Intro / Hidden Reset ===== */
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector("#services-intro");
  const servicesTop = document.querySelector('section[aria-label="Services"] > details');
  const subItems = document.querySelectorAll(
    'section[aria-label="Services"] details.disclosure-item'
  );
  const reset = document.querySelector("#services-reset");

  if (!intro || !servicesTop || !reset) return;

  let introLockedHidden = true;

  servicesTop.addEventListener("toggle", () => {
    subItems.forEach((item) => {
      item.open = false;
    });

    if (servicesTop.open) {
      intro.style.display = "none";
    } else if (!introLockedHidden) {
      intro.style.display = "block";
    }
  });

  reset.addEventListener("click", () => {
    if (introLockedHidden) {
      introLockedHidden = false;
      intro.style.display = "block";
    } else {
      introLockedHidden = true;
      intro.style.display = "none";
    }

    servicesTop.open = false;

    subItems.forEach((item) => {
      item.open = false;
    });
  });
});