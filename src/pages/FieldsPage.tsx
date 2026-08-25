import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { AppLayout } from '../components/AppLayout';
import { 
  Layers, 
  Plus, 
  MapPin, 
  Sprout, 
  Droplets, 
  Thermometer, 
  Calendar, 
  Activity, 
  Eye, 
  Filter, 
  Sparkles,
  X,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { FieldPlot } from '../types';

export const FieldsPage: React.FC = () => {
  const { fields, addField, updateField } = useFarm();
  const [selectedFieldId, setSelectedFieldId] = useState<string>(fields[0]?.id || '');
  const [ndviOverlay, setNdviOverlay] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Field Form State
  const [newFieldName, setNewFieldName] = useState('');
  const [newCropType, setNewCropType] = useState('Corn / Maize');
  const [newVariety, setNewVariety] = useState('Golden Harvest Hybrid');
  const [newAcreage, setNewAcreage] = useState(45.0);
  const [newPlantingDate, setNewPlantingDate] = useState('2026-05-20');
  const [newHarvestDate, setNewHarvestDate] = useState('2026-10-15');

  const activeField = fields.find((f) => f.id === selectedFieldId) || fields[0];

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName) return;

    addField({
      name: newFieldName,
      cropType: newCropType,
      variety: newVariety,
      acreage: Number(newAcreage) || 20,
      plantingDate: newPlantingDate,
      expectedHarvestDate: newHarvestDate,
      soilMoisture: 65,
      soilTemperature: 21.0,
      status: 'thriving',
      coordinates: '45.1320° N, 123.1020° W',
    });

    setIsAddModalOpen(false);
    setNewFieldName('');
  };

  return (
    <AppLayout
      pageTitle="Field & Plot Management"
      pageSubtitle="Sentinel-2 Multi-Spectral NDVI Chlorophyll Maps & Soil In-Situ Telemetry"
    >
      <div className="space-y-6">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300">Spectral Layer:</span>
            <button
              onClick={() => setNdviOverlay(!ndviOverlay)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                ndviOverlay
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>NDVI Chlorophyll False-Color {ndviOverlay ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold text-xs shadow transition-all flex items-center gap-1.5"
            id="add-field-modal-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Add Cultivation Sector</span>
          </button>
        </div>

        {/* Visual Simulated Satellite Farm Grid & Plot Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Visual Farm Map (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Spatial Cadastral Overlay</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Sentinel-2 10m Multi-Spectral</span>
              </div>

              {/* Graphical Simulated Plot Map */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-4 grid grid-cols-3 gap-3">
                {fields.map((f, idx) => {
                  const isSelected = f.id === activeField?.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFieldId(f.id)}
                      className={`relative rounded-lg p-3 cursor-pointer transition-all flex flex-col justify-between overflow-hidden border ${
                        isSelected
                          ? 'border-emerald-400 ring-2 ring-emerald-400/40 shadow-xl'
                          : 'border-slate-800 hover:border-slate-600'
                      } ${
                        ndviOverlay
                          ? f.ndviScore > 0.8
                            ? 'bg-gradient-to-br from-emerald-900/90 to-teal-950/90'
                            : f.ndviScore > 0.7
                            ? 'bg-gradient-to-br from-lime-950/90 to-emerald-950/90'
                            : 'bg-gradient-to-br from-amber-950/90 to-yellow-950/90'
                          : 'bg-slate-900/90'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold text-white truncate max-w-[90px]">{f.name}</span>
                        <span className={`px-1 py-0.2 rounded text-[9px] font-mono font-bold ${
                          f.status === 'thriving' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {f.status}
                        </span>
                      </div>

                      <div className="space-y-0.5 pt-2">
                        <p className="text-[10px] text-slate-300">{f.cropType}</p>
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-teal-300 font-bold">NDVI {f.ndviScore.toFixed(2)}</span>
                          <span className="text-slate-400">{f.acreage} ha</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* NDVI Color Legend */}
              {ndviOverlay && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">NDVI Scale:</span>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-amber-600 inline-block" />
                      <span className="text-slate-300">&lt; 0.70 (Stress)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-lime-500 inline-block" />
                      <span className="text-slate-300">0.70 - 0.80 (Vigorous)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
                      <span className="text-slate-300">&gt; 0.80 (Dense Canopy)</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Selected Field Inspector (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {activeField ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Sector Inspector</span>
                    <h3 className="text-lg font-bold text-white">{activeField.name}</h3>
                    <p className="text-xs text-slate-400">{activeField.cropType} • {activeField.variety}</p>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    activeField.status === 'thriving'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {activeField.status}
                  </span>
                </div>

                {/* Quantitative Gauges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Canopy NDVI Health</span>
                    <span className="text-xl font-mono font-bold text-teal-400">{activeField.ndviScore.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 block">Sentinel-2 5-day cycle</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Soil Moisture</span>
                    <span className="text-xl font-mono font-bold text-blue-400">{activeField.soilMoisture}% FC</span>
                    <span className="text-[10px] text-slate-400 block">Root zone 20-40cm</span>
                  </div>
                </div>

                {/* In-Situ Soil Chemistry (NPK + pH) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Soil Nutrients & pH</h4>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Nitrogen (N)</span>
                      <span className="font-mono font-bold text-lime-400">{activeField.soilNPK.nitrogen}</span>
                      <span className="text-[9px] text-slate-400 block">ppm</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Phosphorus (P)</span>
                      <span className="font-mono font-bold text-emerald-400">{activeField.soilNPK.phosphorus}</span>
                      <span className="text-[9px] text-slate-400 block">ppm</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Potassium (K)</span>
                      <span className="font-mono font-bold text-amber-400">{activeField.soilNPK.potassium}</span>
                      <span className="text-[9px] text-slate-400 block">ppm</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Soil pH</span>
                      <span className="font-mono font-bold text-teal-300">{activeField.soilNPK.ph}</span>
                      <span className="text-[9px] text-slate-400 block">Optimal</span>
                    </div>
                  </div>
                </div>

                {/* Agronomic Dates & Spatial Coords */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Planting Date:</span>
                    <span className="font-semibold text-white">{activeField.plantingDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Harvest Window:</span>
                    <span className="font-semibold text-white">{activeField.expectedHarvestDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Geospatial Bounds:</span>
                    <span className="font-mono text-emerald-400 text-[11px]">{activeField.coordinates}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
                Select a field on the map to inspect telemetry
              </div>
            )}
          </div>

        </div>

        {/* Add Field Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  Add Cultivation Sector / Plot
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateField} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Sector Name *</label>
                  <input
                    type="text"
                    required
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    placeholder="e.g. South Ridge Plot B"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Crop Type</label>
                    <select
                      value={newCropType}
                      onChange={(e) => setNewCropType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Corn / Maize">Corn / Maize</option>
                      <option value="Tomato">Tomato</option>
                      <option value="Hard Red Winter Wheat">Hard Red Winter Wheat</option>
                      <option value="Soybean">Soybean</option>
                      <option value="Grapevine">Grapevine</option>
                      <option value="Apples & Pears">Apples & Pears</option>
                      <option value="Potato">Potato</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Cultivar / Variety</label>
                    <input
                      type="text"
                      value={newVariety}
                      onChange={(e) => setNewVariety(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Area (ha)</label>
                    <input
                      type="number"
                      value={newAcreage}
                      onChange={(e) => setNewAcreage(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Planting Date</label>
                    <input
                      type="date"
                      value={newPlantingDate}
                      onChange={(e) => setNewPlantingDate(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Harvest Window</label>
                    <input
                      type="date"
                      value={newHarvestDate}
                      onChange={(e) => setNewHarvestDate(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow"
                  >
                    Create Field Plot
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};
