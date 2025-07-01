import { useState } from 'react';
import axios from 'axios';
import MoodFormHero from '../assets/mood-form-hero.png';

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
        <section className="flex flex-col md:flex-row gap-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 transition-all duration-300 hover:shadow-indigo-300/50">
            {/* Optional Hero Image */}
            <img
                src={MoodFormHero}
                alt="Mood Journal"
                className="hidden md:block w-64 rounded-xl object-contain shadow-md"
            />

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <h2 className="text-3xl font-bold text-indigo-700 mb-2">How are you feeling today?</h2>

                {/* Mood Selection */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Select Mood</label>
                    <div className="flex flex-wrap gap-4">
                        {moodOptions.map(({ emoji, label }) => (
                            <button
                                key={label}
                                type="button"
                                onClick={() => setMood(label)}
                                className={`text-3xl p-3 rounded-full border-2 transition duration-200 ${mood === label
                                        ? 'border-indigo-500 bg-indigo-100 scale-105'
                                        : 'border-gray-300 hover:border-indigo-300'
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Add a Note (Optional)</label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Reflect on your mood or describe what you're feeling..."
                        rows={4}
                        className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
                >
                    Submit Mood
                </button>
            </form>
        </section>
    );
}
