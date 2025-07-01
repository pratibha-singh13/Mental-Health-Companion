import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function calculateStreak(moods) {
    if (!moods.length) return 0;

    const sorted = [...moods].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    let streak = 1;
    let prevDate = new Date(sorted[0].createdAt);

    for (let i = 1; i < sorted.length; i++) {
        const currentDate = new Date(sorted[i].createdAt);
        const diffInDays = Math.floor((prevDate - currentDate) / (1000 * 60 * 60 * 24));

        if (diffInDays === 1) {
            streak++;
            prevDate = currentDate;
        } else if (diffInDays > 1) {
            break;
        }
    }

    return streak;
}

export default function Streaks() {
    const [moods, setMoods] = useState([]);

    const fetchMoods = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/mood', {
            headers: { 'x-auth-token': token }
        });
        setMoods(res.data);
    };

    useEffect(() => {
        fetchMoods();
    }, []);

    const streak = useMemo(() => calculateStreak(moods), [moods]);

    return (
        <div className="min-h-screen bg-[#f9fafb] text-gray-800 font-sans">
            <Navbar />

            <main className="px-6 py-12 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-10 text-indigo-700 text-center">Your Mood Streak 🔥</h1>

                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Current Streak</h2>
                    <p className="text-6xl font-bold text-gray-900 mb-2">{streak}</p>
                    <p className="text-md text-gray-500">days of consistent check-ins</p>

                    {streak >= 7 && (
                        <p className="mt-6 text-green-600 font-semibold">🎉 Great job! You've been consistent for a week!</p>
                    )}
                </div>
            </main>
        </div>
    );
}
