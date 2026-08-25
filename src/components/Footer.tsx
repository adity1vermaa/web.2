import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Sprout, Shield, FileText, Heart, Globe, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer inline-flex"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">AgriVision AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering growers, agronomists, and agricultural enterprises with real-time AI pathology, microclimate spray modeling, and NDVI crop health intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>AgriVision AI Pathology System (Prototype)</span>
            </div>
          </div>

          {/* Col 2: Platform Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/scanner')} className="hover:text-emerald-400 transition-colors">
                  AI Crop Diagnostic Scanner
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/fields')} className="hover:text-emerald-400 transition-colors">
                  NDVI Satellite & Plot Mapping
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/weather')} className="hover:text-emerald-400 transition-colors">
                  Microclimate & Spray Window Engine
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/alerts')} className="hover:text-emerald-400 transition-colors">
                  Regional Outbreak Warning Radar
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/advisor')} className="hover:text-emerald-400 transition-colors">
                  Dr. Agronomist AI Chatbot
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Governance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-emerald-400 transition-colors">
                  About AgriVision & Team
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="hover:text-emerald-400 transition-colors">
                  Farm Data Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-emerald-400 transition-colors">
                  Terms of Service & Agronomy Disclaimer
                </button>
              </li>
              <li>
                <span className="text-slate-400">ISO 27001 & AgData Compliant</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Portals</h4>
            <div className="space-y-2.5">
              <button
                onClick={() => navigate('/login')}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-left text-slate-200 flex items-center justify-between transition-colors"
              >
                <span>Grower Portal Login</span>
                <span className="text-emerald-400 text-[10px]">Sign In →</span>
              </button>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="w-full px-3 py-2 rounded-lg bg-amber-950/30 hover:bg-amber-950/50 border border-amber-800/40 text-xs text-left text-amber-200 flex items-center justify-between transition-colors"
              >
                <span>Agronomist / Admin Console</span>
                <span className="text-amber-400 text-[10px]">Admin →</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              Version 3.7.0 • Global Satellite Mesh Active
            </p>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AgriVision AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/privacy')} className="hover:text-slate-300">Privacy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-slate-300">Terms</button>
            <button onClick={() => navigate('/about')} className="hover:text-slate-300">Technology</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
