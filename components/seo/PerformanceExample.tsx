/**
 * PerformanceExample Component - Example usage of Performance_Optimizer
 * Demonstrates how to use performance optimization features
 */

'use client';

import { OptimizedImage, OptimizedScript, PerformanceMetadata } from '@/components/seo';
import { useCoreWebVitals } from '@/lib/seo';
import { PerformanceConfig } from '@/lib/seo/types';

const examplePerformanceConfig: PerformanceConfig = {
  preload: ['/hero-image.jpg', '/fonts/main.woff2'],
  prefetch: ['/about', '/contact'],
  critical: true,
};

export function PerformanceExample() {
  const { metrics, validation, isLoading } = useCoreWebVitals();

  return (
    <div className="performance-example">
      {/* Performance Metadata in Head */}
      <PerformanceMetadata config={examplePerformanceConfig} />

      {/* Optimized Hero Image - Priority Loading */}
      <OptimizedImage
        src="/hero-image.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority={true}
        className="hero-image"
      />

      {/* Optimized Gallery Images - Lazy Loading */}
      <div className="gallery">
        <OptimizedImage
          src="/gallery-1.jpg"
          alt="Gallery image 1"
          width={400}
          height={300}
          priority={false}
        />
        <OptimizedImage
          src="/gallery-2.jpg"
          alt="Gallery image 2"
          width={400}
          height={300}
          priority={false}
        />
      </div>

      {/* Optimized Scripts */}
      <OptimizedScript
        src="/analytics.js"
        strategy="afterInteractive"
        priority={false}
      />

      <OptimizedScript
        src="/critical-feature.js"
        strategy="beforeInteractive"
        priority={true}
      />

      {/* Core Web Vitals Display */}
      <div className="core-web-vitals">
        <h3>Core Web Vitals</h3>
        {isLoading ? (
          <p>Loading metrics...</p>
        ) : (
          <div>
            {metrics.lcp && (
              <div>
                <strong>LCP:</strong> {metrics.lcp.toFixed(2)}s
                {validation?.errors.some(e => e.includes('LCP')) && (
                  <span className="error"> ⚠️ Needs improvement</span>
                )}
              </div>
            )}
            {metrics.fid && (
              <div>
                <strong>FID:</strong> {metrics.fid.toFixed(2)}ms
                {validation?.errors.some(e => e.includes('FID')) && (
                  <span className="error"> ⚠️ Needs improvement</span>
                )}
              </div>
            )}
            {metrics.cls && (
              <div>
                <strong>CLS:</strong> {metrics.cls.toFixed(3)}
                {validation?.errors.some(e => e.includes('CLS')) && (
                  <span className="error"> ⚠️ Needs improvement</span>
                )}
              </div>
            )}
            
            {validation?.warnings && validation.warnings.length > 0 && (
              <div className="warnings">
                <h4>Warnings:</h4>
                <ul>
                  {validation.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .performance-example {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .hero-image {
          width: 100%;
          height: auto;
          margin-bottom: 20px;
        }
        
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .core-web-vitals {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }
        
        .error {
          color: #d32f2f;
        }
        
        .warnings {
          margin-top: 10px;
          padding: 10px;
          background: #fff3cd;
          border-radius: 4px;
        }
        
        .warnings ul {
          margin: 5px 0 0 0;
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
}

export default PerformanceExample;