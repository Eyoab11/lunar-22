/**
 * Analytics Tracker - Google Analytics Integration
 * Handles Google Analytics initialization, page tracking, and privacy compliance
 */

import { AnalyticsConfig } from './types';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export class AnalyticsTracker {
  private config: AnalyticsConfig;
  private isInitialized = false;
  private isScriptLoaded = false;
  private pendingEvents: Array<() => void> = [];

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  /**
   * Initialize Google Analytics with the provided configuration
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    // Check for Do Not Track preference if respectDNT is enabled
    if (this.config.respectDNT && this.isDNTEnabled()) {
      if (this.config.enableDebug) {
        console.log('[Analytics] DNT detected, skipping initialization');
      }
      return;
    }

    // Check if user has opted out
    if (this.isOptedOut()) {
      if (this.config.enableDebug) {
        console.log('[Analytics] User has opted out, skipping initialization');
      }
      return;
    }

    try {
      // Initialize dataLayer
      this.initializeDataLayer();

      // Load the gtag script
      await this.loadScript();

      // Configure Google Analytics
      this.configureAnalytics();

      // Set custom dimensions if provided
      this.setCustomDimensions();

      this.isInitialized = true;

      // Process any pending events
      this.processPendingEvents();

      if (this.config.enableDebug) {
        console.log('[Analytics] Initialized successfully');
      }
    } catch (error) {
      console.error('[Analytics] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Track a page view
   */
  public trackPageView(path: string): void {
    if (!this.isInitialized) {
      this.pendingEvents.push(() => this.trackPageView(path));
      return;
    }

    if (this.config.respectDNT && this.isDNTEnabled()) {
      return;
    }

    if (this.isOptedOut()) {
      return;
    }

    try {
      window.gtag('config', this.config.trackingId, {
        page_path: path,
        send_page_view: true,
      });

      if (this.config.enableDebug) {
        console.log('[Analytics] Page view tracked:', path);
      }
    } catch (error) {
      console.error('[Analytics] Page view tracking failed:', error);
    }
  }

  /**
   * Track a custom event
   */
  public trackEvent(eventName: string, parameters: Record<string, any> = {}): void {
    if (!this.isInitialized) {
      this.pendingEvents.push(() => this.trackEvent(eventName, parameters));
      return;
    }

    if (this.config.respectDNT && this.isDNTEnabled()) {
      return;
    }

    if (this.isOptedOut()) {
      return;
    }

    try {
      window.gtag('event', eventName, parameters);

      if (this.config.enableDebug) {
        console.log('[Analytics] Event tracked:', eventName, parameters);
      }
    } catch (error) {
      console.error('[Analytics] Event tracking failed:', error);
    }
  }

  /**
   * Load the Google Analytics script asynchronously
   */
  public async loadScript(): Promise<void> {
    if (this.isScriptLoaded) {
      return;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.trackingId}`;
      
      script.onload = () => {
        this.isScriptLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Analytics script'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Check if user has opted out of analytics
   */
  public isOptedOut(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    // Check for global opt-out flag
    const optOutProperty = `ga-disable-${this.config.trackingId}`;
    return !!(window as any)[optOutProperty];
  }

  /**
   * Opt user out of analytics tracking
   */
  public optOut(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const optOutProperty = `ga-disable-${this.config.trackingId}`;
    (window as any)[optOutProperty] = true;

    if (this.config.enableDebug) {
      console.log('[Analytics] User opted out of tracking');
    }
  }

  /**
   * Opt user back into analytics tracking
   */
  public optIn(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const optOutProperty = `ga-disable-${this.config.trackingId}`;
    delete (window as any)[optOutProperty];

    if (this.config.enableDebug) {
      console.log('[Analytics] User opted into tracking');
    }
  }

  /**
   * Get current analytics configuration
   */
  public getConfig(): AnalyticsConfig {
    return { ...this.config };
  }

  /**
   * Update analytics configuration
   */
  public updateConfig(newConfig: Partial<AnalyticsConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Check if analytics is initialized
   */
  public getInitializationStatus(): boolean {
    return this.isInitialized;
  }

  /**
   * Reset analytics tracker (for privacy compliance)
   */
  public reset(): void {
    this.isInitialized = false;
    this.isScriptLoaded = false;
    this.pendingEvents = [];
    
    // Clear any existing gtag data
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer = [];
    }
  }

  /**
   * Check if user has given consent for analytics
   */
  public hasConsent(): boolean {
    return !this.isOptedOut() && (!this.config.respectDNT || !this.isDNTEnabled());
  }

  /**
   * Initialize the dataLayer array
   */
  private initializeDataLayer(): void {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };
  }

  /**
   * Configure Google Analytics with initial settings
   */
  private configureAnalytics(): void {
    // Set the current timestamp
    window.gtag('js', new Date());

    // Configure the tracking ID with initial settings
    window.gtag('config', this.config.trackingId, {
      send_page_view: false, // We'll handle page views manually
      anonymize_ip: true, // Anonymize IP addresses for privacy
      allow_google_signals: !this.config.respectDNT, // Respect DNT for Google Signals
    });
  }

  /**
   * Set custom dimensions if configured
   */
  private setCustomDimensions(): void {
    if (!this.config.customDimensions) {
      return;
    }

    Object.entries(this.config.customDimensions).forEach(([key, value]) => {
      window.gtag('config', this.config.trackingId, {
        [key]: value,
      });
    });
  }

  /**
   * Process any events that were queued before initialization
   */
  private processPendingEvents(): void {
    while (this.pendingEvents.length > 0) {
      const event = this.pendingEvents.shift();
      if (event) {
        event();
      }
    }
  }

  /**
   * Check if Do Not Track is enabled
   */
  private isDNTEnabled(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    // Check various DNT indicators
    return (
      navigator.doNotTrack === '1' ||
      (window as any).doNotTrack === '1' ||
      (navigator as any).msDoNotTrack === '1'
    );
  }
}

// Create and export a singleton instance
let analyticsTracker: AnalyticsTracker | null = null;

/**
 * Get the global analytics tracker instance
 */
export function getAnalyticsTracker(config?: AnalyticsConfig): AnalyticsTracker {
  if (!analyticsTracker && config) {
    analyticsTracker = new AnalyticsTracker(config);
  }
  
  if (!analyticsTracker) {
    throw new Error('Analytics tracker not initialized. Please provide a configuration.');
  }
  
  return analyticsTracker;
}

/**
 * Initialize analytics with the global configuration
 */
export async function initializeAnalytics(config: AnalyticsConfig): Promise<AnalyticsTracker> {
  const tracker = getAnalyticsTracker(config);
  await tracker.initialize();
  return tracker;
}