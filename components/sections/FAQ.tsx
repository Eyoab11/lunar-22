'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "DO YOU OFFER REVISIONS?",
      answer: "Yes — every project includes up to two free revision rounds to make sure the track feels exactly right for you."
    },
    {
      id: 2,
      question: "WHAT DO I GET WITH DELIVERY?",
      answer: "You'll receive high-quality WAV/MP3 files, instrumentals, acapellas, and properly labeled stems, ready for streaming or live performance."
    },
    {
      id: 3,
      question: "HOW LONG DOES A PROJECT TAKE?",
      answer: "Depending on complexity, a single track usually takes 1-3 weeks. Full EPs or albums require a longer, planned timeline."
    },
    {
      id: 4,
      question: "WHAT GENRES DO YOU WORK IN?",
      answer: "Mostly pop, trap, R&B, and electronic, but I adapt to each artist's style. The goal is to make your sound unique."
    },
    {
      id: 5,
      question: "HOW DOES THE PROCESS WORK?",
      answer: "We start with a call to define your vision, then move into production, recording, mixing, and mastering — step by step."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="bg-black py-20 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Decorative line */}
          <motion.div 
            className="w-16 h-0.5 bg-white mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            GOT QUESTIONS?
          </motion.h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800/50 overflow-hidden"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-300"
              >
                <h3 className="text-white text-base md:text-lg font-medium tracking-wide">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openItems.includes(item.id) ? (
                    <Minus className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};