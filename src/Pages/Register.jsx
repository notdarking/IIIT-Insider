import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const data = await api.auth.login(username, password);
        if (data.token) {
          navigate('/');
        }
      } else {
        const data = await api.auth.register(username, email, password);
        if (data.userId) {
          setIsLogin(true);
          setError('');
          setPassword('');
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.auth.logout();
    setUsername('');
    setEmail('');
    setPassword('');
    navigate('/', { replace: true });
  };

  const isLoggedIn = api.auth.isLoggedIn();

  if (isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-yellow-200 mb-4">Welcome Back!</h2>
          <p className="text-yellow-100/70 mb-6">You are logged in.</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600/80 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-3xl font-bold text-yellow-200 text-center mb-8">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-400/40 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-yellow-200 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-yellow-400/30 rounded-xl px-4 py-3 text-yellow-100 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="Enter your username"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-yellow-200 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-yellow-400/30 rounded-xl px-4 py-3 text-yellow-100 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-yellow-200 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-yellow-400/30 rounded-xl px-4 py-3 text-yellow-100 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center text-yellow-100/60 mt-6 text-sm">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setPassword('');
            }}
            className="text-yellow-400 hover:text-yellow-300 font-semibold cursor-pointer"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
