"use client"
import React from "react";
import { motion } from "framer-motion";

export const RevealLinks = () => {
  return (
    <section className="grid  gap-12  px-8 py-24 text-black">
      <div className="design_process" style={{display: "flex" , gap: 20}}>
        {/* <FlipLink href="#">Our</FlipLink> */}
        <FlipLink href="#">Journey</FlipLink>
      </div>
      
      <div className="design_process" style={{display: "flex" , gap: 20}}>
        {/* <FlipLink href="#">DESIGN</FlipLink> */}
        <FlipLink href="#">PROCESS</FlipLink>
      </div>
      <FlipLink href="#">Projects</FlipLink>
      
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="links relative overflow-hidden whitespace-nowrap text-5xl font-purple uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};