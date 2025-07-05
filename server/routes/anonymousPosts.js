const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const authMiddleware = require('../middleware/authMiddleware');
const controller = require('../controllers/anonymousPostController');

const router = express.Router();

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'anonymous_posts',
        resource_type: 'auto',
    },
});

const upload = multer({ storage });

// Routes
router.post('/', authMiddleware, upload.array('media', 5), controller.createPost);
router.get('/', controller.getAllPosts);
router.delete('/:id', authMiddleware, controller.deletePost);
router.put('/:id/like', authMiddleware, controller.toggleLike);
router.post('/:id/comment', authMiddleware, controller.addComment);

module.exports = router;