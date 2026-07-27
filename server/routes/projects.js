const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');

router.get('/',       getProjects);
router.post('/',      protect, createProject);
router.put('/:id',    protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;