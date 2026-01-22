'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';

export default function AboutPage() {
  const capabilities = [
    "A global production team driven by creative and heartfelt storytelling, with a proven track record",
    "A focus on projects that promote cross-cultural understanding",
    "Positive concepts, stories and characters that resonate internationally",
    "Vast knowledge of the universal experiences of children and families in every part of our increasingly connected world",
    "Productions developed in-house on a streamlined budget, launched quickly to an international audience, and tracked with innovative, real time analytic systems",
    "A diverse and cost-effective content slate that can be tested at seed level in target global markets",
    "Merchandising strategy built organically into our entertainment productions and focused on long-term sustainability",
    "Global production apparatus with plans to expand animation, production, and manufacturing capabilities to key global territories"
  ];

  return (
    <main className="bg-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-white mb-8" />
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                About Lunar 22
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Lunar 22 has a distinctive ability to curate heroic family-friendly stories enmeshed in local traditions and values, authentic to the markets where they are viewed.
              </p>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                This new family-centric brand is powered by a visionary legend in the entertainment space, and an executive team with global business acumen.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative h-[500px] rounded-2xl overflow-hidden bg-black"
            >
              <Image
                src="/camera.png"
                alt="Lunar 22"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Bring Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Lunar 22 Brings Together
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Our comprehensive approach combines creativity, technology, and global reach to deliver exceptional entertainment experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mt-2" />
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    {capability}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              PROJECTS
            </h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Lunar 22 is powered by a world‑class team whose work has helped define some of the most iconic family entertainment franchises on the planet. United by a singular creative vision and an unmatched legacy of success, this is not a studio that follows the market—we build timeless universes that imprint themselves on childhood, and endure for generations.
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-24 mt-16">
            {[
              { id: 1, title: "He-Man & The Masters Of The Universe", youtubeId: "7yeA7a0uS3A", thumbnail: "/heman.jpg" },
              { id: 2, title: "Inspector Gadget", youtubeId: "rIc13VjeAw8", thumbnail: "/inspectorgadget.jpg" },
              { id: 3, title: "X-Men", youtubeId: "sAkL2-vh2Sk", thumbnail: "/xmen.jpg" },
              { id: 4, title: "Rainbow Brite", youtubeId: "uQSTSxqIyCg", thumbnail: "/rainbowbrite.png" },
              { id: 5, title: "Mighty Morphin Power Rangers", youtubeId: "nHalaFUqnTI", thumbnail: "/powerrangers.jpg" },
              { id: 6, title: "Spider-Man", youtubeId: "DZGN9fZvQhc", thumbnail: "/spiderman.jpg" },
              { id: 7, title: "Digimon", youtubeId: "MJvpOrzcGbI", thumbnail: "/digimon.jpg" },
              { id: 8, title: "Heathcliff", youtubeId: "9LLb8EBU9nQ", thumbnail: "/heatcliff.jpg" },
              { id: 9, title: "Mysterious Cities of Gold", youtubeId: "_ycG-xe1uSM", thumbnail: "/MYSTERIOUSCITIESOFGOLD.jpg" },
              { id: 10, title: "M.A.S.K.", youtubeId: "o2Z1yLO9C-Q", thumbnail: "/mask.jpg" },
              { id: 11, title: "She-Ra", youtubeId: "wR65P73X5GI", thumbnail: "/she-ra.jpg" },
              { id: 12, title: "Ulysses 31", youtubeId: "OZ4c1X5ene8", thumbnail: "/ulysse.jpg" }
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group cursor-pointer relative"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${item.youtubeId}`, '_blank')}
              >
                <div className="relative max-w-xs mx-auto">
                  {/* Title Overlay */}
                  <div className="absolute -top-6 -left-6 z-20 transform -rotate-3 w-[calc(100%+3rem)]">
                    <div className="bg-gray-600/40 backdrop-blur-sm px-6 py-4 rounded-md border border-gray-500/30 transition-all duration-300 group-hover:bg-white group-hover:border-gray-300">
                      <h3 className="text-sm font-medium tracking-wide leading-tight whitespace-nowrap transition-colors duration-300 text-white group-hover:text-black">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative overflow-hidden rounded-lg w-full aspect-[4/3] mb-4">
                    <motion.div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.thumbnail}')` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-black ml-1" fill="black" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium tracking-wide mt-3">
                        Watch Video
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Create Together
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Ready to bring your vision to life? Get in touch with our team to discuss your next project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Get in Touch
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
