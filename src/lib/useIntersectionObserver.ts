import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        setHasIntersected(true);
        observer.unobserve(element);
      }
    }, {
      rootMargin: '50px', // Start loading 50px before the element is visible
      ...options
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return { elementRef, isIntersecting, hasIntersected };
}
