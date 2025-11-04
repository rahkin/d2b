'use client';

import { useState } from 'react';
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
    // Redirect to sign up with selected role
    window.location.href = `/auth/register?role=${role}`;
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showRoleSelector) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  return <Hero />;
} 