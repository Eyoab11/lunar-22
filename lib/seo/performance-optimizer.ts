/**
 * Performance_Optimizer Class - Core Web Vitals Optimization
 * Handles image lazy loading, script prioritization, and resource hints
 */

import { 
  PerformanceConfig, 
  CoreWebVitalsConfig, 
  ValidationResult 
} from './types';
import { getGlobalSEOConfig } from './config';

export interface ImageOptimizationConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export interface ScriptOptimizationConfig {
  src: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  async?: boolean;
  defer?: boolean;
  priority?: boolean;
}

export interface ResourceHint {
  href: string;
  as?: 'script' | 'style' | 'image' | 'font' | 'document';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

export class PerformanceOptimizer {
  private globalConfig = getGlobalSEOConfig();
  private coreWebVitalsThresholds: CoreWebVitalsConfig;

  constructor() {
    this.coreWebVitalsThresholds = this.globalConfig.performance.coreWebVitalsThresholds;
  }

  /**
   * Generate optimized image attributes for lazy loading
   */
  optimizeImageAttributes(config: ImageOptimizationConfig): Record<string, any> {
    const attributes: Record<string, any> = {
      src: config.src,
      alt: config.alt,
    };

    // Add dimensions if provided
    if (config.width) attributes.width = config.width;
    if (config.height) attributes.height = config.height;

    // Add sizes attribute for responsive images
    if (config.sizes) {
      attributes.sizes = config.sizes;
    } else {
      // Default responsive sizes
      attributes.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }

    // Priority loading for above-the-fold images
    if (config.priority) {
      attributes.priority = true;
      attributes.loading = 'eager';
      attributes.fetchPriority = 'high';
    } else {
      // Lazy loading for below-the-fold images
      attributes.loading = 'lazy';
      attributes.decoding = 'async';
    }

    // Quality optimization
    if (config.quality) {
      attributes.quality = config.quality;
    }

    return attributes;
  }

  /**
   * Generate optimized script attributes for performance
   */
  optimizeScriptAttributes(config: ScriptOptimizationConfig): Record<string, any> {
    const attributes: Record<string, any> = {
      src: config.src,
    };

    // Strategy-based optimization
    if (config.strategy) {
      attributes.strategy = config.strategy;
    }

    // Priority scripts load synchronously
    if (config.priority) {
      attributes.strategy = 'beforeInteractive';
    } else {
      // Non-priority scripts use async/defer
      if (config.async !== false) {
        attributes.async = true;
      }
      
      if (config.defer !== false && !attributes.async) {
        attributes.defer = true;
      }
    }

    return attributes;
  }

  /**
   * Generate resource hints for preloading critical resources
   */
  generateResourceHints(performanceConfig: PerformanceConfig): ResourceHint[] {
    const hints: ResourceHint[] = [];

    // Preload critical resources
    if (performanceConfig.preload) {
      performanceConfig.preload.forEach(href => {
        const hint: ResourceHint = { href };
        
        // Determine resource type from file extension
        if (href.match(/\.(woff2?|ttf|otf)$/i)) {
          hint.as = 'font';
          hint.crossOrigin = 'anonymous';
        } else if (href.match(/\.(css)$/i)) {
          hint.as = 'style';
        } else if (href.match(/\.(js)$/i)) {
          hint.as = 'script';
        } else if (href.match(/\.(jpg|jpeg|png|webp|avif|svg)$/i)) {
          hint.as = 'image';
        }

        hints.push(hint);
      });
    }

    // Prefetch non-critical resources
    if (performanceConfig.prefetch) {
      performanceConfig.prefetch.forEach(href => {
        hints.push({ href });
      });
    }

    return hints;
  }

  /**
   * Generate preload link tags for HTML head
   */
  generatePreloadLinks(performanceConfig: PerformanceConfig): string[] {
    const hints = this.generateResourceHints(performanceConfig);
    const preloadLinks: string[] = [];

    hints.forEach(hint => {
      if (performanceConfig.preload?.includes(hint.href)) {
        let linkTag = `<link rel="preload" href="${hint.href}"`;
        
        if (hint.as) linkTag += ` as="${hint.as}"`;
        if (hint.type) linkTag += ` type="${hint.type}"`;
        if (hint.crossOrigin) linkTag += ` crossorigin="${hint.crossOrigin}"`;
        
        linkTag += '>';
        preloadLinks.push(linkTag);
      }
    });

    return preloadLinks;
  }

  /**
   * Generate prefetch link tags for HTML head
   */
  generatePrefetchLinks(performanceConfig: PerformanceConfig): string[] {
    const prefetchLinks: string[] = [];

    if (performanceConfig.prefetch) {
      performanceConfig.prefetch.forEach(href => {
        prefetchLinks.push(`<link rel="prefetch" href="${href}">`);
      });
    }

    return prefetchLinks;
  }

  /**
   * Generate DNS prefetch hints for external domains
   */
  generateDNSPrefetchHints(): string[] {
    const hints: string[] = [];

    // Common external domains to prefetch
    const externalDomains = [
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    externalDomains.forEach(domain => {
      hints.push(`<link rel="dns-prefetch" href="${domain}">`);
    });

    return hints;
  }

  /**
   * Optimize critical CSS inlining
   */
  generateCriticalCSSInline(css: string): string {
    // Minify CSS by removing unnecessary whitespace and comments
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .replace(/\s*{\s*/g, '{') // Clean up opening braces
      .replace(/\s*}\s*/g, '}') // Clean up closing braces
      .replace(/;\s*}/g, '}') // Remove unnecessary semicolons before closing braces
      .trim();
  }

  /**
   * Generate performance optimization metadata for Next.js
   */
  generatePerformanceMetadata(performanceConfig: PerformanceConfig): Record<string, any> {
    const metadata: Record<string, any> = {};

    // Generate resource hints
    const hints = this.generateResourceHints(performanceConfig);
    
    if (hints.length > 0) {
      metadata.other = metadata.other || {};
      
      // Add preload links
      const preloadLinks = this.generatePreloadLinks(performanceConfig);
      const prefetchLinks = this.generatePrefetchLinks(performanceConfig);
      const dnsHints = this.generateDNSPrefetchHints();
      
      // Combine all hints into other metadata
      const allHints = [...preloadLinks, ...prefetchLinks, ...dnsHints];
      allHints.forEach((hint, index) => {
        metadata.other[`performance-hint-${index}`] = hint;
      });
    }

    return metadata;
  }

  /**
   * Validate Core Web Vitals thresholds
   */
  validateCoreWebVitals(metrics: {
    lcp?: number;
    fid?: number;
    cls?: number;
  }): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate Largest Contentful Paint
    if (metrics.lcp !== undefined) {
      if (metrics.lcp > this.coreWebVitalsThresholds.lcp) {
        errors.push(`LCP (${metrics.lcp}s) exceeds threshold (${this.coreWebVitalsThresholds.lcp}s)`);
      } else if (metrics.lcp > this.coreWebVitalsThresholds.lcp * 0.8) {
        warnings.push(`LCP (${metrics.lcp}s) is approaching threshold (${this.coreWebVitalsThresholds.lcp}s)`);
      }
    }

    // Validate First Input Delay
    if (metrics.fid !== undefined) {
      if (metrics.fid > this.coreWebVitalsThresholds.fid) {
        errors.push(`FID (${metrics.fid}ms) exceeds threshold (${this.coreWebVitalsThresholds.fid}ms)`);
      } else if (metrics.fid > this.coreWebVitalsThresholds.fid * 0.8) {
        warnings.push(`FID (${metrics.fid}ms) is approaching threshold (${this.coreWebVitalsThresholds.fid}ms)`);
      }
    }

    // Validate Cumulative Layout Shift
    if (metrics.cls !== undefined) {
      if (metrics.cls > this.coreWebVitalsThresholds.cls) {
        errors.push(`CLS (${metrics.cls}) exceeds threshold (${this.coreWebVitalsThresholds.cls})`);
      } else if (metrics.cls > this.coreWebVitalsThresholds.cls * 0.8) {
        warnings.push(`CLS (${metrics.cls}) is approaching threshold (${this.coreWebVitalsThresholds.cls})`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Generate performance optimization recommendations
   */
  generateOptimizationRecommendations(performanceConfig: PerformanceConfig): string[] {
    const recommendations: string[] = [];

    // Check for critical resource preloading
    if (!performanceConfig.preload || performanceConfig.preload.length === 0) {
      recommendations.push('Consider preloading critical resources (fonts, hero images, critical CSS)');
    }

    // Check for prefetch configuration
    if (!performanceConfig.prefetch || performanceConfig.prefetch.length === 0) {
      recommendations.push('Consider prefetching resources for likely next page navigations');
    }

    // Check for critical page designation
    if (!performanceConfig.critical) {
      recommendations.push('Consider marking important pages as critical for enhanced optimization');
    }

    return recommendations;
  }

  /**
   * Get Core Web Vitals thresholds
   */
  getCoreWebVitalsThresholds(): CoreWebVitalsConfig {
    return { ...this.coreWebVitalsThresholds };
  }

  /**
   * Update Core Web Vitals thresholds
   */
  updateCoreWebVitalsThresholds(thresholds: Partial<CoreWebVitalsConfig>): void {
    this.coreWebVitalsThresholds = {
      ...this.coreWebVitalsThresholds,
      ...thresholds,
    };
  }

  /**
   * Check if performance optimization is enabled globally
   */
  isOptimizationEnabled(): boolean {
    return this.globalConfig.performance.enableOptimization;
  }

  /**
   * Generate viewport meta tag for mobile optimization
   */
  generateViewportMeta(): string {
    return 'width=device-width, initial-scale=1, viewport-fit=cover';
  }

  /**
   * Generate performance-optimized Next.js Image component props
   */
  generateNextImageProps(config: ImageOptimizationConfig): Record<string, any> {
    const props = this.optimizeImageAttributes(config);
    
    // Next.js specific optimizations
    props.placeholder = 'blur';
    props.blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
    
    return props;
  }
}

// Export singleton instance
export const performanceOptimizer = new PerformanceOptimizer();