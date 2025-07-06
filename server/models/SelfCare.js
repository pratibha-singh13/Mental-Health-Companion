const mongoose = require('mongoose');

const SelfCareSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mood: { type: String },
    note: { type: String },
    sleepHours: { type: Number },
    weight: { type: Number },
    steps: { type: Number },
    pushups: { type: Number },
    exercised: { type: Boolean },
    meditated: { type: Boolean },
    waterIntake: { type: Number },
    journaled: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SelfCare', SelfCareSchema);
