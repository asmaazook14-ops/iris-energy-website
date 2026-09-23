'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedFeatureCard({ 
  children, 
  idx 
}: { 
  children: React.ReactNode;
  idx: number;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: 'spring', stiffness: 50, damping: 20, delay: idx * 0.1 }}
      className="flex flex-col cursor-default relative group"
    >
      {/* Subtle border to separate items on larger screens */}
      {idx > 0 && (
        <div className="absolute top-0 -left-6 bottom-0 w-px bg-white/5 hidden md:block rtl:-right-6 rtl:left-auto transition-colors duration-700" />
      )}
      {children}
    </motion.div>
  );
}

export function AnimatedIconBox({ 
  children, 
  idx 
}: { 
  children: React.ReactNode;
  idx: number;
}) {
  return (
    <div className="relative w-14 h-14 mb-6">
      {/* Organic shimmer background behind icon */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-blue)]/20 to-[var(--color-brand-gold)]/10 rounded-xl blur-md"
      />
      {/* Gentle floating motion for the icon box */}
      <motion.div 
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
        className="absolute inset-0 bg-gradient-to-br from-[#122238] to-[#0B192C] border border-white/5 shadow-inner rounded-xl flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
