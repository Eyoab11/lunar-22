/**
 * Google Analytics Component
 * React component for integrating Google Analytics into Next.js App Router
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getAnalyticsTracker, initializeAnalytics } from '@/lib/seo/analytics-tracker';
import { AnalyticsConfig } from '@/lib/seo/types';

interface GoogleAnalyticsProps {
  config: AnalyticsConfig;
}

export function GoogleAnalytics({ config }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics on component mount
    const initAnalytics = async () => {
      try {
        await initializeAnalytics(config);
      } catch (error) {
        console.error('Failed to initialize Google Analytics:', error);
      }
    };

    initAnalytics();
  }, [config]);

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      try {
        const tracker = getAnalyticsTracker();
        tracker.trackPageView(pathname);
      } catch (error) {
        // Tracker might not be initialized yet, which is fine
        if (config.enableDebug) {
          console.debug('Analytics tracker not ready for page view:', pathname);
        }
      }
    }
  }, [pathname, config.enableDebug]);

  // This component doesn't render anything visible
  return null;
}

export default GoogleAnalytics;