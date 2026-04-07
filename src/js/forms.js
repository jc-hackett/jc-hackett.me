function loadCalEmbed(options) {
  const { selector, namespace, calLink } = options;
  const target = document.querySelector(selector);
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
    Cal("init", namespace, { origin: "https://app.cal.com" });

    Cal.ns[namespace]("inline", {
      elementOrSelector: selector,
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: true
      },
      calLink
    });

    Cal.ns[namespace]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view"
    });
  }, 200);
}

function keepDetailsSummaryInView(details) {
  const summary = details?.querySelector(":scope > summary");
  if (!summary) return;

  const scrollSummaryToTop = () => {
    const top = summary.getBoundingClientRect().top + window.scrollY - 18;
    window.scrollTo({ top, behavior: "smooth" });
  };

  scrollSummaryToTop();
  window.setTimeout(scrollSummaryToTop, 350);
  window.setTimeout(scrollSummaryToTop, 1200);
}

function encodeForm(form) {
  return new URLSearchParams(new FormData(form)).toString();
}

async function postNetlifyForm(data) {
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data).toString()
  });

  if (!res.ok) throw new Error("Netlify form submission failed");
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
  const form = document.querySelector('form[name="consultation"]');
  const capture = document.querySelector(".consult-capture");
  const success = document.querySelector(".consult-success");
  const intro = document.querySelector(".consult-intro");
  const header = document.querySelector("#contact-me > summary");

  if (!form || !capture || !success) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      const wantsNewsletter = form.querySelector('input[name="subscribe-newsletter"]')?.checked;
      const email = form.querySelector('input[name="email"]')?.value?.trim();
      const message = form.querySelector('textarea[name="message"]')?.value?.trim() || "";

      if (!email) throw new Error("Email is required");

      await postNetlifyForm({
        "form-name": "consultation",
        email,
        message
      });

      if (wantsNewsletter && email) {
        await postNetlifyForm({
          "form-name": "newsletter",
          email,
          subscribe: "on",
          source: "consultation"
        });
      }

      if (intro) intro.style.display = "none";

      capture.hidden = true;
      success.hidden = false;

      if (header) {
        header.textContent = "Schedule a Consult";
      }

      loadCalEmbed({
        selector: "#my-cal-inline-consultation",
        namespace: "consultation",
        calLink: "jchackett/consultation"
      });
    } catch (err) {
      console.error(err);
      window.alert("There was a problem sending your message. Please try again.");
    }
  });
})();

(function schedulePageController() {
  const details = document.querySelector("#schedule-a-session");
  const options = {
    selector: "#my-cal-inline-session",
    namespace: "psychotherapySession",
    calLink: "jchackett/psychotherapy-session"
  };

  if (!details || details.tagName !== "DETAILS") {
    loadCalEmbed(options);
    return;
  }

  if (details.open) {
    loadCalEmbed(options);
    return;
  }

  details.addEventListener("toggle", function () {
    if (!details.open) return;

    loadCalEmbed(options);
    keepDetailsSummaryInView(details);
  });
})();

(function newsletterFormController() {
  const form = document.querySelector('form[name="newsletter"]');
  const capture = document.querySelector(".newsletter-capture");
  const success = document.querySelector(".newsletter-success");

  if (!form || !capture || !success) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      await postNetlifyForm(new FormData(form));

      capture.style.display = "none";
      success.hidden = false;
    } catch (err) {
      console.error(err);
      window.alert("There was a problem subscribing. Please try again.");
    }
  });
})();