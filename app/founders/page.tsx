import { Metadata } from 'next';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { generateSEOMetadata, FoundersSEO, SSROptimizer } from '../../components/seo';
import { FoundersPageClient } from './FoundersPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('/founders');
}

export default async function FoundersPage() {
  return (
    <FoundersSEO>
      <SSROptimizer enableHydrationOptimization={true} enableLayoutShiftPrevention={true}>
        <main>
          <Header />
          <FoundersPageClient />
          <Footer />
        </main>
      </SSROptimizer>
    </FoundersSEO>
  );
}