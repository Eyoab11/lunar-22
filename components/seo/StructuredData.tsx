/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO optimization
 */

import { generatePageSchema } from '../../lib/seo';
import { ContentInfo } from '../../lib/seo/types';

interface StructuredDataProps {
  pageType: 'organization' | 'creativework' | 'webpage';
  content?: ContentInfo;
}

/**
 * StructuredData component for rendering JSON-LD schema
 */
export function StructuredData({ pageType, content }: StructuredDataProps) {
  const jsonLd = generatePageSchema(pageType, content);

  if (!jsonLd) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

/**
 * Convenience components for specific page types
 */
export function OrganizationStructuredData() {
  return <StructuredData pageType="organization" />;
}

export function CreativeWorkStructuredData({ content }: { content: ContentInfo }) {
  return <StructuredData pageType="creativework" content={content} />;
}

export function WebPageStructuredData() {
  return <StructuredData pageType="webpage" />;
}