import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, KeyRound, ArrowRight, ArrowLeft, CheckCircle2, Sprout } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('ethan@highlandfarms.ag');
  const [step, setStep] = useState<'request' | 'sent'>('request');
  const [resetCode, setResetCode] = useState('849201');
  const [newPassword, setNewPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep('sent');
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-lime-400 p-0.5 shadow-lg shadow-emerald-950">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-lime-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Account Recovery</h1>
            <p className="text-xs text-slate-400">Reset your AgriVision AI grower portal password</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            
            {isSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Password Updated!</h3>
                <p className="text-xs text-slate-400">Redirecting to login portal...</p>
              </div>
            ) : step === 'request' ? (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enter your registered farm email address. We'll send a 6-digit cryptographic verification code to reset your credentials.
                </p>

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
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      placeholder="grower@farm.ag"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Recovery Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300">
                  Verification code sent to <strong>{email}</strong>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono text-center tracking-widest text-base focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                >
                  <span>Save New Password</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </button>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
