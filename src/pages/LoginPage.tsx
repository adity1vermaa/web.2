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
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    const result = await login(email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleFillTestAccount = (testEmail: string, testPass: string) => {
    setEmail(testEmail);
    setPassword(testPass);
    setError('');
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

          {/* Quick Fill Test Credentials Helper */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-slate-300">Quick Test Credentials:</span>
              <span>Click to auto-fill</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleFillTestAccount('farmer@agrivision.ai', 'agrivision2026')}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/40 text-emerald-300 font-medium text-[11px] text-center transition-colors"
                id="fill-farmer-account-btn"
              >
                Grower Account
              </button>
              <button
                type="button"
                onClick={() => handleFillTestAccount('admin@agrivision.ai', 'agrivision2026')}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/40 text-amber-300 font-medium text-[11px] text-center transition-colors"
                id="fill-admin-account-btn"
              >
                Agronomist Admin
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
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
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
