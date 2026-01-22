'use client';

import { motion } from 'framer-motion';

export const LogoCarousel = () => {
  const logos = [
    { name: 'Cities of Gold', url: '/citiesofgold-removebg-preview.png', alt: 'Cities of Gold logo', scale: 1.4 },
    { name: 'Digimon', url: '/digimon-removebg-preview.png', alt: 'Digimon logo', scale: 1.4 },
    { name: 'He-Man', url: '/he-man-removebg-preview.png', alt: 'He-Man logo', scale: 1.4 },
    { name: 'She-Ra', url: '/shera-removebg-preview.png', alt: 'She-Ra logo', scale: 1.2 },
    { name: 'Super Mario Bros. Super Show', url: '/SMBSSpng-removebg-preview.png', alt: 'Super Mario Bros. Super Show logo', scale: 0.9 },
    { name: 'Power Rangers', url: '/prbg.png', alt: 'Power Rangers logo', scale: 1.3 },
    { name: 'Ulysses', url: '/ulysses-removebg-preview.png', alt: 'Ulysses logo' },
    { name: 'VR Troopers', url: '/vtroopers-removebg-preview.png', alt: 'VR Troopers logo' },
    { name: 'Zelda', url: '/zelda-removebg-preview.png', alt: 'Zelda logo' },
    { name: 'X-Men', url: '/xmen.png', alt: 'X-Men logo', scale: 0.8 },
    { name: 'Spider-Man', url: '/spiiderman.png', alt: 'Spider-Man logo', scale: 1.4 },
    { name: 'Inspector Gadget', url: '/inspectorgadget.png', alt: 'Inspector Gadget logo', scale: 1.2 },
    { name: 'Rainbow Brite', url: '/rainbowbrite.png', alt: 'Rainbow Brite logo' },
    { name: 'The Incredible Hulk', url: '/theincrediblehulk.png', alt: 'The Incredible Hulk logo', scale: 1.2 },
    { name: 'Hello Kitty', url: '/hello-removebg-preview.png', alt: 'Hello Kitty logo' },
  ];

  // Duplicate the logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16 md:py-20 flex items-center justify-center bg-black relative overflow-hidden px-8 md:px-16">
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Carousel Container with margins */}
      <div className="w-full max-w-7xl mx-auto overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex items-center"
            style={{ gap: '5rem' }} // Increased gap from 4rem to 5rem for more even spacing
            animate={{
              x: [0, -(280 * logos.length)], // 200px logo width + 80px gap (5rem)
            }}
            transition={{
              x: {
                duration: logos.length * 3, // 3 seconds per logo
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 opacity-90 transition-opacity duration-300 relative"
                style={{ 
                  width: '200px', // Fixed width for consistent spacing
                  height: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={logo.url}
                  alt={logo.alt || logo.name}
                  className="max-h-[160px] w-auto object-contain transition-opacity duration-300"
                  style={{
                    filter: 'brightness(1.3) contrast(1.2)',
                    imageRendering: 'crisp-edges',
                    transform: logo.scale ? `scale(${logo.scale})` : 'scale(1)'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};