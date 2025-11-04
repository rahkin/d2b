'use client';

import React, { useState, useEffect } from 'react';

interface FigmaImage {
  id: string;
  url: string;
  name: string;
}

interface FigmaDesignInfo {
  fileName: string;
  thumbnail: string;
  imageCount: number;
  images: FigmaImage[];
}

/**
 * Design Reference Page
 * 
 * This page allows you to view Figma designs side-by-side with your implementation.
 * Use this to:
 * 1. Review the actual Figma designs
 * 2. Compare with current implementation
 * 3. Extract design tokens (colors, spacing, typography)
 * 4. Implement components based on the designs
 */
export default function DesignReferencePage() {
  const [designInfo, setDesignInfo] = useState<FigmaDesignInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDesignInfo();
  }, []);

  const fetchDesignInfo = async () => {
    try {
      const response = await fetch('/api/figma/info');
      const result = await response.json();
      
      if (result.success) {
        setDesignInfo(result.data);
        // Auto-select first image
        if (result.data.images.length > 0) {
          setSelectedImage(result.data.images[0].url);
        }
      }
    } catch (err) {
      console.error('Error fetching Figma info:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = designInfo?.images.filter(img => 
    img.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-foreground-secondary">Loading design reference...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border shadow-elevation-1 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Figma Design Reference
              </h1>
              <p className="text-sm text-foreground-secondary mt-1">
                {designInfo?.fileName} • {designInfo?.imageCount} design screens
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-64"
              />
              <div className="flex gap-2">
                <a
                  href="/figma-comparison"
                  className="btn-primary text-sm"
                >
                  🎨 Comparison Tool
                </a>
                <a
                  href="/designer/dashboard"
                  className="btn-outline text-sm"
                >
                  ← Back to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Image List Sidebar */}
          <div className="col-span-3">
            <div className="card sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Design Screens ({filteredImages.length})
              </h2>
              <div className="space-y-2">
                {filteredImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedImage === image.url
                        ? 'bg-primary-100 border-2 border-primary-500'
                        : 'bg-background-secondary border-2 border-transparent hover:border-primary-200'
                    }`}
                  >
                    <div className="text-xs font-mono text-foreground-tertiary truncate">
                      {image.name.substring(0, 20)}...
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Design Viewer */}
          <div className="col-span-9">
            {selectedImage ? (
              <div className="card">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Design Reference
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(selectedImage, '_blank')}
                      className="btn-outline text-sm"
                    >
                      Open Full Size
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = selectedImage;
                        link.download = 'figma-design.png';
                        link.click();
                      }}
                      className="btn-primary text-sm"
                    >
                      Download
                    </button>
                  </div>
                </div>

                <div className="bg-neutral-100 rounded-lg p-4 overflow-auto">
                  <img
                    src={selectedImage}
                    alt="Figma design"
                    className="max-w-full h-auto rounded-lg shadow-medium"
                  />
                </div>

                {/* Design Notes Section */}
                <div className="mt-6 card bg-primary-50 border-primary-200">
                  <h3 className="font-semibold text-foreground mb-3">
                    📝 Implementation Notes
                  </h3>
                  <div className="space-y-3 text-sm text-foreground-secondary">
                    <div>
                      <strong className="text-foreground">Colors:</strong> Use the eyedropper tool or browser dev tools to extract exact colors
                    </div>
                    <div>
                      <strong className="text-foreground">Spacing:</strong> Measure padding, margins, and gaps using browser dev tools
                    </div>
                    <div>
                      <strong className="text-foreground">Typography:</strong> Inspect font family, size, weight, and line height
                    </div>
                    <div>
                      <strong className="text-foreground">Components:</strong> Identify reusable components and their states
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-foreground-secondary">
                  Select a design from the sidebar to view
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 card bg-accent-50 border-accent-200">
          <h3 className="font-semibold text-foreground mb-3">
            🎨 How to Implement Figma Designs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground-secondary">
            <div>
              <h4 className="font-medium text-foreground mb-2">1. Extract Design Tokens</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Use browser dev tools to inspect colors</li>
                <li>Measure spacing with ruler tools</li>
                <li>Note typography styles</li>
                <li>Run: <code className="bg-white px-1 rounded">npm run extract-figma</code></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">2. Use Figma API (Recommended)</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Get Figma token from figma.com/developers</li>
                <li>Get file key from Figma file URL</li>
                <li>Set: <code className="bg-white px-1 rounded">FIGMA_TOKEN</code> and <code className="bg-white px-1 rounded">FIGMA_FILE_KEY</code></li>
                <li>Run: <code className="bg-white px-1 rounded">npm run extract-figma</code></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">3. Implement Components</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Compare this reference with current components</li>
                <li>Update components to match designs</li>
                <li>Use extracted design tokens</li>
                <li>Test responsive behavior</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">4. Quality Check</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Pixel-perfect matching</li>
                <li>Responsive breakpoints</li>
                <li>Accessibility compliance</li>
                <li>Performance optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

