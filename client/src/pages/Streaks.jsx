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
        <div className="min-h-screen bg-gradient-to-br from-[#1f0c2f] to-[#2a0c4e] text-purple-100 font-sans">
            <Navbar />

            <main className="px-6 py-16 max-w-3xl mx-auto animate-fadeUp">
                <h1 className="text-4xl font-extrabold text-center mb-12 tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Your Mood Streak
                </h1>

                <div className="bg-white/5 backdrop-blur-md border border-purple-500 rounded-3xl px-10 py-12 text-center shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5)] transition-all duration-300">
                    <h2 className="text-2xl font-semibold text-purple-200 mb-4">Current Streak</h2>

                    <p className="text-7xl font-bold text-purple-100 mb-4 animate-pulse drop-shadow-md">
                        {streak}
                    </p>
                    <p className="text-md text-purple-300">days of consistent check-ins</p>

                    {streak >= 7 && (
                        <p className="mt-6 text-green-400 font-semibold text-lg animate-fadeIn">
                            🎉 Great job! You've been consistent for a week!
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}
