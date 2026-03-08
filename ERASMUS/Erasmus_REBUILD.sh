#!/bin/sh
set -eu

# ===== Erasmus Kernel Rebuild =====
# Lean export: only essential source, config, and process files.
# Writes a markdown kernel to ERASMUS/_kernels/.

# ===== Path anchors =====
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
ERASMUS_DIR="$SCRIPT_DIR"
PROJECT_ROOT="$(CDPATH= cd -- "$ERASMUS_DIR/.." && pwd)"
KERNEL_DIR="$ERASMUS_DIR/_kernels"

# ===== Output config =====
PREFIX="kernel-"
EXT=".md"

mkdir -p "$KERNEL_DIR"

# ===== Next kernel number =====
last_num=""
for f in "$KERNEL_DIR"/${PREFIX}[0-9][0-9][0-9][0-9]${EXT}; do
  [ -f "$f" ] || continue
  b="$(basename "$f")"
  n="$(printf "%s" "$b" | sed -n "s/^${PREFIX}\([0-9][0-9][0-9][0-9]\)${EXT}$/\1/p")"
  [ -n "$n" ] && last_num="$n"
done

if [ -z "${last_num:-}" ]; then
  next_num="0001"
else
  next_num="$(printf "%04d" $((10#$last_num + 1)))"
fi

OUT_FILE="$KERNEL_DIR/${PREFIX}${next_num}${EXT}"

# ===== Curated minimal file list =====
INCLUDE_FILES="
$PROJECT_ROOT/src/index.md
$PROJECT_ROOT/src/_layouts/base.njk
$PROJECT_ROOT/src/_includes/components/learn_more.njk
$PROJECT_ROOT/src/css/styles.css
$PROJECT_ROOT/src/css/components/learn-more.css
$PROJECT_ROOT/src/script.js
$PROJECT_ROOT/package.json
$PROJECT_ROOT/.eleventy.js
$PROJECT_ROOT/netlify.toml
$PROJECT_ROOT/.gitignore
$PROJECT_ROOT/.eleventyignore
$PROJECT_ROOT/README.md
$PROJECT_ROOT/.vscode/tasks.json
$PROJECT_ROOT/scripts/rebuild-kernel.cmd
$PROJECT_ROOT/scripts/run-eleventy.cmd
$ERASMUS_DIR/Erasmus_README.md
$ERASMUS_DIR/Erasmus-FEEDBACK.md
$ERASMUS_DIR/Erasmus_REBUILD.sh
"

# ===== Header =====
{
  echo "# ${PREFIX}${next_num} — Erasmus Project Snapshot"
  echo
  echo "Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || date)"
  echo
  echo "Project root: $PROJECT_ROOT"
  echo "Erasmus dir: $ERASMUS_DIR"
  echo
} > "$OUT_FILE"

written_list="$(mktemp)"
trap 'rm -f "$written_list"' EXIT

already_written() {
  grep -Fqx "$1" "$written_list" 2>/dev/null
}

mark_written() {
  printf "%s\n" "$1" >> "$written_list"
}

rel_path() {
  file="$1"
  case "$file" in
    "$PROJECT_ROOT"/*) printf "%s\n" "${file#"$PROJECT_ROOT"/}" ;;
    "$ERASMUS_DIR"/*)  printf "ERASMUS/%s\n" "${file#"$ERASMUS_DIR"/}" ;;
    *) printf "%s\n" "$file" ;;
  esac
}

append_file() {
  file="$1"
  [ -n "$file" ] || return 0

  rel="$(rel_path "$file")"
  already_written "$rel" && return 0

  if [ -f "$file" ]; then
    echo "Exporting: $rel"
    {
      echo
      echo "## FILE: $rel"
      echo
      echo '```'
      sed 's/\r$//' "$file"
      echo
      echo '```'
      echo
    } >> "$OUT_FILE"
  else
    echo "Missing:   $rel"
    {
      echo
      echo "## MISSING: $rel"
      echo
    } >> "$OUT_FILE"
  fi

  mark_written "$rel"
}

# ===== 1. Curated file list only =====
printf "%s\n" "$INCLUDE_FILES" | while IFS= read -r file; do
  [ -n "$file" ] || continue
  append_file "$file"
done

# ===== Footer =====
{
  echo
  echo "---"
  echo
  echo "Kernel complete: $(basename "$OUT_FILE")"
  echo
} >> "$OUT_FILE"

echo
echo "========================================"
echo "Kernel complete"
echo "Wrote: $OUT_FILE"
echo "========================================"