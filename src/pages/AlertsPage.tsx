import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { AppLayout } from '../components/AppLayout';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Radar, 
  MapPin, 
  CheckCircle2, 
  Filter, 
  Clock, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { AgroAlert } from '../types';

export const AlertsPage: React.FC = () => {
  const { alerts, markAlertAsRead } = useFarm();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredAlerts = alerts.filter((alert) => {
    if (filterSeverity === 'all') return true;
    return alert.severity === filterSeverity;
  });

  return (
    <AppLayout
      pageTitle="Regional Pest & Outbreak Warning Radar"
      pageSubtitle="Automated Spore Trapping Network & Geospatial Epidemiology"
    >
      <div className="space-y-6">
        
        {/* Radar Map & Alert Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-900/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold">
              <Radar className="w-3.5 h-3.5 text-red-400 animate-spin" />
              <span>County Spore Sensor Radar: Active</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              3 Biological Disease Pressures Detected Within 25km Radius
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Spore trajectory models indicate elevated inoculum drift due to sustained south-westerly wind vectors. Review recommended preventative tank mixes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Filter Risk:</span>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Severities ({alerts.length})</option>
              <option value="critical">Critical Only</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
            </select>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 ${
                !alert.isRead
                  ? 'bg-slate-900 border-slate-700 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 opacity-90'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-xl shrink-0 ${
                    alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    alert.severity === 'high' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <ShieldAlert className="w-5 h-5" />
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{alert.title}</h3>
                      {!alert.isRead && (
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      Pathogen: <span className="text-emerald-300 font-semibold">{alert.pathogenName}</span> • Target: <span className="text-slate-200">{alert.targetCrops.join(', ')}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    alert.severity === 'critical' ? 'bg-red-950 text-red-300 border border-red-800' :
                    alert.severity === 'high' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {alert.severity} Risk
                  </span>

                  <span className="text-xs font-mono text-slate-400">
                    {alert.distanceKm > 0 ? `${alert.distanceKm} km away` : 'On-Farm Detection'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed pl-0 sm:pl-11">
                {alert.description}
              </p>

              {/* Preventive Advice Box */}
              <div className="sm:ml-11 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider block">
                  Agronomic Countermeasure
                </span>
                <p className="text-xs text-slate-200 font-medium">
                  {alert.preventativeAction}
                </p>
              </div>

              {/* Action Bar */}
              <div className="sm:ml-11 flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Broadcasted {alert.timestamp}
                </span>

                {!alert.isRead && (
                  <button
                    onClick={() => markAlertAsRead(alert.id)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Acknowledge & Mark Read</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
};
