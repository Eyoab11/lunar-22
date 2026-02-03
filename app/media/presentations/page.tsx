import { Metadata } from 'next';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { PresentationsPageClient } from './PresentationsPageClient';
import { generateSEOMetadata } from '../../../components/seo';

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('/media/presentations');
}

export default function PresentationsPage() {
  return (
    <>
      <Header />
      <PresentationsPageClient />
      <Footer />
    </>
  );
}