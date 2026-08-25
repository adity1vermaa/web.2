import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { 
  Menu, 
  X, 
  Sparkles, 
  CloudSun, 
  AlertTriangle, 
  CheckCircle2, 
  Search,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  pageTitle,
  pageSubtitle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath, navigate } = useRouter();
  const { user, isAdmin } = useAuth();
  const { weather, alerts, unreadAlertCount } = useFarm();

  const getBreadcrumbs = () => {
    const segments = currentPath.split('/').filter(Boolean);
    return segments.map((seg, i) => {
      const path = '/' + segments.slice(0, i + 1).join('/');
      return {
        label: seg.charAt(0).toUpperCase() + seg.slice(1).replace('-', ' '),
        path,
        isLast: i === segments.length - 1,
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative z-10 w-72 bg-slate-900 h-full flex flex-col shadow-2xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <span className="font-bold text-white text-sm">Navigation Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto" onClick={() => setMobileMenuOpen(false)}>
                <Sidebar />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-950">
          
          {/* Top Operational Bar (Breadcrumbs, Weather pill, Mobile Trigger) */}
          <div className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            
            {/* Left: Mobile Toggle & Breadcrumbs */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                id="mobile-nav-toggle"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 truncate">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="hover:text-emerald-400 transition-colors shrink-0"
                >
                  Farm
                </button>
                {breadcrumbs.map((b) => (
                  <React.Fragment key={b.path}>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <button
                      onClick={() => navigate(b.path)}
                      className={`truncate ${
                        b.isLast ? 'text-emerald-400 font-semibold' : 'hover:text-slate-200'
                      }`}
                    >
                      {b.label}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right: Live Agro-Climate Metric Pill */}
            <div className="flex items-center gap-3 shrink-0">
              <div 
                onClick={() => navigate('/weather')}
                className="cursor-pointer hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 hover:border-emerald-500/40 text-xs text-slate-300 transition-colors"
                id="header-weather-pill"
                title="Click to view full Microclimate & Spray Forecast"
              >
                <CloudSun className="w-4 h-4 text-amber-400" />
                <span>{weather.current.temp}°C • {weather.current.condition}</span>
                <span className="text-slate-400">|</span>
                <span className={`font-medium ${
                  weather.current.spraySuitability === 'optimal' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  Spray: {weather.current.spraySuitability.toUpperCase()}
                </span>
              </div>

              {unreadAlertCount > 0 && (
                <button
                  onClick={() => navigate('/alerts')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs font-semibold hover:bg-amber-950/60 transition-colors"
                  id="active-alerts-pill"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span>{unreadAlertCount} Alert{unreadAlertCount > 1 ? 's' : ''}</span>
                </button>
              )}
            </div>

          </div>

          {/* Page Body Container */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {pageTitle && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">{pageTitle}</h1>
                  {pageSubtitle && (
                    <p className="text-sm text-slate-400 mt-1">{pageSubtitle}</p>
                  )}
                </div>
              </div>
            )}

            {children}
          </div>

        </main>
      </div>
    </div>
  );
};
