import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Timeline } from './ui/timeline';
import { BackgroundBeams } from './ui/background-beams';

const timelineData = [
  {
    title: "2024",
    content: (
      <div>
        <p className="text-gray-300 text-sm md:text-base font-normal mb-8">
          Expanding our horizons with international events and launching our innovative virtual event platform.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          <div className="image-wrapper rounded-lg h-20 md:h-44 lg:h-60">
            <img
              src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062"
              alt="Virtual Event Platform"
              loading="lazy"
            />
          </div>
          <div className="image-wrapper rounded-lg h-20 md:h-44 lg:h-60">
            <img
              src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070"
              alt="International Events"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="text-gray-300 text-sm md:text-base font-normal mb-8">
          A year of remarkable growth and innovation in event management:
        </p>
        <div className="mb-8">
          <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base mb-2">
            ✨ Successfully managed over 200 corporate events
          </div>
          <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base mb-2">
            ✨ Launched sustainable event initiatives
          </div>
          <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base mb-2">
            ✨ Introduced AI-powered event planning tools
          </div>
          <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">
            ✨ Expanded our team to 50+ event professionals
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          <div className="image-wrapper rounded-lg h-20 md:h-44 lg:h-60">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"
              alt="Corporate Events"
              loading="lazy"
            />
          </div>
          <div className="image-wrapper rounded-lg h-20 md:h-44 lg:h-60">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"
              alt="Tech Innovation"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="text-gray-300 text-sm md:text-base font-normal mb-8">
          Our foundation year, where we set out to revolutionize the event management industry:
        </p>
        <div className="mb-8">
          <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base mb-2">
            🌟 Established E&S Website
          </div>
          <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base mb-2">
            🌟 First major corporate partnership
          </div>
          <div className="flex gap-2 items-center text-gray-300 text-sm md:text-base">
            🌟 Award for Most Innovative Event Startup
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          <div className="image-wrapper rounded-lg h-20 md:h-44 lg:h-60">
            <img
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070"
              alt="Company Launch"
              loading="lazy"
            />
          </div>
          <div className="image-wrapper rounded-lg h-20 md:h-44 lg:h-60">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070"
              alt="First Event"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    ),
  }
];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      id="about-us" 
      className="relative bg-neutral-950 min-h-screen flex items-center pt-32"
    >
      <BackgroundBeams className="opacity-20" />
      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            From our humble beginnings to becoming a leading event management company, 
            here's how we've been transforming visions into unforgettable experiences.
          </p>
        </motion.div>
        <Timeline data={timelineData} />
      </div>
    </section>
  );
};

export default AboutSection;