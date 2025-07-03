const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const AnonymousPost = require('../models/AnonymousPost');

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
        resource_type: 'auto', // image/video
    },
});

const upload = multer({ storage });

// POST: create anonymous post with multiple media
router.post('/', upload.array('media', 5), async (req, res) => {
    try {
        const media = req.files.map(file => ({
            url: file.path,
            type: file.mimetype.startsWith('video') ? 'video' : 'image',
        }));

        const post = new AnonymousPost({
            content: req.body.content,
            media,
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// GET: fetch all posts
router.get('/', async (req, res) => {
    try {
        const posts = await AnonymousPost.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

module.exports = router;
