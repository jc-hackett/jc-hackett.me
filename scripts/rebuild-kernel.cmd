````sh
#!/bin/sh
set -eu

# ===== Erasmus Kernel Rebuild =====
# Exports the entire src tree + key config + Erasmus process files
# Writes a markdown kernel to ERASMUS/_kernels/

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

# ===== Temp file to track written files =====
written_list="$KERNEL_DIR/.kernel_written.tmp"
: > "$written_list"

already_written() {
  grep -Fqx "$1" "$written_list" 2>/dev/null || true
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

  if already_written "$rel"; then
    return 0
  fi

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

# ===== 1. Export entire src tree =====
find "$PROJECT_ROOT/src" -type f | sort | while IFS= read -r file; do
  append_file "$file"
done

# ===== 2. Export key project config =====
append_file "$PROJECT_ROOT/package.json"
append_file "$PROJECT_ROOT/.eleventy.js"
append_file "$PROJECT_ROOT/netlify.toml"
append_file "$PROJECT_ROOT/.gitignore"
append_file "$PROJECT_ROOT/.eleventyignore"
append_file "$PROJECT_ROOT/README.md"

# ===== 3. Export dev tooling =====
append_file "$PROJECT_ROOT/.vscode/tasks.json"
append_file "$PROJECT_ROOT/scripts/rebuild-kernel.cmd"
append_file "$PROJECT_ROOT/scripts/run-eleventy.cmd"

# ===== 4. Export Erasmus process files =====
append_file "$ERASMUS_DIR/Erasmus_README.md"
append_file "$ERASMUS_DIR/Erasmus-FEEDBACK.md"
append_file "$ERASMUS_DIR/Erasmus_REBUILD.sh"

# ===== Footer =====
{
  echo
  echo "---"
  echo
  echo "Kernel complete: $(basename "$OUT_FILE")"
  echo
} >> "$OUT_FILE"

rm -f "$written_list"

echo
echo "========================================"
echo "Kernel complete"
echo "Wrote: $OUT_FILE"
echo "========================================"
````
