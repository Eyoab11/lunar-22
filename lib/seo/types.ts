/**
 * SEO Configuration Types and Interfaces
 * Defines all TypeScript interfaces for the SEO optimization system
 */

// Core metadata configuration
export interface MetadataConfig {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: OpenGraphConfig;
  twitter?: TwitterConfig;
  robots?: RobotsConfig;
}

// Open Graph configuration
export interface OpenGraphConfig {
  title: string;
  description: string;
  image: string;
  type: 'website' | 'article';
  siteName: string;
}

// Twitter Card configuration
export interface TwitterConfig {
  card: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  image: string;
  site?: string;
}

// Robots meta tag configuration
export interface RobotsConfig {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
}

// Analytics configuration
export interface AnalyticsConfig {
  trackingId: string;
  enableDebug?: boolean;
  respectDNT?: boolean;
  customDimensions?: Record<string, string>;
}

// Schema.org structured data interfaces
export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone?: string;
  contactType?: string;
  email?: string;
}

export interface Organization {
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint?: ContactPoint;
  sameAs?: string[];
}

export interface OrganizationSchema extends Organization {
  '@context': 'https://schema.org';
}

export interface CreativeWorkSchema {
  '@context': 'https://schema.org';
  '@type': 'CreativeWork';
  name: string;
  description: string;
  creator: Organization;
  datePublished?: string;
  dateModified?: string;
}

// Schema configuration
export interface SchemaConfig {
  type: 'organization' | 'creativework' | 'webpage';
  data: Record<string, any>;
}

// Performance optimization configuration
export interface PerformanceConfig {
  preload?: string[];
  prefetch?: string[];
  critical?: boolean;
}

// Core Web Vitals thresholds
export interface CoreWebVitalsConfig {
  lcp: number; // Largest Contentful Paint threshold (seconds)
  fid: number; // First Input Delay threshold (milliseconds)
  cls: number; // Cumulative Layout Shift threshold
}

// Sitemap configuration
export interface SitemapConfig {
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastmod?: string;
}

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Page-specific SEO configuration
export interface PageSEOConfig {
  metadata: MetadataConfig;
  schema?: SchemaConfig;
  performance?: PerformanceConfig;
  sitemap?: SitemapConfig;
}

// Global SEO configuration
export interface SEOGlobalConfig {
  site: {
    name: string;
    url: string;
    description: string;
    logo: string;
  };
  analytics: AnalyticsConfig;
  social: {
    defaultImage: string;
    twitterHandle?: string;
  };
  performance: {
    enableOptimization: boolean;
    coreWebVitalsThresholds: CoreWebVitalsConfig;
  };
}

// Content information for schema generation
export interface ContentInfo {
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

// Page information for sitemap generation
export interface PageInfo {
  path: string;
  lastModified?: Date;
  changeFrequency?: SitemapConfig['changefreq'];
  priority?: number;
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Robots.txt configuration
export interface RobotsTxtConfig {
  userAgent?: string;
  allow?: string[];
  disallow?: string[];
  sitemap?: string;
  crawlDelay?: number;
}