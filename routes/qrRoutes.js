const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, qrController.createQrCode);
router.get('/', authMiddleware, qrController.getUserQrCodes);
router.get('/count', authMiddleware, qrController.getQrCodeCount);
router.put('/:id', authMiddleware, qrController.updateQrCode);
router.delete('/:id', authMiddleware, qrController.deleteQrCode);

module.exports = router;
