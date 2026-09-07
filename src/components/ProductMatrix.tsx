import Image from 'next/image';

export default function ProductMatrix() {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Product Specification Matrix</h2>
                <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl">Compare technical features and specifications across our product lineup to find the perfect solution for your needs.</p>
            </div>
            <div className="flex gap-2">
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">Standard</span>
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 shadow-sm">Pro</span>
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">Inverter</span>
            </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border-x border-gray-200">
            <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                    {/* Category Headers */}
                    <tr>
                        <th className="sticky left-0 bg-white border-b border-r border-gray-200 p-0 min-w-[220px] z-10"></th>
                        <th colSpan={2} className="border-b border-gray-200 p-3 text-center border-t-4 border-t-blue-500 bg-blue-50/40">
                            <span className="text-blue-800 font-bold uppercase tracking-widest text-[11px]">Residential (Standard)</span>
                        </th>
                        <th colSpan={2} className="border-b border-gray-200 p-3 text-center border-t-4 border-t-purple-500 bg-purple-50/50 border-l border-gray-200">
                            <span className="text-purple-800 font-bold uppercase tracking-widest text-[11px]">Commercial (Pro)</span>
                        </th>
                        <th colSpan={1} className="border-b border-gray-200 p-3 text-center border-t-4 border-t-emerald-500 bg-emerald-50/40 border-l border-gray-200">
                            <span className="text-emerald-800 font-bold uppercase tracking-widest text-[11px]">Industrial (Inverter)</span>
                        </th>
                    </tr>
                    {/* Product Thumbnails & Names */}
                    <tr className="bg-white shadow-sm relative z-0">
                        <th className="sticky left-0 bg-white border-b border-r border-gray-200 p-5 align-bottom text-xs font-bold text-gray-400 uppercase tracking-widest z-10 group-hover:bg-gray-50">
                            Specifications
                        </th>
                        
                        {/* Standard 1 */}
                        <th className="border-b border-gray-200 p-6 text-center min-w-[180px] w-[180px]">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-blue-200">
                                    <Image src="/images/Products/product-iris-pool-heat-pump.webp" alt="Residential Heat Pump" fill className="object-cover" />
                                </div>
                                <span className="font-extrabold text-gray-900 text-lg">IRv-010</span>
                            </div>
                        </th>
                        {/* Standard 2 */}
                        <th className="border-b border-gray-200 p-6 text-center min-w-[180px] w-[180px]">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-blue-200">
                                    <Image src="/images/Products/product-iris-pool-heat-pump.webp" alt="Residential Heat Pump Large" fill className="object-cover" />
                                </div>
                                <span className="font-extrabold text-gray-900 text-lg">IRv-060</span>
                            </div>
                        </th>
                        {/* Pro 1 */}
                        <th className="border-b border-gray-200 p-6 text-center min-w-[180px] w-[180px] border-l border-gray-100 bg-purple-50/10">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-purple-200">
                                    <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-lg z-10 shadow-sm tracking-wider">NEW</div>
                                    <Image src="/images/Products/product-showroom-unit.webp" alt="Commercial Unit" fill className="object-cover" />
                                </div>
                                <span className="font-extrabold text-gray-900 text-lg">IRv-075</span>
                            </div>
                        </th>
                        {/* Pro 2 */}
                        <th className="border-b border-gray-200 p-6 text-center min-w-[180px] w-[180px] bg-purple-50/10">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-purple-200">
                                    <Image src="/images/Products/product-showroom-unit.webp" alt="Commercial Unit Max" fill className="object-cover" />
                                </div>
                                <span className="font-extrabold text-gray-900 text-lg">IRv-150</span>
                            </div>
                        </th>
                        {/* Inverter */}
                        <th className="border-b border-gray-200 p-6 text-center min-w-[180px] w-[180px] border-l border-gray-100 bg-emerald-50/10">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className="relative w-32 h-32 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-emerald-200">
                                    <Image src="/images/Projects/project-multi-unit-heat-pump-system.webp" alt="Industrial Multi Unit" fill className="object-cover" />
                                </div>
                                <span className="font-extrabold text-gray-900 text-lg">IRv-500</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {/* Group 1: Core Specs */}
                    <tr>
                        <td colSpan={6} className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/80 sticky left-0 z-0 relative">Core Specifications</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="sticky left-0 bg-white group-hover:bg-gray-50 border-r border-gray-200 px-5 py-4 text-sm font-semibold text-gray-800 z-10 transition-colors">Capacity</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600">10 kW</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600">65 kW</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-900 font-bold border-l border-gray-100 bg-purple-50/30">75 kW</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-900 font-bold bg-purple-50/30">150 kW</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-400 border-l border-gray-100 bg-emerald-50/20">475 kW</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="sticky left-0 bg-white group-hover:bg-gray-50 border-r border-gray-200 px-5 py-4 text-sm font-semibold text-gray-800 z-10 transition-colors">Technology</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600">Full Inverter</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600">Full Inverter</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600 border-l border-gray-100 bg-purple-50/30">Full Inverter</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600 bg-purple-50/30">Full Inverter</td>
                        <td className="px-5 py-4 text-sm text-center text-emerald-700 font-semibold border-l border-gray-100 bg-emerald-50/20">Full Inverter</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="sticky left-0 bg-white group-hover:bg-gray-50 border-r border-gray-200 px-5 py-4 text-sm font-semibold text-gray-800 z-10 transition-colors">Efficiency Class</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600">A+++</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600">A+++</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-900 font-bold border-l border-gray-100 bg-purple-50/30">A+++</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-900 font-bold bg-purple-50/30">A+++</td>
                        <td className="px-5 py-4 text-sm text-center text-emerald-700 font-semibold border-l border-gray-100 bg-emerald-50/20">A+++</td>
                    </tr>

                    {/* Group 2: Physical Details */}
                    <tr>
                        <td colSpan={6} className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/80 sticky left-0 z-0 relative border-t border-gray-200">Components</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="sticky left-0 bg-white group-hover:bg-gray-50 border-r border-gray-200 px-5 py-4 text-sm font-semibold text-gray-800 z-10 transition-colors">Compressors</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-500">Panasonic / Copeland</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-500">Panasonic / Copeland</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-500 border-l border-gray-100 bg-purple-50/30">Panasonic / Copeland</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-500 bg-purple-50/30">Panasonic / Copeland</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-500 border-l border-gray-100 bg-emerald-50/20">Panasonic / Copeland</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="sticky left-0 bg-white group-hover:bg-gray-50 border-r border-gray-200 px-5 py-4 text-sm font-semibold text-gray-800 z-10 transition-colors">Heat Exchanger</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600">PVC/Titanium</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600">PVC/Titanium</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600 border-l border-gray-100 bg-purple-50/30">PVC/Titanium</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600 bg-purple-50/30">PVC/Titanium</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600 border-l border-gray-100 bg-emerald-50/20">PVC/Titanium</td>
                    </tr>

                    {/* Group 3: Features */}
                    <tr>
                        <td colSpan={6} className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/80 sticky left-0 z-0 relative border-t border-gray-200">Features</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="sticky left-0 bg-white group-hover:bg-gray-50 border-r border-gray-200 px-5 py-4 text-sm font-semibold text-gray-800 z-10 transition-colors">Smart Control (Wi-Fi)</td>
                        <td className="px-5 py-4 text-center text-emerald-500">
                            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                        <td className="px-5 py-4 text-center text-emerald-500">
                            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                        <td className="px-5 py-4 text-center text-emerald-500 border-l border-gray-100 bg-purple-50/30">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                        <td className="px-5 py-4 text-center text-emerald-500 bg-purple-50/30">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                        <td className="px-5 py-4 text-center text-emerald-500 border-l border-gray-100 bg-emerald-50/20">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="sticky left-0 bg-white group-hover:bg-gray-50 border-r border-gray-200 px-5 py-4 text-sm font-semibold text-gray-800 border-b-0 z-10 transition-colors">Sound Level</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600 border-b-0">50 dB(A)</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600 border-b-0">55 dB(A)</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-900 font-bold border-l border-gray-100 bg-purple-50/30 border-b-0">56 dB(A)</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-900 font-bold bg-purple-50/30 border-b-0">58 dB(A)</td>
                        <td className="px-5 py-4 text-sm text-center text-gray-600 border-l border-gray-100 bg-emerald-50/20 border-b-0">65 dB(A)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
}
