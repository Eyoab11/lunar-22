/**
 * OptimizedImage Component - Performance-optimized image component
 * Uses Performance_Optimizer for lazy loading and Core Web Vitals optimization
 */

'use client';

import Image from 'next/image';
import { performanceOptimizer, ImageOptimizationConfig } from '@/lib/seo/performance-optimizer';

interface OptimizedImageProps extends Omit<ImageOptimizationConfig, 'src' | 'alt'> {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  quality = 85,
  className,
  style,
  onClick,
  onLoad,
  onError,
}: OptimizedImageProps) {
  // Generate optimized props using Performance_Optimizer
  const optimizedProps = performanceOptimizer.generateNextImageProps({
    src,
    alt,
    width,
    height,
    priority,
    sizes,
    quality,
  });

  // Combine styles with aspect ratio to prevent layout shift
  const combinedStyle = {
    ...style,
    ...(width && height ? { aspectRatio: `${width}/${height}` } : {}),
  };

  return (
    <Image
      src={optimizedProps.src}
      alt={optimizedProps.alt}
      width={optimizedProps.width}
      height={optimizedProps.height}
      priority={optimizedProps.priority}
      sizes={optimizedProps.sizes}
      quality={optimizedProps.quality}
      loading={optimizedProps.loading}
      placeholder={optimizedProps.placeholder}
      blurDataURL={optimizedProps.blurDataURL}
      className={className}
      style={combinedStyle}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
    />
  );
}

export default OptimizedImage;