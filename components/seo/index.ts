/**
 * SEO Components Export
 * Centralized exports for all SEO-related components
 */

export {
  StructuredData,
  OrganizationStructuredData,
  CreativeWorkStructuredData,
  WebPageStructuredData,
} from './StructuredData';

export {
  OptimizedImage,
} from './OptimizedImage';

export {
  OptimizedScript,
} from './OptimizedScript';

export {
  PerformanceMetadata,
} from './PerformanceMetadata';

export {
  VisualAssets,
  ServerVisualAssets,
} from './VisualAssets';

export {
  SSROptimizer,
  NoSSR,
  SSRFallback,
  HydrationBoundary,
  ClientOnly,
  useHydration,
  useLayoutShiftPrevention,
  HydrationPerformanceMonitor,
} from './SSROptimizer';

export {
  CriticalCSS,
  ResourceHints,
  CrawlerOptimization,
  SSROptimization,
} from './CriticalCSS';

export {
  SEOIntegration,
  generateSEOMetadata,
  HomepageSEO,
  ContactSEO,
  AboutSEO,
  FoundersSEO,
  PowerRangersSEO,
} from './SEOIntegration';