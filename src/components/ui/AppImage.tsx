import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface AppImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  /** Fallback to show when image fails to load */
  fallback?: string;
  /** Show shimmer skeleton while loading */
  showSkeleton?: boolean;
  /** Aspect ratio class e.g. "aspect-video" */
  aspectRatio?: string;
  className?: string;
}

/**
 * AppImage — Wrapper around next/image with:
 * - Blur placeholder skeleton while loading
 * - Error fallback state
 * - Aspect ratio container
 */
export function AppImage({
  fallback = '/assets/images/placeholder-course.png',
  showSkeleton = true,
  aspectRatio,
  className = '',
  alt,
  ...props
}: AppImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const containerClass = [
    'relative overflow-hidden',
    aspectRatio || '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      {/* Skeleton shimmer */}
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 skeleton" aria-hidden="true" />
      )}

      <Image
        {...props}
        alt={alt}
        src={hasError ? fallback : props.src}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          objectFit: 'cover',
          ...props.style,
        }}
      />
    </div>
  );
}

/**
 * CourseImage — Preset AppImage for 16:9 course thumbnails
 */
export function CourseImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <AppImage
      src={src}
      alt={alt}
      fill
      aspectRatio="aspect-video"
      fallback="/assets/images/placeholder-course.png"
      className={`rounded-t-lg ${className}`}
    />
  );
}

/**
 * AvatarImage — Circular avatar image with fallback initials
 */
export function AvatarImage({
  src,
  alt,
  size = 40,
  name = '',
  className = '',
}: {
  src?: string;
  alt: string;
  size?: number;
  name?: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(!src);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center rounded-full font-semibold flex-shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
          color: '#fff',
          fontSize: size * 0.35,
        }}
        aria-label={alt}
        role="img"
      >
        {initials || '?'}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover flex-shrink-0 ${className}`}
      onError={() => setHasError(true)}
    />
  );
}
