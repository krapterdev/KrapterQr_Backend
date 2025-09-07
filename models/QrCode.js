const mongoose = require('mongoose');

const QrCodeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., 'url', 'text'
  content: { type: String, required: true },
  customization: {
    logo: String,
    color: String,
    frame: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QrCode', QrCodeSchema);
