import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import circleGif from '../assets/circle-gif-2.gif';
import boxGif from '../assets/Box-Breathing-GIF.gif';

export default function Breathing() {
    const [phase, setPhase] = useState('Inhale');
    const [count, setCount] = useState(4);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('circle');

    const phases = [
        { label: 'Inhale', duration: 4 },
        { label: 'Hold', duration: 7 },
        { label: 'Exhale', duration: 8 },
    ];

    useEffect(() => {
        if (!isRunning) return;
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev === 1) {
                    const idx = phases.findIndex((p) => p.label === phase);
                    const next = phases[(idx + 1) % phases.length];
                    setPhase(next.label);
                    return next.duration;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, phase]);

    const start = () => {
        setPhase('Inhale');
        setCount(phases[0].duration);
        setIsRunning(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 font-sans text-center">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="text-5xl font-extrabold text-indigo-800 mb-3 tracking-tight">
                    Guided Breathing Exercise
                </h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Breathe deeply, calm your mind, and bring yourself back to the present.
                    Choose your preferred style and follow along.
                </p>

                {/* Toggle Mode */}
                <div className="flex justify-center gap-4 mb-10">
                    <button
                        onClick={() => setMode('circle')}
                        className={`px-5 py-2 rounded-full shadow-sm transition font-medium ${mode === 'circle'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        🌬️ Circle Breathing
                    </button>
                    <button
                        onClick={() => setMode('box')}
                        className={`px-5 py-2 rounded-full shadow-sm transition font-medium ${mode === 'box'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        Box Breathing (4–7–8)
                    </button>
                </div>

                {/* Animation */}
                {isRunning && (
                    <div className="mb-8">
                        <img
                            src={mode === 'circle' ? circleGif : boxGif}
                            alt="Breathing guide"
                            className="mx-auto w-72 md:w-96 rounded-xl border border-indigo-200 shadow-lg"
                        />
                    </div>
                )}

                {/* Breathing Info */}
                {isRunning ? (
                    <>
                        <h2 className="text-4xl font-semibold text-purple-700 mb-2">{phase}</h2>
                        <p className="text-2xl font-mono text-gray-800">{count} seconds</p>
                        <p className="mt-4 text-gray-600 italic text-sm">
                            Stay focused. Let your breath guide you.
                        </p>
                    </>
                ) : (
                    <button
                        onClick={start}
                        className="bg-indigo-700 text-white px-8 py-3 rounded-full text-lg hover:bg-indigo-800 transition duration-300"
                    >
                        Start Breathing Session
                    </button>
                )}

                {/* Optional info box */}
                {!isRunning && mode === 'box' && (
                    <div className="mt-10 bg-white/70 border-l-4 border-indigo-500 p-5 rounded-xl shadow">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-1">Box Breathing (4–7–8)</h3>
                        <p className="text-sm text-gray-700">
                            Inhale for <strong>4 seconds</strong>, hold your breath for <strong>7 seconds</strong>,
                            and exhale gently for <strong>8 seconds</strong>. Repeat to relieve anxiety and improve focus.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
