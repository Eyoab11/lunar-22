/**
 * Analytics Components - Main Export
 * Centralized exports for all analytics components
 */

export { GoogleAnalytics } from './GoogleAnalytics';
export { AnalyticsScript } from './AnalyticsScript';
export { AnalyticsProvider } from './AnalyticsProvider';
export { AnalyticsDemo } from './AnalyticsDemo';
export { AnalyticsUsageExample } from './AnalyticsUsageExample';

// Re-export analytics utilities
export {
  AnalyticsTracker,
  getAnalyticsTracker,
  initializeAnalytics,
} from '@/lib/seo/analytics-tracker';