const AnonymousPost = require('../models/AnonymousPost');


exports.createPost = async (req, res) => {
    try {
        const media = req.files.map(file => ({
            url: file.path,
            type: file.mimetype.startsWith('video') ? 'video' : 'image',
        }));

        const post = new AnonymousPost({
            content: req.body.content,
            media,
            owner: req.user?.id || null,
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

// Fetch all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await AnonymousPost.find()
            .populate('owner', 'username')
            .populate('comments.author', 'username')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const post = await AnonymousPost.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        if (post.owner?.toString() !== req.user.id)
            return res.status(403).json({ msg: 'Unauthorized' });

        await post.deleteOne();
        res.json({ msg: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};

// Like/unlike post
exports.toggleLike = async (req, res) => {
    try {
        const post = await AnonymousPost.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const userId = req.user.id;
        if (post.likedBy.includes(userId)) {
            post.likedBy.pull(userId);
        } else {
            post.likedBy.push(userId);
        }

        post.reactions = post.likedBy.length;
        await post.save();
        res.json({ msg: 'Reaction updated', reactions: post.reactions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to react to post' });
    }
};

// Add comment
exports.addComment = async (req, res) => {
    try {
        const post = await AnonymousPost.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const comment = {
            text: req.body.text,
            author: req.user?.id || null,
        };

        post.comments.push(comment);
        await post.save();

        res.status(201).json({ msg: 'Comment added', comments: post.comments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add comment' });
    }
};
