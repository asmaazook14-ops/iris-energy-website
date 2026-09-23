'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface SolutionItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function SolutionsAccordion({ 
  items, 
  lang 
}: { 
  items: SolutionItem[];
  lang: 'en' | 'ar';
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => (
        <div 
          key={idx} 
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-[var(--color-brand-blue)]/50 cursor-pointer backdrop-blur-sm"
          onClick={() => toggle(idx)}
        >
          <div className="flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#122238] rounded-xl flex items-center justify-center shrink-0 border border-white/5 text-[var(--color-brand-blue)]">
                {item.icon}
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white">{item.title}</h4>
            </div>
            <motion.div
              animate={{ rotate: openIndex === idx ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#122238] flex items-center justify-center shrink-0"
            >
              <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-4 md:px-6 pb-4 md:pb-6 text-sm md:text-base text-slate-400 leading-relaxed">
                  <div className="border-t border-white/5 pt-4">
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
