'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export const ScrollTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Opacity fade as user scrolls
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 h-24 bg-transparent overflow-hidden pointer-events-none z-10"
    >
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Animated scroll indicator - positioned at bottom */}
      <motion.div
        className="absolute left-1/2 bottom-4 transform -translate-x-1/2 flex flex-col items-center"
        style={{ opacity }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-4 h-7 border-2 border-blue-400/70 rounded-full flex justify-center mb-1">
          <motion.div
            className="w-0.5 h-2 bg-blue-400 rounded-full mt-1"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <ChevronDown className="w-4 h-4 text-blue-400/80" />
        </motion.div>
      </motion.div>
    </div>
  );
};