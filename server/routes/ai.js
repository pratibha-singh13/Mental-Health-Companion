const express = require('express');
const axios = require('axios');
const router = express.Router();
//jhjhjh
router.post('/suggest', async (req, res) => {
    const { mood } = req.body;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Suggest a personalized self-care or journaling activity for someone feeling "${mood}".`
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const suggestion =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Try journaling your thoughts or take 10 minutes to meditate.';

        res.json({ suggestion });
    } catch (err) {
        console.error('Gemini AI error:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to get suggestion from Gemini AI' });
    }
});

module.exports = router;
