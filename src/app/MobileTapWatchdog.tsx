'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function killTopInterceptor() {
  const points = [
    { x: innerWidth / 2, y: innerHeight / 2 },
    { x: innerWidth / 2, y: 10 },
    { x: 10, y: innerHeight / 2 },
  ];
  for (const p of points) {
    let el = document.elementFromPoint(p.x, p.y) as HTMLElement | null;
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const full = r.width >= innerWidth && r.height >= innerHeight;
    const invisible = cs.opacity === '0' || cs.visibility === 'hidden';
    const hugeZ = Number(cs.zIndex) >= 1000 || cs.position === 'fixed';
    const isOverlay =
      invisible ||
      /backdrop|overlay|portal|modal|lightbox|pswp|yarl|swiper/i.test(
        el.className
      );
    if (full && hugeZ && cs.pointerEvents !== 'none' && isOverlay) {
      el.style.pointerEvents = 'none';
    }
  }
}

export default function MobileTapWatchdog() {
  const pathname = usePathname();

  useEffect(() => {
    const coarse =
      typeof window !== 'undefined' &&
      matchMedia('(pointer: coarse)').matches;
    if (!coarse) return;

    // body/touch locks often left by viewers
    document.body.style.overflow = '';
    document.body.classList.remove('no-scroll', 'modal-open', 'lenis-stopped');
    document.body.style.touchAction = '';
    (document.documentElement as HTMLElement).style.touchAction = '';

    // kill lingering overlays now and shortly after (catch exit animations)
    killTopInterceptor();
    const t1 = setTimeout(killTopInterceptor, 120);
    const t2 = setTimeout(killTopInterceptor, 320);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
