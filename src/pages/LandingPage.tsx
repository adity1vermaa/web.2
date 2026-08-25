import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { 
  Sprout, 
  ScanLine, 
  Layers, 
  CloudSun, 
  ShieldCheck, 
  TrendingUp, 
  BotMessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Eye,
  Activity,
  Zap,
  Leaf,
  Globe2,
  Award
} from 'lucide-react';
import { SAMPLE_DISEASE_IMAGES } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const activeDemo = SAMPLE_DISEASE_IMAGES[selectedDemoIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/80">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-lime-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-xs font-semibold text-emerald-300 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                <span>Next-Gen Gemini Multimodal Agricultural Vision</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Stop Crop Disease Before It Spreads.
              </h1>

              <p className="text-lg text-slate-300/90 leading-relaxed max-w-2xl font-normal">
                AgriVision AI combines deep multi-spectral computer vision, regional outbreak warning radars, and real-time microclimate spray modeling to protect yields and eliminate guesswork.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold text-base shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                  id="hero-get-started-btn"
                >
                  <span>Start Free Field Scout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base transition-colors flex items-center gap-2"
                  id="hero-signin-btn"
                >
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => navigate('/about')}
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/40 text-emerald-300 font-semibold text-sm transition-colors flex items-center gap-1.5"
                  id="hero-learn-more-btn"
                >
                  <Sparkles className="w-4 h-4 text-lime-400" />
                  <span>Learn More</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80">
                <div>
                  <p className="text-2xl font-bold text-white">99.2%</p>
                  <p className="text-xs text-slate-400">Pathogen Diagnostic Accuracy</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">100+ Crops</p>
                  <p className="text-xs text-slate-400">Arable, Vines & Horticulture</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">&lt; 1.8s</p>
                  <p className="text-xs text-slate-400">Instant AI Inference</p>
                </div>
              </div>

            </div>

            {/* Right Column: Live Interactive Interactive Diagnostic Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 shadow-2xl backdrop-blur-xl">
                
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Live Vision Scanner</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    Gemini 3.7 Vision
                  </span>
                </div>

                {/* Interactive Image Box */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800 group">
                  <img
                    src={activeDemo.imageUrl}
                    alt={activeDemo.label}
                    className="w-full h-full object-cover"
                  />

                  {/* Bounding Box Visual Overlay */}
                  <div className="absolute inset-x-8 inset-y-6 border-2 border-dashed border-lime-400/80 rounded-lg bg-lime-400/10 flex items-start justify-between p-2 pointer-events-none">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950/90 text-lime-300 text-[10px] font-mono font-bold border border-lime-400/40">
                      Lesion Cluster: 96.4% Conf.
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-red-950/90 text-red-300 text-[10px] font-mono font-bold border border-red-500/40">
                      Moderate Risk
                    </span>
                  </div>
                </div>

                {/* Sample Selector Tabs */}
                <div className="mt-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-2">Test Sample Pathology Images:</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {SAMPLE_DISEASE_IMAGES.slice(0, 4).map((sample, idx) => (
                      <button
                        key={sample.id}
                        onClick={() => setSelectedDemoIndex(idx)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                          selectedDemoIndex === idx
                            ? 'bg-emerald-600 text-white font-semibold shadow'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {sample.crop}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instant Analysis Card */}
                <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{activeDemo.expectedDisease}</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">96.8% Match</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {activeDemo.notes}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] text-emerald-300 font-medium">
                    <span>Rx: Copper hydroxide spray</span>
                    <button 
                      onClick={() => navigate('/scanner')}
                      className="text-lime-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      Open Full Scanner →
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Features Bento Grid */}
      <section className="py-20 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Complete Agricultural Intelligence</h2>
            <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              One Unified System for Commercial Agronomy
            </p>
            <p className="text-slate-400 text-sm">
              From handheld leaf diagnostics to satellite-level vegetation index maps and automated chemical spray windows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Instant Vision Pathology</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identify fungal blights, rusts, bacterial cankers, and viral mosaics from any smartphone photo with precise organic and conventional treatment plans.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Severity percentage & lesion bounding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Chemical & biological dosage guidelines</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">NDVI Satellite Mapping</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track canopy chlorophyll density, soil moisture gradients, and localized stress zones before foliage displays visible discoloration.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Sub-meter vegetation index resolution</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Soil N-P-K & moisture telemetry</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <CloudSun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Delta T & Spray Windows</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prevent chemical droplet drift, off-target evaporation, and rain wash-off with automated hour-by-hour application advisories.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Evapotranspiration (ET0) calculations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Growing Degree Days (GDD) tracking</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Conversion Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Protect Your Harvest with AI?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Join thousands of modern growers and precision agronomists. Free forever for individual scouting, scalable for enterprise acreage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-base shadow-xl transition-all"
              id="cta-signup-bottom-btn"
            >
              Create Free Farm Account
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-colors"
              id="cta-learn-more-btn"
            >
              Explore AI Architecture
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
