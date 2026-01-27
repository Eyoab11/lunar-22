/**
 * SEO Integration Component
 * Comprehensive SEO integration for Next.js App Router pages
 */

import React from 'react';
import { Metadata } from 'next';
import { 
  StructuredData, 
  OrganizationStructuredData, 
  CreativeWorkStructuredData,
  WebPageStructuredData,
  SSROptimization,
  PerformanceMetadata,
  OptimizedScript,
} from './index';
import { GoogleAnalytics } from '../analytics';
import { ssrOptimizer, schemaProcessor, getPageSEOConfig } from '../../lib/seo';

interface SEOIntegrationProps {
  page: string;
  children: React.ReactNode;
  enableAnalytics?: boolean;
  enableStructuredData?: boolean;
  enablePerformanceOptimization?: boolean;
  customSchema?: any;
  structuredDataType?: 'organization' | 'creativework' | 'webpage';
}

/**
 * Server-side metadata generation helper
 */
export async function generateSEOMetadata(page: string): Promise<Metadata> {
  const ssrPackage = await ssrOptimizer.generateSSROptimizationPackage(page);
  return ssrPackage.metadata;
}

/**
 * Comprehensive SEO integration component
 */
export function SEOIntegration({
  page,
  children,
  enableAnalytics = true,
  enableStructuredData = true,
  enablePerformanceOptimization = true,
  customSchema,
  structuredDataType = 'webpage',
}: SEOIntegrationProps) {
  const pageConfig = getPageSEOConfig(page);

  return (
    <>
      {/* SSR Optimization */}
      <SSROptimization page={page} />
      
      {/* Performance Metadata */}
      {enablePerformanceOptimization && (
        <PerformanceMetadata 
          config={pageConfig?.performance || { preload: [], prefetch: [], critical: true }} 
        />
      )}
      
      {/* Structured Data */}
      {enableStructuredData && (
        <>
          {structuredDataType === 'organization' && <OrganizationStructuredData />}
          {structuredDataType === 'creativework' && customSchema && (
            <CreativeWorkStructuredData content={customSchema} />
          )}
          {structuredDataType === 'webpage' && (
            <WebPageStructuredData />
          )}
          {customSchema && (
            <StructuredData 
              pageType="creativework" 
              content={customSchema} 
            />
          )}
        </>
      )}
      
      {/* Page Content */}
      {children}
    </>
  );
}

/**
 * Page-specific SEO integration components
 */
export function HomepageSEO({ children }: { children: React.ReactNode }) {
  return (
    <SEOIntegration
      page="/"
      structuredDataType="organization"
      enableAnalytics={true}
      enableStructuredData={true}
      enablePerformanceOptimization={true}
    >
      {children}
    </SEOIntegration>
  );
}

export function ContactSEO({ children }: { children: React.ReactNode }) {
  return (
    <SEOIntegration
      page="/contact"
      structuredDataType="webpage"
      enableAnalytics={true}
      enableStructuredData={true}
      enablePerformanceOptimization={true}
    >
      {children}
    </SEOIntegration>
  );
}

export function AboutSEO({ children }: { children: React.ReactNode }) {
  const aboutContent = {
    title: 'About | Lunar 22',
    description: 'Learn about Lunar 22 Media, where legendary world-builders unite to redefine animation for the next century.',
    datePublished: '2024-01-01T00:00:00.000Z',
    dateModified: new Date().toISOString(),
  };

  return (
    <SEOIntegration
      page="/about"
      structuredDataType="creativework"
      customSchema={aboutContent}
      enableAnalytics={true}
      enableStructuredData={true}
      enablePerformanceOptimization={true}
    >
      {children}
    </SEOIntegration>
  );
}

export function FoundersSEO({ children }: { children: React.ReactNode }) {
  const foundersContent = {
    title: 'Founders | Lunar 22',
    description: 'Meet the founders of Lunar 22 Media and learn about their vision for the future of animation and entertainment.',
    datePublished: '2024-01-01T00:00:00.000Z',
    dateModified: new Date().toISOString(),
  };

  return (
    <SEOIntegration
      page="/founders"
      structuredDataType="creativework"
      customSchema={foundersContent}
      enableAnalytics={true}
      enableStructuredData={true}
      enablePerformanceOptimization={true}
    >
      {children}
    </SEOIntegration>
  );
}

export function PowerRangersSEO({ children }: { children: React.ReactNode }) {
  const powerRangersContent = {
    title: 'Power Rangers | Lunar 22',
    description: 'Explore Lunar 22 Media\'s work on Power Rangers and other iconic television series. Discover our contribution to beloved entertainment franchises.',
    datePublished: '2024-01-01T00:00:00.000Z',
    dateModified: new Date().toISOString(),
  };

  return (
    <SEOIntegration
      page="/power-rangers"
      structuredDataType="creativework"
      customSchema={powerRangersContent}
      enableAnalytics={true}
      enableStructuredData={true}
      enablePerformanceOptimization={true}
    >
      {children}
    </SEOIntegration>
  );
}