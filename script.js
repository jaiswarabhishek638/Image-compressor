 const fileInput = document.getElementById('fileInput');
    const dropzone = document.getElementById('dropzone');
    const formatSelect = document.getElementById('formatSelect');
    const qualityRange = document.getElementById('qualityRange');
    const qualityValue = document.getElementById('qualityValue');
    const maxWidthInput = document.getElementById('maxWidth');
    const maxHeightInput = document.getElementById('maxHeight');
    const compressAllBtn = document.getElementById('compressAllBtn');
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    const gallery = document.getElementById('gallery');
    const emptyState = document.getElementById('emptyState');

    let filesState = []; // { id, file, imgElement, originalSize, compressedBlob?, status }

    qualityRange.addEventListener('input', () => {
      qualityValue.textContent = Number(qualityRange.value).toFixed(2);
    });

    // Dropzone click -> file input
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      handleFiles(Array.from(fileInput.files));
      fileInput.value = ''; // allow re-selecting same files
    });

    // Drag & drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, () => dropzone.classList.add('dragover'));
    });
    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, () => dropzone.classList.remove('dragover'));
    });
    dropzone.addEventListener('drop', e => {
      const dt = e.dataTransfer;
      const droppedFiles = Array.from(dt.files).filter(f => f.type.startsWith('image/'));
      handleFiles(droppedFiles);
    });

    function handleFiles(files) {
      if (!files.length) return;
      compressAllBtn.disabled = false;
      emptyState.style.display = 'none';

      files.forEach(file => {
        const id = crypto.randomUUID();
        const item = {
          id,
          file,
          imgElement: null,
          originalSize: file.size,
          compressedBlob: null,
          status: 'loaded'
        };
        filesState.push(item);
        renderCard(item);
        loadImageIntoCard(item);
      });
    }

    function renderCard(item) {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = item.id;

      const imageWrap = document.createElement('div');
      imageWrap.className = 'card-image-wrap';

      const img = document.createElement('img');
      imageWrap.appendChild(img);

      const meta = document.createElement('div');
      meta.className = 'card-meta';
      meta.innerHTML = `
        <div><strong>${escapeHtml(item.file.name)}</strong></div>
        <div>Original: ${(item.originalSize / 1024).toFixed(1)} KB</div>
        <div class="compression-info" style="display:none">Compressed: <span class="compressed-size">—</span></div>
      `;

      const actions = document.createElement('div');
      actions.className = 'card-actions';

      const compressBtn = document.createElement('button');
      compressBtn.textContent = 'Compress';
      compressBtn.addEventListener('click', () => compressItem(item));

      const downloadBtn = document.createElement('button');
      downloadBtn.textContent = 'Download';
      downloadBtn.className = 'secondary';
      downloadBtn.disabled = true;
      downloadBtn.addEventListener('click', () => {
        if (!item.compressedBlob) return;
        const ext = getExtensionForMime(item.compressedBlob.type);
        const nameBase = item.file.name.replace(/\.[^.]+$/, '');
        saveAs(item.compressedBlob, `${nameBase}_compressed.${ext}`);
      });

      actions.appendChild(compressBtn);
      actions.appendChild(downloadBtn);

      card.appendChild(imageWrap);
      card.appendChild(meta);
      card.appendChild(actions);

      gallery.appendChild(card);
      item.imgElement = img;
      item._compressBtn = compressBtn;
      item._downloadBtn = downloadBtn;
      item._compressedSizeEl = meta.querySelector('.compressed-size');
      item._compressionInfoEl = meta.querySelector('.compression-info');
    }

    function loadImageIntoCard(item) {
      const url = URL.createObjectURL(item.file);
      const img = item.imgElement;
      img.onload = () => URL.revokeObjectURL(url);
      img.src = url;
    }

    async function compressItem(item) {
      if (!item.imgElement) return;
      const btn = item._compressBtn;
      btn.disabled = true;
      btn.textContent = 'Compressing…';

      const format = formatSelect.value;
      const quality = parseFloat(qualityRange.value);
      const maxWidth = parseInt(maxWidthInput.value, 10) || null;
      const maxHeight = parseInt(maxHeightInput.value, 10) || null;

      const img = item.imgElement;
      let width = img.naturalWidth;
      let height = img.naturalHeight;

      if (maxWidth || maxHeight) {
        const ratio = Math.min(
          maxWidth ? maxWidth / width : Infinity,
          maxHeight ? maxHeight / height : Infinity
        );
        if (ratio < 1) {
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, format, quality);
      });

      item.compressedBlob = blob;
      item.status = 'compressed';

      // Update UI
      item._compressionInfoEl.style.display = 'block';
      item._compressedSizeEl.textContent = `${(blob.size / 1024).toFixed(1)} KB`;

      item._downloadBtn.disabled = false;
      downloadAllBtn.disabled = false;

      btn.textContent = 'Re-compress';
      btn.disabled = false;
    }

    compressAllBtn.addEventListener('click', async () => {
      const items = filesState.filter(i => i.imgElement);
      for (const item of items) {
        await compressItem(item);
      }
    });

    downloadAllBtn.addEventListener('click', async () => {
      const compressedItems = filesState.filter(i => i.compressedBlob);
      if (!compressedItems.length) return;

      const zip = new JSZip();
      compressedItems.forEach(item => {
        const ext = getExtensionForMime(item.compressedBlob.type);
        const nameBase = item.file.name.replace(/\.[^.]+$/, '');
        zip.file(`${nameBase}_compressed.${ext}`, item.compressedBlob);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'compressed_images.zip');
    });

    function getExtensionForMime(mime) {
      switch (mime) {
        case 'image/jpeg': return 'jpg';
        case 'image/png': return 'png';
        case 'image/webp': return 'webp';
        default: return 'bin';
      }
    }

    function escapeHtml(str) {
      return str
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

    document.getElementById('currentYear').textContent = new Date().getFullYear();