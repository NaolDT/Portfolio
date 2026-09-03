const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const { certUpload } = require('../middleware/upload');
const { getEducation, updateEducation } = require('../controllers/educationController');

// certUpload.fields allows named file fields per certification
router.get('/',  getEducation);
router.put('/',  protect, certUpload.fields([
  { name: 'certFile_0', maxCount: 1 },
  { name: 'certFile_1', maxCount: 1 },
  { name: 'certFile_2', maxCount: 1 },
  { name: 'certFile_3', maxCount: 1 },
  { name: 'certFile_4', maxCount: 1 },
  { name: 'certFile_5', maxCount: 1 },
  { name: 'certFile_6', maxCount: 1 },
  { name: 'certFile_7', maxCount: 1 },
  { name: 'certFile_8', maxCount: 1 },
  { name: 'certFile_9', maxCount: 1 },
]), updateEducation);

module.exports = router;