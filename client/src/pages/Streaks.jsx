import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';


function calculateStreak(entries) {
    if (!entries.length) return 0;

    const sorted = [...entries].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    let streak = 1;
    let prevDate = new Date(sorted[0].createdAt);
    prevDate.setHours(0, 0, 0, 0);
    for (let i = 1; i < sorted.length; i++) {
        const currentDate = new Date(sorted[i].createdAt);
        currentDate.setHours(0, 0, 0, 0);

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
    const [entries, setEntries] = useState([]);

    const fetchEntries = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/selfcare', {
            headers: { 'x-auth-token': token }
        });
        setEntries(res.data);
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const streak = useMemo(() => calculateStreak(entries), [entries]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1f0c2f] to-[#2a0c4e] text-purple-100 font-sans">
            <Navbar />

            <main className="px-6 py-16 max-w-3xl mx-auto animate-fadeUp">
                <h1 className="text-4xl font-extrabold text-center mb-12 tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Your Self-Care Streak
                </h1>

                <div className="bg-white/5 backdrop-blur-md border border-purple-500 rounded-3xl px-10 py-12 text-center shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5)] transition-all duration-300">
                    <h2 className="text-2xl font-semibold text-purple-200 mb-4">Current Streak</h2>

                    <p className="text-7xl font-bold text-purple-100 mb-4 animate-pulse drop-shadow-md">
                        {streak}
                    </p>
                    <p className="text-md text-purple-300">days of consistent self-care check-ins</p>

                    {streak >= 7 && (
                        <p className="mt-6 text-green-400 font-semibold text-lg animate-fadeIn">
                            🎉 Amazing! You've checked in for a full week!
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}
