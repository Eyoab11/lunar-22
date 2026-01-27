/**
 * Robots.txt Route Handler
 * Generates and serves the robots.txt file for search engine crawlers
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateRobotsTxt } from '@/lib/seo/sitemap-generator';

export async function GET(request: NextRequest) {
  try {
    // Generate the robots.txt content
    const robotsTxt = generateRobotsTxt();
    
    // Return the robots.txt with proper headers
    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    
    // Return a fallback robots.txt on error
    const fallbackRobots = `User-agent: *
Allow: /

Sitemap: https://lunar22.com/sitemap.xml`;
    
    return new NextResponse(fallbackRobots, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Shorter cache on error
      },
    });
  }
}

// Ensure this route is dynamically rendered
export const dynamic = 'force-dynamic';