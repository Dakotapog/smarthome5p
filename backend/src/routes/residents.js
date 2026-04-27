const express = require('express');
const router = express.Router();
const { listResidents, createResident, updateResident, deleteResident, getAccessLog } = require('../controllers/residentController');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/', authMiddleware, adminOnly, listResidents);
router.post('/', authMiddleware, adminOnly, createResident);
router.put('/:id', authMiddleware, adminOnly, updateResident);
router.delete('/:id', authMiddleware, adminOnly, deleteResident);
router.get('/:id/access-log', authMiddleware, adminOnly, getAccessLog);

module.exports = router;
