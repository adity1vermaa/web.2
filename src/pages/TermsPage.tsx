import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FileText, ArrowLeft, AlertTriangle, ShieldCheck } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
            id="terms-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={() => navigate('/privacy')}
            className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Privacy Policy
          </button>
        </div>

        {/* Title */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-xs text-emerald-300">
            <FileText className="w-3.5 h-3.5 text-lime-400" />
            <span>Platform Agreement</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Terms of Service & Agronomic Disclaimer</h1>
          <p className="text-xs text-slate-400">Effective: August 2026</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
          
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-2">
            <h2 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              1. Professional Agronomic Advice Disclaimer
            </h2>
            <p className="text-amber-200/90 leading-relaxed">
              AgriVision AI provides computer vision disease classification, microclimate modeling, and algorithmic treatment suggestions intended as decision support tools for qualified farm operators and agronomists. While our models operate at high diagnostic accuracy, all chemical dosages, fungicide mixtures, and pesticide applications must be verified against local chemical product label instructions, regional environmental regulations, and certified crop advisor recommendations.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">2. User Account & Field Records</h3>
            <p className="text-slate-400">
              Users are responsible for maintaining account confidentiality and ensuring accurate plot boundaries. You agree not to upload non-agricultural or unauthorized visual media to the diagnostic pipeline.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">3. Chemical Application & Safety</h3>
            <p className="text-slate-400">
              Users assume all liability regarding physical chemical handling, personal protective equipment (PPE) compliance, buffer zone maintenance, and environmental run-off management.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">4. Subscription & Commercial Usage</h3>
            <p className="text-slate-400">
              Free Scout tier includes up to 50 monthly AI scans. Pro Agronomist and Enterprise Farm tiers provide unlimited vision scans, API connectors, and automated multi-spectral satellite ingestion.
            </p>
          </div>

        </div>

        {/* Footer Link */}
        <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">Questions regarding legal terms? Contact legal@agrivision.ai</span>
          <button
            onClick={() => navigate('/privacy')}
            className="text-emerald-400 hover:underline font-semibold"
          >
            Review Farm Data Privacy Policy →
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
};
