const QrCode = require('../models/QrCode');
const QRCodeLib = require('qrcode');

// Generate QR Code
exports.createQrCode = async (req, res) => {
  const { type, content, customization } = req.body;
  const userId = req.user.userId;

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

// Get total QR codes count for logged-in user
exports.getQrCodeCount = async (req, res) => {
  try {
    const count = await QrCode.countDocuments({ user: req.user.userId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get QR code count' });
  }
};

// Update QR Code
exports.updateQrCode = async (req, res) => {
  const qrCodeId = req.params.id;
  const userId = req.user.userId;
  const { type, content, customization } = req.body;

  try {
    const qrCode = await QrCode.findOne({ _id: qrCodeId, user: userId });
    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    qrCode.type = type || qrCode.type;
    qrCode.content = content || qrCode.content;
    qrCode.customization = customization || qrCode.customization;

    await qrCode.save();

    res.json({ message: 'QR code updated successfully' });
  } catch (error) {
    console.error('Update QR code error:', error);
    res.status(500).json({ message: 'Failed to update QR code' });
  }
};

// Delete QR Code
exports.deleteQrCode = async (req, res) => {
  const qrCodeId = req.params.id;
  const userId = req.user.userId;

  try {
    const qrCode = await QrCode.findOneAndDelete({ _id: qrCodeId, user: userId });
    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }
    res.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    console.error('Delete QR code error:', error);
    res.status(500).json({ message: 'Failed to delete QR code' });
  }
};
