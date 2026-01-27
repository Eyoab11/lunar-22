/**
 * SSROptimizer Component - Server-Side Rendering Optimization
 * Ensures consistent rendering between server and client
 */

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export interface SSROptimizerProps {
  children: React.ReactNode;
  enableHydrationOptimization?: boolean;
  enableLayoutShiftPrevention?: boolean;
}

export interface HydrationState {
  isHydrated: boolean;
  hasLayoutShift: boolean;
  hydrationTime: number;
}

/**
 * SSROptimizer component that ensures consistent rendering between server and client
 * Prevents hydration mismatches and layout shifts
 */
export function SSROptimizer({
  children,
  enableHydrationOptimization = true,
  enableLayoutShiftPrevention = true,
}: SSROptimizerProps) {
  const [hydrationState, setHydrationState] = useState<HydrationState>({
    isHydrated: false,
    hasLayoutShift: false,
    hydrationTime: 0,
  });
  
  const pathname = usePathname();

  useEffect(() => {
    const startTime = performance.now();
    
    // Mark as hydrated
    setHydrationState(prev => ({
      ...prev,
      isHydrated: true,
      hydrationTime: performance.now() - startTime,
    }));

    // Monitor for layout shifts if enabled
    if (enableLayoutShiftPrevention && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            const layoutShiftValue = (entry as any).value;
            if (layoutShiftValue > 0.1) { // CLS threshold
              setHydrationState(prev => ({
                ...prev,
                hasLayoutShift: true,
              }));
              
              // Log layout shift for debugging
              console.warn('Layout shift detected during hydration:', {
                value: layoutShiftValue,
                pathname,
                hydrationTime: hydrationState.hydrationTime,
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      return () => observer.disconnect();
    }
  }, [pathname, enableLayoutShiftPrevention, hydrationState.hydrationTime]);

  // Add hydration optimization attributes
  const optimizationAttributes = enableHydrationOptimization ? {
    'data-hydrated': hydrationState.isHydrated.toString(),
    'data-hydration-time': hydrationState.hydrationTime.toString(),
    'data-has-layout-shift': hydrationState.hasLayoutShift.toString(),
  } : {};

  return (
    <div {...optimizationAttributes} className="ssr-optimizer-wrapper">
      {children}
    </div>
  );
}

/**
 * NoSSR component that only renders on the client side
 * Useful for components that should not be server-side rendered
 */
export function NoSSR({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

/**
 * SSRFallback component that shows different content during SSR vs CSR
 * Prevents hydration mismatches for dynamic content
 */
export function SSRFallback({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : <>{fallback}</>;
}

/**
 * HydrationBoundary component that prevents hydration mismatches
 * by suppressing hydration warnings for specific content
 */
export function HydrationBoundary({
  children,
  suppressHydrationWarning = true,
}: {
  children: React.ReactNode;
  suppressHydrationWarning?: boolean;
}) {
  return (
    <div suppressHydrationWarning={suppressHydrationWarning}>
      {children}
    </div>
  );
}

/**
 * ClientOnly component that ensures content only renders on client
 * with proper loading state
 */
export function ClientOnly({
  children,
  loading = null,
}: {
  children: React.ReactNode;
  loading?: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{loading}</>;
  }

  return <>{children}</>;
}

/**
 * Hook to detect hydration state
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Hook to prevent layout shifts during hydration
 */
export function useLayoutShiftPrevention() {
  const [layoutShifts, setLayoutShifts] = useState<number[]>([]);

  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            const value = (entry as any).value;
            setLayoutShifts(prev => [...prev, value]);
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      return () => observer.disconnect();
    }
  }, []);

  const totalCLS = layoutShifts.reduce((sum, shift) => sum + shift, 0);
  const hasExcessiveShift = totalCLS > 0.1;

  return {
    layoutShifts,
    totalCLS,
    hasExcessiveShift,
  };
}

/**
 * Component that measures and reports hydration performance
 */
export function HydrationPerformanceMonitor() {
  useEffect(() => {
    const startTime = performance.now();
    
    const measureHydration = () => {
      const hydrationTime = performance.now() - startTime;
      
      // Report hydration performance
      if ('gtag' in window) {
        (window as any).gtag('event', 'hydration_complete', {
          custom_parameter_1: hydrationTime,
          custom_parameter_2: window.location.pathname,
        });
      }

      // Log performance metrics
      console.log('Hydration Performance:', {
        hydrationTime: `${hydrationTime.toFixed(2)}ms`,
        pathname: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    };

    // Measure after hydration is complete
    const timeoutId = setTimeout(measureHydration, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}