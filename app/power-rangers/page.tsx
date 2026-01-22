'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';

export default function PowerRangersPage() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
              SHUKI LEVY AND THE CREATION OF<br />
              MIGHTY MORPHIN POWER RANGERS
            </h1>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-16"
          >
            <Image
              src="/power.jpg"
              alt="Power Rangers"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              When Mighty Morphin Power Rangers debuted in 1993, it quickly became a cultural phenomenon, capturing the imaginations of children worldwide. Behind its colorful action sequences and energetic storytelling was a creative force that helped shape its identity—Shuki Levy. Together with friend and partner Haim Saban, they launched what would eventually become one of the most well known children's franchises of all time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Producer & Writer Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-white mx-auto mb-6" />
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              As a producer, writer, and composer, Shuki played a crucial role in adapting the Japanese Super Sentai series into a uniquely American brand. His expertise in both music and television production proved invaluable as the franchise took shape under Haim Saban's leadership.
            </p>
          </motion.div>

          {/* Studio Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-black"
          >
            <Image
              src="/shuki2.avif"
              alt="Shuki Levy and Haim Saban in their Studio City sound studio, 1986"
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
              <p className="text-white text-sm md:text-base">
                Shuki Levy and Haim Saban in their Studio City sound studio, 1986.
              </p>
            </div>
          </motion.div>

          {/* Narrative Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Shuki was instrumental in shaping the narrative and structure of the series. Along with Saban, he worked to adapt footage from Kyōryū Sentai Zyuranger into a cohesive English-language show, ensuring that it resonated with Western audiences. Shuki co-wrote and directed numerous early episodes, helping to establish the formula that would define Power Rangers for decades. His understanding of children's entertainment allowed him to balance action, humor, and moral lessons in a way that kept audiences engaged while satisfying television networks and advertisers. Notably, the original pilot episode of Power Rangers was written, directed, and scored by Shuki Levy and was produced seven years before the series finally made it to air, laying the groundwork for what would become a long-running franchise.
            </p>
          </motion.div>

          {/* Power Rangers Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-black"
          >
            <Image
              src="/shuki1.avif"
              alt="Power Rangers"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Music Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-800/50"
          >
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              The Iconic Soundtrack
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Shuki also co-composed the show's unforgettable soundtrack. The show's iconic theme song—<span className="text-white font-semibold">Go Go Power Rangers</span>—was an instantly recognizable sound that became synonymous with the series. The high-energy rock anthem, along with numerous other tracks he composed, set the tone for the show's fast-paced, action-packed storytelling.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Shuki had already established himself as a prolific composer in children's television, scoring shows like <span className="text-white">Inspector Gadget</span> and <span className="text-white">He-Man and the Masters of the Universe</span>. His ability to craft memorable, engaging music played a major role in making Power Rangers appealing to a young audience.
            </p>
          </motion.div>

          {/* Power Rangers Crew Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-black"
          >
            <Image
              src="/shuki3.avif"
              alt="The Power Rangers cast and crew"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Legacy Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              A Lasting Legacy
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Shuki's influence has remained deeply embedded in the series DNA. His work on the music and early storytelling laid the foundation for what would grow to become a global phenomenon, generating billions in merchandise sales, television deals, and theatrical releases. Shuki Levy's creativity and Haim Saban's vision helped to propel Power Rangers into one of the most successful children's franchises of all time.
            </p>
          </motion.div>

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
