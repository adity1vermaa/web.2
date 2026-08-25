import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { 
  Sprout, 
  Cpu, 
  ShieldCheck, 
  Globe2, 
  Award, 
  ArrowLeft, 
  ArrowRight,
  Database,
  CloudRain,
  Eye,
  CheckCircle2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate, goBack } = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Navigation & Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            id="about-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="text-xs font-semibold text-slate-950 bg-lime-400 hover:bg-lime-300 px-3.5 py-1.5 rounded-lg shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-xs font-semibold text-emerald-300">
            <Cpu className="w-3.5 h-3.5 text-lime-400" />
            <span>Mission & Technology Stack</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Advancing Agronomy with Multimodal Artificial Intelligence
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            AgriVision AI was founded to democratize enterprise-grade agricultural pathology. By combining multi-spectral computer vision, regional fungal spore trajectory models, and satellite vegetation indices, we empower growers to protect crop yields sustainably.
          </p>
        </div>

        {/* AI Stack Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Gemini Multimodal Vision</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fine-tuned on over 1.4 million peer-reviewed botanical pathology specimens across solanaceous, grain, legume, and horticultural crop cultivars.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Sentinel-2 Satellite Mesh</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Continuous 5-day orbital constellation tracking of Normalized Difference Vegetation Index (NDVI) and Soil Moisture Index (SMI) at 10m resolution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CloudRain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Delta T Microclimate Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time atmospheric modeling calculating psychrometric wet-bulb depression to prescribe optimal chemical and biological spray windows.
            </p>
          </div>
        </div>

        {/* Commitment to Sustainable Agriculture */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/40 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sprout className="w-5 h-5 text-lime-400" />
            Our Commitment: Reducing Chemical Footprint by 35%
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            By targeting treatments specifically to active pathogen hotspots during optimal atmospheric absorption windows, AgriVision AI reduces indiscriminate broad-spectrum fungicide application, preserving beneficial soil microbiomes and saving input costs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Prioritizes OMRI-listed organic and bio-controls first</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Strict adherence to Pre-Harvest Interval (PHI) safety</span>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            Questions about our agronomic methodology? Read our platform policies.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/privacy')}
              className="text-xs text-slate-300 hover:text-emerald-400 font-medium"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => navigate('/terms')}
              className="text-xs text-slate-300 hover:text-emerald-400 font-medium"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="ml-3 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              Get Started Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
