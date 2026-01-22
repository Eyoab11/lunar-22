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
    title: "He-Man & The Masters Of The Universe",
    youtubeId: "7yeA7a0uS3A",
    services: "",
    customThumbnail: "/heman.jpg"
  },
  {
    id: 2,
    title: "Inspector Gadget",
    youtubeId: "rIc13VjeAw8",
    services: "",
    customThumbnail: "/inspectorgadget.jpg"
  },
  {
    id: 3,
    title: "X-Men",
    youtubeId: "sAkL2-vh2Sk",
    services: "",
    customThumbnail: "/xmen.jpg"
  },
  {
    id: 4,
    title: "Rainbow Brite",
    youtubeId: "uQSTSxqIyCg",
    services: "",
    customThumbnail: "/rainbowbrite.png"
  },
  {
    id: 5,
    title: "Mighty Morphin Power Rangers",
    youtubeId: "nHalaFUqnTI",
    services: "",
    customThumbnail: "/powerrangers.jpg"
  },
  {
    id: 6,
    title: "Spider-Man",
    youtubeId: "DZGN9fZvQhc",
    services: "",
    customThumbnail: "/spiderman.jpg"
  },
  {
    id: 7,
    title: "Digimon",
    youtubeId: "MJvpOrzcGbI",
    services: "",
    customThumbnail: "/digimon.jpg"
  },
  {
    id: 8,
    title: "Heathcliff",
    youtubeId: "9LLb8EBU9nQ",
    services: "",
    customThumbnail: "/heatcliff.jpg"
  },
  {
    id: 9,
    title: "Mysterious Cities of Gold",
    youtubeId: "_ycG-xe1uSM",
    services: "",
    customThumbnail: "/MYSTERIOUSCITIESOFGOLD.jpg"
  },
  {
    id: 10,
    title: "M.A.S.K.",
    youtubeId: "o2Z1yLO9C-Q",
    services: "",
    customThumbnail: "/mask.jpg"
  },
  {
    id: 11,
    title: "She-Ra",
    youtubeId: "wR65P73X5GI",
    services: "",
    customThumbnail: "/she-ra.jpg"
  },
  {
    id: 12,
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
    setPlayingVideo(youtubeId);
  };

  const closeVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <>
      <section className="min-h-screen bg-black py-20 px-8">
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
                      {/* Play Button */}
                      <div className={`transition-transform duration-300 mb-3 ${
                        activeCard === item.id 
                          ? 'scale-100' 
                          : 'scale-0 group-hover:scale-100'
                      }`}>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                          <Play className="w-6 h-6 text-black ml-1" fill="black" />
                        </div>
                      </div>
                      
                      {/* Play on YouTube Text */}
                      <div className={`transition-all duration-300 ${
                        activeCard === item.id 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                      }`}>
                        <p className="text-white text-sm font-medium tracking-wide">
                          Watch Video
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
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};