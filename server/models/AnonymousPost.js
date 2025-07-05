const mongoose = require('mongoose');

const anonymousPostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    media: [
        {
            url: String,
            type: {
                type: String, // 'image' or 'video'
                enum: ['image', 'video'],
            },
        },
    ],
    reactions: {
        type: Number,
        default: 0,
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    comments: [
        {
            text: String,
            timestamp: { type: Date, default: Date.now },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false,
            },
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AnonymousPost', anonymousPostSchema);