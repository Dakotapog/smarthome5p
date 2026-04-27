const express = require('express');
const router = express.Router();
const { getWaterByFloor, getWaterHistory } = require('../controllers/waterController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, getWaterByFloor);
router.get('/history', authMiddleware, getWaterHistory);

module.exports = router;
