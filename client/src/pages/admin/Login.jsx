import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Auto-ensure admin initialization
      await axios.post('/api/admin/init').catch(() => {});
      const r = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('token', r.data.token);
      nav('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials or login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md glass p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden'>
        {/* Ambient background glow */}
        <div className='absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none' />
        <div className='absolute -bottom-16 -left-16 w-36 h-36 bg-violet-600/20 rounded-full blur-2xl pointer-events-none' />

        <div className='relative z-10'>
          {/* Logo & Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 text-2xl shadow-lg shadow-violet-500/30 mb-4'>
              🔒
            </div>
            <h1 className='text-2xl font-black tracking-tight text-white'>
              Admin Portal
            </h1>
            <p className='text-xs text-white/60 mt-1.5'>
              Sign in with your administrative credentials to manage club operations
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-2'>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={login} className='space-y-4'>
            <div>
              <label className='block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5'>
                Admin Email
              </label>
              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='smcc@admin.com'
                className='w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5'>
                Password
              </label>
              <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••••••'
                className='w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.99] font-bold text-sm text-white shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50'
            >
              {loading ? (
                <>
                  <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Dashboard →</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
