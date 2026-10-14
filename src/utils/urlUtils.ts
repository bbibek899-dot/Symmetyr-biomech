/**
 * Utility to resolve the canonical public URL for sharing across
 * social media platforms (Facebook, Messenger, WhatsApp, Instagram, TikTok).
 */

export const OFFICIAL_LIVE_URL = 'https://bbibek899-dot.github.io/bibek-bhandari-sci-fund/';

export const getShareableCampaignUrl = (configuredUrl?: string): string => {
  if (configuredUrl && configuredUrl.trim() !== '') {
    return configuredUrl.trim();
  }

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const pathname = window.location.pathname;

    // If running directly on GitHub Pages:
    if (origin.includes('github.io')) {
      const full = `${origin}${pathname}`.replace(/\/+$/, '') + '/';
      return full;
    }

    // If running on custom domain (not cloud run preview, not localhost):
    if (
      !origin.includes('run.app') &&
      !origin.includes('localhost') &&
      !origin.includes('127.0.0.1') &&
      !origin.includes('webcontainer')
    ) {
      const full = `${origin}${pathname}`.replace(/\/+$/, '') + '/';
      return full;
    }
  }

  return OFFICIAL_LIVE_URL;
};

export const getDomainDisplay = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace('www.', '');
  } catch {
    return 'bbibek899-dot.github.io';
  }
};
