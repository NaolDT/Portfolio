const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/auth');
const createSingletonController = require('../controllers/singletonController');
const Education = require('../models/Education');
const { get, update } = createSingletonController(Education);

router.get('/',  get);
router.put('/',  protect, update);

module.exports = router;