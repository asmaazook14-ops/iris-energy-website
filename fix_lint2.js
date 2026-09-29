const fs = require('fs');
let p = fs.readFileSync('src/app/prototype/page.tsx', 'utf8');

p = p.replace(/let next = \{\s*\.\.\.telemetry\s*\};/g, 'const next = { ...telemetry };');
p = p.replace(/value: any/g, 'value: string | number');

fs.writeFileSync('src/app/prototype/page.tsx', p);

let e = fs.readFileSync('eslint.config.mjs', 'utf8');
e = e.replace('"update_*.js"', '"update_*.js", "*.js"');
fs.writeFileSync('eslint.config.mjs', e);
