const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const createSingletonController = require('../controllers/singletonController');
const AboutContent = require('../models/AboutContent');
const { get, update } = createSingletonController(AboutContent);

router.get('/',  get);
router.put('/',  protect, update);

module.exports = router;