const express = require('express');
const router = express.Router();
const { processScan, processTextScan } = require('../controllers/scanController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Routes
router.post('/process', protect, upload.single('image'), processScan);
router.post('/text', protect, processTextScan);

module.exports = router;
