import { Metadata } from 'next';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { generateSEOMetadata, MediaSEO, SSROptimizer } from '../../components/seo';
import { MediaPageClient } from './MediaPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('/media');
}

export default async function MediaPage() {
  return (
    <MediaSEO>
      <SSROptimizer enableHydrationOptimization={true} enableLayoutShiftPrevention={true}>
        <main>
          <Header />
          <MediaPageClient />
          <Footer />
        </main>
      </SSROptimizer>
    </MediaSEO>
  );
}