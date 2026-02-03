'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BrochureCarousel } from '../../components/ui/BrochureCarousel';
import { ImagePreloader } from '../../components/ui/ImagePreloader';

export const MediaPageClient = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };
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
      
      {/* Brochures and Presentations Section */}
      <section className="pt-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center">
              Brochures and Presentations
            </h2>
            
            {/* Corporate Brochure */}
            <div className="mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-900/50 rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-800 w-full overflow-hidden"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">Corporate Brochure</h3>
                
                {/* Interactive Brochure Carousel */}
                <BrochureCarousel pages={brochurePages} />
              </motion.div>
            </div>

            {/* Videos Section */}
            <div className="flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto">
              {/* Video 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gray-800/30 rounded-xl md:rounded-2xl border border-gray-700 overflow-hidden"
              >
                <div className="aspect-video">
                  <video
                    ref={video1Ref}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover brightness-110"
                    poster="/thumbnail1.jpeg"
                    onPlay={() => handleVideoPlay(video1Ref)}
                  >
                    <source src="/Lunar 22 Video 1.mp4" type="video/mp4" />
                    <source src="/Lunar 22 Video 1.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>

              {/* Video 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gray-800/30 rounded-xl md:rounded-2xl border border-gray-700 overflow-hidden"
              >
                <div className="aspect-video">
                  <video
                    ref={video2Ref}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover brightness-110"
                    poster="/thumbnail2.jpeg"
                    onPlay={() => handleVideoPlay(video2Ref)}
                  >
                    <source src="/Lunar 22 Video 2.mp4" type="video/mp4" />
                    <source src="/Lunar 22 Video 2.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};