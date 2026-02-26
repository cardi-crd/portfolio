'use client';

function vibrate(pattern: number | number[]) {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') {
    return;
  }
  navigator.vibrate(pattern);
}

export function hapticTap() {
  vibrate(8);
}

export function hapticSwipe() {
  vibrate(12);
}
