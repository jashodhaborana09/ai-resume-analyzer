const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getHistory, getHistoryById, deleteHistory, downloadReport } = require('../controllers/historyController');

const router = express.Router();

router.get('/', protect, getHistory);
router.get('/:id', protect, getHistoryById);
router.get('/:id/report', protect, downloadReport);
router.delete('/:id', protect, deleteHistory);

module.exports = router;
