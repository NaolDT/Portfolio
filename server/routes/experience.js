const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');

router.get('/',       getExperiences);
router.post('/',      protect, createExperience);
router.put('/:id',    protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;