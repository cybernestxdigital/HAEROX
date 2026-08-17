import fitz
doc = fitz.open("attached_assets/Clients_1786987904868.pdf")
print("pages:", doc.page_count)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2,2))
    pix.save(f".agents/outputs/clients/page{i+1}.png")
    print(i+1, page.rect)
