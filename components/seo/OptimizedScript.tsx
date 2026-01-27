/**
 * OptimizedScript Component - Performance-optimized script loading
 * Uses Performance_Optimizer for script prioritization and async loading
 */

'use client';

import Script from 'next/script';
import { performanceOptimizer, ScriptOptimizationConfig } from '@/lib/seo/performance-optimizer';

interface OptimizedScriptProps extends ScriptOptimizationConfig {
  id?: string;
  onLoad?: () => void;
  onError?: () => void;
  onReady?: () => void;
  children?: React.ReactNode;
}

export function OptimizedScript({
  src,
  strategy = 'afterInteractive',
  async = true,
  defer = false,
  priority = false,
  id,
  onLoad,
  onError,
  onReady,
  children,
}: OptimizedScriptProps) {
  // Generate optimized attributes using Performance_Optimizer
  const optimizedAttributes = performanceOptimizer.optimizeScriptAttributes({
    src,
    strategy,
    async,
    defer,
    priority,
  });

  return (
    <Script
      src={optimizedAttributes.src}
      strategy={optimizedAttributes.strategy}
      id={id}
      onLoad={onLoad}
      onError={onError}
      onReady={onReady}
    >
      {children}
    </Script>
  );
}

export default OptimizedScript;