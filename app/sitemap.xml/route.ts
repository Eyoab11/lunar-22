/**
 * XML Sitemap Route Handler
 * Generates and serves the XML sitemap for search engines
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateSitemap } from '@/lib/seo/sitemap-generator';

export async function GET(request: NextRequest) {
  try {
    // Generate the XML sitemap with dynamic page discovery
    const sitemapXml = await generateSitemap();
    
    // Return the sitemap with proper headers
    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'X-Robots-Tag': 'noindex', // Don't index the sitemap itself
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a minimal sitemap on error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lunar22.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    return new NextResponse(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Shorter cache on error
        'X-Robots-Tag': 'noindex',
      },
    });
  }
}

// Ensure this route is dynamically rendered
export const dynamic = 'force-dynamic';