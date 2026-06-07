# -*- coding: utf-8 -*-
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pat = re.compile(r'href="#demo-pdf[^"]*"')

for dirpath, _, files in os.walk(os.path.join(ROOT, "template")):
    for fn in files:
        if not fn.endswith(".html"):
            continue
        path = os.path.join(dirpath, fn)
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()
        new = pat.sub('href="#demo-pdf"', content)
        if new != content:
            with open(path, "w", encoding="utf-8", newline="\n") as f:
                f.write(new)
            print("Fixed:", os.path.relpath(path, ROOT))

print("PDF links normalized.")
