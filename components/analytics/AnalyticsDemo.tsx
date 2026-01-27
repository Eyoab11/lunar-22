/**
 * Analytics Demo Component
 * Example component showing how to integrate Google Analytics with privacy compliance
 */

'use client';

import React from 'react';
import { AnalyticsProvider, GoogleAnalytics } from './index';
import { CookieConsent } from '../privacy/CookieConsent';
import { getGlobalSEOConfig } from '@/lib/seo/config';

interface AnalyticsDemoProps {
  children: React.ReactNode;
}

/**
 * Demo component showing complete analytics integration
 * This would typically be used in your root layout or app component
 */
export function AnalyticsDemo({ children }: AnalyticsDemoProps) {
  const seoConfig = getGlobalSEOConfig();

  return (
    <AnalyticsProvider config={seoConfig.analytics}>
      {/* Google Analytics tracking component */}
      <GoogleAnalytics config={seoConfig.analytics} />
      
      {/* Cookie consent banner */}
      <CookieConsent />
      
      {/* Your app content */}
      {children}
    </AnalyticsProvider>
  );
}

export default AnalyticsDemo;