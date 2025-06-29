import { CalendarDays, Quote } from 'lucide-react';

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
                            className="relative border-l-[4px] border-primary bg-gray-50 px-6 py-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md group"
                        >
                            <div className="absolute -left-3 top-5 w-3 h-3 bg-primary rounded-full shadow-md"></div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                <CalendarDays className="w-4 h-4" />
                                {new Date(mood.date).toLocaleDateString()}
                            </div>

                            <div className="text-lg font-semibold text-gray-800 capitalize">{mood.mood}</div>

                            <div className="flex items-start gap-2 text-sm text-gray-600 mt-1">
                                <Quote className="w-4 h-4 mt-[2px] text-gray-400" />
                                <p className="italic">{mood.note}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
