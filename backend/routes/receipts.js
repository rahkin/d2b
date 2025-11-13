const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { Receipt, Order } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { generateReceiptPDF } = require('../utils/pdfGenerator');

// Generate BIR-compliant receipt
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { orderId, tin, amount, vat } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Order ID and amount are required'
      });
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Calculate VAT if not provided (12% for Philippines)
    const calculatedVat = vat || (amount * 0.12);
    const totalAmount = amount + calculatedVat;

    // Generate receipt number (format: REC-YYYYMMDD-XXXXX)
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const receiptNumber = `REC-${dateStr}-${randomNum}`;

    // Get company info from environment
    const companyName = process.env.COMPANY_NAME || 'Design2Build.Pro';
    const companyAddress = process.env.COMPANY_ADDRESS || 'Manila, Philippines';
    const birTin = process.env.BIR_TIN || tin;

    const receipt = await Receipt.create({
      orderId,
      receiptNumber,
      tin: birTin,
      amount,
      vat: calculatedVat,
      totalAmount,
      currency: order.currency || 'PHP',
      isBIRCompliant: true
    });

    // Generate PDF receipt (simplified - in production, use a library like pdfkit)
    const receiptData = {
      receiptNumber,
      date: date.toLocaleDateString('en-PH', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      companyName,
      companyAddress,
      tin: birTin,
      orderNumber: order.id,
      items: order.items,
      subtotal: amount,
      vat: calculatedVat,
      total: totalAmount,
      currency: order.currency || 'PHP',
      // BIR required fields
      birCompliant: true,
      orNumber: receiptNumber,
      serialNumber: `SN-${dateStr}`,
      tin: birTin
    };

    // Generate PDF
    try {
      const pdfResult = await generateReceiptPDF(receiptData);
      receipt.pdfUrl = pdfResult.url;
      await receipt.save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Continue without PDF if generation fails
    }

    res.json({
      success: true,
      data: {
        receipt,
        receiptData,
        pdfUrl
      },
      message: 'Receipt generated successfully'
    });
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate receipt'
    });
  }
});

// Get receipt
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const receipt = await Receipt.findByPk(req.params.id, {
      include: [{
        model: Order,
        as: 'order'
      }]
    });

    if (!receipt) {
      return res.status(404).json({
        success: false,
        error: 'Receipt not found'
      });
    }

    res.json({
      success: true,
      data: receipt
    });
  } catch (error) {
    console.error('Error fetching receipt:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch receipt'
    });
  }
});

// Get receipt PDF
router.get('/:id/pdf', async (req, res) => {
  try {
    const receipt = await Receipt.findByPk(req.params.id, {
      include: [{
        model: Order,
        as: 'order'
      }]
    });

    if (!receipt) {
      return res.status(404).json({
        success: false,
        error: 'Receipt not found'
      });
    }

    // If PDF exists, serve it
    if (receipt.pdfUrl) {
      const filePath = path.join(__dirname, '../../', receipt.pdfUrl);
      
      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${receipt.receiptNumber}.pdf"`);
        return fs.createReadStream(filePath).pipe(res);
      }
    }

    // Generate PDF if it doesn't exist
    const order = receipt.order;
    const receiptData = {
      receiptNumber: receipt.receiptNumber,
      date: receipt.createdAt.toLocaleDateString('en-PH', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      companyName: process.env.COMPANY_NAME || 'Design2Build.Pro',
      companyAddress: process.env.COMPANY_ADDRESS || 'Manila, Philippines',
      tin: receipt.tin || process.env.BIR_TIN,
      orderNumber: order?.id || 'N/A',
      items: order?.items || [],
      subtotal: receipt.amount,
      vat: receipt.vat,
      total: receipt.totalAmount,
      currency: receipt.currency
    };

    const pdfResult = await generateReceiptPDF(receiptData);
    receipt.pdfUrl = pdfResult.url;
    await receipt.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${receipt.receiptNumber}.pdf"`);
    fs.createReadStream(pdfResult.filePath).pipe(res);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate PDF'
    });
  }
});

module.exports = router;

