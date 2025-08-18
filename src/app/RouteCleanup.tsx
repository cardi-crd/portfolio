'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    // Release body locks/classes
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.classList.remove('no-scroll', 'modal-open', 'lenis-stopped');

    // Remove common leftover portals/overlays from viewers/menus
    document
      .querySelectorAll(
        [
          '.lightbox-portal',
          '.lightbox-backdrop',
          '.modal-backdrop',
          '.yarl__portal', // yet-another-react-lightbox
          '.pswp',         // PhotoSwipe
          '.swiper-aria-live',
          '.lenis-overlay',
        ].join(',')
      )
      .forEach((n) => n.remove());

    // Defensive: any invisible full-screen with huge z-index → ignore clicks
    const all = Array.from(document.querySelectorAll<HTMLElement>('body *'));
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (r.width >= window.innerWidth && r.height >= window.innerHeight) {
        const cs = getComputedStyle(el);
        const z = Number(cs.zIndex);
        const invisible = cs.opacity === '0' || cs.visibility === 'hidden';
        if (z >= 1000 && cs.pointerEvents !== 'none' && invisible) {
          el.style.pointerEvents = 'none';
        }
      }
    }
  }, [pathname]);

  return null;
}
