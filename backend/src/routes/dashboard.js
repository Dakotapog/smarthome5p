const express = require('express');
const router = express.Router();
const { getBuilding, getGatewayMode } = require('../controllers/dashboardController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, getBuilding);
router.get('/gateway-mode', authMiddleware, getGatewayMode);

module.exports = router;
