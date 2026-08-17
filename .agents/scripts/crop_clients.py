import pymupdf
doc = pymupdf.open("attached_assets/Clients_1786987904868.pdf")
names = [["parkblu","bcrest"],["gateway","niftem"],["ak","shakesbrew"],["spoton","panditmotors"]]
m = pymupdf.Matrix(3,3)
for i, page in enumerate(doc):
    w, h = page.rect.width, page.rect.height
    cells = [pymupdf.Rect(64, 64, w-64, h/2 - 28), pymupdf.Rect(64, h/2 + 28, w-64, h-64)]
    for j, r in enumerate(cells):
        page.get_pixmap(matrix=m, clip=r).save(f"artifacts/haerox/images/clients/{names[i][j]}.jpg")
print("ok")
