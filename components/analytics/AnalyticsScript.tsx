/**
 * Analytics Script Component
 * Server-side component for injecting Google Analytics script into HTML head
 */

import Script from 'next/script';
import { AnalyticsConfig } from '@/lib/seo/types';

interface AnalyticsScriptProps {
  config: AnalyticsConfig;
}

export function AnalyticsScript({ config }: AnalyticsScriptProps) {
  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${config.trackingId}`}
        strategy="afterInteractive"
        id="google-analytics-script"
      />
      
      {/* Google Analytics Configuration */}
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.trackingId}', {
              send_page_view: false,
              anonymize_ip: true,
              allow_google_signals: ${!config.respectDNT}
            });
          `,
        }}
      />
    </>
  );
}

export default AnalyticsScript;