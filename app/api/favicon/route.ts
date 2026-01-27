/**
 * Favicon API Route
 * Serves optimized favicon files with proper MIME types and caching headers
 */

import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// Favicon configurations with proper MIME types
const FAVICON_CONFIGS = {
  'favicon.ico': {
    path: '/L22 W.png', // Will be converted to ICO format
    mimeType: 'image/x-icon',
    size: '32x32',
  },
  'favicon-16x16.png': {
    path: '/L22 W.png',
    mimeType: 'image/png',
    size: '16x16',
  },
  'favicon-32x32.png': {
    path: '/L22 W.png',
    mimeType: 'image/png',
    size: '32x32',
  },
  'apple-touch-icon.png': {
    path: '/L22 W.png',
    mimeType: 'image/png',
    size: '180x180',
  },
  'android-chrome-192x192.png': {
    path: '/L22 W.png',
    mimeType: 'image/png',
    size: '192x192',
  },
  'android-chrome-512x512.png': {
    path: '/L22 W.png',
    mimeType: 'image/png',
    size: '512x512',
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'favicon.ico';
  
  const config = FAVICON_CONFIGS[type as keyof typeof FAVICON_CONFIGS];
  
  if (!config) {
    return new NextResponse('Favicon type not found', { status: 404 });
  }

  try {
    // For now, serve the existing PNG file with proper headers
    // In a production environment, you would implement actual image conversion
    const publicPath = join(process.cwd(), 'public', config.path);
    const fileBuffer = readFileSync(publicPath);

    // Set proper caching headers for favicons (1 year cache)
    const headers = new Headers({
      'Content-Type': config.mimeType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': `"${Buffer.from(config.path + config.size).toString('base64')}"`,
      'Vary': 'Accept-Encoding',
    });

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error serving favicon:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}