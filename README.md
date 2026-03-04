GIt Bash to generate kernel for LLM


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
