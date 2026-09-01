const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const { getStats, createStat, updateStat, deleteStat } = require('../controllers/quickStatController');

router.get('/',       getStats);
router.post('/',      protect, createStat);
router.put('/:id',    protect, updateStat);
router.delete('/:id', protect, deleteStat);

module.exports = router;