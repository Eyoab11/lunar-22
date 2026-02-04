import { Metadata } from 'next';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { BrochurePageClient } from './BrochurePageClient';
import { generateSEOMetadata, BrochureSEO } from '../../../components/seo';

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('/media/brochure');
}

export default function BrochurePage() {
  return (
    <BrochureSEO>
      <Header />
      <BrochurePageClient />
      <Footer />
    </BrochureSEO>
  );
}