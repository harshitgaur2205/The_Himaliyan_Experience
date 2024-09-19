"use client";
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
// import { ReactLenis } from "lenis/dist/lenis-react";     # I am not able to import this uncomment this..
// import { ReactLenis } from '@studio-freight/lenis';
// import * as Lenis from '@studio-freight/lenis';
// console.log(Lenis);


import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

// Main Component combining both Hero and Design Process
const page = () => {
  return (
    // <ReactLenis
    //   root
    //   options={{
    //     lerp: 0.50,
    //   }}
    // >
      <div className="bg-[#DDB685] relative">
        {/* Hero Section */}
        <SmoothScrollHero />
        {/* Design Process Section */}
        <DesignProcess />
      </div>
    // </ReactLenis>
  );
};

// SECTION_HEIGHT constant for hero animations
const SECTION_HEIGHT = 1500;

// Hero Section Component
const SmoothScrollHero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Centered Heading with Fade-out effect */}
      <FadingHeading />

      {/* Parallax Images specific to the hero section */}
      <CenterImage />
      <ParallaxImagesHero />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

// Fading Heading Component
const FadingHeading = () => {
  const ref = useRef(null);

  // Get the scroll progress and use it to adjust opacity
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use the scroll progress to fade out the text
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 z-30 transform -translate-x-1/2 -translate-y-1/2"
      style={{ opacity }}
      ref={ref}
    >
      <h1 className="text-white text-5xl md:text-7xl font-bold">
        Our Design Process
      </h1>
    </motion.div>
  );
};

// Center Image Component with Scroll Effects (only for hero section)
const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

// Parallax Images Component for the Hero Section (specific images for hero)
const ParallaxImagesHero = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px] relative z-20">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
    </div>
  );
};

// Parallax Image Component
const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

// Steps array for the Design Process section (different images from hero section)
const steps = [
  { id: 1, title: "Site Plan", image: "https://via.placeholder.com/600x400" },
  { id: 2, title: "Architectural Floor Plan", image: "https://via.placeholder.com/600x400" },
  { id: 3, title: "Interior Design", image: "https://via.placeholder.com/600x400" },
  { id: 4, title: "Landscape Design", image: "https://via.placeholder.com/600x400" },
  { id: 5, title: "Structural Design", image: "https://via.placeholder.com/600x400" },
];

// Design Process Section
const DesignProcess = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const processWrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = processWrapperRef.current;
      if (element) {
        const { top, height } = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollPosition = windowHeight - top;

        const scrolledPercentage = Math.min(
          (scrollPosition / (height + windowHeight)) * 100,
          100
        );
        setScrollProgress(scrolledPercentage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 bg-[#DDB685] text-white">
      <div ref={processWrapperRef} className="relative">
        {/* Progress Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 z-0"></div>
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 w-1 transition-all ease-in-out duration-500"
          style={{ height: `${scrollProgress}%` }}
        ></div>

        <div className="relative z-10 space-y-20">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24 ${
                index % 2 === 0 ? "lg:justify-items-end" : "lg:justify-items-start"
              }`}
            >
              <img
                src={step.image}
                alt={step.title}
                className="max-w-full rounded-md shadow-lg"
              />
              <h2 className="text-4xl font-bold">{step.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
