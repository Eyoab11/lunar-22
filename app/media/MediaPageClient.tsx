'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { BrochureCarousel } from '../../components/ui/BrochureCarousel';
import { ImagePreloader } from '../../components/ui/ImagePreloader';

export const MediaPageClient = () => {
  const [video1Playing, setVideo1Playing] = useState(false);
  const [video2Playing, setVideo2Playing] = useState(false);

  // Brochure pages - 13 JPG images with correct naming format
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
      
      {/* Brochures Section */}
      <section className="pt-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-12 md:mb-16 text-center text-white">
              BROCHURES
            </h1>
            
            <div className="mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-900/50 rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-800 w-full overflow-hidden"
              >
                {/* Interactive Brochure Carousel */}
                <BrochureCarousel pages={brochurePages} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Presentations Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-12 md:mb-16 text-center text-white">
              PRESENTATIONS
            </h1>
            
            <div className="flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto">
              {/* Video 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gray-800/30 rounded-xl md:rounded-2xl border border-gray-700 overflow-hidden"
              >
                <div className="aspect-video relative">
                  {!video1Playing ? (
                    <div 
                      className="relative w-full h-full cursor-pointer group"
                      onClick={() => setVideo1Playing(true)}
                    >
                      <img
                        src="/thumbnail1.jpeg"
                        alt="Video 1 Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                          <svg 
                            className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src="https://drive.google.com/file/d/16sBx6_LTN9Q1Q0gcKwfa9fG7Pwc6K1lg/preview?usp=embed_facebook"
                      className="w-full h-full"
                      allow="autoplay"
                      allowFullScreen
                      title="Lunar 22 Video 1"
                    />
                  )}
                </div>
              </motion.div>

              {/* Video 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-gray-800/30 rounded-xl md:rounded-2xl border border-gray-700 overflow-hidden"
              >
                <div className="aspect-video relative">
                  {!video2Playing ? (
                    <div 
                      className="relative w-full h-full cursor-pointer group"
                      onClick={() => setVideo2Playing(true)}
                    >
                      <img
                        src="/thumbnail2.jpeg"
                        alt="Video 2 Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                          <svg 
                            className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src="https://drive.google.com/file/d/1d2TFD47uhxn-kFc3FB_aefLXlusdTi9d/preview?usp=embed_facebook"
                      className="w-full h-full"
                      allow="autoplay"
                      allowFullScreen
                      title="Lunar 22 Video 2"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};