"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import defaults from "@/public/images/default.svg";
import variant from "@/public/images/variant.svg";
import { useRouter } from "next/navigation";

// Animation variants removed for better performance on slow systems

export function Hero() {
  // State to manage the hover effect for the logo
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamName, setTeamName] = useState("");
  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    const storedName = localStorage.getItem('team_name') || "";
    setTeamName(storedName);
  }, []);

  // Listen for cross-tab updates
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') {
        setIsLoggedIn(!!e.newValue);
      }
      if (e.key === 'team_name') {
        setTeamName(e.newValue || "");
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Listen for explicit same-tab auth updates
  useEffect(() => {
    const handleAuthUpdated = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      const storedName = localStorage.getItem('team_name') || "";
      setTeamName(storedName);
    };
    window.addEventListener('auth-updated', handleAuthUpdated as EventListener);
    return () => window.removeEventListener('auth-updated', handleAuthUpdated as EventListener);
  }, []);

  return (
    // Set background to black and default text to white
    <div className="flex items-center justify-center -mt-16 min-h-screen text-white px-4 sm:px-6 lg:px-8">
      <div className="container h-full relative z-10">
        <div className="text-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center items-center">
            {/* Logo container with state-based hover events */}
            <div
              className="relative w-[60rem] -mb-10"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              {/* Default Logo Image */}
              <Image
                src={defaults}
                alt="SegFault"
                className="w-full h-auto transition-opacity duration-500 ease-in-out"
                style={{ opacity: isLogoHovered ? 0 : 1 }}
              />
              {/* Variant Logo Image (positioned absolutely on top) */}
              <Image
                src={variant}
                alt="SegFault Variant"
                className="w-full h-auto absolute top-0 left-0 transition-opacity duration-500 ease-in-out"
                style={{ opacity: isLogoHovered ? 1 : 0 }}
              />
            </div>
          </div>

          {/* Slogan with updated accent color */}
          <div className="mt-10 sm:mt-8 md:mt-10">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#C83DAD] mb-6 sm:mb-8 md:mb-10 font-corsiva italic px-4 leading-tight">
              Where Impossible is Just an Error Code.
            </h1>
            {/* IICT note (placed above the register button) */}
            <p className="mx-auto max-w-3xl text-white/90 text-sm sm:text-base md:text-lg leading-relaxed px-4">
              The <span className="font-semibold">SegFault Hackathon</span> is
              co-located and organized as a part of the
              <span className="font-semibold">
                {" "}
                Innovations In Compiler Technology (IICT)
              </span>{" "}
              Workshop. Check out the{" "}
              <a
                href="https://compilertech.org/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#F481C9] underline underline-offset-4 hover:text-[#DE5FB9]"
              >
                IICT Website here
              </a>
              .
            </p>
          </div>

          {/* Register/Login/Dashboard Button */}
          <div className="mt-6 sm:mt-8 md:mt-10 px-4">
            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-base sm:text-lg rounded-full transition-all duration-300 bg-[#C83DAD] shadow-lg shadow-[#C83DAD]/20 hover:bg-[#A12A89] hover:shadow-[#A12A89]/20 cursor-pointer w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
              onClick={() => router.push(isLoggedIn ? '/dashboard' : '/login')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoggedIn ? 'Dashboard' : 'Login'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
