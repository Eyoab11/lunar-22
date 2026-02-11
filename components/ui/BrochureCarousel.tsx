'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BrochureCarouselProps {
  pages: string[];
}

// Cache key for localStorage
const CACHE_KEY = 'brochure_cache_v1';
const CACHE_TIMESTAMP_KEY = 'brochure_cache_timestamp';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export const BrochureCarousel = ({ pages }: BrochureCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const [isClient, setIsClient] = useState(false);
  const [isSafariDesktop, setIsSafariDesktop] = useState(false);
  const [cachedUrls, setCachedUrls] = useState<{ [key: number]: string }>({});

  // Detect Safari desktop (not iOS)
  useEffect(() => {
    setIsClient(true);
    
    const ua = navigator.userAgent;
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isMac = /Macintosh/.test(ua);
    
    // Safari on macOS desktop has issues with Google Drive iframes
    setIsSafariDesktop(isSafari && isMac && !isIOS);
    
    // Load cached data
    loadFromCache();
  }, []);

  // Load cached images from localStorage
  const loadFromCache = useCallback(() => {
    try {
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      const now = Date.now();
      
      // Check if cache is still valid
      if (timestamp && (now - parseInt(timestamp)) < CACHE_DURATION) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache = JSON.parse(cached);
          setCachedUrls(parsedCache);
          
          // Mark cached images as loaded
          const loaded: { [key: number]: boolean } = {};
          Object.keys(parsedCache).forEach(key => {
            loaded[parseInt(key)] = true;
          });
          setLoadedImages(loaded);
          
          console.log('✅ Loaded brochure pages from cache');
          return true;
        }
      } else {
        // Clear expired cache
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      }
    } catch (error) {
      console.error('Failed to load from cache:', error);
    }
    return false;
  }, []);

  // Save to cache
  const saveToCache = useCallback((index: number, url: string) => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cacheData = cached ? JSON.parse(cached) : {};
      cacheData[index] = url;
      
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      
      setCachedUrls(prev => ({ ...prev, [index]: url }));
    } catch (error) {
      console.error('Failed to save to cache:', error);
    }
  }, []);

  // Convert Google Drive preview URLs to direct image URLs for Safari desktop
  const getImageUrl = (previewUrl: string) => {
    if (!isSafariDesktop) return previewUrl;
    
    // Extract file ID from preview URL and convert to direct image URL
    const match = previewUrl.match(/\/d\/([^/]+)\//);
    if (match) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return previewUrl;
  };

  // Optimized preloading with caching: only load current page and adjacent pages
  useEffect(() => {
    if (!isClient) return;

    if (isSafariDesktop) {
      // For Safari desktop, lazy load only adjacent pages
      const pagesToLoad = [
        currentPage,
        (currentPage - 1 + pages.length) % pages.length,
        (currentPage + 1) % pages.length,
      ];

      pagesToLoad.forEach((index) => {
        // Skip if already loaded or has error
        if (loadedImages[index] || imageError[index]) return;

        // Check if we have a cached version
        if (cachedUrls[index]) {
          setLoadedImages(prev => ({ ...prev, [index]: true }));
          return;
        }

        const imageUrl = getImageUrl(pages[index]);
        const img = document.createElement('img');
        
        img.onload = () => {
          setLoadedImages(prev => ({ ...prev, [index]: true }));
          saveToCache(index, imageUrl);
          console.log(`✅ Loaded and cached page ${index + 1}`);
        };
        
        img.onerror = () => {
          setImageError(prev => ({ ...prev, [index]: true }));
          console.error(`❌ Failed to load page ${index + 1}`);
        };
        
        img.src = imageUrl;
      });
    } else {
      // For other browsers using iframes, mark current page as loaded immediately
      setLoadedImages(prev => ({ ...prev, [currentPage]: true }));
    }
  }, [pages, isClient, isSafariDesktop, currentPage, loadedImages, imageError, cachedUrls, saveToCache]);



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
    
    if (isSafariDesktop) {
      // For Safari desktop, retry loading the image
      const img = document.createElement('img');
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
      };
      img.onerror = () => {
        setImageError(prev => ({ ...prev, [index]: true }));
      };
      img.src = getImageUrl(pages[index]);
    } else {
      // For iframes, reload the page
      window.location.reload();
    }
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
              {/* Loading skeleton */}
              {!loadedImages[currentPage] && !imageError[currentPage] && (
                <div className="absolute inset-0 flex items-center justify-center z-5" style={{ backgroundColor: '#1e1e1e' }}>
                  <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-400 text-sm">Loading page {currentPage + 1}...</p>
                  </div>
                </div>
              )}

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

              {/* Google Drive content - iframe for most browsers, img for Safari desktop */}
              <div className="relative w-full h-full" style={{ backgroundColor: '#1e1e1e' }}>
                {isClient && (
                  <>
                    {isSafariDesktop ? (
                      /* Safari desktop: Use direct image URLs with lazy loading */
                      <div className="relative w-full h-full flex items-center justify-center">
                        {loadedImages[currentPage] && (
                          <Image
                            src={getImageUrl(pages[currentPage])}
                            alt={`Brochure page ${currentPage + 1}`}
                            fill
                            className="object-contain"
                            onError={() => handleImageError(currentPage)}
                            priority={currentPage === 0}
                            unoptimized
                            loading={currentPage === 0 ? 'eager' : 'lazy'}
                          />
                        )}
                      </div>
                    ) : (
                      /* Other browsers: Use iframe with lazy loading */
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
                        allow="autoplay"
                        loading="lazy"
                      />
                    )}
                  </>
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

        {/* Page counter with cache indicator */}
        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black bg-opacity-50 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium z-10 flex items-center gap-2">
          <span>{currentPage + 1} / {pages.length}</span>
          {cachedUrls[currentPage] && (
            <span className="text-green-400" title="Loaded from cache">⚡</span>
          )}
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