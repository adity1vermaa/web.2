import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { AppLayout } from '../components/AppLayout';
import { 
  Sprout, 
  ScanLine, 
  Layers, 
  CloudSun, 
  Bell, 
  TrendingUp, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  Droplets, 
  Thermometer, 
  Wind,
  Compass,
  ChevronRight,
  ShieldAlert,
  Activity
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { user } = useAuth();
  const { scans, fields, alerts, weather } = useFarm();

  // Summary Metrics Calculation
  const totalAcreage = fields.reduce((acc, f) => acc + f.acreage, 0);
  const avgHealth = Math.round(fields.reduce((acc, f) => acc + f.healthScore, 0) / (fields.length || 1));
  const activeScans = scans.filter((s) => s.status === 'active');
  const recentAlert = alerts.find((a) => !a.isRead) || alerts[0];

  return (
    <AppLayout
      pageTitle={`Welcome back, ${user?.name.split(' ')[0] || 'Grower'}`}
      pageSubtitle={`${user?.farmName || 'Highland Valley Farm'} • ${totalAcreage.toFixed(1)} ha Managed`}
    >
      <div className="space-y-6">
        
        {/* Top Hero KPI Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* KPI 1: Overall Farm Health Index */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Canopy Health Index</span>
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Sprout className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{avgHealth}</span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
              <span className="text-xs font-semibold text-emerald-400 ml-auto bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                +2.4% vs last week
              </span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${avgHealth}%` }} />
            </div>
          </div>

          {/* KPI 2: Active Pathogen Alerts */}
          <div 
            onClick={() => navigate('/alerts')}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Active Pathogen Alerts</span>
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Bell className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{activeScans.length}</span>
              <span className="text-xs text-amber-400 font-medium">
                {activeScans.length > 0 ? 'Requires attention' : 'All plots normal'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {recentAlert ? recentAlert.title : 'No active outbreaks'}
            </p>
          </div>

          {/* KPI 3: Spray Suitability */}
          <div 
            onClick={() => navigate('/weather')}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Spray Window Status</span>
              <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                <CloudSun className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold capitalize ${
                weather.current.spraySuitability === 'optimal' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {weather.current.spraySuitability}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Delta T: {weather.current.sprayDeltaT} • Wind: {weather.current.windSpeed} km/h
            </p>
          </div>

          {/* KPI 4: Mean Soil Moisture */}
          <div 
            onClick={() => navigate('/fields')}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Mean Soil Moisture</span>
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Droplets className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">65.4%</span>
              <span className="text-xs text-blue-400 font-medium">Field Capacity</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Optimal range (60-75% FC)
            </p>
          </div>

        </div>

        {/* Action Bar & Quick Diagnostics Launcher */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-400">
              <Sparkles className="w-4 h-4" />
              <span>Multi-Modal Crop Diagnosis</span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Notice any discoloration, lesions, or leaf wilting in the field?
            </h2>
            <p className="text-xs text-slate-300">
              Upload or snap a high-resolution leaf photo for sub-second Gemini 3.7 Vision pathology analysis and targeted bio-treatments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/scanner')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
              id="dash-quick-scan-btn"
            >
              <ScanLine className="w-4 h-4" />
              <span>Launch AI Diagnostic Scanner</span>
            </button>
            
            <button
              onClick={() => navigate('/advisor')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
              id="dash-consult-advisor-btn"
            >
              <span>Ask Dr. Agronomist</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Two-Column Core Layout: Fields Health Summary & Recent Scans */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Managed Plots & NDVI (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-400" />
                  Field Plots & NDVI Chlorophyll Index
                </h3>
                <p className="text-xs text-slate-400">Real-time status of active cultivation sectors</p>
              </div>

              <button
                onClick={() => navigate('/fields')}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View All Fields</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {fields.slice(0, 3).map((field) => (
                <div
                  key={field.id}
                  onClick={() => navigate('/fields')}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{field.name}</h4>
                      <p className="text-[11px] text-slate-400">{field.cropType} • {field.variety} • {field.acreage} ha</p>
                    </div>

                    <div className="text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        field.status === 'thriving' 
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {field.status}
                      </span>
                    </div>
                  </div>

                  {/* Telemetry Row */}
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">NDVI Index</span>
                      <span className="font-mono font-bold text-teal-400">{field.ndviScore.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Soil Moisture</span>
                      <span className="font-mono font-bold text-blue-400">{field.soilMoisture}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Soil pH</span>
                      <span className="font-mono font-bold text-emerald-300">{field.soilNPK.ph}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Nitrogen (N)</span>
                      <span className="font-mono font-bold text-lime-400">{field.soilNPK.nitrogen} ppm</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Recent Pathology Scans (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ScanLine className="w-4 h-4 text-emerald-400" />
                  Recent Pathology Scans
                </h3>
                <p className="text-xs text-slate-400">Diagnostic history and active treatments</p>
              </div>

              <button
                onClick={() => navigate('/history')}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Full Logs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {scans.slice(0, 3).map((scan) => (
                <div
                  key={scan.id}
                  onClick={() => navigate('/scanner')}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all flex gap-3.5"
                >
                  <img
                    src={scan.imageUrl}
                    alt={scan.diagnosis.diseaseName}
                    className="w-16 h-16 rounded-lg object-cover border border-slate-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">
                        {scan.diagnosis.diseaseName}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">
                        {scan.diagnosis.confidenceScore}%
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 truncate">
                      {scan.cropType} • {scan.fieldName}
                    </p>

                    <div className="flex items-center justify-between text-[10px] pt-1">
                      <span className="text-slate-400">{scan.timestamp}</span>
                      <span className={`px-1.5 py-0.2 rounded font-semibold capitalize ${
                        scan.status === 'resolved' 
                          ? 'bg-emerald-950 text-emerald-300' 
                          : 'bg-amber-950 text-amber-300'
                      }`}>
                        {scan.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};
