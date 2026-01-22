import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { LogoCarousel } from '../components/sections/LogoCarousel';
import { FeaturedWork } from '../components/sections/FeaturedWork';
import { ScrollText } from '../components/sections/ScrollText';
import { PastWork } from '../components/sections/PastWork';
import { WorkGrid } from '../components/sections/WorkGrid';
import { AboutUs } from '../components/sections/AboutUs';
import { Statistics } from '../components/sections/Statistics';
import { Contact } from '../components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <LogoCarousel />
      <AboutUs />
      <FeaturedWork />
      <ScrollText />
      <PastWork />
      <WorkGrid />
      <Statistics />
      <Contact />
      <Footer />
    </main>
  );
}
