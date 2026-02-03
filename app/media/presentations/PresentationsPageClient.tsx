'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function PresentationsPageClient() {
  const [video1Playing, setVideo1Playing] = useState(false);
  const [video2Playing, setVideo2Playing] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-white"
          >
            PRESENTATIONS
          </motion.h1>
        </div>
      </section>

      {/* Presentations Section */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-16 max-w-4xl mx-auto">
            {/* Video 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50"
            >
              <div className="aspect-video relative">
                {!video1Playing ? (
                  <div 
                    className="relative w-full h-full cursor-pointer group rounded-xl overflow-hidden"
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
                    className="w-full h-full rounded-xl"
                    allow="autoplay"
                    allowFullScreen
                    title="Lunar 22 Video 1"
                  />
                )}
              </div>
            </motion.div>

            {/* Video 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50"
            >
              <div className="aspect-video relative">
                {!video2Playing ? (
                  <div 
                    className="relative w-full h-full cursor-pointer group rounded-xl overflow-hidden"
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
                    className="w-full h-full rounded-xl"
                    allow="autoplay"
                    allowFullScreen
                    title="Lunar 22 Video 2"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}