import { useState } from 'react';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver';
import { normalizeImageSrc } from '@/lib/normalizeImageSrc';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onError?: (e: any) => void;
}

export function OptimizedImage({ src, alt, className = '', priority = false, onError }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver();
  
  const normalizedSrc = normalizeImageSrc(src);
  
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

  // Show placeholder until image is loaded
  const shouldShowImage = priority || hasIntersected;
  
  return (
    <div ref={elementRef} className={`relative ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Actual Image */}
      {shouldShowImage && (
        <img
          src={normalizedSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
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
