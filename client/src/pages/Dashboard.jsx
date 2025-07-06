import Navbar from '../components/Navbar';
import SelfCareForm from '../components/SelfCareForm';
import SelfCareHistory from '../components/SelfCareHistory';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [entries, setEntries] = useState([]);

    const fetchEntries = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/selfcare', {
            headers: { 'x-auth-token': token },
        });
        setEntries(res.data);
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0e0e15] to-[#1b1b2f] text-[#e0e0e0] font-sans relative">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>

            <Navbar />

            <main className="px-6 py-16 max-w-6xl mx-auto z-10 relative">

                <section className="mb-14 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-500 text-transparent bg-clip-text">
                        Your Mood & Self-Care Space
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Reflect, express, and track your emotional and physical well-being holistically.
                    </p>
                </section>


                <SelfCareForm onDataLogged={fetchEntries} />


                <section className="mt-16">
                    <SelfCareHistory entries={entries} />
                </section>
            </main>
        </div>
    );
}
