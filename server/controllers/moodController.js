const Mood = require('../models/Mood');

exports.addMood = async (req, res) => {
    const { mood, note } = req.body;

    try {
        const newMood = new Mood({
            userId: req.user.id,
            mood,
            note
        });

        await newMood.save();
        res.json(newMood);
    } catch (err) {
        res.status(500).json({ msg: "Failed to save mood" });
    }
};

exports.getMoods = async (req, res) => {
    try {
        const moods = await Mood.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(moods);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch moods" });
    }
};
