#!/usr/bin/env bash
# ISHAYA — Build Integrity Gate (QA_QC_STANDARDS.md §0)
#
# Catches the classes of defect that `shopify theme check` does NOT detect:
#   0.1  empty / stub .liquid source files
#   0.2  {% render %} targets that are missing or empty
#   0.3  JSON template `order` keys with no matching `sections` entry, and
#        production templates still pointing at the Skeleton scaffold
#   0.4  section `type` values with no matching sections/<type>.liquid
#
# Usage:  bash bin/verify-theme.sh        (run from the theme root)
# Exits 0 when clean, 1 when any check fails.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

FAIL=0
pass() { printf '  \033[32mok\033[0m   %s\n' "$1"; }
fail() { printf '  \033[31mFAIL\033[0m %s\n' "$1"; FAIL=1; }

echo "ISHAYA Build Integrity Gate"
echo

# --- 0.1 empty / stub source files -------------------------------------------
echo "0.1  empty or stub .liquid files"
STUBS=$(find sections snippets -name '*.liquid' -size -200c 2>/dev/null | sort)
if [ -z "$STUBS" ]; then
  pass "no stub files under sections/ or snippets/"
else
  while IFS= read -r f; do fail "stub file ($(wc -c <"$f") bytes): $f"; done <<<"$STUBS"
fi
echo

# --- 0.2 render targets exist and are non-empty -------------------------------
echo "0.2  {% render %} / {% include %} targets"
TARGETS=$(grep -rhoE "(render|include)[[:space:]]+'[a-z0-9_-]+'" --include='*.liquid' . 2>/dev/null \
  | grep -oE "'[a-z0-9_-]+'" | tr -d "'" | sort -u)
MISSING=0
for s in $TARGETS; do
  if [ ! -s "snippets/$s.liquid" ]; then
    if [ -f "snippets/$s.liquid" ]; then
      fail "render target is EMPTY: snippets/$s.liquid"
    else
      fail "render target MISSING: snippets/$s.liquid"
    fi
    MISSING=1
  fi
done
[ "$MISSING" -eq 0 ] && pass "all $(echo "$TARGETS" | wc -w) render targets resolve"
echo

# --- 0.3 / 0.4 JSON template wiring ------------------------------------------
echo "0.3  JSON template order/sections wiring   0.4  section type files"
python - <<'PY'
import glob, json, os, re, sys

SCAFFOLD = {"hello-world", "custom-section"}
problems = []
checked = 0

for path in sorted(glob.glob("templates/*.json")) + sorted(glob.glob("sections/*-group.json")):
    raw = open(path, encoding="utf-8-sig").read()
    # Shopify allows /* */ comment headers in JSON templates
    body = re.sub(r"/\*.*?\*/", "", raw, flags=re.S)
    # Shopify's parser tolerates trailing commas in auto-generated group files
    body = re.sub(r",(\s*[}\]])", r"\1", body)
    try:
        data = json.loads(body)
    except json.JSONDecodeError as e:
        problems.append(f"{path}: invalid JSON ({e})")
        continue
    checked += 1
    sections = data.get("sections", {}) or {}
    order = data.get("order", []) or []

    for key in order:
        if key not in sections:
            problems.append(f"{path}: order key '{key}' has no matching entry in sections{{}} (section will never render)")

    for key, cfg in sections.items():
        stype = (cfg or {}).get("type")
        if not stype:
            problems.append(f"{path}: section '{key}' has no type")
            continue
        if not os.path.isfile(f"sections/{stype}.liquid"):
            problems.append(f"{path}: section '{key}' type '{stype}' has no sections/{stype}.liquid")
        if stype in SCAFFOLD:
            problems.append(f"{path}: section '{key}' still points at Skeleton scaffold '{stype}'")

    if order and sections and not any(k in order for k in sections):
        problems.append(f"{path}: no section in sections{{}} appears in order[] (page renders nothing)")

if problems:
    for p in problems:
        print(f"  \033[31mFAIL\033[0m {p}")
    sys.exit(1)
print(f"  \033[32mok\033[0m   {checked} JSON templates wired correctly")
PY
[ $? -ne 0 ] && FAIL=1
echo

if [ "$FAIL" -eq 0 ]; then
  printf '\033[32mBuild Integrity Gate passed.\033[0m Now run: shopify theme check\n'
else
  printf '\033[31mBuild Integrity Gate FAILED.\033[0m Fix the items above before marking any phase Done.\n'
fi
exit $FAIL
