import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SelfCare from './pages/SelfCare';
import Insights from './pages/Insights';
import Streaks from './pages/Streaks';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
