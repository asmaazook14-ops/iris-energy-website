import fs from 'fs';

const data = JSON.parse(fs.readFileSync('figma.json', 'utf8'));

function figmaToTailwind(node) {
  let classes = [];
  
  if (node.layoutMode === 'HORIZONTAL') classes.push('flex', 'flex-row');
  else if (node.layoutMode === 'VERTICAL') classes.push('flex', 'flex-col');

  if (node.primaryAxisAlignItems === 'SPACE_BETWEEN') classes.push('justify-between');
  else if (node.primaryAxisAlignItems === 'CENTER') classes.push('justify-center');
  else if (node.primaryAxisAlignItems === 'MAX') classes.push('justify-end');

  if (node.counterAxisAlignItems === 'CENTER') classes.push('items-center');
  else if (node.counterAxisAlignItems === 'MAX') classes.push('items-end');

  if (node.itemSpacing) classes.push(`gap-[${node.itemSpacing}px]`);
  if (node.paddingLeft) classes.push(`px-[${node.paddingLeft}px]`);
  if (node.paddingTop) classes.push(`py-[${node.paddingTop}px]`);
  if (node.cornerRadius) classes.push(`rounded-[${node.cornerRadius}px]`);

  if (node.strokes && node.strokes.length > 0) {
    const stroke = node.strokes[0];
    if (stroke.type === 'SOLID') {
      const r = Math.round(stroke.color.r * 255);
      const g = Math.round(stroke.color.g * 255);
      const b = Math.round(stroke.color.b * 255);
      const a = stroke.color.a;
      classes.push(`border border-[rgba(${r},${g},${b},${a.toFixed(2)})]`);
    }
  }

  if (node.fills && node.fills.length > 0) {
    const fill = node.fills[0];
    if (fill.type === 'SOLID') {
      const r = Math.round(fill.color.r * 255);
      const g = Math.round(fill.color.g * 255);
      const b = Math.round(fill.color.b * 255);
      const a = fill.color.a;
      if (a === 1) {
        classes.push(`bg-[#${(1<<24 | r<<16 | g<<8 | b).toString(16).slice(1)}]`);
      } else {
        classes.push(`bg-[rgba(${r},${g},${b},${a.toFixed(2)})]`);
      }
    }
  }

  return classes.join(' ');
}

function traverse(node, depth = 0) {
  const indent = '  '.repeat(depth);
  let summary = `${indent}- [${node.type}] ${node.name}`;
  
  const tw = figmaToTailwind(node);
  if (tw) summary += ` (TW: ${tw})`;

  if (node.type === 'TEXT') {
    summary += ` (Text: "${node.characters.replace(/\n/g, '\\n')}")`;
    summary += ` (Font: ${node.style.fontFamily} ${node.style.fontWeight} ${node.style.fontSize}px)`;
  }

  console.log(summary);

  if (node.children) {
    node.children.forEach(child => traverse(child, depth + 1));
  }
}

data.document.children.forEach(page => {
  page.children.forEach(frame => {
    traverse(frame);
  });
});
