/**
 * Sitemap Generator for XML sitemap and robots.txt
 * Implements XML sitemap generation with all public pages and robots.txt creation
 */

import { SitemapEntry, PageInfo, ValidationResult, RobotsTxtConfig } from './types';
import { getGlobalSEOConfig, getAllPages, getPageSEOConfig } from './config';
import { formatSEODate, isValidUrl } from './utils';
import { getPageInfoForSitemap, getDiscoverablePagePaths } from './page-discovery';

export class SitemapGenerator {
  private baseUrl: string;

  constructor() {
    const config = getGlobalSEOConfig();
    this.baseUrl = config.site.url.replace(/\/$/, ''); // Remove trailing slash
  }

  /**
   * Generate XML sitemap with all public pages (including dynamically discovered ones)
   */
  async generateSitemap(pages?: PageInfo[]): Promise<string> {
    let sitemapPages: PageInfo[];
    
    if (pages) {
      sitemapPages = pages;
    } else {
      // Combine configured pages with dynamically discovered pages
      const configuredPages = this.getDefaultPages();
      const discoveredPages = await getPageInfoForSitemap();
      
      // Merge pages, giving priority to configured pages
      const configuredPaths = new Set(configuredPages.map(p => p.path));
      const additionalPages = discoveredPages.filter(p => !configuredPaths.has(p.path));
      
      sitemapPages = [...configuredPages, ...additionalPages];
    }
    
    const entries = sitemapPages.map(page => this.createSitemapEntry(page));
    
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsetClose = '</urlset>';
    
    const urlEntries = entries.map(entry => this.formatSitemapEntry(entry)).join('\n');
    
    return `${xmlHeader}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`;
  }

  /**
   * Generate robots.txt with proper crawling directives
   */
  generateRobotsTxt(config?: RobotsTxtConfig): string {
    const robotsConfig = config || this.getDefaultRobotsConfig();
    const lines: string[] = [];
    
    // User-agent directive
    lines.push(`User-agent: ${robotsConfig.userAgent || '*'}`);
    
    // Allow directives
    if (robotsConfig.allow && robotsConfig.allow.length > 0) {
      robotsConfig.allow.forEach(path => {
        lines.push(`Allow: ${path}`);
      });
    } else {
      // Default: allow all
      lines.push('Allow: /');
    }
    
    // Disallow directives
    if (robotsConfig.disallow && robotsConfig.disallow.length > 0) {
      robotsConfig.disallow.forEach(path => {
        lines.push(`Disallow: ${path}`);
      });
    }
    
    // Crawl delay
    if (robotsConfig.crawlDelay && robotsConfig.crawlDelay > 0) {
      lines.push(`Crawl-delay: ${robotsConfig.crawlDelay}`);
    }
    
    // Sitemap reference
    const sitemapUrl = robotsConfig.sitemap || `${this.baseUrl}/sitemap.xml`;
    lines.push(`\nSitemap: ${sitemapUrl}`);
    
    return lines.join('\n');
  }

  /**
   * Validate XML sitemap format and content
   */
  validateSitemap(xml: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    if (!xml || typeof xml !== 'string') {
      errors.push('Sitemap XML is required');
      return { isValid: false, errors, warnings };
    }
    
    // Check XML declaration
    if (!xml.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      errors.push('Sitemap must include XML declaration');
    }
    
    // Check urlset namespace
    if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      errors.push('Sitemap must include proper urlset namespace');
    }
    
    // Check for required elements
    if (!xml.includes('<urlset') || !xml.includes('</urlset>')) {
      errors.push('Sitemap must include urlset element');
    }
    
    // Check for URL entries
    const urlCount = (xml.match(/<url>/g) || []).length;
    if (urlCount === 0) {
      warnings.push('Sitemap contains no URL entries');
    }
    
    // Check for malformed URLs
    const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g);
    if (urlMatches) {
      urlMatches.forEach(match => {
        const url = match.replace(/<\/?loc>/g, '');
        if (!isValidUrl(url)) {
          errors.push(`Invalid URL found in sitemap: ${url}`);
        }
      });
    }
    
    // Check XML size (should be under 50MB and 50,000 URLs)
    if (xml.length > 50 * 1024 * 1024) {
      errors.push('Sitemap exceeds 50MB size limit');
    }
    
    if (urlCount > 50000) {
      errors.push('Sitemap exceeds 50,000 URL limit');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Get last modified date for a page path
   */
  getLastModified(path: string): string {
    // In a real implementation, this would check file system or database
    // For now, return current date for dynamic pages or a default date
    const now = new Date();
    
    // Static pages get a fixed date, dynamic pages get current date
    const staticPages = ['/', '/about', '/founders'];
    if (staticPages.includes(path)) {
      // Use a fixed date for static content
      return formatSEODate(new Date('2024-01-01'));
    }
    
    return formatSEODate(now);
  }

  /**
   * Create sitemap entry from page information
   */
  private createSitemapEntry(page: PageInfo): SitemapEntry {
    const url = `${this.baseUrl}${page.path}`;
    const lastmod = page.lastModified 
      ? formatSEODate(page.lastModified) 
      : this.getLastModified(page.path);
    
    // Get page-specific configuration
    const pageConfig = getPageSEOConfig(page.path);
    const sitemapConfig = pageConfig?.sitemap;
    
    return {
      url,
      lastmod,
      changefreq: page.changeFrequency || sitemapConfig?.changefreq || 'monthly',
      priority: page.priority ?? sitemapConfig?.priority ?? 0.5,
    };
  }

  /**
   * Format sitemap entry as XML
   */
  private formatSitemapEntry(entry: SitemapEntry): string {
    const lines = [
      '  <url>',
      `    <loc>${this.escapeXml(entry.url)}</loc>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority.toFixed(1)}</priority>`,
      '  </url>',
    ];
    
    return lines.join('\n');
  }

  /**
   * Get all discoverable pages (configured + dynamically discovered)
   */
  async getAllDiscoverablePages(): Promise<string[]> {
    const configuredPages = getAllPages();
    const discoveredPages = await getDiscoverablePagePaths();
    
    // Combine and deduplicate
    const allPages = new Set([...configuredPages, ...discoveredPages]);
    return Array.from(allPages);
  }

  /**
   * Get default pages from configuration
   */
  private getDefaultPages(): PageInfo[] {
    const configuredPages = getAllPages();
    
    return configuredPages.map(path => ({
      path,
      lastModified: new Date(this.getLastModified(path)),
    }));
  }

  /**
   * Get default robots.txt configuration
   */
  private getDefaultRobotsConfig(): RobotsTxtConfig {
    return {
      userAgent: '*',
      allow: ['/'],
      disallow: [],
      sitemap: `${this.baseUrl}/sitemap.xml`,
      crawlDelay: undefined, // No crawl delay by default
    };
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(text: string): string {
    const xmlEntities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    };
    
    return text.replace(/[&<>"']/g, (match) => xmlEntities[match] || match);
  }
}

// Export singleton instance
export const sitemapGenerator = new SitemapGenerator();

// Export utility functions
export async function generateSitemap(pages?: PageInfo[]): Promise<string> {
  return sitemapGenerator.generateSitemap(pages);
}

export function generateRobotsTxt(config?: RobotsTxtConfig): string {
  return sitemapGenerator.generateRobotsTxt(config);
}

export function validateSitemap(xml: string): ValidationResult {
  return sitemapGenerator.validateSitemap(xml);
}

export async function getAllDiscoverablePages(): Promise<string[]> {
  return sitemapGenerator.getAllDiscoverablePages();
}
export function getLastModified(path: string): string {
  return sitemapGenerator.getLastModified(path);
}