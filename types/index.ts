export interface NavItem {
  name: string;
  href: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
}
// SEO-related types (re-exported from lib/seo)
export type {
  MetadataConfig,
  OpenGraphConfig,
  TwitterConfig,
  RobotsConfig,
  AnalyticsConfig,
  SEOGlobalConfig,
  PageSEOConfig,
  ValidationResult,
} from '../lib/seo/types';