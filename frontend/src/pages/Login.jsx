import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, KeyRound, User, AlertTriangle, ArrowLeft } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // If already authenticated, redirect to admin panel
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      const res = await login(formData.username, formData.password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError('Connection failed. Is the server running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Back to Home Link */}
      <a
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Portfolio
      </a>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-dark-900 p-8 sm:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800 shadow-md relative overflow-hidden"
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-xl"></div>

        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-500 border border-primary-500/20 flex items-center justify-center shadow-sm mb-4">
            <Shield size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Admin Authentication</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            Secure sign-in for portfolio management dashboard
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5">
            <AlertTriangle size={18} className="flex-shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User size={12} /> Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              disabled={submitting}
              value={formData.username}
              onChange={handleChange}
              placeholder="admin"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-800 dark:text-slate-200 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound size={12} /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              disabled={submitting}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-800 dark:text-slate-200 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/60 text-white rounded-xl font-semibold shadow-glow-primary transition-all duration-200 flex justify-center items-center gap-2 hover:-translate-y-0.5"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] text-slate-400 dark:text-slate-600 border-t border-slate-100 dark:border-slate-800/80 pt-4 leading-relaxed">
          Default seed credentials can be found in the server's configuration template. Update password immediately upon first login.
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
