'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const AboutUs = () => {
  const values = [
    {
      id: 1,
      number: "1",
      title: "GLOBAL REACH",
      description: "Meaningful, cross-cultural stories with international resonance",
      position: "top-left"
    },
    {
      id: 2,
      number: "2",
      title: "FAMILY FRIENDLY",
      description: "Positive, universally appealing characters and concepts",
      position: "top-right"
    },
    {
      id: 3,
      number: "3",
      title: "FRANCHISE DRIVEN",
      description: "Built-in merchandising and ancillary opportunities with a long-term growth focus",
      position: "bottom-left"
    },
    {
      id: 4,
      number: "4",
      title: "MUSIC FORWARD",
      description: "A strong international track record in music and soundtrack production",
      position: "bottom-right"
    }
  ];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'lg:absolute lg:top-0 lg:left-8';
      case 'top-right':
        return 'lg:absolute lg:top-0 lg:right-8';
      case 'bottom-left':
        return 'lg:absolute lg:bottom-0 lg:left-8';
      case 'bottom-right':
        return 'lg:absolute lg:bottom-0 lg:right-8';
      default:
        return '';
    }
  };

  return (
    <section id="about-us" className="min-h-screen bg-black flex items-center justify-center px-4 md:px-8 py-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header - Reduced spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Decorative line */}
          <motion.div 
            className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-wide px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            About Lunar 22
          </motion.h2>
          
          {/* Description paragraph */}
          <motion.p
            className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto mt-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            A visionary global studio led by the creator behind one of the most successful children's franchises in history, powered by a seasoned team with a proven record of building hit entertainment brands. Lunar 22 develops original IP engineered to resonate across cultures, platforms, and generations, turning every story into a scalable world. With a franchise‑ready content ecosystem built for consumer products and long‑term brand growth, Lunar 22 is defining the current and next wave of global entertainment—where the future of storytelling knows no limits.
          </motion.p>
        </motion.div>

        {/* Main Content Area - Mobile Responsive */}
        <div className="relative flex flex-col lg:block items-center justify-center gap-8 lg:gap-0">
          {/* Central Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-xs lg:max-w-none"
          >
            <div className="w-full lg:w-80 h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800/30 mx-auto">
              <div 
                className="w-full h-full bg-cover bg-top bg-gradient-to-b from-transparent to-black/20"
                style={{
                  backgroundImage: `url('/Kids watching TV.png')`
                }}
              />
            </div>
          </motion.div>

          {/* Value Cards - Mobile: Stack below, Desktop: Absolute positioning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden w-full max-w-2xl">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-gray-400/60 mb-1 leading-none">
                  {value.number}
                </div>
                <h3 className="text-xl font-black text-white mb-4 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed text-center max-w-xs mx-auto">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Absolute positioned cards around centered image */}
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`hidden lg:block w-72 ${getPositionClasses(value.position)}`}
            >
              <div className="text-center">
                <div className="text-7xl font-bold text-gray-400/60 mb-1 leading-none">
                  {value.number}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed text-center max-w-xs mx-auto">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/about">
            <Button variant="primary" size="lg">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};