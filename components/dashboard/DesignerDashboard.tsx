'use client';

import React, { useState } from 'react';
import { DesignerSidebar } from './DesignerSidebar';
import { ProjectOverview } from './ProjectOverview';
import { AIToolsPanel } from './AIToolsPanel';
import { PortfolioManager } from './PortfolioManager';

export function DesignerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverview />;
      case 'ai-tools':
        return <AIToolsPanel />;
      case 'portfolio':
        return <PortfolioManager />;
      default:
        return <ProjectOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background-secondary">
      <DesignerSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-surface shadow-elevation-1 border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold text-foreground">
              Designer Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-foreground-secondary">
                Welcome back, Designer!
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {renderContent()}
        </main>
      </div>
    </div>
  );
} 