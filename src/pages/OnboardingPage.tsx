import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { Navbar } from '../components/Navbar';
import { 
  Sprout, 
  Layers, 
  MapPin, 
  CloudSun, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Satellite
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { navigate } = useRouter();
  const { user, updateProfile } = useAuth();
  const { addField } = useFarm();

  const [step, setStep] = useState(1);
  const [farmData, setFarmData] = useState({
    farmName: user?.farmName || 'Silver Creek Farms',
    location: user?.location || 'Salinas Valley, CA',
    farmSize: user?.farmSize || 240,
    primaryCrops: ['Corn / Maize', 'Tomato'],
    soilType: 'Silt Loam (pH 6.5)',
    irrigationType: 'Drip & Center Pivot',
    satelliteSync: true,
    frostAlerts: true,
  });

  const availableCrops = [
    'Corn / Maize',
    'Tomato',
    'Hard Red Wheat',
    'Soybean',
    'Grapevine',
    'Apple / Orchard',
    'Potato',
    'Cotton',
  ];

  const toggleCrop = (crop: string) => {
    if (farmData.primaryCrops.includes(crop)) {
      setFarmData({
        ...farmData,
        primaryCrops: farmData.primaryCrops.filter((c) => c !== crop),
      });
    } else {
      setFarmData({
        ...farmData,
        primaryCrops: [...farmData.primaryCrops, crop],
      });
    }
  };

  const handleFinish = () => {
    updateProfile({
      farmName: farmData.farmName,
      location: farmData.location,
      farmSize: farmData.farmSize,
    });

    // Create an initial field plot
    addField({
      name: `${farmData.farmName} - Sector 1`,
      cropType: farmData.primaryCrops[0] || 'Corn / Maize',
      variety: 'Commercial Pioneer Premium',
      acreage: Math.round(farmData.farmSize * 0.4),
      plantingDate: '2026-05-15',
      expectedHarvestDate: '2026-10-10',
      soilMoisture: 68,
      soilTemperature: 22.4,
      status: 'thriving',
      coordinates: '36.6777° N, 121.6555° W',
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          
          {/* Progress Indicator */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span className="text-emerald-400">Step {step} of 3</span>
              <span>{step === 1 ? 'Farm Boundaries' : step === 2 ? 'Crops & Soil' : 'Telemetry & Radar'}</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-lime-400 h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Farm Boundaries & Size */}
          {step === 1 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <MapPin className="w-3.5 h-3.5" />
                  Farm Spatial Setup
                </div>
                <h2 className="text-xl font-bold text-white">Define Your Agricultural Property</h2>
                <p className="text-xs text-slate-400">
                  We use this metadata to calculate microclimate weather models and regional pest drift trajectories.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Official Farm / Estate Name
                  </label>
                  <input
                    type="text"
                    value={farmData.farmName}
                    onChange={(e) => setFarmData({ ...farmData, farmName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      County / Agricultural District
                    </label>
                    <input
                      type="text"
                      value={farmData.location}
                      onChange={(e) => setFarmData({ ...farmData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Total Operational Acreage (ha)
                    </label>
                    <input
                      type="number"
                      value={farmData.farmSize}
                      onChange={(e) => setFarmData({ ...farmData, farmSize: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Irrigation Infrastructure
                  </label>
                  <select
                    value={farmData.irrigationType}
                    onChange={(e) => setFarmData({ ...farmData, irrigationType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Drip & Center Pivot">Drip & Center Pivot</option>
                    <option value="Sub-surface Drip (SDI)">Sub-surface Drip (SDI)</option>
                    <option value="Overhead Sprinklers">Overhead Sprinklers</option>
                    <option value="Rainfed / Dryland">Rainfed / Dryland</option>
                    <option value="Hydroponic Ebb & Flow">Hydroponic Ebb & Flow</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                >
                  <span>Next: Crop Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Crops & Soil */}
          {step === 2 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <Sprout className="w-3.5 h-3.5" />
                  Crop Varieties
                </div>
                <h2 className="text-xl font-bold text-white">Select Primary Crops Under Management</h2>
                <p className="text-xs text-slate-400">
                  Gemini Vision will automatically prioritize disease diagnostic models for these cultivars.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableCrops.map((crop) => {
                    const isSelected = farmData.primaryCrops.includes(crop);
                    return (
                      <button
                        key={crop}
                        type="button"
                        onClick={() => toggleCrop(crop)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-500'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Sprout className={`w-4 h-4 ${isSelected ? 'text-lime-400' : 'text-slate-400'}`} />
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <span className="block truncate font-semibold">{crop}</span>
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Dominant Soil Profile
                  </label>
                  <select
                    value={farmData.soilType}
                    onChange={(e) => setFarmData({ ...farmData, soilType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Silt Loam (pH 6.5)">Silt Loam (pH 6.5) - Well-drained</option>
                    <option value="Clay Loam (pH 6.8)">Clay Loam (pH 6.8) - High moisture capacity</option>
                    <option value="Sandy Loam (pH 6.0)">Sandy Loam (pH 6.0) - High percolation</option>
                    <option value="Black Chernozem (pH 7.2)">Black Chernozem (pH 7.2) - High organic matter</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                >
                  <span>Next: Telemetry & Ingestion</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Satellite & Telemetry Integration */}
          {step === 3 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <Satellite className="w-3.5 h-3.5" />
                  Live Feeds & Warning Systems
                </div>
                <h2 className="text-xl font-bold text-white">Enable Real-Time Remote Sensing</h2>
                <p className="text-xs text-slate-400">
                  Automate satellite multi-spectral NDVI tile synchronization and regional pest alerts.
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Satellite className="w-4 h-4 text-teal-400" />
                      Sentinel-2 Multi-Spectral Ingestion
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Automatic 5-day NDVI vegetation chlorophyll calculation at 10m resolution.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={farmData.satelliteSync}
                    onChange={(e) => setFarmData({ ...farmData, satelliteSync: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <CloudSun className="w-4 h-4 text-amber-400" />
                      Microclimate Delta T & Spray Window Alerts
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Automated notifications when temperature and wind conditions are optimal for spraying.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={farmData.frostAlerts}
                    onChange={(e) => setFarmData({ ...farmData, frostAlerts: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700"
                  />
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                  id="onboarding-complete-btn"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Farm Workspace</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
