import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

const moodToScore = {
    Happy: 5,
    Grateful: 4,
    Relaxed: 3,
    Anxious: 2,
    Sad: 1,
    Angry: 0
};

const COLORS = ['#c084fc', '#a78bfa', '#818cf8', '#f472b6', '#facc15', '#34d399'];

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
}

function filterByTimeRange(data, range) {
    const now = new Date();
    return data.filter((item) => {
        const date = new Date(item.date || item.createdAt);
        if (range === 'week') {
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            return date >= oneWeekAgo;
        } else if (range === 'month') {
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        } else if (range === 'year') {
            return date.getFullYear() === now.getFullYear();
        }
        return true;
    });
}

export default function Insights() {
    const [moods, setMoods] = useState([]);
    const [filter, setFilter] = useState('all');

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

    const filteredMoods = filterByTimeRange(moods, filter);

    const chartData = filteredMoods
        .map((mood) => ({
            date: formatDate(mood.date || mood.createdAt),
            score: moodToScore[mood.mood] || 2.5
        }))
        .reverse();

    const pieData = Object.entries(
        filteredMoods.reduce((acc, mood) => {
            acc[mood.mood] = (acc[mood.mood] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    const weeklyData = {};
    filteredMoods.forEach((m) => {
        const date = new Date(m.date || m.createdAt);
        const week = `W${Math.ceil(date.getDate() / 7)}-${date.getMonth() + 1}`;
        if (!weeklyData[week]) weeklyData[week] = [];
        weeklyData[week].push(moodToScore[m.mood] || 2.5);
    });

    const barData = Object.entries(weeklyData).map(([label, moods]) => ({
        label,
        avgMood: +(moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(2)
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1f0c2f] to-[#2a0c4e] text-purple-100 font-sans">
            <Navbar />

            <main className="px-6 py-12 max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Mood Insights
                </h1>

                {/* Filter dropdown */}
                <div className="mb-8">
                    <label className="mr-3 font-medium text-purple-200">Filter by:</label>
                    <select
                        className="bg-white/10 border border-purple-400 text-purple-100 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                        <option value="all">All Time</option>
                    </select>
                </div>

                {/* Line Chart */}
                <div className="bg-white/5 backdrop-blur-md border border-purple-500 rounded-2xl px-6 py-8 shadow-[0_0_20px_rgba(192,132,252,0.2)] hover:shadow-[0_0_30px_rgba(192,132,252,0.4)] transition mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-100">Mood Trend</h2>
                    {chartData.length === 0 ? (
                        <p className="text-purple-300 italic">Not enough data yet. Start tracking your mood!</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                                <XAxis dataKey="date" stroke="#d8b4fe" />
                                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} stroke="#d8b4fe" />
                                <Tooltip
                                    contentStyle={{ background: '#3b0764', borderColor: '#a855f7', color: '#fff' }}
                                    formatter={(value) => {
                                        const moodLabel = Object.entries(moodToScore).find(([k, v]) => v === value)?.[0] || value;
                                        return [moodLabel, 'Mood'];
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#c084fc"
                                    strokeWidth={3}
                                    dot={{ r: 5, fill: '#c084fc' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Pie Chart */}
                <div className="bg-white/5 backdrop-blur-md border border-purple-500 rounded-2xl px-6 py-8 shadow-[0_0_20px_rgba(192,132,252,0.2)] hover:shadow-[0_0_30px_rgba(192,132,252,0.4)] transition mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-100">Mood Distribution</h2>
                    {pieData.length === 0 ? (
                        <p className="text-purple-300 italic">No moods recorded yet.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label fill="#fff">
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: '#3b0764', borderColor: '#a855f7', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Bar Chart */}
                <div className="bg-white/5 backdrop-blur-md border border-purple-500 rounded-2xl px-6 py-8 shadow-[0_0_20px_rgba(192,132,252,0.2)] hover:shadow-[0_0_30px_rgba(192,132,252,0.4)] transition">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-100">Weekly Mood Averages</h2>
                    {barData.length === 0 ? (
                        <p className="text-purple-300 italic">Not enough data yet.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                                <XAxis dataKey="label" stroke="#d8b4fe" />
                                <YAxis stroke="#d8b4fe" />
                                <Tooltip contentStyle={{ background: '#3b0764', borderColor: '#a855f7', color: '#fff' }} />
                                <Bar dataKey="avgMood" fill="#c084fc" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </main>
        </div>
    );
}
