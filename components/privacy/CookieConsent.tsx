/**
 * Cookie Consent Component
 * Simple cookie consent banner with accept/reject functionality
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../analytics/AnalyticsProvider';
import { savePrivacyPreferences, loadPrivacyPreferences, PrivacyPreferences } from './PrivacyPreferences';

interface CookieConsentProps {
  onConsentChange?: (hasConsent: boolean) => void;
  className?: string;
}

export function CookieConsent({ onConsentChange, className }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { optIn, optOut } = useAnalytics();

  useEffect(() => {
    // Check if user has already made a choice
    const existingPreferences = loadPrivacyPreferences();
    if (!existingPreferences) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    const acceptedPreferences: PrivacyPreferences = {
      analytics: true,
      marketing: false,
      functional: true,
      necessary: true,
    };
    
    savePrivacyPreferences(acceptedPreferences);
    optIn();
    setIsVisible(false);
    onConsentChange?.(true);
  };

  const handleReject = () => {
    const rejectedPreferences: PrivacyPreferences = {
      analytics: false,
      marketing: false,
      functional: false,
      necessary: true,
    };
    
    savePrivacyPreferences(rejectedPreferences);
    optOut();
    setIsVisible(false);
    onConsentChange?.(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50 ${className || ''}`}>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm">
              We use cookies to enhance your experience and analyze site usage. 
              {showDetails && (
                <span className="block mt-2 text-xs text-gray-300">
                  This includes analytics cookies to help us understand how visitors interact with our website, 
                  which pages are most popular, and how we can improve your experience. 
                  You can opt out at any time through your browser settings or by clicking "Reject".
                </span>
              )}
            </p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-blue-300 hover:text-blue-200 underline mt-1"
            >
              {showDetails ? 'Show less' : 'Learn more'}
            </button>
          </div>
          
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;