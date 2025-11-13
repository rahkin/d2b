'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoodboardCreator } from '@/components/moodboard/MoodboardCreator';
import { PlusIcon, SparklesIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { StandardLayout } from '@/components/layout/StandardLayout';

interface Moodboard {
  id: string;
  title: string;
  description?: string;
  images: string[];
  colors: string[];
  style?: string;
  isPublic: boolean;
  aiGenerated: boolean;
  createdAt: string;
}

export default function MoodboardsPage() {
  const [moodboards, setMoodboards] = useState<Moodboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreator, setShowCreator] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchMoodboards();
  }, []);

  const fetchMoodboards = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/moodboards', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        setMoodboards(result.data);
      }
    } catch (error) {
      console.error('Error fetching moodboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (moodboard: Moodboard) => {
    setMoodboards(prev => [moodboard, ...prev]);
    setShowCreator(false);
  };

  if (loading) {
    return (
      <StandardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </StandardLayout>
    );
  }

  return (
    <StandardLayout>
      <div className="container-section section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              My Moodboards
            </h1>
            <p className="text-foreground-secondary">
              Create and manage your design inspiration boards
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="btn-outline"
            >
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </button>
            <button
              onClick={() => setShowCreator(true)}
              className="btn-primary flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Create Moodboard
            </button>
          </div>
        </div>

        {/* Creator Modal */}
        {showCreator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-4xl"
            >
              <MoodboardCreator
                onSave={handleSave}
                onClose={() => setShowCreator(false)}
              />
            </motion.div>
          </div>
        )}

        {/* Moodboards Grid */}
        {moodboards.length === 0 ? (
          <div className="card text-center py-12">
            <PhotoIcon className="w-16 h-16 text-foreground-tertiary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No moodboards yet
            </h3>
            <p className="text-foreground-secondary mb-6">
              Create your first moodboard to start organizing your design ideas
            </p>
            <button
              onClick={() => setShowCreator(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <SparklesIcon className="w-5 h-5" />
              Create Your First Moodboard
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {moodboards.map((moodboard) => (
              <motion.div
                key={moodboard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card cursor-pointer hover:shadow-medium transition-shadow"
              >
                {moodboard.images.length > 0 && (
                  <div className="aspect-video bg-neutral-100 rounded-t-lg overflow-hidden mb-4">
                    <img
                      src={moodboard.images[0]}
                      alt={moodboard.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{moodboard.title}</h3>
                    {moodboard.aiGenerated && (
                      <SparklesIcon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    )}
                  </div>
                  {moodboard.description && (
                    <p className="text-sm text-foreground-secondary mb-3 line-clamp-2">
                      {moodboard.description}
                    </p>
                  )}
                  {moodboard.colors.length > 0 && (
                    <div className="flex gap-1 mb-3">
                      {moodboard.colors.slice(0, 5).map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-foreground-tertiary">
                    <span>{new Date(moodboard.createdAt).toLocaleDateString()}</span>
                    {moodboard.isPublic && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
                        Public
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </StandardLayout>
  );
}




