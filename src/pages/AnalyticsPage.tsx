import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { AppLayout } from '../components/AppLayout';
import { 
  TrendingUp, 
  DollarSign, 
  Sprout, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { fields } = useFarm();
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');

  const yieldData = [
    { month: 'May', baseline: 8.2, actual: 8.4, projected: 8.5 },
    { month: 'Jun', baseline: 8.8, actual: 9.1, projected: 9.2 },
    { month: 'Jul', baseline: 9.4, actual: 9.9, projected: 10.1 },
    { month: 'Aug', baseline: 10.1, actual: 10.8, projected: 11.2 },
    { month: 'Sep', baseline: 10.5, actual: null, projected: 11.6 },
    { month: 'Oct', baseline: 10.8, actual: null, projected: 11.9 },
  ];

  const fieldYieldComparison = fields.map((f) => ({
    name: f.name.replace('Sector', 'Sec'),
    yieldTonnesHa: Number((f.acreage * 0.28).toFixed(1)),
    ndviScore: f.ndviScore * 10,
    health: f.healthScore,
  }));

  const commodityPrices = [
    { crop: 'Corn (Maize)', price: '$4.42 / bu', change: '+2.4%', isPositive: true, exchange: 'CBOT' },
    { crop: 'Hard Red Winter Wheat', price: '$5.86 / bu', change: '+1.1%', isPositive: true, exchange: 'CBOT' },
    { crop: 'Soybeans', price: '$11.65 / bu', change: '-0.8%', isPositive: false, exchange: 'CBOT' },
    { crop: 'Processing Tomatoes', price: '$148.00 / ton', change: '+5.2%', isPositive: true, exchange: 'CA Exch' },
  ];

  return (
    <AppLayout
      pageTitle="Yield Intelligence & Market Analytics"
      pageSubtitle="Algorithmic Yield Forecasting, Pest Loss Mitigation & Commodity Price Index"
    >
      <div className="space-y-6">
        
        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Forecasted Total Harvest</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">1,842</span>
              <span className="text-xs text-slate-400 font-mono">Tonnes</span>
              <span className="text-xs font-semibold text-emerald-400 ml-auto flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +8.4%
              </span>
            </div>
            <p className="text-[11px] text-slate-400">vs 5-year historical average</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Protected Yield Value</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-lime-400">$68,400</span>
              <span className="text-xs font-semibold text-emerald-400 ml-auto flex items-center">
                <Sparkles className="w-3.5 h-3.5" /> Saved
              </span>
            </div>
            <p className="text-[11px] text-slate-400">From early pathogen containment</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Input Cost Reduction</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-teal-400">-28.5%</span>
              <span className="text-xs font-semibold text-teal-400 ml-auto">Targeted</span>
            </div>
            <p className="text-[11px] text-slate-400">Precision microclimate spray timing</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Projected Farm Revenue</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">$412,900</span>
            </div>
            <p className="text-[11px] text-slate-400">At current spot contract rates</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Yield Trajectory Line Chart (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Yield Trajectory (Tonnes / Hectare)
                </h3>
                <p className="text-xs text-slate-400">Historical baseline vs AI-optimized projection</p>
              </div>

              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                +11.4% Est. Peak
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yieldData}>
                  <defs>
                    <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[7, 13]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="baseline" name="5-Year Baseline" stroke="#64748b" fillOpacity={1} fill="url(#baselineGrad)" />
                  <Area type="monotone" dataKey="projected" name="AI-Optimized Projection" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#projectedGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Real-time Commodity Market Index (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-lime-400" />
                  Commodity Market Tickers
                </h3>
                <p className="text-xs text-slate-400">Live Chicago Board of Trade (CBOT) benchmarks</p>
              </div>

              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="space-y-3">
              {commodityPrices.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{item.crop}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.exchange} Spot Price</span>
                  </div>

                  <div className="text-right space-y-0.5">
                    <span className="font-mono font-extrabold text-white text-sm">{item.price}</span>
                    <span className={`block font-semibold text-[11px] ${
                      item.isPositive ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-slate-300">
              <span className="font-semibold text-emerald-300">Market Advisory:</span> Forward contracting for Q4 tomato paste & corn is currently yielding a 6.2% premium over harvest-time spot prices.
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};
