import { Metadata } from 'next';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ContactForm } from '../../components/sections/ContactForm';
import { generateSEOMetadata, ContactSEO, SSROptimizer } from '../../components/seo';

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('/contact');
}

export default async function Contact() {
  return (
    <ContactSEO>
      <SSROptimizer enableHydrationOptimization={true} enableLayoutShiftPrevention={true}>
        <main>
          <Header />
          <ContactForm />
          <Footer />
        </main>
      </SSROptimizer>
    </ContactSEO>
  );
}