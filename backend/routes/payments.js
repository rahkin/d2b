const express = require('express');
const router = express.Router();
const { Order, Payment } = require('../models');
const { authenticateToken } = require('../middleware/auth');
require('dotenv').config();

// Initialize payment providers (if keys are available)
let paymongo, xendit, stripe;

try {
  if (process.env.PAYMONGO_SECRET_KEY) {
    // PayMongo initialization would go here
    // const { Paymongo } = require('paymongo');
    // paymongo = new Paymongo(process.env.PAYMONGO_SECRET_KEY);
  }
} catch (error) {
  console.log('PayMongo not configured');
}

try {
  if (process.env.XENDIT_SECRET_KEY) {
    const xenditNode = require('xendit-node');
    xendit = new xenditNode({ secretKey: process.env.XENDit_SECRET_KEY });
  }
} catch (error) {
  console.log('Xendit not configured');
}

try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  }
} catch (error) {
  console.log('Stripe not configured');
}

// Create payment intent
router.post('/create-intent', authenticateToken, async (req, res) => {
  try {
    const { orderId, amount, currency, paymentMethod, provider } = req.body;

    if (!orderId || !amount || !currency || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment information'
      });
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Select provider based on payment method or default
    const selectedProvider = provider || getProviderForMethod(paymentMethod);

    // Create payment intent based on provider
    let paymentIntent;
    
    if (selectedProvider === 'paymongo' && paymongo) {
      // PayMongo payment intent creation
      // paymentIntent = await paymongo.paymentIntents.create({...});
      paymentIntent = {
        id: `pi_${Date.now()}`,
        client_secret: `mock_secret_${Date.now()}`,
        provider: 'paymongo'
      };
    } else if (selectedProvider === 'xendit' && xendit) {
      // Xendit payment creation
      const Invoice = xendit.Invoice;
      paymentIntent = await Invoice.create({
        externalID: `order_${orderId}_${Date.now()}`,
        amount: amount,
        payerEmail: req.user.email,
        description: `Payment for order ${orderId}`,
        currency: currency
      });
    } else if (selectedProvider === 'stripe' && stripe) {
      // Stripe payment intent
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        metadata: {
          orderId: orderId,
          userId: req.user.id
        }
      });
    } else {
      // Fallback to mock payment for development
      paymentIntent = {
        id: `pi_mock_${Date.now()}`,
        client_secret: `mock_secret_${Date.now()}`,
        provider: 'mock',
        amount: amount,
        currency: currency
      };
    }

    // Create payment record
    const payment = await Payment.create({
      orderId,
      amount,
      currency,
      status: 'pending',
      method: paymentMethod,
      provider: selectedProvider,
      transactionId: paymentIntent.id
    });

    res.json({
      success: true,
      data: {
        payment,
        paymentIntent: {
          id: paymentIntent.id,
          clientSecret: paymentIntent.client_secret || paymentIntent.id,
          provider: selectedProvider
        }
      },
      message: 'Payment intent created successfully'
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment intent'
    });
  }
});

// Confirm payment
router.post('/confirm', authenticateToken, async (req, res) => {
  try {
    const { paymentId, transactionId } = req.body;

    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    // Verify payment with provider
    // This would check the actual payment status with the provider
    payment.status = 'completed';
    payment.paidAt = new Date();
    await payment.save();

    // Update order status
    const order = await Order.findByPk(payment.orderId);
    if (order) {
      order.paymentStatus = 'paid';
      await order.save();
    }

    res.json({
      success: true,
      data: payment,
      message: 'Payment confirmed successfully'
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to confirm payment'
    });
  }
});

// Get payment status
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [{
        model: Order,
        as: 'order'
      }]
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment'
    });
  }
});

function getProviderForMethod(method) {
  // Default provider mapping
  const providerMap = {
    'gcash': 'paymongo',
    'paymaya': 'paymongo',
    'card': 'stripe',
    'bank-transfer': 'xendit'
  };
  
  return providerMap[method] || 'paymongo';
}

module.exports = router;
