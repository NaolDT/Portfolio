const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const createSingletonController = require('../controllers/singletonController');
const SiteSettings = require('../models/SiteSettings');
const { get, update } = createSingletonController(SiteSettings);

router.get('/',  get);
router.put('/',  protect, update);

module.exports = router;