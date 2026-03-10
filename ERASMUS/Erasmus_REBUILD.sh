LOG_FILE="$KERNEL_DIR/kernel-build.log"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "--------------------------------"
echo "Kernel build started: $(date)"
echo "Project root: $PROJECT_ROOT"
echo "Log file: $LOG_FILE"
echo "--------------------------------"

#!/usr/bin/env bash
set -euo pipefail
trap 'echo "ERROR on line $LINENO"; exit 1' ERR

MAX_BYTES=50000

PROJECT_ROOT="$(pwd)"
ERASMUS_DIR="$PROJECT_ROOT/ERASMUS"
KERNEL_DIR="$ERASMUS_DIR/_kernels"

mkdir -p "$KERNEL_DIR"

OUT_FILE="$KERNEL_DIR/kernel-$(date +%Y%m%d-%H%M%S).md"

echo "Starting Erasmus kernel build..."
echo "Writing kernel to $OUT_FILE"

current_size() {
  wc -c < "$OUT_FILE" | tr -d ' '
}

can_fit() {
  local add_bytes="$1"
  local now
  now="$(current_size)"
  [ $((now + add_bytes)) -le "$MAX_BYTES" ]
}

append_text() {
  local text="$1"
  local bytes
  bytes=$(printf "%s" "$text" | wc -c | tr -d ' ')
  if can_fit "$bytes"; then
    printf "%s" "$text" >> "$OUT_FILE"
    return 0
  fi
  return 1
}

append_file() {
  local file="$1"
  local rel="${file#$PROJECT_ROOT/}"
  local tmp
  tmp="$(mktemp)"

  {
    printf "## FILE: %s\n\n" "$rel"
    printf '```\n'
    sed 's/\r$//' "$file"
    printf '\n```\n\n'
  } > "$tmp"

  local bytes
  bytes=$(wc -c < "$tmp" | tr -d ' ')

  if can_fit "$bytes"; then
    echo "Exporting $rel"
    cat "$tmp" >> "$OUT_FILE"
  else
    echo "Skipping $rel (size cap)"
    append_text "## SKIPPED: $rel\n\nSkipped to keep kernel under ${MAX_BYTES} bytes.\n\n"
  fi

  rm -f "$tmp"
}

is_text_file() {
  case "$1" in
    *.md|*.njk|*.html|*.css|*.js|*.json|*.toml|*.yml|*.yaml|*.sh|*.cmd|*.txt)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

{
  echo "# Erasmus Kernel Snapshot"
  echo "Generated: $(date)"
  echo "Project root: $PROJECT_ROOT"
  echo
  echo "Max size: ${MAX_BYTES} bytes"
  echo
} > "$OUT_FILE"

append_text "## DIRECTORY STRUCTURE\n\n\`\`\`\n"

find . \
  -path "./node_modules" -prune -o \
  -path "./_site" -prune -o \
  -path "./.git" -prune -o \
  -path "./ERASMUS/_kernels" -prune -o \
  -print | sed 's#^\./##' | while IFS= read -r line; do
    append_text "$line"$'\n' || break
  done

append_text "\`\`\`\n\n"

echo "Exporting src..."
find "$PROJECT_ROOT/src" -type f | sort | while IFS= read -r file; do
  is_text_file "$file" && append_file "$file"
done

echo "Exporting ERASMUS..."
find "$PROJECT_ROOT/ERASMUS" \
  -path "$PROJECT_ROOT/ERASMUS/_kernels" -prune -o \
  -type f -print | sort | while IFS= read -r file; do
    is_text_file "$file" && append_file "$file"
done

echo "Exporting root config..."
for file in \
  "$PROJECT_ROOT/.eleventy.js" \
  "$PROJECT_ROOT/.eleventyignore" \
  "$PROJECT_ROOT/netlify.toml" \
  "$PROJECT_ROOT/package.json" \
  "$PROJECT_ROOT/package-lock.json" \
  "$PROJECT_ROOT/.gitignore" \
  "$PROJECT_ROOT/README.md"
do
  [ -f "$file" ] && append_file "$file"
done

append_text "---\n\nKernel complete: $(basename "$OUT_FILE")\n"

echo
echo "Kernel written:"
echo "$OUT_FILE"
echo "Size: $(current_size) bytes"