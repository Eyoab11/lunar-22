'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const ScrollText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // More sophisticated sequential animation with smooth transitions
  const line1Opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.35, 0.6, 0.75],
    [0.15, 1, 0.4, 0.4, 0.4, 0]
  );

  const line2Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.4, 0.5, 0.6, 0.75],
    [0.15, 0.15, 1, 0.4, 0.4, 0]
  );

  const line3Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.55, 0.7, 0.85, 1],
    [0.15, 0.15, 1, 1, 0.6, 0]
  );

  // Subtle scale effects for professional feel
  const line1Scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.6],
    [0.98, 1.02, 1, 0.98]
  );

  const line2Scale = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.4, 0.6],
    [0.98, 0.98, 1.02, 0.98]
  );

  const line3Scale = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.55, 0.85],
    [0.98, 0.98, 1.02, 0.98]
  );

  // Subtle Y movement for depth
  const line1Y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.75],
    [5, 0, 0, -10]
  );

  const line2Y = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.4, 0.75],
    [5, 5, 0, -10]
  );

  const line3Y = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.55, 1],
    [5, 5, 0, -15]
  );

  return (
    <section 
      ref={containerRef}
      className="h-[200vh] bg-black flex items-start justify-center pt-20"
    >
      <div className="sticky top-1/2 transform -translate-y-1/2">
        <div className="text-center space-y-3">
          {/* Line 1 */}
          <motion.p
            style={{ 
              opacity: line1Opacity,
              scale: line1Scale,
              y: line1Y
            }}
            className="text-lg md:text-xl font-normal text-white tracking-wider transition-all duration-300 ease-out"
          >
            PROVEN, WORLD-CLASS TRACK RECORD IN GLOBAL MEDIA PRODUCTION
          </motion.p>

          {/* Line 2 */}
          <motion.p
            style={{ 
              opacity: line2Opacity,
              scale: line2Scale,
              y: line2Y
            }}
            className="text-lg md:text-xl font-normal text-white tracking-wider transition-all duration-300 ease-out"
          >
            BILLIONS OF STREAMS ACROSS MUSIC-DRIVEN IP
          </motion.p>

          {/* Line 3 */}
          <motion.p
            style={{ 
              opacity: line3Opacity,
              scale: line3Scale,
              y: line3Y
            }}
            className="text-lg md:text-xl font-normal text-white tracking-wider transition-all duration-300 ease-out"
          >
            ORIGINAL IP ENGINEERED FOR FRANCHISE EXPANSION
          </motion.p>
        </div>
      </div>
    </section>
  );
};