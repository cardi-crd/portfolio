import { useState, useEffect, useRef } from 'react';
import { normalizeImageSrc } from '@/lib/normalizeImageSrc';
import { imagePreloader } from '@/lib/imagePreloader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: (e: any) => void;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  priority = false, 
  onLoad,
  onError 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const normalizedSrc = normalizeImageSrc(src);

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
          }
        },
        {
          rootMargin: '50px', // Start loading 50px before visible
          threshold: 0.1
        }
      );

      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [normalizedSrc, priority]);

  // Preload image when it comes into view
  useEffect(() => {
    if (isInView && normalizedSrc && !imagePreloader.isPreloaded(normalizedSrc)) {
      imagePreloader.preloadImage(normalizedSrc);
    }
  }, [isInView, normalizedSrc]);

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
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Actual Image */}
      {isInView && (
        <img
          src={normalizedSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
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
