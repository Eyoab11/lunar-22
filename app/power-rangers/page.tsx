import { Metadata } from 'next';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { generateSEOMetadata, PowerRangersSEO, SSROptimizer } from '../../components/seo';
import { PowerRangersPageClient } from './PowerRangersPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('/power-rangers');
}

export default async function PowerRangersPage() {
  return (
    <PowerRangersSEO>
      <SSROptimizer enableHydrationOptimization={true} enableLayoutShiftPrevention={true}>
        <main className="bg-black min-h-screen">
          <Header />
          <PowerRangersPageClient />
          <Footer />
        </main>
      </SSROptimizer>
    </PowerRangersSEO>
  );
}
