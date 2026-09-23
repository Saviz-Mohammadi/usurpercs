// NOTE (SAVIZ):
// The only role of this file is to act as a listener interface that connects
// various elements to their designated functionality.

import { copyLinkToClipboard } from './share.js';

document.querySelectorAll('.share-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const url = button.dataset.url || window.location.href;
    copyLinkToClipboard(url);
  });
});
