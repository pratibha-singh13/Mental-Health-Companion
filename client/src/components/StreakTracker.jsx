// src/components/StreakTracker.jsx
import { useMemo } from 'react';

function calculateStreak(moods) {
    if (!moods.length) return 0;

    // Sort by date descending
    const sorted = [...moods].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    let streak = 1;
    let prevDate = new Date(sorted[0].createdAt);

    for (let i = 1; i < sorted.length; i++) {
        const currentDate = new Date(sorted[i].createdAt);
        const diffInDays = Math.floor((prevDate - currentDate) / (1000 * 60 * 60 * 24));

        if (diffInDays === 1) {
            streak++;
            prevDate = currentDate;
        } else if (diffInDays > 1) {
            break; // streak is broken
        }
    }

    return streak;
}

export default function StreakTracker({ moods }) {
    const streak = useMemo(() => calculateStreak(moods), [moods]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center mb-10">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Current Mood Streak</h3>
            <p className="text-4xl font-bold text-gray-900">{streak} 🔥</p>
            <p className="text-sm text-gray-500">days in a row</p>
        </div>
    );
}
