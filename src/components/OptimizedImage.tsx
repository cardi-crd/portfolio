import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { normalizeImageSrc } from '@/lib/normalizeImageSrc';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  showPlaceholder?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: (e: any) => void;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  priority = false, 
  showPlaceholder = true,
  sizes = '(max-width: 768px) 100vw, 50vw',
  onLoad,
  onError 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const normalizedSrc = normalizeImageSrc(src);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setIsInView(priority);
  }, [normalizedSrc, priority]);

  useEffect(() => {
    if (!normalizedSrc) return;

    // If priority, load immediately
    if (priority) {
      setIsInView(true);
      return;
    }

    // Set up intersection observer for lazy loading
    if (!observerRef.current && imgRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
            observerRef.current = null;
          }
        },
        {
          rootMargin: '250px', // Start loading well before visible for smoother scrolling
          threshold: 0.1
        }
      );

      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [normalizedSrc, priority]);

  if (!normalizedSrc) {
    console.warn('Missing/invalid src', { src, alt });
    return (
      <div className={`bg-gray-300 flex items-center justify-center text-gray-600 ${className}`}>
        Missing Image
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`bg-gray-300 flex items-center justify-center text-gray-600 ${className}`}>
        Failed to Load
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Placeholder */}
      {showPlaceholder && !isLoaded && (
        <div className="absolute inset-0 bg-white/5" />
      )}
      
      {/* Actual Image */}
      {isInView && (
        <Image
          src={normalizedSrc}
          alt={alt}
          fill
          sizes={sizes}
          className={`transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          loading={priority ? undefined : 'lazy'}
          decoding="async"
          priority={priority}
          onLoad={() => {
            setIsLoaded(true);
            onLoad?.();
          }}
          onError={(e) => {
            setHasError(true);
            onError?.(e);
            console.error('Image failed to load:', normalizedSrc);
          }}
        />
      )}
    </div>
  );
}
