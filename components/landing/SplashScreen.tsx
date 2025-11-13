'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#faf8f6] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D2B</span>
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-foreground">
              Design2Build.Pro
            </span>
          </div>

          {/* Right: Sign In + Get Started */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-foreground text-sm font-medium hidden sm:block hover:text-foreground-secondary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hidden sm:block"
            >
              Get Started
            </Link>
            <button 
              className="p-2 text-foreground hover:bg-neutral-100 rounded-lg transition-colors sm:hidden"
              aria-label="Menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center w-full max-w-md">
          {/* Elegant Logo in Oval - Matches Figma Design */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 sm:mb-12"
        >
            <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Oval background - light beige/cream matching Figma */}
              <div className="absolute inset-0 bg-[#f5f0eb] rounded-full shadow-soft" />
              
              {/* Logo Image from Figma - using the entire image as it contains the logo */}
              <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                <Image
                  src="/api/figma/images/80878c1df4aee5873d374a4af9fc84e7d2ab08a6"
                  alt="D2B Logo"
                  fill
                  className="object-cover"
                  style={{
                    objectPosition: 'center center',
                  }}
                  priority
                  unoptimized
                />
              </div>
          </div>
        </motion.div>

          {/* Loading Dots - Subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-2 mb-6"
        >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary-400 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
        </motion.div>

          {/* Philippine Flag Indicator - Subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-foreground-secondary text-xs sm:text-sm"
        >
          🇵🇭 Launching in the Philippines
        </motion.div>
      </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 py-4 flex-shrink-0 border-t border-border-secondary bg-white/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">D2B</span>
          </div>
          <span className="font-display font-bold text-sm text-foreground">
            Design2Build.Pro
          </span>
        </div>
      </footer>
    </div>
  );
} 
