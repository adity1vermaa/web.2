import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useFarm } from '../../context/FarmContext';
import { AppLayout } from '../../components/AppLayout';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  ScanLine, 
  AlertTriangle, 
  Cpu, 
  ArrowRight, 
  ChevronRight,
  TrendingUp,
  Database,
  Sprout
} from 'lucide-react';
import { MOCK_FARMS_LIST } from '../../data/mockData';

export const AdminDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { user } = useAuth();
  const { scans, alerts } = useFarm();

  const totalRegisteredFarms = MOCK_FARMS_LIST.length;
  const totalAcreage = MOCK_FARMS_LIST.reduce((acc, f) => acc + f.size, 0);

  return (
    <AppLayout
      pageTitle="Agronomic Admin & Laboratory Portal"
      pageSubtitle={`Dr. Sarah Vance • Central Pathology Research Network (${totalRegisteredFarms} Enterprise Farms Connected)`}
    >
      <div className="space-y-6">
        
        {/* Top Admin KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Total Monitored Acreage</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{totalAcreage.toLocaleString()}</span>
              <span className="text-xs text-slate-400 font-mono">Hectares</span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium">Across 4 Agricultural Basins</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Vision Model Accuracy</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-lime-400">99.2%</span>
              <span className="text-xs text-slate-400 font-mono">F1-Score</span>
            </div>
            <p className="text-[11px] text-slate-400">Gemini 3.7 Pathology fine-tune</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Inference Latency</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-teal-400">1.42s</span>
              <span className="text-xs text-teal-400 font-medium ml-auto">P95 Time</span>
            </div>
            <p className="text-[11px] text-slate-400">Edge CDN distributed processing</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Epidemic Warning Radars</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400">{alerts.length}</span>
              <span className="text-xs text-amber-400 font-medium ml-auto">Active</span>
            </div>
            <p className="text-[11px] text-slate-400">Spore traps transmitting live</p>
          </div>

        </div>

        {/* Quick Actions Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Agronomist Administrative Privileges Enabled
            </span>
            <p className="text-xs text-slate-300">
              You can verify model diagnoses, inspect grower telemetry, or switch to the grower dashboard.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/admin/scans')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <ScanLine className="w-3.5 h-3.5 text-lime-400" />
              <span>Verify AI Scans</span>
            </button>

            <button
              onClick={() => navigate('/admin/farms')}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Manage Farms</span>
            </button>
          </div>
        </div>

        {/* Two Columns: Recent Enterprise Ingestions & Connected Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Real-time Ingestion Stream (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Real-time Pathology Ingestion Stream
                </h3>
                <p className="text-xs text-slate-400">Live incoming field specimen uploads across all registered farms</p>
              </div>

              <button
                onClick={() => navigate('/admin/scans')}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View Full Stream</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={scan.imageUrl}
                      alt={scan.diagnosis.diseaseName}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-800 shrink-0"
                    />
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-white truncate">{scan.diagnosis.diseaseName}</h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {scan.cropType} • {scan.fieldName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-0.5">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {scan.diagnosis.confidenceScore}% Conf.
                    </span>
                    <span className="block text-[10px] text-slate-400">{scan.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Connected Commercial Farms Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-400" />
                  Commercial Farm Clients
                </h3>
                <p className="text-xs text-slate-400">Enterprise accounts under management</p>
              </div>

              <button
                onClick={() => navigate('/admin/farms')}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>All Accounts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_FARMS_LIST.map((farm) => (
                <div
                  key={farm.id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{farm.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Health {farm.healthIndex}/100
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{farm.owner} • {farm.location}</span>
                    <span className="font-mono text-white">{farm.size} ha</span>
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
