import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import {
  LayoutDashboard,
  ScanLine,
  Layers,
  CloudSun,
  Bell,
  TrendingUp,
  BotMessageSquare,
  History,
  Settings,
  ShieldCheck,
  Cpu,
  Users,
  BookOpen,
  Sliders,
  ChevronRight,
  Sprout
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { currentPath, navigate } = useRouter();
  const { user, isAdmin } = useAuth();
  const { unreadAlertCount } = useFarm();

  const farmerNavItems = [
    { label: 'Farm Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Crop Diagnostic', path: '/scanner', icon: ScanLine, badge: 'Vision' },
    { label: 'Fields & NDVI Maps', path: '/fields', icon: Layers },
    { label: 'Weather & Spray Window', path: '/weather', icon: CloudSun },
    { 
      label: 'Early Warning Radar', 
      path: '/alerts', 
      icon: Bell, 
      count: unreadAlertCount > 0 ? unreadAlertCount : undefined 
    },
    { label: 'Yield & Market Analytics', path: '/analytics', icon: TrendingUp },
    { label: 'AI Agronomist Chat', path: '/advisor', icon: BotMessageSquare, badge: 'Gemini' },
    { label: 'Scan & Treatment Logs', path: '/history', icon: History },
    { label: 'Farm Settings', path: '/settings', icon: Settings },
  ];

  const adminNavItems = [
    { label: 'Global Dashboard', path: '/admin/dashboard', icon: ShieldCheck },
    { label: 'Model Diagnostics', path: '/admin/models', icon: Cpu },
    { label: 'Grower Directory', path: '/admin/users', icon: Users },
    { label: 'Pathogen Knowledge Base', path: '/admin/diseases', icon: BookOpen },
    { label: 'System Configuration', path: '/admin/settings', icon: Sliders },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Farm / Admin Summary Badge */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            {isAdmin ? (
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            ) : (
              <Sprout className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-white truncate">
              {isAdmin ? 'System Admin Center' : (user?.farmName || 'My Farm')}
            </h3>
            <p className="text-[11px] text-slate-400 truncate">
              {isAdmin ? 'AgriVision AI Core' : `${user?.farmSize ?? 0} ha • ${user?.location || 'Agricultural Basin'}`}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* Farmer Portal Section */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Agronomy Workspace
          </div>
          <div className="space-y-1">
            {farmerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                  id={`sidebar-link-${item.path.replace('/', '')}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Admin Section if Admin Role */}
        {isAdmin && (
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              Administrator Control
            </div>
            <div className="space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-sm font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                    id={`sidebar-link-${item.path.replace(/[/]/g, '-')}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : ''}`} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Quick Support */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/30">
        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/30 text-emerald-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-white">AI Diagnostic Engine</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-[10px] text-emerald-300/80 leading-relaxed">
            Multi-spectral Vision v3.7 active • 99.4% pathogen uptime
          </p>
        </div>
      </div>
    </aside>
  );
};
