const SelfCare = require('../models/SelfCare');

exports.createSelfCareEntry = async (req, res) => {
    const userId = req.user.id; // from auth middleware
    const {
        mood,
        note,
        sleepHours,
        weight,
        steps,
        pushups,
        exercised,
        meditated,
        waterIntake,
        journaled,
    } = req.body;

    try {
        const entry = new SelfCare({
            userId,
            mood,
            note,
            sleepHours,
            weight,
            steps,
            pushups,
            exercised,
            meditated,
            waterIntake,
            journaled,
        });

        await entry.save();
        res.status(201).json({ msg: 'Self-care entry logged successfully', entry });
    } catch (err) {
        console.error('Error creating self-care entry:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getUserSelfCareEntries = async (req, res) => {
    const userId = req.user.id;

    try {
        const entries = await SelfCare.find({ userId }).sort({ createdAt: -1 });
        res.json(entries);
    } catch (err) {
        console.error('Error fetching self-care entries:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};
