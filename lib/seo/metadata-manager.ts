/**
 * MetadataManager Class - Core Metadata Management
 * Handles page-specific metadata generation with proper escaping and validation
 */

import { Metadata } from 'next';
import { 
  MetadataConfig, 
  ValidationResult, 
  PageSEOConfig 
} from './types';
import { 
  sanitizeTitle, 
  sanitizeDescription, 
  generateCanonicalUrl, 
  validateMetadata, 
  mergeMetadata, 
  generateRobotsContent 
} from './utils';
import { 
  getPageSEOConfig, 
  getDefaultMetadata, 
  getGlobalSEOConfig 
} from './config';
import { generateDefaultConfigForPage } from './page-discovery';

export class MetadataManager {
  private globalConfig = getGlobalSEOConfig();

  /**
   * Generate Next.js Metadata object for a specific page (with dynamic fallback)
   */
  async generateMetadata(page: string, customConfig?: Partial<MetadataConfig>): Promise<Metadata> {
    const pageConfig = getPageSEOConfig(page);
    let metadataConfig: MetadataConfig;
    
    if (pageConfig) {
      // Use configured metadata
      metadataConfig = customConfig 
        ? mergeMetadata(customConfig, pageConfig.metadata)
        : pageConfig.metadata;
    } else {
      // Generate dynamic configuration for unconfigured pages
      const dynamicConfig = await generateDefaultConfigForPage(page);
      metadataConfig = customConfig 
        ? mergeMetadata(customConfig, dynamicConfig)
        : dynamicConfig;
    }

    // Generate canonical URL
    const canonicalUrl = this.getCanonicalUrl(page);
    
    // Sanitize title and description
    const sanitizedTitle = sanitizeTitle(metadataConfig.title);
    const sanitizedDescription = sanitizeDescription(metadataConfig.description);

    // Build Next.js Metadata object
    const metadata: Metadata = {
      title: sanitizedTitle,
      description: sanitizedDescription,
      
      // Canonical URL
      alternates: {
        canonical: canonicalUrl,
      },

      // Robots
      robots: metadataConfig.robots ? generateRobotsContent(metadataConfig.robots) : 'index, follow',

      // Consistent favicon across all pages
      icons: {
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
        ],
        apple: [
          {
            url: '/api/favicon?type=apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
        shortcut: '/api/favicon?type=favicon.ico',
      },

      // Open Graph
      openGraph: metadataConfig.openGraph ? {
        title: sanitizeTitle(metadataConfig.openGraph.title),
        description: sanitizeDescription(metadataConfig.openGraph.description),
        url: canonicalUrl,
        siteName: metadataConfig.openGraph.siteName,
        images: [
          {
            url: metadataConfig.openGraph.image,
            width: 1200,
            height: 630,
            alt: sanitizeTitle(metadataConfig.openGraph.title),
          },
        ],
        locale: 'en_US',
        type: metadataConfig.openGraph.type,
      } : undefined,

      // Twitter
      twitter: metadataConfig.twitter ? {
        card: metadataConfig.twitter.card,
        title: sanitizeTitle(metadataConfig.twitter.title),
        description: sanitizeDescription(metadataConfig.twitter.description),
        site: metadataConfig.twitter.site,
        images: [metadataConfig.twitter.image],
      } : undefined,

      // Additional metadata
      metadataBase: new URL(this.globalConfig.site.url),
      
      // Verification and other meta tags
      other: {
        'theme-color': '#000000',
        'color-scheme': 'dark',
      },
    };

    return metadata;
  }

  /**
   * Generate metadata specifically for homepage
   */
  async generateHomepageMetadata(customConfig?: Partial<MetadataConfig>): Promise<Metadata> {
    return this.generateMetadata('/', customConfig);
  }

  /**
   * Generate metadata specifically for contact page
   */
  async generateContactMetadata(customConfig?: Partial<MetadataConfig>): Promise<Metadata> {
    return this.generateMetadata('/contact', customConfig);
  }

  /**
   * Generate metadata specifically for about page
   */
  async generateAboutMetadata(customConfig?: Partial<MetadataConfig>): Promise<Metadata> {
    return this.generateMetadata('/about', customConfig);
  }

  /**
   * Generate metadata specifically for power rangers page
   */
  async generatePowerRangersMetadata(customConfig?: Partial<MetadataConfig>): Promise<Metadata> {
    return this.generateMetadata('/power-rangers', customConfig);
  }

  /**
   * Generate metadata specifically for founders page
   */
  async generateFoundersMetadata(customConfig?: Partial<MetadataConfig>): Promise<Metadata> {
    return this.generateMetadata('/founders', customConfig);
  }

  /**
   * Validate metadata configuration
   */
  validateMetadata(metadata: MetadataConfig): ValidationResult {
    return validateMetadata(metadata);
  }

  /**
   * Get canonical URL for a page
   */
  getCanonicalUrl(path: string): string {
    return generateCanonicalUrl(path);
  }

  /**
   * Get page-specific SEO configuration
   */
  getPageConfig(path: string): PageSEOConfig | null {
    return getPageSEOConfig(path);
  }

  /**
   * Check if a page has SEO configuration
   */
  hasPageConfig(path: string): boolean {
    return getPageSEOConfig(path) !== null;
  }

  /**
   * Get all configured pages
   */
  getAllConfiguredPages(): string[] {
    return [
      '/',
      '/contact', 
      '/about',
      '/power-rangers',
      '/founders'
    ];
  }

  /**
   * Generate metadata for dynamic pages with fallback
   */
  async generateDynamicMetadata(
    path: string, 
    title: string, 
    description: string,
    customConfig?: Partial<MetadataConfig>
  ): Promise<Metadata> {
    const baseConfig: MetadataConfig = {
      title: `${title} | Lunar 22`,
      description: sanitizeDescription(description),
      openGraph: {
        title: `${title} | Lunar 22`,
        description: sanitizeDescription(description),
        image: this.globalConfig.social.defaultImage,
        type: 'website',
        siteName: this.globalConfig.site.name,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | Lunar 22`,
        description: sanitizeDescription(description),
        image: this.globalConfig.social.defaultImage,
        site: this.globalConfig.social.twitterHandle,
      },
      robots: {
        index: true,
        follow: true,
      },
    };

    const finalConfig = customConfig 
      ? mergeMetadata(customConfig, baseConfig)
      : baseConfig;

    return this.generateMetadata(path, finalConfig);
  }

  /**
   * Extract page path from URL or pathname
   */
  private normalizePath(path: string): string {
    // Remove query parameters and hash
    const cleanPath = path.split('?')[0].split('#')[0];
    
    // Ensure starts with /
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    
    // Remove trailing slash except for root
    return normalizedPath === '/' ? '/' : normalizedPath.replace(/\/$/, '');
  }

  /**
   * Generate metadata from URL or pathname
   */
  async generateMetadataFromPath(urlOrPath: string, customConfig?: Partial<MetadataConfig>): Promise<Metadata> {
    const normalizedPath = this.normalizePath(urlOrPath);
    return this.generateMetadata(normalizedPath, customConfig);
  }
}

// Export singleton instance
export const metadataManager = new MetadataManager();