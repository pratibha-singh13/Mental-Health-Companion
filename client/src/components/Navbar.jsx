import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // All navigation links with paths
  const navLinks = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Self-Care', to: '/self-care' },
    { name: 'Insights', to: '/insights' },
    { name: 'Streaks', to: '/streaks' },
    { name: 'Breathing', to: '/breathing' },
    { name: 'Anonymous Support', to: '/support' },
  ];

  return (
    <nav className="w-full z-50 backdrop-blur-md bg-white/10 shadow-[0_8px_20px_rgba(192,132,252,0.15)] border-b border-purple-400/30 px-6 py-4 flex flex-wrap justify-between items-center rounded-b-2xl">
      {/* Left Side: Logo + Nav Links */}
      <div className="flex flex-wrap items-center gap-4 md:gap-5">
        {/* Brand */}
        <Link
          to="/dashboard"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-300 to-fuchsia-500 bg-clip-text text-transparent tracking-tight"
        >
          MoodMate
        </Link>

        {/* Nav Links */}
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-1.5 rounded-xl font-medium text-sm transition-all duration-300
              ${location.pathname === link.to
                ? 'bg-purple-500/20 text-white border border-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.4)]'
                : 'text-purple-200 hover:text-purple-100'
              }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right Side: Logout */}
      <button
        onClick={handleLogout}
        className="bg-gradient-to-tr from-red-500 via-pink-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-[0_0_10px_rgba(255,100,150,0.6)] transition-all duration-300"
      >
        Logout
      </button>
    </nav>
  );
}
