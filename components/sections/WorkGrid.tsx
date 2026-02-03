'use client';

import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { useState } from 'react';

interface WorkItem {
  id: number;
  title: string;
  youtubeId: string;
  services: string;
  customThumbnail?: string;
}

const workItems: WorkItem[] = [
  {
    id: 1,
    title: "Wiggly & Jiggly",
    youtubeId: "",
    services: "",
    customThumbnail: "/Fetch_in_Park_Enhanced.png"
  },
  {
    id: 2,
    title: "Little Omar's Big Adventures",
    youtubeId: "",
    services: "",
    customThumbnail: "/omar.jpeg"
  },
  {
    id: 3,
    title: "He-Man & The Masters Of The Universe",
    youtubeId: "7yeA7a0uS3A",
    services: "",
    customThumbnail: "/heman.jpg"
  },
  {
    id: 4,
    title: "Inspector Gadget",
    youtubeId: "rIc13VjeAw8",
    services: "",
    customThumbnail: "/inspectorgadget.jpg"
  },
  {
    id: 5,
    title: "X-Men",
    youtubeId: "sAkL2-vh2Sk",
    services: "",
    customThumbnail: "/xmen.jpg"
  },
  {
    id: 6,
    title: "Rainbow Brite",
    youtubeId: "uQSTSxqIyCg",
    services: "",
    customThumbnail: "/rainbowbrite.png"
  },
  {
    id: 7,
    title: "Mighty Morphin Power Rangers",
    youtubeId: "nHalaFUqnTI",
    services: "",
    customThumbnail: "/powerrangers.jpg"
  },
  {
    id: 8,
    title: "Spider-Man",
    youtubeId: "DZGN9fZvQhc",
    services: "",
    customThumbnail: "/spiderman.jpg"
  },
  {
    id: 9,
    title: "Digimon",
    youtubeId: "MJvpOrzcGbI",
    services: "",
    customThumbnail: "/digimon.jpg"
  },
  {
    id: 10,
    title: "Heathcliff",
    youtubeId: "9LLb8EBU9nQ",
    services: "",
    customThumbnail: "/heatcliff.jpg"
  },
  {
    id: 11,
    title: "Mysterious Cities of Gold",
    youtubeId: "_ycG-xe1uSM",
    services: "",
    customThumbnail: "/MYSTERIOUSCITIESOFGOLD.jpg"
  },
  {
    id: 12,
    title: "M.A.S.K.",
    youtubeId: "o2Z1yLO9C-Q",
    services: "",
    customThumbnail: "/mask.jpg"
  },
  {
    id: 13,
    title: "She-Ra",
    youtubeId: "wR65P73X5GI",
    services: "",
    customThumbnail: "/she-ra.jpg"
  },
  {
    id: 14,
    title: "Ulysses 31",
    youtubeId: "OZ4c1X5ene8",
    services: "",
    customThumbnail: "/ulysse.jpg"
  }
];

export const WorkGrid = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handleCardClick = (youtubeId: string) => {
    if (youtubeId) {
      setPlayingVideo(youtubeId);
    }
  };

  const closeVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <>
      <section className="min-h-screen relative py-20 px-8 overflow-hidden -mt-20">
        {/* Smooth Gradient Transitions */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black via-black/40 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
        
        {/* Cosmic Background - Extended beyond section boundaries */}
        <div className="absolute -top-32 left-0 right-0 bottom-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
          {/* Main Nebula Clusters */}
          <div className="absolute inset-0 opacity-80">
            {/* Central bright nebula cluster */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-purple-400/60 via-magenta-500/40 to-transparent rounded-full blur-3xl animate-pulse"></div>
            
            {/* Secondary nebula formations */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[300px] bg-gradient-radial from-violet-400/50 via-purple-600/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[350px] bg-gradient-radial from-fuchsia-400/45 via-purple-700/25 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
            
            {/* Smaller nebula wisps */}
            <div className="absolute top-1/2 right-1/3 w-[250px] h-[200px] bg-gradient-radial from-pink-400/40 via-purple-500/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[250px] bg-gradient-radial from-indigo-400/35 via-purple-600/15 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
          
          {/* Bright Star Clusters */}
          <div className="absolute inset-0">
            {[...Array(150)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
              />
            ))}
          </div>
          
          {/* Prominent Stars */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle shadow-white/50"
                style={{
                  width: `${Math.random() * 3 + 2}px`,
                  height: `${Math.random() * 3 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.8)`
                }}
              />
            ))}
          </div>
          
          {/* Bright Central Stars */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: `${Math.random() * 4 + 3}px`,
                  height: `${Math.random() * 4 + 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                  boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(255, 255, 255, 1), 0 0 ${Math.random() * 40 + 20}px rgba(147, 51, 234, 0.5)`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Black Tint Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Grid Container with more vertical space and smaller cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-24">
              {workItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`group cursor-pointer relative ${activeCard === item.id ? 'active' : ''}`}
                  onClick={() => handleCardClick(item.youtubeId)}
                  onMouseEnter={() => setActiveCard(item.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Card Container - Smaller size */}
                  <div className="relative max-w-xs mx-auto">
                    {/* Diagonal Title Overlay - Changes to white background with black text on hover/active */}
                    <div className="absolute -top-6 -left-6 z-20 transform -rotate-3 w-[calc(100%+3rem)]">
                      <div className={`bg-gray-600/40 backdrop-blur-sm px-6 py-4 rounded-md border border-gray-500/30 transition-all duration-300 ${
                        activeCard === item.id 
                          ? 'bg-white border-gray-300' 
                          : 'group-hover:bg-white group-hover:border-gray-300'
                      }`}>
                        <h3 className={`text-sm font-medium tracking-wide leading-tight whitespace-nowrap transition-colors duration-300 ${
                          activeCard === item.id 
                            ? 'text-black' 
                            : 'text-white group-hover:text-black'
                        }`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Image Container - 4:3 aspect ratio, smaller */}
                    <div className="relative overflow-hidden rounded-lg w-full aspect-[4/3] mb-4">
                      {/* YouTube Thumbnail - Zooms on hover/active but stays within card boundaries */}
                      <motion.div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${item.customThumbnail || `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`}')`
                        }}
                        animate={activeCard === item.id ? { scale: 1.1 } : { scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                      
                      {/* Hover Overlay with Play Button and Text */}
                      <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 flex flex-col items-center justify-center ${
                        activeCard === item.id 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        {/* Play Button - Only show for items with YouTube links */}
                        {item.youtubeId && (
                          <div className={`transition-transform duration-300 mb-3 ${
                            activeCard === item.id 
                              ? 'scale-100' 
                              : 'scale-0 group-hover:scale-100'
                          }`}>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                              <Play className="w-6 h-6 text-black ml-1" fill="black" />
                            </div>
                          </div>
                        )}
                        
                        {/* Text - Different for items with/without YouTube links */}
                        <div className={`transition-all duration-300 ${
                          activeCard === item.id 
                            ? 'translate-y-0 opacity-100' 
                            : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                        }`}>
                          <p className="text-white text-sm font-medium tracking-wide">
                            {item.youtubeId ? 'Watch Video' : 'Coming Soon'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Services Text - Hidden since services are empty */}
                    {item.services && (
                      <p className="text-gray-400 text-sm tracking-wide">
                        {item.services}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {playingVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <button
            onClick={closeVideo}
            className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors z-50"
            aria-label="Close video"
          >
            <X className="w-8 h-8" />
          </button>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg border-0"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};