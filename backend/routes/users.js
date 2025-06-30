const express = require('express');
const router = express.Router();

// Get all users (with role-based filtering)
router.get('/', async (req, res) => {
  try {
    const { role, search } = req.query;

    // Mock users data
    const users = [
      {
        id: '1',
        email: 'john@example.com',
        name: 'John Doe',
        role: 'designer',
        company: 'Design Studio PH',
        location: 'Manila, Philippines',
        phone: '+639123456789',
        avatar: null,
        isVerified: true,
        rating: 4.8,
        completedProjects: 24,
        createdAt: '2023-06-15'
      },
      {
        id: '2',
        email: 'maria@example.com',
        name: 'Maria Santos',
        role: 'client',
        company: 'Santos Real Estate',
        location: 'Makati, Philippines',
        phone: '+639876543210',
        avatar: null,
        isVerified: true,
        rating: 4.9,
        completedProjects: 8,
        createdAt: '2023-08-20'
      },
      {
        id: '3',
        email: 'carlos@example.com',
        name: 'Carlos Rodriguez',
        role: 'vendor',
        company: 'Rodriguez Materials',
        location: 'Quezon City, Philippines',
        phone: '+639112233445',
        avatar: null,
        isVerified: true,
        rating: 4.7,
        completedProjects: 156,
        createdAt: '2023-05-10'
      }
    ];

    // Filter by role if specified
    let filteredUsers = users;
    if (role) {
      filteredUsers = users.filter(user => user.role === role);
    }

    // Search by name or company if specified
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.company.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      data: filteredUsers,
      pagination: {
        total: filteredUsers.length,
        page: 1,
        limit: 10,
        totalPages: 1
      }
    });

  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch users'
    });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Mock user data
    const user = {
      id,
      email: 'john@example.com',
      name: 'John Doe',
      role: 'designer',
      company: 'Design Studio PH',
      location: 'Manila, Philippines',
      phone: '+639123456789',
      avatar: null,
      isVerified: true,
      rating: 4.8,
      completedProjects: 24,
      portfolio: [
        {
          id: '1',
          title: 'Modern Condo Interior',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          category: 'residential'
        },
        {
          id: '2',
          title: 'Office Renovation',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
          category: 'commercial'
        }
      ],
      skills: ['Interior Design', 'Space Planning', '3D Rendering', 'Project Management'],
      certifications: ['Professional Interior Designer', 'BIR Accredited'],
      availability: 'Available for new projects',
      hourlyRate: 1500,
      currency: 'PHP',
      createdAt: '2023-06-15',
      updatedAt: '2024-02-01'
    };

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch user'
    });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate Philippine phone number if provided
    if (updates.phone && !/^\+63[0-9]{10}$/.test(updates.phone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Philippine phone number format'
      });
    }

    // Mock user update
    const updatedUser = {
      id,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('User update error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to update user'
    });
  }
});

// Get user portfolio
router.get('/:id/portfolio', async (req, res) => {
  try {
    const { id } = req.params;

    // Mock portfolio data
    const portfolio = [
      {
        id: '1',
        title: 'Modern Condo Interior Design',
        description: 'Contemporary interior design for a 2-bedroom condo unit',
        category: 'residential',
        images: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop'
        ],
        tags: ['interior', 'modern', 'condo'],
        featured: true,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Office Renovation Project',
        description: 'Complete office renovation for a tech startup',
        category: 'commercial',
        images: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=600&fit=crop'
        ],
        tags: ['renovation', 'office', 'modern'],
        featured: false,
        createdAt: '2024-01-20'
      }
    ];

    res.json({
      success: true,
      data: portfolio
    });

  } catch (error) {
    console.error('Portfolio fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch portfolio'
    });
  }
});

// Get user reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;

    // Mock reviews data
    const reviews = [
      {
        id: '1',
        reviewerId: 'client_1',
        reviewerName: 'Maria Santos',
        rating: 5,
        comment: 'Excellent work! John delivered exactly what we envisioned and more.',
        projectId: 'project_1',
        createdAt: '2024-01-25'
      },
      {
        id: '2',
        reviewerId: 'client_2',
        reviewerName: 'Juan Dela Cruz',
        rating: 4,
        comment: 'Great communication and timely delivery. Highly recommended!',
        projectId: 'project_2',
        createdAt: '2024-01-20'
      }
    ];

    res.json({
      success: true,
      data: reviews
    });

  } catch (error) {
    console.error('Reviews fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch reviews'
    });
  }
});

// Get user projects
router.get('/:id/projects', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;

    // Mock projects data
    const projects = [
      {
        id: '1',
        title: 'Modern Condo Interior Design',
        status: 'in-progress',
        progress: 75,
        budget: 85000,
        currency: 'PHP',
        startDate: '2024-01-15',
        endDate: '2024-03-15'
      },
      {
        id: '2',
        title: 'Office Renovation Project',
        status: 'completed',
        progress: 100,
        budget: 120000,
        currency: 'PHP',
        startDate: '2024-01-20',
        endDate: '2024-04-20'
      }
    ];

    // Filter by status if specified
    let filteredProjects = projects;
    if (status) {
      filteredProjects = projects.filter(project => project.status === status);
    }

    res.json({
      success: true,
      data: filteredProjects
    });

  } catch (error) {
    console.error('User projects fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch user projects'
    });
  }
});

module.exports = router; 