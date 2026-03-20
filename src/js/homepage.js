/* ===== Homepage Intro / Hidden Reset ===== */
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector("#services-intro");
  const servicesTop = document.querySelector('section[aria-label="Services"] > details');
  const topLevelDetails = Array.from(document.querySelectorAll(".disclosure-group > details"));
  const subItems = document.querySelectorAll(
    'section[aria-label="Services"] details.disclosure-item'
  );
  const reset = document.querySelector("#services-reset");
  const resetToggle = document.querySelector("#services-reset-toggle");

  if (!intro || !servicesTop || !reset || !resetToggle) return;

  let introLockedHidden = window.getComputedStyle(intro).display === "none";

  function syncResetState() {
    reset.classList.toggle("is-collapsed", introLockedHidden);
    resetToggle.classList.toggle("is-collapsed", introLockedHidden);
    resetToggle.tabIndex = introLockedHidden ? 0 : -1;
    resetToggle.setAttribute(
      "aria-label",
      introLockedHidden ? "Show service introduction" : "Hide service introduction"
    );
    resetToggle.setAttribute(
      "title",
      introLockedHidden ? "Show service introduction" : "Hide service introduction"
    );
  }

  function toggleIntro() {
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

    syncResetState();
  }

  function syncIntroFromTopLevelState() {
    const anyTopOpen = topLevelDetails.some((details) => details.open);

    if (anyTopOpen) {
      introLockedHidden = true;
      intro.style.display = "none";
    } else if (!introLockedHidden) {
      intro.style.display = "block";
    } else {
      intro.style.display = "none";
    }

    syncResetState();
  }

  syncIntroFromTopLevelState();

  servicesTop.addEventListener("toggle", () => {
    subItems.forEach((item) => {
      item.open = false;
    });
    syncIntroFromTopLevelState();
  });

  topLevelDetails.forEach((details) => {
    if (details === servicesTop) return;

    details.addEventListener("toggle", () => {
      syncIntroFromTopLevelState();
    });
  });

  resetToggle.addEventListener("click", () => {
    toggleIntro();
  });

  resetToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleIntro();
    }
  });
});