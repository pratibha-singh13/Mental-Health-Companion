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
            const res = await axios.post('https://mental-health-companion-oy12.onrender.com/api/ai/suggest', { mood });

            setSuggestion(res.data.suggestion);
        } catch (err) {
            alert('Failed to fetch suggestions');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1f0c2f] to-[#2a0c4e] text-purple-100 font-sans">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-12 animate-fadeIn">
                <h1 className="text-4xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Personalized Self-Care
                </h1>
                <p className="mb-8 text-lg text-purple-300">
                    Let us suggest something supportive based on your current mood.
                </p>

               
                <div className="bg-white/5 backdrop-blur-md border border-purple-500 rounded-2xl px-6 py-8 space-y-6 
                                shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5)] 
                                transition-all duration-500">

                   
                    <input
                        className="w-full bg-white/10 text-purple-100 placeholder-purple-300 px-4 py-3 rounded-lg 
                                   border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 
                                   transition"
                        placeholder="e.g., I feel anxious, tired, overwhelmed..."
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                    />

                    
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white px-6 py-3 
                                   rounded-lg font-semibold hover:scale-105 
                                   hover:shadow-[0_0_15px_rgba(192,132,252,0.5)] transition-all duration-300"
                    >
                        {loading ? 'Thinking...' : 'Get Suggestions'}
                    </button>

                   
                    {suggestion && (
                        <div className="mt-8 bg-purple-900/10 border border-purple-400 text-purple-100 px-5 py-6 
                                        rounded-xl shadow-md animate-fadeUp whitespace-pre-line transition">
                            <h3 className="text-lg font-semibold mb-2 text-purple-200">Your AI Suggestion:</h3>
                            <p className="text-purple-100 leading-relaxed">{suggestion}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
