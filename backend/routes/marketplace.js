const express = require('express');
const router = express.Router();

// Get marketplace items
router.get('/items', async (req, res) => {
  try {
    const { category, search, vendor, minPrice, maxPrice, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Mock marketplace items
    const items = [
      {
        id: '1',
        vendorId: 'vendor_1',
        vendorName: 'Rodriguez Materials',
        name: 'Premium Marble Tiles',
        description: 'High-quality Carrara marble tiles for flooring and walls',
        category: 'materials',
        subcategory: 'tiles',
        price: {
          amount: 2500,
          currency: 'PHP'
        },
        stock: 150,
        unit: 'sq.m',
        images: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&h=300&fit=crop'
        ],
        specifications: {
          size: '60x60cm',
          thickness: '1cm',
          finish: 'Polished',
          origin: 'Italy'
        },
        rating: 4.8,
        reviews: 24,
        isAvailable: true,
        isFeatured: true,
        location: 'Quezon City, Philippines',
        shipping: {
          local: 500,
          nationwide: 1200,
          international: 5000
        },
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        vendorId: 'vendor_2',
        vendorName: 'Design Furniture PH',
        name: 'Modern Sofa Set',
        description: 'Contemporary 3-seater sofa with premium fabric upholstery',
        category: 'furniture',
        subcategory: 'living-room',
        price: {
          amount: 45000,
          currency: 'PHP'
        },
        stock: 8,
        unit: 'piece',
        images: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
        ],
        specifications: {
          dimensions: '220x85x75cm',
          material: 'Fabric',
          color: 'Gray',
          warranty: '2 years'
        },
        rating: 4.9,
        reviews: 18,
        isAvailable: true,
        isFeatured: false,
        location: 'Manila, Philippines',
        shipping: {
          local: 800,
          nationwide: 2000,
          international: 8000
        },
        createdAt: '2024-01-20'
      },
      {
        id: '3',
        vendorId: 'vendor_3',
        vendorName: 'Lighting Solutions',
        name: 'LED Pendant Light',
        description: 'Modern LED pendant light with dimmable feature',
        category: 'lighting',
        subcategory: 'pendant',
        price: {
          amount: 3500,
          currency: 'PHP'
        },
        stock: 25,
        unit: 'piece',
        images: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop'
        ],
        specifications: {
          wattage: '15W',
          color: 'Warm White',
          material: 'Metal',
          height: '120cm'
        },
        rating: 4.7,
        reviews: 32,
        isAvailable: true,
        isFeatured: true,
        location: 'Makati, Philippines',
        shipping: {
          local: 300,
          nationwide: 800,
          international: 3000
        },
        createdAt: '2024-01-25'
      }
    ];

    // Apply filters
    let filteredItems = items;

    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.vendorName.toLowerCase().includes(searchLower)
      );
    }

    if (vendor) {
      filteredItems = filteredItems.filter(item => item.vendorId === vendor);
    }

    if (minPrice) {
      filteredItems = filteredItems.filter(item => item.price.amount >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filteredItems = filteredItems.filter(item => item.price.amount <= parseFloat(maxPrice));
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price.amount;
          bValue = b.price.amount;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'reviews':
          aValue = a.reviews;
          bValue = b.reviews;
          break;
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
      }

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    res.json({
      success: true,
      data: filteredItems,
      filters: {
        category,
        search,
        vendor,
        minPrice,
        maxPrice,
        sortBy,
        order
      }
    });

  } catch (error) {
    console.error('Marketplace items fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch marketplace items'
    });
  }
});

// Get single marketplace item
router.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Mock item data
    const item = {
      id,
      vendorId: 'vendor_1',
      vendorName: 'Rodriguez Materials',
      vendorRating: 4.8,
      vendorReviews: 156,
      name: 'Premium Marble Tiles',
      description: 'High-quality Carrara marble tiles for flooring and walls. Perfect for modern interior designs.',
      category: 'materials',
      subcategory: 'tiles',
      price: {
        amount: 2500,
        currency: 'PHP'
      },
      stock: 150,
      unit: 'sq.m',
      images: [
        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
      ],
      specifications: {
        size: '60x60cm',
        thickness: '1cm',
        finish: 'Polished',
        origin: 'Italy',
        weight: '15kg/sq.m',
        waterAbsorption: '<0.5%'
      },
      rating: 4.8,
      reviews: [
        {
          id: '1',
          userId: 'user_1',
          userName: 'Maria Santos',
          rating: 5,
          comment: 'Excellent quality! The tiles are exactly as described.',
          createdAt: '2024-01-20'
        },
        {
          id: '2',
          userId: 'user_2',
          userName: 'Juan Dela Cruz',
          rating: 4,
          comment: 'Good product, fast delivery. Would recommend.',
          createdAt: '2024-01-18'
        }
      ],
      isAvailable: true,
      isFeatured: true,
      location: 'Quezon City, Philippines',
      shipping: {
        local: 500,
        nationwide: 1200,
        international: 5000
      },
      warranty: '1 year',
      returnPolicy: '30 days',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-01'
    };

    res.json({
      success: true,
      data: item
    });

  } catch (error) {
    console.error('Marketplace item fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch marketplace item'
    });
  }
});

// Get vendors
router.get('/vendors', async (req, res) => {
  try {
    const { category, location, rating } = req.query;

    // Mock vendors data
    const vendors = [
      {
        id: 'vendor_1',
        name: 'Rodriguez Materials',
        description: 'Premium construction materials supplier',
        category: 'materials',
        location: 'Quezon City, Philippines',
        rating: 4.8,
        reviews: 156,
        totalItems: 245,
        isVerified: true,
        isFeatured: true,
        contact: {
          phone: '+639123456789',
          email: 'info@rodriguezmaterials.ph',
          website: 'https://rodriguezmaterials.ph'
        },
        businessHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
        createdAt: '2023-05-15'
      },
      {
        id: 'vendor_2',
        name: 'Design Furniture PH',
        description: 'Modern furniture and home decor',
        category: 'furniture',
        location: 'Manila, Philippines',
        rating: 4.9,
        reviews: 89,
        totalItems: 120,
        isVerified: true,
        isFeatured: false,
        contact: {
          phone: '+639876543210',
          email: 'hello@designfurniture.ph',
          website: 'https://designfurniture.ph'
        },
        businessHours: 'Mon-Sat: 9AM-7PM',
        createdAt: '2023-08-20'
      }
    ];

    // Apply filters
    let filteredVendors = vendors;

    if (category) {
      filteredVendors = filteredVendors.filter(vendor => vendor.category === category);
    }

    if (location) {
      const locationLower = location.toLowerCase();
      filteredVendors = filteredVendors.filter(vendor =>
        vendor.location.toLowerCase().includes(locationLower)
      );
    }

    if (rating) {
      filteredVendors = filteredVendors.filter(vendor => vendor.rating >= parseFloat(rating));
    }

    res.json({
      success: true,
      data: filteredVendors
    });

  } catch (error) {
    console.error('Vendors fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch vendors'
    });
  }
});

// Get vendor details
router.get('/vendors/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Mock vendor data
    const vendor = {
      id,
      name: 'Rodriguez Materials',
      description: 'Premium construction materials supplier with over 20 years of experience in the Philippine market.',
      category: 'materials',
      location: 'Quezon City, Philippines',
      rating: 4.8,
      reviews: 156,
      totalItems: 245,
      isVerified: true,
      isFeatured: true,
      contact: {
        phone: '+639123456789',
        email: 'info@rodriguezmaterials.ph',
        website: 'https://rodriguezmaterials.ph'
      },
      businessHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
      address: '123 EDSA, Quezon City, Metro Manila',
      certifications: ['BIR Accredited', 'DTI Registered', 'ISO 9001:2015'],
      paymentMethods: ['Cash', 'Bank Transfer', 'GCash', 'PayMaya'],
      shipping: {
        local: 'Free for orders above ₱10,000',
        nationwide: '₱500-₱2,000 depending on location',
        international: 'Available upon request'
      },
      returnPolicy: '30-day return policy for unused items',
      warranty: 'Manufacturer warranty on all products',
      createdAt: '2023-05-15',
      updatedAt: '2024-02-01'
    };

    res.json({
      success: true,
      data: vendor
    });

  } catch (error) {
    console.error('Vendor fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch vendor'
    });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      {
        id: 'materials',
        name: 'Construction Materials',
        description: 'Building materials, tiles, cement, etc.',
        icon: '🏗️',
        subcategories: ['tiles', 'cement', 'steel', 'wood', 'paint'],
        itemCount: 1247
      },
      {
        id: 'furniture',
        name: 'Furniture',
        description: 'Home and office furniture',
        icon: '🪑',
        subcategories: ['living-room', 'bedroom', 'kitchen', 'office', 'outdoor'],
        itemCount: 892
      },
      {
        id: 'lighting',
        name: 'Lighting',
        description: 'Lighting fixtures and accessories',
        icon: '💡',
        subcategories: ['ceiling', 'wall', 'pendant', 'table', 'outdoor'],
        itemCount: 456
      },
      {
        id: 'decor',
        name: 'Home Decor',
        description: 'Decorative items and accessories',
        icon: '🎨',
        subcategories: ['art', 'vases', 'cushions', 'mirrors', 'plants'],
        itemCount: 678
      }
    ];

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch categories'
    });
  }
});

module.exports = router; 