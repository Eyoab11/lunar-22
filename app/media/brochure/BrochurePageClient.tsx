'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const brochurePages = [
  { id: 1, title: 'Page 1', image: '/Lunar 22_Digital Brochure_Feb 02-1_page-0001.jpg' },
  { id: 2, title: 'Page 2', image: '/Lunar 22_Digital Brochure_Feb 02-2_page-0001.jpg' },
  { id: 3, title: 'Page 3', image: '/Lunar 22_Digital Brochure_Feb 02-3_page-0001.jpg' },
  { id: 4, title: 'Page 4', image: '/Lunar 22_Digital Brochure_Feb 02-4_page-0001.jpg' },
  { id: 5, title: 'Page 5', image: '/Lunar 22_Digital Brochure_Feb 02-5_page-0001.jpg' },
  { id: 6, title: 'Page 6', image: '/Lunar 22_Digital Brochure_Feb 02-6_page-0001.jpg' },
  { id: 7, title: 'Page 7', image: '/Lunar 22_Digital Brochure_Feb 02-7_page-0001.jpg' },
  { id: 8, title: 'Page 8', image: '/Lunar 22_Digital Brochure_Feb 02-8_page-0001.jpg' },
  { id: 9, title: 'Page 9', image: '/Lunar 22_Digital Brochure_Feb 02-9_page-0001.jpg' },
  { id: 10, title: 'Page 10', image: '/Lunar 22_Digital Brochure_Feb 02-10_page-0001.jpg' },
  { id: 11, title: 'Page 11', image: '/Lunar 22_Digital Brochure_Feb 02-11_page-0001.jpg' },
  { id: 12, title: 'Page 12', image: '/Lunar 22_Digital Brochure_Feb 02-12_page-0001.jpg' },
  { id: 13, title: 'Page 13', image: '/Lunar 22_Digital Brochure_Feb 02-13_page-0001.jpg' },
];

export function BrochurePageClient() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 0 && newPage < brochurePages.length) {
      setDirection(newDirection);
      setCurrentPage(newPage);
    }
  };

  const goToPage = (pageIndex: number) => {
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              BROCHURES
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="px-6 pb-8 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Main Carousel */}
          <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 mb-8">
            <div className="relative w-full" style={{ aspectRatio: '5075/2344' }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  {/* Brochure page image */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                    <Image
                      src={brochurePages[currentPage].image}
                      alt={brochurePages[currentPage].title}
                      fill
                      className="object-contain"
                      priority={currentPage === 0}
                      quality={95}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={() => paginate(-1)}
                disabled={currentPage === 0}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-gray-700 flex items-center justify-center transition-all z-10 ${
                  currentPage === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-black/70 hover:border-blue-500'
                }`}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => paginate(1)}
                disabled={currentPage === brochurePages.length - 1}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-gray-700 flex items-center justify-center transition-all z-10 ${
                  currentPage === brochurePages.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-black/70 hover:border-blue-500'
                }`}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Page Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700 z-10">
                <span className="text-white font-medium">
                  {currentPage + 1} / {brochurePages.length}
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {brochurePages.map((page, index) => (
              <button
                key={page.id}
                onClick={() => goToPage(index)}
                className={`flex-shrink-0 w-20 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                  currentPage === index
                    ? 'border-blue-500 ring-2 ring-blue-500/50'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                  <Image
                    src={page.image}
                    alt={page.title}
                    fill
                    className="object-cover"
                    quality={50}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
