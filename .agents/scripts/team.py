import pymupdf
doc = pymupdf.open("attached_assets/Team_Haerox_1786988382701.pdf")
print("pages:", doc.page_count)
for i, page in enumerate(doc):
    print(i+1, page.rect, "images:", len(page.get_images(full=True)))
    page.get_pixmap(matrix=pymupdf.Matrix(1.5,1.5)).save(f".agents/outputs/team/page{i+1}.png")
    for k, img in enumerate(page.get_images(full=True)):
        d = doc.extract_image(img[0])
        open(f".agents/outputs/team/p{i+1}_img{k}.{d['ext']}","wb").write(d["image"])
        print("  img", k, d["ext"], d["width"], d["height"])
