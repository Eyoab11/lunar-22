'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const PastWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Title animation
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [0.3, 1, 1, 0]
  );

  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8],
    [0.98, 1.02, 1]
  );

  // Description animation - appears after title
  const descriptionOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.85, 1],
    [0, 1, 1, 0]
  );

  const descriptionScale = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.85],
    [0.98, 1.01, 1]
  );

  // Subtle Y movements
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.15, 1],
    [10, 0, -10]
  );

  const descriptionY = useTransform(
    scrollYProgress,
    [0.1, 0.25, 1],
    [15, 0, -15]
  );

  return (
    <section 
      id="past-work"
      ref={containerRef}
      className="h-[180vh] bg-black flex items-start justify-center pt-20"
    >
      <div className="sticky top-1/2 transform -translate-y-1/2 max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Title */}
          <div className="text-left">
            {/* Decorative line */}
            <motion.div 
              className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-white mb-8"
              style={{ opacity: titleOpacity }}
            />
            
            <motion.h2
              style={{ 
                opacity: titleOpacity,
                scale: titleScale,
                y: titleY
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide transition-all duration-300 ease-out"
            >
              PROJECTS
            </motion.h2>
          </div>

          {/* Right Side - Description */}
          <div className="text-left">
            <motion.p
              style={{ 
                opacity: descriptionOpacity,
                scale: descriptionScale,
                y: descriptionY
              }}
              className="text-base md:text-lg text-gray-300 leading-relaxed transition-all duration-300 ease-out"
            >
              Lunar 22 is powered by a world‑class team whose work has helped define some of the most iconic family entertainment franchises on the planet. United by a singular creative vision and an unmatched legacy of success, this is not a studio that follows the market—we build timeless universes that imprint themselves on childhood, and endure for generations.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};