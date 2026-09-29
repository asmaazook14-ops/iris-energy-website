const fs = require('fs');

let content = fs.readFileSync('src/components/AnimatedFeatureCard.tsx', 'utf8');

// Add className to AnimatedFeatureCard
content = content.replace(
  /export function AnimatedFeatureCard\(\{ \n  children, \n  idx \n\}: \{ \n  children: React\.ReactNode;\n  idx: number;\n\}\) \{/g,
  `export function AnimatedFeatureCard({ 
  children, 
  idx,
  className
}: { 
  children: React.ReactNode;
  idx: number;
  className?: string;
}) {`
);

content = content.replace(
  /className="flex flex-col cursor-default relative group"/g,
  'className={className || "flex flex-col cursor-default relative group"}'
);

// Add className to AnimatedIconBox
content = content.replace(
  /export function AnimatedIconBox\(\{ \n  children, \n  idx \n\}: \{ \n  children: React\.ReactNode;\n  idx: number;\n\}\) \{/g,
  `export function AnimatedIconBox({ 
  children, 
  idx,
  className
}: { 
  children: React.ReactNode;
  idx: number;
  className?: string;
}) {`
);

content = content.replace(
  /className="relative w-14 h-14 mb-6"/g,
  'className={`relative w-14 h-14 ${className || "mb-6"}`}'
);

fs.writeFileSync('src/components/AnimatedFeatureCard.tsx', content, 'utf8');
console.log('Updated AnimatedFeatureCard');
