'use client';

import { motion } from 'framer-motion';
import { BrochureCarousel } from '../../../components/ui/BrochureCarousel';
import { ImagePreloader } from '../../../components/ui/ImagePreloader';

export function BrochurePageClient() {
  // Google Drive images using the same approach as videos with /preview
  const brochurePages = [
    'https://drive.google.com/file/d/1sjKhn_fUprC5csPG9MO4h9Qd1kucrVEL/preview',
    'https://drive.google.com/file/d/1xWY5ptDOYy4KEvm8c3HLQN97dAF-Cht8/preview',
    'https://drive.google.com/file/d/1Yd36Pit7H6OsZzBPhRi-qpzk4SkwyX--/preview',
    'https://drive.google.com/file/d/17ruKk95Gks9tZnSofMFwJaOxDxL4mz8c/preview',
    'https://drive.google.com/file/d/1gDhONVWSTruNWlkgPboXtswlZh68DGzu/preview',
    'https://drive.google.com/file/d/1RJ0wo6GwHKooOPtk2TZ7V-O66ZKCNVu9/preview',
    'https://drive.google.com/file/d/1_sCsVRX0Ur0adHFVL-VdyE316GvvVGrw/preview',
    'https://drive.google.com/file/d/1WXhRDCxmQM-41M2xzoIZvTxgQ-klq7k_/preview',
    'https://drive.google.com/file/d/14j1k-lhQG5QEi9_5Trq3H6Ht0BJtokjw/preview',
    'https://drive.google.com/file/d/1b39S0Mwla9h1ja8Xzt_JFhLbmoTyr_72/preview',
    'https://drive.google.com/file/d/1WkwH8ddhsbXabA8b-YxSctpUlCahlTAc/preview',
    'https://drive.google.com/file/d/1doCiC7nXSGs-pZmoLTSKfyUfoUXCljHZ/preview',
    'https://drive.google.com/file/d/1nJ-NVdpilsaG6GM4fUwMIjkyv2XK4kQk/preview',
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