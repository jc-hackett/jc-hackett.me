
---
## FILE: README.md
---
# Website 2 (Seed Kernel README)

## Project Rules (MUST FOLLOW)

1. Always give the entire chunk of code in css file or html file from comment markers (e.g., `/* ===== Lists ===== */`).
2. “Create a kernel” = prepare the exit document: seed another LLM, flag unresolved problems, inquire about next tasks.
3. Do not begin without three source files: **index**, **styles**, **base**.
4. Always include all the rules at the start of a seeding document.

## What this project is

A minimal static site built with **Eleventy (11ty)** and deployed via **Netlify**. Source is edited locally, committed, and pushed to `main`, which triggers Netlify to run Eleventy and publish `_site`. Static assets (CSS/JS/images) are passed through directly, keeping deploys deterministic and easy to roll back via Git history.

## How it’s structured

* **base**: the shared Eleventy layout (HTML skeleton, fonts, wrapper/card layout). Injects page content via `{{ content | safe }}`.
* **index**: the homepage content (front matter + HTML/Markdown). Typically sets `layout: base.njk` and a `title`.
* **styles**: a single handwritten `styles.css` containing the site’s typography/layout rules. It is organized into sections using comment markers (e.g., `/* ===== Lists ===== */`).

When editing CSS or HTML, always return the full section from the relevant comment marker boundaries.

## Key UI elements

* Typography-first centered layout with rules (`hr` / `.blue-rule`)
* FAQ accordions using `details/summary`
* Two-column insurance list
* Prominent external “follow” button (e.g., Bluesky)
* Optional small JS for UX polish (e.g., scroll into view when FAQ opens)

## Known risks / things to verify

* **Encoding artifacts** may appear (smart quotes/em dashes/copyright). Ensure UTF-8 and clean punctuation in real source files.
* The base template may reference classes (e.g., `.card`, `.site-title`) that are missing from `styles.css`. Confirm markup ↔ CSS alignment.

## Next tasks for the next LLM

1. Do not begin until the user provides current **index**, **styles**, and **base**.
2. Implement requested UI/content changes while keeping the stack minimal (Eleventy + single CSS + light JS).
3. Preserve the “return full chunk from comment markers” rule for any CSS/HTML edits.

---
## FILE: styles.css
---
/* ===== Variables / Base ===== */
:root{
  --paper:#f4f1ea;
  --ink:#1f1e1c;
  --rule:#d8d2c7;
  --blue:#1f4ed8;
  --muted:rgba(31,30,28,.65);
  --btn:#5f7fd9;
  --btn-hover:#4f71d3;
}

*{box-sizing:border-box}

body{
  margin:0;
  background:var(--paper);
  color:var(--ink);
  font:21px/1.75 "EB Garamond",Georgia,serif;
}

.wrapper{
  max-width:560px;
  margin:4rem auto;
  padding:3rem 2.5rem;
  border:1px solid rgba(31,78,216,.18);
  border-radius:6px;
  box-shadow:0 0 0 6px rgba(31,78,216,.06),0 8px 24px rgba(0,0,0,.06);
}

/* ===== Typography / Rules ===== */
h1,.sub,.faq-group>summary{
  font-family:"Linux Libertine","EB Garamond",serif;
  font-variant-caps:small-caps;
  text-align:center;
  margin-top:2.5rem;
  font-weight:600;
  margin-bottom:.75rem;
}

h1{font-size:2.5rem;letter-spacing:.085em}
.sub,.faq-group>summary{letter-spacing:.4em}

hr,.blue-rule{
  border:0;
  border-top:2px solid var(--blue);
  margin:1.5rem 0;
}

.section-break{
  border:0;
  border-top:4px solid var(--blue);
  margin:4rem 0;
}

/* generic button (used inside panel) */
.btn{
  display:inline-block;
  background:#2f6df6;
  padding:.85rem 1.1rem;
  color:#fff;
  text-decoration:none;
  border-radius:10px;
  border:2px solid rgba(31,78,216,.25);
  font-size:18px;
  font-family:inherit;
  font-weight:600;
  font-variant-caps:normal;
  text-align:center;
  line-height:1.1;
}

.btn:hover{background:#2559d9}

/* Learn More: 3 buttons in columns, one shared panel below */
.learn-more-grid{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:1.25rem;
  margin-top:1.5rem;
  margin-bottom:1.25rem;
}

@media (max-width: 760px){
  .learn-more-grid{grid-template-columns:1fr}
}

.learn-more-toggle{
  appearance:none;
  border:2px solid rgba(31,78,216,.25);
  background:#2f6df6;
  color:#fff;

  border-radius:18px;
  padding:1.35rem 1.25rem;

  font:inherit;
  font-size:1.65rem;
  font-weight:700;
  line-height:1.15;

  cursor:pointer;
  text-align:center;
}

.learn-more-toggle:hover{background:#2559d9}

.learn-more-toggle[aria-expanded="true"]{
  outline:0;
  box-shadow:0 0 0 4px rgba(31,78,216,.20);
}

/* shared panel area */
.learn-more-panels{
  margin-top:.5rem;
}

.learn-more-panel{
  display:none;
  border:2px solid rgba(31,78,216,.25);
  border-radius:18px;
  padding:1.25rem 1.35rem 1.35rem;
  background:rgba(255,255,255,.25);
  text-align:left;
}

.learn-more-panel.is-active{display:block}

.learn-more-panel p{
  margin:.25rem 0 1rem;
}

a{color:inherit;text-underline-offset:3px}
a:hover{opacity:.75}

/* ===== Details / FAQ ===== */
summary{list-style:none;cursor:pointer;margin:0;padding:0}
summary::-webkit-details-marker{display:none}

.faq-group{
  display:block;
}

.faq-item{
  border:2px solid var(--blue);
  border-radius:6px;
  margin:1rem 0;
  padding:.4rem .75rem;
  font-size:1.1rem;
}

.faq-item>summary{
  display:block;
  padding:.6rem 1.25rem;
  font-size:1.3rem;
  font-weight:500;
}

.faq-item>*:not(summary){padding:0 1.25rem}

.faq-item[open]>summary{
  border-bottom:2px solid rgba(31,78,216,.25);
  margin-bottom:.75rem;
}

.faq-item img{
  display:block;
  width:100%;
  margin:.75rem auto 1rem;
  border-radius:6px;
} 
/* ===== Footer ===== */
.site-footer{text-align:center;margin-top:3rem;opacity:.65}
.site-footer p{font-size:20px}
.site-footer .crafted{font-style:italic;max-width:250px;margin:30px auto 0}
---
## FILE: index.md
---
---
title: Jeremiah Hackett
layout: base.njk
---

<div class="sub">Clinical Social Worker</div>

<hr class="blue-rule">

<p>
I work with college students and young professionals. My clients are typically concerned about their relationships, behaviors, thoughts and moods.

For some, talking can really help.

Counseling gives us a chance to speak without hesitation or fear of recrimination.
  There aren't many spaces where we're allowed to be fully (and safely) candid with ourselves.
  This timeless process disrupts rigid and unhelpful ways of thinking. It facilitates a more humane (and humanizing) view of one's self — and others.
</p>

<hr class="blue-rule">

<p>I offer psychotherapy services in Maine and New York. My psychotherapy clients are mostly men, and many face legal problems. I contract with Headway to accept many major insurances.</p>

<p>I also offer clinically-informed consulting services (or 'coaching') to tradesmen, creatives, and developers. </p>

<p>Check out the content below, and reach out if you want to start a conversation. Thanks for stopping by. While you're here, feel free to subscribe to my newsletter </p>





<details class="faq-group">
  <summary>Learn More</summary>
  
  <details class="faq-item">
    <summary>Cost & Insurance</summary>

    <p>I contract with Headway to accept a variety of insurances:</p>

    <ul class="insurance-list">
      <li>Aetna</li>
      <li>Anthem BC/BS</li>
      <li>Cigna</li>
      <li>Oscar</li>
      <li>Oxford</li>
      <li>Point32 Healthcare</li>
      <li>United Healthcare</li>
    </ul>

    <p>
      To verify your coverage and learn how Headway works,
      <a href="https://care.headway.co/providers/jeremiah-hackett">click here</a>.
    </p>
  </details>

  <details class="faq-item">
    <summary>Psychotherapy vs Consulting?</summary>
    <p>Coming Soon</p>
  </details>


  <details class="faq-item">
    <summary>My Policies</summary>
    <p>Coming Soon</p>
  </details>


<details class="faq-item">
    <summary>About Me</summary>

    <p>I grew up in rural Maine in the 1980s, balancing long bike rides and my Nintendo. I studied writing and philosophy as an undergraduate, and taught high school English and history.

I earned my master’s in social work in 2012 and did clinical work in communities and residential settings in addition to supervising case managers. I entered private practice ten years ago.

Four years ago, I decided to specialize in the psychological development and sociocultural demands of men.

I still bike and game, though my tastes have evolved. I’m currently playing Hades 2.
    </p>
  </details>
</details> 

<!-- ===== Learn More Grid ===== -->
<div class="learn-more-grid" data-learn-more>
  <button class="learn-more-toggle" type="button" aria-expanded="false" aria-controls="lm-email" data-target="lm-email">
    Email me
  </button>

  <button class="learn-more-toggle" type="button" aria-expanded="false" aria-controls="lm-message" data-target="lm-message">
    Message me
  </button>

  <button class="learn-more-toggle" type="button" aria-expanded="false" aria-controls="lm-schedule" data-target="lm-schedule">
    Schedule
  </button>
</div>

<div class="learn-more-panels">
  <div class="learn-more-panel" id="lm-email" role="region" aria-label="Email me">
    <p>Questions, referrals, or availability.</p>
    <a class="btn" href="mailto:YOUR_EMAIL@DOMAIN.COM">Send an email</a>
  </div>

  <div class="learn-more-panel" id="lm-message" role="region" aria-label="Message me">
    <p>Short note or quick follow-up.</p>
    <a class="btn" href="YOUR_MESSAGE_LINK">Open messages</a>
  </div>

  <div class="learn-more-panel" id="lm-schedule" role="region" aria-label="Schedule">
    <p>Book a consult or session time.</p>
    <a class="btn" href="YOUR_SCHEDULING_LINK">View calendar</a>
  </div>
</div>
<!-- ===== /Learn More Grid ===== -->
---
## FILE: _layouts/base.njk
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>{{ title or "Page Title" }}</title>

  <link rel="stylesheet" href="/styles.css" />

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/linux-libertine-font@5.3.0/fonts/linux-libertine.css" />
</head>
<body>
  <!-- Outer layout wrapper (controls page centering + spacing) -->
  <div class="wrapper">

    <!-- Main content card (controls width, padding, visual frame) -->
    <main class="card">

      <!-- Site title rendered from page front matter -->
      <h1 class="site-title">{{ title }}</h1>



      <!-- Page-specific content injected by Eleventy -->
      {{ content | safe }}

    </main>
    <!-- Footer section -->
    <hr class="blue-rule">

    <footer class="site-footer">

      <!-- Copyright -->
      <p>© 2026 Jeremiah Hackett. All rights reserved.</p>

      <!-- Narrow centered crafted line -->
      <p class="crafted">
        This site was vibecrafted with ChatGPT 5.2, using <a href="https://www.11ty.dev/" target="_blank" rel="noopener noreferrer">
          Eleventy
        </a>
        and a quiet stack of open-source tools.
      </p>

    </footer>

  </div>

  <!-- Site-wide JavaScript -->
  <script defer src="/script.js"></script>
</body>
</html>
---
## FILE: .eleventy.js
---
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("script.js");

  // Copy src/images/* to _site/images/*
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
eleventyConfig.ignores.add("README.md");
  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
  };
};