'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function FoundersPageClient() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-white"
          >
            FOUNDERS
          </motion.h1>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Shuki Levy */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50"
            >
              <div className="text-center mb-8">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500">
                  <Image
                    src="/shuki-levy4.avif"
                    alt="Shuki Levy"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-2 text-white">
                  SHUKI LEVY
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Shuki Levy is a visionary producer, composer, and songwriter whose work has defined a generation of entertainment. With an unparalleled ability to craft memorable themes and scores, Shuki has brought to life some of the most iconic and beloved shows in television history.
                </p>
                <p>
                  As the co-creator of the multi-billion dollar Mighty Morphin Power Rangers franchise and composer of heroic anthems like He-Man, X-Men, Rainbow Brite, and Inspector Gadget, Shuki's creativity has been the heartbeat of countless childhoods, transcending cultural boundaries and captivating audiences worldwide.
                </p>
              </div>
            </motion.div>

            {/* Ahmad Al Dalgan */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50"
            >
              <div className="text-center mb-8">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-500">
                  <Image
                    src="/AhmadAlDalgan.avif"
                    alt="Ahmad Al Dalgan"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-2 text-white">
                  AHMAD AL DALGAN
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Ahmad Al Dalgan is a successful Saudi Businessman with corporations in all major cities in the Kingdom. Ahmad has a diverse portfolio of companies ranging from Finance to Automotive.
                </p>
                <p>
                  Ahmad is currently Director of Enterprise Risk Management at American Express Saudi, bringing his extensive business acumen and strategic vision to the entertainment industry.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}