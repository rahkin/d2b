'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserRole } from '@/types';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

const roles = [
  {
    id: 'client' as UserRole,
    title: 'Client',
    description: 'I need design and construction services for my project',
    color: 'from-blue-500 to-blue-600',
    features: ['Create projects', 'Hire professionals', 'Track progress', 'Manage budget'],
  },
  {
    id: 'designer' as UserRole,
    title: 'Designer',
    description: 'I provide design services and creative solutions',
    color: 'from-purple-500 to-purple-600',
    features: ['Showcase portfolio', 'Get projects', 'AI design tools', 'Client management'],
  },
  {
    id: 'vendor' as UserRole,
    title: 'Vendor',
    description: 'I supply materials and products for construction',
    color: 'from-green-500 to-green-600',
    features: ['List products', 'Manage inventory', 'Process orders', 'Track sales'],
  },
  {
    id: 'contractor' as UserRole,
    title: 'Contractor',
    description: 'I provide construction and building services',
    color: 'from-orange-500 to-orange-600',
    features: ['Bid on projects', 'Manage teams', 'Track progress', 'Client communication'],
  },
];

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Select how you'll use Design2Build.Pro to connect with the design and construction community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="card cursor-pointer group hover:shadow-lg transition-all duration-300"
              onClick={() => onRoleSelect(role.id)}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-white font-bold text-xl">{role.title[0]}</span>
              </div>

              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {role.title}
              </h3>
              <p className="text-neutral-600 text-sm mb-4">
                {role.description}
              </p>

              <ul className="space-y-2">
                {role.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.05 }}
                    className="flex items-center text-sm text-neutral-600"
                  >
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className="mt-6"
              >
                <button className="w-full btn-primary text-sm">
                  Select {role.title}
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-neutral-500 text-sm"
        >
          <p>You can change your role later in your account settings</p>
          <p className="mt-2">🇵🇭 Optimized for Philippine market • Multi-currency support</p>
        </motion.div>
      </div>
    </div>
  );
} 