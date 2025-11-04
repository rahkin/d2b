'use client';

import React, { useState } from 'react';

const figmaDesigns = [
  {
    id: 'splash',
    name: 'Splash Screen',
    imageId: '80878c1df4aee5873d374a4af9fc84e7d2ab08a6',
    component: 'SplashScreen',
    file: '/components/landing/SplashScreen.tsx',
    route: '/',
    description: 'Initial loading screen with logo and branding'
  },
  {
    id: 'welcome',
    name: 'Welcome / Role Selector',
    imageId: '9c53c1e66e3a18556bd7c178e5a2d8dc340bcde7',
    component: 'RoleSelector',
    file: '/components/landing/RoleSelector.tsx',
    route: '/?skipSplash=true',
    description: 'Role selection screen for new users'
  },
  {
    id: 'signup',
    name: 'Sign Up Page',
    imageId: '879bead243aeebc145f1bd4adcde8530d2e2e4b2',
    component: 'RegisterPage',
    file: '/app/auth/register/page.tsx',
    route: '/auth/register',
    description: 'User registration form'
  }
];

export default function FigmaComparisonPage() {
  const [selectedDesign, setSelectedDesign] = useState(figmaDesigns[0]);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'overlay' | 'split'>('side-by-side');
  const [zoom, setZoom] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-50 shadow-elevation-1">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Figma Design Comparison
              </h1>
              <p className="text-sm text-foreground-secondary mt-1">
                Compare Figma designs with current implementation
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-background-secondary p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('side-by-side')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    viewMode === 'side-by-side'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-foreground-secondary hover:text-foreground'
                  }`}
                >
                  Side-by-Side
                </button>
                <button
                  onClick={() => setViewMode('overlay')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    viewMode === 'overlay'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-foreground-secondary hover:text-foreground'
                  }`}
                >
                  Overlay
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    viewMode === 'split'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-foreground-secondary hover:text-foreground'
                  }`}
                >
                  Split
                </button>
              </div>

              {/* Zoom Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
                  title="Zoom out"
                >
                  <span className="text-lg">−</span>
                </button>
                <span className="text-sm text-foreground-secondary w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
                  title="Zoom in"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>

              <a
                href={selectedDesign.route}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-4 py-2"
              >
                View Live Page
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Design Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {figmaDesigns.map((design) => (
              <button
                key={design.id}
                onClick={() => setSelectedDesign(design)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDesign.id === design.id
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-500 shadow-soft'
                    : 'bg-surface text-foreground-secondary border-2 border-border hover:border-primary-200'
                }`}
              >
                {design.name}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison View */}
        {viewMode === 'side-by-side' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Figma Design */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Figma Design
                </h2>
                <a
                  href={`/api/figma/images/${selectedDesign.imageId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Open Full Size →
                </a>
              </div>
              <div className="bg-neutral-100 rounded-lg p-4 overflow-auto border-2 border-dashed border-border-secondary">
                <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
                  <img
                    src={`/api/figma/images/${selectedDesign.imageId}`}
                    alt={`Figma ${selectedDesign.name}`}
                    className="w-full h-auto rounded-lg shadow-medium"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-sm text-foreground-secondary mb-2">
                  <strong className="text-foreground">Design Notes:</strong>
                </p>
                <ul className="text-xs text-foreground-secondary space-y-1 list-disc list-inside ml-2">
                  <li>Mobile-first responsive design</li>
                  <li>Match colors, spacing, and typography exactly</li>
                  <li>Note component structure and layout</li>
                  <li>Extract design tokens from this image</li>
                </ul>
              </div>
            </div>

            {/* Current Implementation Info */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Current Implementation
                </h2>
                <a
                  href={selectedDesign.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View Page →
                </a>
              </div>
              <div className="space-y-4">
                <div>
                  <strong className="text-foreground text-sm">Component File:</strong>
                  <p className="font-mono text-xs bg-background-secondary p-2 rounded mt-1 break-all">
                    {selectedDesign.file}
                  </p>
                </div>
                <div>
                  <strong className="text-foreground text-sm">Component Name:</strong>
                  <p className="text-sm text-foreground-secondary mt-1">
                    {selectedDesign.component}
                  </p>
                </div>
                <div>
                  <strong className="text-foreground text-sm">Route:</strong>
                  <p className="text-sm text-foreground-secondary mt-1">
                    {selectedDesign.route}
                  </p>
                </div>
                <div className="p-4 bg-accent-50 rounded-lg border border-accent-200">
                  <p className="text-sm font-medium text-foreground mb-2">
                    📝 Implementation Checklist:
                  </p>
                  <ul className="text-xs text-foreground-secondary space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-600 mt-0.5">□</span>
                      <span>Colors match Figma exactly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-600 mt-0.5">□</span>
                      <span>Spacing and padding match</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-600 mt-0.5">□</span>
                      <span>Typography (font, size, weight) matches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-600 mt-0.5">□</span>
                      <span>Component structure matches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-600 mt-0.5">□</span>
                      <span>Mobile-first responsive breakpoints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-600 mt-0.5">□</span>
                      <span>All interactions work correctly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'overlay' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Overlay Comparison
            </h2>
            <div className="relative bg-neutral-100 rounded-lg p-4 overflow-auto border-2 border-dashed border-border-secondary">
              <div className="relative" style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
                {/* Figma Design */}
                <img
                  src={`/api/figma/images/${selectedDesign.imageId}`}
                  alt={`Figma ${selectedDesign.name}`}
                  className="w-full h-auto rounded-lg shadow-medium"
                />
                {/* Overlay instructions */}
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-medium">
                  Figma Design Overlay
                </div>
                <div className="absolute bottom-4 right-4 bg-accent-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-medium">
                  Compare with live page: <a href={selectedDesign.route} target="_blank" className="underline">View Page</a>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
              💡 <strong>Tip:</strong> Open the live page in a new tab and compare side-by-side with this overlay
            </p>
          </div>
        )}

        {viewMode === 'split' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Split View Comparison
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="bg-surface rounded-lg p-2 mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-foreground">Figma Design</p>
                  <a
                    href={`/api/figma/images/${selectedDesign.imageId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    Open Full →
                  </a>
                </div>
                <div className="bg-neutral-100 rounded-lg p-4 overflow-auto border-2 border-dashed border-border-secondary">
                  <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
                    <img
                      src={`/api/figma/images/${selectedDesign.imageId}`}
                      alt={`Figma ${selectedDesign.name}`}
                      className="w-full h-auto rounded-lg shadow-medium"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-surface rounded-lg p-2 mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-foreground">Current Implementation</p>
                  <a
                    href={selectedDesign.route}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    View Live →
                  </a>
                </div>
                <div className="bg-neutral-100 rounded-lg p-4 overflow-auto border-2 border-dashed border-accent-200 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-foreground-secondary mb-3">
                      Open the live page in a new tab to compare
                    </p>
                    <a
                      href={selectedDesign.route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      Open {selectedDesign.name} Page
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-accent-50 rounded-lg border border-accent-200">
              <p className="text-sm text-foreground-secondary">
                💡 <strong>Tip:</strong> Open both the Figma design and live page side-by-side in separate browser windows for the best comparison experience.
              </p>
            </div>
          </div>
        )}

        {/* Design Token Extraction Helper */}
        <div className="mt-6 card bg-secondary-50 border-secondary-200">
          <h3 className="font-semibold text-foreground mb-3">
            🎨 Design Token Extraction Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-foreground-secondary">
            <div>
              <strong className="text-foreground block mb-2">Colors</strong>
              <ol className="list-decimal list-inside space-y-1 ml-2 text-xs">
                <li>Right-click on Figma image → Inspect</li>
                <li>Use browser color picker</li>
                <li>Copy hex code</li>
                <li>Add to tailwind.config.js</li>
              </ol>
            </div>
            <div>
              <strong className="text-foreground block mb-2">Spacing</strong>
              <ol className="list-decimal list-inside space-y-1 ml-2 text-xs">
                <li>Use browser dev tools ruler</li>
                <li>Measure padding/margins</li>
                <li>Note gap sizes</li>
                <li>Update Tailwind classes</li>
              </ol>
            </div>
            <div>
              <strong className="text-foreground block mb-2">Typography</strong>
              <ol className="list-decimal list-inside space-y-1 ml-2 text-xs">
                <li>Inspect text in image</li>
                <li>Note font family</li>
                <li>Measure font size</li>
                <li>Check font weight</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={selectedDesign.file}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            📝 Edit Component File
          </a>
          <a
            href={selectedDesign.route}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            👁️ View Live Implementation
          </a>
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = `/api/figma/images/${selectedDesign.imageId}`;
              link.download = `${selectedDesign.name}-figma.png`;
              link.click();
            }}
            className="btn-outline text-sm"
          >
            ⬇️ Download Figma Image
          </button>
        </div>
      </div>
    </div>
  );
}

