'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50"></div>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5e3c' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="container-section section-padding relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-700 border border-primary-200">
                🇵🇭 Made for the Philippines
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6"
            >
              Design Meets
              <span className="gradient-text-primary"> Construction</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-foreground-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Connect with designers, contractors, and vendors in the Philippines. 
              AI-powered tools, project management, and marketplace solutions for the modern construction industry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
                Get Started Free
              </Link>
              <Link href="/demo" className="btn-outline text-lg px-8 py-4">
                Watch Demo
              </Link>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <motion.div 
                className="card text-center hover:shadow-strong transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Design Tools</h3>
                <p className="text-foreground-secondary">Generate moodboards, render sketches, and visualize concepts instantly</p>
              </motion.div>
              
              <motion.div 
                className="card text-center hover:shadow-strong transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Project Management</h3>
                <p className="text-foreground-secondary">Track progress, manage budgets, and coordinate teams efficiently</p>
              </motion.div>
              
              <motion.div 
                className="card text-center hover:shadow-strong transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Marketplace</h3>
                <p className="text-foreground-secondary">Source materials, hire professionals, and discover new products</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Philippine Focus Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235c4033' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="container-section py-16 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-gradient-philippine rounded-full flex items-center justify-center mx-auto shadow-soft">
                <span className="text-3xl">🇵🇭</span>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl font-display font-bold text-foreground mb-4"
            >
              Built for the Philippine Market
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-foreground-secondary mb-8 max-w-2xl mx-auto"
            >
              Local payment methods, BIR compliance, and Filipino language support. 
              Launching first in the Philippines, expanding globally.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-foreground-secondary"
            >
              <span className="card-glass px-4 py-2 rounded-full">PayMongo Integration</span>
              <span className="card-glass px-4 py-2 rounded-full">Xendit Support</span>
              <span className="card-glass px-4 py-2 rounded-full">BIR Compliant</span>
              <span className="card-glass px-4 py-2 rounded-full">Data Privacy Act</span>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-primary">500+</div>
                <div className="text-sm text-foreground-secondary">Designers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-secondary">1000+</div>
                <div className="text-sm text-foreground-secondary">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-accent">₱50M+</div>
                <div className="text-sm text-foreground-secondary">Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-philippine-gold">98%</div>
                <div className="text-sm text-foreground-secondary">Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 