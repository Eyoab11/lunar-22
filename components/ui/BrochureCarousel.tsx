'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BrochureCarouselProps {
  pages: string[];
}

export const BrochureCarousel = ({ pages }: BrochureCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

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
              className="absolute inset-0 overflow-hidden"
            >
              <Image
                src={pages[currentPage]}
                alt={`Brochure page ${currentPage + 1}`}
                fill
                className="object-contain"
                priority={currentPage === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevPage}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
          aria-label="Previous page"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextPage}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
          aria-label="Next page"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Page counter */}
        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/50 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium z-10">
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

      {/* Download button */}
      <div className="flex justify-center mt-4 md:mt-6 px-4">
        <a
          href="/Lunar 22_Digital Brochure_Feb 02.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-medium text-sm md:text-base"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Full PDF
        </a>
      </div>
    </div>
  );
};