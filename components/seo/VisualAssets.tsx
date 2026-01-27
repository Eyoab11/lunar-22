/**
 * Visual Assets Component
 * Renders optimized favicons, touch icons, and visual assets in HTML head
 */

'use client';

import { useEffect } from 'react';
import { visualAssetOptimizer } from '../../lib/seo/visual-asset-optimizer';

interface VisualAssetsProps {
  themeColor?: string;
  backgroundColor?: string;
  manifestUrl?: string;
}

/**
 * Visual Assets Component
 * Dynamically injects optimized visual assets into the document head
 */
export function VisualAssets({
  themeColor = '#000000',
  backgroundColor = '#ffffff',
  manifestUrl = '/manifest.json',
}: VisualAssetsProps) {
  useEffect(() => {
    const config = visualAssetOptimizer.generateVisualAssetConfig();
    
    // Remove existing favicon and touch icon links to avoid duplicates
    const existingLinks = document.querySelectorAll(
      'link[rel*="icon"], link[rel*="apple-touch-icon"], link[rel="manifest"]'
    );
    existingLinks.forEach(link => link.remove());

    // Add favicon links
    config.favicons.forEach(favicon => {
      const link = document.createElement('link');
      link.rel = favicon.rel;
      link.type = favicon.type;
      link.href = favicon.href;
      link.sizes = favicon.sizes;
      document.head.appendChild(link);
    });

    // Add touch icon links
    config.touchIcons.forEach(touchIcon => {
      const link = document.createElement('link');
      link.rel = touchIcon.rel;
      link.href = touchIcon.href;
      link.sizes = touchIcon.sizes;
      document.head.appendChild(link);
    });

    // Add manifest link
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = manifestUrl;
    document.head.appendChild(manifestLink);

    // Add theme color meta tag
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    themeColorMeta.content = themeColor;
    document.head.appendChild(themeColorMeta);

    // Add background color meta tag for PWA
    const backgroundColorMeta = document.createElement('meta');
    backgroundColorMeta.name = 'msapplication-TileColor';
    backgroundColorMeta.content = backgroundColor;
    document.head.appendChild(backgroundColorMeta);

    // Add viewport meta tag for mobile optimization
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute(
      'content',
      'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover'
    );

    // Add mobile web app capable meta tags
    const webAppCapableMeta = document.createElement('meta');
    webAppCapableMeta.name = 'mobile-web-app-capable';
    webAppCapableMeta.content = 'yes';
    document.head.appendChild(webAppCapableMeta);

    const appleWebAppCapableMeta = document.createElement('meta');
    appleWebAppCapableMeta.name = 'apple-mobile-web-app-capable';
    appleWebAppCapableMeta.content = 'yes';
    document.head.appendChild(appleWebAppCapableMeta);

    const appleWebAppStatusBarMeta = document.createElement('meta');
    appleWebAppStatusBarMeta.name = 'apple-mobile-web-app-status-bar-style';
    appleWebAppStatusBarMeta.content = 'black-translucent';
    document.head.appendChild(appleWebAppStatusBarMeta);

    // Cleanup function
    return () => {
      // Remove added elements when component unmounts
      const addedLinks = document.querySelectorAll(
        'link[rel*="icon"], link[rel*="apple-touch-icon"], link[rel="manifest"]'
      );
      const addedMetas = document.querySelectorAll(
        'meta[name="theme-color"], meta[name="msapplication-TileColor"], meta[name="mobile-web-app-capable"], meta[name="apple-mobile-web-app-capable"], meta[name="apple-mobile-web-app-status-bar-style"]'
      );
      
      addedLinks.forEach(link => link.remove());
      addedMetas.forEach(meta => meta.remove());
    };
  }, [themeColor, backgroundColor, manifestUrl]);

  return null; // This component only manipulates the document head
}

/**
 * Server-side Visual Assets Component
 * For use in server components and static generation
 */
export function ServerVisualAssets({
  themeColor = '#000000',
  backgroundColor = '#ffffff',
  manifestUrl = '/manifest.json',
}: VisualAssetsProps) {
  const config = visualAssetOptimizer.generateVisualAssetConfig();

  return (
    <>
      {/* Favicon links */}
      {config.favicons.map((favicon, index) => (
        <link
          key={`favicon-${index}`}
          rel={favicon.rel}
          type={favicon.type}
          href={favicon.href}
          sizes={favicon.sizes}
        />
      ))}

      {/* Touch icon links */}
      {config.touchIcons.map((touchIcon, index) => (
        <link
          key={`touch-icon-${index}`}
          rel={touchIcon.rel}
          href={touchIcon.href}
          sizes={touchIcon.sizes}
        />
      ))}

      {/* Manifest link */}
      <link rel="manifest" href={manifestUrl} />

      {/* Theme and background colors */}
      <meta name="theme-color" content={themeColor} />
      <meta name="msapplication-TileColor" content={backgroundColor} />

      {/* Mobile web app meta tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Enhanced viewport for mobile */}
      <meta 
        name="viewport" 
        content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" 
      />
    </>
  );
}

export default VisualAssets;