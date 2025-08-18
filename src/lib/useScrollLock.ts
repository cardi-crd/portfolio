// lib/useScrollLock.ts
'use client';
import { useEffect, useRef } from 'react';

type Options = { enabled?: boolean };

export function useScrollLock(locked: boolean, opts: Options = {}) {
  const prev = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!locked) return;

    // Save current scroll
   prev.current = { x: window.scrollX, y: window.scrollY };

    // Add class for CSS guards
    document.documentElement.classList.add('scroll-locked');

    // iOS-safe lock: fix the body at the current offset
    const body = document.body as HTMLElement;
    const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    body.style.position = 'fixed';
    body.style.top = `-${prev.current.y}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';             // Android/desktop
    body.style.touchAction = 'none';            // iOS tap/scroll shield
    if (scrollBarGap > 0) {
      body.style.paddingRight = `${scrollBarGap}px`; // avoid layout shift when hiding scrollbar
    }

    // Prevent wheel/touch from bubbling to the page (some overlays don't stop it)
    const stop = (e: Event) => { e.preventDefault(); };
    const optsPassiveFalse = { passive: false } as EventListenerOptions;
    window.addEventListener('touchmove', stop, optsPassiveFalse);
    window.addEventListener('wheel', stop, optsPassiveFalse);

    return () => {
      // Restore
      window.removeEventListener('touchmove', stop, optsPassiveFalse);
      window.removeEventListener('wheel', stop, optsPassiveFalse);
      document.documentElement.classList.remove('scroll-locked');
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      body.style.paddingRight = '';

      // Return to previous scroll position
      if (prev.current) {
        window.scrollTo(prev.current.x, prev.current.y);
        prev.current = null;
      }
    };
  }, [locked, opts.enabled]);
}
