const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, qrController.createQrCode);
router.get('/', authMiddleware, qrController.getUserQrCodes);

module.exports = router;
