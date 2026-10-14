/**
 * Image resolution & processing helper for both local dev and production GitHub Pages.
 */

export const resolveImageUrl = (path?: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Handle GitHub Pages sub-path or base url
  const cleanPath = path.replace(/^\.\//, '').replace(/^\//, '');

  if (typeof window !== 'undefined' && window.location.origin.includes('github.io')) {
    return `/bibek-bhandari-sci-fund/${cleanPath}`;
  }

  return `/${cleanPath}`;
};

export const processImageFile = (
  file: File,
  maxWidth?: number,
  maxHeight?: number,
  quality: number = 0.9
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawData = e.target?.result as string;
      if (!maxWidth && !maxHeight) {
        return resolve(rawData);
      }

      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return resolve(rawData);
      }

      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (maxWidth && width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (maxHeight && height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(rawData);
        }

        ctx.drawImage(img, 0, 0, width, height);
        const resized = canvas.toDataURL('image/jpeg', quality);
        resolve(resized);
      };
      img.onerror = () => resolve(rawData);
      img.src = rawData;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
