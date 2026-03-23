import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 border-t-4 border-orange-500">
      <div className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 w-full max-w-md relative">
        <div className="absolute top-6 right-8 text-sm">
          <Link to="/" className="text-gray-400 font-medium hover:text-gray-800 transition">&larr; Public Site</Link>
        </div>
        <div className="text-center mb-8 mt-2">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin <span className="text-orange-500">Login</span></h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">Verify your credentials to continue.</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-lg mb-6 text-sm font-medium text-center shadow-sm">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-semibold py-2 rounded-lg transition ${loading ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
