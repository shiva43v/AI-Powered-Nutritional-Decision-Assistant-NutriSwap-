const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Option 1: Use Cloudinary for cloud storage
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nutriswap',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

// Option 2: Use Local storage for temporary processing by Gemini
// Gemini expects a local file path or base64. We'll use local temp storage, 
// process it with Gemini, upload to Cloudinary for long-term storage if needed, then delete local.
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../uploads/');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: localStorage });

module.exports = upload;
