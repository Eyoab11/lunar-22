'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrochureCarouselProps {
  pages: string[];
}

export const BrochureCarousel = ({ pages }: BrochureCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Preload iframes (simplified approach)
  useEffect(() => {
    if (!isClient) return;

    // For iframes, we'll just mark them as loaded when the component mounts
    // since iframe preloading works differently
    const timer = setTimeout(() => {
      const initialLoaded: { [key: number]: boolean } = {};
      pages.forEach((_, index) => {
        initialLoaded[index] = true;
      });
      setLoadedImages(initialLoaded);
    }, 100);

    return () => clearTimeout(timer);
  }, [pages, isClient]);



  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  // Handle iframe load events
  const handleImageLoad = (index: number) => {
    console.log(`✅ Iframe loaded successfully: ${pages[index]}`);
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    console.error(`❌ Failed to load iframe: ${pages[index]}`);
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  const retryImage = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: false }));
    setLoadedImages(prev => ({ ...prev, [index]: false }));
    // For iframes, we'll just reload the page
    window.location.reload();
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Main carousel container */}
      <div className="relative w-full aspect-[4/3] md:aspect-[3/4] lg:aspect-[8.5/11] max-h-[400px] md:max-h-[600px] lg:max-h-[700px] rounded-lg overflow-hidden shadow-2xl mx-auto" style={{ backgroundColor: '#1e1e1e' }}>
        {/* Page display */}
        <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: '#1e1e1e' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 overflow-hidden"
            >
              {/* Error state */}
              {imageError[currentPage] && (
                <div className="absolute inset-0 flex items-center justify-center z-10" style={{ backgroundColor: '#1e1e1e' }}>
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">Unable to load page {currentPage + 1}</p>
                    <button 
                      onClick={() => retryImage(currentPage)}
                      className="text-blue-400 hover:text-blue-300 underline text-sm"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}

              {/* Google Drive iframe - Same approach as videos */}
              <div className="relative w-full h-full" style={{ backgroundColor: '#1e1e1e' }}>
                {isClient && (
                  <iframe
                    src={pages[currentPage]}
                    className="w-full h-full rounded-lg"
                    style={{
                      border: 'none',
                      backgroundColor: '#1e1e1e',
                    }}
                    onLoad={() => handleImageLoad(currentPage)}
                    onError={() => handleImageError(currentPage)}
                    title={`Brochure page ${currentPage + 1}`}
                  />
                )}
              </div>
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

      {/* Page dots indicator with loading states */}
      <div className="flex justify-center mt-4 md:mt-6 space-x-1 md:space-x-2 flex-wrap px-4">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 relative ${
              index === currentPage
                ? 'bg-blue-500 scale-125'
                : loadedImages[index]
                ? 'bg-gray-400 hover:bg-gray-300'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={`Go to page ${index + 1}`}
          >
            {!loadedImages[index] && !imageError[index] && (
              <div className="absolute inset-0 rounded-full border border-gray-400 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};