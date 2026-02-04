'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BrochureCarouselProps {
  pages: string[];
}

export const BrochureCarousel = ({ pages }: BrochureCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const [isSafari, setIsSafari] = useState(false);

  // Detect Safari browser
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafariBrowser = /safari/.test(userAgent) && !/chrome/.test(userAgent) && !/chromium/.test(userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  // Safari-specific image component
  const SafariImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        display: 'block',
      }}
      onError={() => handleImageError(index)}
      loading={index === 0 ? 'eager' : 'lazy'}
    />
  );

  // Standard Next.js Image component
  const StandardImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain"
      priority={index === 0}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      quality={90}
      onError={() => handleImageError(index)}
      style={{
        objectFit: 'contain',
        objectPosition: 'center',
      }}
      unoptimized={isSafari}
    />
  );

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Main carousel container */}
      <div className="relative w-full aspect-[4/3] md:aspect-[3/4] lg:aspect-[8.5/11] max-h-[400px] md:max-h-[600px] lg:max-h-[700px] rounded-lg overflow-hidden bg-white shadow-2xl mx-auto">
        {/* Page display */}
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 overflow-hidden flex items-center justify-center"
            >
              {imageError[currentPage] ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Unable to load page {currentPage + 1}</p>
                    <button 
                      onClick={() => {
                        setImageError(prev => ({ ...prev, [currentPage]: false }));
                      }}
                      className="text-blue-500 hover:text-blue-700 underline text-sm"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {isSafari ? (
                    <SafariImage 
                      src={pages[currentPage]} 
                      alt={`Brochure page ${currentPage + 1}`}
                      index={currentPage}
                    />
                  ) : (
                    <StandardImage 
                      src={pages[currentPage]} 
                      alt={`Brochure page ${currentPage + 1}`}
                      index={currentPage}
                    />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevPage}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
          aria-label="Previous page"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextPage}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
          aria-label="Next page"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Page counter */}
        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black bg-opacity-50 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium z-10">
          {currentPage + 1} / {pages.length}
        </div>
      </div>

      {/* Page dots indicator */}
      <div className="flex justify-center mt-4 md:mt-6 space-x-1 md:space-x-2 flex-wrap px-4">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
              index === currentPage
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};