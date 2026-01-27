/**
 * Dynamic Page Discovery System
 * Automatically discovers pages in the Next.js app directory and includes them in SEO processing
 */

import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import { PageInfo, MetadataConfig } from './types';
import { getPageSEOConfig, getDefaultMetadata, getGlobalSEOConfig } from './config';

export interface DiscoveredPage {
  path: string;
  filePath: string;
  isRoute: boolean;
  hasLayout: boolean;
  lastModified: Date;
  type: 'page' | 'api' | 'route';
}

export class PageDiscovery {
  private appDirectory: string;
  private globalConfig = getGlobalSEOConfig();

  constructor(appDirectory: string = 'app') {
    this.appDirectory = appDirectory;
  }

  /**
   * Discover all pages in the app directory
   */
  async discoverPages(): Promise<DiscoveredPage[]> {
    const pages: DiscoveredPage[] = [];
    
    try {
      await this.scanDirectory(this.appDirectory, '', pages);
    } catch (error) {
      console.warn('Failed to discover pages:', error);
      // Return empty array if discovery fails
      return [];
    }
    
    return pages.filter(page => page.isRoute && page.type === 'page');
  }

  /**
   * Get all discoverable page paths for sitemap generation
   */
  async getDiscoverablePagePaths(): Promise<string[]> {
    const discoveredPages = await this.discoverPages();
    
    // Filter out API routes and non-public pages
    const publicPages = discoveredPages.filter(page => 
      page.type === 'page' && 
      !page.path.startsWith('/api') &&
      !this.isPrivatePage(page.path)
    );
    
    return publicPages.map(page => page.path);
  }

  /**
   * Get page information for sitemap generation
   */
  async getPageInfoForSitemap(): Promise<PageInfo[]> {
    const discoveredPages = await this.discoverPages();
    
    return discoveredPages
      .filter(page => 
        page.type === 'page' && 
        !page.path.startsWith('/api') &&
        !this.isPrivatePage(page.path)
      )
      .map(page => ({
        path: page.path,
        lastModified: page.lastModified,
        changeFrequency: this.getChangeFrequency(page.path),
        priority: this.getPagePriority(page.path),
      }));
  }

  /**
   * Check if a discovered page has SEO configuration
   */
  async validatePageSEOCoverage(): Promise<{
    configuredPages: string[];
    unconfiguredPages: string[];
    missingPages: string[];
  }> {
    const discoveredPaths = await this.getDiscoverablePagePaths();
    const configuredPages = Object.keys(await import('./config').then(m => m.pageConfigs));
    
    const unconfiguredPages = discoveredPaths.filter(path => !configuredPages.includes(path));
    const missingPages = configuredPages.filter(path => !discoveredPaths.includes(path));
    
    return {
      configuredPages: configuredPages.filter(path => discoveredPaths.includes(path)),
      unconfiguredPages,
      missingPages,
    };
  }

  /**
   * Generate default SEO configuration for unconfigured pages
   */
  async generateDefaultConfigForPage(path: string): Promise<MetadataConfig> {
    const defaultConfig = getDefaultMetadata();
    const pageName = this.getPageNameFromPath(path);
    
    return {
      ...defaultConfig,
      title: `${pageName.toUpperCase()} | ${this.globalConfig.site.name}`,
      description: `${pageName} page for ${this.globalConfig.site.name}. ${this.globalConfig.site.description}`,
      openGraph: {
        ...defaultConfig.openGraph!,
        title: `${pageName.toUpperCase()} | ${this.globalConfig.site.name}`,
        description: `${pageName} page for ${this.globalConfig.site.name}. ${this.globalConfig.site.description}`,
      },
      twitter: {
        ...defaultConfig.twitter!,
        title: `${pageName.toUpperCase()} | ${this.globalConfig.site.name}`,
        description: `${pageName} page for ${this.globalConfig.site.name}. ${this.globalConfig.site.description}`,
      },
    };
  }

  /**
   * Recursively scan directory for pages
   */
  private async scanDirectory(
    dirPath: string, 
    routePath: string, 
    pages: DiscoveredPage[]
  ): Promise<void> {
    try {
      const entries = await readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dirPath, entry.name);
        const stats = await stat(fullPath);
        
        if (entry.isDirectory()) {
          // Skip certain directories
          if (this.shouldSkipDirectory(entry.name)) {
            continue;
          }
          
          const newRoutePath = routePath + '/' + entry.name;
          await this.scanDirectory(fullPath, newRoutePath, pages);
        } else if (entry.isFile()) {
          const page = this.analyzeFile(fullPath, routePath, stats);
          if (page) {
            pages.push(page);
          }
        }
      }
    } catch (error) {
      // Skip directories that can't be read
      console.warn(`Failed to scan directory ${dirPath}:`, error);
    }
  }

  /**
   * Analyze a file to determine if it's a route
   */
  private analyzeFile(filePath: string, routePath: string, stats: any): DiscoveredPage | null {
    const fileName = filePath.split('/').pop()?.split('\\').pop() || '';
    
    // Check if it's a page file
    if (fileName === 'page.tsx' || fileName === 'page.ts') {
      return {
        path: routePath || '/',
        filePath,
        isRoute: true,
        hasLayout: false, // Will be determined separately
        lastModified: stats.mtime,
        type: 'page',
      };
    }
    
    // Check if it's an API route
    if (fileName === 'route.tsx' || fileName === 'route.ts') {
      return {
        path: routePath || '/',
        filePath,
        isRoute: true,
        hasLayout: false,
        lastModified: stats.mtime,
        type: 'api',
      };
    }
    
    return null;
  }

  /**
   * Check if directory should be skipped
   */
  private shouldSkipDirectory(dirName: string): boolean {
    const skipDirs = [
      'node_modules',
      '.next',
      '.git',
      'dist',
      'build',
      '__tests__',
      '__mocks__',
    ];
    
    return skipDirs.includes(dirName) || dirName.startsWith('.');
  }

  /**
   * Check if page should be excluded from public discovery
   */
  private isPrivatePage(path: string): boolean {
    const privatePatterns = [
      '/api/',
      '/_',
      '/admin',
      '/dashboard',
      '/test',
      '/debug',
    ];
    
    return privatePatterns.some(pattern => path.startsWith(pattern));
  }

  /**
   * Get change frequency for a page based on its path
   */
  private getChangeFrequency(path: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
    // Homepage changes more frequently
    if (path === '/') return 'weekly';
    
    // Content pages change less frequently
    if (path.includes('/about') || path.includes('/founders')) return 'yearly';
    
    // Contact and other pages
    if (path.includes('/contact')) return 'monthly';
    
    // Default for discovered pages
    return 'monthly';
  }

  /**
   * Get priority for a page based on its path
   */
  private getPagePriority(path: string): number {
    // Homepage has highest priority
    if (path === '/') return 1.0;
    
    // Main pages have high priority
    if (['/about', '/contact', '/founders', '/power-rangers'].includes(path)) {
      return 0.8;
    }
    
    // Other discovered pages have medium priority
    return 0.5;
  }

  /**
   * Extract page name from path
   */
  private getPageNameFromPath(path: string): string {
    if (path === '/') return 'Home';
    
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    // Convert kebab-case to title case
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

// Export singleton instance
export const pageDiscovery = new PageDiscovery('app');

// Export utility functions
export async function discoverPages(): Promise<DiscoveredPage[]> {
  return pageDiscovery.discoverPages();
}

export async function getDiscoverablePagePaths(): Promise<string[]> {
  return pageDiscovery.getDiscoverablePagePaths();
}

export async function getPageInfoForSitemap(): Promise<PageInfo[]> {
  return pageDiscovery.getPageInfoForSitemap();
}

export async function validatePageSEOCoverage() {
  return pageDiscovery.validatePageSEOCoverage();
}

export async function generateDefaultConfigForPage(path: string): Promise<MetadataConfig> {
  return pageDiscovery.generateDefaultConfigForPage(path);
}