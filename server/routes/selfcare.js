const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createSelfCareEntry,
    getUserSelfCareEntries,
} = require('../controllers/selfCareController');

// @route   POST /api/selfcare
// @desc    Create a self-care entry
// @access  Private
router.post('/', auth, createSelfCareEntry);

// @route   GET /api/selfcare
// @desc    Get all entries of logged-in user
// @access  Private
router.get('/', auth, getUserSelfCareEntries);

module.exports = router;
