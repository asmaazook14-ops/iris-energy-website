"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator } from "lucide-react";
import { calculateRoiScenario } from "@/lib/roiCalculator";
import heatPumps from "@/data/heat_pumps.json";
import energyPrices from "@/data/energy_prices.json";
import { useParams } from "next/navigation";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const EXISTING_SYSTEMS = {
  "Electric heater": "electric_resistance",
  "Gas heater": "gas",
  "Oil heater": "oil",
  "Existing heat pump": "existing_heat_pump",
  "Solar heating": "solar",
  "No heating at the moment": "none",
};

export default function ROICalculatorPage() {
  const params = useParams();
  const lang = params?.lang as string || 'en';
  const isEn = lang === 'en';

  const [mounted, setMounted] = useState(false);
  
  const [poolType, setPoolType] = useState("outdoor");
  const [lengthM, setLengthM] = useState(10.0);
  const [widthM, setWidthM] = useState(5.0);
  const [avgDepthM, setAvgDepthM] = useState(1.4);
  const [hasCover, setHasCover] = useState(true);

  const [targetTempC, setTargetTempC] = useState(28.0);
  const [operatingHours, setOperatingHours] = useState(10.0);
  const [operatingDays, setOperatingDays] = useState(7);
  
  const [selectedMonths, setSelectedMonths] = useState(["June", "July", "August", "September"]);
  const [avgAirTempC, setAvgAirTempC] = useState(28.5);

  const [existingLabel, setExistingLabel] = useState("Electric heater");
  const [installCostUsd, setInstallCostUsd] = useState(1800.0);
  const [rebateUsd, setRebateUsd] = useState(500.0);
  
  const [advanced, setAdvanced] = useState(false);
  const [currentWaterTempC, setCurrentWaterTempC] = useState(15.0);
  const [relativeHumidityPct, setRelativeHumidityPct] = useState(50.0);
  const [windSpeedMps, setWindSpeedMps] = useState(2.0);
  const [existingEfficiency, setExistingEfficiency] = useState(1.0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const results = useMemo(() => {
    if (!mounted) return null;
    
    const monthly_avg_air_temp_c: Record<string, number> = {};
    for (const m of selectedMonths) {
      monthly_avg_air_temp_c[m] = avgAirTempC;
    }
    
    // basic validation
    if (selectedMonths.length === 0) return { error: "Please select at least one month." };
    if (lengthM <= 0 || widthM <= 0 || avgDepthM <= 0) return { error: "Dimensions must be positive." };
    
    try {
      const inputs = {
        pool_type: poolType,
        length_m: lengthM,
        width_m: widthM,
        avg_depth_m: avgDepthM,
        has_cover: hasCover,
        current_water_temp_c: currentWaterTempC,
        target_water_temp_c: targetTempC,
        operating_hours_per_day: operatingHours,
        operating_days_per_week: operatingDays,
        monthly_avg_air_temp_c,
        relative_humidity_pct: relativeHumidityPct,
        wind_speed_mps: windSpeedMps,
        existing_system_type: EXISTING_SYSTEMS[existingLabel as keyof typeof EXISTING_SYSTEMS],
        existing_efficiency: existingEfficiency,
        installation_cost_usd: installCostUsd,
        rebate_usd: rebateUsd,
        region: "US_National"
      };
      
      const res = calculateRoiScenario(inputs, heatPumps, energyPrices);
      return { data: res };
    } catch (err: any) {
      return { error: err.message };
    }
  }, [
    mounted, poolType, lengthM, widthM, avgDepthM, hasCover, targetTempC, 
    operatingHours, operatingDays, selectedMonths, avgAirTempC, 
    existingLabel, installCostUsd, rebateUsd, currentWaterTempC, 
    relativeHumidityPct, windSpeedMps, existingEfficiency
  ]);

  if (!mounted) return null;

  const toggleMonth = (m: string) => {
    if (selectedMonths.includes(m)) {
      setSelectedMonths(selectedMonths.filter(x => x !== m));
    } else {
      setSelectedMonths([...selectedMonths, m]);
    }
  };

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-[#0B192C] min-h-screen text-slate-300 pb-24">
      {/* Header / Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 border-[1px] border-[var(--color-brand-blue)] rounded-full border-dashed animate-[spin_120s_linear_infinite]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href={`/${lang}/solutions`} className="inline-flex items-center text-[var(--color-brand-blue)] hover:text-white transition-colors mb-6 font-semibold">
            <ArrowLeft className={`w-4 h-4 ${isEn ? 'mr-2' : 'ml-2 rtl:rotate-180'}`} />
            {isEn ? 'Back to Services' : 'العودة إلى الخدمات'}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--color-brand-blue)]/20 border border-[var(--color-brand-blue)] rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-[var(--color-brand-blue)]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {isEn ? 'Pool Heat Pump ROI Calculator' : 'حاسبة العائد على الاستثمار للمضخات الحرارية'}
            </h1>
          </div>
          <p className="text-lg max-w-2xl text-slate-300">
            {isEn ? 'Find out how much a heat pump could save you every year and how long it takes to pay for itself.' : 'اكتشف كم يمكن أن توفر لك المضخة الحرارية كل عام والمدة التي تستغرقها لتغطية تكلفتها.'}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Inputs Section */}
          <div className="w-full lg:w-7/12 space-y-8">
            
            {/* 1. Pool Section */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="bg-[var(--color-brand-blue)] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                {isEn ? 'Your Pool' : 'المسبح الخاص بك'}
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-300 mb-2">{isEn ? 'Location' : 'الموقع'}</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={poolType === 'outdoor'} onChange={() => setPoolType('outdoor')} className="accent-[var(--color-brand-blue)]" />
                    <span>{isEn ? 'Outdoor' : 'خارجي'}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={poolType === 'indoor'} onChange={() => setPoolType('indoor')} className="accent-[var(--color-brand-blue)]" />
                    <span>{isEn ? 'Indoor' : 'داخلي'}</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Length (m)' : 'الطول (م)'}</label>
                  <input type="number" step="0.5" value={lengthM} onChange={(e) => setLengthM(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Width (m)' : 'العرض (م)'}</label>
                  <input type="number" step="0.5" value={widthM} onChange={(e) => setWidthM(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Avg Depth (m)' : 'متوسط العمق (م)'}</label>
                  <input type="number" step="0.1" value={avgDepthM} onChange={(e) => setAvgDepthM(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors" />
                </div>
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer mt-4">
                <input type="checkbox" checked={hasCover} onChange={(e) => setHasCover(e.target.checked)} className="accent-[var(--color-brand-blue)] w-4 h-4" />
                <span>{isEn ? "I cover the pool when it's not in use" : "أقوم بتغطية المسبح عندما لا يكون قيد الاستخدام"}</span>
              </label>
            </div>

            {/* 2. Usage Section */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="bg-[var(--color-brand-blue)] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                {isEn ? 'How You Use It' : 'كيف تستخدمه'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Target Temp (°C)' : 'الحرارة المستهدفة (مئوية)'}</label>
                  <input type="number" step="0.5" value={targetTempC} onChange={(e) => setTargetTempC(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Hours per day' : 'ساعات في اليوم'}</label>
                  <input type="number" step="0.5" value={operatingHours} onChange={(e) => setOperatingHours(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Days per week' : 'أيام في الأسبوع'}</label>
                  <input type="number" step="1" value={operatingDays} onChange={(e) => setOperatingDays(parseInt(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-3">{isEn ? 'Operating Months' : 'أشهر التشغيل'}</label>
                <div className="flex flex-wrap gap-2">
                  {MONTH_NAMES.map(m => (
                    <button 
                      key={m} 
                      onClick={() => toggleMonth(m)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${selectedMonths.includes(m) ? 'bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)] text-white' : 'bg-transparent border-white/20 text-slate-400 hover:border-white/50'}`}
                    >
                      {m.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Avg Outdoor Temp (°C) during those months' : 'متوسط حرارة الخارج (مئوية) خلال هذه الأشهر'}</label>
                <input type="number" step="0.5" value={avgAirTempC} onChange={(e) => setAvgAirTempC(parseFloat(e.target.value))} className="w-full md:w-1/3 bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors" />
              </div>
            </div>

            {/* 3. Cost Section */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="bg-[var(--color-brand-blue)] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                {isEn ? 'Current Heating & Costs' : 'نظام التدفئة الحالي والتكاليف'}
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Existing System Type' : 'نوع النظام الحالي'}</label>
                <select value={existingLabel} onChange={(e) => setExistingLabel(e.target.value)} className="w-full md:w-1/2 bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors appearance-none">
                  {Object.keys(EXISTING_SYSTEMS).map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Installation Cost ($)' : 'تكلفة التركيب ($)'}</label>
                  <input type="number" step="100" value={installCostUsd} onChange={(e) => setInstallCostUsd(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{isEn ? 'Grant / Rebate ($)' : 'المنحة / الخصم ($)'}</label>
                  <input type="number" step="50" value={rebateUsd} onChange={(e) => setRebateUsd(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors" />
                </div>
              </div>
            </div>
            
            {/* Advanced Settings Expander */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
              <button 
                className="w-full flex justify-between items-center text-left text-white font-bold text-lg"
                onClick={() => setAdvanced(!advanced)}
              >
                <span>{isEn ? 'Advanced Settings (Optional)' : 'إعدادات متقدمة (اختياري)'}</span>
                <span className={`transition-transform ${advanced ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {advanced && (
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Current Water Temp (°C)</label>
                    <input type="number" step="0.5" value={currentWaterTempC} onChange={(e) => setCurrentWaterTempC(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Relative Humidity (%)</label>
                    <input type="number" step="1" value={relativeHumidityPct} onChange={(e) => setRelativeHumidityPct(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Wind Speed (m/s)</label>
                    <input type="number" step="0.5" value={windSpeedMps} onChange={(e) => setWindSpeedMps(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Existing System Efficiency (0.0-1.0)</label>
                    <input type="number" step="0.05" value={existingEfficiency} onChange={(e) => setExistingEfficiency(parseFloat(e.target.value))} className="w-full bg-[#0f233f] border border-white/10 rounded-lg p-3 text-white" />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Results Panel */}
          <div className="w-full lg:w-5/12">
            <div className="bg-gradient-to-br from-[#0f233f] to-[#0B192C] border border-white/10 rounded-3xl p-8 sticky top-24 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-brand-blue)]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-brand-gold)]/5 rounded-full blur-3xl" />
              
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 relative z-10">
                {isEn ? 'Your Results' : 'النتائج'}
              </h3>
              
              {results?.error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 relative z-10">
                  {results.error}
                </div>
              ) : results?.data ? (
                <div className="space-y-8 relative z-10">
                  <div className="text-center p-6 bg-[var(--color-brand-blue)]/10 border border-[var(--color-brand-blue)]/30 rounded-2xl">
                    <p className="text-[var(--color-brand-blue)] font-semibold text-sm uppercase tracking-wider mb-2">
                      {isEn ? 'Estimated Annual Savings' : 'المدخرات السنوية المقدرة'}
                    </p>
                    <p className={`text-4xl md:text-5xl font-bold ${results.data.annual_savings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatMoney(results.data.annual_savings)}
                    </p>
                    {results.data.annual_savings < 0 && (
                      <p className="text-red-400/80 text-sm mt-2">
                        Your existing system is cheaper to run than the heat pump in this scenario.
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                      <p className="text-slate-400 text-xs uppercase font-semibold mb-1">{isEn ? 'Payback Period' : 'فترة الاسترداد'}</p>
                      <p className="text-2xl font-bold text-white">
                        {results.data.payback_years === Infinity || results.data.payback_years < 0
                          ? 'N/A' 
                          : `${results.data.payback_years.toFixed(1)} ${isEn ? 'Years' : 'سنوات'}`}
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                      <p className="text-slate-400 text-xs uppercase font-semibold mb-1">{isEn ? '5-Year ROI' : 'العائد في 5 سنوات'}</p>
                      <p className="text-2xl font-bold text-white">
                        {results.data.roi_5yr_pct === null || results.data.roi_5yr_pct < 0
                          ? 'N/A' 
                          : `${results.data.roi_5yr_pct.toFixed(1)}%`}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">{isEn ? 'Old Heating Cost' : 'تكلفة التدفئة القديمة'}</span>
                      <span className="text-lg font-bold text-white">{formatMoney(results.data.baseline_annual_cost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">{isEn ? 'Heat Pump Cost' : 'تكلفة المضخة الحرارية'}</span>
                      <span className="text-lg font-bold text-white">{formatMoney(results.data.heat_pump_annual_cost)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-slate-400">{isEn ? 'Net Investment' : 'صافي الاستثمار'}</span>
                      <span className="text-lg font-bold text-[var(--color-brand-gold)]">{formatMoney(results.data.net_investment)}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-sm text-slate-400 mb-1">{isEn ? 'Recommended Capacity' : 'السعة الموصى بها'}</p>
                    <p className="text-lg font-bold text-white">
                      {Math.round(results.data.required_capacity_btu).toLocaleString()} BTU/h
                    </p>
                  </div>
                  
                  {results.data.warnings && results.data.warnings.length > 0 && (
                    <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400/90 text-sm">
                      <ul className="list-disc pl-4 space-y-1">
                        {results.data.warnings.map((w: string, i: number) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              ) : null}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
