import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { 
  Sprout, 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ScanLine, 
  Bell, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { unreadAlertCount } = useFarm();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isPublicPage = ['/', '/about', '/privacy', '/terms', '/login', '/signup', '/forgot-password'].includes(currentPath);

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/40 text-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 p-0.5 shadow-lg shadow-emerald-900/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
                <Sprout className="w-5 h-5 text-lime-400 group-hover:rotate-6 transition-transform duration-200" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white">AgriVision</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-300 border border-lime-400/30">AI</span>
              </div>
              <p className="text-[10px] text-emerald-300/70 tracking-wide font-mono uppercase">Precision Crop Pathology</p>
            </div>
          </div>

          {/* Center Navigation Links (Public vs Authenticated) */}
          <nav className="hidden md:flex items-center gap-1">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === '/' ? 'bg-emerald-800/60 text-white' : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
                  }`}
                  id="nav-home-btn"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === '/about' ? 'bg-emerald-800/60 text-white' : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
                  }`}
                  id="nav-about-btn"
                >
                  Technology
                </button>
                <button
                  onClick={() => navigate('/privacy')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === '/privacy' ? 'bg-emerald-800/60 text-white' : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
                  }`}
                  id="nav-privacy-btn"
                >
                  Privacy
                </button>
                <button
                  onClick={() => navigate('/terms')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === '/terms' ? 'bg-emerald-800/60 text-white' : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
                  }`}
                  id="nav-terms-btn"
                >
                  Terms
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    currentPath === '/dashboard' ? 'bg-emerald-800/60 text-white' : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
                  }`}
                  id="nav-dash-btn"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/scanner')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    currentPath === '/scanner' ? 'bg-emerald-800/60 text-white' : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
                  }`}
                  id="nav-scanner-btn"
                >
                  <ScanLine className="w-4 h-4 text-lime-400" />
                  AI Scanner
                </button>
                <button
                  onClick={() => navigate('/fields')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    currentPath === '/fields' ? 'bg-emerald-800/60 text-white' : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
                  }`}
                  id="nav-fields-btn"
                >
                  <Layers className="w-4 h-4 text-teal-400" />
                  Fields & NDVI
                </button>
                <button
                  onClick={() => navigate('/alerts')}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    currentPath === '/alerts' ? 'bg-emerald-800/60 text-white' : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
                  }`}
                  id="nav-alerts-btn"
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  Alerts
                  {unreadAlertCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold">
                      {unreadAlertCount}
                    </span>
                  )}
                </button>
              </>
            )}
          </nav>

          {/* Right Section: Authenticated User Controls OR Public Sign In */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {isAdmin ? (
                  <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1 hover:bg-amber-500/30 transition-colors"
                    id="admin-portal-link"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Portal</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/scanner')}
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-950 font-semibold text-xs shadow hover:brightness-105 transition-all"
                    id="quick-scan-top-btn"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Scan Crop</span>
                  </button>
                )}

                {/* Profile Pill */}
                <div 
                  onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/settings')}
                  className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-emerald-900/40 transition-colors"
                  id="user-profile-widget"
                  title={`${user.name} (${user.role})`}
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-emerald-500/40"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-800 border border-emerald-500/40 flex items-center justify-center text-xs font-bold text-white uppercase">
                      {user.name.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-medium text-white truncate max-w-[120px]">{user.name}</p>
                    <p className="text-[10px] text-emerald-300/70 capitalize">{user.role}</p>
                  </div>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-emerald-300/70 hover:text-red-400 hover:bg-emerald-900/60 transition-colors"
                  title="Sign Out"
                  id="logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-emerald-200 hover:text-white hover:bg-emerald-900/50 transition-colors"
                  id="header-login-btn"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-1.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-emerald-950 font-semibold text-sm shadow-sm transition-all flex items-center gap-1"
                  id="header-signup-btn"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
