'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/Button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about-us' },
    { name: 'Projects', href: '/#past-work' },
    { name: 'Founders', href: '/founders' }
  ];

  const mediaItems = [
    { name: 'Brochure', href: '/media/brochure' },
    { name: 'Presentations', href: '/media/presentations' }
  ];

  const handleMediaClick = () => {
    setIsMediaDropdownOpen(!isMediaDropdownOpen);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Empty space to maintain layout */}
        <div className="flex-shrink-0 w-12"></div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="relative text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                onClick={() => setIsMediaDropdownOpen(false)}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ 
                    y: [0, -4, 0],
                    transition: { 
                      duration: 0.4, 
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }
                  }}
                >
                  {item.name}
                </motion.span>
                {/* Underline that slides in from left - blue gradient */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
          
          {/* Media Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: navItems.length * 0.1 }}
            className="relative"
          >
            <button 
              onClick={handleMediaClick}
              className="relative text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
            >
              <motion.span
                className="inline-block"
                whileHover={{ 
                  y: [0, -4, 0],
                  transition: { 
                    duration: 0.4, 
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }
                }}
              >
                Media
              </motion.span>
              {/* Underline that slides in from left - blue gradient */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:w-full transition-all duration-300" />
            </button>
            
            {/* Dropdown Menu - Stays open when clicked */}
            {isMediaDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-lg border border-gray-800 rounded-lg shadow-xl"
              >
                {mediaItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => setIsMediaDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Contact Link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (navItems.length + 1) * 0.1 }}
          >
            <Link
              href="/contact"
              className="relative text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
              onClick={() => setIsMediaDropdownOpen(false)}
            >
              <motion.span
                className="inline-block"
                whileHover={{ 
                  y: [0, -4, 0],
                  transition: { 
                    duration: 0.4, 
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }
                }}
              >
                Contact
              </motion.span>
              {/* Underline that slides in from left - blue gradient */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2 z-50"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* CTA Button - Removed as requested */}
        <div className="hidden md:block w-24"></div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800"
        >
          <nav className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-blue-400 py-3 border-b border-gray-800/50 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Media Submenu */}
            <div className="py-3 border-b border-gray-800/50">
              <span className="text-gray-300 font-medium">Media</span>
              <div className="ml-4 mt-2 space-y-2">
                {mediaItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-400 hover:text-blue-400 py-1 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Mobile Contact Link */}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400 py-3 border-b border-gray-800/50 transition-colors duration-300"
            >
              Contact
            </Link>
            
            <div className="mt-4">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};