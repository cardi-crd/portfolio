// lib/normalizeImageSrc.ts
export function normalizeImageSrc(src: string | undefined | null): string | null {
  if (!src || typeof src !== 'string') return null;
  // decode in case something upstream already encoded it
  let s = decodeURIComponent(src.trim());
  // if it's a full URL (remote), return as-is
  if (/^https?:\/\//i.test(s)) return s;
  // ensure it starts with a single leading slash
  if (!s.startsWith('/')) s = '/' + s;
  // collapse double slashes except protocol
  s = s.replace(/\/{2,}/g, '/');
  return s;
}
