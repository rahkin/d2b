'use client';

import React, { useState } from 'react';

export function AIToolsPanel() {
  const [activeTool, setActiveTool] = useState('moodboard');

  const tools = [
    {
      id: 'moodboard',
      name: 'Moodboard Creator',
      description: 'Generate design inspiration boards using AI',
      icon: '🎨',
      features: ['Style analysis', 'Color palette generation', 'Material suggestions', 'Export options']
    },
    {
      id: 'sketch-renderer',
      name: 'Sketch Renderer',
      description: 'Transform hand-drawn sketches into realistic renders',
      icon: '✏️',
      features: ['Real-time rendering', 'Multiple styles', 'High resolution output', 'Batch processing']
    },
    {
      id: 'space-planner',
      name: 'Space Planner',
      description: 'AI-powered room layout and furniture arrangement',
      icon: '🏠',
      features: ['Room analysis', 'Furniture placement', 'Traffic flow optimization', '3D visualization']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">AI Design Tools</h1>
          <p className="text-foreground-secondary">Powered by advanced AI to enhance your design workflow</p>
        </div>
        <div className="text-sm text-foreground-tertiary">
          🇵🇭 Philippine Peso • BIR Compliant
        </div>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`card cursor-pointer transition-all duration-200 ${
              activeTool === tool.id
                ? 'ring-2 ring-primary-500 bg-primary-50'
                : 'hover:shadow-lg'
            }`}
            onClick={() => setActiveTool(tool.id)}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{tool.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h3>
              <p className="text-sm text-foreground-secondary mb-4">{tool.description}</p>
              
              <ul className="space-y-2 text-left">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-foreground-secondary">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Active Tool Interface */}
      <div className="card">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {tools.find(t => t.id === activeTool)?.name}
          </h2>
          <p className="text-foreground-secondary">
            {tools.find(t => t.id === activeTool)?.description}
          </p>
        </div>

        {activeTool === 'moodboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Description
                </label>
                <textarea
                  className="input-field h-32"
                  placeholder="Describe your project: Modern condo interior with minimalist design, neutral colors, natural materials..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Style Preferences
                </label>
                <div className="space-y-2">
                  {['Minimalist', 'Modern', 'Traditional', 'Industrial', 'Scandinavian', 'Tropical'].map((style) => (
                    <label key={style} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-foreground">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="btn-primary">Generate Moodboard</button>
              <button className="btn-outline">Save Draft</button>
            </div>
          </div>
        )}

        {activeTool === 'sketch-renderer' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-border-secondary rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">📁</div>
              <p className="text-foreground-secondary mb-4">Upload your sketch or drag and drop here</p>
              <button className="btn-primary">Choose File</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Render Style
                </label>
                <select className="input-field">
                  <option>Photorealistic</option>
                  <option>Watercolor</option>
                  <option>Sketch</option>
                  <option>3D Render</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Resolution
                </label>
                <select className="input-field">
                  <option>HD (1920x1080)</option>
                  <option>4K (3840x2160)</option>
                  <option>Print (300 DPI)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Lighting
                </label>
                <select className="input-field">
                  <option>Natural Daylight</option>
                  <option>Warm Interior</option>
                  <option>Dramatic</option>
                </select>
              </div>
            </div>
            
            <button className="btn-primary">Generate Render</button>
          </div>
        )}

        {activeTool === 'space-planner' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Room Type
                </label>
                <select className="input-field">
                  <option>Living Room</option>
                  <option>Kitchen</option>
                  <option>Bedroom</option>
                  <option>Bathroom</option>
                  <option>Office</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Room Dimensions (meters)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Length" className="input-field" />
                  <input type="number" placeholder="Width" className="input-field" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Furniture Requirements
              </label>
              <textarea
                className="input-field h-24"
                placeholder="List the furniture and items you need in this space..."
              />
            </div>
            
            <button className="btn-primary">Generate Layout</button>
          </div>
        )}
      </div>
    </div>
  );
} 