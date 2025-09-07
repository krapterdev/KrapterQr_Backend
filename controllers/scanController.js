const ScanLog = require('../models/ScanLog');

// Log a Scan
exports.logScan = async (req, res) => {
  const { qrCodeId, location, deviceInfo } = req.body;

  try {
    const newScan = new ScanLog({
      qrCode: qrCodeId,
      location,
      deviceInfo,
    });
    await newScan.save();
    res.status(201).json({ message: 'Scan logged' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to log scan' });
  }
};

// Get Scan Analytics for a QR Code
exports.getScanAnalytics = async (req, res) => {
  const { qrCodeId } = req.params;

  try {
    const scans = await ScanLog.find({ qrCode: qrCodeId }).sort({ scanTime: -1 });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get analytics' });
  }
};
