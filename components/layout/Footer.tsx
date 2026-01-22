'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const Footer = () => {
  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about-us' },
    { name: 'Projects', href: '/#past-work' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#' },
    { name: 'X', href: '#' },
    { name: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-black py-16 px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Left Section - Logo and Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <div className="flex items-center mb-6">
              <img 
                src="/L22 W.png" 
                alt="Lunar 22 Logo" 
                className="h-16 w-auto"
              />
            </div>
            
            {/* Tagline */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Global Connection. Infinite Imagination.
            </p>
            
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              2026 © Lunar 22. All rights reserved.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white text-sm font-medium mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white text-sm font-medium mb-6">Socials</h4>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};