import fitz
import os

pdf_path = "attached_assets/Desings_1786988983026.pdf"
out_dir = ".agents/outputs/designs_pages"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {doc.page_count}")

# Render each page at zoom=1.5 (108 DPI) for quick preview
for i in range(doc.page_count):
    page = doc[i]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    out_path = f"{out_dir}/page_{i+1:02d}.png"
    pix.save(out_path)
    print(f"Page {i+1}: {page.rect.width:.0f}x{page.rect.height:.0f} pt -> {out_path}")

doc.close()
print("Done.")
