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
        const date = new Date(item.createdAt);
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
    const [entries, setEntries] = useState([]);
    const [filter, setFilter] = useState('week');

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/selfcare', {
            headers: { 'x-auth-token': token },
        });
        setEntries(res.data.reverse());
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filtered = filterByTimeRange(entries, filter);


    const moodTrend = filtered.map((e) => ({
        date: formatDate(e.createdAt),
        moodScore: moodToScore[e.mood] || 2.5,
    }));

    const sleepTrend = filtered.map((e) => ({
        date: formatDate(e.createdAt),
        sleep: Number(e.sleepHours) || 0,
    }));

    const waterTrend = filtered.map((e) => ({
        date: formatDate(e.createdAt),
        water: Number(e.waterIntake) || 0,
    }));

    const weightTrend = filtered
        .filter((e) => e.weight)
        .map((e) => ({
            date: formatDate(e.createdAt),
            weight: Number(e.weight),
        }));

    const noteTrend = Object.values(
        filtered.reduce((acc, e) => {
            const date = formatDate(e.createdAt);
            acc[date] = acc[date] || { date, count: 0 };
            if (e.note) acc[date].count += 1;
            return acc;
        }, {})
    );

    const habits = ['exercised', 'meditated', 'journaled'];
    const habitsCount = habits.map((key) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: filtered.filter((e) => e[key]).length,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1f0c2f] to-[#2a0c4e] text-purple-100 font-sans">
            <Navbar />

            <main className="px-6 py-12 max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Self-Care Insights
                </h1>


                <div className="mb-10">
                    <label className="mr-3 font-medium text-purple-200">Filter by:</label>
                    <select
                        className="bg-white/10 border border-purple-400 text-purple-100 px-4 py-2 rounded-lg"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                        <option value="all">All Time</option>
                    </select>
                </div>

                {/* Charts */}
                <ChartCard title="Mood Trend (Score)">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={moodTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                            <XAxis dataKey="date" stroke="#d8b4fe" />
                            <YAxis domain={[0, 5]} stroke="#d8b4fe" />
                            <Tooltip />
                            <Line type="monotone" dataKey="moodScore" stroke="#c084fc" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Sleep Hours">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={sleepTrend}>
                            <CartesianGrid stroke="#4b5563" />
                            <XAxis dataKey="date" stroke="#d8b4fe" />
                            <YAxis stroke="#d8b4fe" />
                            <Tooltip />
                            <Line type="monotone" dataKey="sleep" stroke="#34d399" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Water Intake (Glasses)">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={waterTrend}>
                            <CartesianGrid stroke="#4b5563" />
                            <XAxis dataKey="date" stroke="#d8b4fe" />
                            <YAxis stroke="#d8b4fe" />
                            <Tooltip />
                            <Bar dataKey="water" fill="#f472b6" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Weight Tracker (kg)">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={weightTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                            <XAxis dataKey="date" stroke="#d8b4fe" />
                            <YAxis stroke="#d8b4fe" />
                            <Tooltip />
                            <Line type="monotone" dataKey="weight" stroke="#facc15" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Note Activity (Reflective Journaling)">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={noteTrend}>
                            <CartesianGrid stroke="#4b5563" />
                            <XAxis dataKey="date" stroke="#d8b4fe" />
                            <YAxis stroke="#d8b4fe" />
                            <Tooltip />
                            <Bar dataKey="count" fill="#a78bfa" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Habit Completion Overview">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={habitsCount} dataKey="value" nameKey="name" outerRadius={100} label>
                                {habitsCount.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </main>
        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-purple-500 rounded-xl px-6 py-6 mb-12 shadow-[0_0_20px_rgba(192,132,252,0.2)] hover:shadow-[0_0_30px_rgba(192,132,252,0.4)] transition">
            <h2 className="text-xl font-semibold text-purple-100 mb-4">{title}</h2>
            {children}
        </div>
    );
}
