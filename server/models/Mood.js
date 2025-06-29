const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mood: { type: String, required: true }, // e.g., happy, sad
    note: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mood', MoodSchema);
