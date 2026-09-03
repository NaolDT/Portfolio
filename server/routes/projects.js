const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const { imageUpload } = require('../middleware/upload');
const {
  getProjects, getProject, createProject, updateProject, deleteProject,
} = require('../controllers/projectController');

router.get('/',       getProjects);
router.get('/:id',    getProject);
router.post('/',      protect, imageUpload.array('images', 5), createProject);
router.put('/:id',    protect, imageUpload.array('images', 5), updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;