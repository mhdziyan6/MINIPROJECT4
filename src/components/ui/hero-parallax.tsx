import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    thumbnail: string;
    category: string;
  }[];
}) => {
  const firstRow = products.slice(0, 2);
  const secondRow = products.slice(2, 4);
  const thirdRow = products.slice(4, 6);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 400]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -400]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-200, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className={cn(
        "min-h-[150vh] py-20 md:py-40 overflow-hidden antialiased relative flex flex-col self-auto",
        "[perspective:1000px] [transform-style:preserve-3d]"
      )}
    >
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative max-w-7xl mx-auto px-4 md:px-6"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-20 mb-10 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-10 md:mb-20 space-x-4 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    thumbnail: string;
    category: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-48 sm:h-64 md:h-96 w-[240px] sm:w-[320px] md:w-[480px] relative flex-shrink-0"
    >
      <div
        className="block group-hover/product:shadow-2xl w-full h-full"
      >
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/product:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 text-left opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1">{product.title}</h2>
            <span className="text-xs sm:text-sm text-gray-300">{product.category}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};