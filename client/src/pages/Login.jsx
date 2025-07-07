import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock } from 'lucide-react';
import Hero from '../assets/hero.png';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const res = await axios.post('https://mental-health-companion-oy12.onrender.com/api/auth/login', form);

            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1f0c2f] to-[#2a0c4e] text-purple-100 flex items-center justify-center px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl w-full py-10">
                
                <div className="text-center lg:text-left lg:w-1/2 space-y-6">
                    <img
                        src={Hero}
                        alt="Mental health illustration"
                        className="max-w-sm w-full mx-auto lg:mx-0 rounded-2xl shadow-[0_0_30px_rgba(192,132,252,0.4)]"
                    />
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">
                        Welcome to MoodMate
                    </h1>
                    <p className="text-purple-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
                        Track your daily mood, reflect on your thoughts, and build a healthier mind. Your private mental health companion.
                    </p>
                </div>

               
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md border border-purple-400 shadow-[0_0_25px_rgba(192,132,252,0.3)] animate-fadeIn space-y-5"
                >
                    <h2 className="text-2xl font-bold text-center text-purple-100 mb-4 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]">
                        Login to Your Account
                    </h2>

                    
                    <div className="flex items-center border border-purple-400 rounded-lg px-4 py-3 bg-purple-900/30 focus-within:ring-2 focus-within:ring-purple-500 shadow-[0_0_12px_rgba(192,132,252,0.3)] transition-all">
                        <User className="text-purple-200 mr-2" size={20} />
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full bg-transparent text-purple-100 placeholder-purple-400 outline-none"
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                        />
                    </div>

                    
                    <div className="flex items-center border border-purple-400 rounded-lg px-4 py-3 bg-purple-900/30 focus-within:ring-2 focus-within:ring-purple-500 shadow-[0_0_12px_rgba(192,132,252,0.3)] transition-all">
                        <Lock className="text-purple-200 mr-2" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent text-purple-100 placeholder-purple-400 outline-none"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white font-semibold py-3 rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(192,132,252,0.5)] transition-all duration-300"
                    >
                        Login
                    </button>

                   
                    <p className="text-center mt-4 text-sm text-purple-300">
                        Don’t have an account?{' '}
                        <span
                            className="text-purple-100 font-semibold hover:underline cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            Create one
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}
