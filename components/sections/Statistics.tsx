'use client';

import { motion } from 'framer-motion';

export const Statistics = () => {
  const companyDescription = "A visionary global studio led by the creator of one of the most successful children's franchises in history, powered by a seasoned team with a proven record of building hit entertainment brands. Lunar 22 develops original IP engineered to resonate across cultures, platforms, and generations. With a franchise‑ready content ecosystem built for consumer products and long‑term brand growth, Lunar 22 is defining the next wave of global entertainment—where the future of storytelling knows no limits.";

  return (
    <section className="bg-black py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed">
            {companyDescription}
          </p>
        </motion.div>

        {/* Bottom Light Effect - Glowing line with blue accents */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative h-4 mt-16 mx-auto overflow-visible"
        >
          {/* Main light bar with blue gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent rounded-full" />
          
          {/* Glow effect layer 1 - blue and white mix */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent blur-sm rounded-full" />
          
          {/* Glow effect layer 2 - wider spread with white */}
          <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md rounded-full" />
          
          {/* Glow effect layer 3 - blue outer glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};