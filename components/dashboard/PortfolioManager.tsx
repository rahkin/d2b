'use client';

import React, { useState } from 'react';

export function PortfolioManager() {
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems = [
    {
      id: '1',
      title: 'Modern Condo Interior',
      category: 'residential',
      image: '/api/placeholder/400/300',
      description: 'Contemporary interior design for a 2-bedroom condo unit',
      tags: ['Interior Design', 'Modern', 'Residential'],
      featured: true
    },
    {
      id: '2',
      title: 'Office Renovation',
      category: 'commercial',
      image: '/api/placeholder/400/300',
      description: 'Complete office renovation for a tech startup',
      tags: ['Commercial', 'Renovation', 'Modern'],
      featured: false
    },
    {
      id: '3',
      title: 'Kitchen Design',
      category: 'residential',
      image: '/api/placeholder/400/300',
      description: 'Custom kitchen design with premium materials',
      tags: ['Kitchen', 'Custom', 'Premium'],
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: portfolioItems.length },
    { id: 'residential', name: 'Residential', count: portfolioItems.filter(item => item.category === 'residential').length },
    { id: 'commercial', name: 'Commercial', count: portfolioItems.filter(item => item.category === 'commercial').length },
    { id: 'featured', name: 'Featured', count: portfolioItems.filter(item => item.featured).length }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : activeFilter === 'featured'
    ? portfolioItems.filter(item => item.featured)
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-neutral-900">Portfolio Manager</h1>
          <p className="text-neutral-600">Showcase your best work and attract new clients</p>
        </div>
        <button className="btn-primary">+ Add Project</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === category.id
                ? 'bg-primary-100 text-primary-700 border border-primary-200'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="card group hover:shadow-lg transition-shadow">
            <div className="relative mb-4">
              <div className="aspect-video bg-neutral-200 rounded-lg flex items-center justify-center">
                <span className="text-neutral-500">📷</span>
              </div>
              {item.featured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md">
                  ✏️
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-600 mb-3">{item.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View Details
                </button>
                <div className="flex space-x-2">
                  <button className="p-1 text-neutral-500 hover:text-neutral-700">
                    👁️
                  </button>
                  <button className="p-1 text-neutral-500 hover:text-neutral-700">
                    ✏️
                  </button>
                  <button className="p-1 text-neutral-500 hover:text-red-600">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Project */}
      <div className="card border-2 border-dashed border-neutral-300 text-center">
        <div className="text-4xl mb-4">➕</div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Add New Project</h3>
        <p className="text-neutral-600 mb-4">Showcase your latest work to attract new clients</p>
        <button className="btn-primary">Create New Project</button>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600 mb-2">24</div>
          <div className="text-sm text-neutral-600">Total Projects</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-secondary-600 mb-2">8</div>
          <div className="text-sm text-neutral-600">Featured Projects</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent-600 mb-2">156</div>
          <div className="text-sm text-neutral-600">Total Views</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">12</div>
          <div className="text-sm text-neutral-600">Client Inquiries</div>
        </div>
      </div>
    </div>
  );
} 