import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import Hero from '../assets/hero.png';

export default function Register() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    const res = await axios.post('https://mental-health-companion-oy12.onrender.com/api/auth/register', {

                ...form,
                isAnonymous: false,
            });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 bg-gradient-to-br from-[#1f0c2f] to-[#2a0c4e] text-white font-sans">
            {/* Left Side Image & Text */}
            <div className="text-center lg:text-left lg:w-1/2 space-y-6 mb-12 lg:mb-0 px-6">
                <img
                    src={Hero}
                    alt="Register illustration"
                    className="max-w-md mx-auto lg:mx-0 rounded-xl shadow-neon"
                />
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Create your MoodMate account
                </h1>
                <p className="text-purple-300 max-w-md mx-auto lg:mx-0">
                    Start tracking your mood, managing stress, and building emotional wellness with your personal companion.
                </p>
            </div>

            {/* Register Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-md border border-purple-500 shadow-glowPrimary px-8 py-10 rounded-2xl w-full max-w-md animate-fadeUp"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-purple-100">Register</h2>

                {/* Username Field */}
                <div className="flex items-center border border-purple-300 rounded-lg px-4 py-3 mb-4 bg-white/10 focus-within:ring-2 focus-within:ring-purple-500 transition">
                    <User className="text-purple-300 mr-3" size={20} />
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full bg-transparent text-purple-100 placeholder-purple-400 outline-none"
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="flex items-center border border-purple-300 rounded-lg px-4 py-3 mb-6 bg-white/10 focus-within:ring-2 focus-within:ring-purple-500 transition">
                    <Lock className="text-purple-300 mr-3" size={20} />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-transparent text-purple-100 placeholder-purple-400 outline-none"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white font-semibold py-3 rounded-lg hover:scale-105 shadow-glowPrimary transition-all"
                >
                    Create Account
                </button>

                {/* Login Redirect */}
                <p className="text-center mt-6 text-sm text-purple-300">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/')}
                        className="text-purple-200 hover:underline cursor-pointer font-medium"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}
