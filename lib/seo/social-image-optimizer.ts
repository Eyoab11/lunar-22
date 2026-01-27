/**
 * Social Image Optimizer - Image Optimization for Social Media
 * Handles image optimization, dimensions, and compression for social sharing
 */

import { ValidationResult } from './types';

export interface SocialImageConfig {
  src: string;
  width: number;
  height: number;
  alt: string;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  quality?: number;
}

export interface OptimizedSocialImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  format: string;
  size?: number; // File size in bytes
}

export class SocialImageOptimizer {
  // Standard social media image dimensions
  private static readonly DIMENSIONS = {
    TWITTER_SUMMARY: { width: 400, height: 400 },
    TWITTER_LARGE: { width: 1200, height: 630 },
    FACEBOOK_OG: { width: 1200, height: 630 },
    LINKEDIN: { width: 1200, height: 627 },
    INSTAGRAM: { width: 1080, height: 1080 },
  };

  // Optimal formats for different use cases
  private static readonly OPTIMAL_FORMATS = {
    PHOTO: 'jpeg',
    GRAPHICS: 'png',
    MODERN: 'webp',
    NEXT_GEN: 'avif',
  };

  /**
   * Get optimal dimensions for specific social platform
   */
  getOptimalDimensions(platform: 'twitter_summary' | 'twitter_large' | 'facebook' | 'linkedin' | 'instagram'): { width: number; height: number } {
    switch (platform) {
      case 'twitter_summary':
        return SocialImageOptimizer.DIMENSIONS.TWITTER_SUMMARY;
      case 'twitter_large':
        return SocialImageOptimizer.DIMENSIONS.TWITTER_LARGE;
      case 'facebook':
        return SocialImageOptimizer.DIMENSIONS.FACEBOOK_OG;
      case 'linkedin':
        return SocialImageOptimizer.DIMENSIONS.LINKEDIN;
      case 'instagram':
        return SocialImageOptimizer.DIMENSIONS.INSTAGRAM;
      default:
        return SocialImageOptimizer.DIMENSIONS.TWITTER_LARGE;
    }
  }

  /**
   * Generate optimized image configuration for social sharing
   */
  generateOptimizedImageConfig(
    src: string,
    alt: string,
    platform: 'twitter_summary' | 'twitter_large' | 'facebook' | 'linkedin' | 'instagram' = 'twitter_large',
    options?: {
      format?: 'webp' | 'jpeg' | 'png' | 'avif';
      quality?: number;
    }
  ): SocialImageConfig {
    const dimensions = this.getOptimalDimensions(platform);
    
    return {
      src,
      width: dimensions.width,
      height: dimensions.height,
      alt,
      format: options?.format || 'webp',
      quality: options?.quality || 85,
    };
  }

  /**
   * Generate Next.js Image component props for social images
   */
  generateNextImageProps(config: SocialImageConfig): {
    src: string;
    width: number;
    height: number;
    alt: string;
    quality: number;
    format: string;
    priority?: boolean;
  } {
    return {
      src: config.src,
      width: config.width,
      height: config.height,
      alt: config.alt,
      quality: config.quality || 85,
      format: config.format || 'webp',
      priority: false, // Social images are typically not above-the-fold
    };
  }

  /**
   * Validate social image configuration
   */
  validateSocialImage(config: SocialImageConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    if (!config.src || config.src.trim().length === 0) {
      errors.push('Image source is required');
    }
    if (!config.alt || config.alt.trim().length === 0) {
      errors.push('Image alt text is required');
    }
    if (!config.width || config.width <= 0) {
      errors.push('Image width must be greater than 0');
    }
    if (!config.height || config.height <= 0) {
      errors.push('Image height must be greater than 0');
    }

    // Dimension validations
    if (config.width && config.width < 200) {
      warnings.push('Image width should be at least 200px for social sharing');
    }
    if (config.height && config.height < 200) {
      warnings.push('Image height should be at least 200px for social sharing');
    }

    // Aspect ratio warnings for common platforms
    if (config.width && config.height) {
      const aspectRatio = config.width / config.height;
      
      // Twitter large image optimal ratio is 1.91:1
      if (Math.abs(aspectRatio - 1.91) > 0.1) {
        warnings.push('Image aspect ratio may not be optimal for Twitter large cards (recommended: 1.91:1)');
      }
    }

    // Quality validation
    if (config.quality && (config.quality < 1 || config.quality > 100)) {
      errors.push('Image quality must be between 1 and 100');
    }

    // Format validation
    if (config.format && !['webp', 'jpeg', 'png', 'avif'].includes(config.format)) {
      errors.push('Image format must be one of: webp, jpeg, png, avif');
    }

    // Alt text length
    if (config.alt && config.alt.length > 125) {
      warnings.push('Alt text should be 125 characters or less for optimal accessibility');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Generate multiple optimized versions for different platforms
   */
  generateMultiPlatformImages(
    src: string,
    alt: string,
    options?: {
      format?: 'webp' | 'jpeg' | 'png' | 'avif';
      quality?: number;
    }
  ): Record<string, SocialImageConfig> {
    return {
      twitterSummary: this.generateOptimizedImageConfig(src, alt, 'twitter_summary', options),
      twitterLarge: this.generateOptimizedImageConfig(src, alt, 'twitter_large', options),
      facebook: this.generateOptimizedImageConfig(src, alt, 'facebook', options),
      linkedin: this.generateOptimizedImageConfig(src, alt, 'linkedin', options),
      instagram: this.generateOptimizedImageConfig(src, alt, 'instagram', options),
    };
  }

  /**
   * Get recommended format based on image type
   */
  getRecommendedFormat(imageType: 'photo' | 'graphics' | 'logo' | 'screenshot'): 'webp' | 'jpeg' | 'png' | 'avif' {
    switch (imageType) {
      case 'photo':
        return 'webp'; // Good compression for photos
      case 'graphics':
      case 'logo':
        return 'png'; // Preserves sharp edges and transparency
      case 'screenshot':
        return 'webp'; // Good balance of quality and size
      default:
        return 'webp';
    }
  }

  /**
   * Generate optimized social image URL with Next.js Image API
   */
  generateOptimizedImageUrl(
    src: string,
    width: number,
    height: number,
    options?: {
      format?: 'webp' | 'jpeg' | 'png' | 'avif';
      quality?: number;
    }
  ): string {
    const params = new URLSearchParams();
    params.set('url', src);
    params.set('w', width.toString());
    params.set('h', height.toString());
    
    if (options?.quality) {
      params.set('q', options.quality.toString());
    }
    
    if (options?.format) {
      params.set('f', options.format);
    }

    return `/_next/image?${params.toString()}`;
  }

  /**
   * Check if image meets social media requirements
   */
  meetsSocialMediaRequirements(
    width: number,
    height: number,
    fileSize?: number
  ): { meets: boolean; issues: string[] } {
    const issues: string[] = [];

    // Minimum dimensions
    if (width < 200) {
      issues.push('Width should be at least 200px');
    }
    if (height < 200) {
      issues.push('Height should be at least 200px');
    }

    // Maximum dimensions (to avoid processing issues)
    if (width > 8192) {
      issues.push('Width should not exceed 8192px');
    }
    if (height > 8192) {
      issues.push('Height should not exceed 8192px');
    }

    // File size (if provided)
    if (fileSize) {
      const maxSize = 8 * 1024 * 1024; // 8MB
      if (fileSize > maxSize) {
        issues.push('File size should not exceed 8MB');
      }
    }

    return {
      meets: issues.length === 0,
      issues
    };
  }

  /**
   * Generate social image metadata for HTML meta tags
   */
  generateImageMetaTags(config: SocialImageConfig, platform: 'og' | 'twitter'): Record<string, string> {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const imageUrl = config.src.startsWith('http') ? config.src : `${baseUrl}${config.src}`;

    if (platform === 'og') {
      return {
        'og:image': imageUrl,
        'og:image:width': config.width.toString(),
        'og:image:height': config.height.toString(),
        'og:image:alt': config.alt,
      };
    } else {
      return {
        'twitter:image': imageUrl,
        'twitter:image:alt': config.alt,
      };
    }
  }

  /**
   * Optimize existing social images in the public directory
   */
  getOptimizedPublicImages(): Record<string, SocialImageConfig> {
    return {
      defaultLogo: this.generateOptimizedImageConfig(
        '/lem.avif',
        'Lunar 22 Media Logo',
        'twitter_large',
        { format: 'avif', quality: 90 }
      ),
      powerRangers: this.generateOptimizedImageConfig(
        '/powerrangers.jpg',
        'Power Rangers - Lunar 22 Media Production',
        'twitter_large',
        { format: 'webp', quality: 85 }
      ),
      founders: this.generateOptimizedImageConfig(
        '/shuki-levy4.avif',
        'Shuki Levy - Founder of Lunar 22 Media',
        'twitter_large',
        { format: 'avif', quality: 90 }
      ),
    };
  }

  /**
   * Generate responsive image srcset for social sharing
   */
  generateResponsiveSrcSet(
    src: string,
    baseWidth: number,
    baseHeight: number,
    options?: {
      format?: 'webp' | 'jpeg' | 'png' | 'avif';
      quality?: number;
    }
  ): string {
    const scales = [1, 1.5, 2];
    const srcSetEntries = scales.map(scale => {
      const scaledWidth = Math.round(baseWidth * scale);
      const scaledHeight = Math.round(baseHeight * scale);
      const url = this.generateOptimizedImageUrl(src, scaledWidth, scaledHeight, options);
      return `${url} ${scale}x`;
    });

    return srcSetEntries.join(', ');
  }
}

// Export singleton instance
export const socialImageOptimizer = new SocialImageOptimizer();