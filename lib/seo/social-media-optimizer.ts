/**
 * Social Media Optimizer - Open Graph and Twitter Card Management
 * Handles social media metadata generation and optimization
 */

import { 
  OpenGraphConfig, 
  TwitterConfig, 
  MetadataConfig,
  ValidationResult 
} from './types';
import { 
  sanitizeTitle, 
  sanitizeDescription, 
  generateCanonicalUrl 
} from './utils';
import { getGlobalSEOConfig } from './config';
import { socialImageOptimizer, SocialImageConfig } from './social-image-optimizer';

export class SocialMediaOptimizer {
  private globalConfig = getGlobalSEOConfig();

  /**
   * Generate Open Graph metadata for a page
   */
  generateOpenGraphMetadata(
    title: string,
    description: string,
    image?: string,
    type: 'website' | 'article' = 'website',
    url?: string
  ): OpenGraphConfig {
    return {
      title: sanitizeTitle(title),
      description: sanitizeDescription(description),
      image: image || this.globalConfig.social.defaultImage,
      type,
      siteName: this.globalConfig.site.name,
    };
  }

  /**
   * Generate Twitter Card metadata for a page
   */
  generateTwitterCardMetadata(
    title: string,
    description: string,
    image?: string,
    card: 'summary' | 'summary_large_image' = 'summary_large_image'
  ): TwitterConfig {
    return {
      card,
      title: sanitizeTitle(title),
      description: sanitizeDescription(description),
      image: image || this.globalConfig.social.defaultImage,
      site: this.globalConfig.social.twitterHandle,
    };
  }

  /**
   * Generate complete social media metadata for a page
   */
  generateSocialMetadata(
    title: string,
    description: string,
    options?: {
      image?: string;
      ogType?: 'website' | 'article';
      twitterCard?: 'summary' | 'summary_large_image';
      url?: string;
    }
  ): { openGraph: OpenGraphConfig; twitter: TwitterConfig } {
    const openGraph = this.generateOpenGraphMetadata(
      title,
      description,
      options?.image,
      options?.ogType,
      options?.url
    );

    const twitter = this.generateTwitterCardMetadata(
      title,
      description,
      options?.image,
      options?.twitterCard
    );

    return { openGraph, twitter };
  }

  /**
   * Generate social metadata for homepage
   */
  generateHomepageSocialMetadata(): { openGraph: OpenGraphConfig; twitter: TwitterConfig } {
    return this.generateSocialMetadata(
      'HOME | Lunar 22',
      'Lunar 22 Media - Creative content production and entertainment. Discover our work in television, animation, and digital media.',
      {
        image: '/lem.avif',
        ogType: 'website',
        twitterCard: 'summary_large_image'
      }
    );
  }

  /**
   * Generate social metadata for contact page
   */
  generateContactSocialMetadata(): { openGraph: OpenGraphConfig; twitter: TwitterConfig } {
    return this.generateSocialMetadata(
      'CONTACT | Lunar 22',
      'Get in touch with Lunar 22 Media. Contact us for creative content production, television, animation, and digital media projects.',
      {
        image: '/lem.avif',
        ogType: 'website',
        twitterCard: 'summary_large_image'
      }
    );
  }

  /**
   * Generate social metadata for about page
   */
  generateAboutSocialMetadata(): { openGraph: OpenGraphConfig; twitter: TwitterConfig } {
    return this.generateSocialMetadata(
      'ABOUT | Lunar 22',
      'Learn about Lunar 22 Media, our mission, and our team. Discover our journey in creative content production and entertainment.',
      {
        image: '/lem.avif',
        ogType: 'website',
        twitterCard: 'summary_large_image'
      }
    );
  }

  /**
   * Generate social metadata for power rangers page
   */
  generatePowerRangersSocialMetadata(): { openGraph: OpenGraphConfig; twitter: TwitterConfig } {
    return this.generateSocialMetadata(
      'POWER RANGERS | Lunar 22',
      'Explore Lunar 22 Media\'s work on Power Rangers and other iconic television series. Discover our contribution to beloved entertainment franchises.',
      {
        image: '/powerrangers.jpg',
        ogType: 'website',
        twitterCard: 'summary_large_image'
      }
    );
  }

  /**
   * Generate social metadata for founders page
   */
  generateFoundersSocialMetadata(): { openGraph: OpenGraphConfig; twitter: TwitterConfig } {
    return this.generateSocialMetadata(
      'FOUNDERS | Lunar 22',
      'Meet the founders of Lunar 22 Media. Learn about the visionaries behind our creative content production and entertainment company.',
      {
        image: '/lem.avif',
        ogType: 'website',
        twitterCard: 'summary_large_image'
      }
    );
  }

  /**
   * Validate Open Graph metadata
   */
  validateOpenGraphMetadata(og: OpenGraphConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!og.title || og.title.trim().length === 0) {
      errors.push('Open Graph title is required');
    }
    if (!og.description || og.description.trim().length === 0) {
      errors.push('Open Graph description is required');
    }
    if (!og.image || og.image.trim().length === 0) {
      errors.push('Open Graph image is required');
    }
    if (!og.siteName || og.siteName.trim().length === 0) {
      errors.push('Open Graph site name is required');
    }

    // Length validations
    if (og.title && og.title.length > 60) {
      warnings.push('Open Graph title should be 60 characters or less for optimal display');
    }
    if (og.description && og.description.length > 160) {
      warnings.push('Open Graph description should be 160 characters or less for optimal display');
    }

    // Image validation
    if (og.image && !og.image.startsWith('/') && !og.image.startsWith('http')) {
      warnings.push('Open Graph image should be an absolute URL or start with /');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate Twitter Card metadata
   */
  validateTwitterCardMetadata(twitter: TwitterConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!twitter.title || twitter.title.trim().length === 0) {
      errors.push('Twitter Card title is required');
    }
    if (!twitter.description || twitter.description.trim().length === 0) {
      errors.push('Twitter Card description is required');
    }
    if (!twitter.image || twitter.image.trim().length === 0) {
      errors.push('Twitter Card image is required');
    }
    if (!twitter.card) {
      errors.push('Twitter Card type is required');
    }

    // Length validations
    if (twitter.title && twitter.title.length > 70) {
      warnings.push('Twitter Card title should be 70 characters or less for optimal display');
    }
    if (twitter.description && twitter.description.length > 200) {
      warnings.push('Twitter Card description should be 200 characters or less for optimal display');
    }

    // Card type validation
    if (twitter.card && !['summary', 'summary_large_image'].includes(twitter.card)) {
      errors.push('Twitter Card type must be either "summary" or "summary_large_image"');
    }

    // Image validation
    if (twitter.image && !twitter.image.startsWith('/') && !twitter.image.startsWith('http')) {
      warnings.push('Twitter Card image should be an absolute URL or start with /');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate complete social media metadata
   */
  validateSocialMetadata(
    openGraph: OpenGraphConfig, 
    twitter: TwitterConfig
  ): ValidationResult {
    const ogValidation = this.validateOpenGraphMetadata(openGraph);
    const twitterValidation = this.validateTwitterCardMetadata(twitter);

    return {
      isValid: ogValidation.isValid && twitterValidation.isValid,
      errors: [...ogValidation.errors, ...twitterValidation.errors],
      warnings: [...ogValidation.warnings, ...twitterValidation.warnings]
    };
  }

  /**
   * Get optimized image dimensions for social sharing
   */
  getOptimalImageDimensions(cardType: 'summary' | 'summary_large_image' | 'og'): { width: number; height: number } {
    switch (cardType) {
      case 'summary':
        return { width: 400, height: 400 };
      case 'summary_large_image':
        return { width: 1200, height: 630 };
      case 'og':
        return { width: 1200, height: 630 };
      default:
        return { width: 1200, height: 630 };
    }
  }

  /**
   * Generate social media metadata from page path
   */
  generateSocialMetadataFromPath(path: string): { openGraph: OpenGraphConfig; twitter: TwitterConfig } | null {
    switch (path) {
      case '/':
        return this.generateHomepageSocialMetadata();
      case '/contact':
        return this.generateContactSocialMetadata();
      case '/about':
        return this.generateAboutSocialMetadata();
      case '/power-rangers':
        return this.generatePowerRangersSocialMetadata();
      case '/founders':
        return this.generateFoundersSocialMetadata();
      default:
        return null;
    }
  }

  /**
   * Check if social media metadata is complete
   */
  isSocialMetadataComplete(metadata: MetadataConfig): boolean {
    if (!metadata.openGraph || !metadata.twitter) {
      return false;
    }

    const ogValidation = this.validateOpenGraphMetadata(metadata.openGraph);
    const twitterValidation = this.validateTwitterCardMetadata(metadata.twitter);

    return ogValidation.isValid && twitterValidation.isValid;
  }

  /**
   * Get default social image based on page content
   */
  getDefaultSocialImage(path: string): string {
    switch (path) {
      case '/power-rangers':
        return '/powerrangers.jpg';
      default:
        return this.globalConfig.social.defaultImage;
    }
  }

  /**
   * Generate social media tags as HTML string (for debugging/testing)
   */
  generateSocialMetaTagsHTML(openGraph: OpenGraphConfig, twitter: TwitterConfig): string {
    const ogTags = [
      `<meta property="og:title" content="${openGraph.title}" />`,
      `<meta property="og:description" content="${openGraph.description}" />`,
      `<meta property="og:image" content="${openGraph.image}" />`,
      `<meta property="og:type" content="${openGraph.type}" />`,
      `<meta property="og:site_name" content="${openGraph.siteName}" />`,
    ];

    const twitterTags = [
      `<meta name="twitter:card" content="${twitter.card}" />`,
      `<meta name="twitter:title" content="${twitter.title}" />`,
      `<meta name="twitter:description" content="${twitter.description}" />`,
      `<meta name="twitter:image" content="${twitter.image}" />`,
    ];

    if (twitter.site) {
      twitterTags.push(`<meta name="twitter:site" content="${twitter.site}" />`);
    }

    return [...ogTags, ...twitterTags].join('\n');
  }

  /**
   * Generate optimized social images for a page
   */
  generateOptimizedSocialImages(
    imageSrc: string,
    altText: string,
    options?: {
      format?: 'webp' | 'jpeg' | 'png' | 'avif';
      quality?: number;
    }
  ): {
    openGraph: SocialImageConfig;
    twitterCard: SocialImageConfig;
    twitterSummary: SocialImageConfig;
  } {
    return {
      openGraph: socialImageOptimizer.generateOptimizedImageConfig(
        imageSrc,
        altText,
        'facebook',
        options
      ),
      twitterCard: socialImageOptimizer.generateOptimizedImageConfig(
        imageSrc,
        altText,
        'twitter_large',
        options
      ),
      twitterSummary: socialImageOptimizer.generateOptimizedImageConfig(
        imageSrc,
        altText,
        'twitter_summary',
        options
      ),
    };
  }

  /**
   * Generate social metadata with optimized images
   */
  generateSocialMetadataWithOptimizedImages(
    title: string,
    description: string,
    imageSrc: string,
    altText: string,
    options?: {
      ogType?: 'website' | 'article';
      twitterCard?: 'summary' | 'summary_large_image';
      imageFormat?: 'webp' | 'jpeg' | 'png' | 'avif';
      imageQuality?: number;
    }
  ): { 
    openGraph: OpenGraphConfig; 
    twitter: TwitterConfig;
    optimizedImages: {
      openGraph: SocialImageConfig;
      twitterCard: SocialImageConfig;
      twitterSummary: SocialImageConfig;
    };
  } {
    const optimizedImages = this.generateOptimizedSocialImages(
      imageSrc,
      altText,
      {
        format: options?.imageFormat,
        quality: options?.imageQuality,
      }
    );

    // Use the optimized image URLs
    const openGraph = this.generateOpenGraphMetadata(
      title,
      description,
      optimizedImages.openGraph.src,
      options?.ogType
    );

    const twitter = this.generateTwitterCardMetadata(
      title,
      description,
      optimizedImages.twitterCard.src,
      options?.twitterCard
    );

    return {
      openGraph,
      twitter,
      optimizedImages,
    };
  }

  /**
   * Validate social images meet platform requirements
   */
  validateSocialImages(openGraphImage: string, twitterImage: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if images exist and are accessible
    if (!openGraphImage || openGraphImage.trim().length === 0) {
      errors.push('Open Graph image is required');
    }
    if (!twitterImage || twitterImage.trim().length === 0) {
      errors.push('Twitter Card image is required');
    }

    // Check image format recommendations
    if (openGraphImage && !openGraphImage.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
      warnings.push('Open Graph image should be in a web-optimized format (jpg, png, webp, avif)');
    }
    if (twitterImage && !twitterImage.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
      warnings.push('Twitter Card image should be in a web-optimized format (jpg, png, webp, avif)');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

// Export singleton instance
export const socialMediaOptimizer = new SocialMediaOptimizer();