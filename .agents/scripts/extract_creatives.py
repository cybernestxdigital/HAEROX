import pymupdf
import os

pdf_path = "attached_assets/Desings_1786988983026.pdf"
out_dir = "artifacts/haerox/images/work"
os.makedirs(out_dir, exist_ok=True)

doc = pymupdf.open(pdf_path)

# Map: (page_index_0based, output_filename)
pages_to_extract = [
    (0,  "pandit-motors-azaadi.jpg"),   # Pandit Motors Independence Day
    (1,  "pandit-motors-trust.jpg"),    # Pandit Motors 25 Years of Trust
    (2,  "pandit-motors-service.jpg"),  # Pandit Motors Best Auto Service (landscape)
    (5,  "haerox-social-media.jpg"),    # HAEROX Social Media Management
    (6,  "haerox-struggle.jpg"),        # HAEROX Are You Still Struggling
    (7,  "audionic-speakers.jpg"),      # Audionic speakers (landscape)
    (10, "lucid-focused.jpg"),          # LUCID Fuel for the Focused Mind
    (11, "lucid-vision.jpg"),           # LUCID Your vision amplified
    (13, "lucid-gaming.jpg"),           # LUCID Gaming Hitbox
    (14, "lucid-can.jpg"),              # LUCID Can product shot
    (15, "jai-durga.jpg"),              # Jai Durga Electronics (landscape)
    (16, "khaleesi.jpg"),               # Khaleesi Drogo editorial
    (17, "lenskart.jpg"),               # Lenskart Make an Impression
    (18, "labour-day.jpg"),             # BJP Labour Day
    (19, "osho.jpg"),                   # OSHO Life begins
]

for page_idx, filename in pages_to_extract:
    page = doc[page_idx]
    # zoom=2 gives ~144 DPI - good quality, reasonable file size
    pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2))
    out_path = os.path.join(out_dir, filename)
    # Save as JPEG with 85% quality for web optimization
    pix.save(out_path, jpg_quality=85)
    size_kb = os.path.getsize(out_path) // 1024
    print(f"  {filename}: {pix.width}x{pix.height}px, {size_kb}KB")

doc.close()
print(f"\nExtracted {len(pages_to_extract)} creatives to {out_dir}")
