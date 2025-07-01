import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function SelfCare() {
    const [mood, setMood] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!mood.trim()) return alert("Enter how you're feeling");
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/ai/suggest', { mood });
            setSuggestion(res.data.suggestion); // 🔥 FIXED
        } catch (err) {
            alert('Failed to fetch suggestions');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 text-gray-800 font-sans">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-10 animate-fadeIn">
                <h1 className="text-4xl font-bold mb-6 text-indigo-700">Personalized Self-Care</h1>
                <p className="mb-4 text-lg text-gray-600">Let us suggest something supportive based on your current mood.</p>

                <div className="bg-white shadow-lg p-6 rounded-xl space-y-4 transition-all">
                    <input
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="e.g., I feel anxious, tired, overwhelmed..."
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                    />
                    <button
                        onClick={handleGenerate}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        disabled={loading}
                    >
                        {loading ? 'Thinking...' : 'Get Suggestions'}
                    </button>

                    {suggestion && (
                        <div className="mt-6 border-t pt-4 space-y-2 text-gray-700 whitespace-pre-line">
                            <h3 className="font-semibold text-lg">Your AI Suggestion:</h3>
                            <p className="text-gray-800">{suggestion}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
