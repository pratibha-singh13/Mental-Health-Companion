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
        <div className="bg-white shadow-md p-8 rounded-2xl transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Mood History</h2>

            {moods.length === 0 ? (
                <p className="text-gray-500 italic text-center">No moods tracked yet. Your journey starts here!</p>
            ) : (
                <ul className="space-y-5">
                    {moods.map((mood, index) => (
                        <li
                            key={index}
                            className="relative border-l-[4px] border-indigo-500 bg-indigo-50/40 px-6 py-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md group"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-3 top-5 w-3 h-3 bg-indigo-500 rounded-full shadow-md"></div>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                <CalendarDays className="w-4 h-4" />
                                {formatDate(mood.date)}
                            </div>

                            {/* Mood with Emoji */}
                            <div className="text-xl font-semibold text-gray-800 flex items-center gap-2 capitalize">
                                <span className="text-2xl">{emojiMap[mood.mood] || '🧠'}</span>
                                {mood.mood}
                            </div>

                            {/* Notes */}
                            {mood.note && (
                                <div className="flex items-start gap-2 text-sm text-gray-700 mt-2">
                                    <Quote className="w-4 h-4 mt-[2px] text-gray-400" />
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
