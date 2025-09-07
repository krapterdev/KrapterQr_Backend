const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/log', scanController.logScan);
router.get('/:qrCodeId', authMiddleware, scanController.getScanAnalytics);

module.exports = router;
