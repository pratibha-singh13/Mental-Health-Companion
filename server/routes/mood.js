const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addMood, getMoods } = require('../controllers/moodController');

router.post('/', auth, addMood);
router.get('/', auth, getMoods);

module.exports = router;
