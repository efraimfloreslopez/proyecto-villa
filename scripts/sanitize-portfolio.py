# -*- coding: utf-8 -*-
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

REPLACEMENTS = [
    ("San Miguel del Valle, Valle Verde", "Ciudad Demo, M\u00e9xico"),
    ("San Miguel del Valle", "Portal Institucional Municipal"),
    ("contacto@sanmiguel.gob.mx", "contacto@municipio.demo"),
    ("@sanmiguel.org", "@municipio.demo"),
    ("admin@sanmiguel.example.com", "admin@municipio.demo"),
    ("presidente@sanmiguel.org", "presidente@municipio.demo"),
    ("https://www.facebook.com/Ayuntamientosanmiguel/", "#"),
    ("https://www.facebook.com/Ayuntamientosanmiguel", "#"),
    ("https://www.youtube.com/channel/UCuLcX5jJCY_AJoNchGKFvvw", "#"),
    ("San Miguel Admin", "Admin Demo"),
    ("logo.png", "logo.svg"),
    ("Villa de Tezontepec", "el Municipio"),
    ("VILLA DE TEZONTEPEC", "EL MUNICIPIO"),
    ("San Miguel", "Portal Institucional Municipal"),
    ("villa_San Miguel", "municipio_demo"),
    ("VILLA_DE_San Miguel", "MUNICIPIO_DEMO"),
    ("../static/pdf/", "#demo-pdf"),
]

IMG_RE = re.compile(r"\.\./static/img/(?:Directorio_Municipal|Ayuntamiento)[^\"']+")
EXTS = (".html", ".js", ".css", ".md", ".json")

def main():
    count = 0
    for dirpath, _, files in os.walk(ROOT):
        if "node_modules" in dirpath or ".git" in dirpath:
            continue
        for fn in files:
            if not fn.endswith(EXTS):
                continue
            path = os.path.join(dirpath, fn)
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                content = f.read()
            new = content
            for old, new_val in REPLACEMENTS:
                new = new.replace(old, new_val)
            new = IMG_RE.sub("../static/img/user-placeholder.svg", new)
            if new != content:
                with open(path, "w", encoding="utf-8", newline="\n") as f:
                    f.write(new)
                count += 1
                print("Updated:", os.path.relpath(path, ROOT))
    print("Done.", count, "files updated.")

if __name__ == "__main__":
    main()
