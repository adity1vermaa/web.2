import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { 
  Sprout, 
  Lock, 
  Mail, 
  User, 
  MapPin, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { navigate } = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    farmName: '',
    farmType: 'Mixed Farming' as const,
    farmSize: 100,
    location: '',
    country: 'United States',
    acceptTerms: false,
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.farmName.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!formData.acceptTerms) {
      setError('You must accept the terms of service to create an account.');
      return;
    }

    setIsLoading(true);
    const result = await register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      farmName: formData.farmName.trim(),
      farmType: formData.farmType,
      farmSize: Number(formData.farmSize) || 100,
      location: formData.location.trim(),
      country: formData.country,
    });
    setIsLoading(false);

    if (result.success) {
      navigate('/onboarding');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-lime-400 p-0.5 shadow-lg shadow-emerald-950">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-lime-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Create Your Farm Account</h1>
            <p className="text-xs text-slate-400">Join over 12,000 precision growers worldwide</p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            
            {error && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Grower Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Marcus Sterling"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    placeholder="marcus@farm.ag"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Farm / Ranch Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.farmName}
                    onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Silver Creek Farms"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Production Type
                  </label>
                  <select
                    value={formData.farmType}
                    onChange={(e) => setFormData({ ...formData, farmType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Mixed Farming">Mixed Farming</option>
                    <option value="Arable Crops">Arable Crops (Corn/Wheat/Soy)</option>
                    <option value="Horticulture">Horticulture & Vegetables</option>
                    <option value="Orchards">Orchards & Vineyards</option>
                    <option value="Greenhouse">Protected Greenhouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Total Acreage (Hectares)
                  </label>
                  <input
                    type="number"
                    value={formData.farmSize}
                    onChange={(e) => setFormData({ ...formData, farmSize: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Location / Agricultural Region
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Salinas Valley, CA"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-0"
                  />
                  <span>
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/terms')}
                      className="text-emerald-400 hover:underline font-medium"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/privacy')}
                      className="text-emerald-400 hover:underline font-medium"
                    >
                      Farm Data Privacy Policy
                    </button>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                id="signup-submit-btn"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Complete Registration & Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-emerald-400 hover:underline font-semibold"
                id="signup-login-link"
              >
                Sign In
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
