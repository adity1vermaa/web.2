import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { 
  Sprout, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Zap, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const { login, quickLoginAs } = useAuth();

  const [email, setEmail] = useState('ethan@highlandfarms.ag');
  const [password, setPassword] = useState('agrivision2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('sarah')) {
        login(email, 'admin');
        navigate('/admin/dashboard');
      } else {
        login(email, 'farmer');
        navigate('/dashboard');
      }
    }, 400);
  };

  const handleDemoClick = (role: 'farmer' | 'admin') => {
    quickLoginAs(role);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-lime-400 p-0.5 shadow-lg shadow-emerald-950">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-lime-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Sign in to AgriVision AI</h1>
            <p className="text-xs text-slate-400">Precision Crop Diagnostics & Farm Management Portal</p>
          </div>

          {/* Quick 1-Click Demo Accounts */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-lime-400">
                <Zap className="w-3.5 h-3.5" />
                Instant Demo Access
              </span>
              <span className="text-[10px] text-slate-400">No registration needed</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoClick('farmer')}
                className="px-3 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 text-left transition-all text-xs group"
                id="demo-farmer-login-btn"
              >
                <p className="font-semibold text-white group-hover:text-lime-300">Commercial Grower</p>
                <p className="text-[10px] text-emerald-300/70 truncate">Ethan • 340 ha Farm</p>
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('admin')}
                className="px-3 py-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/50 text-left transition-all text-xs group"
                id="demo-admin-login-btn"
              >
                <p className="font-semibold text-white group-hover:text-amber-300">Agronomist Admin</p>
                <p className="text-[10px] text-amber-300/70 truncate">Dr. Vance • Pathology Lab</p>
              </button>
            </div>
          </div>

          {/* Regular Login Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            
            {error && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="grower@farm.ag"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    id="login-email-input"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-[11px] text-emerald-400 hover:underline"
                    id="login-forgot-password-link"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    id="login-password-input"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-0"
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                id="login-submit-btn"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
              Don't have a farm registered?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-emerald-400 hover:underline font-semibold"
                id="login-signup-link"
              >
                Create Account
              </button>
            </div>

          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
            >
              ← Back to AgriVision Home
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
