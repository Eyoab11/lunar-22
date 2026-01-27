/**
 * Analytics Usage Example
 * Shows how to use analytics tracking in components
 */

'use client';

import React from 'react';
import { useAnalytics } from './AnalyticsProvider';

export function AnalyticsUsageExample() {
  const { trackEvent, isInitialized, isOptedOut } = useAnalytics();

  const handleButtonClick = () => {
    trackEvent('button_click', {
      button_name: 'example_button',
      page: 'demo',
    });
  };

  const handleFormSubmit = () => {
    trackEvent('form_submit', {
      form_name: 'contact_form',
      page: 'demo',
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Analytics Usage Example</h2>
      
      <div className="mb-4 text-sm text-gray-600">
        <p>Analytics Status: {isInitialized ? 'Initialized' : 'Not Initialized'}</p>
        <p>User Opted Out: {isOptedOut() ? 'Yes' : 'No'}</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleButtonClick}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Track Button Click
        </button>

        <button
          onClick={handleFormSubmit}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Track Form Submit
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          These buttons demonstrate how to track custom events. 
          Events will only be sent if analytics is initialized and the user hasn't opted out.
        </p>
      </div>
    </div>
  );
}

export default AnalyticsUsageExample;