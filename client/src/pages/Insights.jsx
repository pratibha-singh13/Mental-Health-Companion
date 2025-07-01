import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const moodToScore = {
    Happy: 5,
    Grateful: 4,
    Relaxed: 3,
    Anxious: 2,
    Sad: 1,
    Angry: 0
};

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
}

export default function Insights() {
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

    const chartData = moods
        .map((mood) => ({
            date: formatDate(mood.date),
            score: moodToScore[mood.mood] || 2.5
        }))
        .reverse(); // chronological order

    return (
        <div className="min-h-screen bg-[#f9fafb] text-gray-800 font-sans">
            <Navbar />

            <main className="px-6 py-12 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-indigo-700">Mood Insights</h1>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mood Progress Chart</h2>

                    {chartData.length === 0 ? (
                        <p className="text-gray-500 italic">Not enough data yet. Start tracking your mood!</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                                <Tooltip
                                    formatter={(value) => {
                                        const moodLabel =
                                            Object.entries(moodToScore).find(([k, v]) => v === value)?.[0] || value;
                                        return [moodLabel, 'Mood'];
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ r: 5, fill: '#6366f1' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </main>
        </div>
    );
}
