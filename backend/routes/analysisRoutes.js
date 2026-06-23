const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { analyzeResume, analyzeJobDescription } = require('../controllers/analysisController');

const router = express.Router();
router.post('/resume', protect, analyzeResume);
router.post('/job-match', protect, analyzeJobDescription);

module.exports = router;
