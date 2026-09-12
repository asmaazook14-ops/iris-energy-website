import Image from 'next/image';

export default function ProductMatrix() {
  return (
    <div className="w-full max-w-7xl mx-auto bg-[#0B192C] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 bg-[#122238] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[var(--color-brand-blue)]/5 to-transparent pointer-events-none border-t-2 border-[var(--color-brand-blue)]/20" />
            <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Product Specification Matrix</h2>
                <p className="text-sm md:text-base text-slate-400 mt-2 max-w-2xl">Compare technical features and specifications across our product lineup to find the perfect solution for your needs.</p>
            </div>
            <div className="flex gap-2 relative z-10">
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-sm text-[10px] uppercase font-mono font-bold bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] border border-[var(--color-brand-blue)]/30">Standard</span>
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-sm text-[10px] uppercase font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Pro</span>
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-sm text-[10px] uppercase font-mono font-bold bg-[var(--color-brand-gold)]/10 text-[var(--color-brand-gold)] border border-[var(--color-brand-gold)]/30">Inverter</span>
            </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border-x border-white/5 bg-[#0B192C]">
            <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                    {/* Category Headers */}
                    <tr>
                        <th className="sticky left-0 bg-[#0B192C] border-b border-r border-white/10 p-0 min-w-[220px] z-10"></th>
                        <th colSpan={2} className="border-b border-white/10 p-3 text-center border-t-2 border-t-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5">
                            <span className="text-[var(--color-brand-blue)] font-bold uppercase tracking-widest text-[11px] font-mono">Residential (Standard)</span>
                        </th>
                        <th colSpan={2} className="border-b border-white/10 p-3 text-center border-t-2 border-t-cyan-500 bg-cyan-500/5 border-l border-white/10">
                            <span className="text-cyan-400 font-bold uppercase tracking-widest text-[11px] font-mono">Commercial (Pro)</span>
                        </th>
                        <th colSpan={1} className="border-b border-white/10 p-3 text-center border-t-2 border-t-[var(--color-brand-gold)] bg-[var(--color-brand-gold)]/5 border-l border-white/10">
                            <span className="text-[var(--color-brand-gold)] font-bold uppercase tracking-widest text-[11px] font-mono">Industrial (Inverter)</span>
                        </th>
                    </tr>
                    {/* Product Thumbnails & Names */}
                    <tr className="bg-[#122238] shadow-sm relative z-0">
                        <th className="sticky left-0 bg-[#122238] border-b border-r border-white/10 p-5 align-bottom text-xs font-bold text-slate-400 uppercase tracking-widest z-10">
                            Specifications
                        </th>
                        
                        {/* Standard 1 */}
                        <th className="border-b border-white/10 p-6 text-center min-w-[180px] w-[180px]">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-[#0B192C] rounded-lg mb-4 flex items-center justify-center border border-white/10 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--color-brand-blue)]/50">
                                    <Image src="/images/Products/product-iris-pool-heat-pump.webp" alt="Residential Heat Pump" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="font-mono font-bold text-white text-lg tracking-wide">IRv-010</span>
                            </div>
                        </th>
                        {/* Standard 2 */}
                        <th className="border-b border-white/10 p-6 text-center min-w-[180px] w-[180px]">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-[#0B192C] rounded-lg mb-4 flex items-center justify-center border border-white/10 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--color-brand-blue)]/50">
                                    <Image src="/images/Products/product-iris-pool-heat-pump.webp" alt="Residential Heat Pump Large" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="font-mono font-bold text-white text-lg tracking-wide">IRv-060</span>
                            </div>
                        </th>
                        {/* Pro 1 */}
                        <th className="border-b border-white/10 p-6 text-center min-w-[180px] w-[180px] border-l border-white/5 bg-cyan-900/10">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-[#0B192C] rounded-lg mb-4 flex items-center justify-center border border-white/10 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan-500/50">
                                    <div className="absolute top-0 right-0 bg-cyan-600 text-white text-[9px] font-bold px-2 py-1 rounded-bl text-xs font-mono tracking-wider z-10">NEW</div>
                                    <Image src="/images/Products/product-showroom-unit.webp" alt="Commercial Unit" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="font-mono font-bold text-white text-lg tracking-wide">IRv-075</span>
                            </div>
                        </th>
                        {/* Pro 2 */}
                        <th className="border-b border-white/10 p-6 text-center min-w-[180px] w-[180px] bg-cyan-900/10">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-[#0B192C] rounded-lg mb-4 flex items-center justify-center border border-white/10 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan-500/50">
                                    <Image src="/images/Products/product-showroom-unit.webp" alt="Commercial Unit Max" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="font-mono font-bold text-white text-lg tracking-wide">IRv-150</span>
                            </div>
                        </th>
                        {/* Inverter */}
                        <th className="border-b border-white/10 p-6 text-center min-w-[180px] w-[180px] border-l border-white/5 bg-[var(--color-brand-gold)]/5">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-[#0B192C] rounded-lg mb-4 flex items-center justify-center border border-white/10 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--color-brand-gold)]/50">
                                    <Image src="/images/Projects/project-multi-unit-heat-pump-system.webp" alt="Industrial Multi Unit" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="font-mono font-bold text-white text-lg tracking-wide">IRv-500</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {/* Group 1: Core Specs */}
                    <tr>
                        <td colSpan={6} className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-[#0B192C] sticky left-0 z-0 relative border-b border-white/5">Core Specifications</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group">
                        <td className="sticky left-0 bg-[#0B192C] group-hover:bg-[#122238] border-r border-white/10 px-5 py-4 text-sm font-semibold text-slate-300 z-10 transition-colors">Capacity</td>
                        <td className="px-5 py-4 text-sm text-center text-white font-mono">10 kW</td>
                        <td className="px-5 py-4 text-sm text-center text-white font-mono">65 kW</td>
                        <td className="px-5 py-4 text-sm text-center text-cyan-300 font-mono font-bold border-l border-white/5 bg-cyan-900/10">75 kW</td>
                        <td className="px-5 py-4 text-sm text-center text-cyan-300 font-mono font-bold bg-cyan-900/10">150 kW</td>
                        <td className="px-5 py-4 text-sm text-center text-[var(--color-brand-gold)] font-mono border-l border-white/5 bg-[var(--color-brand-gold)]/5">475 kW</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group">
                        <td className="sticky left-0 bg-[#0B192C] group-hover:bg-[#122238] border-r border-white/10 px-5 py-4 text-sm font-semibold text-slate-300 z-10 transition-colors">Technology</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-300">Full Inverter</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-300">Full Inverter</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-300 border-l border-white/5 bg-cyan-900/10">Full Inverter</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-300 bg-cyan-900/10">Full Inverter</td>
                        <td className="px-5 py-4 text-sm text-center text-white font-semibold border-l border-white/5 bg-[var(--color-brand-gold)]/5">Full Inverter</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group">
                        <td className="sticky left-0 bg-[#0B192C] group-hover:bg-[#122238] border-r border-white/10 px-5 py-4 text-sm font-semibold text-slate-300 z-10 transition-colors">Efficiency Class</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-300 font-mono">A+++</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-300 font-mono">A+++</td>
                        <td className="px-5 py-4 text-sm text-center text-cyan-300 font-mono font-bold border-l border-white/5 bg-cyan-900/10">A+++</td>
                        <td className="px-5 py-4 text-sm text-center text-cyan-300 font-mono font-bold bg-cyan-900/10">A+++</td>
                        <td className="px-5 py-4 text-sm text-center text-white font-mono font-semibold border-l border-white/5 bg-[var(--color-brand-gold)]/5">A+++</td>
                    </tr>

                    {/* Group 2: Physical Details */}
                    <tr>
                        <td colSpan={6} className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-[#0B192C] sticky left-0 z-0 relative border-t border-b border-white/5">Components</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group">
                        <td className="sticky left-0 bg-[#0B192C] group-hover:bg-[#122238] border-r border-white/10 px-5 py-4 text-sm font-semibold text-slate-300 z-10 transition-colors">Compressors</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400">Panasonic / Copeland</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400">Panasonic / Copeland</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400 border-l border-white/5 bg-cyan-900/10">Panasonic / Copeland</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400 bg-cyan-900/10">Panasonic / Copeland</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400 border-l border-white/5 bg-[var(--color-brand-gold)]/5">Panasonic / Copeland</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group">
                        <td className="sticky left-0 bg-[#0B192C] group-hover:bg-[#122238] border-r border-white/10 px-5 py-4 text-sm font-semibold text-slate-300 z-10 transition-colors">Heat Exchanger</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400">PVC/Titanium</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400">PVC/Titanium</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400 border-l border-white/5 bg-cyan-900/10">PVC/Titanium</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400 bg-cyan-900/10">PVC/Titanium</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-400 border-l border-white/5 bg-[var(--color-brand-gold)]/5">PVC/Titanium</td>
                    </tr>

                    {/* Group 3: Features */}
                    <tr>
                        <td colSpan={6} className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-[#0B192C] sticky left-0 z-0 relative border-t border-b border-white/5">Features</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group">
                        <td className="sticky left-0 bg-[#0B192C] group-hover:bg-[#122238] border-r border-white/10 px-5 py-4 text-sm font-semibold text-slate-300 z-10 transition-colors">Smart Control (Wi-Fi)</td>
                        <td className="px-5 py-4 text-center text-emerald-400">
                            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                        <td className="px-5 py-4 text-center text-emerald-400">
                            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                        <td className="px-5 py-4 text-center text-emerald-400 border-l border-white/5 bg-cyan-900/10">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                        <td className="px-5 py-4 text-center text-emerald-400 bg-cyan-900/10">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                        <td className="px-5 py-4 text-center text-emerald-400 border-l border-white/5 bg-[var(--color-brand-gold)]/5">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group">
                        <td className="sticky left-0 bg-[#0B192C] group-hover:bg-[#122238] border-r border-white/10 px-5 py-4 text-sm font-semibold text-slate-300 border-b-0 z-10 transition-colors">Sound Level</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-300 font-mono border-b-0">50 dB(A)</td>
                        <td className="px-5 py-4 text-sm text-center text-slate-300 font-mono border-b-0">55 dB(A)</td>
                        <td className="px-5 py-4 text-sm text-center text-cyan-300 font-mono font-bold border-l border-white/5 bg-cyan-900/10 border-b-0">56 dB(A)</td>
                        <td className="px-5 py-4 text-sm text-center text-cyan-300 font-mono font-bold bg-cyan-900/10 border-b-0">58 dB(A)</td>
                        <td className="px-5 py-4 text-sm text-center text-white font-mono border-l border-white/5 bg-[var(--color-brand-gold)]/5 border-b-0">65 dB(A)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
}
