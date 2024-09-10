"use client";
import { SiTwitter } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";
import { SiInstagram } from "react-icons/si";
import { SiYoutube } from "react-icons/si";
import { useState } from "react";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowRight} from "react-icons/fi";
import { RevealLinks } from "./RevealLinks";

const LINKS = [
  {
    title: "About Us",
    href: "#",
  },
  {
    title: "Design Process",
    href: "#",
  },
  {
    title: "Projects",
    href: "#",
  },
  {
    title: "Explore Us",
    href: "#",
  },
];

const SOCIAL_CTAS = [
  {
    Icon: SiTwitter,
    href: "#",
  },
  {
    Icon: SiInstagram,
    href: "#",
  },
  {
    Icon: SiLinkedin,
    href: "#",
  },
  {
    Icon: SiYoutube,
    href: "#",
  },
];

export const Navbar = () => {
  return (
    <div className="bg-neutral-100">
      <Nav  />
    </div>
  );
};

const Nav = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <HamburgerButton active={active} setActive={setActive} />
      <AnimatePresence>{active && <LinksOverlay />}</AnimatePresence>
    </>
  );
};

const LinksOverlay = () => {
  return (
    <nav className="nav fixed right-4 top-4 z-40 h-[calc(100vh_-32px)] w-[calc(100%-_32px)] overflow-hidden">
      <Logo />
      {/* <LinksContainer /> */} 
      <RevealLinks />
      <FooterCTAs />
    </nav>
  );
};

const LinksContainer = () => {
  return (
    <motion.div className="space-y-4 p-12 pl-4 md:pl-20">
      {LINKS.map((l, idx) => {
        return (
          <NavLink key={l.title} href={l.href} idx={idx}>
            {l.title}
          </NavLink>
        );
      })}
    </motion.div>
  );
};

// const NavLink = ({ children, href, idx }) => {
//   return (
//     <motion.a
//       initial={{ opacity: 0, y: -8 }}
//       animate={{
//         opacity: 1,
//         y: 0,
//         transition: {
//           delay: 0.75 + idx * 0.125,
//           duration: 0.5,
//           ease: "easeInOut",
//         },
//       }}
//       exit={{ opacity: 0, y: -8 }}
//       href={href}
//       className="nav block text-5xl font-semibold text-violet-400 transition-colors hover:text-violet-50 md:text-7xl"
//     >
//       {children}
//     </motion.a>
//   );
// };

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.a
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, y: -12 }}
      href="#" // Link to navigate
      className="grid h-20 w-20 place-content-center rounded-br-xl rounded-tl-xl bg-white transition-colors hover:bg-violet-50"
    >
       <img src="/logo.png" />
    </motion.a>
  );
};

const HamburgerButton = ({ active, setActive }) => { // use to change the colour of the background
  return (
    <>
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        variants={UNDERLAY_VARIANTS}
        style={{ top: 16, right: 16 }}
        className="nav fixed z-10 rounded-xl  shadow-lg "
      />

      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className={`group fixed right-4 top-4 z-50 h-20 w-20 bg-white/0 transition-all hover:bg-white/20 ${
          active ? "rounded-bl-xl rounded-tr-xl" : "rounded-xl"
        }`}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block h-1 w-10 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block h-1 w-10 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block h-1 w-5 bg-white"
          style={{ x: "-50%", y: "50%" }}
        />
      </motion.button>
    </>
  );
};

const FooterCTAs = () => {
  return (
    <>
            <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.125,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, y: 8 }}
        className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-violet-700 px-3 py-3 text-4xl uppercase text-violet-200 transition-colors hover:bg-white hover:text-violet-600 md:bottom-4 md:right-4 md:px-6 md:text-2xl"
      >
        <span className="hidden md:block">contact us</span> <FiArrowRight />
      </motion.button>
      </>
  );
};
 

const UNDERLAY_VARIANTS = {
  open: {
    width: "calc(100% - 32px)",
    height: "calc(100vh - 32px)",
    transition: { type: "spring", mass: 3, stiffness: 400, damping: 50 },
  },
  closed: {
    width: "80px",
    height: "80px",
    transition: {
      delay: 0.75,
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  },
};

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};
