## Jeremiah Hackett Site

Eleventy-powered website for Jeremiah Hackett.

## Stack

- Eleventy 3.x
- Nunjucks layouts and includes
- Plain CSS and JavaScript
- Netlify deployment

## Commands

- `npm start`: run Eleventy in serve mode
- `npm run build`: generate the static site into `_site`
- `bash ERASMUS/Erasmus_REBUILD.sh`: rebuild the Erasmus kernel snapshot

## Project structure

- `src/`: site source
- `src/_layouts/`: shared page layouts
- `src/_includes/components/`: reusable content components
- `src/css/`: global and component styles
- `src/js/`: shared and page-specific scripts
- `ERASMUS/`: project memory, notes, and kernel rebuild tooling
- `scripts/`: helper scripts for local workflow

## Notes

- The homepage uses a disclosure-based interface with a small amount of dedicated CSS and JavaScript.
- Global disclosure behavior lives separately from homepage intro/reset behavior.
- Build output in `_site/` is generated and should not be edited directly.
