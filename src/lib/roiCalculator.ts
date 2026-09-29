export const MIN_DIMENSION_M = 0.5;
export const MAX_DIMENSION_M = 100.0;
export const MIN_DEPTH_M = 0.2;
export const MAX_DEPTH_M = 6.0;
export const MIN_WATER_TEMP_C = 0.0;
export const MAX_WATER_TEMP_C = 40.0;

export const EVAP_COEFF_A = 68.3;
export const EVAP_COEFF_B = 32.0;
export const CONV_COEFF_A = 0.5;
export const CONV_COEFF_B = 0.235;
export const STEFAN_BOLTZMANN_IMPERIAL = 1.714e-9;
export const PSIA_TO_INHG = 2.036;
export const M2_TO_FT2 = 10.7639;
export const MPS_TO_MPH = 2.23694;
export const BTU_TO_KWH = 0.00029307107;

export const MEASURED_CORRECTION_LOW_WIND = 0.72;
export const MEASURED_CORRECTION_HIGH_WIND = 0.84;

export const COVER_REDUCTION_MIN = 0.50;
export const COVER_REDUCTION_MAX = 0.70;

export const KW_TO_BTU_PER_HOUR = 3412.14;
export const WEEKS_PER_MONTH = 4.345;
export const THERM_TO_KWH = 29.3001;
export const MIN_MEANINGFUL_SAVINGS_USD = 0.01;

export function celsiusToFahrenheit(t_c: number): number {
  return t_c * 9.0 / 5.0 + 32.0;
}

export function mpsToMph(v_mps: number): number {
  return v_mps * MPS_TO_MPH;
}

export function m2ToFt2(area_m2: number): number {
  return area_m2 * M2_TO_FT2;
}

export function saturationPressurePsia(temp_rankine: number): number {
  const T = temp_rankine;
  const ln_pws = (
    -10440.397 / T
    - 11.29465
    - 0.02702355 * T
    + 1.289036e-5 * Math.pow(T, 2)
    - 2.478068e-9 * Math.pow(T, 3)
    + 6.5459673 * Math.log(T)
  );
  return Math.exp(ln_pws);
}

export function calculateEvaporationLoss(
  water_temp_c: number,
  air_temp_c: number,
  relative_humidity_pct: number,
  wind_speed_mps: number,
  surface_area_m2: number,
  activity_factor: number = 0.65,
  apply_measured_correction: boolean = true
): number {
  if (relative_humidity_pct < 0 || relative_humidity_pct > 100) {
    throw new Error(`Relative humidity must be 0-100 (got ${relative_humidity_pct}).`);
  }
  if (wind_speed_mps < 0) {
    throw new Error(`Wind speed cannot be negative (got ${wind_speed_mps}).`);
  }
  if (surface_area_m2 <= 0) {
    throw new Error(`Surface area must be positive (got ${surface_area_m2}).`);
  }

  const water_temp_f = celsiusToFahrenheit(water_temp_c);
  const air_temp_f = celsiusToFahrenheit(air_temp_c);
  const wind_mph = mpsToMph(wind_speed_mps);

  const tw_rankine = water_temp_f + 459.67;
  const ta_rankine = air_temp_f + 459.67;

  const pws_water_psia = saturationPressurePsia(tw_rankine);
  const pws_air_psia = saturationPressurePsia(ta_rankine);
  const pw_dewpoint_psia = (relative_humidity_pct / 100.0) * pws_air_psia;

  const ppw_inhg = pws_water_psia * PSIA_TO_INHG;
  const pdp_inhg = pw_dewpoint_psia * PSIA_TO_INHG;

  let q_evap_btu_per_ft2h = (EVAP_COEFF_A + EVAP_COEFF_B * wind_mph) * (ppw_inhg - pdp_inhg) * activity_factor;
  q_evap_btu_per_ft2h = Math.max(q_evap_btu_per_ft2h, 0.0);

  if (apply_measured_correction) {
    const wind_mps_clamped = Math.min(Math.max(wind_speed_mps, 0.0), 2.2);
    const correction = MEASURED_CORRECTION_LOW_WIND + (
      (MEASURED_CORRECTION_HIGH_WIND - MEASURED_CORRECTION_LOW_WIND) * (wind_mps_clamped / 2.2)
    );
    q_evap_btu_per_ft2h *= correction;
  }

  const surface_area_ft2 = m2ToFt2(surface_area_m2);
  const q_evap_btu_h = q_evap_btu_per_ft2h * surface_area_ft2;
  return q_evap_btu_h * BTU_TO_KWH;
}

export function calculateConvectionLoss(
  water_temp_c: number,
  air_temp_c: number,
  wind_speed_mps: number,
  surface_area_m2: number
): number {
  if (surface_area_m2 <= 0) {
    throw new Error(`Surface area must be positive (got ${surface_area_m2}).`);
  }

  const water_temp_f = celsiusToFahrenheit(water_temp_c);
  const air_temp_f = celsiusToFahrenheit(air_temp_c);
  const wind_mph = mpsToMph(wind_speed_mps);

  const hc = CONV_COEFF_A + CONV_COEFF_B * wind_mph;
  const q_conv_btu_per_ft2h = hc * (water_temp_f - air_temp_f);

  const surface_area_ft2 = m2ToFt2(surface_area_m2);
  const q_conv_btu_h = q_conv_btu_per_ft2h * surface_area_ft2;
  return q_conv_btu_h * BTU_TO_KWH;
}

export function calculateRadiationLoss(
  water_temp_c: number,
  sky_temp_c: number,
  surface_area_m2: number
): number {
  if (surface_area_m2 <= 0) {
    throw new Error(`Surface area must be positive (got ${surface_area_m2}).`);
  }

  const water_temp_f = celsiusToFahrenheit(water_temp_c);
  const sky_temp_f = celsiusToFahrenheit(sky_temp_c);
  const tw_rankine = water_temp_f + 459.67;

  const hrad = 4.0 * STEFAN_BOLTZMANN_IMPERIAL * Math.pow(tw_rankine, 3);
  const q_rad_btu_per_ft2h = hrad * (water_temp_f - sky_temp_f);

  const surface_area_ft2 = m2ToFt2(surface_area_m2);
  const q_rad_btu_h = q_rad_btu_per_ft2h * surface_area_ft2;
  return q_rad_btu_h * BTU_TO_KWH;
}

export function calculateTotalHeatLoss(
  pool_type: string,
  water_temp_c: number,
  air_temp_c: number,
  relative_humidity_pct: number,
  wind_speed_mps: number,
  surface_area_m2: number,
  has_cover: boolean = false,
  cover_reduction_factor: number | null = null,
  activity_factor: number = 0.65
): { evaporation_kw: number; convection_kw: number; radiation_kw: number; total_kw: number } {
  pool_type = pool_type.toLowerCase().trim();
  if (pool_type !== 'indoor' && pool_type !== 'outdoor') {
    throw new Error(`pool_type must be 'indoor' or 'outdoor' (got '${pool_type}').`);
  }

  let evap_kw = calculateEvaporationLoss(
    water_temp_c, air_temp_c, relative_humidity_pct, wind_speed_mps,
    surface_area_m2, activity_factor, true
  );

  if (has_cover) {
    const factor = cover_reduction_factor !== null ? cover_reduction_factor : (
      (COVER_REDUCTION_MIN + COVER_REDUCTION_MAX) / 2.0
    );
    if (factor < 0.0 || factor > 1.0) {
      throw new Error(`cover_reduction_factor must be between 0 and 1 (got ${factor}).`);
    }
    evap_kw *= (1.0 - factor);
  }

  const conv_kw = calculateConvectionLoss(water_temp_c, air_temp_c, wind_speed_mps, surface_area_m2);
  let rad_kw = 0.0;
  if (pool_type === 'outdoor') {
    rad_kw = calculateRadiationLoss(water_temp_c, air_temp_c, surface_area_m2);
  }

  const total_kw = evap_kw + conv_kw + rad_kw;

  return {
    evaporation_kw: evap_kw,
    convection_kw: conv_kw,
    radiation_kw: rad_kw,
    total_kw: total_kw
  };
}

export function calculatePoolSurfaceArea(length_m: number, width_m: number): number {
  if (length_m == null || width_m == null) throw new Error("Pool length and width are required.");
  if (length_m <= 0 || width_m <= 0) throw new Error("Pool length and width must be positive numbers.");
  if (length_m < MIN_DIMENSION_M || length_m > MAX_DIMENSION_M) throw new Error("Length out of bounds.");
  if (width_m < MIN_DIMENSION_M || width_m > MAX_DIMENSION_M) throw new Error("Width out of bounds.");
  return length_m * width_m;
}

export function calculatePoolVolume(length_m: number, width_m: number, avg_depth_m: number): number {
  const area = calculatePoolSurfaceArea(length_m, width_m);
  if (avg_depth_m == null || avg_depth_m <= 0) throw new Error("Depth must be positive.");
  if (avg_depth_m < MIN_DEPTH_M || avg_depth_m > MAX_DEPTH_M) throw new Error("Depth out of bounds.");
  return area * avg_depth_m;
}

export function calculateWaterMass(volume_m3: number, density_kg_m3: number = 1000.0): number {
  if (volume_m3 <= 0) throw new Error("Volume must be positive.");
  if (density_kg_m3 <= 0) throw new Error("Density must be positive.");
  return volume_m3 * density_kg_m3;
}

export function calculateHeatUpEnergy(
  mass_kg: number,
  current_temp_c: number,
  target_temp_c: number,
  specific_heat_j_per_kgc: number = 4186.0
): { joules: number; kwh: number; delta_t_c: number } {
  if (current_temp_c == null) throw new Error("Current water temperature is required.");
  if (target_temp_c == null) throw new Error("Target water temperature is required.");
  if (current_temp_c < MIN_WATER_TEMP_C || current_temp_c > MAX_WATER_TEMP_C) throw new Error("Current water temp out of bounds.");
  if (target_temp_c < MIN_WATER_TEMP_C || target_temp_c > MAX_WATER_TEMP_C) throw new Error("Target water temp out of bounds.");
  if (mass_kg <= 0) throw new Error("Water mass must be positive.");
  
  const delta_t = target_temp_c - current_temp_c;
  if (delta_t <= 0) {
    return { joules: 0.0, kwh: 0.0, delta_t_c: delta_t };
  }
  const joules = mass_kg * specific_heat_j_per_kgc * delta_t;
  const kwh = joules / 3600000.0;
  return { joules, kwh, delta_t_c: delta_t };
}

export function selectHeatPump(required_capacity_btu: number, catalog: any[], price_required: boolean = true): any {
  if (!catalog || catalog.length === 0) throw new Error("Heat pump catalog is empty.");
  const usable = [];
  for (const product of catalog) {
    const capStr = product["ahri_capacity_btu_high"];
    const priceStr = product["price_usd"];
    if (capStr == null || String(capStr).trim().toUpperCase() === "DATA_NOT_AVAILABLE") continue;
    const capacity = parseFloat(capStr);
    if (price_required) {
      if (priceStr == null || String(priceStr).trim().toUpperCase() === "DATA_NOT_AVAILABLE" || String(priceStr) === "") continue;
    }
    usable.push([capacity, product]);
  }
  if (usable.length === 0) throw new Error("No products in the catalog have complete capacity/price data.");
  usable.sort((a, b) => (a[0] as number) - (b[0] as number));
  for (const [capacity, product] of usable) {
    if ((capacity as number) >= required_capacity_btu) {
      return product;
    }
  }
  const bestAvailable = usable[usable.length - 1][1];
  const err: any = new Error(`No catalog heat pump has enough AHRI-rated capacity.`);
  err.bestAvailable = bestAvailable;
  throw err;
}

export function interpolateCop(
  air_temp_f: number,
  cop_high: number,
  air_temp_high_f: number,
  cop_low: number,
  air_temp_low_f: number
): number {
  if (air_temp_high_f === air_temp_low_f) throw new Error("High and low test temperatures cannot be equal.");
  const sorted = [air_temp_low_f, air_temp_high_f].sort((a, b) => a - b);
  const lower_t = sorted[0];
  const higher_t = sorted[1];
  if (air_temp_f <= lower_t) {
    return air_temp_low_f === lower_t ? cop_low : cop_high;
  }
  if (air_temp_f >= higher_t) {
    return air_temp_high_f === higher_t ? cop_high : cop_low;
  }
  const fraction = (air_temp_f - air_temp_low_f) / (air_temp_high_f - air_temp_low_f);
  return cop_low + fraction * (cop_high - cop_low);
}

export function calculateHeatPumpConsumption(heat_demand_kwh: number, cop: number): number {
  if (cop <= 0) throw new Error("COP must be positive.");
  if (heat_demand_kwh < 0) throw new Error("Heat demand cannot be negative.");
  return heat_demand_kwh / cop;
}

export function calculateHeatPumpCost(consumption_kwh: number, electricity_price_per_kwh: number): number {
  if (consumption_kwh < 0) throw new Error("Consumption cannot be negative.");
  if (electricity_price_per_kwh < 0) throw new Error("Electricity price cannot be negative.");
  return consumption_kwh * electricity_price_per_kwh;
}

export function calculateBaselineCost(
  existing_system_type: string,
  heat_demand_kwh: number,
  existing_efficiency: number,
  fuel_price: number,
  fuel_unit: string = "USD_per_kWh"
): number {
  existing_system_type = existing_system_type.toLowerCase().trim();
  const valid_types = ["none", "electric_resistance", "gas", "oil", "solar", "existing_heat_pump"];
  if (!valid_types.includes(existing_system_type)) {
    throw new Error(`Unknown existing_system_type '${existing_system_type}'.`);
  }
  if (existing_system_type === "none" || existing_system_type === "solar") return 0.0;
  if (existing_efficiency == null || existing_efficiency <= 0) throw new Error("existing_efficiency must be positive.");
  if (fuel_price == null || fuel_price < 0) throw new Error("fuel_price cannot be negative.");
  if (heat_demand_kwh < 0) throw new Error("heat_demand_kwh cannot be negative.");
  
  const fuel_energy_required_kwh = heat_demand_kwh / existing_efficiency;
  
  if (fuel_unit === "USD_per_kWh") {
    return fuel_energy_required_kwh * fuel_price;
  } else if (fuel_unit === "USD_per_therm") {
    const fuel_energy_required_therms = fuel_energy_required_kwh / THERM_TO_KWH;
    return fuel_energy_required_therms * fuel_price;
  } else {
    throw new Error("Unsupported fuel_unit.");
  }
}

export function calculateAnnualSavings(baseline_cost: number, heat_pump_cost: number): { annual_savings: number; is_new_cost: boolean; is_negative: boolean } {
  const is_new_cost = baseline_cost === 0.0;
  const annual_savings = baseline_cost - heat_pump_cost;
  return {
    annual_savings,
    is_new_cost,
    is_negative: annual_savings < 0
  };
}

export function calculatePayback(net_investment: number, annual_savings: number): number {
  if (net_investment < 0) throw new Error("net_investment cannot be negative.");
  if (annual_savings < MIN_MEANINGFUL_SAVINGS_USD) return Infinity;
  return net_investment / annual_savings;
}

export function calculateRoi(net_investment: number, annual_savings: number, years: number = 5): number {
  if (net_investment <= 0) throw new Error("net_investment must be positive.");
  if (years <= 0) throw new Error("years must be positive.");
  const total_savings = annual_savings * years;
  const roi_fraction = (total_savings - net_investment) / net_investment;
  return roi_fraction * 100.0;
}

export function calculateAnnualHeatDemand(
  pool_type: string,
  surface_area_m2: number,
  target_temp_c: number,
  monthly_avg_air_temp_c: Record<string, number>,
  operating_hours_per_day: number,
  operating_days_per_week: number,
  relative_humidity_pct: number,
  wind_speed_mps: number,
  has_cover: boolean,
  cover_reduction_factor: number | null
): { monthly_breakdown: Record<string, any>; annual_kwh: number; peak_kw: number } {
  if (operating_hours_per_day <= 0 || operating_hours_per_day > 24) throw new Error("operating_hours_per_day must be in (0, 24].");
  if (operating_days_per_week <= 0 || operating_days_per_week > 7) throw new Error("operating_days_per_week must be in (0, 7].");
  if (Object.keys(monthly_avg_air_temp_c).length === 0) throw new Error("At least one operating month is required.");

  const hours_per_month = operating_hours_per_day * operating_days_per_week * WEEKS_PER_MONTH;
  const monthly_breakdown: Record<string, any> = {};
  let peak_kw = 0.0;
  let annual_kwh = 0.0;

  for (const [month, air_temp_c] of Object.entries(monthly_avg_air_temp_c)) {
    const loss = calculateTotalHeatLoss(
      pool_type, target_temp_c, air_temp_c, relative_humidity_pct, wind_speed_mps,
      surface_area_m2, has_cover, cover_reduction_factor
    );
    const total_kw = Math.max(loss.total_kw, 0.0);
    const month_kwh = total_kw * hours_per_month;
    
    monthly_breakdown[month] = {
      air_temp_c,
      evaporation_kw: loss.evaporation_kw,
      convection_kw: loss.convection_kw,
      radiation_kw: loss.radiation_kw,
      total_kw,
      hours: hours_per_month,
      kwh: month_kwh
    };
    peak_kw = Math.max(peak_kw, total_kw);
    annual_kwh += month_kwh;
  }
  return { monthly_breakdown, annual_kwh, peak_kw };
}

export function calculateRoiScenario(inputs: any, catalog: any[], prices: any[]): any {
  const warnings: string[] = [];
  const area_m2 = calculatePoolSurfaceArea(inputs.length_m, inputs.width_m);
  const volume_m3 = calculatePoolVolume(inputs.length_m, inputs.width_m, inputs.avg_depth_m);
  const mass_kg = calculateWaterMass(volume_m3);
  
  const heat_up = calculateHeatUpEnergy(mass_kg, inputs.current_water_temp_c, inputs.target_water_temp_c);
  
  const demand = calculateAnnualHeatDemand(
    inputs.pool_type, area_m2, inputs.target_water_temp_c, inputs.monthly_avg_air_temp_c,
    inputs.operating_hours_per_day, inputs.operating_days_per_week, inputs.relative_humidity_pct,
    inputs.wind_speed_mps, inputs.has_cover || false, inputs.cover_reduction_factor ?? null
  );
  
  const total_thermal_demand_kwh = demand.annual_kwh + heat_up.kwh;
  const required_capacity_btu = demand.peak_kw * KW_TO_BTU_PER_HOUR * 1.20;
  
  let selected_pump: any = null;
  try {
    selected_pump = selectHeatPump(required_capacity_btu, catalog);
  } catch (e: any) {
    if (e.bestAvailable) {
      warnings.push(e.message);
      selected_pump = e.bestAvailable;
    } else {
      throw e;
    }
  }

  const cop_high = parseFloat(selected_pump.ahri_cop_high);
  const cop_low = parseFloat(selected_pump.ahri_cop_low);
  const air_temp_high_f = parseFloat(selected_pump.test_air_temp_high_f);
  const air_temp_low_f = parseFloat(selected_pump.test_air_temp_low_f);

  let total_consumption_kwh = 0.0;
  const monthly_cop: Record<string, number> = {};
  
  for (const [month, data] of Object.entries(demand.monthly_breakdown) as [string, any][]) {
    const air_temp_f = celsiusToFahrenheit(data.air_temp_c);
    const cop = interpolateCop(air_temp_f, cop_high, air_temp_high_f, cop_low, air_temp_low_f);
    monthly_cop[month] = cop;
    total_consumption_kwh += calculateHeatPumpConsumption(data.kwh, cop);
  }

  const months = Object.keys(demand.monthly_breakdown);
  if (months.length > 0) {
    const first_month = months[0];
    const heat_up_cop = monthly_cop[first_month];
    total_consumption_kwh += calculateHeatPumpConsumption(heat_up.kwh, heat_up_cop);
  }
  
  let electricity_price = inputs.electricity_price_per_kwh;
  if (electricity_price == null) {
    const region = inputs.region || "US_National";
    let p = prices.find(r => r.region === region && r.fuel_type === "electricity");
    if (!p) p = prices.find(r => r.region === "US_National" && r.fuel_type === "electricity");
    if (!p) throw new Error("No price data found.");
    electricity_price = parseFloat(p.price);
  }
  
  const hp_cost = calculateHeatPumpCost(total_consumption_kwh, electricity_price);
  const existing_system_type = inputs.existing_system_type;
  let baseline_cost = 0;
  
  if (existing_system_type === "gas") {
    let gas_price = inputs.gas_price_per_therm;
    if (gas_price == null) {
      const region = inputs.region || "US_National";
      let p = prices.find(r => r.region === region && r.fuel_type === "natural_gas");
      if (!p) p = prices.find(r => r.region === "US_National" && r.fuel_type === "natural_gas");
      gas_price = parseFloat(p!.price);
    }
    baseline_cost = calculateBaselineCost(
      existing_system_type, total_thermal_demand_kwh, inputs.existing_efficiency ?? 0.80, gas_price, "USD_per_therm"
    );
  } else {
    baseline_cost = calculateBaselineCost(
      existing_system_type, total_thermal_demand_kwh, inputs.existing_efficiency ?? 1.0, electricity_price, "USD_per_kWh"
    );
  }
  
  const savings = calculateAnnualSavings(baseline_cost, hp_cost);
  if (savings.is_new_cost) {
    warnings.push("No existing heating system was present - there is no baseline cost to save against. This is a NEW comfort expense, not an investment with a payback.");
  }
  if (savings.is_negative) {
    warnings.push("The heat pump's estimated running cost EXCEEDS the existing system's cost for this scenario. Payback/ROI will reflect a poor financial fit.");
  }
  
  let net_investment_raw = inputs.heat_pump_price_usd;
  if (net_investment_raw == null) {
    net_investment_raw = selected_pump.price_usd;
  }
  if (net_investment_raw == null || String(net_investment_raw) === "DATA_NOT_AVAILABLE") {
    throw new Error("No price available for selected product and no heat_pump_price_usd was provided.");
  }
  const equipment_price = parseFloat(net_investment_raw);
  const installation_cost = parseFloat(inputs.installation_cost_usd ?? 0.0);
  const grant = parseFloat(inputs.rebate_usd ?? 0.0);
  let net_investment = equipment_price + installation_cost - grant;
  if (net_investment < 0) {
    warnings.push("The grant exceeds the total installed cost; net investment was set to $0.");
    net_investment = 0.0;
  }
  
  const payback_years = calculatePayback(net_investment, savings.annual_savings);
  let roi_5yr_pct = null;
  if (net_investment > 0) {
    roi_5yr_pct = calculateRoi(net_investment, savings.annual_savings, 5);
  }
  
  return {
    pool: { surface_area_m2: area_m2, volume_m3: volume_m3, water_mass_kg: mass_kg },
    heat_up_energy_kwh: heat_up.kwh,
    continuous_demand: demand,
    total_thermal_demand_kwh: total_thermal_demand_kwh,
    selected_heat_pump: selected_pump,
    required_capacity_btu,
    monthly_cop,
    total_electricity_consumption_kwh: total_consumption_kwh,
    electricity_price_per_kwh: electricity_price,
    heat_pump_annual_cost: hp_cost,
    baseline_annual_cost: baseline_cost,
    annual_savings: savings.annual_savings,
    net_investment,
    investment_breakdown: {
      equipment_usd: equipment_price,
      installation_usd: installation_cost,
      grant_usd: grant,
      net_usd: net_investment
    },
    payback_years,
    roi_5yr_pct,
    warnings
  };
}
