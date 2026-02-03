'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
  priority?: number; // Number of images to preload immediately
}

export const ImagePreloader = ({ images, priority = 3 }: ImagePreloaderProps) => {
  useEffect(() => {
    // Preload priority images immediately
    const priorityImages = images.slice(0, priority);
    priorityImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Preload remaining images with a delay
    const remainingImages = images.slice(priority);
    const preloadTimer = setTimeout(() => {
      remainingImages.forEach((src, index) => {
        setTimeout(() => {
          const img = new Image();
          img.src = src;
        }, index * 100); // Stagger loading by 100ms
      });
    }, 1000); // Wait 1 second before preloading remaining images

    return () => clearTimeout(preloadTimer);
  }, [images, priority]);

  return null; // This component doesn't render anything
};