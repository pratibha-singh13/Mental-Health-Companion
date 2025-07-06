const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');


router.post('/register', register);
router.post('/login', login);


router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ id: user._id, username: user.username });
    } catch (err) {
        console.error('Error in /me route:', err);
        res.status(500).json({ msg: 'Failed to fetch user info' });
    }
});

module.exports = router;
