/**
 * Centralized SEO Configuration Management System
 * Provides configuration for all SEO features across the website
 */

import { SEOGlobalConfig, PageSEOConfig, MetadataConfig } from './types';

// Global SEO configuration for Lunar 22 Media
export const seoGlobalConfig: SEOGlobalConfig = {
  site: {
    name: 'Lunar 22',
    url: 'https://lunar22.com', // Update with actual domain
    description: 'Lunar 22 Media - Creative content production and entertainment',
    logo: '/L22 W.png',
  },
  analytics: {
    trackingId: 'G-VQPT4QJ1GM',
    enableDebug: false,
    respectDNT: true,
    customDimensions: {},
  },
  social: {
    defaultImage: '/lem.avif',
    twitterHandle: '@lunar22media', // Update with actual handle if available
  },
  performance: {
    enableOptimization: true,
    coreWebVitalsThresholds: {
      lcp: 2.5, // Largest Contentful Paint - 2.5 seconds
      fid: 100, // First Input Delay - 100 milliseconds
      cls: 0.1, // Cumulative Layout Shift - 0.1
    },
  },
};

// Page-specific SEO configurations
export const pageConfigs: Record<string, PageSEOConfig> = {
  '/': {
    metadata: {
      title: 'HOME | Lunar 22',
      description: 'Lunar 22 creates family-friendly stories rooted in local traditions and values, offering authentic entertainment that resonates globally. Led by a visionary team, Lunar 22 focuses on cross-cultural understanding, positive storytelling, and characters that connect with children and families worldwide. With a global production team, in-house content development, and innovative AI-driven tracking, Lunar 22 delivers fast, cost-effective productions with built-in merchandising strategies.',
      openGraph: {
        title: 'HOME | Lunar 22',
        description: 'Lunar 22 creates family-friendly stories rooted in local traditions and values, offering authentic entertainment that resonates globally. Led by a visionary team, Lunar 22 focuses on cross-cultural understanding, positive storytelling, and characters that connect with children and families worldwide.',
        image: '/lem.avif',
        type: 'website',
        siteName: 'Lunar 22',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'HOME | Lunar 22',
        description: 'Lunar 22 creates family-friendly stories rooted in local traditions and values, offering authentic entertainment that resonates globally.',
        image: '/lem.avif',
        site: '@lunar22media',
      },
      robots: {
        index: true,
        follow: true,
      },
    },
    schema: {
      type: 'organization',
      data: {},
    },
    performance: {
      critical: true,
      preload: ['/lem.avif', '/L22 W.png'],
    },
    sitemap: {
      changefreq: 'weekly',
      priority: 1.0,
    },
  },
  '/contact': {
    metadata: {
      title: 'CONTACT | Lunar 22',
      description: 'Reach out to Lunar 22 by filling out the contact form.',
      openGraph: {
        title: 'CONTACT | Lunar 22',
        description: 'Reach out to Lunar 22 by filling out the contact form.',
        image: '/lem.avif',
        type: 'website',
        siteName: 'Lunar 22',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'CONTACT | Lunar 22',
        description: 'Reach out to Lunar 22 by filling out the contact form.',
        image: '/lem.avif',
        site: '@lunar22media',
      },
      robots: {
        index: true,
        follow: true,
      },
    },
    schema: {
      type: 'webpage',
      data: {},
    },
    sitemap: {
      changefreq: 'monthly',
      priority: 0.8,
    },
  },
  '/about': {
    metadata: {
      title: 'ABOUT | Lunar 22',
      description: 'Lunar 22 has a distinctive ability to curate heroic family-friendly stories enmeshed in local traditions and values, authentic to the markets where they are viewed.',
      openGraph: {
        title: 'ABOUT | Lunar 22',
        description: 'Lunar 22 has a distinctive ability to curate heroic family-friendly stories enmeshed in local traditions and values, authentic to the markets where they are viewed.',
        image: '/lem.avif',
        type: 'website',
        siteName: 'Lunar 22',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'ABOUT | Lunar 22',
        description: 'Lunar 22 has a distinctive ability to curate heroic family-friendly stories enmeshed in local traditions and values, authentic to the markets where they are viewed.',
        image: '/lem.avif',
        site: '@lunar22media',
      },
      robots: {
        index: true,
        follow: true,
      },
    },
    schema: {
      type: 'webpage',
      data: {},
    },
    sitemap: {
      changefreq: 'monthly',
      priority: 0.9,
    },
  },
  '/power-rangers': {
    metadata: {
      title: 'POWER RANGERS | Lunar 22',
      description: 'Discover how Shuki Levy helped create Mighty Morphin Power Rangers, shaping its storytelling, music, and legacy into a global pop culture phenomenon.',
      openGraph: {
        title: 'POWER RANGERS | Lunar 22',
        description: 'Discover how Shuki Levy helped create Mighty Morphin Power Rangers, shaping its storytelling, music, and legacy into a global pop culture phenomenon.',
        image: '/powerrangers.jpg',
        type: 'website',
        siteName: 'Lunar 22',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'POWER RANGERS | Lunar 22',
        description: 'Discover how Shuki Levy helped create Mighty Morphin Power Rangers, shaping its storytelling, music, and legacy into a global pop culture phenomenon.',
        image: '/powerrangers.jpg',
        site: '@lunar22media',
      },
      robots: {
        index: true,
        follow: true,
      },
    },
    schema: {
      type: 'creativework',
      data: {},
    },
    sitemap: {
      changefreq: 'monthly',
      priority: 0.8,
    },
  },
  '/founders': {
    metadata: {
      title: 'FOUNDERS | Lunar 22',
      description: 'Meet the founders of Lunar 22 Media. Learn about the visionaries behind our creative content production and entertainment company.',
      openGraph: {
        title: 'FOUNDERS | Lunar 22',
        description: 'Meet the founders of Lunar 22 Media. Learn about the visionaries behind our creative content production and entertainment company.',
        image: '/lem.avif',
        type: 'website',
        siteName: 'Lunar 22',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'FOUNDERS | Lunar 22',
        description: 'Meet the founders of Lunar 22 Media. Learn about the visionaries behind our creative content production and entertainment company.',
        image: '/lem.avif',
        site: '@lunar22media',
      },
      robots: {
        index: true,
        follow: true,
      },
    },
    schema: {
      type: 'webpage',
      data: {},
    },
    sitemap: {
      changefreq: 'yearly',
      priority: 0.7,
    },
  },
};

/**
 * Get SEO configuration for a specific page
 */
export function getPageSEOConfig(path: string): PageSEOConfig | null {
  return pageConfigs[path] || null;
}

/**
 * Get all configured pages for sitemap generation
 */
export function getAllPages(): string[] {
  return Object.keys(pageConfigs);
}

/**
 * Get global SEO configuration
 */
export function getGlobalSEOConfig(): SEOGlobalConfig {
  return seoGlobalConfig;
}

/**
 * Validate SEO configuration completeness
 */
export function validateSEOConfig(config: PageSEOConfig): boolean {
  const { metadata } = config;
  
  // Check required fields
  if (!metadata.title || !metadata.description) {
    return false;
  }
  
  // Check Open Graph completeness
  if (metadata.openGraph) {
    const { title, description, image, siteName } = metadata.openGraph;
    if (!title || !description || !image || !siteName) {
      return false;
    }
  }
  
  // Check Twitter Card completeness
  if (metadata.twitter) {
    const { title, description, image, card } = metadata.twitter;
    if (!title || !description || !image || !card) {
      return false;
    }
  }
  
  return true;
}

/**
 * Get default metadata configuration
 */
export function getDefaultMetadata(): MetadataConfig {
  return {
    title: seoGlobalConfig.site.name,
    description: seoGlobalConfig.site.description,
    openGraph: {
      title: seoGlobalConfig.site.name,
      description: seoGlobalConfig.site.description,
      image: seoGlobalConfig.social.defaultImage,
      type: 'website',
      siteName: seoGlobalConfig.site.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoGlobalConfig.site.name,
      description: seoGlobalConfig.site.description,
      image: seoGlobalConfig.social.defaultImage,
      site: seoGlobalConfig.social.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}