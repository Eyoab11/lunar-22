/**
 * PerformanceMetadata Component - Generates performance optimization metadata
 * Includes resource hints, preload/prefetch links, and DNS prefetch hints
 */

import { performanceOptimizer } from '@/lib/seo/performance-optimizer';
import { PerformanceConfig } from '@/lib/seo/types';

interface PerformanceMetadataProps {
  config: PerformanceConfig;
}

export function PerformanceMetadata({ config }: PerformanceMetadataProps) {
  // Generate resource hints
  const preloadLinks = performanceOptimizer.generatePreloadLinks(config);
  const prefetchLinks = performanceOptimizer.generatePrefetchLinks(config);
  const dnsHints = performanceOptimizer.generateDNSPrefetchHints();

  return (
    <>
      {/* DNS Prefetch Hints */}
      {dnsHints.map((hint, index) => (
        <link
          key={`dns-prefetch-${index}`}
          rel="dns-prefetch"
          href={hint.replace('<link rel="dns-prefetch" href="', '').replace('">', '')}
        />
      ))}

      {/* Preload Links */}
      {config.preload?.map((href, index) => {
        const resourceHints = performanceOptimizer.generateResourceHints(config);
        const hint = resourceHints.find(h => h.href === href);
        
        return (
          <link
            key={`preload-${index}`}
            rel="preload"
            href={href}
            as={hint?.as}
            type={hint?.type}
            crossOrigin={hint?.crossOrigin}
          />
        );
      })}

      {/* Prefetch Links */}
      {config.prefetch?.map((href, index) => (
        <link
          key={`prefetch-${index}`}
          rel="prefetch"
          href={href}
        />
      ))}

      {/* Viewport Meta Tag */}
      <meta
        name="viewport"
        content={performanceOptimizer.generateViewportMeta()}
      />

      {/* Performance Hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </>
  );
}

export default PerformanceMetadata;