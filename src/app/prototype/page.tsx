"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Power, Settings, Activity, Zap, Wind, Droplets, AlertTriangle, Thermometer, RefreshCcw, Gauge, Cpu, Fan, Info } from "lucide-react";

// --- Types ---
type Mode = "HEATING" | "ECO" | "BOOST" | "STANDBY" | "FAULT";
type Tab = "DASHBOARD" | "ANALYTICS" | "OPTIMIZE" | "ENGINEERING";

interface Telemetry {
  water_in_temp: number;
  water_out_temp: number;
  target_temp: number;
  ambient_temp: number;
  power_kw: number;
  cop: number;
  flow_rate: number;
  compressor_load: number;
  fan_speed: number;
  mode: Mode;
  status: "RUNNING" | "STANDBY" | "ERROR";
  error_code?: string;
}

// --- Simulation Engine ---
const useSimulation = () => {
  const [telemetry, setTelemetry] = useState<Telemetry>({
    water_in_temp: 24.2,
    water_out_temp: 24.2,
    target_temp: 28.0,
    ambient_temp: 18.5,
    power_kw: 0.0,
    cop: 0.0,
    flow_rate: 0.0,
    compressor_load: 0,
    fan_speed: 0,
    mode: "STANDBY",
    status: "STANDBY",
  });

  const [history, setHistory] = useState<any[]>(Array(20).fill({ power: 0, cop: 0, time: "00:00" }));

  const setPower = (on: boolean) => {
    setTelemetry((prev) => ({
      ...prev,
      status: on ? "RUNNING" : "STANDBY",
      mode: on ? "HEATING" : "STANDBY",
      error_code: undefined,
    }));
  };

  const setMode = (mode: Mode) => {
    setTelemetry((prev) => ({ ...prev, mode, error_code: undefined, status: mode === "STANDBY" ? "STANDBY" : "RUNNING" }));
  };

  const setTargetTemp = (temp: number) => {
    setTelemetry((prev) => ({ ...prev, target_temp: temp }));
  };

  const triggerFault = () => {
    setTelemetry((prev) => ({
      ...prev,
      status: "ERROR",
      mode: "FAULT",
      error_code: "E03: LOW FLOW RATE DETECTED",
      power_kw: 0,
      compressor_load: 0,
      fan_speed: 0,
      flow_rate: 0.2,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        let next = { ...prev };

        if (next.status === "ERROR") return next;

        if (next.status === "STANDBY") {
          next.power_kw = Math.max(0, next.power_kw - 1.5);
          next.compressor_load = Math.max(0, next.compressor_load - 15);
          next.fan_speed = Math.max(0, next.fan_speed - 10);
          next.flow_rate = Math.max(0, next.flow_rate - 1.0);
          next.cop = 0;
          next.water_out_temp = next.water_in_temp;
          return next;
        }

        // Running Simulation Logic
        const diff = next.target_temp - next.water_in_temp;

        if (diff <= 0) {
          next.status = "STANDBY";
          next.mode = "STANDBY";
          return next;
        }

        // Base flow
        next.flow_rate = 5.4 + Math.random() * 0.1;

        if (next.mode === "BOOST") {
          next.compressor_load = Math.min(100, next.compressor_load + 5);
          next.fan_speed = Math.min(1200, next.fan_speed + 50);
          next.power_kw = 8.5 + Math.random() * 0.4;
          next.cop = 4.2 + Math.random() * 0.1;
          next.water_out_temp = Math.min(next.water_in_temp + 4.5, next.water_out_temp + 0.5);
        } else if (next.mode === "ECO") {
          next.compressor_load = Math.min(45, next.compressor_load + 2);
          next.fan_speed = Math.min(600, next.fan_speed + 20);
          next.power_kw = 2.1 + Math.random() * 0.2;
          next.cop = 6.5 + Math.random() * 0.2;
          next.water_out_temp = Math.min(next.water_in_temp + 1.5, next.water_out_temp + 0.2);
        } else {
          // Normal HEATING
          next.compressor_load = Math.min(75, next.compressor_load + 4);
          next.fan_speed = Math.min(850, next.fan_speed + 30);
          next.power_kw = 4.8 + Math.random() * 0.3;
          next.cop = 5.4 + Math.random() * 0.1;
          next.water_out_temp = Math.min(next.water_in_temp + 2.8, next.water_out_temp + 0.3);
        }

        // Slowly heat the pool
        next.water_in_temp += (next.water_out_temp - next.water_in_temp) * 0.005;

        // Ambient flutter
        next.ambient_temp += (Math.random() - 0.5) * 0.1;

        return next;
      });

      // Update History
      setHistory((prev) => {
        const newRecord = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          power: 0,
          cop: 0
        };
        // Need to read from current state somehow, let's just use a ref or standard functional update
        return [...prev.slice(1), newRecord];
      });

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sync history with current telemetry values
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(prev => {
        const arr = [...prev];
        arr[arr.length - 1] = { ...arr[arr.length - 1], power: telemetry.power_kw, cop: telemetry.cop };
        return arr;
    });
  }, [telemetry.power_kw, telemetry.cop]);


  return { telemetry, history, setPower, setMode, setTargetTemp, triggerFault };
};


// --- Components ---

const DigitalTwinVisualizer = ({ telemetry }: { telemetry: Telemetry }) => {
  const isRunning = telemetry.status === "RUNNING";
  const isError = telemetry.status === "ERROR";

  const pipeColor = isError ? "#ef4444" : isRunning ? (telemetry.mode === "BOOST" ? "#f97316" : "#f59e0b") : "#334155";
  const returnColor = isError ? "#ef4444" : isRunning ? "#38bdf8" : "#334155";
  
  const particleSpeed = telemetry.mode === "BOOST" ? 1 : telemetry.mode === "ECO" ? 3 : 1.5;
  const fanDuration = telemetry.fan_speed > 0 ? (60 / telemetry.fan_speed) : 0;

  return (
    <div className="relative w-full h-72 bg-[#050D1A] rounded-3xl border border-slate-800 p-6 flex flex-col items-center justify-between overflow-hidden shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
      
      {/* Simulation Watermark */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-2 py-1 bg-black/50 rounded-md border border-slate-700/50">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] uppercase font-mono text-emerald-500 tracking-widest font-bold">Simulation Mode</span>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-between mt-4">
        
        {/* POOL */}
        <div className="flex flex-col items-center relative z-20 w-1/4">
          <div className="w-24 h-24 rounded-full border-4 border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center overflow-hidden relative shadow-[0_0_20px_rgba(56,189,248,0.1)]">
             <div className="absolute inset-0 bg-blue-500/10" />
             {isRunning && (
                 <motion.div 
                    className="absolute inset-0 bg-blue-500/20 mix-blend-screen"
                    animate={{ y: ["0%", "10%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                 />
             )}
             <span className="text-xs text-slate-400 font-bold uppercase tracking-widest z-10">Pool Temp</span>
             <span className="text-xl font-mono text-white font-bold z-10">{telemetry.water_in_temp.toFixed(1)}°</span>
          </div>
        </div>

        {/* PIPES */}
        <div className="absolute left-[15%] right-[15%] top-1/2 -translate-y-1/2 h-16 flex flex-col justify-between z-0">
            {/* Outflow (Pool to HP) */}
            <div className="h-1 w-full relative">
                <svg width="100%" height="4" preserveAspectRatio="none" className="absolute inset-0">
                    <line x1="0" y1="2" x2="100%" y2="2" stroke={returnColor} strokeWidth="4" strokeDasharray="8 4" className="opacity-30" />
                    {isRunning && (
                        <motion.line 
                            x1="0" y1="2" x2="100%" y2="2" 
                            stroke={returnColor} strokeWidth="4" strokeDasharray="12 12"
                            animate={{ strokeDashoffset: [24, 0] }}
                            transition={{ repeat: Infinity, duration: particleSpeed, ease: "linear" }}
                        />
                    )}
                </svg>
            </div>
            {/* Inflow (HP to Pool) */}
            <div className="h-1 w-full relative">
                <svg width="100%" height="4" preserveAspectRatio="none" className="absolute inset-0">
                    <line x1="100%" y1="2" x2="0" y2="2" stroke={pipeColor} strokeWidth="4" strokeDasharray="8 4" className="opacity-30" />
                    {isRunning && (
                        <motion.line 
                            x1="100%" y1="2" x2="0" y2="2" 
                            stroke={pipeColor} strokeWidth="4" strokeDasharray="12 12"
                            animate={{ strokeDashoffset: [0, 24] }}
                            transition={{ repeat: Infinity, duration: particleSpeed, ease: "linear" }}
                        />
                    )}
                </svg>
            </div>
        </div>

        {/* HEAT PUMP */}
        <div className="flex flex-col items-center relative z-20 w-1/4">
          <div className={`w-28 h-32 rounded-xl border-2 flex flex-col items-center justify-center relative overflow-hidden bg-slate-900 transition-colors duration-700
              ${isError ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : isRunning ? 'border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'border-slate-800'}`}>
            
            {/* Heat Pump Internal Glow */}
            {isRunning && (
                <motion.div 
                    className={`absolute inset-0 opacity-20 blur-xl ${telemetry.mode === 'BOOST' ? 'bg-orange-500' : 'bg-amber-500'}`}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            )}

            <div className="flex gap-4 items-center justify-center relative z-10">
                {/* Fan visual */}
                <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center bg-black/50">
                    <motion.div
                        animate={{ rotate: isRunning && fanDuration > 0 ? 360 : 0 }}
                        transition={{ repeat: Infinity, duration: fanDuration || 0, ease: "linear" }}
                    >
                        <Fan className={`w-8 h-8 ${isRunning ? 'text-slate-300' : 'text-slate-700'}`} />
                    </motion.div>
                </div>
            </div>

            <div className="mt-4 flex flex-col items-center z-10">
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Heated Output</span>
                <span className={`text-lg font-mono font-bold transition-colors ${isRunning ? 'text-amber-400' : 'text-slate-500'}`}>
                    {telemetry.water_out_temp.toFixed(1)}°
                </span>
            </div>
            
            {/* Brand */}
            <div className="absolute bottom-2 right-2 text-[8px] font-bold tracking-widest text-slate-600">IRIS</div>
          </div>
        </div>

      </div>

      {/* Connection Logic Tags */}
      <div className="w-full flex justify-between px-6 text-[10px] text-slate-500 font-mono mt-2 uppercase">
          <div className="flex flex-col items-center gap-1"><Droplets className="w-3 h-3"/> {telemetry.flow_rate.toFixed(1)} m³/h</div>
          <div className="flex flex-col items-center gap-1 text-center">Heat Transfer<br/>Visualizer</div>
          <div className="flex flex-col items-center gap-1"><Activity className="w-3 h-3"/> Load: {telemetry.compressor_load}%</div>
      </div>
    </div>
  );
};


const TelemetryCard = ({ label, value, unit, icon: Icon, color = "text-white" }: any) => (
  <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-between">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-slate-400" />
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className={`text-2xl font-mono font-bold ${color}`}>{value}</span>
      <span className="text-sm font-mono text-slate-500">{unit}</span>
    </div>
  </div>
);


// --- Main Page ---
export default function PrototypeApp() {
  const { telemetry, history, setPower, setMode, setTargetTemp, triggerFault } = useSimulation();
  const [activeTab, setActiveTab] = useState<Tab>("DASHBOARD");

  const isRunning = telemetry.status === "RUNNING";
  const isError = telemetry.status === "ERROR";

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-200 font-sans selection:bg-amber-500/30 overflow-hidden pb-24 max-w-md mx-auto relative shadow-2xl border-x border-slate-800/50">
      
      {/* Header */}
      <header className="px-6 pt-10 pb-4 flex justify-between items-end border-b border-white/5 bg-[#0B192C]/80 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="text-lg font-black tracking-widest text-white">IRIS SMART HEAT PUMP</h1>
          <div className="flex items-center gap-2 mt-1">
             <div className={`w-2 h-2 rounded-full ${isError ? 'bg-red-500 animate-ping' : isRunning ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`} />
             <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                 {isError ? 'SYSTEM FAULT' : isRunning ? 'SYSTEM RUNNING' : 'SYSTEM STANDBY'}
             </span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-slate-800/50">
          <Settings className="w-5 h-5 text-slate-400" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 space-y-4 overflow-y-auto h-full">

        <AnimatePresence mode="wait">
          {activeTab === "DASHBOARD" && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
               {/* Fault Alert */}
               {isError && (
                   <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4 flex items-start gap-3">
                       <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                       <div>
                           <h3 className="text-red-500 font-bold text-sm">System Fault Detected</h3>
                           <p className="text-red-400/80 text-xs font-mono mt-1">{telemetry.error_code}</p>
                           <button onClick={() => setPower(false)} className="mt-3 px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold rounded-lg transition-colors border border-red-500/30">
                               Clear & Reset
                           </button>
                       </div>
                   </div>
               )}

               <DigitalTwinVisualizer telemetry={telemetry} />

               {/* Quick Controls */}
               <div className="bg-[#122238] border border-white/5 rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Target Temp</h3>
                         <div className="flex items-baseline gap-1">
                             <span className="text-4xl font-mono font-bold text-white">{telemetry.target_temp.toFixed(1)}°</span>
                         </div>
                     </div>
                     <button 
                        onClick={() => setPower(!isRunning)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${isRunning ? 'bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-slate-800 border-2 border-slate-700 text-slate-500'}`}
                     >
                        <Power className="w-8 h-8" strokeWidth={2.5} />
                     </button>
                  </div>

                  {/* Slider */}
                  <input 
                      type="range" 
                      min="15" max="40" step="0.5"
                      value={telemetry.target_temp}
                      onChange={(e) => setTargetTemp(parseFloat(e.target.value))}
                      disabled={!isRunning}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-50"
                  />

                  {/* Modes */}
                  <div className="grid grid-cols-3 gap-3 mt-8">
                      {(["ECO", "HEATING", "BOOST"] as Mode[]).map((m) => (
                          <button
                              key={m}
                              disabled={!isRunning}
                              onClick={() => setMode(m)}
                              className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
                                  telemetry.mode === m 
                                  ? m === "BOOST" ? 'bg-orange-500/10 border-orange-500 text-orange-400' 
                                  : m === "ECO" ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                                  : 'bg-amber-500/10 border-amber-500 text-amber-400'
                                  : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:bg-slate-800'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                              {m}
                          </button>
                      ))}
                  </div>
               </div>

               {/* Telemetry Grid */}
               <div className="grid grid-cols-2 gap-4">
                  <TelemetryCard label="Power" value={telemetry.power_kw.toFixed(1)} unit="kW" icon={Zap} color={isRunning ? "text-amber-400" : "text-slate-500"} />
                  <TelemetryCard label="Efficiency" value={telemetry.cop.toFixed(1)} unit="COP" icon={Activity} color={isRunning ? "text-emerald-400" : "text-slate-500"} />
                  <TelemetryCard label="Flow Rate" value={telemetry.flow_rate.toFixed(1)} unit="m³/h" icon={Droplets} />
                  <TelemetryCard label="Ambient" value={telemetry.ambient_temp.toFixed(1)} unit="°C" icon={Thermometer} />
               </div>
            </motion.div>
          )}

          {activeTab === "ANALYTICS" && (
            <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-[#122238] border border-white/5 rounded-3xl p-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Real-time Performance</h3>
                    <div className="h-48 w-full -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" hide />
                                <YAxis hide domain={[0, 12]} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                    itemStyle={{ fontFamily: 'monospace' }}
                                />
                                <Area type="monotone" dataKey="power" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorPower)" name="Power (kW)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Est. Daily Savings</p>
                            <p className="text-xl font-mono text-emerald-400 font-bold">142 EGP</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Wind className="w-5 h-5 text-emerald-400" />
                        </div>
                    </div>
                </div>
            </motion.div>
          )}

          {activeTab === "OPTIMIZE" && (
            <motion.div key="optimize" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                 <div className="bg-gradient-to-br from-emerald-900/40 to-[#122238] border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="w-24 h-24" /></div>
                    <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Smart Insight</h3>
                    <p className="text-white text-lg font-medium leading-snug mb-4">Heating during off-peak hours can save you up to 25% today.</p>
                    <button className="px-5 py-2.5 bg-emerald-500 text-emerald-950 font-bold text-sm rounded-xl hover:bg-emerald-400 transition-colors">
                        Apply Smart Schedule
                    </button>
                 </div>

                 <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-5 h-5 text-blue-400" />
                        <h4 className="font-bold text-white">Flow Optimization</h4>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">Current flow rate is optimal for maximum heat transfer. Filter is clean.</p>
                    <div className="w-full bg-slate-900 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full w-[85%]"></div>
                    </div>
                 </div>
            </motion.div>
          )}

          {activeTab === "ENGINEERING" && (
            <motion.div key="engineering" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Demo Disclaimer</span>
                    </div>
                    <p className="text-xs text-amber-400/80">These parameters are simulated engineering metrics for demonstration purposes to showcase future capabilities.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#122238] p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Compressor Hz</span>
                        <span className="font-mono text-lg text-white">{(telemetry.compressor_load * 0.9).toFixed(1)} Hz</span>
                    </div>
                    <div className="bg-[#122238] p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Fan RPM</span>
                        <span className="font-mono text-lg text-white">{telemetry.fan_speed.toFixed(0)}</span>
                    </div>
                    <div className="bg-[#122238] p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">EEV Steps</span>
                        <span className="font-mono text-lg text-white">{isRunning ? 325 : 0}</span>
                    </div>
                    <div className="bg-[#122238] p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Suction Press.</span>
                        <span className="font-mono text-lg text-white">{isRunning ? 8.6 : 0} bar</span>
                    </div>
                </div>

                <div className="mt-8 border-t border-slate-800 pt-8 text-center">
                    <button 
                        onClick={triggerFault}
                        disabled={isError}
                        className="px-6 py-3 bg-red-950/30 border border-red-500/30 text-red-500 font-bold text-sm rounded-xl hover:bg-red-900/50 transition-colors disabled:opacity-50"
                    >
                        Simulate Low Flow Fault
                    </button>
                    <p className="text-[10px] text-slate-600 mt-3 font-mono">Triggers E03 Error Code Demo</p>
                </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto bg-[#0B192C]/90 backdrop-blur-xl border-t border-white/10 pb-6 pt-4 px-6 z-50">
          <div className="flex justify-between items-center">
              {[
                  { id: "DASHBOARD", icon: DashboardIcon, label: "Twin" },
                  { id: "ANALYTICS", icon: Activity, label: "Energy" },
                  { id: "OPTIMIZE", icon: Zap, label: "Optimize" },
                  { id: "ENGINEERING", icon: Cpu, label: "Data" }
              ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                      <button 
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as Tab)}
                          className={`flex flex-col items-center gap-1.5 transition-colors ${isActive ? 'text-[var(--color-brand-blue)]' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                          <div className={`relative p-2 rounded-xl transition-all ${isActive ? 'bg-[var(--color-brand-blue)]/10 text-blue-400' : ''}`}>
                              <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[9px] uppercase tracking-widest font-bold ${isActive ? 'text-blue-400' : ''}`}>{tab.label}</span>
                      </button>
                  )
              })}
          </div>
      </div>
      
      {/* Intro Overlay / Pitch Text */}
      <div className="fixed bottom-24 left-0 w-full px-4 pointer-events-none z-40">
          <div className="bg-black/60 backdrop-blur-sm border border-slate-700/50 p-4 rounded-2xl">
            <p className="text-xs text-slate-300 leading-relaxed text-center font-medium">
              "The vision is to turn the IRIS heat pump from a physical machine into a connected, intelligent system that the customer can monitor, control, and optimize every day."
            </p>
          </div>
      </div>

    </div>
  );
}

const DashboardIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);
