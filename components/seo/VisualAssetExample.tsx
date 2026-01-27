/**
 * Visual Asset Example Component
 * Demonstrates the usage of visual asset optimization features
 */

'use client';

import React from 'react';
import { visualAssetOptimizer } from '../../lib/seo/visual-asset-optimizer';

/**
 * Visual Asset Example Component
 * Shows how to use the visual asset optimization system
 */
export function VisualAssetExample() {
  const config = visualAssetOptimizer.generateVisualAssetConfig();
  const socialImages = visualAssetOptimizer.generateSocialMediaImages();
  const nextJSConfig = visualAssetOptimizer.generateNextJSIconsConfig();

  return (
    <div className="visual-asset-example" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Visual Asset Optimization Example</h2>
      
      <section style={{ marginBottom: '30px' }}>
        <h3>Generated Favicon Configuration</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(config.favicons, null, 2)}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>Touch Icon Configuration</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(config.touchIcons, null, 2)}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>Next.js Icons Configuration</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(nextJSConfig, null, 2)}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>Social Media Optimized Images</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(socialImages, null, 2)}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>Visual Asset Validation</h3>
        <p>
          Configuration Valid: {visualAssetOptimizer.validateVisualAssetConfig(config) ? '✅ Yes' : '❌ No'}
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>Cache Headers Examples</h3>
        <div style={{ marginBottom: '10px' }}>
          <h4>Favicon Headers:</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(visualAssetOptimizer.getCacheHeaders('favicon'), null, 2)}
          </pre>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <h4>Image Headers:</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(visualAssetOptimizer.getCacheHeaders('image'), null, 2)}
          </pre>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <h4>Manifest Headers:</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(visualAssetOptimizer.getCacheHeaders('manifest'), null, 2)}
          </pre>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>Live Favicon Preview</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {config.favicons.map((favicon, index) => (
            <div key={index} style={{ textAlign: 'center', margin: '10px' }}>
              <img 
                src={favicon.href} 
                alt={`Favicon ${favicon.sizes}`}
                style={{ 
                  width: favicon.sizes.split('x')[0] + 'px',
                  height: favicon.sizes.split('x')[1] + 'px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div style={{ fontSize: '12px', marginTop: '5px' }}>
                {favicon.sizes}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>API Endpoints</h3>
        <ul>
          <li><a href="/api/favicon?type=favicon.ico" target="_blank">/api/favicon?type=favicon.ico</a></li>
          <li><a href="/api/favicon?type=favicon-16x16.png" target="_blank">/api/favicon?type=favicon-16x16.png</a></li>
          <li><a href="/api/favicon?type=favicon-32x32.png" target="_blank">/api/favicon?type=favicon-32x32.png</a></li>
          <li><a href="/api/favicon?type=apple-touch-icon.png" target="_blank">/api/favicon?type=apple-touch-icon.png</a></li>
          <li><a href="/api/favicon?type=android-chrome-192x192.png" target="_blank">/api/favicon?type=android-chrome-192x192.png</a></li>
          <li><a href="/api/favicon?type=android-chrome-512x512.png" target="_blank">/api/favicon?type=android-chrome-512x512.png</a></li>
          <li><a href="/manifest.json" target="_blank">/manifest.json</a></li>
        </ul>
      </section>
    </div>
  );
}

export default VisualAssetExample;