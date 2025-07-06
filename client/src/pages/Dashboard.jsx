import Navbar from '../components/Navbar';
import MoodForm from '../components/MoodForm';
import MoodList from '../components/MoodList';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div className="min-h-screen bg-gradient-to-br from-[#0e0e15] to-[#1b1b2f] text-[#e0e0e0] font-sans relative">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>

            <Navbar />

            <main className="px-6 py-16 max-w-6xl mx-auto z-10 relative">
                
                <section className="mb-14 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-500 text-transparent bg-clip-text">
                        Your Mood Space
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Reflect, express, and track your emotional journey with clarity and calm.
                    </p>
                </section>

               
                <MoodForm onMoodAdded={fetchMoods} />

                
                <section className="mt-16">
                    <MoodList moods={moods} />
                </section>
            </main>
        </div>
    );
}
