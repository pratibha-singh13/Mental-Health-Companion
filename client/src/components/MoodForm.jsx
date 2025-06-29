import { useState } from 'react';
import axios from 'axios';
import MoodFormHero from '../assets/mood-form-hero.png'; // Add a mental health journal SVG here

export default function MoodForm({ onMoodAdded }) {
    const [mood, setMood] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post(
            'http://localhost:5000/api/mood',
            { mood, note },
            {
                headers: { 'x-auth-token': token },
            }
        );
        setMood('');
        setNote('');
        onMoodAdded();
    };

    return (
        <section className="flex flex-col md:flex-row gap-10 bg-white/60 backdrop-blur-sm rounded-2xl shadow-glass p-6 md:p-10 transition-all duration-300 hover:shadow-2xl">
            {/* Optional Hero Image */}
            <img
                src={MoodFormHero}
                alt="Mood Journal"
                className="hidden md:block w-64 rounded-xl object-contain"
            />

            {/* Form Content */}
            <form
                onSubmit={handleSubmit}
                className="w-full animate__animated animate__fadeIn"
            >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    How are you feeling today?
                </h2>

                <div className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Mood
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Relaxed, Stressed"
                            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Notes
                        </label>
                        <textarea
                            placeholder="Write something about your mood..."
                            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={4}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-primary text-white w-full py-3 rounded-md font-semibold hover:bg-indigo-600 transition duration-300"
                    >
                        Submit Mood
                    </button>
                </div>
            </form>
        </section>
    );
}
