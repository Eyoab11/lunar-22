'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
  color?: string;
  link?: string;
  hideButton?: boolean;
}

const workItems: WorkItem[] = [
  {
    id: 1,
    title: "MIGHTY MORPHIN\nPOWER RANGERS",
    description: "A franchise co-created under the leadership of Lunar 22 managing partner Shuki Levy. MMPR became one of the highest-grossing children's properties of all time, generating billions in licensed merchandise and captivating audiences in over 150 countries.",
    image: "/power.jpg",
    link: "/power-rangers"
  },
  {
    id: 2,
    title: "SCALABLE IP\nPORTFOLIO",
    description: "Our content portfolio spans a diverse range of formats, including animated and live-action series designed for episodic storytelling, as well as branded interactive app content and short form content. Merchandising, licensing and ancillary opportunities are central to our IP development strategy, extending the impact of our productions across various markets, creating additional revenue streams and brand exposure.",
    image: "/GGI2.jpeg",
    hideButton: true
  },
  {
    id: 3,
    title: "GLOBAL CONTENT\nECOSYSTEM",
    description: "We build globally minded IP designed from inception to travel across borders, cultures, and platforms—connecting with families through universal themes, music, and storytelling. Our approach integrates content, consumer products, and ancillary extensions into a cohesive global ecosystem that resonates emotionally while scaling commercially worldwide.",
    image: "/superhero.jpg",
    hideButton: true
  }
];

export const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <>
      {/* Section Header */}
      <section id="featured-work" className="bg-black px-8 pt-20 ">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-4"
          >
            <motion.div 
              className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              FEATURED WORK
            </motion.h2>
          </motion.div>
        </div>
      </section>

      {/* Stacking Cards Section */}
      <section 
        ref={containerRef}
        className="relative bg-black"
        style={{ height: `${workItems.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center px-8">
          {workItems.map((item, index) => {
            const cardStart = index / workItems.length;
            const cardEnd = (index + 1) / workItems.length;
            
            const scale = useTransform(
              scrollYProgress,
              [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
              [0.8, 1, 1, 0.8]
            );
            
            const opacity = useTransform(
              scrollYProgress,
              [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
              [0, 1, 1, 0]
            );
            
            const y = useTransform(
              scrollYProgress,
              [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
              [100, 0, 0, -100]
            );

            return (
              <motion.div
                key={item.id}
                style={{ 
                  scale,
                  opacity,
                  y,
                  zIndex: workItems.length - index
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-6xl mx-auto w-full">
                  <motion.div
                    className="bg-gray-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <div className="grid md:grid-cols-2">
                      {/* Left Content */}
                      <div className="p-12 lg:p-16 flex flex-col justify-center">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-white mb-8" />
                        
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight whitespace-pre-line">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
                          {item.description}
                        </p>
                        
                        {!item.hideButton && (
                          <div>
                            {item.link ? (
                              <Link href={item.link}>
                                <Button 
                                  variant="outline" 
                                  size="md"
                                >
                                  Learn More
                                </Button>
                              </Link>
                            ) : (
                              <Link href="/contact">
                                <Button 
                                  variant="outline" 
                                  size="md"
                                >
                                  Contact me
                                </Button>
                              </Link>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right Image */}
                      <div className="relative h-96 md:h-auto min-h-[500px]">
                        <div 
                          className="w-full h-full bg-cover bg-center rounded-r-3xl"
                          style={{
                            backgroundImage: `url('${item.image}')`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/20 rounded-r-3xl"></div>
                        </div>
                        
                        <div className="absolute top-8 right-8 w-3 h-3 bg-white rounded-full opacity-60" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
};