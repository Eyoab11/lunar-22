/**
 * Analytics Provider Component
 * Context provider for analytics functionality throughout the app
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AnalyticsTracker, getAnalyticsTracker, initializeAnalytics } from '@/lib/seo/analytics-tracker';
import { AnalyticsConfig } from '@/lib/seo/types';

interface AnalyticsContextType {
  tracker: AnalyticsTracker | null;
  isInitialized: boolean;
  trackEvent: (eventName: string, parameters?: Record<string, any>) => void;
  trackPageView: (path: string) => void;
  optOut: () => void;
  optIn: () => void;
  isOptedOut: () => boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

interface AnalyticsProviderProps {
  config: AnalyticsConfig;
  children: React.ReactNode;
}

export function AnalyticsProvider({ config, children }: AnalyticsProviderProps) {
  const [tracker, setTracker] = useState<AnalyticsTracker | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAnalytics = async () => {
      try {
        const analyticsTracker = await initializeAnalytics(config);
        setTracker(analyticsTracker);
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize analytics in provider:', error);
      }
    };

    initAnalytics();
  }, [config]);

  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (tracker) {
      tracker.trackEvent(eventName, parameters);
    }
  };

  const trackPageView = (path: string) => {
    if (tracker) {
      tracker.trackPageView(path);
    }
  };

  const optOut = () => {
    if (tracker) {
      tracker.optOut();
    }
  };

  const optIn = () => {
    if (tracker) {
      tracker.optIn();
    }
  };

  const isOptedOut = (): boolean => {
    return tracker ? tracker.isOptedOut() : false;
  };

  const contextValue: AnalyticsContextType = {
    tracker,
    isInitialized,
    trackEvent,
    trackPageView,
    optOut,
    optIn,
    isOptedOut,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Hook to use analytics context
 */
export function useAnalytics(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

export default AnalyticsProvider;