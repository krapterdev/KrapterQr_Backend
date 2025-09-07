const mongoose = require('mongoose');

const ScanLogSchema = new mongoose.Schema({
  qrCode: { type: mongoose.Schema.Types.ObjectId, ref: 'QrCode', required: true },
  scanTime: { type: Date, default: Date.now },
  location: { type: String }, // Optional: IP-based location or user input
  deviceInfo: { type: String }, // User agent or device details
});

module.exports = mongoose.model('ScanLog', ScanLogSchema);
