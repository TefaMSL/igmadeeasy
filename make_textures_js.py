import base64, shutil

def get_b64(fname):
    with open(fname, 'rb') as f:
        return 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

content = 'window.BOOK_TEXTURES = {\n'
content += f'  cover: "{get_b64("book-cover-3d.png")}",\n'
content += f'  spine: "{get_b64("book-spine-3d.png")}",\n'
content += f'  back: "{get_b64("book-back-3d.png")}",\n'
content += f'  pages: "{get_b64("book-pages-3d.png")}"\n'
content += '};\n'

with open('3d-textures.js', 'w', encoding='utf-8') as out:
    out.write(content)

with open('react-app/public/3d-textures.js', 'w', encoding='utf-8') as out:
    out.write(content)

for fn in ['book-cover-3d.png', 'book-spine-3d.png', 'book-back-3d.png', 'book-pages-3d.png']:
    shutil.copy(fn, f'react-app/public/{fn}')

print('Successfully generated 3d-textures.js in root and react-app/public and copied pngs')
