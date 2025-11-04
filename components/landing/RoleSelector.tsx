'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UserRole } from '@/types';
import { 
  UserIcon,
  PaintBrushIcon,
  BuildingStorefrontIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

const roles = [
  {
    id: 'client' as UserRole,
    title: 'Client',
    description: 'I need design services for my project',
    icon: UserIcon,
    color: 'primary',
    features: ['Create projects', 'Hire designers', 'Track progress', 'Manage budget'],
  },
  {
    id: 'designer' as UserRole,
    title: 'Designer',
    description: 'I provide design services and creative solutions',
    icon: PaintBrushIcon,
    color: 'secondary',
    features: ['Showcase portfolio', 'Get projects', 'AI design tools', 'Client management'],
  },
  {
    id: 'vendor' as UserRole,
    title: 'Vendor',
    description: 'I supply materials and products for design projects',
    icon: BuildingStorefrontIcon,
    color: 'accent',
    features: ['List products', 'Manage inventory', 'Process orders', 'Track sales'],
  },
  {
    id: 'contractor' as UserRole,
    title: 'Contractor',
    description: 'I provide project execution and implementation services',
    icon: WrenchScrewdriverIcon,
    color: 'primary',
    features: ['Bid on projects', 'Manage teams', 'Track progress', 'Client communication'],
  },
];

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-100',
      text: 'text-primary-700',
      border: 'border-primary-200',
      hover: 'hover:bg-primary-50'
    },
    secondary: {
      bg: 'bg-secondary-100',
      text: 'text-secondary-700',
      border: 'border-secondary-200',
      hover: 'hover:bg-secondary-50'
    },
    accent: {
      bg: 'bg-accent-100',
      text: 'text-accent-700',
      border: 'border-accent-200',
      hover: 'hover:bg-accent-50'
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#faf8f6] overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header - Mobile First */}
        <div className="px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-2 sm:mb-3">
              Choose Your Role
            </h1>
            <p className="text-sm sm:text-base text-foreground-secondary">
              Select how you'll use Design2Build.Pro
            </p>
          </motion.div>
        </div>

        {/* Roles Grid - Mobile First */}
        <div className="flex-1 px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {roles.map((role, index) => {
                const Icon = role.icon;
                const colors = colorClasses[role.color as keyof typeof colorClasses];
                
                return (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onRoleSelect(role.id)}
                    className={`bg-white rounded-2xl p-6 sm:p-8 cursor-pointer group transition-all duration-300 shadow-soft hover:shadow-medium border border-border-secondary ${colors.hover}`}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colors.text}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                      {role.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm sm:text-base text-foreground-secondary mb-4">
                      {role.description}
                    </p>

                    {/* Features - Show on larger screens */}
                    <ul className="hidden sm:block space-y-2 mb-6">
                      {role.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-xs sm:text-sm text-foreground-secondary"
                        >
                          <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full mr-2`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Arrow indicator */}
                    <div className="flex items-center text-primary-600 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">Select</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="px-4 sm:px-6 pb-6 sm:pb-8"
        >
          <div className="text-center text-foreground-tertiary text-xs sm:text-sm max-w-2xl mx-auto">
            <p>You can change your role later in your account settings</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
