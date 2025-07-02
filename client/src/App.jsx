import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SelfCare from './pages/SelfCare';
import Insights from './pages/Insights';
import Streaks from './pages/Streaks';
import Breathing from './pages/Breathing';
import AnonymousSupport from './pages/AnonymousSupport';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/self-care" element={<SelfCare />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/support" element={<AnonymousSupport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
