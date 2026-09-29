# Swimming Pool Heat Pump ROI Calculator — Streamlit Version

The exact same calculations as the original notebook, but with an interactive
interface: change values from the sidebar and the months table, then click one
button instead of editing code.

## Running

1. Make sure Python 3.10+ is installed.
2. Open a terminal in this folder and install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the app:

   ```bash
   streamlit run app.py
   ```

4. Your browser will open automatically at `http://localhost:8501`.

## Important notes

- The `data/` folder (containing `heat_pumps.csv`, `energy_prices.csv`,
  `constants.csv`) must stay next to `app.py` — don't move any file on its own.
- The "Monthly average air temperature" table is editable: you can add or
  remove months using the `+` / `-` controls in the table.
- Any value you leave unset (such as the electricity price or the heat pump
  price) falls back to the default from the `data/` files, using the same
  logic as the original notebook.
