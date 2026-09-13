import os, re

files = []
for root, dirs, filenames in os.walk("."):
    if "scratch" in root or ".git" in root:
        continue
    for f in filenames:
        if f.endswith((".html", ".css", ".js")):
            files.append(os.path.join(root, f))

img_refs = {}
pattern = re.compile(r'(?:src|href|url)\s*[:=]\s*["\']?([^"\'\)\s>]+\.(?:png|jpg|jpeg|webp|svg))', re.IGNORECASE)

for filepath in files:
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    for match in pattern.finditer(content):
        ref = match.group(1)
        if "assets/" in ref or "favicon/" in ref:
            img_refs.setdefault(ref, []).append(filepath)

print(f"Total unique image references: {len(img_refs)}")
for ref in sorted(img_refs.keys()):
    occ = img_refs[ref]
    basenames = [os.path.basename(p) for p in occ[:3]]
    more = f"... (+{len(occ)-3})" if len(occ) > 3 else ""
    print(f"{ref:<50} -> {len(occ)} files ({', '.join(basenames)}{more})")
