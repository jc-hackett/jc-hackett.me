#!/usr/bin/env bash
set -euo pipefail

dir="_kernels"
mkdir -p "$dir"

last="$(ls -1 "$dir"/kernel-*.md 2>/dev/null | sed -E 's/.*kernel-([0-9]+)\.md/\1/' | sort -n | tail -1 || true)"
if [ -z "${last:-}" ]; then next=1; else next=$((10#$last + 1)); fi

out="$(printf "%s/kernel-%04d.md" "$dir" "$next")"
: > "$out"

files=(
  "README.md"
  "styles.css"
  "index.md"
  "index.njk"
  "index.html"
  "_layouts/base.njk"
  "_includes/base.njk"
  "base.njk"
  ".eleventy.js"
)

for p in "${files[@]}"; do
  [ -f "$p" ] || continue
  {
    echo
    echo "---"
    echo "## FILE: $p"
    echo "---"
    cat "$p"
  } >> "$out"
done

echo "Wrote $out"
ls -la "$out"
