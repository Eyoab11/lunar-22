import { Metadata } from 'next';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { generateSEOMetadata, AboutSEO, SSROptimizer } from '../../components/seo';
import { AboutPageClient } from './AboutPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('/about');
}

export default async function AboutPage() {
  return (
    <AboutSEO>
      <SSROptimizer enableHydrationOptimization={true} enableLayoutShiftPrevention={true}>
        <main className="bg-black min-h-screen">
          <Header />
          <AboutPageClient />
          <Footer />
        </main>
      </SSROptimizer>
    </AboutSEO>
  );
}
