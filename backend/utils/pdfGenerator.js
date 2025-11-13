const PDFDocument = require('pdfkit');
const fs = require('fs').promises;
const path = require('path');

/**
 * Generate BIR-compliant receipt PDF
 */
async function generateReceiptPDF(receiptData) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        size: 'LETTER',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });

      // Create output directory if it doesn't exist
      const outputDir = path.join(__dirname, '../../uploads/receipts');
      await fs.mkdir(outputDir, { recursive: true });
      const fileName = `receipt-${receiptData.receiptNumber}-${Date.now()}.pdf`;
      const filePath = path.join(outputDir, fileName);
      const stream = require('fs').createWriteStream(filePath);
        
        doc.pipe(stream);

        // Header
        doc.fontSize(20).font('Helvetica-Bold')
          .text(process.env.COMPANY_NAME || 'Design2Build.Pro', { align: 'center' });
        
        doc.moveDown(0.5);
        doc.fontSize(10).font('Helvetica')
          .text(process.env.COMPANY_ADDRESS || 'Manila, Philippines', { align: 'center' });
        
        doc.fontSize(9)
          .text(`TIN: ${receiptData.tin || 'N/A'}`, { align: 'center' });
        
        doc.moveDown(1);

        // Receipt Title
        doc.fontSize(16).font('Helvetica-Bold')
          .text('OFFICIAL RECEIPT', { align: 'center' });
        
        doc.moveDown(1);

        // Receipt Details
        doc.fontSize(10).font('Helvetica')
          .text(`Receipt Number: ${receiptData.receiptNumber}`, { align: 'left' })
          .text(`Date: ${receiptData.date}`, { align: 'left' })
          .text(`Order Number: ${receiptData.orderNumber}`, { align: 'left' });
        
        doc.moveDown(1);

        // Items Table Header
        doc.fontSize(9).font('Helvetica-Bold')
          .text('Description', 50, doc.y)
          .text('Amount', 450, doc.y, { align: 'right' });
        
        doc.moveDown(0.5);
        doc.moveTo(50, doc.y)
          .lineTo(550, doc.y)
          .stroke();
        
        doc.moveDown(0.5);

        // Items
        let totalAmount = 0;
        receiptData.items.forEach((item, index) => {
          const itemTotal = item.quantity * item.unitPrice;
          totalAmount += itemTotal;
          
          doc.fontSize(9).font('Helvetica')
            .text(`${item.name} (${item.quantity} x ${item.unitPrice.toLocaleString('en-PH', { style: 'currency', currency: receiptData.currency })})`, 50, doc.y)
            .text(itemTotal.toLocaleString('en-PH', { style: 'currency', currency: receiptData.currency }), 450, doc.y, { align: 'right' });
          
          doc.moveDown(0.5);
        });

        doc.moveDown(0.5);
        doc.moveTo(50, doc.y)
          .lineTo(550, doc.y)
          .stroke();
        doc.moveDown(0.5);

        // Totals
        const subtotal = receiptData.subtotal || totalAmount;
        const vat = receiptData.vat || 0;
        const total = receiptData.total || (subtotal + vat);

        doc.fontSize(10).font('Helvetica')
          .text('Subtotal:', 350, doc.y)
          .text(subtotal.toLocaleString('en-PH', { style: 'currency', currency: receiptData.currency }), 450, doc.y, { align: 'right' });
        
        doc.moveDown(0.5);
        doc.text('VAT (12%):', 350, doc.y)
          .text(vat.toLocaleString('en-PH', { style: 'currency', currency: receiptData.currency }), 450, doc.y, { align: 'right' });
        
        doc.moveDown(0.5);
        doc.fontSize(12).font('Helvetica-Bold')
          .text('Total:', 350, doc.y)
          .text(total.toLocaleString('en-PH', { style: 'currency', currency: receiptData.currency }), 450, doc.y, { align: 'right' });

        doc.moveDown(2);

        // BIR Compliance Footer
        doc.fontSize(8).font('Helvetica')
          .text('This document is BIR-compliant and serves as an official receipt.', { align: 'center' })
          .text('For inquiries, contact: ' + (process.env.COMPANY_NAME || 'Design2Build.Pro'), { align: 'center' });

        doc.end();

        stream.on('finish', () => {
          resolve({
            filePath,
            fileName,
            url: `/uploads/receipts/${fileName}`
          });
        });

        stream.on('error', (error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { generateReceiptPDF };

