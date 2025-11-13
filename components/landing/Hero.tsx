'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { 
  SparklesIcon,
  BuildingOfficeIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export function Hero() {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI Design Tools',
      description: 'Generate moodboards, render sketches, and visualize concepts instantly with AI-powered design assistance',
      color: 'primary'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Project Management',
      description: 'Track progress, manage budgets, and coordinate teams efficiently with real-time collaboration',
      color: 'secondary'
    },
    {
      icon: ShoppingCartIcon,
      title: 'Marketplace',
      description: 'Source materials, hire professionals, and discover new products all in one place',
      color: 'accent'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics & Insights',
      description: 'Make data-driven decisions with comprehensive project analytics and reporting',
      color: 'primary'
    }
  ];

  const benefits = [
    'BIR Compliant Invoicing',
    'Multi-currency Support (PHP, USD, SGD)',
    'Philippine Data Privacy Act Compliant',
    '24/7 Customer Support',
    'Secure Payment Processing',
    'Real-time Collaboration'
  ];

  return (
    <StandardLayout>
      <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5e3c' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="container-section section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-700 border border-primary-200 shadow-soft">
                <span>🇵🇭</span>
                <span>Made for the Philippines</span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight"
            >
              Design Meets
              <br />
              <span className="gradient-text-primary">Innovation</span>
            </motion.h1>
            
            {/* Subheading with Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-foreground-secondary mb-4 max-w-3xl mx-auto leading-relaxed"
            >
              Connect with designers and vendors in the Philippines. 
              AI-powered tools, project management, and marketplace solutions for the modern design industry.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl font-medium text-primary-700 italic mb-10"
            >
              Empower the process, not just the output.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link 
                href="/auth/register" 
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/demo" 
                className="btn-outline text-lg px-8 py-4"
              >
                Watch Demo
              </Link>
            </motion.div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <CheckCircleIcon className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-surface">
        <div className="container-section">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4"
            >
              Everything You Need
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-foreground-secondary max-w-2xl mx-auto"
            >
              Powerful tools designed for designers, contractors, and vendors working in the Philippines
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                primary: 'bg-primary-100 text-primary-700',
                secondary: 'bg-secondary-100 text-secondary-700',
                accent: 'bg-accent-100 text-accent-700'
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center hover:shadow-strong transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philippine Market Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235c4033' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="container-section relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-gradient-philippine rounded-full flex items-center justify-center mx-auto shadow-medium">
                <span className="text-4xl">🇵🇭</span>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6"
            >
              Built for the Philippine Market
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-foreground-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Local payment methods, BIR compliance, and Filipino language support. 
              Launching first in the Philippines, expanding globally.
            </motion.p>

            {/* Integration Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {['PayMongo Integration', 'Xendit Support', 'BIR Compliant', 'Data Privacy Act'].map((badge, index) => (
                <span 
                  key={index}
                  className="card-glass px-6 py-3 rounded-full text-sm font-medium text-foreground"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: '500+', label: 'Designers', gradientClass: 'gradient-text-primary' },
                { value: '1000+', label: 'Projects', gradientClass: 'gradient-text-secondary' },
                { value: '₱50M+', label: 'Value', gradientClass: 'gradient-text-accent' },
                { value: '98%', label: 'Satisfaction', gradientClass: 'gradient-text-primary' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold ${stat.gradientClass} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-surface">
        <div className="container-section">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6"
            >
              Ready to Transform Your Design Workflow?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-foreground-secondary mb-8"
            >
              Join hundreds of designers, contractors, and vendors already using Design2Build.Pro
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="/auth/register" 
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
              >
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="btn-outline text-lg px-8 py-4"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </StandardLayout>
  );
}
