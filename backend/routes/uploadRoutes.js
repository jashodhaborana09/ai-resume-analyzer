const fs = require('fs');
const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { uploadResume } = require('../controllers/uploadController');
const path = require('path');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `${req.user.id}-${timestamp}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowedTypes.includes(ext));
  },
});

const router = express.Router();
router.post('/', protect, upload.single('resume'), uploadResume);

module.exports = router;
