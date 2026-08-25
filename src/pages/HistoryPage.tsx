import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { AppLayout } from '../components/AppLayout';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Leaf, 
  X, 
  Clock,
  Sparkles
} from 'lucide-react';
import { CropScan } from '../types';

export const HistoryPage: React.FC = () => {
  const { scans, updateScanStatus } = useFarm();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedScan, setSelectedScan] = useState<CropScan | null>(null);

  const filteredScans = scans.filter((s) => {
    const matchesSearch = 
      s.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.diagnosis.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.fieldName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = 'ID,Timestamp,Crop,Field,Disease,Pathogen,Confidence,Severity,Status\n';
    const rows = scans.map(s => 
      `"${s.id}","${s.timestamp}","${s.cropType}","${s.fieldName}","${s.diagnosis.diseaseName}","${s.diagnosis.pathogenType}",${s.diagnosis.confidenceScore}%,"${s.diagnosis.severityLevel}","${s.status}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `agrivision_pathology_log_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout
      pageTitle="Diagnostic Scan & Treatment Log"
      pageSubtitle="Comprehensive Historical Audit Trail of Field Pathogens & Chemical Applications"
    >
      <div className="space-y-6">
        
        {/* Filter & Export Bar */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search disease, crop, or plot..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Statuses ({scans.length})</option>
              <option value="active">Active Treatments</option>
              <option value="monitoring">Monitoring</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            id="export-csv-btn"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV Audit Log</span>
          </button>
        </div>

        {/* Scans Table / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScans.map((scan) => (
            <div
              key={scan.id}
              onClick={() => setSelectedScan(scan)}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 shadow-lg group"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={scan.imageUrl}
                  alt={scan.diagnosis.diseaseName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shadow ${
                    scan.status === 'resolved' ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-800' :
                    scan.status === 'monitoring' ? 'bg-blue-950/90 text-blue-300 border border-blue-800' :
                    'bg-amber-950/90 text-amber-300 border border-amber-800'
                  }`}>
                    {scan.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white truncate">{scan.diagnosis.diseaseName}</h3>
                  <span className="text-xs font-mono font-bold text-emerald-400">{scan.diagnosis.confidenceScore}%</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {scan.cropType} • {scan.fieldName}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{scan.timestamp}</span>
                <span className="text-emerald-400 group-hover:underline">View Full Rx →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Scan Detail Modal */}
        {selectedScan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Specimen Record #{selectedScan.id}</span>
                  <h3 className="text-base font-bold text-white">{selectedScan.diagnosis.diseaseName}</h3>
                </div>
                <button
                  onClick={() => setSelectedScan(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[4/3]">
                  <img
                    src={selectedScan.imageUrl}
                    alt={selectedScan.diagnosis.diseaseName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Crop:</span>
                      <span className="font-semibold text-white">{selectedScan.cropType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sector:</span>
                      <span className="font-semibold text-white">{selectedScan.fieldName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pathogen Type:</span>
                      <span className="font-semibold text-emerald-300">{selectedScan.diagnosis.pathogenType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Severity:</span>
                      <span className="font-semibold text-amber-400">{selectedScan.diagnosis.severityLevel}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Update Status</label>
                    <select
                      value={selectedScan.status}
                      onChange={(e) => {
                        updateScanStatus(selectedScan.id, e.target.value as any);
                        setSelectedScan({ ...selectedScan, status: e.target.value as any });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="active">Active (Treatment Underway)</option>
                      <option value="monitoring">Monitoring (Symptoms Stabilizing)</option>
                      <option value="resolved">Resolved (Pathogen Cleared)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Prescribed Treatments */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1.5">
                  <h4 className="font-bold text-emerald-300">Organic & Bio-Control Recommendation</h4>
                  <ul className="space-y-1 text-slate-200">
                    {selectedScan.diagnosis.organicTreatment.map((t, idx) => (
                      <li key={idx}>• {t}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-white">Chemical Dosage Guidelines</h4>
                  <ul className="space-y-1 text-slate-300">
                    {selectedScan.diagnosis.chemicalTreatment.map((t, idx) => (
                      <li key={idx}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedScan(null)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
                >
                  Close Inspection
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};
