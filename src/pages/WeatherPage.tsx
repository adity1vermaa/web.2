import React from 'react';
import { useFarm } from '../context/FarmContext';
import { AppLayout } from '../components/AppLayout';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  Thermometer, 
  Sun, 
  CloudRain, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar,
  Compass,
  Zap,
  Leaf
} from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const { weather } = useFarm();

  return (
    <AppLayout
      pageTitle="Microclimate & Spray Window Engine"
      pageSubtitle="Psychrometric Delta T Modeling, Evapotranspiration (ET0) & Agro-Meteorology"
    >
      <div className="space-y-6">
        
        {/* Top Delta T & Spray Suitability Highlight */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-900 border border-teal-800/50 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="space-y-2 md:col-span-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
              <CloudSun className="w-3.5 h-3.5" />
              <span>Current Spray Window Rating</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <span>Status:</span>
              <span className={`capitalize ${
                weather.current.spraySuitability === 'optimal' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {weather.current.spraySuitability} Window
              </span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Delta T is currently at <strong>{weather.current.sprayDeltaT} °C</strong> with wind speeds of <strong>{weather.current.windSpeed} km/h</strong>. Droplet evaporation risk is low and wind drift risk is minimal.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <span className="text-slate-400 block uppercase font-mono text-[10px]">Delta T Advisory Index</span>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between text-amber-400">
                <span>&lt; 2.0 °C</span>
                <span>High Survival / Wash-off risk</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>2.0 - 8.0 °C</span>
                <span>Optimal Spray Range</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>&gt; 8.0 °C</span>
                <span>High Droplet Evaporation</span>
              </div>
            </div>
          </div>

        </div>

        {/* Current In-Situ Telemetry Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs">Air Temp</span>
              <Thermometer className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white">{weather.current.temp}°C</p>
            <p className="text-[10px] text-slate-400">Feels like {weather.current.feelsLike}°C</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs">Relative Humidity</span>
              <Droplets className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{weather.current.humidity}%</p>
            <p className="text-[10px] text-slate-400">Dew point {weather.current.dewPoint}°C</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs">Wind Velocity</span>
              <Wind className="w-4 h-4 text-teal-400" />
            </div>
            <p className="text-2xl font-bold text-white">{weather.current.windSpeed} km/h</p>
            <p className="text-[10px] text-slate-400">Direction: {weather.current.windDirection}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs">Evapotranspiration</span>
              <Sun className="w-4 h-4 text-lime-400" />
            </div>
            <p className="text-2xl font-bold text-white">{weather.current.et0} mm/day</p>
            <p className="text-[10px] text-slate-400">Reference ET0 (Penman-Monteith)</p>
          </div>
        </div>

        {/* 5-Day Agro-Meteorological Forecast Cards */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              5-Day Operational Spray Calendar
            </h3>
            <span className="text-xs text-slate-400">Calibrated for fungicide & pesticide application</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {weather.forecast.map((day) => (
              <div
                key={day.date}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{day.dayName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{day.date.slice(5)}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-white">{day.tempMax}°</span>
                    <span className="text-xs text-slate-400">{day.tempMin}°</span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate">{day.condition}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[10px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Rain Prob:</span>
                    <span className="text-blue-400 font-bold">{day.rainProb}%</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Wind:</span>
                    <span className="text-slate-300 font-mono">{day.windSpeed} km/h</span>
                  </div>
                  <div className="pt-1">
                    <span className="block text-slate-400 text-[9px] uppercase">Best Spray Window:</span>
                    <span className={`font-semibold ${
                      day.sprayStatus === 'optimal' ? 'text-emerald-400' :
                      day.sprayStatus === 'moderate' ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {day.sprayWindow}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
};
