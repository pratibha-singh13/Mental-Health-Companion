import Navbar from '../components/Navbar';
import MoodForm from '../components/MoodForm';
import MoodList from '../components/MoodList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardHero from '../assets/dashboard-hero.png';

export default function Dashboard() {
    const [moods, setMoods] = useState([]);

    const fetchMoods = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/mood', {
            headers: { 'x-auth-token': token },
        });
        setMoods(res.data);
    };

    useEffect(() => {
        fetchMoods();
    }, []);

    return (
        <div className="min-h-screen bg-[#f9fafb] text-gray-800 font-sans">
            {/* Top navbar */}
            <Navbar />

            {/* Main content */}
            <main className="px-6 py-12 max-w-6xl mx-auto">
                {/* Welcome section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-snug">
                            Welcome to Your Mental Wellness Space
                        </h1>
                        <p className="text-gray-600 text-base">
                            Track your mood, reflect on your thoughts, and take a step towards emotional well-being — all in one place.
                        </p>
                    </div>
                    <img
                        src={DashboardHero}
                        alt="Dashboard visual"
                        className="rounded-xl shadow-xl w-full object-cover"
                    />
                </section>

                {/* Mood Form */}
                <MoodForm onMoodAdded={fetchMoods} />

                {/* Mood History */}
                <section className="mt-12">
                    <MoodList moods={moods} />
                </section>
            </main>
        </div>
    );
}
