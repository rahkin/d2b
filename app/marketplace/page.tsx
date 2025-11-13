'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ShoppingCartIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  images: string[];
  vendor?: {
    name: string;
    location?: string;
  };
  stock: number;
  category: string;
}

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [category, search]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);

      const response = await fetch(`/api/marketplace/items?${params}`);
      const result = await response.json();

      if (result.success) {
        setItems(result.data);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: currency || 'PHP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <StandardLayout>
      <div className="container-section section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Marketplace
          </h1>
          <p className="text-foreground-secondary">
            Discover materials, furniture, and design products from verified vendors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-tertiary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, vendors, materials..."
              className="input-field w-full pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline flex items-center gap-2"
          >
            <FunnelIcon className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="card mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="">All Categories</option>
                  <option value="materials">Construction Materials</option>
                  <option value="furniture">Furniture</option>
                  <option value="lighting">Lighting</option>
                  <option value="decor">Home Decor</option>
                </select>
              </div>
              {/* Add more filters as needed */}
            </div>
          </motion.div>
        )}

        {/* Items Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-foreground-secondary">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card cursor-pointer hover:shadow-medium transition-shadow"
              >
                {item.images && item.images.length > 0 && (
                  <div className="aspect-square bg-neutral-100 rounded-t-lg overflow-hidden mb-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-foreground-secondary mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary-700">
                      {formatCurrency(item.price.amount, item.price.currency)}
                    </span>
                    {item.stock > 0 && (
                      <span className="text-xs text-success-600 bg-success-50 px-2 py-1 rounded">
                        In Stock
                      </span>
                    )}
                  </div>
                  {item.vendor && (
                    <div className="flex items-center gap-2 text-xs text-foreground-secondary pt-3 border-t border-border-secondary">
                      {item.vendor.location && (
                        <>
                          <MapPinIcon className="w-4 h-4" />
                          <span>{item.vendor.location}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </StandardLayout>
  );
}




