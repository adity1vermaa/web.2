import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { AppLayout } from '../../components/AppLayout';
import { 
  ScanLine, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Eye, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { CropScan } from '../../types';

export const AdminScansPage: React.FC = () => {
  const { scans } = useFarm();
  const [verifiedScans, setVerifiedScans] = useState<Record<string, boolean>>({
    'scan-1': true,
  });

  const toggleVerify = (scanId: string) => {
    setVerifiedScans((prev) => ({
      ...prev,
      [scanId]: !prev[scanId],
    }));
  };

  return (
    <AppLayout
      pageTitle="Pathology Model Verification & Quality Audit"
      pageSubtitle="Expert Agronomist Human-In-The-Loop AI Validation & Active Learning Feedback"
    >
      <div className="space-y-6">
        
        {/* Verification Summary Banner */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Agronomist Model Validation Portal
            </h3>
            <p className="text-xs text-slate-400">
              Audit crop pathology inferences, confirm lesion segmentations, and mark verified samples for model retraining.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
              Verified: <strong className="text-emerald-400">{Object.values(verifiedScans).filter(Boolean).length}</strong> / {scans.length}
            </span>
          </div>
        </div>

        {/* Scans Grid */}
        <div className="space-y-4">
          {scans.map((scan) => {
            const isVerified = !!verifiedScans[scan.id];
            return (
              <div
                key={scan.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={scan.imageUrl}
                      alt={scan.diagnosis.diseaseName}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-800 shrink-0"
                    />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{scan.diagnosis.diseaseName}</h4>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-800">
                          {scan.diagnosis.confidenceScore}% Match
                        </span>
                      </div>

                      <p className="text-xs text-slate-400">
                        {scan.cropType} • Sector: {scan.fieldName} • Specimen ID #{scan.id}
                      </p>

                      <p className="text-xs text-slate-300">
                        Symptoms: <span className="text-slate-400">{scan.diagnosis.symptoms.join('; ')}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      onClick={() => toggleVerify(scan.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isVerified
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-sm'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {isVerified ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Doctor Verified</span>
                        </>
                      ) : (
                        <span>Verify Diagnosis</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Treatment Audit Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-300 uppercase">Prescribed Organic Bio-Control</span>
                    <p className="text-slate-300 text-[11px]">{scan.diagnosis.organicTreatment[0]}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-teal-300 uppercase">Chemical Fungicide Rate</span>
                    <p className="text-slate-300 text-[11px]">{scan.diagnosis.chemicalTreatment[0]}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </AppLayout>
  );
};
