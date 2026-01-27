/**
 * Base Metadata Utilities and Helper Functions
 * Provides utility functions for SEO metadata processing and validation
 */

import { MetadataConfig, ValidationResult } from './types';
import { getGlobalSEOConfig } from './config';

/**
 * Escape HTML entities in text content
 */
export function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  
  return text.replace(/[&<>"']/g, (match) => htmlEntities[match] || match);
}

/**
 * Sanitize and format title text
 */
export function sanitizeTitle(title: string): string {
  if (!title || typeof title !== 'string') {
    return '';
  }
  
  // Remove extra whitespace and escape HTML
  return escapeHtml(title.trim().replace(/\s+/g, ' '));
}

/**
 * Sanitize and format description text
 */
export function sanitizeDescription(description: string): string {
  if (!description || typeof description !== 'string') {
    return '';
  }
  
  // Remove extra whitespace, escape HTML, and limit length
  const cleaned = escapeHtml(description.trim().replace(/\s+/g, ' '));
  
  // Limit to 160 characters for optimal SEO
  if (cleaned.length > 160) {
    return cleaned.substring(0, 157) + '...';
  }
  
  return cleaned;
}

/**
 * Generate canonical URL for a given path with comprehensive validation
 */
export function generateCanonicalUrl(path: string): string {
  const config = getGlobalSEOConfig();
  const baseUrl = config.site.url.replace(/\/$/, ''); // Remove trailing slash
  
  // Normalize and validate the path
  const normalizedPath = normalizeUrlPath(path);
  
  // Validate the resulting URL
  const canonicalUrl = `${baseUrl}${normalizedPath}`;
  
  if (!isValidUrl(canonicalUrl)) {
    // Fallback to homepage if URL is invalid
    return `${baseUrl}/`;
  }
  
  return canonicalUrl;
}

/**
 * Normalize URL path with comprehensive cleaning
 */
export function normalizeUrlPath(path: string): string {
  if (!path || typeof path !== 'string') {
    return '/';
  }
  
  // Remove query parameters and hash fragments
  let cleanPath = path.split('?')[0].split('#')[0];
  
  // Decode URI components safely
  try {
    cleanPath = decodeURIComponent(cleanPath);
  } catch {
    // If decoding fails, use original path
  }
  
  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  
  // Remove double slashes
  cleanPath = cleanPath.replace(/\/+/g, '/');
  
  // Remove trailing slash except for root
  if (cleanPath !== '/' && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // Validate path characters (allow alphanumeric, hyphens, underscores, slashes)
  if (!/^\/[a-zA-Z0-9\-_\/]*$/.test(cleanPath)) {
    // If path contains invalid characters, return root
    return '/';
  }
  
  return cleanPath;
}

/**
 * Validate canonical URL format and accessibility
 */
export function validateCanonicalUrl(url: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!url) {
    errors.push('Canonical URL is required');
    return { isValid: false, errors, warnings };
  }
  
  // Check if it's a valid absolute URL
  if (!isValidUrl(url)) {
    errors.push('Canonical URL must be a valid absolute URL');
    return { isValid: false, errors, warnings };
  }
  
  const urlObj = new URL(url);
  
  // Check protocol
  if (urlObj.protocol !== 'https:') {
    warnings.push('Canonical URL should use HTTPS protocol');
  }
  
  // Check for query parameters
  if (urlObj.search) {
    warnings.push('Canonical URLs should not contain query parameters');
  }
  
  // Check for hash fragments
  if (urlObj.hash) {
    warnings.push('Canonical URLs should not contain hash fragments');
  }
  
  // Check for trailing slash consistency
  const path = urlObj.pathname;
  if (path !== '/' && path.endsWith('/')) {
    warnings.push('Canonical URLs should not have trailing slashes except for root');
  }
  
  // Check path length
  if (path.length > 255) {
    warnings.push('URL path is very long and may cause issues');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Generate canonical URL with validation and fallback
 */
export function generateValidatedCanonicalUrl(path: string): {
  url: string;
  validation: ValidationResult;
} {
  const url = generateCanonicalUrl(path);
  const validation = validateCanonicalUrl(url);
  
  return { url, validation };
}

/**
 * Get canonical URL for current page from various sources
 */
export function getCanonicalUrlFromContext(
  pathname?: string,
  searchParams?: URLSearchParams,
  headers?: Headers
): string {
  // Try to get path from pathname first
  if (pathname) {
    return generateCanonicalUrl(pathname);
  }
  
  // Try to get from headers (for server-side)
  if (headers) {
    const host = headers.get('host');
    const protocol = headers.get('x-forwarded-proto') || 'https';
    const path = headers.get('x-pathname') || '/';
    
    if (host) {
      const baseUrl = `${protocol}://${host}`;
      return generateCanonicalUrl(path);
    }
  }
  
  // Fallback to homepage
  const config = getGlobalSEOConfig();
  return config.site.url;
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate image URL and format
 */
export function validateImageUrl(imageUrl: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!imageUrl) {
    errors.push('Image URL is required');
    return { isValid: false, errors, warnings };
  }
  
  // Check if it's a valid URL (absolute) or valid relative path
  const isAbsolute = imageUrl.startsWith('http://') || imageUrl.startsWith('https://');
  const isRelative = imageUrl.startsWith('/');
  
  if (!isAbsolute && !isRelative) {
    errors.push('Image URL must be absolute (https://) or relative (/)');
  }
  
  if (isAbsolute && !isValidUrl(imageUrl)) {
    errors.push('Invalid absolute URL format');
  }
  
  // Check for common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'];
  const hasImageExtension = imageExtensions.some(ext => 
    imageUrl.toLowerCase().includes(ext)
  );
  
  if (!hasImageExtension) {
    warnings.push('Image URL should have a valid image extension');
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
export function validateMetadata(metadata: MetadataConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validate required fields
  if (!metadata.title) {
    errors.push('Title is required');
  } else if (metadata.title.length > 60) {
    warnings.push('Title should be under 60 characters for optimal SEO');
  }
  
  if (!metadata.description) {
    errors.push('Description is required');
  } else if (metadata.description.length > 160) {
    warnings.push('Description should be under 160 characters for optimal SEO');
  }
  
  // Validate canonical URL if provided
  if (metadata.canonical && !isValidUrl(metadata.canonical)) {
    errors.push('Canonical URL must be a valid absolute URL');
  }
  
  // Validate Open Graph metadata
  if (metadata.openGraph) {
    const og = metadata.openGraph;
    
    if (!og.title) {
      errors.push('Open Graph title is required');
    }
    
    if (!og.description) {
      errors.push('Open Graph description is required');
    }
    
    if (!og.image) {
      errors.push('Open Graph image is required');
    } else {
      const imageValidation = validateImageUrl(og.image);
      errors.push(...imageValidation.errors);
      warnings.push(...imageValidation.warnings);
    }
    
    if (!og.siteName) {
      errors.push('Open Graph site name is required');
    }
    
    if (!['website', 'article'].includes(og.type)) {
      errors.push('Open Graph type must be "website" or "article"');
    }
  }
  
  // Validate Twitter Card metadata
  if (metadata.twitter) {
    const twitter = metadata.twitter;
    
    if (!twitter.title) {
      errors.push('Twitter Card title is required');
    }
    
    if (!twitter.description) {
      errors.push('Twitter Card description is required');
    }
    
    if (!twitter.image) {
      errors.push('Twitter Card image is required');
    } else {
      const imageValidation = validateImageUrl(twitter.image);
      errors.push(...imageValidation.errors);
      warnings.push(...imageValidation.warnings);
    }
    
    if (!['summary', 'summary_large_image'].includes(twitter.card)) {
      errors.push('Twitter Card type must be "summary" or "summary_large_image"');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Merge metadata configurations with fallbacks
 */
export function mergeMetadata(
  primary: Partial<MetadataConfig>,
  fallback: MetadataConfig
): MetadataConfig {
  return {
    title: primary.title || fallback.title,
    description: primary.description || fallback.description,
    canonical: primary.canonical || fallback.canonical,
    openGraph: primary.openGraph ? {
      ...fallback.openGraph,
      ...primary.openGraph,
    } : fallback.openGraph,
    twitter: primary.twitter ? {
      ...fallback.twitter,
      ...primary.twitter,
    } : fallback.twitter,
    robots: primary.robots ? {
      ...fallback.robots,
      ...primary.robots,
    } : fallback.robots,
  };
}

/**
 * Generate robots meta content string
 */
export function generateRobotsContent(robots?: {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
}): string {
  if (!robots) {
    return 'index, follow';
  }
  
  const directives: string[] = [];
  
  // Index/noindex
  directives.push(robots.index !== false ? 'index' : 'noindex');
  
  // Follow/nofollow
  directives.push(robots.follow !== false ? 'follow' : 'nofollow');
  
  // Additional directives
  if (robots.noarchive) directives.push('noarchive');
  if (robots.nosnippet) directives.push('nosnippet');
  if (robots.noimageindex) directives.push('noimageindex');
  
  return directives.join(', ');
}

/**
 * Format date for SEO purposes (ISO 8601)
 */
export function formatSEODate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  if (isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  
  return date.toISOString();
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

/**
 * Check if URL is external
 */
export function isExternalUrl(url: string, baseUrl: string): boolean {
  try {
    const urlDomain = extractDomain(url);
    const baseDomain = extractDomain(baseUrl);
    return urlDomain !== baseDomain && urlDomain !== '';
  } catch {
    return false;
  }
}

/**
 * Generate structured data script tag content
 */
export function generateStructuredDataScript(data: any): string {
  try {
    return JSON.stringify(data, null, 0);
  } catch {
    return '{}';
  }
}

/**
 * Validate structured data against basic JSON-LD requirements
 */
export function validateStructuredData(data: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!data || typeof data !== 'object') {
    errors.push('Structured data must be an object');
    return { isValid: false, errors, warnings };
  }
  
  if (!data['@context']) {
    errors.push('Structured data must include @context');
  } else if (data['@context'] !== 'https://schema.org') {
    warnings.push('Consider using https://schema.org as @context');
  }
  
  if (!data['@type']) {
    errors.push('Structured data must include @type');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}