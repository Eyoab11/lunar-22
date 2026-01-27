/**
 * CriticalCSS Component - Critical CSS Inlining for SSR
 * Handles above-the-fold CSS optimization
 */

import { ssrOptimizer } from '../../lib/seo/ssr-optimizer';

export interface CriticalCSSProps {
  page: string;
  customCSS?: string;
  enableInlining?: boolean;
}

/**
 * Server component that inlines critical CSS for above-the-fold content
 */
export async function CriticalCSS({
  page,
  customCSS,
  enableInlining = true,
}: CriticalCSSProps) {
  if (!enableInlining) {
    return null;
  }

  try {
    const optimizationPackage = await ssrOptimizer.generateSSROptimizationPackage(page);
    const criticalCSS = customCSS || optimizationPackage.criticalCSS;

    if (!criticalCSS) {
      return null;
    }

    return (
      <style
        dangerouslySetInnerHTML={{ __html: criticalCSS }}
        data-critical-css="true"
        data-page={page}
      />
    );
  } catch (error) {
    console.error('Error generating critical CSS:', error);
    return null;
  }
}

/**
 * Server component that adds resource hints for performance optimization
 */
export async function ResourceHints({ page }: { page: string }) {
  try {
    const hints = ssrOptimizer.generateSSRPerformanceHints(page);

    if (hints.length === 0) {
      return null;
    }

    return (
      <>
        {hints.map((hint, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: hint }}
          />
        ))}
      </>
    );
  } catch (error) {
    console.error('Error generating resource hints:', error);
    return null;
  }
}

/**
 * Server component that adds crawler optimization attributes
 */
export async function CrawlerOptimization({ page }: { page: string }) {
  try {
    const shouldOptimize = await ssrOptimizer.shouldOptimizeForSSR();
    
    if (!shouldOptimize) {
      return null;
    }

    const attributes = ssrOptimizer.generateCrawlerOptimizedAttributes();

    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Add crawler optimization attributes to document
            Object.entries(${JSON.stringify(attributes)}).forEach(([key, value]) => {
              document.documentElement.setAttribute(key, value);
            });
            
            // Mark page as SSR optimized
            document.documentElement.setAttribute('data-page', '${page}');
            document.documentElement.setAttribute('data-ssr-timestamp', '${new Date().toISOString()}');
          `,
        }}
      />
    );
  } catch (error) {
    console.error('Error applying crawler optimization:', error);
    return null;
  }
}

/**
 * Complete SSR optimization component that combines all optimizations
 */
export async function SSROptimization({
  page,
  enableCriticalCSS = true,
  enableResourceHints = true,
  enableCrawlerOptimization = true,
  customCSS,
}: {
  page: string;
  enableCriticalCSS?: boolean;
  enableResourceHints?: boolean;
  enableCrawlerOptimization?: boolean;
  customCSS?: string;
}) {
  return (
    <>
      {enableCriticalCSS && (
        <CriticalCSS
          page={page}
          customCSS={customCSS}
          enableInlining={true}
        />
      )}
      
      {enableResourceHints && <ResourceHints page={page} />}
      
      {enableCrawlerOptimization && <CrawlerOptimization page={page} />}
    </>
  );
}