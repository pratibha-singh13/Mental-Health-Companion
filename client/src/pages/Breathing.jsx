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
        <div className="min-h-screen bg-gradient-to-br from-[#1f0c2f] to-[#2a0c4e] text-purple-100 font-sans">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-16 text-center animate-fadeIn">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Guided Breathing Exercise
                </h1>
                <p className="text-lg text-purple-300 mb-10">
                    Breathe deeply, calm your mind, and bring yourself back to the present.
                </p>

                
                <div className="flex justify-center gap-6 mb-12">
                    <button
                        onClick={() => setMode('circle')}
                        className={`px-5 py-2 rounded-full font-semibold transition duration-300 shadow-md ${mode === 'circle'
                                ? 'bg-purple-700 text-white shadow-[0_0_15px_rgba(192,132,252,0.5)]'
                                : 'bg-white/10 text-purple-300 border border-purple-300 hover:bg-purple-700/20'
                            }`}
                    >
                        🌬️ Circle Breathing
                    </button>
                    <button
                        onClick={() => setMode('box')}
                        className={`px-5 py-2 rounded-full font-semibold transition duration-300 shadow-md ${mode === 'box'
                                ? 'bg-purple-700 text-white shadow-[0_0_15px_rgba(192,132,252,0.5)]'
                                : 'bg-white/10 text-purple-300 border border-purple-300 hover:bg-purple-700/20'
                            }`}
                    >
                        🧊 Box Breathing (4–7–8)
                    </button>
                </div>

               
                {isRunning && (
                    <div className="mb-8">
                        <img
                            src={mode === 'circle' ? circleGif : boxGif}
                            alt="Breathing guide"
                            className="mx-auto w-72 md:w-96 rounded-2xl border border-purple-400 shadow-[0_0_30px_rgba(192,132,252,0.4)]"
                        />
                    </div>
                )}

                {/* Breathing Info */}
                {isRunning ? (
                    <>
                        <h2 className="text-4xl font-bold text-purple-200 mb-2">{phase}</h2>
                        <p className="text-2xl font-mono text-purple-100">{count} seconds</p>
                        <p className="mt-4 italic text-sm text-purple-300">
                            Stay focused. Let your breath guide you.
                        </p>
                    </>
                ) : (
                    <button
                        onClick={start}
                        className="bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(192,132,252,0.5)] transition-all duration-300"
                    >
                        Start Breathing Session
                    </button>
                )}

                
                {!isRunning && mode === 'box' && (
                    <div className="mt-10 bg-white/5 border border-purple-400 p-6 rounded-xl backdrop-blur-md text-purple-100 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
                        <h3 className="text-lg font-semibold mb-2 text-purple-200">Box Breathing (4–7–8)</h3>
                        <p className="text-sm text-purple-300">
                            Inhale for <strong>4 seconds</strong>, hold for <strong>7 seconds</strong>,
                            and exhale slowly for <strong>8 seconds</strong>. Great for stress relief and focus.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
