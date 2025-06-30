'use client';

import React from 'react';

interface DesignerSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: '📊',
    description: 'Project summary and analytics'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '🏗️',
    description: 'Manage your design projects'
  },
  {
    id: 'ai-tools',
    label: 'AI Tools',
    icon: '🤖',
    description: 'Moodboard creator and sketch renderer'
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: '🎨',
    description: 'Showcase your work'
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: '👥',
    description: 'Client management and communication'
  },
  {
    id: 'earnings',
    label: 'Earnings',
    icon: '💰',
    description: 'Track your income and payments'
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: '🛠️',
    description: 'Design tools and resources'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    description: 'Account and preferences'
  }
];

export function DesignerSidebar({ activeTab, onTabChange }: DesignerSidebarProps) {
  return (
    <div className="w-64 bg-surface shadow-medium border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 gradient-bg-primary rounded-lg flex items-center justify-center shadow-soft">
            <span className="text-white font-bold text-sm">D2B</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            Designer
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 group focus-ring ${
              activeTab === item.id
                ? 'bg-primary-50 text-primary-700 border border-primary-200 shadow-soft'
                : 'text-foreground-secondary hover:bg-neutral-50 hover:text-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className={`text-xs ${
                  activeTab === item.id ? 'text-primary-600' : 'text-foreground-tertiary'
                }`}>
                  {item.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <button className="w-full btn-primary text-sm py-2">
          + New Project
        </button>
        <div className="mt-3 text-xs text-foreground-tertiary text-center">
          🇵🇭 PHP Payments • BIR Compliant
        </div>
      </div>
    </div>
  );
} 