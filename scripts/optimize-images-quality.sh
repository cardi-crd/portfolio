#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${1:-public/images}"
MAX_EDGE="${MAX_EDGE:-2560}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="backups/images-originals-${TIMESTAMP}"

if [[ ! -d "$ROOT_DIR" ]]; then
  echo "Directory not found: $ROOT_DIR" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"
echo "Backing up $ROOT_DIR -> $BACKUP_DIR ..."
cp -R "$ROOT_DIR" "$BACKUP_DIR/"

echo "Optimizing images in-place (quality-first, max long edge ${MAX_EDGE}px)..."
count_total=0
count_resized=0

while IFS= read -r -d '' file; do
  count_total=$((count_total + 1))

  dims=$(sips -g pixelWidth -g pixelHeight "$file" 2>/dev/null || true)
  width=$(printf '%s\n' "$dims" | awk '/pixelWidth:/ {print $2}')
  height=$(printf '%s\n' "$dims" | awk '/pixelHeight:/ {print $2}')

  if [[ -z "${width:-}" || -z "${height:-}" ]]; then
    echo "Skipping (could not read size): $file"
    continue
  fi

  long_edge=$width
  if (( height > width )); then
    long_edge=$height
  fi

  if (( long_edge > MAX_EDGE )); then
    echo "Resizing: $file (${width}x${height} -> max ${MAX_EDGE})"
    sips --resampleHeightWidthMax "$MAX_EDGE" "$file" >/dev/null
    count_resized=$((count_resized + 1))
  fi
done < <(find "$ROOT_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0)

echo "Done. Processed: $count_total, Resized: $count_resized"
echo "Backup saved at: $BACKUP_DIR"
