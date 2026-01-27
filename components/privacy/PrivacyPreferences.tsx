/**
 * Privacy Preferences Component
 * Handles user privacy preferences for analytics and tracking
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../analytics/AnalyticsProvider';

interface PrivacyPreferencesProps {
  onPreferencesChange?: (preferences: PrivacyPreferences) => void;
  className?: string;
}

export interface PrivacyPreferences {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  necessary: boolean; // Always true, cannot be disabled
}

const DEFAULT_PREFERENCES: PrivacyPreferences = {
  analytics: false,
  marketing: false,
  functional: true,
  necessary: true,
};

export function PrivacyPreferences({ onPreferencesChange, className }: PrivacyPreferencesProps) {
  const [preferences, setPreferences] = useState<PrivacyPreferences>(DEFAULT_PREFERENCES);
  const [isVisible, setIsVisible] = useState(false);
  const { optIn, optOut, isOptedOut } = useAnalytics();

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPreferences = loadPrivacyPreferences();
    if (savedPreferences) {
      setPreferences(savedPreferences);
    } else {
      // Show privacy banner if no preferences are saved
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    // Update analytics opt-in/out based on preferences
    if (preferences.analytics) {
      optIn();
    } else {
      optOut();
    }
  }, [preferences.analytics, optIn, optOut]);

  const handlePreferenceChange = (key: keyof PrivacyPreferences, value: boolean) => {
    if (key === 'necessary') return; // Cannot change necessary cookies

    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    savePrivacyPreferences(newPreferences);
    onPreferencesChange?.(newPreferences);
  };

  const handleAcceptAll = () => {
    const allAccepted: PrivacyPreferences = {
      analytics: true,
      marketing: true,
      functional: true,
      necessary: true,
    };
    setPreferences(allAccepted);
    savePrivacyPreferences(allAccepted);
    onPreferencesChange?.(allAccepted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const allRejected: PrivacyPreferences = {
      analytics: false,
      marketing: false,
      functional: false,
      necessary: true,
    };
    setPreferences(allRejected);
    savePrivacyPreferences(allRejected);
    onPreferencesChange?.(allRejected);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    savePrivacyPreferences(preferences);
    onPreferencesChange?.(preferences);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-6 ${className || ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Privacy Preferences</h3>
          <p className="text-sm text-gray-600 mb-4">
            We use cookies and similar technologies to enhance your experience, analyze site usage, and assist with marketing efforts. 
            You can customize your preferences below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-sm">Necessary</label>
                <p className="text-xs text-gray-500">Required for basic site functionality</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="rounded border-gray-300"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-sm">Functional</label>
                <p className="text-xs text-gray-500">Enable enhanced features and personalization</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.functional}
                onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-sm">Analytics</label>
                <p className="text-xs text-gray-500">Help us understand how you use our site</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-sm">Marketing</label>
                <p className="text-xs text-gray-500">Personalized ads and content</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={handleRejectAll}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Reject All
          </button>
          <button
            onClick={handleSavePreferences}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Save privacy preferences to localStorage
 */
export function savePrivacyPreferences(preferences: PrivacyPreferences): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('privacy-preferences', JSON.stringify(preferences));
    localStorage.setItem('privacy-preferences-timestamp', Date.now().toString());
  }
}

/**
 * Load privacy preferences from localStorage
 */
export function loadPrivacyPreferences(): PrivacyPreferences | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem('privacy-preferences');
    const timestamp = localStorage.getItem('privacy-preferences-timestamp');
    
    if (!saved || !timestamp) {
      return null;
    }

    // Check if preferences are older than 1 year (365 days)
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;
    if (Date.now() - parseInt(timestamp) > oneYearMs) {
      // Clear old preferences
      localStorage.removeItem('privacy-preferences');
      localStorage.removeItem('privacy-preferences-timestamp');
      return null;
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error('Failed to load privacy preferences:', error);
    return null;
  }
}

/**
 * Check if user has made privacy preferences
 */
export function hasPrivacyPreferences(): boolean {
  return loadPrivacyPreferences() !== null;
}

/**
 * Clear all privacy preferences
 */
export function clearPrivacyPreferences(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('privacy-preferences');
    localStorage.removeItem('privacy-preferences-timestamp');
  }
}

export default PrivacyPreferences;