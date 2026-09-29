"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIN_MEANINGFUL_SAVINGS_USD = exports.THERM_TO_KWH = exports.WEEKS_PER_MONTH = exports.KW_TO_BTU_PER_HOUR = exports.COVER_REDUCTION_MAX = exports.COVER_REDUCTION_MIN = exports.MEASURED_CORRECTION_HIGH_WIND = exports.MEASURED_CORRECTION_LOW_WIND = exports.BTU_TO_KWH = exports.MPS_TO_MPH = exports.M2_TO_FT2 = exports.PSIA_TO_INHG = exports.STEFAN_BOLTZMANN_IMPERIAL = exports.CONV_COEFF_B = exports.CONV_COEFF_A = exports.EVAP_COEFF_B = exports.EVAP_COEFF_A = exports.MAX_WATER_TEMP_C = exports.MIN_WATER_TEMP_C = exports.MAX_DEPTH_M = exports.MIN_DEPTH_M = exports.MAX_DIMENSION_M = exports.MIN_DIMENSION_M = void 0;
exports.celsiusToFahrenheit = celsiusToFahrenheit;
exports.mpsToMph = mpsToMph;
exports.m2ToFt2 = m2ToFt2;
exports.saturationPressurePsia = saturationPressurePsia;
exports.calculateEvaporationLoss = calculateEvaporationLoss;
exports.calculateConvectionLoss = calculateConvectionLoss;
exports.calculateRadiationLoss = calculateRadiationLoss;
exports.calculateTotalHeatLoss = calculateTotalHeatLoss;
exports.calculatePoolSurfaceArea = calculatePoolSurfaceArea;
exports.calculatePoolVolume = calculatePoolVolume;
exports.calculateWaterMass = calculateWaterMass;
exports.calculateHeatUpEnergy = calculateHeatUpEnergy;
exports.selectHeatPump = selectHeatPump;
exports.interpolateCop = interpolateCop;
exports.calculateHeatPumpConsumption = calculateHeatPumpConsumption;
exports.calculateHeatPumpCost = calculateHeatPumpCost;
exports.calculateBaselineCost = calculateBaselineCost;
exports.calculateAnnualSavings = calculateAnnualSavings;
exports.calculatePayback = calculatePayback;
exports.calculateRoi = calculateRoi;
exports.calculateAnnualHeatDemand = calculateAnnualHeatDemand;
exports.calculateRoiScenario = calculateRoiScenario;
exports.MIN_DIMENSION_M = 0.5;
exports.MAX_DIMENSION_M = 100.0;
exports.MIN_DEPTH_M = 0.2;
exports.MAX_DEPTH_M = 6.0;
exports.MIN_WATER_TEMP_C = 0.0;
exports.MAX_WATER_TEMP_C = 40.0;
exports.EVAP_COEFF_A = 68.3;
exports.EVAP_COEFF_B = 32.0;
exports.CONV_COEFF_A = 0.5;
exports.CONV_COEFF_B = 0.235;
exports.STEFAN_BOLTZMANN_IMPERIAL = 1.714e-9;
exports.PSIA_TO_INHG = 2.036;
exports.M2_TO_FT2 = 10.7639;
exports.MPS_TO_MPH = 2.23694;
exports.BTU_TO_KWH = 0.00029307107;
exports.MEASURED_CORRECTION_LOW_WIND = 0.72;
exports.MEASURED_CORRECTION_HIGH_WIND = 0.84;
exports.COVER_REDUCTION_MIN = 0.50;
exports.COVER_REDUCTION_MAX = 0.70;
exports.KW_TO_BTU_PER_HOUR = 3412.14;
exports.WEEKS_PER_MONTH = 4.345;
exports.THERM_TO_KWH = 29.3001;
exports.MIN_MEANINGFUL_SAVINGS_USD = 0.01;
function celsiusToFahrenheit(t_c) {
    return t_c * 9.0 / 5.0 + 32.0;
}
function mpsToMph(v_mps) {
    return v_mps * exports.MPS_TO_MPH;
}
function m2ToFt2(area_m2) {
    return area_m2 * exports.M2_TO_FT2;
}
function saturationPressurePsia(temp_rankine) {
    var T = temp_rankine;
    var ln_pws = (-10440.397 / T
        - 11.29465
        - 0.02702355 * T
        + 1.289036e-5 * Math.pow(T, 2)
        - 2.478068e-9 * Math.pow(T, 3)
        + 6.5459673 * Math.log(T));
    return Math.exp(ln_pws);
}
function calculateEvaporationLoss(water_temp_c, air_temp_c, relative_humidity_pct, wind_speed_mps, surface_area_m2, activity_factor, apply_measured_correction) {
    if (activity_factor === void 0) { activity_factor = 0.65; }
    if (apply_measured_correction === void 0) { apply_measured_correction = true; }
    if (relative_humidity_pct < 0 || relative_humidity_pct > 100) {
        throw new Error("Relative humidity must be 0-100 (got ".concat(relative_humidity_pct, ")."));
    }
    if (wind_speed_mps < 0) {
        throw new Error("Wind speed cannot be negative (got ".concat(wind_speed_mps, ")."));
    }
    if (surface_area_m2 <= 0) {
        throw new Error("Surface area must be positive (got ".concat(surface_area_m2, ")."));
    }
    var water_temp_f = celsiusToFahrenheit(water_temp_c);
    var air_temp_f = celsiusToFahrenheit(air_temp_c);
    var wind_mph = mpsToMph(wind_speed_mps);
    var tw_rankine = water_temp_f + 459.67;
    var ta_rankine = air_temp_f + 459.67;
    var pws_water_psia = saturationPressurePsia(tw_rankine);
    var pws_air_psia = saturationPressurePsia(ta_rankine);
    var pw_dewpoint_psia = (relative_humidity_pct / 100.0) * pws_air_psia;
    var ppw_inhg = pws_water_psia * exports.PSIA_TO_INHG;
    var pdp_inhg = pw_dewpoint_psia * exports.PSIA_TO_INHG;
    var q_evap_btu_per_ft2h = (exports.EVAP_COEFF_A + exports.EVAP_COEFF_B * wind_mph) * (ppw_inhg - pdp_inhg) * activity_factor;
    q_evap_btu_per_ft2h = Math.max(q_evap_btu_per_ft2h, 0.0);
    if (apply_measured_correction) {
        var wind_mps_clamped = Math.min(Math.max(wind_speed_mps, 0.0), 2.2);
        var correction = exports.MEASURED_CORRECTION_LOW_WIND + ((exports.MEASURED_CORRECTION_HIGH_WIND - exports.MEASURED_CORRECTION_LOW_WIND) * (wind_mps_clamped / 2.2));
        q_evap_btu_per_ft2h *= correction;
    }
    var surface_area_ft2 = m2ToFt2(surface_area_m2);
    var q_evap_btu_h = q_evap_btu_per_ft2h * surface_area_ft2;
    return q_evap_btu_h * exports.BTU_TO_KWH;
}
function calculateConvectionLoss(water_temp_c, air_temp_c, wind_speed_mps, surface_area_m2) {
    if (surface_area_m2 <= 0) {
        throw new Error("Surface area must be positive (got ".concat(surface_area_m2, ")."));
    }
    var water_temp_f = celsiusToFahrenheit(water_temp_c);
    var air_temp_f = celsiusToFahrenheit(air_temp_c);
    var wind_mph = mpsToMph(wind_speed_mps);
    var hc = exports.CONV_COEFF_A + exports.CONV_COEFF_B * wind_mph;
    var q_conv_btu_per_ft2h = hc * (water_temp_f - air_temp_f);
    var surface_area_ft2 = m2ToFt2(surface_area_m2);
    var q_conv_btu_h = q_conv_btu_per_ft2h * surface_area_ft2;
    return q_conv_btu_h * exports.BTU_TO_KWH;
}
function calculateRadiationLoss(water_temp_c, sky_temp_c, surface_area_m2) {
    if (surface_area_m2 <= 0) {
        throw new Error("Surface area must be positive (got ".concat(surface_area_m2, ")."));
    }
    var water_temp_f = celsiusToFahrenheit(water_temp_c);
    var sky_temp_f = celsiusToFahrenheit(sky_temp_c);
    var tw_rankine = water_temp_f + 459.67;
    var hrad = 4.0 * exports.STEFAN_BOLTZMANN_IMPERIAL * Math.pow(tw_rankine, 3);
    var q_rad_btu_per_ft2h = hrad * (water_temp_f - sky_temp_f);
    var surface_area_ft2 = m2ToFt2(surface_area_m2);
    var q_rad_btu_h = q_rad_btu_per_ft2h * surface_area_ft2;
    return q_rad_btu_h * exports.BTU_TO_KWH;
}
function calculateTotalHeatLoss(pool_type, water_temp_c, air_temp_c, relative_humidity_pct, wind_speed_mps, surface_area_m2, has_cover, cover_reduction_factor, activity_factor) {
    if (has_cover === void 0) { has_cover = false; }
    if (cover_reduction_factor === void 0) { cover_reduction_factor = null; }
    if (activity_factor === void 0) { activity_factor = 0.65; }
    pool_type = pool_type.toLowerCase().trim();
    if (pool_type !== 'indoor' && pool_type !== 'outdoor') {
        throw new Error("pool_type must be 'indoor' or 'outdoor' (got '".concat(pool_type, "')."));
    }
    var evap_kw = calculateEvaporationLoss(water_temp_c, air_temp_c, relative_humidity_pct, wind_speed_mps, surface_area_m2, activity_factor, true);
    if (has_cover) {
        var factor = cover_reduction_factor !== null ? cover_reduction_factor : ((exports.COVER_REDUCTION_MIN + exports.COVER_REDUCTION_MAX) / 2.0);
        if (factor < 0.0 || factor > 1.0) {
            throw new Error("cover_reduction_factor must be between 0 and 1 (got ".concat(factor, ")."));
        }
        evap_kw *= (1.0 - factor);
    }
    var conv_kw = calculateConvectionLoss(water_temp_c, air_temp_c, wind_speed_mps, surface_area_m2);
    var rad_kw = 0.0;
    if (pool_type === 'outdoor') {
        rad_kw = calculateRadiationLoss(water_temp_c, air_temp_c, surface_area_m2);
    }
    var total_kw = evap_kw + conv_kw + rad_kw;
    return {
        evaporation_kw: evap_kw,
        convection_kw: conv_kw,
        radiation_kw: rad_kw,
        total_kw: total_kw
    };
}
function calculatePoolSurfaceArea(length_m, width_m) {
    if (length_m == null || width_m == null)
        throw new Error("Pool length and width are required.");
    if (length_m <= 0 || width_m <= 0)
        throw new Error("Pool length and width must be positive numbers.");
    if (length_m < exports.MIN_DIMENSION_M || length_m > exports.MAX_DIMENSION_M)
        throw new Error("Length out of bounds.");
    if (width_m < exports.MIN_DIMENSION_M || width_m > exports.MAX_DIMENSION_M)
        throw new Error("Width out of bounds.");
    return length_m * width_m;
}
function calculatePoolVolume(length_m, width_m, avg_depth_m) {
    var area = calculatePoolSurfaceArea(length_m, width_m);
    if (avg_depth_m == null || avg_depth_m <= 0)
        throw new Error("Depth must be positive.");
    if (avg_depth_m < exports.MIN_DEPTH_M || avg_depth_m > exports.MAX_DEPTH_M)
        throw new Error("Depth out of bounds.");
    return area * avg_depth_m;
}
function calculateWaterMass(volume_m3, density_kg_m3) {
    if (density_kg_m3 === void 0) { density_kg_m3 = 1000.0; }
    if (volume_m3 <= 0)
        throw new Error("Volume must be positive.");
    if (density_kg_m3 <= 0)
        throw new Error("Density must be positive.");
    return volume_m3 * density_kg_m3;
}
function calculateHeatUpEnergy(mass_kg, current_temp_c, target_temp_c, specific_heat_j_per_kgc) {
    if (specific_heat_j_per_kgc === void 0) { specific_heat_j_per_kgc = 4186.0; }
    if (current_temp_c == null)
        throw new Error("Current water temperature is required.");
    if (target_temp_c == null)
        throw new Error("Target water temperature is required.");
    if (current_temp_c < exports.MIN_WATER_TEMP_C || current_temp_c > exports.MAX_WATER_TEMP_C)
        throw new Error("Current water temp out of bounds.");
    if (target_temp_c < exports.MIN_WATER_TEMP_C || target_temp_c > exports.MAX_WATER_TEMP_C)
        throw new Error("Target water temp out of bounds.");
    if (mass_kg <= 0)
        throw new Error("Water mass must be positive.");
    var delta_t = target_temp_c - current_temp_c;
    if (delta_t <= 0) {
        return { joules: 0.0, kwh: 0.0, delta_t_c: delta_t };
    }
    var joules = mass_kg * specific_heat_j_per_kgc * delta_t;
    var kwh = joules / 3600000.0;
    return { joules: joules, kwh: kwh, delta_t_c: delta_t };
}
function selectHeatPump(required_capacity_btu, catalog, price_required) {
    if (price_required === void 0) { price_required = true; }
    if (!catalog || catalog.length === 0)
        throw new Error("Heat pump catalog is empty.");
    var usable = [];
    for (var _i = 0, catalog_1 = catalog; _i < catalog_1.length; _i++) {
        var product = catalog_1[_i];
        var capStr = product["ahri_capacity_btu_high"];
        var priceStr = product["price_usd"];
        if (capStr == null || String(capStr).trim().toUpperCase() === "DATA_NOT_AVAILABLE")
            continue;
        var capacity = parseFloat(capStr);
        if (price_required) {
            if (priceStr == null || String(priceStr).trim().toUpperCase() === "DATA_NOT_AVAILABLE" || String(priceStr) === "")
                continue;
        }
        usable.push([capacity, product]);
    }
    if (usable.length === 0)
        throw new Error("No products in the catalog have complete capacity/price data.");
    usable.sort(function (a, b) { return a[0] - b[0]; });
    for (var _a = 0, usable_1 = usable; _a < usable_1.length; _a++) {
        var _b = usable_1[_a], capacity = _b[0], product = _b[1];
        if (capacity >= required_capacity_btu) {
            return product;
        }
    }
    var bestAvailable = usable[usable.length - 1][1];
    var err = new Error("No catalog heat pump has enough AHRI-rated capacity.");
    err.bestAvailable = bestAvailable;
    throw err;
}
function interpolateCop(air_temp_f, cop_high, air_temp_high_f, cop_low, air_temp_low_f) {
    if (air_temp_high_f === air_temp_low_f)
        throw new Error("High and low test temperatures cannot be equal.");
    var sorted = [air_temp_low_f, air_temp_high_f].sort(function (a, b) { return a - b; });
    var lower_t = sorted[0];
    var higher_t = sorted[1];
    if (air_temp_f <= lower_t) {
        return air_temp_low_f === lower_t ? cop_low : cop_high;
    }
    if (air_temp_f >= higher_t) {
        return air_temp_high_f === higher_t ? cop_high : cop_low;
    }
    var fraction = (air_temp_f - air_temp_low_f) / (air_temp_high_f - air_temp_low_f);
    return cop_low + fraction * (cop_high - cop_low);
}
function calculateHeatPumpConsumption(heat_demand_kwh, cop) {
    if (cop <= 0)
        throw new Error("COP must be positive.");
    if (heat_demand_kwh < 0)
        throw new Error("Heat demand cannot be negative.");
    return heat_demand_kwh / cop;
}
function calculateHeatPumpCost(consumption_kwh, electricity_price_per_kwh) {
    if (consumption_kwh < 0)
        throw new Error("Consumption cannot be negative.");
    if (electricity_price_per_kwh < 0)
        throw new Error("Electricity price cannot be negative.");
    return consumption_kwh * electricity_price_per_kwh;
}
function calculateBaselineCost(existing_system_type, heat_demand_kwh, existing_efficiency, fuel_price, fuel_unit) {
    if (fuel_unit === void 0) { fuel_unit = "USD_per_kWh"; }
    existing_system_type = existing_system_type.toLowerCase().trim();
    var valid_types = ["none", "electric_resistance", "gas", "oil", "solar", "existing_heat_pump"];
    if (!valid_types.includes(existing_system_type)) {
        throw new Error("Unknown existing_system_type '".concat(existing_system_type, "'."));
    }
    if (existing_system_type === "none" || existing_system_type === "solar")
        return 0.0;
    if (existing_efficiency == null || existing_efficiency <= 0)
        throw new Error("existing_efficiency must be positive.");
    if (fuel_price == null || fuel_price < 0)
        throw new Error("fuel_price cannot be negative.");
    if (heat_demand_kwh < 0)
        throw new Error("heat_demand_kwh cannot be negative.");
    var fuel_energy_required_kwh = heat_demand_kwh / existing_efficiency;
    if (fuel_unit === "USD_per_kWh") {
        return fuel_energy_required_kwh * fuel_price;
    }
    else if (fuel_unit === "USD_per_therm") {
        var fuel_energy_required_therms = fuel_energy_required_kwh / exports.THERM_TO_KWH;
        return fuel_energy_required_therms * fuel_price;
    }
    else {
        throw new Error("Unsupported fuel_unit.");
    }
}
function calculateAnnualSavings(baseline_cost, heat_pump_cost) {
    var is_new_cost = baseline_cost === 0.0;
    var annual_savings = baseline_cost - heat_pump_cost;
    return {
        annual_savings: annual_savings,
        is_new_cost: is_new_cost,
        is_negative: annual_savings < 0
    };
}
function calculatePayback(net_investment, annual_savings) {
    if (net_investment < 0)
        throw new Error("net_investment cannot be negative.");
    if (annual_savings < exports.MIN_MEANINGFUL_SAVINGS_USD)
        return Infinity;
    return net_investment / annual_savings;
}
function calculateRoi(net_investment, annual_savings, years) {
    if (years === void 0) { years = 5; }
    if (net_investment <= 0)
        throw new Error("net_investment must be positive.");
    if (years <= 0)
        throw new Error("years must be positive.");
    var total_savings = annual_savings * years;
    var roi_fraction = (total_savings - net_investment) / net_investment;
    return roi_fraction * 100.0;
}
function calculateAnnualHeatDemand(pool_type, surface_area_m2, target_temp_c, monthly_avg_air_temp_c, operating_hours_per_day, operating_days_per_week, relative_humidity_pct, wind_speed_mps, has_cover, cover_reduction_factor) {
    if (operating_hours_per_day <= 0 || operating_hours_per_day > 24)
        throw new Error("operating_hours_per_day must be in (0, 24].");
    if (operating_days_per_week <= 0 || operating_days_per_week > 7)
        throw new Error("operating_days_per_week must be in (0, 7].");
    if (Object.keys(monthly_avg_air_temp_c).length === 0)
        throw new Error("At least one operating month is required.");
    var hours_per_month = operating_hours_per_day * operating_days_per_week * exports.WEEKS_PER_MONTH;
    var monthly_breakdown = {};
    var peak_kw = 0.0;
    var annual_kwh = 0.0;
    for (var _i = 0, _a = Object.entries(monthly_avg_air_temp_c); _i < _a.length; _i++) {
        var _b = _a[_i], month = _b[0], air_temp_c = _b[1];
        var loss = calculateTotalHeatLoss(pool_type, target_temp_c, air_temp_c, relative_humidity_pct, wind_speed_mps, surface_area_m2, has_cover, cover_reduction_factor);
        var total_kw = Math.max(loss.total_kw, 0.0);
        var month_kwh = total_kw * hours_per_month;
        monthly_breakdown[month] = {
            air_temp_c: air_temp_c,
            evaporation_kw: loss.evaporation_kw,
            convection_kw: loss.convection_kw,
            radiation_kw: loss.radiation_kw,
            total_kw: total_kw,
            hours: hours_per_month,
            kwh: month_kwh
        };
        peak_kw = Math.max(peak_kw, total_kw);
        annual_kwh += month_kwh;
    }
    return { monthly_breakdown: monthly_breakdown, annual_kwh: annual_kwh, peak_kw: peak_kw };
}
function calculateRoiScenario(inputs, catalog, prices) {
    var _a, _b, _c, _d, _e;
    var warnings = [];
    var area_m2 = calculatePoolSurfaceArea(inputs.length_m, inputs.width_m);
    var volume_m3 = calculatePoolVolume(inputs.length_m, inputs.width_m, inputs.avg_depth_m);
    var mass_kg = calculateWaterMass(volume_m3);
    var heat_up = calculateHeatUpEnergy(mass_kg, inputs.current_water_temp_c, inputs.target_water_temp_c);
    var demand = calculateAnnualHeatDemand(inputs.pool_type, area_m2, inputs.target_water_temp_c, inputs.monthly_avg_air_temp_c, inputs.operating_hours_per_day, inputs.operating_days_per_week, inputs.relative_humidity_pct, inputs.wind_speed_mps, inputs.has_cover || false, (_a = inputs.cover_reduction_factor) !== null && _a !== void 0 ? _a : null);
    var total_thermal_demand_kwh = demand.annual_kwh + heat_up.kwh;
    var required_capacity_btu = demand.peak_kw * exports.KW_TO_BTU_PER_HOUR * 1.20;
    var selected_pump = null;
    try {
        selected_pump = selectHeatPump(required_capacity_btu, catalog);
    }
    catch (e) {
        if (e.bestAvailable) {
            warnings.push(e.message);
            selected_pump = e.bestAvailable;
        }
        else {
            throw e;
        }
    }
    var cop_high = parseFloat(selected_pump.ahri_cop_high);
    var cop_low = parseFloat(selected_pump.ahri_cop_low);
    var air_temp_high_f = parseFloat(selected_pump.test_air_temp_high_f);
    var air_temp_low_f = parseFloat(selected_pump.test_air_temp_low_f);
    var total_consumption_kwh = 0.0;
    var monthly_cop = {};
    for (var _i = 0, _f = Object.entries(demand.monthly_breakdown); _i < _f.length; _i++) {
        var _g = _f[_i], month = _g[0], data = _g[1];
        var air_temp_f = celsiusToFahrenheit(data.air_temp_c);
        var cop = interpolateCop(air_temp_f, cop_high, air_temp_high_f, cop_low, air_temp_low_f);
        monthly_cop[month] = cop;
        total_consumption_kwh += calculateHeatPumpConsumption(data.kwh, cop);
    }
    var months = Object.keys(demand.monthly_breakdown);
    if (months.length > 0) {
        var first_month = months[0];
        var heat_up_cop = monthly_cop[first_month];
        total_consumption_kwh += calculateHeatPumpConsumption(heat_up.kwh, heat_up_cop);
    }
    var electricity_price = inputs.electricity_price_per_kwh;
    if (electricity_price == null) {
        var region_1 = inputs.region || "US_National";
        var p = prices.find(function (r) { return r.region === region_1 && r.fuel_type === "electricity"; });
        if (!p)
            p = prices.find(function (r) { return r.region === "US_National" && r.fuel_type === "electricity"; });
        if (!p)
            throw new Error("No price data found.");
        electricity_price = parseFloat(p.price);
    }
    var hp_cost = calculateHeatPumpCost(total_consumption_kwh, electricity_price);
    var existing_system_type = inputs.existing_system_type;
    var baseline_cost = 0;
    if (existing_system_type === "gas") {
        var gas_price = inputs.gas_price_per_therm;
        if (gas_price == null) {
            var region_2 = inputs.region || "US_National";
            var p = prices.find(function (r) { return r.region === region_2 && r.fuel_type === "natural_gas"; });
            if (!p)
                p = prices.find(function (r) { return r.region === "US_National" && r.fuel_type === "natural_gas"; });
            gas_price = parseFloat(p.price);
        }
        baseline_cost = calculateBaselineCost(existing_system_type, total_thermal_demand_kwh, (_b = inputs.existing_efficiency) !== null && _b !== void 0 ? _b : 0.80, gas_price, "USD_per_therm");
    }
    else {
        baseline_cost = calculateBaselineCost(existing_system_type, total_thermal_demand_kwh, (_c = inputs.existing_efficiency) !== null && _c !== void 0 ? _c : 1.0, electricity_price, "USD_per_kWh");
    }
    var savings = calculateAnnualSavings(baseline_cost, hp_cost);
    if (savings.is_new_cost) {
        warnings.push("No existing heating system was present - there is no baseline cost to save against. This is a NEW comfort expense, not an investment with a payback.");
    }
    if (savings.is_negative) {
        warnings.push("The heat pump's estimated running cost EXCEEDS the existing system's cost for this scenario. Payback/ROI will reflect a poor financial fit.");
    }
    var net_investment_raw = inputs.heat_pump_price_usd;
    if (net_investment_raw == null) {
        net_investment_raw = selected_pump.price_usd;
    }
    if (net_investment_raw == null || String(net_investment_raw) === "DATA_NOT_AVAILABLE") {
        throw new Error("No price available for selected product and no heat_pump_price_usd was provided.");
    }
    var equipment_price = parseFloat(net_investment_raw);
    var installation_cost = parseFloat((_d = inputs.installation_cost_usd) !== null && _d !== void 0 ? _d : 0.0);
    var grant = parseFloat((_e = inputs.rebate_usd) !== null && _e !== void 0 ? _e : 0.0);
    var net_investment = equipment_price + installation_cost - grant;
    if (net_investment < 0) {
        warnings.push("The grant exceeds the total installed cost; net investment was set to $0.");
        net_investment = 0.0;
    }
    var payback_years = calculatePayback(net_investment, savings.annual_savings);
    var roi_5yr_pct = null;
    if (net_investment > 0) {
        roi_5yr_pct = calculateRoi(net_investment, savings.annual_savings, 5);
    }
    return {
        pool: { surface_area_m2: area_m2, volume_m3: volume_m3, water_mass_kg: mass_kg },
        heat_up_energy_kwh: heat_up.kwh,
        continuous_demand: demand,
        total_thermal_demand_kwh: total_thermal_demand_kwh,
        selected_heat_pump: selected_pump,
        required_capacity_btu: required_capacity_btu,
        monthly_cop: monthly_cop,
        total_electricity_consumption_kwh: total_consumption_kwh,
        electricity_price_per_kwh: electricity_price,
        heat_pump_annual_cost: hp_cost,
        baseline_annual_cost: baseline_cost,
        annual_savings: savings.annual_savings,
        net_investment: net_investment,
        investment_breakdown: {
            equipment_usd: equipment_price,
            installation_usd: installation_cost,
            grant_usd: grant,
            net_usd: net_investment
        },
        payback_years: payback_years,
        roi_5yr_pct: roi_5yr_pct,
        warnings: warnings
    };
}
