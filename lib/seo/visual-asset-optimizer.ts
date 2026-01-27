/**
 * Visual Asset Optimizer
 * Handles favicon generation, touch icons, and visual asset optimization
 */

import { seoGlobalConfig } from './config';

export interface FaviconConfig {
  sizes: string;
  type: string;
  href: string;
  rel: string;
}

export interface TouchIconConfig {
  sizes: string;
  href: string;
  rel: string;
}

export interface VisualAssetConfig {
  favicons: FaviconConfig[];
  touchIcons: TouchIconConfig[];
  manifest: string;
  themeColor: string;
  backgroundColor: string;
}

/**
 * Visual Asset Optimizer Class
 * Manages favicon generation, touch icons, and visual asset optimization
 */
export class VisualAssetOptimizer {
  private baseIconPath: string;
  private manifestPath: string;

  constructor() {
    this.baseIconPath = '/L22 W.png'; // Base icon for generation
    this.manifestPath = '/manifest.json';
  }

  /**
   * Generate favicon configurations for all required formats
   */
  generateFaviconConfigs(): FaviconConfig[] {
    return [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/api/favicon?type=favicon.ico',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/api/favicon?type=favicon-16x16.png',
        sizes: '16x16',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/api/favicon?type=favicon-32x32.png',
        sizes: '32x32',
      },
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/api/favicon?type=favicon.ico',
        sizes: '32x32',
      },
    ];
  }

  /**
   * Generate touch icon configurations for mobile devices
   */
  generateTouchIconConfigs(): TouchIconConfig[] {
    return [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/api/favicon?type=apple-touch-icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/api/favicon?type=apple-touch-icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/api/favicon?type=apple-touch-icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/api/favicon?type=apple-touch-icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/api/favicon?type=apple-touch-icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: '/api/favicon?type=apple-touch-icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/api/favicon?type=apple-touch-icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: '/api/favicon?type=apple-touch-icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/api/favicon?type=apple-touch-icon.png',
      },
    ];
  }

  /**
   * Generate Android Chrome icon configurations
   */
  generateAndroidIconConfigs(): FaviconConfig[] {
    return [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/api/favicon?type=android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/api/favicon?type=android-chrome-512x512.png',
        sizes: '512x512',
      },
    ];
  }

  /**
   * Generate complete visual asset configuration
   */
  generateVisualAssetConfig(): VisualAssetConfig {
    const favicons = [
      ...this.generateFaviconConfigs(),
      ...this.generateAndroidIconConfigs(),
    ];

    const touchIcons = this.generateTouchIconConfigs();

    return {
      favicons,
      touchIcons,
      manifest: this.manifestPath,
      themeColor: '#000000', // Lunar 22 brand color
      backgroundColor: '#ffffff',
    };
  }

  /**
   * Generate Next.js metadata icons configuration
   */
  generateNextJSIconsConfig() {
    return {
      icon: [
        {
          url: '/api/favicon?type=favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/api/favicon?type=favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/api/favicon?type=android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: '/api/favicon?type=android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/api/favicon?type=apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      shortcut: '/api/favicon?type=favicon.ico',
    };
  }

  /**
   * Optimize image for social sharing
   */
  optimizeImageForSharing(imagePath: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}): string {
    const {
      width = 1200,
      height = 630,
      quality = 85,
      format = 'jpeg',
    } = options;

    // In a production environment, you would implement actual image optimization
    // For now, return the original path with optimization parameters
    const params = new URLSearchParams({
      w: width.toString(),
      h: height.toString(),
      q: quality.toString(),
      f: format,
    });

    return `${imagePath}?${params.toString()}`;
  }

  /**
   * Generate optimized social media images
   */
  generateSocialMediaImages(): Record<string, string> {
    const baseImage = seoGlobalConfig.social.defaultImage;
    
    return {
      openGraph: this.optimizeImageForSharing(baseImage, {
        width: 1200,
        height: 630,
        format: 'jpeg',
        quality: 85,
      }),
      twitter: this.optimizeImageForSharing(baseImage, {
        width: 1200,
        height: 600,
        format: 'jpeg',
        quality: 85,
      }),
      linkedin: this.optimizeImageForSharing(baseImage, {
        width: 1200,
        height: 627,
        format: 'jpeg',
        quality: 85,
      }),
      facebook: this.optimizeImageForSharing(baseImage, {
        width: 1200,
        height: 630,
        format: 'jpeg',
        quality: 85,
      }),
    };
  }

  /**
   * Validate visual asset configuration
   */
  validateVisualAssetConfig(config: VisualAssetConfig): boolean {
    // Check if all required favicon sizes are present
    const requiredSizes = ['16x16', '32x32', '180x180', '192x192', '512x512'];
    const availableSizes = [
      ...config.favicons.map(f => f.sizes),
      ...config.touchIcons.map(t => t.sizes),
    ];

    return requiredSizes.every(size => availableSizes.includes(size));
  }

  /**
   * Get cache headers for visual assets
   */
  getCacheHeaders(assetType: 'favicon' | 'image' | 'manifest'): Record<string, string> {
    const baseHeaders = {
      'Vary': 'Accept-Encoding',
    };

    switch (assetType) {
      case 'favicon':
        return {
          ...baseHeaders,
          'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
          'Content-Type': 'image/png',
        };
      case 'image':
        return {
          ...baseHeaders,
          'Cache-Control': 'public, max-age=86400', // 1 day
          'Content-Type': 'image/jpeg',
        };
      case 'manifest':
        return {
          ...baseHeaders,
          'Cache-Control': 'public, max-age=3600', // 1 hour
          'Content-Type': 'application/manifest+json',
        };
      default:
        return baseHeaders;
    }
  }
}

// Export singleton instance
export const visualAssetOptimizer = new VisualAssetOptimizer();

// Export utility functions
export function generateFavicons(): FaviconConfig[] {
  return visualAssetOptimizer.generateFaviconConfigs();
}

export function generateTouchIcons(): TouchIconConfig[] {
  return visualAssetOptimizer.generateTouchIconConfigs();
}

export function generateVisualAssets(): VisualAssetConfig {
  return visualAssetOptimizer.generateVisualAssetConfig();
}

export function optimizeImageForSharing(imagePath: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}): string {
  return visualAssetOptimizer.optimizeImageForSharing(imagePath, options);
}