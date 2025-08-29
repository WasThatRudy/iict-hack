"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/public/images/shortlogo.png";

const navLinks = [
  { title: "Home", href: "#" },
  { title: "Themes", href: "#themes" },
  { title: "Timeline", href: "#timeline" },
  { title: "Sponsors", href: "#sponsors" },
  { title: "FAQ", href: "#faq" },
];

export default function AnimatedNavbar() {
  // --- Step 1: Call ALL hooks unconditionally at the top ---
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to track register button clicks
  // const trackClick = async (buttonType: string) => {
  //   try {
  //     await fetch('/api/clickTracking', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         buttonType,
  //         userAgent: navigator.userAgent,
  //         referrer: document.referrer,
  //       }),
  //     });
  //   } catch (error) {
  //     console.error('Failed to track click:', error);
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- Step 2: Place the conditional return *after* all hooks ---
  // This ensures hook order is the same on every render.
  if (pathname === "/register") {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navVariants = {
    top: {
      backgroundColor: "rgba(255, 255, 255, 1)", // Solid white background
      top: 0,
      width: "100%",
      borderRadius: "0px",
      marginTop: "0px",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent white
      backdropFilter: "blur(10px)",
      top: 0,
      width: "95%",
      borderRadius: "9999px", // Full capsule
      marginTop: "16px",
      border: "1px solid rgba(229, 231, 235, 0.5)", // Light gray border
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
  };

  return (
    <>
      <motion.nav
        className="fixed left-1/2 -translate-x-1/2 z-50 flex justify-between items-center px-6 py-4"
        variants={navVariants}
        initial="top"
        animate={scrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          {/* Constraining image size with Tailwind classes for better control */}
          <Image src={logo} alt="Logo" className="h-14 w-auto" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="font-semibold text-[#C83DAD] hover:text-[#A12A89] transition-colors duration-300"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Register Button */}
        <div className="hidden md:block">
          <motion.button
            className="px-6 py-2 text-white/60 font-bold text-base rounded-full transition-all duration-300
                          bg-[#C83DAD]/50 shadow-lg shadow-[#C83DAD]/20
                          cursor-not-allowed"
            disabled
          >
            Registration Closed
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={toggleMenu}
            className="text-[#C83DAD] p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden">
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-white text-3xl font-semibold hover:text-[#C83DAD] transition-colors"
                >
                  {link.title}
                </a>
              ))}
              <motion.button
                className="px-8 py-4 text-white/60 font-bold text-xl rounded-full transition-all duration-300 mt-8
                          bg-[#C83DAD]/50 shadow-lg shadow-[#C83DAD]/20
                          cursor-not-allowed"
                disabled
              >
                Registration Closed
              </motion.button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
