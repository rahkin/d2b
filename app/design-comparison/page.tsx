'use client';

import React, { useState } from 'react';

const figmaDesigns = [
  {
    id: 'splash',
    name: 'Splash Screen',
    imageId: '80878c1df4aee5873d374a4af9fc84e7d2ab08a6',
    component: 'SplashScreen',
    file: '/components/landing/SplashScreen.tsx'
  },
  {
    id: 'welcome',
    name: 'Welcome Screen',
    imageId: '673c9dbb3517b0195675d424efa59bd808a441b3',
    component: 'RoleSelector',
    file: '/components/landing/RoleSelector.tsx'
  },
  {
    id: 'signup',
    name: 'Sign Up Screen',
    imageId: '879bead243aeebc145f1bd4adcde8530d2e2e4b2',
    component: 'RegisterPage',
    file: '/app/auth/register/page.tsx'
  }
];

export default function DesignComparisonPage() {
  const [selectedDesign, setSelectedDesign] = useState(figmaDesigns[0]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">
          Figma Design Comparison
        </h1>

        {/* Design Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {figmaDesigns.map((design) => (
            <button
              key={design.id}
              onClick={() => setSelectedDesign(design)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedDesign.id === design.id
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                  : 'bg-surface text-foreground-secondary border-2 border-border hover:border-primary-200'
              }`}
            >
              {design.name}
            </button>
          ))}
        </div>

        {/* Comparison View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Figma Design */}
          <div className="card">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Figma Design: {selectedDesign.name}
            </h2>
            <div className="bg-neutral-100 rounded-lg p-4 overflow-auto">
              <img
                src={`/api/figma/images/${selectedDesign.imageId}`}
                alt={selectedDesign.name}
                className="w-full h-auto rounded-lg shadow-medium"
              />
            </div>
            <div className="mt-4 text-sm text-foreground-secondary">
              <p><strong>Component:</strong> {selectedDesign.component}</p>
              <p><strong>File:</strong> {selectedDesign.file}</p>
            </div>
          </div>

          {/* Current Implementation Info */}
          <div className="card">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Implementation Notes
            </h2>
            <div className="space-y-4 text-sm text-foreground-secondary">
              <div>
                <strong className="text-foreground">Current File:</strong>
                <p className="mt-1 font-mono text-xs bg-background-secondary p-2 rounded">
                  {selectedDesign.file}
                </p>
              </div>
              <div>
                <strong className="text-foreground">Design Requirements:</strong>
                <ul className="mt-2 space-y-1 list-disc list-inside ml-2">
                  <li>Mobile-first responsive design</li>
                  <li>Match Figma layout exactly</li>
                  <li>Use design system colors</li>
                  <li>Implement all interactions</li>
                </ul>
              </div>
              <div>
                <strong className="text-foreground">Next Steps:</strong>
                <ol className="mt-2 space-y-1 list-decimal list-inside ml-2">
                  <li>Compare layout and spacing</li>
                  <li>Extract colors and typography</li>
                  <li>Update component to match</li>
                  <li>Test on mobile devices</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

