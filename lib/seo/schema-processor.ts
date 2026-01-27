/**
 * Schema Processor for JSON-LD Structured Data
 * Generates and validates schema.org structured data for SEO optimization
 */

import {
  OrganizationSchema,
  CreativeWorkSchema,
  Organization,
  ContentInfo,
  ValidationResult,
} from './types';
import { getGlobalSEOConfig } from './config';
import { validateStructuredData, formatSEODate } from './utils';

/**
 * Schema Processor class for generating and managing structured data
 */
export class SchemaProcessor {
  private readonly globalConfig = getGlobalSEOConfig();

  /**
   * Generate Organization schema for homepage
   * Validates: Requirements 4.1
   */
  generateOrganizationSchema(): OrganizationSchema {
    const { site } = this.globalConfig;
    
    const organizationSchema: OrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      description: site.description,
      url: site.url,
      logo: this.resolveImageUrl(site.logo),
    };

    // Add contact point if available
    const contactPoint = this.generateContactPoint();
    if (contactPoint) {
      organizationSchema.contactPoint = contactPoint;
    }

    // Add social media profiles if available
    const sameAs = this.generateSameAsLinks();
    if (sameAs.length > 0) {
      organizationSchema.sameAs = sameAs;
    }

    return organizationSchema;
  }

  /**
   * Generate CreativeWork schema for content pages
   * Validates: Requirements 4.2, 4.3, 4.4, 4.5
   */
  generateCreativeWorkSchema(content: ContentInfo): CreativeWorkSchema {
    const organization = this.generateOrganizationData();
    
    const creativeWorkSchema: CreativeWorkSchema = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: content.title,
      description: content.description,
      creator: organization,
    };

    // Add publication dates if available
    if (content.datePublished) {
      creativeWorkSchema.datePublished = formatSEODate(content.datePublished);
    }

    if (content.dateModified) {
      creativeWorkSchema.dateModified = formatSEODate(content.dateModified);
    }

    return creativeWorkSchema;
  }

  /**
   * Generate base Organization data (without @context for embedding)
   */
  private generateOrganizationData(): Organization {
    const { site } = this.globalConfig;
    
    return {
      '@type': 'Organization',
      name: site.name,
      description: site.description,
      url: site.url,
      logo: this.resolveImageUrl(site.logo),
    };
  }

  /**
   * Generate contact point information
   */
  private generateContactPoint() {
    // This can be extended based on available contact information
    // For now, returning null as contact details aren't specified in config
    return null;
  }

  /**
   * Generate social media profile links
   */
  private generateSameAsLinks(): string[] {
    const sameAs: string[] = [];
    
    // Add Twitter profile if handle is available
    if (this.globalConfig.social.twitterHandle) {
      const handle = this.globalConfig.social.twitterHandle.replace('@', '');
      sameAs.push(`https://twitter.com/${handle}`);
    }

    // Additional social media profiles can be added here
    // when they become available in the configuration

    return sameAs;
  }

  /**
   * Resolve image URL to absolute URL
   */
  private resolveImageUrl(imageUrl: string): string {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Convert relative URL to absolute
    const baseUrl = this.globalConfig.site.url.replace(/\/$/, '');
    return `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
  }

  /**
   * Validate schema against schema.org specifications
   * Validates: Requirements 4.2, 4.3, 4.4, 4.5
   */
  validateSchema(schema: any): ValidationResult {
    const baseValidation = validateStructuredData(schema);
    
    if (!baseValidation.isValid) {
      return baseValidation;
    }

    const errors: string[] = [...baseValidation.errors];
    const warnings: string[] = [...baseValidation.warnings];

    // Validate specific schema types
    if (schema['@type'] === 'Organization') {
      this.validateOrganizationSchema(schema, errors, warnings);
    } else if (schema['@type'] === 'CreativeWork') {
      this.validateCreativeWorkSchema(schema, errors, warnings);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate Organization schema specific requirements
   */
  private validateOrganizationSchema(schema: any, errors: string[], warnings: string[]): void {
    const required = ['name', 'description', 'url', 'logo'];
    
    for (const field of required) {
      if (!schema[field]) {
        errors.push(`Organization schema missing required field: ${field}`);
      }
    }

    // Validate URL format
    if (schema.url && !this.isValidUrl(schema.url)) {
      errors.push('Organization URL must be a valid absolute URL');
    }

    // Validate logo URL
    if (schema.logo && !this.isValidUrl(schema.logo)) {
      errors.push('Organization logo must be a valid absolute URL');
    }

    // Check for recommended fields
    if (!schema.contactPoint) {
      warnings.push('Consider adding contactPoint for better SEO');
    }

    if (!schema.sameAs || schema.sameAs.length === 0) {
      warnings.push('Consider adding sameAs links to social media profiles');
    }
  }

  /**
   * Validate CreativeWork schema specific requirements
   */
  private validateCreativeWorkSchema(schema: any, errors: string[], warnings: string[]): void {
    const required = ['name', 'description', 'creator'];
    
    for (const field of required) {
      if (!schema[field]) {
        errors.push(`CreativeWork schema missing required field: ${field}`);
      }
    }

    // Validate creator is an Organization
    if (schema.creator && schema.creator['@type'] !== 'Organization') {
      errors.push('CreativeWork creator must be an Organization');
    }

    // Validate date formats
    if (schema.datePublished && !this.isValidDate(schema.datePublished)) {
      errors.push('datePublished must be in valid ISO 8601 format');
    }

    if (schema.dateModified && !this.isValidDate(schema.dateModified)) {
      errors.push('dateModified must be in valid ISO 8601 format');
    }

    // Check for recommended fields
    if (!schema.datePublished) {
      warnings.push('Consider adding datePublished for better SEO');
    }
  }

  /**
   * Render JSON-LD script tag content
   * Validates: Requirements 4.4, 4.5
   */
  renderJsonLd(schemas: any[]): string {
    if (!schemas || schemas.length === 0) {
      return '';
    }

    try {
      // If single schema, render directly
      if (schemas.length === 1) {
        return JSON.stringify(schemas[0], null, 0);
      }

      // Multiple schemas - render as array
      return JSON.stringify(schemas, null, 0);
    } catch (error) {
      console.error('Error rendering JSON-LD:', error);
      return '';
    }
  }

  /**
   * Generate schema for specific page type
   */
  generateSchemaForPage(pageType: string, content?: ContentInfo): any[] {
    const schemas: any[] = [];

    switch (pageType) {
      case 'organization':
        // Homepage - Organization schema
        schemas.push(this.generateOrganizationSchema());
        break;
        
      case 'creativework':
        // Content pages - CreativeWork schema
        if (content) {
          schemas.push(this.generateCreativeWorkSchema(content));
        }
        break;
        
      case 'webpage':
        // Generic webpage - can include both Organization and basic WebPage schema
        schemas.push(this.generateOrganizationSchema());
        break;
        
      default:
        // Default to Organization schema
        schemas.push(this.generateOrganizationSchema());
        break;
    }

    return schemas;
  }

  /**
   * Validate URL format
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate ISO 8601 date format
   */
  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString.includes('T');
  }
}

/**
 * Singleton instance for global use
 */
export const schemaProcessor = new SchemaProcessor();

/**
 * Convenience function to generate schema for a page
 */
export function generatePageSchema(pageType: string, content?: ContentInfo): string {
  const schemas = schemaProcessor.generateSchemaForPage(pageType, content);
  return schemaProcessor.renderJsonLd(schemas);
}

/**
 * Convenience function to validate any schema
 */
export function validatePageSchema(schema: any): ValidationResult {
  return schemaProcessor.validateSchema(schema);
}