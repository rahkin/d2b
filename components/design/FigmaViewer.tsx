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
  metadata: any;
}

export function FigmaViewer() {
  const [designInfo, setDesignInfo] = useState<FigmaDesignInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'gallery'>('grid');

  useEffect(() => {
    fetchDesignInfo();
  }, []);

  const fetchDesignInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/figma/info');
      const result = await response.json();
      
      if (result.success) {
        setDesignInfo(result.data);
      } else {
        setError(result.error || 'Failed to load Figma designs');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error fetching Figma info:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading Figma designs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-neutral-900 font-medium mb-2">Error Loading Designs</p>
          <p className="text-neutral-600 mb-4">{error}</p>
          <button
            onClick={fetchDesignInfo}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!designInfo) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-neutral-900">
            Figma Design Import
          </h1>
          <p className="text-neutral-600">
            {designInfo.fileName} • {designInfo.imageCount} images
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary-100 text-primary-700 border border-primary-200'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('gallery')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'gallery'
                ? 'bg-primary-100 text-primary-700 border border-primary-200'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Gallery
          </button>
        </div>
      </div>

      {/* Thumbnail Preview */}
      <div className="card">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Design Preview</h2>
        <div className="relative w-full h-48 bg-neutral-100 rounded-lg overflow-hidden">
          <img
            src={designInfo.thumbnail}
            alt={designInfo.fileName}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Image Grid/Gallery */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {designInfo.images.map((image) => (
            <div
              key={image.id}
              className="card group cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(image.url)}
            >
              <div className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-3">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm text-neutral-600 truncate">{image.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {designInfo.images.map((image) => (
            <div
              key={image.id}
              className="card group cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(image.url)}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-900 mb-2">{image.name}</h3>
                  <p className="text-sm text-neutral-600">Click to view full size</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-neutral-100 transition-colors z-10"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6 text-neutral-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Figma design"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

