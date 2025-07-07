import { useState } from 'react';
import axios from 'axios';

const moodOptions = [
    { emoji: '😀', label: 'Happy' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😇', label: 'Grateful' },
];

export default function SelfCareForm({ onDataLogged }) {
    const [form, setForm] = useState({
        mood: '',
        note: '',
        sleepHours: '',
        weight: '',
        steps: '',
        pushups: '',
        exercised: false,
        meditated: false,
        waterIntake: '',
        journaled: false,
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleMoodSelect = (moodLabel) => {
        setForm((prev) => ({ ...prev, mood: moodLabel }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
           await axios.post('https://mental-health-companion-oy12.onrender.com/api/selfcare', form, {

                headers: { 'x-auth-token': token },
            });
            setForm({
                mood: '',
                note: '',
                sleepHours: '',
                weight: '',
                steps: '',
                pushups: '',
                exercised: false,
                meditated: false,
                waterIntake: '',
                journaled: false,
            });
            onDataLogged?.();
        } catch (err) {
            alert('Error logging self-care habits.');
        }
    };

    return (
        <section className="bg-white/5 backdrop-blur-lg p-10 md:p-12 rounded-3xl border border-purple-400 shadow-[0_0_25px_rgba(192,132,252,0.6)] transition-all duration-300 animate-fadeUp">
            <form onSubmit={handleSubmit} className="space-y-10 font-sans text-white">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent tracking-tight text-center">
                    Daily Mood & Self-Care Check-In
                </h2>


                <div>
                    <p className="text-sm text-purple-200 mb-2">How are you feeling today?</p>
                    <div className="flex flex-wrap gap-4">
                        {moodOptions.map(({ emoji, label }) => (
                            <button
                                key={label}
                                type="button"
                                onClick={() => handleMoodSelect(label)}
                                className={`text-3xl p-4 rounded-full border transition-all duration-300 transform hover:scale-110 
                ${form.mood === label
                                        ? 'border-purple-400 bg-purple-500/10 shadow-[0_0_15px_rgba(192,132,252,0.8)]'
                                        : 'border-gray-500 bg-white/5'}`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <InputField label="Hours of Sleep" name="sleepHours" value={form.sleepHours} handleChange={handleChange} />
                    <InputField label="Weight (kg)" name="weight" value={form.weight} handleChange={handleChange} />
                    <InputField label="Steps Walked" name="steps" value={form.steps} handleChange={handleChange} />
                    <InputField label="Push-ups" name="pushups" value={form.pushups} handleChange={handleChange} />
                    <InputField label="Water Intake (glasses)" name="waterIntake" value={form.waterIntake} handleChange={handleChange} />
                    <Checkbox name="exercised" label="Exercised Today" checked={form.exercised} handleChange={handleChange} />
                    <Checkbox name="meditated" label="Meditated Today" checked={form.meditated} handleChange={handleChange} />
                    <Checkbox name="journaled" label="Wrote a Journal" checked={form.journaled} handleChange={handleChange} />
                </div>


                <div>
                    <label className="block mb-2 text-sm font-medium text-pink-200">Reflections or Notes</label>
                    <textarea
                        name="note"
                        value={form.note}
                        onChange={handleChange}
                        rows={4}
                        placeholder="How did your day feel?"
                        className="w-full bg-white/5 border border-gray-600 text-white placeholder:text-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white py-3 rounded-md font-semibold tracking-wide border border-purple-400 shadow-[0_0_16px_rgba(192,132,252,0.6)] hover:shadow-[0_0_25px_rgba(192,132,252,0.9)] transition duration-300"
                >
                    Save Check-In
                </button>
            </form>
        </section>
    );
}

function InputField({ label, name, value, handleChange }) {
    return (
        <div>
            <label className="block mb-1 text-purple-200">{label}</label>
            <input
                type="number"
                name={name}
                value={value}
                onChange={handleChange}
                className="w-full rounded bg-white/10 text-white px-3 py-2 border border-purple-400 focus:outline-none"
            />
        </div>
    );
}

function Checkbox({ name, label, checked, handleChange }) {
    return (
        <div className="flex items-center gap-3">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={handleChange}
                id={name}
                className="form-checkbox text-purple-500 h-4 w-4"
            />
            <label htmlFor={name} className="text-purple-200">{label}</label>
        </div>
    );
}
