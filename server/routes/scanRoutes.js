const express = require('express');
const router = express.Router();
const { processScan } = require('../controllers/scanController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// The upload.single('image') middleware handles parsing the multipart/form-data
// and saving the file locally before the controller runs.
router.post('/process', protect, upload.single('image'), processScan);

module.exports = router;
