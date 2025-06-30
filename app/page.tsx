'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SplashScreen } from '@/components/landing/SplashScreen';
import { RoleSelector } from '@/components/landing/RoleSelector';
import { Hero } from '@/components/landing/Hero';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowRoleSelector(true);
  };

  const handleRoleSelect = (role: string) => {
    // Handle role selection - redirect to appropriate onboarding or dashboard
    console.log('Selected role:', role);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showRoleSelector) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  return <Hero />;
} 