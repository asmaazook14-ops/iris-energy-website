const fs = require('fs');
let content = fs.readFileSync('src/app/[lang]/page.tsx', 'utf8');

// Add import for SolutionsAccordion
if (!content.includes('import SolutionsAccordion')) {
  content = content.replace(
    /import Link from 'next\/link';/,
    `import Link from 'next/link';\nimport SolutionsAccordion from '@/components/SolutionsAccordion';`
  );
}

// Prepare the items and replace the grid
const searchPattern = /<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">[\s\S]*?\{engineeringSolutions\.map\(\(sol, idx\) => \{[\s\S]*?const Icon = sol\.icon;[\s\S]*?return \([\s\S]*?<AnimatedFeatureCard key=\{idx\} idx=\{idx\} className="flex flex-row md:flex-col gap-4 md:gap-0"\>[\s\S]*?<AnimatedIconBox idx=\{idx\} className="shrink-0 mb-0 md:mb-6"\>[\s\S]*?<Icon className="w-5 h-5 md:w-6 md:h-6 text-\[var\(--color-brand-blue\)\]" \/\>[\s\S]*?<\/AnimatedIconBox\>[\s\S]*?<div\>[\s\S]*?<h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-3"\>\{sol\.title\}<\/h4\>[\s\S]*?<p className="text-sm md:text-base text-slate-400 leading-relaxed"\>\{sol\.desc\}<\/p\>[\s\S]*?<\/div\>[\s\S]*?<\/AnimatedFeatureCard\>[\s\S]*?\);[\s\S]*?\}\)\}[\s\S]*?<\/div>/;

const replacement = `<div className="max-w-4xl mx-auto w-full">
            <SolutionsAccordion 
              items={engineeringSolutions.map(sol => {
                const Icon = sol.icon;
                return {
                  title: sol.title,
                  desc: sol.desc,
                  icon: <Icon className="w-6 h-6 md:w-8 md:h-8" />
                };
              })} 
              lang={lang} 
            />
          </div>`;

if (searchPattern.test(content)) {
  content = content.replace(searchPattern, replacement);
  fs.writeFileSync('src/app/[lang]/page.tsx', content, 'utf8');
  console.log('Update successful');
} else {
  console.log('Could not find the target grid section to replace.');
}
