const fs = require('fs');
let content = fs.readFileSync('src/app/prototype/page.tsx', 'utf8');

// fix useRef
content = content.replace('import React, { useState, useEffect, useRef } from "react";', 'import React, { useState, useEffect } from "react";');

// fix useState<any[]>
content = content.replace('useState<any[]>(Array(20).fill', 'useState<{power: number, cop: number, time: string}[]>(Array(20).fill');

// fix Math.random in render
content = content.replace('(320 + Math.random()*10).toFixed(0)', '"325"');
content = content.replace('(8.5 + Math.random()*0.2).toFixed(1)', '"8.6"');

// fix unescaped entities
content = content.replace('"The vision is to turn', '&quot;The vision is to turn');
content = content.replace('every day."', 'every day.&quot;');

// fix any on DashboardIcon
content = content.replace('const DashboardIcon = (props: any) =>', 'const DashboardIcon = (props: React.SVGProps<SVGSVGElement>) =>');

fs.writeFileSync('src/app/prototype/page.tsx', content);
