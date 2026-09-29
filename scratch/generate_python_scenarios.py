import json
import math
import sys
import os

import app

scenarios = [
    {
        "name": "Small indoor pool, electric heater",
        "inputs": {
            "pool_type": "indoor",
            "length_m": 5.0,
            "width_m": 3.0,
            "avg_depth_m": 1.2,
            "has_cover": True,
            "cover_reduction_factor": 0.6,
            "current_water_temp_c": 15.0,
            "target_water_temp_c": 30.0,
            "operating_hours_per_day": 12.0,
            "operating_days_per_week": 7,
            "monthly_avg_air_temp_c": {"January": 22.0, "February": 22.0},
            "relative_humidity_pct": 50.0,
            "wind_speed_mps": 0.0,
            "existing_system_type": "electric_resistance",
            "existing_efficiency": 1.0,
            "electricity_price_per_kwh": 0.15,
            "installation_cost_usd": 1500.0,
            "rebate_usd": 0.0,
            "region": "US_National"
        }
    },
    {
        "name": "Large outdoor pool, gas heater",
        "inputs": {
            "pool_type": "outdoor",
            "length_m": 25.0,
            "width_m": 12.5,
            "avg_depth_m": 2.0,
            "has_cover": False,
            "current_water_temp_c": 10.0,
            "target_water_temp_c": 28.0,
            "operating_hours_per_day": 24.0,
            "operating_days_per_week": 7,
            "monthly_avg_air_temp_c": {"June": 25.0, "July": 28.0, "August": 27.0},
            "relative_humidity_pct": 60.0,
            "wind_speed_mps": 3.0,
            "existing_system_type": "gas",
            "existing_efficiency": 0.8,
            "electricity_price_per_kwh": 0.12,
            "gas_price_per_therm": 1.5,
            "installation_cost_usd": 5000.0,
            "rebate_usd": 1000.0,
            "region": "US_National"
        }
    },
    {
        "name": "Medium outdoor pool, no existing heater",
        "inputs": {
            "pool_type": "outdoor",
            "length_m": 10.0,
            "width_m": 5.0,
            "avg_depth_m": 1.5,
            "has_cover": True,
            "current_water_temp_c": 20.0,
            "target_water_temp_c": 26.0,
            "operating_hours_per_day": 8.0,
            "operating_days_per_week": 5,
            "monthly_avg_air_temp_c": {"May": 20.0, "June": 24.0, "July": 26.0},
            "relative_humidity_pct": 70.0,
            "wind_speed_mps": 1.5,
            "existing_system_type": "none",
            "existing_efficiency": 1.0,
            "electricity_price_per_kwh": 0.20,
            "installation_cost_usd": 2000.0,
            "rebate_usd": 500.0,
            "region": "US_National"
        }
    }
]

results = []
for s in scenarios:
    try:
        res = app.calculate_roi_scenario(s["inputs"])
        res_clean = {
            "total_thermal_demand_kwh": res["total_thermal_demand_kwh"],
            "required_capacity_btu": res["required_capacity_btu"],
            "total_electricity_consumption_kwh": res["total_electricity_consumption_kwh"],
            "heat_pump_annual_cost": res["heat_pump_annual_cost"],
            "baseline_annual_cost": res["baseline_annual_cost"],
            "annual_savings": res["annual_savings"],
            "net_investment": res["net_investment"],
            "payback_years": "Infinity" if res["payback_years"] == math.inf else res["payback_years"],
            "roi_5yr_pct": res["roi_5yr_pct"]
        }
        results.append({"name": s["name"], "inputs": s["inputs"], "output": res_clean})
    except Exception as e:
        results.append({"name": s["name"], "error": str(e)})

with open("scratch/validation_data.json", "w") as f:
    json.dump(results, f, indent=2)
