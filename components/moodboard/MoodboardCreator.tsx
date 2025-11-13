'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PhotoIcon, 
  SparklesIcon, 
  XMarkIcon,
  PlusIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

interface MoodboardCreatorProps {
  onSave?: (moodboard: any) => void;
  onClose?: () => void;
}

export function MoodboardCreator({ onSave, onClose }: MoodboardCreatorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [style, setStyle] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages(prev => [...prev, event.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleColorAdd = (color: string) => {
    if (!colors.includes(color)) {
      setColors(prev => [...prev, color]);
    }
  };

  const handleColorRemove = (color: string) => {
    setColors(prev => prev.filter(c => c !== color));
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/moodboards/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          style: style || 'modern'
        })
      });

      const result = await response.json();

      if (result.success) {
        setImages(result.data.generated.images);
        setColors(result.data.generated.colors);
        setStyle(result.data.generated.style);
        setTitle(result.data.moodboard.title);
        setAiPrompt('');
      }
    } catch (error) {
      console.error('Error generating moodboard:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    try {
      const response = await fetch('/api/moodboards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          title,
          description,
          images,
          colors,
          style,
          isPublic
        })
      });

      const result = await response.json();

      if (result.success && onSave) {
        onSave(result.data);
      }
    } catch (error) {
      console.error('Error saving moodboard:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-strong p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">
          Create Moodboard
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-foreground-secondary" />
          </button>
        )}
      </div>

      {/* Title and Description */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field w-full"
            placeholder="My Design Moodboard"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field w-full min-h-[100px]"
            placeholder="Describe your design vision..."
          />
        </div>
      </div>

      {/* AI Generation */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-primary-600" />
          AI Moodboard Generator
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="input-field flex-1"
            placeholder="Describe your design style (e.g., 'Modern minimalist living room with neutral tones')"
            onKeyPress={(e) => e.key === 'Enter' && handleAIGenerate()}
          />
          <button
            onClick={handleAIGenerate}
            disabled={isGenerating || !aiPrompt.trim()}
            className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Images
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={image}
                alt={`Moodboard image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
          <label className="aspect-square border-2 border-dashed border-border-secondary rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-300 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-center">
              <PhotoIcon className="w-8 h-8 text-foreground-tertiary mx-auto mb-2" />
              <span className="text-xs text-foreground-secondary">Add Image</span>
            </div>
          </label>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Color Palette
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-neutral-100 rounded-lg"
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-foreground-secondary">{color}</span>
              <button
                onClick={() => handleColorRemove(color)}
                className="p-1 hover:bg-red-100 rounded"
              >
                <XMarkIcon className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="color"
            onChange={(e) => handleColorAdd(e.target.value)}
            className="w-12 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            placeholder="#8b5e3c"
            className="input-field flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                if (/^#[0-9A-F]{6}$/i.test(input.value)) {
                  handleColorAdd(input.value);
                  input.value = '';
                }
              }
            }}
          />
        </div>
      </div>

      {/* Style */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Style
        </label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="input-field w-full"
        >
          <option value="">Select a style</option>
          <option value="modern">Modern</option>
          <option value="minimalist">Minimalist</option>
          <option value="traditional">Traditional</option>
          <option value="industrial">Industrial</option>
          <option value="scandinavian">Scandinavian</option>
          <option value="bohemian">Bohemian</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      {/* Privacy */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => setIsPublic(!isPublic)}
          className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
            isPublic ? 'bg-primary-100 text-primary-700' : 'bg-neutral-100 text-foreground-secondary'
          }`}
        >
          {isPublic ? (
            <EyeIcon className="w-5 h-5" />
          ) : (
            <EyeSlashIcon className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">
            {isPublic ? 'Public' : 'Private'}
          </span>
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="btn-primary flex-1"
        >
          Save Moodboard
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="btn-outline"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}




