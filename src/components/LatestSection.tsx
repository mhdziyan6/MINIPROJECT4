import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroParallax } from "./ui/hero-parallax";

const events = [
  {
    title: "Corporate Gala",
    thumbnail:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
    category: "Corporate",
  },
  {
    title: "Wedding Celebration",
    thumbnail:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    category: "Wedding",
  },
  {
    title: "Tech Conference",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070",
    category: "Conference",
  },
  {
    title: "Fashion Show",
    thumbnail:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2076",
    category: "Fashion",
  },
  {
    title: "Music Festival",
    thumbnail:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070",
    category: "Festival",
  },
  {
    title: "Product Launch",
    thumbnail:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012",
    category: "Launch",
  },
];

const LatestSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.8, 0.9], [1, 0.97]);

  return (
    <section 
      ref={sectionRef} 
      id="latest-works" 
      className="relative w-full bg-black"
    >
      <motion.div
        style={{ opacity }}
        className="sticky top-[25vh] md:top-[30vh] z-[40] text-left max-w-4xl mx-auto px-4 md:px-6 mb-10 md:mb-20"
      >
        <motion.h2 
          style={{ scale }}
          className="text-4xl md:text-6xl font-bold mb-4 md:mb-6"
        >
          Latest Work
        </motion.h2>
        <motion.p 
          style={{ scale }}
          className="text-lg md:text-2xl text-gray-300"
        >
          Explore our portfolio of successful events that showcase our creativity and expertise.
        </motion.p>
      </motion.div>

      <div className="relative z-10">
        <HeroParallax products={events} />
      </div>
    </section>
  );
};

export default LatestSection;