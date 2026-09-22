'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Wind, Thermometer, Droplets, Info } from 'lucide-react';
import './how-it-works.css';
import clsx from 'clsx';

interface HowItWorksShowcaseProps {
  lang: 'en' | 'ar';
  dictionary: {
    sectionLabel: string;
    headline: string;
    description: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
    ctaText: string;
    badges: {
      fan: { label: string; desc: string };
      output: { label: string; desc: string };
      pool: { label: string; desc: string };
    };
    dataStrip: {
      cop: string;
      copValue: string;
      temp: string;
      tempValue: string;
      rating: string;
      ratingValue: string;
      energy: string;
      energyValue: string;
    };
  };
  media: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
    alt: string;
  };
}

export default function HowItWorksShowcase({ lang, dictionary, media }: HowItWorksShowcaseProps) {
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const mediaRef = useRef(null);
  const isMediaInView = useInView(mediaRef, { once: true, margin: "200px" });

  // Badge data mapped to absolute positions based on the specific photo
  // 'homepage-residential-pool-heat-pump.webp' layout: pump is on left/center-left, pool is background right.
  const badges = [
    {
      id: 'fan',
      icon: Wind,
      label: dictionary.badges.fan.label,
      desc: dictionary.badges.fan.desc,
      top: '30%',
      left: '35%',
      color: 'bg-[var(--color-brand-blue)]'
    },
    {
      id: 'output',
      icon: Thermometer,
      label: dictionary.badges.output.label,
      desc: dictionary.badges.output.desc,
      top: '60%',
      left: '45%',
      color: 'bg-[var(--color-brand-gold)]'
    },
    {
      id: 'pool',
      icon: Droplets,
      label: dictionary.badges.pool.label,
      desc: dictionary.badges.pool.desc,
      top: '25%',
      left: '75%',
      color: 'bg-cyan-500'
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-[var(--color-brand-gold)] font-bold tracking-wider uppercase text-sm mb-3">
          {dictionary.sectionLabel}
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {dictionary.headline}
        </h3>
        <p className="text-lg text-slate-300">
          {dictionary.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
        {/* Media Section */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div ref={mediaRef} className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/9] bg-slate-900 group">
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
              {media.type === 'video' ? (
                <video 
                  src={isMediaInView ? media.src : undefined}
                  poster={media.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                  aria-label={media.alt}
                />
              ) : (
                <Image 
                  src={media.src}
                  alt={media.alt}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              )}
            </div>
            
            {/* Phase 2: CSS Overlays */}
            {/* Water Shimmer: positioned over the bottom half where the pool is */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 animate-water-shimmer pointer-events-none" />
            
            {/* Warm Glow: positioned near the center-left where the heat pump sits */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 -ml-32 animate-warm-pulse pointer-events-none rounded-full blur-3xl" />

            {/* Phase 3: Interactive Callout Badges */}
            {badges.map((badge) => {
              const Icon = badge.icon;
              const isActive = activeBadge === badge.id;
              
              return (
                <div 
                  key={badge.id}
                  className="absolute z-20"
                  style={{ top: badge.top, [lang === 'ar' ? 'right' : 'left']: badge.left }}
                  onMouseEnter={() => setActiveBadge(badge.id)}
                  onMouseLeave={() => setActiveBadge(null)}
                  onClick={() => setActiveBadge(isActive ? null : badge.id)}
                >
                  {/* Badge Button */}
                  <div className="relative flex items-center justify-center cursor-pointer -ml-4 -mt-4">
                    <div className={clsx("absolute inset-0 rounded-full animate-ping opacity-30", badge.color)} />
                    <div className={clsx("relative w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg border border-white/20 transition-transform", badge.color, isActive && "scale-110")}>
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Tooltip Info Card */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(
                          "absolute top-10 w-48 bg-[#0F172A]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl z-30 pointer-events-none",
                          // Anchor card slightly offset to avoid clipping
                          "-left-20 rtl:-right-20 rtl:left-auto"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Info size={14} className="text-[var(--color-brand-gold)]" />
                          <span className="font-bold text-white text-sm">{badge.label}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {badge.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Phase 3: Compact Data Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: dictionary.dataStrip.cop, value: dictionary.dataStrip.copValue },
               { label: dictionary.dataStrip.temp, value: dictionary.dataStrip.tempValue },
               { label: dictionary.dataStrip.rating, value: dictionary.dataStrip.ratingValue },
               { label: dictionary.dataStrip.energy, value: dictionary.dataStrip.energyValue },
             ].map((item, idx) => (
               <div key={idx} className="bg-[#122238] border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                 <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">{item.label}</span>
                 <span className="font-mono text-lg font-bold text-white">{item.value}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Steps Section */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          {dictionary.steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-[var(--color-brand-blue)]/30 hover:bg-white/5 step-card group/step cursor-default relative overflow-hidden"
            >
              {/* Subtle accent line on hover */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-[var(--color-brand-gold)] opacity-0 group-hover/step:opacity-100 transition-opacity rtl:left-auto rtl:right-0" />
              
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-brand-navy)] border border-[var(--color-brand-blue)]/30 flex items-center justify-center text-[var(--color-brand-gold)] font-bold text-xl group-hover/step:bg-[var(--color-brand-blue)]/20 transition-colors">
                {step.number}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover/step:text-[var(--color-brand-blue)] transition-colors">{step.title}</h4>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-2 px-4"
          >
            <Link 
              href={`/${lang}/request-study`}
              className="inline-flex justify-center items-center px-8 py-4 w-full border border-slate-200 text-base font-bold rounded-md text-white bg-[var(--color-brand-gold)] hover:opacity-90 transition-all text-center"
            >
              {dictionary.ctaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
