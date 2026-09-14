import os, math
from PIL import Image, ImageDraw, ImageFont

def draw_arab_emblem(draw, x, y, w, h):
    # Elegant Golden Arab / Middle East Regional Emblem
    cx, cy = x + w // 2, y + h // 2
    r = min(w, h) // 2 - 2
    
    draw.ellipse([(cx - r, cy - r), (cx + r, cy + r)], outline=(249, 115, 22, 255), width=2)
    draw.arc([(cx - r, cy - r // 2), (cx + r, cy + r // 2)], start=0, end=180, fill=(212, 160, 23, 220), width=1)
    draw.arc([(cx - r, cy - r // 2), (cx + r, cy + r // 2)], start=180, end=360, fill=(212, 160, 23, 220), width=1)
    draw.polygon([
        (cx, cy - 6), (cx + 2, cy - 2), (cx + 6, cy), (cx + 2, cy + 2),
        (cx, cy + 6), (cx - 2, cy + 2), (cx - 6, cy), (cx - 2, cy - 2)
    ], fill=(255, 215, 0, 255))

def create_front_cover():
    width, height = 1400, 2000
    # Rich Deep Royal Navy Blue (كحلي ملكي واضح وفخم)
    img = Image.new('RGBA', (width, height), (22, 44, 90, 255))
    draw = ImageDraw.Draw(img)

    # 1. Rich Deep Royal Navy Gradient Background (#1C3670 down to #122652)
    for y in range(height):
        ratio = y / height
        r = int(28 * (1 - ratio) + 18 * ratio)
        g = int(54 * (1 - ratio) + 38 * ratio)
        b = int(112 * (1 - ratio) + 82 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # 2. Top Header Banner in Deep Rich Brand Orange
    banner_h = 320
    for y in range(banner_h):
        ratio = y / banner_h
        r = int(245 * (1 - ratio) + 230 * ratio)
        g = int(105 * (1 - ratio) + 80 * ratio)
        b = int(18 * (1 - ratio) + 10 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    draw.line([(0, banner_h), (width, banner_h)], fill=(194, 65, 12, 255), width=4)

    # Fonts
    font_bold = "C:/Windows/Fonts/arialbd.ttf"
    font_reg = "C:/Windows/Fonts/arial.ttf"
    font_segoe_b = "C:/Windows/Fonts/segoeuib.ttf" if os.path.exists("C:/Windows/Fonts/segoeuib.ttf") else font_bold

    f_head_title = ImageFont.truetype(font_segoe_b, 82)
    f_head_sub = ImageFont.truetype(font_bold, 40)
    f_pill = ImageFont.truetype(font_bold, 34)
    f_main_title = ImageFont.truetype(font_segoe_b, 158)
    f_cambridge = ImageFont.truetype(font_bold, 68)
    f_bullet = ImageFont.truetype(font_bold, 42)
    f_bottom_left = ImageFont.truetype(font_bold, 46)
    f_bottom_right = ImageFont.truetype(font_bold, 42)

    # Header Text
    draw.text((75, 75), "IG Made Easy", fill=(10, 20, 42, 255), font=f_head_title)
    draw.text((75, 195), "English · International Curriculum", fill=(20, 32, 54, 255), font=f_head_sub)

    # Top Right Pill Badge
    pill_w, pill_h = 510, 92
    pill_x, pill_y = width - pill_w - 75, 75
    draw.rounded_rectangle([(pill_x, pill_y), (pill_x + pill_w, pill_y + pill_h)], radius=46, fill=(255, 255, 255, 255))
    draw.text((pill_x + 32, pill_y + 24), "Ages 10-15 | Middle East", fill=(10, 20, 42, 255), font=f_pill)

    # Hinge crease (realistic hardback book groove)
    draw.line([(52, 0), (52, height)], fill=(0, 0, 0, 140), width=5)
    draw.line([(57, 0), (57, height)], fill=(255, 255, 255, 35), width=2)

    # 3. Main Title "Made Easy" in pure crisp white with drop shadow
    bbox_title = draw.textbbox((0, 0), "Made Easy", font=f_main_title)
    tw = bbox_title[2] - bbox_title[0]
    tx, ty = (width - tw) // 2, 485
    draw.text((tx + 3, ty + 6), "Made Easy", fill=(0, 0, 0, 180), font=f_main_title)
    draw.text((tx, ty), "Made Easy", fill=(255, 255, 255, 255), font=f_main_title)

    # 4. Subtitle "Cambridge IG style" in rich vibrant orange
    bbox_sub = draw.textbbox((0, 0), "Cambridge IG style", font=f_cambridge)
    sw = bbox_sub[2] - bbox_sub[0]
    draw.text(((width - sw) // 2, 675), "Cambridge IG style", fill=(249, 115, 22, 255), font=f_cambridge)

    # 5. Photorealistic Mascot Sphere matching Image 2
    cx, cy, r = width // 2, 1030, 240
    # Ambient ground shadow beneath sphere
    draw.ellipse([(cx - 200, cy + r - 15), (cx + 200, cy + r + 48)], fill=(4, 8, 18, 230))

    # Mascot sphere with rich warm orange gradient (like Image 2)
    for rad in range(r, 0, -1):
        ratio = 1 - (rad / r)
        mr = int(234 + (251 - 234) * ratio)
        mg = int(88 + (150 - 88) * ratio)
        mb = int(12 + (60 - 12) * ratio)
        ox = int(ratio * 28)
        oy = int(ratio * 28)
        draw.ellipse([(cx - rad - ox, cy - rad - oy), (cx + rad - ox, cy + rad - oy)], fill=(mr, mg, mb, 255))

    # Subtle blush circles on cheeks
    blush_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    blush_draw = ImageDraw.Draw(blush_img)
    blush_draw.ellipse([(cx - 165, cy + 30), (cx - 95, cy + 95)], fill=(244, 63, 94, 90))
    blush_draw.ellipse([(cx + 95, cy + 30), (cx + 165, cy + 95)], fill=(244, 63, 94, 90))
    img = Image.alpha_composite(img, blush_img)
    draw = ImageDraw.Draw(img)

    # Specular clearcoat highlight on sphere
    hl_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    hl_draw = ImageDraw.Draw(hl_img)
    hl_draw.ellipse([(cx - 150, cy - 180), (cx - 30, cy - 55)], fill=(255, 255, 255, 120))
    hl_draw.ellipse([(cx - 118, cy - 145), (cx - 62, cy - 88)], fill=(255, 255, 255, 200))
    img = Image.alpha_composite(img, hl_img)
    draw = ImageDraw.Draw(img)

    # Eyes matching Image 2
    def draw_eye(ex, ey):
        draw.ellipse([(ex - 50, ey - 50), (ex + 50, ey + 50)], fill=(255, 255, 255, 255))
        draw.ellipse([(ex - 34, ey - 34), (ex + 34, ey + 34)], fill=(20, 10, 4, 255))
        # Pupils specular gleam
        draw.ellipse([(ex - 20, ey - 24), (ex - 4, ey - 8)], fill=(255, 255, 255, 255))
        draw.ellipse([(ex + 8, ey + 6), (ex + 18, ey + 16)], fill=(255, 255, 255, 220))

    draw_eye(cx - 84, cy - 18)
    draw_eye(cx + 84, cy - 18)

    # Cheerful warm smile
    draw.arc([(cx - 44, cy + 12), (cx + 44, cy + 62)], start=20, end=160, fill=(67, 20, 7, 255), width=11)

    # 6. Feature Bullets
    bullets = [
        "Simple explanations for today's generation",
        "Practice exams and model answers included",
        "The #1 Arab Alternative to costly imports"
    ]
    by = 1360
    for b in bullets:
        draw.rounded_rectangle([(120, by + 6), (152, by + 38)], radius=6, fill=(249, 115, 22, 255))
        draw.text((180, by), b, fill=(255, 255, 255, 255), font=f_bullet)
        by += 85

    # 7. Bottom Brand Line
    draw.line([(120, 1820), (width - 120, 1820)], fill=(255, 255, 255, 40), width=2)
    draw.text((120, 1860), "IG Made Easy Books", fill=(249, 115, 22, 255), font=f_bottom_left)
    draw.text((790, 1860), "The Arab Alternative", fill=(255, 255, 255, 255), font=f_bottom_right)
    draw_arab_emblem(draw, 1220, 1858, 48, 48)

    img.save("book-cover-3d.png", quality=98)
    print("Saved darkened, rich book-cover-3d.png")

def create_spine():
    width, height = 260, 2000
    # Rich Deep Royal Navy Blue (كحلي واضح)
    img = Image.new('RGBA', (width, height), (20, 42, 88, 255))
    draw = ImageDraw.Draw(img)

    for x in range(width):
        ratio = x / width
        curve = math.sin(ratio * math.pi)
        shade_b = int(curve * 32)
        shade_g = int(curve * 16)
        shade_r = int(curve * 8)
        draw.line([(x, 0), (x, height)], fill=(18 + shade_r, 38 + shade_g, 82 + shade_b, 255))

    # Top Orange header on spine
    draw.rectangle([(0, 0), (width, 320)], fill=(234, 88, 12, 255))
    draw.line([(0, 320), (width, 320)], fill=(194, 65, 12, 255), width=3)

    font_bold = "C:/Windows/Fonts/arialbd.ttf"
    f_spine = ImageFont.truetype(font_bold, 62)
    f_edition = ImageFont.truetype(font_bold, 36)

    # Mascot circle on top spine
    cx, cy = width // 2, 160
    draw.ellipse([(cx - 48, cy - 48), (cx + 48, cy + 48)], fill=(18, 38, 82, 255))
    draw.ellipse([(cx - 38, cy - 38), (cx + 38, cy + 38)], fill=(249, 115, 22, 255))
    draw.arc([(cx - 18, cy - 4), (cx + 18, cy + 20)], start=20, end=160, fill=(18, 38, 82, 255), width=5)

    # Vertical Spine Title
    txt_img = Image.new('RGBA', (1200, 180), (0, 0, 0, 0))
    txt_draw = ImageDraw.Draw(txt_img)
    txt_draw.text((40, 45), "IG Made Easy   •   Cambridge Style", fill=(255, 255, 255, 255), font=f_spine)
    rotated = txt_img.rotate(90, expand=True)
    img.paste(rotated, (width // 2 - rotated.width // 2, 520), rotated)

    # Bottom orange stripe with Arab Edition Emblem
    draw.rectangle([(0, height - 160), (width, height)], fill=(234, 88, 12, 255))
    draw_arab_emblem(draw, 35, height - 110, 44, 44)
    draw.text((95, height - 105), "Arab Ed.", fill=(255, 255, 255, 255), font=f_edition)

    img.save("book-spine-3d.png", quality=98)
    print("Saved rich royal navy book-spine-3d.png")

def create_back_cover():
    width, height = 1400, 2000
    # Rich Deep Royal Navy Blue (كحلي ملكي)
    img = Image.new('RGBA', (width, height), (20, 42, 88, 255))
    draw = ImageDraw.Draw(img)

    for y in range(height):
        ratio = y / height
        r = int(26 * (1 - ratio) + 16 * ratio)
        g = int(50 * (1 - ratio) + 36 * ratio)
        b = int(106 * (1 - ratio) + 78 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    draw.rectangle([(0, 0), (width, 42)], fill=(234, 88, 12, 255))

    font_bold = "C:/Windows/Fonts/arialbd.ttf"
    font_reg = "C:/Windows/Fonts/arial.ttf"
    f_title = ImageFont.truetype(font_bold, 60)
    f_desc = ImageFont.truetype(font_reg, 42)
    f_badge = ImageFont.truetype(font_bold, 44)

    draw.text((120, 160), "IG Made Easy — The #1 Arab Alternative", fill=(255, 255, 255, 255), font=f_title)

    draw.rounded_rectangle([(120, 300), (width - 120, 760)], radius=32, fill=(28, 56, 116, 215), outline=(249, 115, 22, 180), width=3)
    bullets = [
        "100% Cambridge IGCSE Curriculum Match",
        "Save over 85% compared to expensive imported books",
        "Comprehensive practice tests & model answer keys",
        "Tailored for students across Egypt and the Middle East"
    ]
    by = 360
    for b in bullets:
        draw.rounded_rectangle([(170, by + 6), (198, by + 34)], radius=6, fill=(249, 115, 22, 255))
        draw.text((225, by), b, fill=(241, 245, 249, 255), font=f_desc)
        by += 96

    draw.rounded_rectangle([(120, 850), (width - 120, 1020)], radius=85, fill=(234, 88, 12, 255))
    bbox = draw.textbbox((0, 0), "World-Class Quality — Accessible Middle East Price", font=f_badge)
    bw = bbox[2] - bbox[0]
    draw.text(((width - bw) // 2, 908), "World-Class Quality — Accessible Middle East Price", fill=(255, 255, 255, 255), font=f_badge)

    bx, by, bw, bh = width - 580, height - 350, 460, 230
    draw.rounded_rectangle([(bx, by), (bx + bw, by + bh)], radius=18, fill=(255, 255, 255, 255))
    x = bx + 35
    while x < bx + bw - 35:
        bar_w = 7 if math.sin(x * 0.4) > 0 else 3
        draw.rectangle([(x, by + 25), (x + bar_w, by + bh - 60)], fill=(0, 0, 0, 255))
        x += bar_w + 5
    draw.text((bx + 62, by + bh - 46), "ISBN 978-977-08-1234-5", fill=(0, 0, 0, 255), font=ImageFont.truetype(font_reg, 24))

    draw.text((120, height - 210), "IG Made Easy Publishing House", fill=(148, 163, 184, 255), font=f_desc)
    draw.text((120, height - 140), "Cairo & Dubai Hubs", fill=(100, 116, 139, 255), font=f_desc)

    img.save("book-back-3d.png", quality=98)
    print("Saved book-back-3d.png")

def create_pages():
    width, height = 1024, 256
    img = Image.new('RGBA', (width, height), (248, 250, 252, 255))
    draw = ImageDraw.Draw(img)

    for y in range(2, height - 2, 3):
        col = (203, 213, 225, 255) if y % 6 == 0 else (226, 232, 240, 255)
        draw.line([(0, y), (width, y)], fill=col, width=1)

    for x in range(60):
        alpha = int(75 * (1 - x / 60))
        draw.line([(x, 0), (x, height)], fill=(0, 0, 0, alpha))

    img.save("book-pages-3d.png", quality=95)
    print("Saved book-pages-3d.png")

create_front_cover()
create_spine()
create_back_cover()
create_pages()
