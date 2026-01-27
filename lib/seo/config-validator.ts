/**
 * SEO Configuration Validation System
 * Validates all SEO configurations and metadata for completeness and correctness
 */

import { 
  SEOGlobalConfig, 
  PageSEOConfig, 
  MetadataConfig, 
  ValidationResult,
  OpenGraphConfig,
  TwitterConfig,
  RobotsConfig,
  AnalyticsConfig,
  PerformanceConfig,
  SchemaConfig,
  CoreWebVitalsConfig
} from './types';
import { isValidUrl, sanitizeTitle, sanitizeDescription } from './utils';
import { validatePageSEOCoverage } from './page-discovery';

export interface SEOValidationReport {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  pageValidation: {
    configuredPages: string[];
    unconfiguredPages: string[];
    missingPages: string[];
    invalidConfigs: Array<{
      page: string;
      errors: string[];
    }>;
  };
  globalConfigValidation: ValidationResult;
  recommendations: string[];
}

export class SEOConfigValidator {
  /**
   * Validate complete SEO system configuration
   */
  async validateCompleteConfiguration(): Promise<SEOValidationReport> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Validate global configuration
    const globalValidation = this.validateGlobalConfig();
    if (!globalValidation.isValid) {
      errors.push(...globalValidation.errors);
    }
    warnings.push(...globalValidation.warnings);

    // Validate page coverage and configurations
    const pageValidation = await this.validatePageConfigurations();
    
    // Add page-specific errors
    pageValidation.invalidConfigs.forEach(config => {
      errors.push(...config.errors.map(err => `Page ${config.page}: ${err}`));
    });

    // Add warnings for unconfigured pages
    if (pageValidation.unconfiguredPages.length > 0) {
      warnings.push(`Found ${pageValidation.unconfiguredPages.length} pages without SEO configuration: ${pageValidation.unconfiguredPages.join(', ')}`);
      recommendations.push('Consider adding SEO configuration for all discovered pages');
    }

    // Add warnings for missing pages
    if (pageValidation.missingPages.length > 0) {
      warnings.push(`Found ${pageValidation.missingPages.length} configured pages that don't exist: ${pageValidation.missingPages.join(', ')}`);
      recommendations.push('Remove configurations for non-existent pages');
    }

    // Generate recommendations
    if (pageValidation.configuredPages.length < 5) {
      recommendations.push('Consider adding more pages to improve site structure');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      pageValidation,
      globalConfigValidation: globalValidation,
      recommendations,
    };
  }

  /**
   * Validate global SEO configuration
   */
  validateGlobalConfig(): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const { getGlobalSEOConfig } = require('./config');
      const config: SEOGlobalConfig = getGlobalSEOConfig();

      // Validate site configuration
      const siteValidation = this.validateSiteConfig(config.site);
      errors.push(...siteValidation.errors);
      warnings.push(...siteValidation.warnings);

      // Validate analytics configuration
      const analyticsValidation = this.validateAnalyticsConfig(config.analytics);
      errors.push(...analyticsValidation.errors);
      warnings.push(...analyticsValidation.warnings);

      // Validate social configuration
      const socialValidation = this.validateSocialConfig(config.social);
      errors.push(...socialValidation.errors);
      warnings.push(...socialValidation.warnings);

      // Validate performance configuration
      const performanceValidation = this.validateGlobalPerformanceConfig(config.performance);
      errors.push(...performanceValidation.errors);
      warnings.push(...performanceValidation.warnings);

    } catch (error) {
      errors.push(`Failed to load global configuration: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate page configurations and coverage
   */
  async validatePageConfigurations(): Promise<{
    configuredPages: string[];
    unconfiguredPages: string[];
    missingPages: string[];
    invalidConfigs: Array<{
      page: string;
      errors: string[];
    }>;
  }> {
    const coverage = await validatePageSEOCoverage();
    const invalidConfigs: Array<{ page: string; errors: string[] }> = [];

    // Validate each configured page
    try {
      const { pageConfigs } = require('./config');
      
      for (const [path, config] of Object.entries(pageConfigs)) {
        const validation = this.validatePageConfig(config as PageSEOConfig);
        if (!validation.isValid) {
          invalidConfigs.push({
            page: path,
            errors: validation.errors,
          });
        }
      }
    } catch (error) {
      invalidConfigs.push({
        page: 'global',
        errors: [`Failed to load page configurations: ${error}`],
      });
    }

    return {
      ...coverage,
      invalidConfigs,
    };
  }

  /**
   * Validate individual page SEO configuration
   */
  validatePageConfig(config: PageSEOConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate metadata
    const metadataValidation = this.validateMetadataConfig(config.metadata);
    errors.push(...metadataValidation.errors);
    warnings.push(...metadataValidation.warnings);

    // Validate schema configuration if present
    if (config.schema) {
      const schemaValidation = this.validateSchemaConfig(config.schema);
      errors.push(...schemaValidation.errors);
      warnings.push(...schemaValidation.warnings);
    }

    // Validate performance configuration if present
    if (config.performance) {
      const performanceValidation = this.validatePerformanceConfig(config.performance);
      errors.push(...performanceValidation.errors);
      warnings.push(...performanceValidation.warnings);
    }

    // Validate sitemap configuration if present
    if (config.sitemap) {
      const sitemapValidation = this.validateSitemapConfig(config.sitemap);
      errors.push(...sitemapValidation.errors);
      warnings.push(...sitemapValidation.warnings);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate metadata configuration
   */
  validateMetadataConfig(metadata: MetadataConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    if (!metadata.title || metadata.title.trim().length === 0) {
      errors.push('Title is required');
    } else {
      // Title length validation
      if (metadata.title.length > 60) {
        warnings.push(`Title is ${metadata.title.length} characters, consider keeping under 60`);
      }
      if (metadata.title.length < 10) {
        warnings.push('Title is very short, consider making it more descriptive');
      }
    }

    if (!metadata.description || metadata.description.trim().length === 0) {
      errors.push('Description is required');
    } else {
      // Description length validation
      if (metadata.description.length > 160) {
        warnings.push(`Description is ${metadata.description.length} characters, consider keeping under 160`);
      }
      if (metadata.description.length < 50) {
        warnings.push('Description is short, consider making it more descriptive');
      }
    }

    // Validate Open Graph if present
    if (metadata.openGraph) {
      const ogValidation = this.validateOpenGraphConfig(metadata.openGraph);
      errors.push(...ogValidation.errors);
      warnings.push(...ogValidation.warnings);
    } else {
      warnings.push('Open Graph metadata is missing, recommended for social sharing');
    }

    // Validate Twitter Card if present
    if (metadata.twitter) {
      const twitterValidation = this.validateTwitterConfig(metadata.twitter);
      errors.push(...twitterValidation.errors);
      warnings.push(...twitterValidation.warnings);
    } else {
      warnings.push('Twitter Card metadata is missing, recommended for social sharing');
    }

    // Validate robots configuration if present
    if (metadata.robots) {
      const robotsValidation = this.validateRobotsConfig(metadata.robots);
      errors.push(...robotsValidation.errors);
      warnings.push(...robotsValidation.warnings);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate Open Graph configuration
   */
  private validateOpenGraphConfig(og: OpenGraphConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!og.title) errors.push('Open Graph title is required');
    if (!og.description) errors.push('Open Graph description is required');
    if (!og.image) errors.push('Open Graph image is required');
    if (!og.siteName) errors.push('Open Graph site name is required');

    if (og.image && !isValidUrl(og.image) && !og.image.startsWith('/')) {
      errors.push('Open Graph image must be a valid URL or absolute path');
    }

    if (og.type && !['website', 'article', 'video', 'music'].includes(og.type)) {
      warnings.push(`Open Graph type "${og.type}" is not commonly supported`);
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate Twitter Card configuration
   */
  private validateTwitterConfig(twitter: TwitterConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!twitter.card) errors.push('Twitter card type is required');
    if (!twitter.title) errors.push('Twitter title is required');
    if (!twitter.description) errors.push('Twitter description is required');
    if (!twitter.image) errors.push('Twitter image is required');

    if (twitter.card && !['summary', 'summary_large_image', 'app', 'player'].includes(twitter.card)) {
      errors.push(`Invalid Twitter card type: ${twitter.card}`);
    }

    if (twitter.image && !isValidUrl(twitter.image) && !twitter.image.startsWith('/')) {
      errors.push('Twitter image must be a valid URL or absolute path');
    }

    if (twitter.site && !twitter.site.startsWith('@')) {
      warnings.push('Twitter site handle should start with @');
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate robots configuration
   */
  private validateRobotsConfig(robots: RobotsConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Robots config is mostly boolean flags, minimal validation needed
    if (robots.index === false && robots.follow === false) {
      warnings.push('Page is set to noindex,nofollow - ensure this is intentional');
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate site configuration
   */
  private validateSiteConfig(site: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!site.name) errors.push('Site name is required');
    if (!site.url) errors.push('Site URL is required');
    if (!site.description) errors.push('Site description is required');

    if (site.url && !isValidUrl(site.url)) {
      errors.push('Site URL must be a valid URL');
    }

    if (site.logo && !isValidUrl(site.logo) && !site.logo.startsWith('/')) {
      warnings.push('Site logo should be a valid URL or absolute path');
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate analytics configuration
   */
  private validateAnalyticsConfig(analytics: AnalyticsConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!analytics.trackingId) {
      errors.push('Analytics tracking ID is required');
    } else if (!analytics.trackingId.match(/^G-[A-Z0-9]+$/)) {
      warnings.push('Analytics tracking ID format may be incorrect (expected G-XXXXXXXXXX)');
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate social configuration
   */
  private validateSocialConfig(social: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!social.defaultImage) {
      warnings.push('Default social image is recommended');
    } else if (!isValidUrl(social.defaultImage) && !social.defaultImage.startsWith('/')) {
      warnings.push('Default social image should be a valid URL or absolute path');
    }

    if (social.twitterHandle && !social.twitterHandle.startsWith('@')) {
      warnings.push('Twitter handle should start with @');
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate performance configuration
   */
  private validatePerformanceConfig(performance: PerformanceConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (performance.preload && performance.preload.length > 10) {
      warnings.push('Too many preload resources may impact performance');
    }

    if (performance.prefetch && performance.prefetch.length > 20) {
      warnings.push('Too many prefetch resources may impact performance');
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate global performance configuration
   */
  private validateGlobalPerformanceConfig(performance: { enableOptimization: boolean; coreWebVitalsThresholds: CoreWebVitalsConfig }): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (performance.coreWebVitalsThresholds) {
      const thresholds = performance.coreWebVitalsThresholds;
      
      if (thresholds.lcp && thresholds.lcp > 4.0) {
        warnings.push('LCP threshold is higher than recommended (2.5s)');
      }
      
      if (thresholds.fid && thresholds.fid > 300) {
        warnings.push('FID threshold is higher than recommended (100ms)');
      }
      
      if (thresholds.cls && thresholds.cls > 0.25) {
        warnings.push('CLS threshold is higher than recommended (0.1)');
      }
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate schema configuration
   */
  private validateSchemaConfig(schema: SchemaConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!schema.type) {
      errors.push('Schema type is required');
    } else if (!['organization', 'creativework', 'webpage', 'article'].includes(schema.type)) {
      warnings.push(`Schema type "${schema.type}" may not be optimal for SEO`);
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate sitemap configuration
   */
  private validateSitemapConfig(sitemap: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (sitemap.priority && (sitemap.priority < 0 || sitemap.priority > 1)) {
      errors.push('Sitemap priority must be between 0 and 1');
    }

    if (sitemap.changefreq && !['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].includes(sitemap.changefreq)) {
      errors.push(`Invalid changefreq value: ${sitemap.changefreq}`);
    }

    return { isValid: errors.length === 0, errors, warnings };
  }
}

// Export singleton instance
export const seoConfigValidator = new SEOConfigValidator();

// Export utility functions
export async function validateCompleteConfiguration(): Promise<SEOValidationReport> {
  return seoConfigValidator.validateCompleteConfiguration();
}

export function validateGlobalConfig(): ValidationResult {
  return seoConfigValidator.validateGlobalConfig();
}

export async function validatePageConfigurations() {
  return seoConfigValidator.validatePageConfigurations();
}

export function validatePageConfig(config: PageSEOConfig): ValidationResult {
  return seoConfigValidator.validatePageConfig(config);
}

export function validateMetadataConfig(metadata: MetadataConfig): ValidationResult {
  return seoConfigValidator.validateMetadataConfig(metadata);
}