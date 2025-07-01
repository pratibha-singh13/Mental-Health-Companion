import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex flex-wrap justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="text-2xl font-bold text-purple-600">
          MoodMate
        </Link>

        <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium">
          Dashboard
        </Link>

        <Link to="/self-care" className="text-gray-700 hover:text-purple-600 font-medium">
          Self-Care
        </Link>

        <Link to="/insights" className="text-gray-700 hover:text-purple-600 font-medium">
          Insights
        </Link>

        <Link to="/streaks" className="text-gray-700 hover:text-purple-600 font-medium">
          Streaks
        </Link>

        <Link to="/breathing" className="text-gray-700 hover:text-purple-600 font-medium">
          Breathing
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
}
