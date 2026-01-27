/**
 * SSR_Optimizer Class - Server-Side Rendering Optimization
 * Ensures all SEO metadata is present in initial HTML and optimizes SSR for crawlers
 */

import { Metadata } from 'next';
import { headers } from 'next/headers';
import { metadataManager } from './metadata-manager';
import { schemaProcessor } from './schema-processor';
import { performanceOptimizer } from './performance-optimizer';
import { getGlobalSEOConfig } from './config';
import { MetadataConfig, PerformanceConfig } from './types';

export interface SSROptimizationConfig {
  enableCriticalCSS: boolean;
  enableCrawlerOptimization: boolean;
  enableMetadataValidation: boolean;
  criticalCSSThreshold: number; // bytes
  enableResourceHints: boolean;
}

export interface CrawlerInfo {
  isCrawler: boolean;
  userAgent: string;
  crawlerType: 'googlebot' | 'bingbot' | 'facebookbot' | 'twitterbot' | 'other' | 'user';
}

export interface SSRMetadata extends Metadata {
  structuredData?: string[];
  criticalCSS?: string;
  resourceHints?: string[];
  crawlerOptimized?: boolean;
}

export class SSROptimizer {
  private globalConfig = getGlobalSEOConfig();
  private ssrConfig: SSROptimizationConfig;

  constructor(config?: Partial<SSROptimizationConfig>) {
    this.ssrConfig = {
      enableCriticalCSS: true,
      enableCrawlerOptimization: true,
      enableMetadataValidation: true,
      criticalCSSThreshold: 14000, // 14KB threshold for critical CSS
      enableResourceHints: true,
      ...config,
    };
  }

  /**
   * Detect if the request is from a search engine crawler
   */
  async detectCrawler(): Promise<CrawlerInfo> {
    try {
      const headersList = await headers();
      const userAgent = headersList.get('user-agent') || '';
      
      const crawlerPatterns = {
        googlebot: /googlebot|google/i,
        bingbot: /bingbot|bing/i,
        facebookbot: /facebookexternalhit|facebookbot/i,
        twitterbot: /twitterbot|twitter/i,
      };

      for (const [type, pattern] of Object.entries(crawlerPatterns)) {
        if (pattern.test(userAgent)) {
          return {
            isCrawler: true,
            userAgent,
            crawlerType: type as CrawlerInfo['crawlerType'],
          };
        }
      }

      // Check for other common crawler patterns
      const otherCrawlerPattern = /bot|crawler|spider|scraper|slurp|yahoo|duckduckbot/i;
      if (otherCrawlerPattern.test(userAgent)) {
        return {
          isCrawler: true,
          userAgent,
          crawlerType: 'other',
        };
      }

      return {
        isCrawler: false,
        userAgent,
        crawlerType: 'user',
      };
    } catch (error) {
      // Fallback if headers are not available
      return {
        isCrawler: false,
        userAgent: '',
        crawlerType: 'user',
      };
    }
  }

  /**
   * Generate complete SSR-optimized metadata for a page
   */
  async generateSSRMetadata(
    page: string,
    customConfig?: Partial<MetadataConfig>
  ): Promise<SSRMetadata> {
    const crawlerInfo = await this.detectCrawler();
    
    // Generate base metadata
    const baseMetadata = await metadataManager.generateMetadata(page, customConfig);
    
    // Generate structured data
    const structuredData: string[] = [];
    
    if (page === '/') {
      // Homepage gets Organization schema
      const orgSchema = schemaProcessor.generateOrganizationSchema();
      structuredData.push(schemaProcessor.renderJsonLd([orgSchema]));
    } else {
      // Other pages get CreativeWork schema
      const creativeWorkSchema = schemaProcessor.generateCreativeWorkSchema({
        title: baseMetadata.title as string || 'Lunar 22',
        description: baseMetadata.description || '',
        author: 'Lunar 22',
      });
      structuredData.push(schemaProcessor.renderJsonLd([creativeWorkSchema]));
    }

    // Generate resource hints for performance
    const resourceHints: string[] = [];
    if (this.ssrConfig.enableResourceHints) {
      const performanceConfig: PerformanceConfig = {
        preload: [
          '/fonts/raleway-variable.woff2',
          this.globalConfig.social.defaultImage,
        ],
        prefetch: [
          '/contact',
          '/about',
          '/power-rangers',
        ],
        critical: page === '/',
      };

      resourceHints.push(...performanceOptimizer.generatePreloadLinks(performanceConfig));
      resourceHints.push(...performanceOptimizer.generatePrefetchLinks(performanceConfig));
      resourceHints.push(...performanceOptimizer.generateDNSPrefetchHints());
    }

    // Generate critical CSS if enabled
    let criticalCSS: string | undefined;
    if (this.ssrConfig.enableCriticalCSS) {
      criticalCSS = this.generateCriticalCSS(page);
    }

    const ssrMetadata: SSRMetadata = {
      ...baseMetadata,
      structuredData,
      criticalCSS,
      resourceHints,
      crawlerOptimized: crawlerInfo.isCrawler && this.ssrConfig.enableCrawlerOptimization,
    };

    // Validate metadata if enabled
    if (this.ssrConfig.enableMetadataValidation) {
      this.validateSSRMetadata(ssrMetadata);
    }

    return ssrMetadata;
  }

  /**
   * Generate critical CSS for above-the-fold content
   */
  private generateCriticalCSS(page: string): string {
    // Critical CSS for above-the-fold content
    const criticalCSS = `
      /* Critical CSS for ${page} */
      html { scroll-behavior: smooth; }
      body { 
        font-family: 'Raleway', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #000000;
        color: #ffffff;
        overflow-x: hidden;
        margin: 0;
        padding: 0;
      }
      
      /* Header critical styles */
      header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        background: transparent;
      }
      
      /* Hero section critical styles */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
      }
      
      /* Typography critical styles */
      h1, h2, h3, h4, h5, h6 { font-weight: 800; }
      h1 { font-size: 3rem; line-height: 1.1; }
      
      /* Layout critical styles */
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
      
      /* Button critical styles */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        border: none;
      }
      
      .btn-primary:hover {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        transform: translateY(-1px);
      }
      
      /* Loading states */
      .loading { opacity: 0; }
      .loaded { opacity: 1; transition: opacity 0.3s ease; }
      
      /* Responsive critical styles */
      @media (max-width: 768px) {
        h1 { font-size: 2rem; }
        .container { padding: 0 1rem; }
      }
    `;

    return performanceOptimizer.generateCriticalCSSInline(criticalCSS);
  }

  /**
   * Validate SSR metadata completeness
   */
  private validateSSRMetadata(metadata: SSRMetadata): void {
    const errors: string[] = [];

    // Check required metadata fields
    if (!metadata.title) {
      errors.push('Missing title metadata');
    }

    if (!metadata.description) {
      errors.push('Missing description metadata');
    }

    // Check Open Graph metadata
    if (!metadata.openGraph) {
      errors.push('Missing Open Graph metadata');
    } else {
      if (!metadata.openGraph.title) errors.push('Missing Open Graph title');
      if (!metadata.openGraph.description) errors.push('Missing Open Graph description');
      if (!metadata.openGraph.images || 
          (Array.isArray(metadata.openGraph.images) && metadata.openGraph.images.length === 0)) {
        errors.push('Missing Open Graph images');
      }
    }

    // Check Twitter metadata
    if (!metadata.twitter) {
      errors.push('Missing Twitter Card metadata');
    }

    // Check structured data
    if (!metadata.structuredData || metadata.structuredData.length === 0) {
      errors.push('Missing structured data');
    }

    // Check canonical URL
    if (!metadata.alternates?.canonical) {
      errors.push('Missing canonical URL');
    }

    if (errors.length > 0) {
      console.warn('SSR Metadata validation warnings:', errors);
    }
  }

  /**
   * Generate crawler-optimized HTML attributes
   */
  generateCrawlerOptimizedAttributes(): Record<string, string> {
    return {
      'data-ssr-optimized': 'true',
      'data-seo-ready': 'true',
      'data-crawler-friendly': 'true',
    };
  }

  /**
   * Generate performance hints for SSR
   */
  generateSSRPerformanceHints(page: string): string[] {
    const hints: string[] = [];

    // DNS prefetch for external resources
    hints.push('<link rel="dns-prefetch" href="//fonts.googleapis.com">');
    hints.push('<link rel="dns-prefetch" href="//fonts.gstatic.com">');
    hints.push('<link rel="dns-prefetch" href="//www.googletagmanager.com">');

    // Preconnect to critical external domains
    hints.push('<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>');
    hints.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');

    // Preload critical resources based on page
    if (page === '/') {
      hints.push('<link rel="preload" href="/fonts/raleway-variable.woff2" as="font" type="font/woff2" crossorigin>');
      hints.push(`<link rel="preload" href="${this.globalConfig.social.defaultImage}" as="image">`);
    }

    return hints;
  }

  /**
   * Check if SSR optimization should be applied
   */
  async shouldOptimizeForSSR(): Promise<boolean> {
    const crawlerInfo = await this.detectCrawler();
    return crawlerInfo.isCrawler || this.ssrConfig.enableCrawlerOptimization;
  }

  /**
   * Generate complete SSR optimization package
   */
  async generateSSROptimizationPackage(
    page: string,
    customConfig?: Partial<MetadataConfig>
  ): Promise<{
    metadata: SSRMetadata;
    criticalCSS: string;
    resourceHints: string[];
    htmlAttributes: Record<string, string>;
    shouldOptimize: boolean;
  }> {
    const shouldOptimize = await this.shouldOptimizeForSSR();
    const metadata = await this.generateSSRMetadata(page, customConfig);
    const criticalCSS = metadata.criticalCSS || '';
    const resourceHints = metadata.resourceHints || [];
    const htmlAttributes = this.generateCrawlerOptimizedAttributes();

    return {
      metadata,
      criticalCSS,
      resourceHints,
      htmlAttributes,
      shouldOptimize,
    };
  }

  /**
   * Update SSR configuration
   */
  updateSSRConfig(config: Partial<SSROptimizationConfig>): void {
    this.ssrConfig = { ...this.ssrConfig, ...config };
  }

  /**
   * Get current SSR configuration
   */
  getSSRConfig(): SSROptimizationConfig {
    return { ...this.ssrConfig };
  }
}

// Export singleton instance
export const ssrOptimizer = new SSROptimizer();