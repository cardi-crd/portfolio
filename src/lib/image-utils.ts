// Image optimization utilities

// Preload critical images
export const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Generate optimized image sizes for responsive design
export const getImageSizes = (containerWidth: number) => {
  if (containerWidth <= 640) return '100vw'; // mobile
  if (containerWidth <= 1024) return '50vw';  // tablet
  return '33vw'; // desktop
};

// Lazy loading threshold
export const LAZY_LOAD_THRESHOLD = 0.1; // 10% of viewport

// Image quality settings
export const IMAGE_QUALITY = {
  thumbnail: 60,
  preview: 75,
  full: 85,
  high: 95
};

// Placeholder blur data URL (tiny base64 encoded image)
export const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

/**
 * Safely normalizes image paths to prevent double-encoding issues
 * @param src - The image source path
 * @returns A clean, normalized path string
 */
export function normalizeImagePath(src: string): string {
  if (!src || typeof src !== 'string') {
    console.warn('Invalid image src:', src);
    return '';
  }

  // Decode any existing URL encoding first
  let decoded = src;
  try {
    decoded = decodeURIComponent(src);
  } catch (e) {
    // If decodeURIComponent fails, use the original
    console.warn('Failed to decode image src:', src);
  }

  // Clean up the path - remove any leading/trailing whitespace
  let clean = decoded.trim();
  
  // Remove any leading slashes and normalize
  clean = clean.replace(/^\/+/, '');
  
  // If it's already a full path starting with images/, use it as-is
  if (clean.startsWith('images/')) {
    return `/${clean}`;
  }
  
  // If it's just a filename, prepend images/
  if (!clean.includes('/')) {
    return `/images/${clean}`;
  }
  
  // If it doesn't start with images/ but has a path, prepend images/
  if (!clean.startsWith('images/')) {
    return `/images/${clean}`;
  }
  
  // Otherwise, ensure it starts with /
  return clean.startsWith('/') ? clean : `/${clean}`;
}

/**
 * Validates if an image path is safe to use
 * @param src - The image source path
 * @returns true if the path is valid and safe
 */
export function isValidImagePath(src: string): boolean {
  if (!src || typeof src !== 'string') return false;
  
  const normalized = normalizeImagePath(src);
  
  // Check for basic path safety
  if (normalized.includes('..') || normalized.includes('//')) return false;
  
  // Ensure it's a local path (starts with /) or a valid URL
  if (!normalized.startsWith('/') && !normalized.startsWith('http')) return false;
  
  return true;
}
