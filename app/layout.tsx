import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { metadataManager, getGlobalSEOConfig } from "../lib/seo";
import { GoogleAnalytics, AnalyticsProvider } from "../components/analytics";
import { PerformanceMetadata, CriticalCSS, ResourceHints } from "../components/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const globalConfig = getGlobalSEOConfig();
  return metadataManager.generateMetadata('/', {
    title: globalConfig.site.name,
    description: globalConfig.site.description,
    canonical: globalConfig.site.url,
    openGraph: {
      title: globalConfig.site.name,
      description: globalConfig.site.description,
      image: globalConfig.social.defaultImage,
      type: 'website',
      siteName: globalConfig.site.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: globalConfig.site.name,
      description: globalConfig.site.description,
      image: globalConfig.social.defaultImage,
      site: globalConfig.social.twitterHandle,
    },
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultPerformanceConfig = {
    preload: ['/api/favicon?type=favicon.ico'],
    prefetch: [],
    critical: true,
  };

  const analyticsConfig = {
    trackingId: 'G-VQPT4QJ1GM',
    enableDebug: false,
    respectDNT: true,
  };

  return (
    <html lang="en">
      <head>
        <PerformanceMetadata config={defaultPerformanceConfig} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AnalyticsProvider config={analyticsConfig}>
          <GoogleAnalytics config={analyticsConfig} />
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
