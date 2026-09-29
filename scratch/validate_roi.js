const fs = require('fs');
const path = require('path');
require('ts-node/register');
const { calculateRoiScenario } = require('../src/lib/roiCalculator.ts');

const heatPumps = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/heat_pumps.json'), 'utf8'));
const energyPrices = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/energy_prices.json'), 'utf8'));
const validationData = JSON.parse(fs.readFileSync(path.join(__dirname, 'validation_data.json'), 'utf8'));

let allMatch = true;

for (const scenario of validationData) {
  console.log(`\nValidating: ${scenario.name}`);
  if (scenario.error) {
    console.log(`Python errored: ${scenario.error}`);
    continue;
  }
  
  const inputs = scenario.inputs;
  let tsOut;
  try {
    tsOut = calculateRoiScenario(inputs, heatPumps, energyPrices);
  } catch (e) {
    console.error(`TS errored: ${e.message}`);
    allMatch = false;
    continue;
  }
  
  const pyOut = scenario.output;
  const tolerance = 1e-4; // adjust as needed for floating point
  
  const keys = Object.keys(pyOut);
  for (const key of keys) {
    const pyVal = pyOut[key];
    const tsVal = tsOut[key];
    
    if (pyVal === null && tsVal === null) continue;
    if (Math.abs(pyVal - tsVal) > tolerance) {
      console.error(`Mismatch in ${key}: Python=${pyVal}, TS=${tsVal}`);
      allMatch = false;
    }
  }
  
  if (allMatch) {
    console.log(`All fields matched for scenario: ${scenario.name}`);
  }
}

if (allMatch) {
  console.log('\nSUCCESS: TypeScript implementation matches Python!');
} else {
  console.log('\nFAILURE: TypeScript implementation differs from Python.');
  process.exit(1);
}
