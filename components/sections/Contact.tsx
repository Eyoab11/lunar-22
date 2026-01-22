'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Contact = () => {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Spotlight Effect Container */}
      <div className="absolute inset-0">
        {/* Floor reflection/glow */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: '100%',
            height: '40%',
            background: `
              radial-gradient(
                ellipse 60% 40% at 50% 100%,
                rgba(100, 150, 180, 0.15) 0%,
                rgba(80, 120, 150, 0.08) 30%,
                rgba(60, 100, 130, 0.03) 60%,
                transparent 100%
              )
            `,
          }}
        />

        {/* Ambient glow in center */}
        <div
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '600px',
            height: '600px',
            background: `
              radial-gradient(
                ellipse at center,
                rgba(150, 180, 200, 0.08) 0%,
                rgba(100, 140, 170, 0.04) 30%,
                transparent 70%
              )
            `,
          }}
        />

        {/* Subtle dust particles effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.3), transparent),
              radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.2), transparent),
              radial-gradient(1px 1px at 60% 40%, rgba(255,255,255,0.3), transparent),
              radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.2), transparent),
              radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.15), transparent),
              radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.2), transparent)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Decorative line */}
        <motion.div
          className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-8"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-4"
        >
          LET'S GET
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-12"
        >
          IN TOUCH
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Connect
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
