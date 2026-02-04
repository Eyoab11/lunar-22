'use client';

import { motion } from 'framer-motion';
import { BrochureCarousel } from '../../../components/ui/BrochureCarousel';
import { ImagePreloader } from '../../../components/ui/ImagePreloader';

export function BrochurePageClient() {
  // Original brochure pages - 13 JPG images with correct naming format
  const brochurePages = [
    '/Lunar 22_Digital Brochure_Feb 02-1_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-2_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-3_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-4_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-5_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-6_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-7_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-8_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-9_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-10_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-11_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-12_page-0001.jpg',
    '/Lunar 22_Digital Brochure_Feb 02-13_page-0001.jpg',
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Preload brochure images for better performance */}
      <ImagePreloader images={brochurePages} priority={3} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-white"
          >
            BROCHURES
          </motion.h1>
        </div>
      </section>

      {/* Brochures Section */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gray-900 bg-opacity-50 rounded-2xl p-8 border border-gray-700 border-opacity-50"
          >
            {/* Interactive Brochure Carousel */}
            <BrochureCarousel pages={brochurePages} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}