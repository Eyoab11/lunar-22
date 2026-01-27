/**
 * Web App Manifest Route
 * Serves the web app manifest for PWA support and mobile optimization
 */

import { NextResponse } from 'next/server';
import { seoGlobalConfig } from '../../lib/seo/config';

export async function GET() {
  const manifest = {
    name: seoGlobalConfig.site.name,
    short_name: 'Lunar 22',
    description: seoGlobalConfig.site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['entertainment', 'media', 'production'],
    icons: [
      {
        src: '/api/favicon?type=android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: '/api/favicon?type=android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: '/api/favicon?type=apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/lem.avif',
        sizes: '1200x630',
        type: 'image/avif',
        form_factor: 'wide',
        label: 'Lunar 22 Media Homepage',
      },
    ],
    shortcuts: [
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Contact Lunar 22 Media',
        url: '/contact',
        icons: [
          {
            src: '/api/favicon?type=android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'About',
        short_name: 'About',
        description: 'About Lunar 22 Media',
        url: '/about',
        icons: [
          {
            src: '/api/favicon?type=android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    ],
  };

  // Set proper caching headers for manifest
  const headers = new Headers({
    'Content-Type': 'application/manifest+json',
    'Cache-Control': 'public, max-age=3600', // 1 hour cache
    'Vary': 'Accept-Encoding',
  });

  return NextResponse.json(manifest, {
    status: 200,
    headers,
  });
}