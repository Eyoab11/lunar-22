/**
 * Privacy Components - Main Export
 * Centralized exports for all privacy-related components
 */

export { PrivacyPreferences } from './PrivacyPreferences';
export { CookieConsent } from './CookieConsent';
export type { PrivacyPreferences as PrivacyPreferencesType } from './PrivacyPreferences';

// Re-export privacy utilities
export {
  savePrivacyPreferences,
  loadPrivacyPreferences,
  hasPrivacyPreferences,
  clearPrivacyPreferences,
} from './PrivacyPreferences';