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
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from 'recharts';

const moodToScore = {
    Happy: 5,
    Grateful: 4,
    Relaxed: 3,
    Anxious: 2,
    Sad: 1,
    Angry: 0
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
}

function filterByTimeRange(data, range) {
    const now = new Date();
    return data.filter((item) => {
        const date = new Date(item.date || item.createdAt); // ✅ fixed here

        if (range === 'week') {
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            return date >= oneWeekAgo;
        } else if (range === 'month') {
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        } else if (range === 'year') {
            return date.getFullYear() === now.getFullYear();
        }

        return true; // All time
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
        console.log("Fetched moods:", res.data); // ✅ helpful debug
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
        <div className="min-h-screen bg-[#f9fafb] text-gray-800 font-sans">
            <Navbar />

            <main className="px-6 py-12 max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-indigo-700">Mood Insights</h1>

                <div className="mb-6">
                    <label className="mr-3 font-medium">Filter by:</label>
                    <select
                        className="border px-3 py-2 rounded-md"
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
                <div className="bg-white p-6 rounded-2xl shadow-md mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mood Trend</h2>
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

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mood Distribution</h2>
                    {pieData.length === 0 ? (
                        <p className="text-gray-500 italic">No moods recorded yet.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Weekly Mood Averages</h2>
                    {barData.length === 0 ? (
                        <p className="text-gray-500 italic">Not enough data yet.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="avgMood" fill="#6366f1" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </main>
        </div>
    );
}
