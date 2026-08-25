import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppLayout } from '../components/AppLayout';
import { 
  Settings as SettingsIcon, 
  User, 
  Sprout, 
  Bell, 
  Satellite, 
  ShieldCheck, 
  Check, 
  Save, 
  Trash2,
  Lock
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    farmName: user?.farmName || '',
    location: user?.location || '',
    farmSize: user?.farmSize || 0,
    country: user?.country || 'United States',
    units: user?.unit || 'metric',
    emailAlerts: true,
    frostPushNotifications: true,
    satelliteSyncFrequency: '5-days',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      farmName: formData.farmName,
      location: formData.location,
      farmSize: Number(formData.farmSize),
      country: formData.country,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <AppLayout
      pageTitle="Farm Settings & Account Preferences"
      pageSubtitle="Telemetry Ingestion Frequencies, Geospatial Coordinates & Notification Thresholds"
    >
      <div className="max-w-4xl space-y-6">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Profile & Farm Information */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              Grower Profile & Operations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Farm / Property Name</label>
                <input
                  type="text"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Agricultural District / Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Total Acreage (ha)</label>
                <input
                  type="number"
                  value={formData.farmSize}
                  onChange={(e) => setFormData({ ...formData, farmSize: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Sensor & Satellite Ingestion Rules */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Satellite className="w-4 h-4 text-teal-400" />
              Remote Sensing & Microclimate Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Unit of Measurement</label>
                <select
                  value={formData.units}
                  onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="metric">Metric (Celsius, Hectares, mm/day)</option>
                  <option value="imperial">Imperial (Fahrenheit, Acres, in/day)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Sentinel-2 NDVI Synchronization</label>
                <select
                  value={formData.satelliteSyncFrequency}
                  onChange={(e) => setFormData({ ...formData, satelliteSyncFrequency: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="5-days">Standard Orbital Cycle (Every 5 Days)</option>
                  <option value="daily-fusion">Daily PlanetScope Super-Resolution (Enterprise)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.frostPushNotifications}
                  onChange={(e) => setFormData({ ...formData, frostPushNotifications: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-0"
                />
                <span>Enable automated frost alert & Delta T spray threshold push notifications</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.emailAlerts}
                  onChange={(e) => setFormData({ ...formData, emailAlerts: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-0"
                />
                <span>Send weekly PDF crop health digest to registered farm email</span>
              </label>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                Settings successfully persisted
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold text-xs shadow transition-all flex items-center gap-2"
              id="save-settings-btn"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>

        </form>

      </div>
    </AppLayout>
  );
};
