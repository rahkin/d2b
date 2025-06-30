const express = require('express');
const router = express.Router();

// Create payment intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency, projectId, paymentMethod } = req.body;

    // Validate amount and currency for Philippine market
    if (currency !== 'PHP' && currency !== 'USD') {
      return res.status(400).json({
        success: false,
        error: 'Only PHP and USD currencies are supported'
      });
    }

    if (amount < 100) {
      return res.status(400).json({
        success: false,
        error: 'Minimum payment amount is ₱100'
      });
    }

    // Mock payment intent creation
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      amount,
      currency,
      projectId,
      paymentMethod,
      status: 'pending',
      clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    res.json({
      success: true,
      data: paymentIntent
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to create payment intent'
    });
  }
});

// Process payment
router.post('/process', async (req, res) => {
  try {
    const { paymentIntentId, paymentMethod, billingDetails } = req.body;

    // Validate Philippine billing details
    if (billingDetails.country === 'PH') {
      if (!billingDetails.tin) {
        return res.status(400).json({
          success: false,
          error: 'TIN (Tax Identification Number) is required for Philippine transactions'
        });
      }
    }

    // Mock payment processing
    const payment = {
      id: `pay_${Date.now()}`,
      paymentIntentId,
      amount: 85000,
      currency: 'PHP',
      status: 'processing',
      paymentMethod,
      billingDetails,
      transactionId: `txn_${Date.now()}`,
      provider: paymentMethod === 'gcash' || paymentMethod === 'paymaya' ? 'paymongo' : 'xendit',
      createdAt: new Date().toISOString()
    };

    // Simulate processing delay
    setTimeout(() => {
      payment.status = 'completed';
      payment.completedAt = new Date().toISOString();
    }, 2000);

    res.json({
      success: true,
      message: 'Payment processed successfully',
      data: payment
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Payment processing failed'
    });
  }
});

// Get payment methods
router.get('/methods', async (req, res) => {
  try {
    const { country = 'PH' } = req.query;

    // Philippine payment methods
    const philippineMethods = [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        description: 'Visa, Mastercard, American Express',
        icon: '💳',
        fees: '2.5%',
        processingTime: 'Instant',
        supported: true
      },
      {
        id: 'gcash',
        name: 'GCash',
        description: 'Mobile wallet payment',
        icon: '📱',
        fees: '1.5%',
        processingTime: 'Instant',
        supported: true
      },
      {
        id: 'paymaya',
        name: 'PayMaya',
        description: 'Digital wallet payment',
        icon: '📱',
        fees: '1.5%',
        processingTime: 'Instant',
        supported: true
      },
      {
        id: 'bank-transfer',
        name: 'Bank Transfer',
        description: 'Direct bank transfer',
        icon: '🏦',
        fees: '₱25',
        processingTime: '1-2 business days',
        supported: true
      },
      {
        id: 'paypal',
        name: 'PayPal',
        description: 'International payments',
        icon: '🌐',
        fees: '3.5%',
        processingTime: 'Instant',
        supported: true
      }
    ];

    // International payment methods
    const internationalMethods = [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        description: 'Visa, Mastercard, American Express',
        icon: '💳',
        fees: '2.9%',
        processingTime: 'Instant',
        supported: true
      },
      {
        id: 'paypal',
        name: 'PayPal',
        description: 'International payments',
        icon: '🌐',
        fees: '3.5%',
        processingTime: 'Instant',
        supported: true
      },
      {
        id: 'stripe',
        name: 'Stripe',
        description: 'Secure online payments',
        icon: '🔒',
        fees: '2.9%',
        processingTime: 'Instant',
        supported: true
      }
    ];

    const methods = country === 'PH' ? philippineMethods : internationalMethods;

    res.json({
      success: true,
      data: methods
    });

  } catch (error) {
    console.error('Payment methods fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch payment methods'
    });
  }
});

// Get payment history
router.get('/history', async (req, res) => {
  try {
    const { userId, status, limit = 10, page = 1 } = req.query;

    // Mock payment history
    const payments = [
      {
        id: 'pay_1',
        projectId: 'project_1',
        projectTitle: 'Modern Condo Interior Design',
        amount: 85000,
        currency: 'PHP',
        status: 'completed',
        paymentMethod: 'gcash',
        transactionId: 'txn_123456789',
        paidAt: '2024-01-25T10:30:00Z',
        createdAt: '2024-01-25T10:25:00Z'
      },
      {
        id: 'pay_2',
        projectId: 'project_2',
        projectTitle: 'Office Renovation Project',
        amount: 120000,
        currency: 'PHP',
        status: 'completed',
        paymentMethod: 'card',
        transactionId: 'txn_987654321',
        paidAt: '2024-01-20T14:15:00Z',
        createdAt: '2024-01-20T14:10:00Z'
      },
      {
        id: 'pay_3',
        projectId: 'project_3',
        projectTitle: 'Kitchen Design',
        amount: 65000,
        currency: 'PHP',
        status: 'pending',
        paymentMethod: 'paymaya',
        transactionId: null,
        paidAt: null,
        createdAt: '2024-02-01T09:00:00Z'
      }
    ];

    // Filter by status if specified
    let filteredPayments = payments;
    if (status) {
      filteredPayments = payments.filter(payment => payment.status === status);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedPayments,
      pagination: {
        total: filteredPayments.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(filteredPayments.length / limit)
      }
    });

  } catch (error) {
    console.error('Payment history fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch payment history'
    });
  }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Mock payment data
    const payment = {
      id,
      projectId: 'project_1',
      projectTitle: 'Modern Condo Interior Design',
      amount: 85000,
      currency: 'PHP',
      status: 'completed',
      paymentMethod: 'gcash',
      transactionId: 'txn_123456789',
      billingDetails: {
        name: 'Maria Santos',
        email: 'maria@example.com',
        phone: '+639876543210',
        address: '123 Makati Ave, Makati City',
        country: 'PH',
        tin: '123-456-789-000'
      },
      provider: 'paymongo',
      paidAt: '2024-01-25T10:30:00Z',
      createdAt: '2024-01-25T10:25:00Z',
      receipt: {
        url: 'https://api.design2build.pro/receipts/pay_1.pdf',
        number: 'RCP-2024-001'
      }
    };

    res.json({
      success: true,
      data: payment
    });

  } catch (error) {
    console.error('Payment fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch payment'
    });
  }
});

// Refund payment
router.post('/:id/refund', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, amount } = req.body;

    // Mock refund processing
    const refund = {
      id: `ref_${Date.now()}`,
      paymentId: id,
      amount: amount || 85000,
      currency: 'PHP',
      reason,
      status: 'processing',
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Refund initiated successfully',
      data: refund
    });

  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to process refund'
    });
  }
});

module.exports = router; 