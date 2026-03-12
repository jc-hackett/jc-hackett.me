function loadCalEmbed() {
  const target = document.querySelector("#my-cal-inline-consultation");
  if (!target || target.dataset.loaded === "true") return;

  target.dataset.loaded = "true";

  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;

    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;

      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }

      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];

        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }

        return;
      }

      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  setTimeout(() => {
    Cal("init", "consultation", { origin: "https://app.cal.com" });

    Cal.ns.consultation("inline", {
      elementOrSelector: "#my-cal-inline-consultation",
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: true
      },
      calLink: "jchackett/consultation"
    });

    Cal.ns.consultation("ui", {
      hideEventTypeDetails: false,
      layout: "month_view"
    });
  }, 200);
}

/* ===== Get Started Form Reveal ===== */
(function getStartedReveal() {
  const button = document.querySelector("#get-started-btn");
  const formBlock = document.querySelector("#get-started-form");

  if (!button || !formBlock) return;

  button.addEventListener("click", function () {
    formBlock.hidden = false;
    button.style.display = "none";
  });
})();

/* ===== Consulting Form: Inline Success State ===== */
(function consultFormController() {
  const form = document.querySelector(".consult-form");
  const capture = document.querySelector(".consult-capture");
  const success = document.querySelector(".consult-success");
  const intro = document.querySelector(".consult-intro");
  const header = document.querySelector("#contact-me > summary");

  if (!form || !capture || !success) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (intro) intro.style.display = "none";

    capture.hidden = true;
    success.hidden = false;

    if (header) {
      header.textContent = "SCHEDULE A CONSULT";
    }

    loadCalEmbed();
  });
})(); 