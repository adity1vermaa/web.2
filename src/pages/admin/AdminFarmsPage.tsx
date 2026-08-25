import React, { useState } from 'react';
import { AppLayout } from '../../components/AppLayout';
import { 
  Users, 
  MapPin, 
  Sprout, 
  Plus, 
  Search, 
  CheckCircle2, 
  Layers, 
  ShieldCheck,
  X
} from 'lucide-react';
import { MOCK_FARMS_LIST } from '../../data/mockData';

export const AdminFarmsPage: React.FC = () => {
  const [farms, setFarms] = useState(MOCK_FARMS_LIST);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newFarmName, setNewFarmName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newLocation, setNewLocation] = useState('Central Valley, CA');
  const [newSize, setNewSize] = useState(250);
  const [newCrops, setNewCrops] = useState('Corn, Wheat');

  const filteredFarms = farms.filter((f) => 
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.owner.toLowerCase().includes(search.toLowerCase()) ||
    f.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmName) return;

    const newEntry = {
      id: `farm-${Date.now()}`,
      name: newFarmName,
      owner: newOwner,
      location: newLocation,
      size: Number(newSize),
      crops: newCrops.split(',').map((c) => c.trim()),
      healthIndex: 88,
    };

    setFarms([newEntry, ...farms]);
    setIsAddModalOpen(false);
    setNewFarmName('');
    setNewOwner('');
  };

  return (
    <AppLayout
      pageTitle="Enterprise Farms Directory"
      pageSubtitle="Commercial Growers, Agricultural Acreage & Health Indices Under Administration"
    >
      <div className="space-y-6">
        
        {/* Search & Actions */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search farm, grower, or region..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 font-bold text-xs shadow flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Register Enterprise Farm</span>
          </button>
        </div>

        {/* Farms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFarms.map((farm) => (
            <div
              key={farm.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{farm.name}</h3>
                  <p className="text-xs text-slate-400">{farm.owner}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Health {farm.healthIndex}%
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{farm.location}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Layers className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{farm.size.toLocaleString()} ha operational</span>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Cultivated Crops:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {farm.crops.map((crop, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Farm Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">Add Enterprise Farm</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddFarm} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Farm Name *</label>
                  <input
                    type="text"
                    required
                    value={newFarmName}
                    onChange={(e) => setNewFarmName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Lead Grower / Owner</label>
                  <input
                    type="text"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Region</label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Acreage (ha)</label>
                    <input
                      type="number"
                      value={newSize}
                      onChange={(e) => setNewSize(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Crops (comma separated)</label>
                  <input
                    type="text"
                    value={newCrops}
                    onChange={(e) => setNewCrops(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
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
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                  >
                    Register Farm
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
