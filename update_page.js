const fs = require('fs');

let content = fs.readFileSync('src/app/[lang]/page.tsx', 'utf8');

// 1. Remove Section 5
const sec5Start = content.indexOf('{/* 5. ENGINEERING PROCESS');
const sec5End = content.indexOf('{/* 6. PRODUCTS');
if (sec5Start !== -1 && sec5End !== -1) {
    content = content.substring(0, sec5Start) + content.substring(sec5End);
}

// 2. Extract Section 3
const sec3Start = content.indexOf('{/* 3. SOLUTIONS (What IRIS Provides) */}');
const sec7Start = content.indexOf('{/* 7. PROJECTS (What IRIS Has Delivered)');
let sec3Content = '';
if (sec3Start !== -1 && sec7Start !== -1) {
    sec3Content = content.substring(sec3Start, sec7Start);
    content = content.substring(0, sec3Start) + content.substring(sec7Start);
}

// 3. Insert Section 3 AFTER Section 6
const sec8Start = content.indexOf('{/* 8. FINAL CTA */}');
if (sec8Start !== -1 && sec3Content !== '') {
    content = content.substring(0, sec8Start) + sec3Content + '\n      ' + content.substring(sec8Start);
}

// 4. Compact "What We Provide" (Section 3)
content = content.replace(
    /<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">/,
    '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">'
);

// We need a safer regex for AnimatedFeatureCard since there are multiple
// We will replace all of them.
content = content.replace(
    /<AnimatedFeatureCard key=\{idx\} idx=\{idx\}\>[\s\S]*?<AnimatedIconBox idx=\{idx\}\>[\s\S]*?<Icon className="w-6 h-6 text-\[var\(--color-brand-blue\)\]" \/\>[\s\S]*?<\/AnimatedIconBox\>[\s\S]*?<h4 className="text-xl font-bold text-white mb-3"\>\{sol.title\}<\/h4\>[\s\S]*?<p className="text-slate-400 leading-relaxed"\>\{sol.desc\}<\/p\>[\s\S]*?<\/AnimatedFeatureCard\>/g,
    `<AnimatedFeatureCard key={idx} idx={idx} className="flex flex-row md:flex-col gap-4 md:gap-0">
                  <AnimatedIconBox idx={idx} className="shrink-0 mb-0 md:mb-6">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-brand-blue)]" />
                  </AnimatedIconBox>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-3">{sol.title}</h4>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed">{sol.desc}</p>
                  </div>
                </AnimatedFeatureCard>`
);

// 5. Compact "Our Products" (Section 6)
content = content.replace(
    /<div className="max-w-5xl mx-auto space-y-4">[\s\S]*?\{productCategories\.map\(\(prod, idx\) => \([\s\S]*?<Link href=\{\`\/\$\{lang\}\/products\`\} key=\{idx\} className="flex flex-col md:flex-row md:items-center justify-between bg-\[#0B192C\] border border-white rounded-2xl p-6 md:p-8 hover:border-\[var\(--color-brand-blue\)\]\/50 transition-all group"\>[\s\S]*?<div className="flex items-center gap-6 mb-4 md:mb-0"\>[\s\S]*?<div className="w-16 h-16 bg-\[#122238\] rounded-xl flex items-center justify-center shrink-0 border border-white\/5"\>[\s\S]*?<ThermometerSnowflake className="w-8 h-8 text-white opacity-70 group-hover:opacity-100 group-hover:text-\[var\(--color-brand-blue\)\] transition-colors" \/\>[\s\S]*?<\/div\>[\s\S]*?<div\>[\s\S]*?<h4 className="text-2xl font-bold text-white mb-2"\>\{prod.title\}<\/h4\>[\s\S]*?<span className="inline-block px-3 py-1 bg-\[#122238\] border border-white rounded-full text-xs font-medium text-slate-300"\>[\s\S]*?\{prod.tech\}[\s\S]*?<\/span\>[\s\S]*?<\/div\>[\s\S]*?<\/div\>[\s\S]*?<div className="flex items-center justify-between md:justify-end gap-8 border-t border-white md:border-none pt-4 md:pt-0"\>[\s\S]*?<div className="text-right rtl:text-left"\>[\s\S]*?<div className="text-sm text-slate-400 mb-1"\>\{isEn \? 'Capacity' : 'السعة'\}<\/div\>[\s\S]*?<div className="text-\[var\(--color-brand-blue\)\] font-mono font-bold text-xl"\>\{prod.capacity\}<\/div\>[\s\S]*?<\/div\>[\s\S]*?<div className="w-12 h-12 rounded-full bg-\[#122238\] flex items-center justify-center group-hover:bg-\[var\(--color-brand-blue\)\] transition-colors shrink-0"\>[\s\S]*?<ArrowRight className=\{\`w-5 h-5 text-white \$\{isEn \? '' : 'rtl:rotate-180'\}\`\} \/\>[\s\S]*?<\/div\>[\s\S]*?<\/div\>[\s\S]*?<\/Link\>[\s\S]*?\)\)}/g,
    `<div className="max-w-5xl mx-auto space-y-3 md:space-y-4">
            {productCategories.map((prod, idx) => (
              <Link href={\`/\${lang}/products\`} key={idx} className="flex flex-row items-center justify-between bg-[#0B192C] border border-white rounded-xl p-4 md:p-8 hover:border-[var(--color-brand-blue)]/50 transition-all group">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#122238] rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                    <ThermometerSnowflake className="w-6 h-6 md:w-8 md:h-8 text-white opacity-70 group-hover:opacity-100 group-hover:text-[var(--color-brand-blue)] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{prod.title}</h4>
                    <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-[#122238] border border-white rounded-full text-[10px] md:text-xs font-medium text-slate-300">
                      {prod.tech}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-4 md:gap-8">
                  <div className="text-right rtl:text-left">
                    <div className="text-[10px] md:text-sm text-slate-400 mb-0.5 md:mb-1">{isEn ? 'Capacity' : 'السعة'}</div>
                    <div className="text-[var(--color-brand-blue)] font-mono font-bold text-sm md:text-xl">{prod.capacity}</div>
                  </div>
                  <div className="hidden sm:flex w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#122238] items-center justify-center group-hover:bg-[var(--color-brand-blue)] transition-colors shrink-0">
                    <ArrowRight className={\`w-4 h-4 md:w-5 md:h-5 text-white \${isEn ? '' : 'rtl:rotate-180'}\`} />
                  </div>
                </div>
              </Link>
            ))}`
);

fs.writeFileSync('src/app/[lang]/page.tsx', content, 'utf8');
console.log('Update complete.');
