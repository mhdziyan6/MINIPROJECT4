import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraBackground } from './ui/aurora-background';
import { FlipWords } from './ui/flip-words';
import { Link as ScrollLink } from 'react-scroll';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const words = [
    "Elevating Events",
    "Creating Memories",
    "Crafting Experiences",
    "Inspiring Moments"
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AuroraBackground className="min-h-[100svh] md:min-h-screen">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 text-center">
        <AnimatePresence>
          {isVisible && (
            <>
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white"
              >
                E&S DECORATIONS
              </motion.h1>
              <div className="flex flex-col sm:flex-row items-center justify-center text-xl sm:text-2xl mb-8 sm:mb-10 md:mb-12 text-white gap-2">
                <div className="min-w-[270px] text-center flex-shrink-0">
                  <FlipWords 
                    words={words} 
                    duration={2000}
                    className="text-white font-light"
                  />
                </div>
              </div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <ScrollLink to="latest-works" smooth={true} duration={500}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto"
                  >
                    Explore Our Work
                  </motion.button>
                </ScrollLink>
                <ScrollLink to="contact-us" smooth={true} duration={500}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto"
                  >
                    Contact Us
                  </motion.button>
                </ScrollLink>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:flex"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
    </AuroraBackground>
  );
};

export default HeroSection;