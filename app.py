"""
Swimming Pool Heat Pump ROI Calculator - Streamlit App
Same equations and data as the original notebook, but with an interactive
interface so you don't have to edit code every time.

Run with:
    streamlit run app.py
"""

from __future__ import annotations

import csv
import math
import os

import pandas as pd
import streamlit as st

# ============================================================
# 0. Page setup
# ============================================================
st.set_page_config(
    page_title="Pool Heat Pump Savings Calculator",
    page_icon="🏊",
    layout="wide",
)

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

# ============================================================
# 1. Data Loading - same logic as the original notebook
# ============================================================


def _read_csv(filename: str) -> list[dict]:
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        raise FileNotFoundError(f"Required dataset not found: {path}")
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = [dict(row) for row in reader]
    if not rows:
        raise ValueError(f"Dataset '{filename}' is empty.")
    return rows


def _to_float_or_flag(value: str):
    if value is None:
        return None
    value = value.strip()
    if value.upper() == "DATA_NOT_AVAILABLE" or value == "":
        return "DATA_NOT_AVAILABLE"
    try:
        return float(value)
    except ValueError:
        return value


@st.cache_data
def load_heat_pumps(filename: str = "heat_pumps.csv") -> list[dict]:
    rows = _read_csv(filename)
    numeric_fields = {
        "ahri_capacity_btu_high", "ahri_cop_high", "ahri_capacity_btu_low", "ahri_cop_low",
        "test_water_temp_f", "test_air_temp_high_f", "test_air_temp_low_f", "test_rh_pct",
        "min_operating_air_temp_f", "price_usd",
    }
    products = []
    for row in rows:
        product = dict(row)
        for field in numeric_fields:
            if field in product:
                product[field] = _to_float_or_flag(product[field])
        products.append(product)
    return products


@st.cache_data
def load_energy_prices(filename: str = "energy_prices.csv") -> list[dict]:
    rows = _read_csv(filename)
    for row in rows:
        row["price"] = float(row["price"])
        row["year"] = int(row["year"])
    return rows


def get_energy_price(prices: list[dict], region: str, fuel_type: str) -> dict:
    for row in prices:
        if row["region"] == region and row["fuel_type"] == fuel_type:
            return row
    for row in prices:
        if row["region"] == "US_National" and row["fuel_type"] == fuel_type:
            return row
    raise ValueError(f"No price data found for fuel_type='{fuel_type}' (region='{region}' or US_National).")


# ============================================================
# 2. Pool geometry and initial heat-up energy
# ============================================================
MIN_DIMENSION_M = 0.5
MAX_DIMENSION_M = 100.0
MIN_DEPTH_M = 0.2
MAX_DEPTH_M = 6.0
MIN_WATER_TEMP_C = 0.0
MAX_WATER_TEMP_C = 40.0


class PoolInputError(ValueError):
    pass


def calculate_pool_surface_area(length_m: float, width_m: float) -> float:
    if length_m is None or width_m is None:
        raise PoolInputError("Pool length and width are required.")
    if length_m <= 0 or width_m <= 0:
        raise PoolInputError(
            f"Pool length and width must be positive numbers (got length={length_m}, width={width_m})."
        )
    if not (MIN_DIMENSION_M <= length_m <= MAX_DIMENSION_M):
        raise PoolInputError(
            f"Pool length {length_m} m is outside a realistic range ({MIN_DIMENSION_M}-{MAX_DIMENSION_M} m)."
        )
    if not (MIN_DIMENSION_M <= width_m <= MAX_DIMENSION_M):
        raise PoolInputError(
            f"Pool width {width_m} m is outside a realistic range ({MIN_DIMENSION_M}-{MAX_DIMENSION_M} m)."
        )
    return length_m * width_m


def calculate_pool_volume(length_m: float, width_m: float, avg_depth_m: float) -> float:
    area = calculate_pool_surface_area(length_m, width_m)
    if avg_depth_m is None or avg_depth_m <= 0:
        raise PoolInputError(f"Average depth must be a positive number (got {avg_depth_m}).")
    if not (MIN_DEPTH_M <= avg_depth_m <= MAX_DEPTH_M):
        raise PoolInputError(
            f"Average depth {avg_depth_m} m is outside a realistic range ({MIN_DEPTH_M}-{MAX_DEPTH_M} m)."
        )
    return area * avg_depth_m


def calculate_water_mass(volume_m3: float, density_kg_m3: float = 1000.0) -> float:
    if volume_m3 <= 0:
        raise PoolInputError(f"Volume must be positive (got {volume_m3}).")
    if density_kg_m3 <= 0:
        raise PoolInputError(f"Density must be positive (got {density_kg_m3}).")
    return volume_m3 * density_kg_m3


def _validate_temperature(value_c: float, label: str) -> None:
    if value_c is None:
        raise PoolInputError(f"{label} temperature is required.")
    if not (MIN_WATER_TEMP_C <= value_c <= MAX_WATER_TEMP_C):
        raise PoolInputError(
            f"{label} temperature {value_c} C is not physically realistic for a swimming pool "
            f"(expected {MIN_WATER_TEMP_C}-{MAX_WATER_TEMP_C} C)."
        )


def calculate_heat_up_energy(
    mass_kg: float,
    current_temp_c: float,
    target_temp_c: float,
    specific_heat_j_per_kgc: float = 4186.0,
) -> dict:
    _validate_temperature(current_temp_c, "Current water")
    _validate_temperature(target_temp_c, "Target water")

    if mass_kg <= 0:
        raise PoolInputError(f"Water mass must be positive (got {mass_kg}).")

    delta_t = target_temp_c - current_temp_c
    if delta_t <= 0:
        return {"joules": 0.0, "kwh": 0.0, "delta_t_c": delta_t}

    joules = mass_kg * specific_heat_j_per_kgc * delta_t
    kwh = joules / 3_600_000.0
    return {"joules": joules, "kwh": kwh, "delta_t_c": delta_t}


# ============================================================
# 3. Continuous heat loss model
# ============================================================
EVAP_COEFF_A = 68.3
EVAP_COEFF_B = 32.0
CONV_COEFF_A = 0.5
CONV_COEFF_B = 0.235
STEFAN_BOLTZMANN_IMPERIAL = 1.714e-9
PSIA_TO_INHG = 2.036
M2_TO_FT2 = 10.7639
MPS_TO_MPH = 2.23694
BTU_TO_KWH = 0.00029307107

MEASURED_CORRECTION_LOW_WIND = 0.72
MEASURED_CORRECTION_HIGH_WIND = 0.84

COVER_REDUCTION_MIN = 0.50
COVER_REDUCTION_MAX = 0.70


def celsius_to_fahrenheit(t_c: float) -> float:
    return t_c * 9.0 / 5.0 + 32.0


def mps_to_mph(v_mps: float) -> float:
    return v_mps * MPS_TO_MPH


def m2_to_ft2(area_m2: float) -> float:
    return area_m2 * M2_TO_FT2


def _saturation_pressure_psia(temp_rankine: float) -> float:
    T = temp_rankine
    ln_pws = (
        -10440.397 / T
        - 11.29465
        - 0.02702355 * T
        + 1.289036e-5 * T ** 2
        - 2.478068e-9 * T ** 3
        + 6.5459673 * math.log(T)
    )
    return math.exp(ln_pws)


def calculate_evaporation_loss(
    water_temp_c: float,
    air_temp_c: float,
    relative_humidity_pct: float,
    wind_speed_mps: float,
    surface_area_m2: float,
    activity_factor: float = 0.65,
    apply_measured_correction: bool = True,
) -> float:
    if not (0 <= relative_humidity_pct <= 100):
        raise ValueError(f"Relative humidity must be 0-100 (got {relative_humidity_pct}).")
    if wind_speed_mps < 0:
        raise ValueError(f"Wind speed cannot be negative (got {wind_speed_mps}).")
    if surface_area_m2 <= 0:
        raise ValueError(f"Surface area must be positive (got {surface_area_m2}).")

    water_temp_f = celsius_to_fahrenheit(water_temp_c)
    air_temp_f = celsius_to_fahrenheit(air_temp_c)
    wind_mph = mps_to_mph(wind_speed_mps)

    tw_rankine = water_temp_f + 459.67
    ta_rankine = air_temp_f + 459.67

    pws_water_psia = _saturation_pressure_psia(tw_rankine)
    pws_air_psia = _saturation_pressure_psia(ta_rankine)
    pw_dewpoint_psia = (relative_humidity_pct / 100.0) * pws_air_psia

    ppw_inhg = pws_water_psia * PSIA_TO_INHG
    pdp_inhg = pw_dewpoint_psia * PSIA_TO_INHG

    q_evap_btu_per_ft2h = (EVAP_COEFF_A + EVAP_COEFF_B * wind_mph) * (ppw_inhg - pdp_inhg) * activity_factor
    q_evap_btu_per_ft2h = max(q_evap_btu_per_ft2h, 0.0)

    if apply_measured_correction:
        wind_mps_clamped = min(max(wind_speed_mps, 0.0), 2.2)
        correction = MEASURED_CORRECTION_LOW_WIND + (
            (MEASURED_CORRECTION_HIGH_WIND - MEASURED_CORRECTION_LOW_WIND) * (wind_mps_clamped / 2.2)
        )
        q_evap_btu_per_ft2h *= correction

    surface_area_ft2 = m2_to_ft2(surface_area_m2)
    q_evap_btu_h = q_evap_btu_per_ft2h * surface_area_ft2
    return q_evap_btu_h * BTU_TO_KWH


def calculate_convection_loss(
    water_temp_c: float,
    air_temp_c: float,
    wind_speed_mps: float,
    surface_area_m2: float,
) -> float:
    if surface_area_m2 <= 0:
        raise ValueError(f"Surface area must be positive (got {surface_area_m2}).")

    water_temp_f = celsius_to_fahrenheit(water_temp_c)
    air_temp_f = celsius_to_fahrenheit(air_temp_c)
    wind_mph = mps_to_mph(wind_speed_mps)

    hc = CONV_COEFF_A + CONV_COEFF_B * wind_mph
    q_conv_btu_per_ft2h = hc * (water_temp_f - air_temp_f)

    surface_area_ft2 = m2_to_ft2(surface_area_m2)
    q_conv_btu_h = q_conv_btu_per_ft2h * surface_area_ft2
    return q_conv_btu_h * BTU_TO_KWH


def calculate_radiation_loss(
    water_temp_c: float,
    sky_temp_c: float,
    surface_area_m2: float,
) -> float:
    if surface_area_m2 <= 0:
        raise ValueError(f"Surface area must be positive (got {surface_area_m2}).")

    water_temp_f = celsius_to_fahrenheit(water_temp_c)
    sky_temp_f = celsius_to_fahrenheit(sky_temp_c)
    tw_rankine = water_temp_f + 459.67

    hrad = 4.0 * STEFAN_BOLTZMANN_IMPERIAL * (tw_rankine ** 3)
    q_rad_btu_per_ft2h = hrad * (water_temp_f - sky_temp_f)

    surface_area_ft2 = m2_to_ft2(surface_area_m2)
    q_rad_btu_h = q_rad_btu_per_ft2h * surface_area_ft2
    return q_rad_btu_h * BTU_TO_KWH


def calculate_total_heat_loss(
    pool_type: str,
    water_temp_c: float,
    air_temp_c: float,
    relative_humidity_pct: float,
    wind_speed_mps: float,
    surface_area_m2: float,
    has_cover: bool = False,
    cover_reduction_factor: float | None = None,
    activity_factor: float = 0.65,
) -> dict:
    pool_type = pool_type.lower().strip()
    if pool_type not in ("indoor", "outdoor"):
        raise ValueError(f"pool_type must be 'indoor' or 'outdoor' (got '{pool_type}').")

    evap_kw = calculate_evaporation_loss(
        water_temp_c, air_temp_c, relative_humidity_pct, wind_speed_mps,
        surface_area_m2, activity_factor=activity_factor,
    )

    if has_cover:
        factor = cover_reduction_factor if cover_reduction_factor is not None else (
            (COVER_REDUCTION_MIN + COVER_REDUCTION_MAX) / 2.0
        )
        if not (0.0 <= factor <= 1.0):
            raise ValueError(f"cover_reduction_factor must be between 0 and 1 (got {factor}).")
        evap_kw *= (1.0 - factor)

    conv_kw = calculate_convection_loss(water_temp_c, air_temp_c, wind_speed_mps, surface_area_m2)

    if pool_type == "outdoor":
        rad_kw = calculate_radiation_loss(water_temp_c, air_temp_c, surface_area_m2)
    else:
        rad_kw = 0.0

    total_kw = evap_kw + conv_kw + rad_kw

    return {
        "evaporation_kw": evap_kw,
        "convection_kw": conv_kw,
        "radiation_kw": rad_kw,
        "total_kw": total_kw,
    }


# ============================================================
# 4. Heat pump selection and COP
# ============================================================
KW_TO_BTU_PER_HOUR = 3412.14
WEEKS_PER_MONTH = 4.345
THERM_TO_KWH = 29.3001
MIN_MEANINGFUL_SAVINGS_USD = 0.01


class HeatPumpCapacityError(Exception):
    pass


class MissingProductDataError(Exception):
    pass


def _require_numeric(value, field_name: str, model_name: str):
    if value is None or (isinstance(value, str) and value.strip().upper() == "DATA_NOT_AVAILABLE"):
        raise MissingProductDataError(
            f"Product '{model_name}' is missing required field '{field_name}'. "
            f"Cannot use this product in calculations without inventing data."
        )
    return float(value)


def select_heat_pump(required_capacity_btu: float, catalog, price_required: bool = True):
    if not catalog:
        raise MissingProductDataError("Heat pump catalog is empty.")

    usable = []
    for product in catalog:
        try:
            capacity = _require_numeric(product.get("ahri_capacity_btu_high"),
                                         "ahri_capacity_btu_high", product.get("model"))
            if price_required:
                _require_numeric(product.get("price_usd"), "price_usd", product.get("model"))
        except MissingProductDataError:
            continue
        usable.append((capacity, product))

    if not usable:
        raise MissingProductDataError("No products in the catalog have complete capacity/price data.")

    usable.sort(key=lambda x: x[0])

    for capacity, product in usable:
        if capacity >= required_capacity_btu:
            return product

    best_available = usable[-1][1]
    err = HeatPumpCapacityError(
        f"No catalog heat pump has enough AHRI-rated capacity "
        f"({required_capacity_btu:.0f} Btu/h required; largest available is "
        f"{usable[-1][0]:.0f} Btu/h - {best_available['manufacturer']} {best_available['model']})."
    )
    err.best_available = best_available
    raise err


def interpolate_cop(
    air_temp_f: float,
    cop_high: float,
    air_temp_high_f: float,
    cop_low: float,
    air_temp_low_f: float,
) -> float:
    if air_temp_high_f == air_temp_low_f:
        raise ValueError("High and low test temperatures cannot be equal.")

    lower_t, higher_t = sorted([air_temp_low_f, air_temp_high_f])
    if air_temp_f <= lower_t:
        return cop_low if air_temp_low_f == lower_t else cop_high
    if air_temp_f >= higher_t:
        return cop_high if air_temp_high_f == higher_t else cop_low

    fraction = (air_temp_f - air_temp_low_f) / (air_temp_high_f - air_temp_low_f)
    return cop_low + fraction * (cop_high - cop_low)


def calculate_heat_pump_consumption(heat_demand_kwh: float, cop: float) -> float:
    if cop <= 0:
        raise ValueError(f"COP must be positive (got {cop}).")
    if heat_demand_kwh < 0:
        raise ValueError(f"Heat demand cannot be negative (got {heat_demand_kwh}).")
    return heat_demand_kwh / cop


# ============================================================
# 5. Operating costs
# ============================================================


def calculate_heat_pump_cost(consumption_kwh: float, electricity_price_per_kwh: float) -> float:
    if consumption_kwh < 0:
        raise ValueError(f"Consumption cannot be negative (got {consumption_kwh}).")
    if electricity_price_per_kwh < 0:
        raise ValueError(f"Electricity price cannot be negative (got {electricity_price_per_kwh}).")
    return consumption_kwh * electricity_price_per_kwh


def calculate_baseline_cost(
    existing_system_type: str,
    heat_demand_kwh: float,
    existing_efficiency: float,
    fuel_price: float,
    fuel_unit: str = "USD_per_kWh",
) -> float:
    existing_system_type = existing_system_type.lower().strip()
    valid_types = {"none", "electric_resistance", "gas", "oil", "solar", "existing_heat_pump"}
    if existing_system_type not in valid_types:
        raise ValueError(f"Unknown existing_system_type '{existing_system_type}'. Valid: {valid_types}")

    if existing_system_type in ("none", "solar"):
        return 0.0

    if existing_efficiency is None or existing_efficiency <= 0:
        raise ValueError(f"existing_efficiency must be positive (got {existing_efficiency}).")
    if fuel_price is None or fuel_price < 0:
        raise ValueError(f"fuel_price cannot be negative (got {fuel_price}).")
    if heat_demand_kwh < 0:
        raise ValueError(f"heat_demand_kwh cannot be negative (got {heat_demand_kwh}).")

    fuel_energy_required_kwh = heat_demand_kwh / existing_efficiency

    if fuel_unit == "USD_per_kWh":
        return fuel_energy_required_kwh * fuel_price
    elif fuel_unit == "USD_per_therm":
        fuel_energy_required_therms = fuel_energy_required_kwh / THERM_TO_KWH
        return fuel_energy_required_therms * fuel_price
    else:
        raise ValueError(f"Unsupported fuel_unit '{fuel_unit}'. Use 'USD_per_kWh' or 'USD_per_therm'.")


def calculate_annual_savings(baseline_cost: float, heat_pump_cost: float) -> dict:
    is_new_cost = baseline_cost == 0.0
    annual_savings = baseline_cost - heat_pump_cost
    return {
        "annual_savings": annual_savings,
        "is_new_cost": is_new_cost,
        "is_negative": annual_savings < 0,
    }


# ============================================================
# 6. Payback period and ROI
# ============================================================


def calculate_payback(net_investment: float, annual_savings: float) -> float:
    if net_investment < 0:
        raise ValueError(f"net_investment cannot be negative (got {net_investment}).")
    if annual_savings < MIN_MEANINGFUL_SAVINGS_USD:
        return math.inf
    return net_investment / annual_savings


def calculate_roi(net_investment: float, annual_savings: float, years: int = 5) -> float:
    if net_investment <= 0:
        raise ValueError(
            f"net_investment must be positive to calculate ROI (got {net_investment}). "
            f"A zero-cost investment makes ROI mathematically undefined."
        )
    if years <= 0:
        raise ValueError(f"years must be positive (got {years}).")

    total_savings = annual_savings * years
    roi_fraction = (total_savings - net_investment) / net_investment
    return roi_fraction * 100.0


# ============================================================
# 7. Full calculation pipeline
# ============================================================


def calculate_annual_heat_demand(
    pool_type: str,
    surface_area_m2: float,
    target_temp_c: float,
    monthly_avg_air_temp_c: dict,
    operating_hours_per_day: float,
    operating_days_per_week: float,
    relative_humidity_pct: float,
    wind_speed_mps: float,
    has_cover: bool,
    cover_reduction_factor: float | None,
) -> dict:
    if operating_hours_per_day <= 0 or operating_hours_per_day > 24:
        raise ValueError(f"operating_hours_per_day must be in (0, 24] (got {operating_hours_per_day}).")
    if operating_days_per_week <= 0 or operating_days_per_week > 7:
        raise ValueError(f"operating_days_per_week must be in (0, 7] (got {operating_days_per_week}).")
    if not monthly_avg_air_temp_c:
        raise ValueError("At least one operating month with an average air temperature is required.")

    hours_per_month = operating_hours_per_day * operating_days_per_week * WEEKS_PER_MONTH

    monthly_breakdown = {}
    peak_kw = 0.0
    annual_kwh = 0.0

    for month, air_temp_c in monthly_avg_air_temp_c.items():
        loss = calculate_total_heat_loss(
            pool_type=pool_type,
            water_temp_c=target_temp_c,
            air_temp_c=air_temp_c,
            relative_humidity_pct=relative_humidity_pct,
            wind_speed_mps=wind_speed_mps,
            surface_area_m2=surface_area_m2,
            has_cover=has_cover,
            cover_reduction_factor=cover_reduction_factor,
        )
        total_kw = max(loss["total_kw"], 0.0)
        month_kwh = total_kw * hours_per_month

        monthly_breakdown[month] = {
            "air_temp_c": air_temp_c,
            "evaporation_kw": loss["evaporation_kw"],
            "convection_kw": loss["convection_kw"],
            "radiation_kw": loss["radiation_kw"],
            "total_kw": total_kw,
            "hours": hours_per_month,
            "kwh": month_kwh,
        }
        peak_kw = max(peak_kw, total_kw)
        annual_kwh += month_kwh

    return {"monthly_breakdown": monthly_breakdown, "annual_kwh": annual_kwh, "peak_kw": peak_kw}


def _celsius_to_fahrenheit(t_c: float) -> float:
    return t_c * 9.0 / 5.0 + 32.0


def calculate_roi_scenario(inputs: dict) -> dict:
    warnings = []

    area_m2 = calculate_pool_surface_area(inputs["length_m"], inputs["width_m"])
    volume_m3 = calculate_pool_volume(inputs["length_m"], inputs["width_m"], inputs["avg_depth_m"])
    mass_kg = calculate_water_mass(volume_m3)

    heat_up = calculate_heat_up_energy(
        mass_kg, inputs["current_water_temp_c"], inputs["target_water_temp_c"]
    )

    demand = calculate_annual_heat_demand(
        pool_type=inputs["pool_type"],
        surface_area_m2=area_m2,
        target_temp_c=inputs["target_water_temp_c"],
        monthly_avg_air_temp_c=inputs["monthly_avg_air_temp_c"],
        operating_hours_per_day=inputs["operating_hours_per_day"],
        operating_days_per_week=inputs["operating_days_per_week"],
        relative_humidity_pct=inputs["relative_humidity_pct"],
        wind_speed_mps=inputs["wind_speed_mps"],
        has_cover=inputs.get("has_cover", False),
        cover_reduction_factor=inputs.get("cover_reduction_factor"),
    )

    total_thermal_demand_kwh = demand["annual_kwh"] + heat_up["kwh"]

    catalog = load_heat_pumps()
    required_capacity_btu = demand["peak_kw"] * KW_TO_BTU_PER_HOUR * 1.20

    try:
        selected_pump = select_heat_pump(required_capacity_btu, catalog)
    except HeatPumpCapacityError as e:
        warnings.append(str(e))
        selected_pump = e.best_available
    except MissingProductDataError:
        raise

    cop_high = selected_pump["ahri_cop_high"]
    cop_low = selected_pump["ahri_cop_low"]
    air_temp_high_f = selected_pump["test_air_temp_high_f"]
    air_temp_low_f = selected_pump["test_air_temp_low_f"]

    total_consumption_kwh = 0.0
    monthly_cop = {}
    for month, data in demand["monthly_breakdown"].items():
        air_temp_f = _celsius_to_fahrenheit(data["air_temp_c"])
        cop = interpolate_cop(air_temp_f, cop_high, air_temp_high_f, cop_low, air_temp_low_f)
        monthly_cop[month] = cop
        total_consumption_kwh += calculate_heat_pump_consumption(data["kwh"], cop)

    first_month = next(iter(demand["monthly_breakdown"]))
    heat_up_cop = monthly_cop[first_month]
    total_consumption_kwh += calculate_heat_pump_consumption(heat_up["kwh"], heat_up_cop)

    prices = load_energy_prices()
    electricity_price = inputs.get("electricity_price_per_kwh")
    if electricity_price is None:
        elec_price_row = get_energy_price(prices, inputs.get("region", "US_National"), "electricity")
        electricity_price = elec_price_row["price"]

    hp_cost = calculate_heat_pump_cost(total_consumption_kwh, electricity_price)

    existing_system_type = inputs["existing_system_type"]
    if existing_system_type == "gas":
        gas_price = inputs.get("gas_price_per_therm")
        if gas_price is None:
            gas_price = get_energy_price(prices, inputs.get("region", "US_National"), "natural_gas")["price"]
        baseline_cost = calculate_baseline_cost(
            existing_system_type, total_thermal_demand_kwh,
            inputs.get("existing_efficiency", 0.80), gas_price, fuel_unit="USD_per_therm",
        )
    else:
        baseline_cost = calculate_baseline_cost(
            existing_system_type, total_thermal_demand_kwh,
            inputs.get("existing_efficiency", 1.0), electricity_price, fuel_unit="USD_per_kWh",
        )

    savings = calculate_annual_savings(baseline_cost, hp_cost)
    if savings["is_new_cost"]:
        warnings.append(
            "No existing heating system was present - there is no baseline cost to save "
            "against. This is a NEW comfort expense, not an investment with a payback."
        )
    if savings["is_negative"]:
        warnings.append(
            "The heat pump's estimated running cost EXCEEDS the existing system's cost "
            "for this scenario. Payback/ROI will reflect a poor financial fit."
        )

    net_investment = inputs.get("heat_pump_price_usd") or selected_pump.get("price_usd")
    if net_investment == "DATA_NOT_AVAILABLE" or net_investment is None:
        raise MissingProductDataError(
            f"No price available for selected product {selected_pump.get('model')} "
            f"and no heat_pump_price_usd was provided in inputs."
        )
    equipment_price = float(net_investment)
    installation_cost = float(inputs.get("installation_cost_usd", 0.0))
    grant = float(inputs.get("rebate_usd", 0.0))
    net_investment = equipment_price + installation_cost - grant
    if net_investment < 0:
        warnings.append("The grant exceeds the total installed cost; net investment was set to $0.")
        net_investment = 0.0

    payback_years = calculate_payback(net_investment, savings["annual_savings"])
    roi_5yr_pct = None
    if net_investment > 0:
        roi_5yr_pct = calculate_roi(net_investment, savings["annual_savings"], years=5)

    return {
        "pool": {"surface_area_m2": area_m2, "volume_m3": volume_m3, "water_mass_kg": mass_kg},
        "heat_up_energy_kwh": heat_up["kwh"],
        "continuous_demand": demand,
        "total_thermal_demand_kwh": total_thermal_demand_kwh,
        "selected_heat_pump": selected_pump,
        "required_capacity_btu": required_capacity_btu,
        "monthly_cop": monthly_cop,
        "total_electricity_consumption_kwh": total_consumption_kwh,
        "electricity_price_per_kwh": electricity_price,
        "heat_pump_annual_cost": hp_cost,
        "baseline_annual_cost": baseline_cost,
        "annual_savings": savings["annual_savings"],
        "net_investment": net_investment,
        "investment_breakdown": {
            "equipment_usd": equipment_price,
            "installation_usd": installation_cost,
            "grant_usd": grant,
            "net_usd": net_investment,
        },
        "payback_years": payback_years,
        "roi_5yr_pct": roi_5yr_pct,
        "warnings": warnings,
    }


# ============================================================
# 8. Streamlit UI (simple, customer-facing)
# ============================================================

MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]

EXISTING_SYSTEMS = {
    "Electric heater": "electric_resistance",
    "Gas heater": "gas",
    "Oil heater": "oil",
    "Existing heat pump": "existing_heat_pump",
    "Solar heating": "solar",
    "No heating at the moment": "none",
}


def build_monthly_temps(months: list[str], avg_air_temp_c: float) -> dict:
    """One entry per selected month, all using the same average air temperature."""
    return {m: float(avg_air_temp_c) for m in months}


def money(x: float) -> str:
    return f"${x:,.0f}"


prices_data = load_energy_prices()
regions = sorted({row["region"] for row in prices_data})

st.title("🏊 Pool Heat Pump Savings Calculator")
st.write(
    "Find out how much a heat pump could save you every year "
    "and how long it takes to pay for itself."
)

# ---------- Section 1: the pool ----------
with st.container(border=True):
    st.subheader("1. Your pool")
    pool_choice = st.radio("Where is your pool?", ["Outdoor", "Indoor"], horizontal=True)
    c1, c2, c3 = st.columns(3)
    length_m = c1.number_input("Length (m)", min_value=0.5, max_value=100.0, value=10.0, step=0.5)
    width_m = c2.number_input("Width (m)", min_value=0.5, max_value=100.0, value=5.0, step=0.5)
    avg_depth_m = c3.number_input("Average depth (m)", min_value=0.2, max_value=6.0, value=1.4, step=0.1)
    has_cover = st.checkbox("I cover the pool when it's not in use", value=True)

# ---------- Section 2: how you use it ----------
with st.container(border=True):
    st.subheader("2. How you use it")
    c1, c2, c3 = st.columns(3)
    target_water_temp_c = c1.number_input("Water temperature you want (°C)", min_value=10.0, max_value=40.0, value=28.0, step=0.5)
    operating_hours_per_day = c2.number_input("Heating hours per day", min_value=0.5, max_value=24.0, value=10.0, step=0.5)
    operating_days_per_week = c3.number_input("Days per week", min_value=1, max_value=7, value=7, step=1)

    selected_months = st.multiselect(
        "Which months do you heat the pool?",
        MONTH_NAMES,
        default=["June", "July", "August", "September"],
    )
    avg_air_temp_c = st.number_input(
        "Average outdoor temperature in those months (°C)",
        min_value=-20.0, max_value=50.0, value=28.5, step=0.5,
    )

# ---------- Section 3: costs ----------
with st.container(border=True):
    st.subheader("3. Your current heating and costs")
    existing_label = st.selectbox("How do you heat the pool today?", list(EXISTING_SYSTEMS.keys()))
    existing_system_type = EXISTING_SYSTEMS[existing_label]
    c1, c2 = st.columns(2)
    installation_cost_usd = c1.number_input("Installation cost ($)", min_value=0.0, value=1800.0, step=100.0)
    rebate_usd = c2.number_input("Grant or rebate ($)", min_value=0.0, value=500.0, step=50.0)

# ---------- Advanced (optional) ----------
with st.expander("Advanced settings (optional)"):
    st.caption("The defaults work well for most pools. Change these only if you know your exact values.")
    c1, c2 = st.columns(2)
    current_water_temp_c = c1.number_input("Current water temperature (°C)", min_value=0.0, max_value=40.0, value=24.0, step=0.5)
    wind_speed_mps = c2.number_input("Average wind speed (m/s)", min_value=0.0, max_value=50.0, value=3.0, step=0.5)
    relative_humidity_pct = c1.number_input("Relative humidity (%)", min_value=0.0, max_value=100.0, value=65.0, step=1.0)
    region = c2.selectbox(
        "Region (for energy prices)", regions,
        index=regions.index("South_Atlantic") if "South_Atlantic" in regions else 0,
        format_func=lambda r: r.replace("_", " "),
    )
    cover_reduction_factor = None
    if has_cover:
        cover_reduction_factor = st.slider(
            "How much the cover reduces evaporation", min_value=0.50, max_value=0.70, value=0.60, step=0.01,
            help="A typical pool cover cuts evaporation by 50-70%.",
        )
    existing_efficiency = st.number_input(
        "Efficiency of your current heater (1.0 = 100%)", min_value=0.01, max_value=5.0,
        value=0.80 if existing_system_type == "gas" else 1.0, step=0.05,
    )
    electricity_price_per_kwh = None
    if st.checkbox("I know my electricity price", value=False):
        electricity_price_per_kwh = st.number_input("Electricity price ($ per kWh)", min_value=0.0, value=0.16, step=0.01, format="%.4f")
    gas_price_per_therm = None
    if existing_system_type == "gas" and st.checkbox("I know my gas price", value=False):
        gas_price_per_therm = st.number_input("Gas price ($ per therm)", min_value=0.0, value=1.35, step=0.01)
    heat_pump_price_usd = None
    if st.checkbox("I already have a heat pump price quote", value=False):
        heat_pump_price_usd = st.number_input("Heat pump price ($)", min_value=0.0, value=5000.0, step=100.0)

run = st.button("Calculate my savings", type="primary", use_container_width=True)

if not run:
    st.info("Fill in the details above, then click **Calculate my savings**.")
else:
    monthly_avg_air_temp_c = build_monthly_temps(selected_months, avg_air_temp_c)

    if not monthly_avg_air_temp_c:
        st.error("Please select at least one month.")
        st.stop()

    inputs = {
        "pool_type": pool_choice.lower(),
        "length_m": length_m,
        "width_m": width_m,
        "avg_depth_m": avg_depth_m,
        "current_water_temp_c": min(current_water_temp_c, target_water_temp_c),
        "target_water_temp_c": target_water_temp_c,
        "operating_hours_per_day": operating_hours_per_day,
        "operating_days_per_week": float(operating_days_per_week),
        "monthly_avg_air_temp_c": monthly_avg_air_temp_c,
        "wind_speed_mps": wind_speed_mps,
        "relative_humidity_pct": relative_humidity_pct,
        "has_cover": has_cover,
        "cover_reduction_factor": cover_reduction_factor,
        "existing_system_type": existing_system_type,
        "existing_efficiency": existing_efficiency,
        "region": region,
        "electricity_price_per_kwh": electricity_price_per_kwh,
        "gas_price_per_therm": gas_price_per_therm,
        "heat_pump_price_usd": heat_pump_price_usd,
        "installation_cost_usd": installation_cost_usd,
        "rebate_usd": rebate_usd,
    }

    try:
        result = calculate_roi_scenario(inputs)
    except (PoolInputError, ValueError, MissingProductDataError) as e:
        st.error(f"Something in your inputs needs a look: {e}")
        st.stop()

    savings = result["annual_savings"]
    payback = result["payback_years"]
    pump = result["selected_heat_pump"]
    has_baseline = result["baseline_annual_cost"] > 0

    st.header("Your results")

    # ---- Plain-language headline ----
    if not has_baseline:
        st.info(
            f"Heating this pool with a heat pump would cost about "
            f"**{money(result['heat_pump_annual_cost'])} per year** to run. "
            "Since you have no current heating, there is nothing to save against."
        )
    elif savings < MIN_MEANINGFUL_SAVINGS_USD:
        st.warning(
            "With these details, a heat pump would cost more to run than your current heater, "
            "so it would not pay for itself."
        )
    else:
        summary = (
            f"A heat pump could save you about **{money(savings)} per year** and "
            f"pay for itself in about **{payback:.1f} years**."
        )
        if payback <= 5:
            st.success(summary + " That is a strong return.")
        elif payback <= 10:
            st.info(summary + " That is a moderate return.")
        elif payback <= 15:
            st.warning(
                summary + " That is a long payback, close to the typical lifespan of a heat pump "
                "(roughly 10-15 years), so the real benefit may be small. "
                "Keeping your current heater could be the better financial choice."
            )
        else:
            st.warning(
                summary + " That is longer than a heat pump usually lasts, so it is unlikely to pay for itself. "
                "Keeping your current heater would probably cost you less overall."
            )

    # ---- Key numbers ----
    c1, c2, c3 = st.columns(3)
    c1.metric("Upfront cost", money(result["net_investment"]), help="Heat pump + installation - rebate")
    if has_baseline:
        c2.metric("Yearly savings", money(savings))
        c3.metric("Pays for itself in", "Never" if math.isinf(payback) else f"{payback:.1f} years")
    else:
        c2.metric("Yearly running cost", money(result["heat_pump_annual_cost"]))
        c3.metric("Estimated electricity use", f"{result['total_electricity_consumption_kwh']:,.0f} kWh")

    if has_baseline and result["roi_5yr_pct"] is not None:
        st.metric(
            "5-year return", f"{result['roi_5yr_pct']:.0f}%",
            help="Compares 5 years of savings with the upfront cost. "
                 "Negative means it takes longer than 5 years to pay back.",
        )

    st.write(f"**Recommended heat pump:** {pump['manufacturer']} {pump['model']}")

    if result["warnings"]:
        for w in result["warnings"]:
            st.warning(w)

    # ---- Optional detail for people who want it ----
    with st.expander("See how this was calculated"):
        inv = result["investment_breakdown"]
        st.markdown(
            f"**Upfront cost**\n\n"
            f"- Heat pump: ${inv['equipment_usd']:,.2f}\n"
            f"- Installation: ${inv['installation_usd']:,.2f}\n"
            f"- Rebate: -${inv['grant_usd']:,.2f}\n"
            f"- **Total: ${inv['net_usd']:,.2f}**\n\n"
            f"**Yearly running costs**\n\n"
            f"- Heat pump: ${result['heat_pump_annual_cost']:,.2f}\n"
            f"- Current heater: ${result['baseline_annual_cost']:,.2f}\n"
            f"- Electricity price used: ${result['electricity_price_per_kwh']:.4f} per kWh"
        )
        monthly_rows = []
        for month, d in result["continuous_demand"]["monthly_breakdown"].items():
            monthly_rows.append({
                "Month": month,
                "Heat needed (kWh)": round(d["kwh"], 0),
                "Heat pump efficiency (COP)": round(result["monthly_cop"][month], 2),
            })
        st.dataframe(pd.DataFrame(monthly_rows), hide_index=True)

    st.caption("These are estimates based on typical values and are not a formal quote.")
