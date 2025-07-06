import { CalendarDays, Quote } from 'lucide-react';

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
    const moodDate = new Date(dateStr);
    const diffDays = Math.floor((today - moodDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return moodDate.toLocaleDateString();
}

export default function MoodList({ moods }) {
    return (
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-purple-500 shadow-[0_0_18px_rgba(192,132,252,0.3)] hover:shadow-[0_0_25px_rgba(192,132,252,0.5)] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-100 mb-6 tracking-tight">
                Mood History
            </h2>

            {moods.length === 0 ? (
                <p className="text-fuchsia-400 italic text-center">
                    No moods tracked yet. Your journey starts here!
                </p>
            ) : (
                <ul className="space-y-6">
                    {moods.map((mood, index) => (
                        <li
                            key={index}
                            className="relative bg-purple-400/10 p-5 rounded-xl border-l-4 border-purple-500 transition-all duration-300"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-3 top-5 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-fuchsia-300 mb-1">
                                <CalendarDays className="w-4 h-4" />
                                {formatDate(mood.date)}
                            </div>

                            
                            <div className="text-xl font-semibold text-white flex items-center gap-2 capitalize">
                                <span className="text-2xl">{emojiMap[mood.mood] || '🧠'}</span>
                                {mood.mood}
                            </div>

                           
                            {mood.note && (
                                <div className="flex items-start gap-2 text-sm text-purple-200 mt-2">
                                    <Quote className="w-4 h-4 mt-1 text-purple-400" />
                                    <p className="italic">{mood.note}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
