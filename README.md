# Free-image-compressor

A fast, privacy-first, client-side image compressor that runs entirely in your browser. Compress JPEG, PNG, and WebP images with adjustable quality and optional resizing—no uploads, no servers.

## Features

- **100% Client-Side**  
  All processing happens locally in your browser using the Canvas API. Your images never leave your device.

- **Multiple Formats**  
  Output to JPEG, PNG, or WebP depending on your use case.

- **Adjustable Quality**  
  Fine-grained quality control (0.1–1.0) to balance file size and visual fidelity.

- **Optional Resizing**  
  Set maximum width and/or height to automatically scale down large images.

- **Batch Processing**  
  Upload and compress multiple images at once.

- **ZIP Download**  
  Download all compressed images in a single ZIP file.

- **Responsive UI**  
  Professional dark-themed UI that works smoothly on mobile and desktop.

## Live Demo

If you host this repo (e.g., via GitHub Pages, Vercel, or Netlify), you can add a live demo link here:

- **Demo:** [[[https:github.io/jaiswarabhishek638/Image-compressor]](https://image-compressor-by-abhishek638.vercel.app/)]



## Tech Stack

- HTML5
- CSS3 (custom, no framework)
- Vanilla JavaScript (ES6+)
- [JSZip](https://github.com/Stuk/jszip) – for ZIP creation
- [FileSaver.js](https://github.com/eligrey/FileSaver.js) – for file downloads

## Usage

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Open `image-compressor-responsive.html` in any modern browser:
   - Double-click the file, or
   - Serve it via a local server (optional):
     ```bash
     # Using Python 3
     python -m http.server 8000

     # Then open http://localhost:8000
     ```

3. Drag & drop images or click the upload area.
4. Adjust format, quality, and optional max width/height.
5. Click **Compress All Images**.
6. Download individual images or all as a ZIP.

### Deploying to GitHub Pages

1. Go to your repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Save. Your site will be available at:
   ```text
  https://github.com/jaiswarabhishek638/Image-compressor
   ```

*(Optionally, rename `imagecompressor.html` to `index.html` for a cleaner URL.)*

## Project Structure

```text
.
├── imagecompressor.html  # Main application 
├── script.js             # script to initract with the files for the dynamic
├── style.js              # style the page  
├── README.md             # This file provide the details about the project

```

You can rename the HTML file to `index.html` if you want it to serve as the default page.

## Browser Support

Works on all modern browsers:

- Chrome / Edge (Chromium)
- Firefox
- Safari
- Opera

Requires support for:
- `canvas.toBlob()`
- `crypto.randomUUID()` (used for internal IDs; can be polyfilled if needed)

## Privacy & Security

- No images are uploaded to any server.
- No analytics, tracking, or external requests (besides CDN-loaded libraries for ZIP and file saving).
- All compression happens in your browser memory.

If you want a fully offline version, you can:
1. Download `jszip.min.js` and `FileSaver.min.js`.
2. Host them locally and update the `<script>` tags to point to local files.

## Customization Ideas

You can extend this project by:

- Adding a light/dark theme toggle.
- Adding EXIF orientation handling for photos.
- Supporting AVIF output (where supported).
- Turning it into a PWA with offline support and install prompt.
- Integrating with a backend for server-side compression (if needed).

## License

This project is open source and available under the MIT License.

```text
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contributing

Contributions are welcome! Feel free to controbute for the video compressor:

- Open issues for bugs or feature requests.
- Submit pull requests with improvements or new features.
- Suggest UI/UX enhancements or accessibility fixes.

## Author

- Abhishek Jaiswar (https://github.com/jaiswarabhishek638/)
