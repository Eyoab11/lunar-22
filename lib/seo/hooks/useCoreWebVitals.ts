/**
 * useCoreWebVitals Hook - Core Web Vitals monitoring
 * Tracks LCP, FID, and CLS metrics for performance optimization
 */

'use client';

import { useEffect, useState } from 'react';
import { performanceOptimizer } from '../performance-optimizer';
import { ValidationResult } from '../types';

interface CoreWebVitalsMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
}

interface CoreWebVitalsState {
  metrics: CoreWebVitalsMetrics;
  validation: ValidationResult | null;
  isLoading: boolean;
}

export function useCoreWebVitals() {
  const [state, setState] = useState<CoreWebVitalsState>({
    metrics: {},
    validation: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check if web vitals API is available
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    const metrics: CoreWebVitalsMetrics = {};

    // Observe Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        if (lastEntry) {
          metrics.lcp = lastEntry.startTime / 1000; // Convert to seconds
          updateState();
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP observation not supported:', error);
    }

    // Observe First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            metrics.fid = entry.processingStart - entry.startTime;
            updateState();
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID observation not supported:', error);
    }

    // Observe Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            metrics.cls = clsValue;
            updateState();
          }
        });
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS observation not supported:', error);
    }

    function updateState() {
      const validation = performanceOptimizer.validateCoreWebVitals(metrics);
      setState({
        metrics: { ...metrics },
        validation,
        isLoading: false,
      });
    }

    // Initial state update
    setTimeout(() => {
      if (Object.keys(metrics).length === 0) {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }, 3000); // Wait 3 seconds for initial metrics

    // Cleanup observers on unmount
    return () => {
      // Note: PerformanceObserver doesn't have a direct cleanup method
      // The observers will be garbage collected when the component unmounts
    };
  }, []);

  return state;
}

export default useCoreWebVitals;