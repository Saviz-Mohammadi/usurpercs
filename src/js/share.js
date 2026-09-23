// NOTE (SAVIZ):
// I am fully aware that there is a Web Share API for sharing, which can be
// found in the link below. However, I find this API to not be well supported
// at times and even fails to work properly in some cases.
// Link: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API'
// Sample usage in Markup:
/*
<button
  class="share-btn"
  type="button"
  data-url="https://example.com/"
>
  Copy link
</button>

<!-- This one copies the current page -->
<button class="share-btn" type="button">Copy this page's link</button>
*/

export const copyLinkToClipboard = async (url) => {
  if (!navigator.clipboard) {
    alert('Unable to copy link: Clipboard API not available.');
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  } catch (error) {
    alert(`Failed to copy link: ${error}`);
  }
};
