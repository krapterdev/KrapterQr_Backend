const QrCode = require('../models/QrCode');
const QRCodeLib = require('qrcode');

// Generate QR Code
exports.createQrCode = async (req, res) => {
  const { type, content, customization } = req.body;
  const userId = req.user.userId; // Assuming middleware sets req.user

  try {
    // Generate QR code Data URL
    const qrCodeDataUrl = await QRCodeLib.toDataURL(content);

    // Save to database
    const newQrCode = new QrCode({
      user: userId,
      type,
      content,
      customization,
    });

    await newQrCode.save();

    res.status(201).json({ qrCodeUrl: qrCodeDataUrl, qrCodeId: newQrCode._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate QR code' });
  }
};

// Get User's QR Codes
exports.getUserQrCodes = async (req, res) => {
  const userId = req.user.userId;
  try {
    const qrCodes = await QrCode.find({ user: userId }).sort({ createdAt: -1 });
    res.json(qrCodes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch QR codes' });
  }
};
