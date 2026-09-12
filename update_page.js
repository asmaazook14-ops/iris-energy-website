const fs = require('fs');
let content = fs.readFileSync('src/app/[lang]/page.tsx', 'utf8');

content = content.replace(
  /className="inline-flex items-center px-[^"]*"/,
  'className="inline-flex items-center px-4 py-2 rounded-full bg-[#21406b] mb-6"'
);
content = content.replace(
  /className="text-\[var\(--color-brand-blue\)\][^"]*"/,
  'className="text-[#8ec5ff] font-bold text-xs uppercase tracking-widest"'
);

// Secondary CTA
content = content.replace(
  /className="inline-flex justify-center items-center px-8 py-4 border border-white\/20 text-base font-bold rounded-md text-white bg-transparent hover:bg-\[#122238\] transition-all duration-200"/,
  'className="inline-flex justify-center items-center px-8 py-4 border border-slate-200 text-base font-bold rounded-md text-white bg-[#f59e0b] hover:opacity-90 transition-all"'
);

fs.writeFileSync('src/app/[lang]/page.tsx', content);
