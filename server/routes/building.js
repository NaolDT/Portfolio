const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const { getBuilding, createBuilding, updateBuilding, deleteBuilding } = require('../controllers/currentlyBuildingController');

router.get('/',       getBuilding);
router.post('/',      protect, createBuilding);
router.put('/:id',    protect, updateBuilding);
router.delete('/:id', protect, deleteBuilding);

module.exports = router;