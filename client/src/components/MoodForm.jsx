import { useState } from 'react';
import axios from 'axios';

const moodOptions = [
    { emoji: '😀', label: 'Happy' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😇', label: 'Grateful' },
];

export default function MoodForm({ onMoodAdded }) {
    const [mood, setMood] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mood) return alert('Please select a mood');
        const token = localStorage.getItem('token');
        await axios.post(
            'http://localhost:5000/api/mood',
            { mood, note },
            { headers: { 'x-auth-token': token } }
        );
        setMood('');
        setNote('');
        onMoodAdded();
    };

    return (
        <section className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.5)] hover:shadow-[0_0_30px_rgba(192,132,252,0.8)] transition-all duration-300 animate-fadeUp">
            <form onSubmit={handleSubmit} className="space-y-8 font-sans text-white">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent tracking-tight">
                    How are you feeling today?
                </h2>

               
                <div>
                    <p className="text-sm text-purple-200 mb-3">Choose a mood:</p>
                    <div className="flex flex-wrap gap-4">
                        {moodOptions.map(({ emoji, label }) => (
                            <button
                                key={label}
                                type="button"
                                onClick={() => setMood(label)}
                                className={`text-3xl p-4 rounded-full border transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_15px_rgba(192,132,252,0.6)] hover:border-purple-300
                  ${mood === label
                                        ? 'border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.9)] scale-110 bg-purple-500/10'
                                        : 'border-gray-500 bg-white/5'
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

               
                <div>
                    <label className="block mb-2 text-sm font-medium text-pink-200">Want to reflect more?</label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write your thoughts here..."
                        rows={4}
                        className="w-full bg-white/5 border border-gray-600 text-white placeholder:text-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    />
                </div>

                
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white py-3 rounded-md font-semibold tracking-wide border border-purple-400 shadow-[0_0_16px_rgba(192,132,252,0.6)] hover:shadow-[0_0_25px_rgba(192,132,252,0.9)] transition duration-300"
                >
                    Submit Mood
                </button>
            </form>
        </section>
    );
}
