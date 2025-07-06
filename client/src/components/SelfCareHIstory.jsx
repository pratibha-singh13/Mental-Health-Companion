import {
    CalendarDays, Quote, HeartPulse, GlassWater, Moon, Dumbbell, NotebookPen, Scale
} from 'lucide-react';

const emojiMap = {
    Happy: '😀',
    Sad: '😔',
    Angry: '😡',
    Anxious: '😰',
    Tired: '😴',
    Grateful: '😇',
};

function formatDate(dateStr) {
    const today = new Date();
    const entryDate = new Date(dateStr);
    const diffDays = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return entryDate.toLocaleDateString();
}

export default function SelfCareHistory({ entries }) {
    return (
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-purple-500 shadow-[0_0_18px_rgba(192,132,252,0.3)] hover:shadow-[0_0_25px_rgba(192,132,252,0.5)] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-100 mb-6 tracking-tight">
                Self-Care History
            </h2>

            {entries.length === 0 ? (
                <p className="text-fuchsia-400 italic text-center">
                    No entries logged yet. Start your wellness journey today!
                </p>
            ) : (
                <ul className="space-y-6">
                    {entries.map((entry, index) => (
                        <li
                            key={index}
                            className="relative bg-purple-400/10 p-5 rounded-xl border-l-4 border-purple-500 transition-all duration-300"
                        >

                            <div className="absolute -left-3 top-5 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>


                            <div className="flex items-center gap-2 text-sm text-fuchsia-300 mb-1">
                                <CalendarDays className="w-4 h-4" />
                                {formatDate(entry.createdAt || entry.date)}
                            </div>


                            {entry.mood && (
                                <div className="text-xl font-semibold text-white flex items-center gap-2 capitalize mb-2">
                                    <span className="text-2xl">{emojiMap[entry.mood] || '🧠'}</span>
                                    {entry.mood}
                                </div>
                            )}


                            <ul className="text-sm text-purple-200 space-y-1 mb-2">
                                {entry.sleepHours && (
                                    <li className="flex items-center gap-2">
                                        <Moon className="w-4 h-4 text-purple-400" />
                                        Slept {entry.sleepHours} hrs
                                    </li>
                                )}
                                {entry.waterIntake && (
                                    <li className="flex items-center gap-2">
                                        <GlassWater className="w-4 h-4 text-purple-400" />
                                        Drank {entry.waterIntake} glasses of water
                                    </li>
                                )}
                                {entry.weight && (
                                    <li className="flex items-center gap-2">
                                        <Scale className="w-4 h-4 text-purple-400" />
                                        Weight: {entry.weight} kg
                                    </li>
                                )}
                                {entry.exercised && (
                                    <li className="flex items-center gap-2">
                                        <Dumbbell className="w-4 h-4 text-purple-400" />
                                        Exercised today
                                    </li>
                                )}
                                {entry.meditated && (
                                    <li className="flex items-center gap-2">
                                        <HeartPulse className="w-4 h-4 text-purple-400" />
                                        Meditated
                                    </li>
                                )}
                                {entry.journaled && (
                                    <li className="flex items-center gap-2">
                                        <NotebookPen className="w-4 h-4 text-purple-400" />
                                        Journaled
                                    </li>
                                )}
                            </ul>


                            {entry.note && (
                                <div className="flex items-start gap-2 text-sm text-purple-200 mt-2">
                                    <Quote className="w-4 h-4 mt-1 text-purple-400" />
                                    <p className="italic">{entry.note}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
