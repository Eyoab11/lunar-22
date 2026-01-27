/**
 * SEO Infrastructure and Configuration - Main Export
 * Centralized exports for all SEO functionality
 */

// Types and interfaces
export * from './types';

// Configuration management
export * from './config';

// Utility functions
export * from './utils';

// Core SEO components
export * from './metadata-manager';
export * from './social-media-optimizer';
export * from './social-image-optimizer';
export * from './analytics-tracker';
export * from './schema-processor';
export * from './sitemap-generator';
export * from './performance-optimizer';
export * from './visual-asset-optimizer';
export * from './ssr-optimizer';
export * from './page-discovery';
export * from './config-validator';

// Re-export commonly used functions for convenience
export {
  getPageSEOConfig,
  getGlobalSEOConfig,
  getAllPages,
  validateSEOConfig,
  getDefaultMetadata,
} from './config';

export {
  sanitizeTitle,
  sanitizeDescription,
  generateCanonicalUrl,
  normalizeUrlPath,
  validateCanonicalUrl,
  generateValidatedCanonicalUrl,
  getCanonicalUrlFromContext,
  validateMetadata,
  mergeMetadata,
  generateRobotsContent,
  formatSEODate,
  validateStructuredData,
  generateStructuredDataScript,
} from './utils';

export {
  MetadataManager,
  metadataManager,
} from './metadata-manager';

export {
  SocialMediaOptimizer,
  socialMediaOptimizer,
} from './social-media-optimizer';

export {
  SocialImageOptimizer,
  socialImageOptimizer,
} from './social-image-optimizer';

export {
  AnalyticsTracker,
  getAnalyticsTracker,
  initializeAnalytics,
} from './analytics-tracker';

export {
  SchemaProcessor,
  schemaProcessor,
  generatePageSchema,
  validatePageSchema,
} from './schema-processor';

export {
  SitemapGenerator,
  sitemapGenerator,
  generateSitemap,
  generateRobotsTxt,
  validateSitemap,
  getLastModified,
} from './sitemap-generator';

export {
  PerformanceOptimizer,
  performanceOptimizer,
} from './performance-optimizer';

export {
  VisualAssetOptimizer,
  visualAssetOptimizer,
  generateFavicons,
  generateTouchIcons,
  generateVisualAssets,
  optimizeImageForSharing,
} from './visual-asset-optimizer';

export {
  SSROptimizer,
  ssrOptimizer,
} from './ssr-optimizer';

export {
  PageDiscovery,
  pageDiscovery,
  discoverPages,
  getDiscoverablePagePaths,
  getPageInfoForSitemap,
  validatePageSEOCoverage,
  generateDefaultConfigForPage,
} from './page-discovery';

export {
  SEOConfigValidator,
  seoConfigValidator,
  validateCompleteConfiguration,
  validateGlobalConfig,
  validatePageConfigurations,
  validatePageConfig,
  validateMetadataConfig,
} from './config-validator';

// Hooks
export {
  useCoreWebVitals,
} from './hooks/useCoreWebVitals';