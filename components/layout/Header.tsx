'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/store/AuthContext';
import { useLocalization } from '@/store/LocalizationContext';
import { 
  HomeIcon, 
  UserIcon, 
  BellIcon, 
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { locale, setLocale, currency } = useLocalization();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-surface shadow-elevation-1 border-b border-border">
      <div className="container-section">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg-primary rounded-lg flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-sm">D2B</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Design2Build.Pro
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language/Currency Selector */}
            <div className="hidden sm:flex items-center space-x-2">
              <GlobeAltIcon className="h-5 w-5 text-foreground-tertiary" />
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="text-sm border-none bg-transparent text-foreground-secondary focus:outline-none focus:ring-0 focus-ring"
              >
                <option value="en">EN</option>
                <option value="fil">FIL</option>
              </select>
              <span className="text-sm text-foreground-tertiary">{currency}</span>
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-foreground-tertiary hover:text-foreground transition-colors duration-200 focus-ring">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-error-500 rounded-full"></span>
                </button>
                
                <div className="relative">
                  <button className="flex items-center space-x-2 text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200 focus-ring">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-primary-600" />
                      </div>
                    )}
                    <span className="hidden sm:block">{user?.name}</span>
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-sm text-foreground-tertiary hover:text-foreground transition-colors duration-200 focus-ring"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="nav-link px-3 py-2 text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground-tertiary hover:text-foreground transition-colors duration-200 focus-ring"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface border-t border-border">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-4 space-y-2">
                <Link
                  href="/auth/login"
                  className="nav-link block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary block text-center mx-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 