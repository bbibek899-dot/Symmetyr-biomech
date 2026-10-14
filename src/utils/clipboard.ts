/**
 * Universal clipboard utility with iOS Safari & in-app browser (Messenger/Instagram/TikTok) fallback.
 */
export const safeCopyToClipboard = async (text: string): Promise<boolean> => {
  if (!text) return false;

  // Attempt standard Clipboard API first
  if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to textarea legacy copy for iOS/in-app webviews
    }
  }

  // Robust fallback for iOS Safari and in-app webviews
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '-999999px';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.warn('Clipboard fallback failed:', err);
    return false;
  }
};
