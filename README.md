# SDA Academy (Sobia Digital Academy)
Learn • Practice • Earn. A static landing page: HTML, CSS and vanilla JS only.

## Files
- `index.html`, `style.css`, `script.js`, `favicon.svg`
- `assets/images/hero.svg`: hero visual (600x480)
- `assets/images/canva-ai-course.svg`: Canva AI course card (600x480)
- `assets/images/about.svg`: About section (600x480)

## Replacing images
Add your own photo (JPG/WebP, about 1200x960, under 300 KB) to `assets/images/`, then change the `src` in `index.html` (e.g. `assets/images/canva-course.jpg`). Keep the `alt` text meaningful.

## Editing content
- Reviews: edit the `<figure class="tcard">` blocks in `index.html` (currently sample text; replace with real student feedback).
- Links: search `index.html` for `forms.gle` or `wa.me`.

## Deploy on GitHub Pages
1. Create a public repository on github.com (e.g. `sda-academy`).
2. Click **Add file > Upload files** and drag in everything in this folder, including the `assets` folder (keep `index.html` at the top level). Commit.
3. Go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. Wait 1-2 minutes. Your site opens at `https://YOUR-USERNAME.github.io/sda-academy/`.
5. To update: edit or upload files again and commit. The site refreshes within a minute or two.
