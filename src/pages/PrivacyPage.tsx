import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShieldCheck, ArrowLeft, Lock, Database, EyeOff, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { navigate, goBack } = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Top */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => goBack()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            id="privacy-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={() => navigate('/terms')}
            className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </button>
        </div>

        {/* Title */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-xs text-emerald-300">
            <Lock className="w-3.5 h-3.5 text-lime-400" />
            <span>Farm Data Protection Standard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy & Farm Data Ownership</h1>
          <p className="text-xs text-slate-400">Last updated: August 2026 • Version 3.4</p>
        </div>

        {/* Policy Content */}
        <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
          
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              1. 100% Grower Data Sovereignty
            </h2>
            <p>
              At AgriVision AI, we believe your farm data belongs solely to you. We do not sell, rent, or commercialize individual grower telemetry, field boundaries, yield records, or diagnostic photographs to third-party input manufacturers or commodity traders without explicit opt-in consent.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">2. Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Field Diagnostics:</strong> Crop imagery uploaded for pathogen detection and lesion severity classification.</li>
              <li><strong className="text-slate-200">Geospatial Telemetry:</strong> Latitude/longitude bounding boxes for local microclimate forecast triangulation and regional pest alert radii.</li>
              <li><strong className="text-slate-200">Farm Profile:</strong> Acreage, primary crop cultivars, soil categorization, and irrigation methods.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">3. How AI Models Use Imagery</h3>
            <p className="text-slate-400">
              Diagnostic crop images processed via computer vision diagnostic services are analyzed ephemerally for disease symptom extraction. Anonymized, feature-extracted vectors may be utilized strictly to benchmark classification accuracy and detect emerging regional plant epidemics.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">4. Data Deletion & Export</h3>
            <p className="text-slate-400">
              Growers may at any time export full historical diagnostic logs in CSV/PDF format or request complete cryptographic deletion of all stored field records via the Farm Settings portal.
            </p>
          </div>

        </div>

        {/* Footer Link */}
        <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">Have privacy inquiries? Contact privacy@agrivision.ai</span>
          <button
            onClick={() => navigate('/terms')}
            className="text-emerald-400 hover:underline font-semibold"
          >
            Review Terms of Service →
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
};
