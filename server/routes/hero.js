const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const createSingletonController = require('../controllers/singletonController');
const HeroContent = require('../models/HeroContent');
const { get, update } = createSingletonController(HeroContent);

router.get('/',  get);
router.put('/',  protect, update);

module.exports = router;