'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const MediaPageClient = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Media Navigation Section */}
      <section className="pt-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-16 md:mb-20 text-center text-white">
              MEDIA
            </h1>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Brochure Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/media/brochure">
                  <div className="group bg-gray-900/50 rounded-xl md:rounded-2xl p-8 md:p-12 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                      BROCHURES
                    </h2>
                    <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors">
                      View our corporate brochure and company materials
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Presentations Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link href="/media/presentations">
                  <div className="group bg-gray-900/50 rounded-xl md:rounded-2xl p-8 md:p-12 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                      PRESENTATIONS
                    </h2>
                    <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors">
                      Watch our video presentations and company showcases
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};