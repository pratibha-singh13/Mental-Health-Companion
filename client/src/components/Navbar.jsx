import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold text-purple-600">
        MoodMate
      </Link>
      <Link
        to="/self-care"
        className="text-gray-700 font-medium hover:text-indigo-700 transition"
      >
        Self-Care
      </Link>

      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium">
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
