'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Thermometer, Fan } from 'lucide-react';
import clsx from 'clsx';

interface PoolHeatingDemoProps {
  lang: 'en' | 'ar';
  dictionary: {
    title: string;
    description: string;
    poolTemp: string;
    targetTemp: string;
    status: string;
    statusIdle: string;
    statusHeating: string;
    statusReached: string;
    cop: string;
  };
}

export default function PoolHeatingDemo({ lang, dictionary }: PoolHeatingDemoProps) {
  const isEn = lang === 'en';
  
  // State
  const [currentTemp, setCurrentTemp] = useState(18);
  const [targetTemp, setTargetTemp] = useState(24);

  // Constants
  const minTemp = 18;
  const maxTemp = 28;

  // Derived state
  const isHeating = currentTemp < targetTemp;
  const statusText = isHeating
    ? dictionary.statusHeating
    : currentTemp === targetTemp && currentTemp > minTemp
    ? dictionary.statusReached
    : dictionary.statusIdle;

  // Animation controls
  const fanControls = useAnimation();

  // Manage fan animation side effect
  useEffect(() => {
    if (isHeating) {
      fanControls.start({ rotate: 360, transition: { duration: 1, repeat: Infinity, ease: 'linear' } });
    } else {
      fanControls.stop();
    }
  }, [isHeating, fanControls]);

  // Manage temperature change side effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (currentTemp < targetTemp) {
      interval = setInterval(() => {
        setCurrentTemp((prev) => Math.min(prev + 0.5, targetTemp));
      }, 500);
    } else if (currentTemp > targetTemp) {
       interval = setInterval(() => {
        setCurrentTemp((prev) => Math.max(prev - 0.5, targetTemp));
      }, 800);
    }

    return () => clearInterval(interval);
  }, [targetTemp, currentTemp]);

  // Calculate colors based on current temp
  // 18°C = slate-700 (#334155), 28°C = IRIS blue (#2563EB)
  const calculateWaterColor = (temp: number) => {
    const ratio = (temp - minTemp) / (maxTemp - minTemp);
    
    // Interpolate roughly between slate-700 rgb(51, 65, 85) and brand-blue rgb(37, 99, 235)
    const r = Math.round(51 + ratio * (37 - 51));
    const g = Math.round(65 + ratio * (99 - 65));
    const b = Math.round(85 + ratio * (235 - 85));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const currentWaterColor = calculateWaterColor(currentTemp);

  return (
    <div className="w-full bg-[#122238] rounded-3xl border border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {dictionary.title}
        </h3>
        <p className="text-slate-400">
          {dictionary.description}
        </p>
      </div>

      {/* Main Visualization Area */}
      <div className={clsx("flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 mb-12 relative", !isEn && "md:flex-row-reverse")}>
        
        {/* Heat Pump Unit */}
        <div className="relative z-10 bg-[#0B192C] border-2 border-slate-700 rounded-lg p-6 w-48 flex flex-col items-center justify-center shadow-lg">
          <div className="absolute -top-3 -right-3 bg-[var(--color-brand-gold)] text-[#0B192C] text-xs font-bold px-2 py-1 rounded">
            IRIS
          </div>
          <div className="w-24 h-24 rounded-full border-4 border-slate-600 flex items-center justify-center mb-4 bg-slate-800">
             <motion.div animate={fanControls}>
               <Fan size={48} className={isHeating ? "text-[var(--color-brand-gold)]" : "text-slate-500"} />
             </motion.div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-2 bg-slate-700 rounded-full" />
            <div className="w-6 h-2 bg-slate-700 rounded-full" />
            <div className="w-6 h-2 bg-slate-700 rounded-full" />
          </div>
        </div>

        {/* Connecting Pipes (Hidden on mobile, visible on md+) */}
        <div className="hidden md:flex relative w-48 h-32 items-center justify-center">
          {/* Top Pipe (Supply - Warm) */}
          <div className="absolute top-8 w-full h-4 bg-slate-800 border-y border-slate-700 flex items-center overflow-hidden">
            <div className="w-full flex justify-around">
               {[1, 2, 3].map((i) => (
                 <motion.div
                   key={`supply-${i}`}
                   className="w-2 h-2 rounded-full bg-[var(--color-brand-gold)]"
                   animate={{
                     x: isEn ? [0, 150] : [0, -150],
                     opacity: isHeating ? [0, 1, 0] : 0
                   }}
                   transition={{
                     duration: 1.5,
                     repeat: Infinity,
                     delay: i * 0.5,
                     ease: "linear"
                   }}
                 />
               ))}
            </div>
          </div>
          
          {/* Bottom Pipe (Return - Cool) */}
          <div className="absolute bottom-8 w-full h-4 bg-slate-800 border-y border-slate-700 flex items-center overflow-hidden">
            <div className="w-full flex justify-around">
               {[1, 2, 3].map((i) => (
                 <motion.div
                   key={`return-${i}`}
                   className="w-2 h-2 rounded-full bg-slate-400"
                   animate={{
                     x: isEn ? [150, 0] : [-150, 0],
                     opacity: isHeating ? [0, 1, 0] : 0
                   }}
                   transition={{
                     duration: 1.5,
                     repeat: Infinity,
                     delay: i * 0.5,
                     ease: "linear"
                   }}
                 />
               ))}
            </div>
          </div>
        </div>

        {/* Mobile Pipes (Visible only on small screens) */}
        <div className="flex md:hidden relative w-32 h-24 items-center justify-center">
           {/* Left/Right Pipes for Mobile Layout Stacking */}
           <div className="absolute left-6 w-4 h-full bg-slate-800 border-x border-slate-700 flex justify-center overflow-hidden">
              <motion.div
                className="w-2 h-2 rounded-full bg-slate-400 mt-2"
                animate={{ y: [40, 0], opacity: isHeating ? [0, 1, 0] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
           </div>
           <div className="absolute right-6 w-4 h-full bg-slate-800 border-x border-slate-700 flex justify-center overflow-hidden">
              <motion.div
                className="w-2 h-2 rounded-full bg-[var(--color-brand-gold)] mb-2"
                animate={{ y: [0, 40], opacity: isHeating ? [0, 1, 0] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
           </div>
        </div>

        {/* Pool Cross Section */}
        <div className="relative z-10 w-64 md:w-80 h-48 border-4 border-t-0 border-slate-300 rounded-b-3xl bg-slate-900 overflow-hidden shadow-[inset_0_-10px_30px_rgba(0,0,0,0.5)]">
          <motion.div 
            className="absolute bottom-0 w-full"
            animate={{ height: "85%" }}
            style={{ backgroundColor: currentWaterColor }}
            transition={{ duration: 0.5 }}
          >
            {/* Water surface animation */}
            <motion.div 
               className="w-[200%] h-4 bg-white/10 absolute top-0 rounded-full"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="bg-[#0B192C]/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-[var(--color-brand-gold)]" />
                <span className="text-2xl font-mono font-bold text-white">{currentTemp.toFixed(1)}°C</span>
             </div>
          </div>
        </div>
      </div>

      {/* Controls & Data Strip */}
      <div className="bg-[#0B192C] rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          
          {/* Slider Control */}
          <div className="flex-1 w-full">
            <div className="flex justify-between mb-2 text-sm font-bold text-slate-300">
              <span>{dictionary.targetTemp}</span>
              <span className="font-mono text-[var(--color-brand-gold)]">{targetTemp.toFixed(1)}°C</span>
            </div>
            <input
              type="range"
              min={minTemp}
              max={maxTemp}
              step={0.5}
              value={targetTemp}
              onChange={(e) => setTargetTemp(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-gold)]"
              style={{ direction: 'ltr' }} 
            />
            <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
              <span>{minTemp}°C</span>
              <span>{maxTemp}°C</span>
            </div>
          </div>

          {/* Technical Data Tabular Display */}
          <div className="flex-1 w-full grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l md:border-white/10 pt-6 md:pt-0 md:pl-6 rtl:md:border-l-0 rtl:md:border-r rtl:md:pl-0 rtl:md:pr-6">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{dictionary.poolTemp}</div>
              <div className="font-mono text-xl font-bold text-white">{currentTemp.toFixed(1)} °C</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{dictionary.cop}</div>
              <div className="font-mono text-xl font-bold text-white">5.8</div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{dictionary.status}</div>
              <div className="flex items-center gap-2">
                <div className={clsx(
                  "w-2 h-2 rounded-full",
                  isHeating ? "bg-[var(--color-brand-gold)] animate-pulse" : "bg-slate-500"
                )} />
                <span className={clsx("font-bold text-sm", isHeating ? "text-[var(--color-brand-gold)]" : "text-slate-300")}>
                  {statusText}
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
