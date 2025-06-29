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
            const res = await axios.post('http://localhost:5000/api/auth/register', {
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
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 bg-gradient-to-br from-[#e0e7ff] to-[#f3f4f6]">

            <div className="text-center lg:text-left lg:w-1/2 space-y-6 mb-12 lg:mb-0">
                <img
                    src={Hero}
                    alt="Register illustration"
                    className="max-w-md mx-auto lg:mx-0 rounded-xl shadow-md"
                />
                <h1 className="text-4xl font-bold text-primary">Create your MoodMate account</h1>
                <p className="text-gray-600 max-w-md mx-auto lg:mx-0">
                    Start tracking your mood, managing stress, and building emotional wellness with your personal companion.
                </p>
            </div>


            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-glass p-8 rounded-2xl w-full max-w-md animate__animated animate__fadeIn"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Register</h2>


                <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 mb-4 focus-within:ring-2 focus-within:ring-primary">
                    <User className="text-gray-400 mr-2" size={20} />
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full outline-none bg-transparent"
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                </div>


                <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 mb-4 focus-within:ring-2 focus-within:ring-primary">
                    <Lock className="text-gray-400 mr-2" size={20} />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full outline-none bg-transparent"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>


                <button
                    type="submit"
                    className="mt-4 w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    Create Account
                </button>


                <p className="text-center mt-6 text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                        className="text-primary font-medium hover:underline cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}
