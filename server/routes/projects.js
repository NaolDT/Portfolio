const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const upload   = require('../middleware/upload');
const {
  getProjects, getProject, createProject, updateProject, deleteProject,
} = require('../controllers/projectController');

// Debug middleware — logs what multer receives
const debugMulter = (req, res, next) => {
  console.log('=== PROJECTS ROUTE HIT ===');
  console.log('method:', req.method);
  console.log('content-type:', req.headers['content-type']);
  console.log('req.file:', req.file);
  console.log('req.body keys:', Object.keys(req.body || {}));
  next();
};

router.get('/',       getProjects);
router.get('/:id',    getProject);
router.post('/',      protect, upload.single('image'), debugMulter, createProject);
router.put('/:id',    protect, upload.single('image'), debugMulter, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;