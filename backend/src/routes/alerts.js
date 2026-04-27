const express = require('express');
const router = express.Router();
const { getAlerts, getActiveAlerts, resolveAlert, simulateAlert } = require('../controllers/alertController');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/', authMiddleware, getAlerts);
router.get('/active', authMiddleware, getActiveAlerts);
router.put('/:id/resolve', authMiddleware, adminOnly, resolveAlert);
router.post('/simulate', authMiddleware, simulateAlert);

module.exports = router;
