"""Original demonstration. Uses synthetic sales data only."""
from pathlib import Path
import pandas as pd
import matplotlib.pyplot as plt

base = Path(__file__).resolve().parent
sales = pd.read_csv(base / "sales.csv")
required = {"region", "month", "revenue"}
if not required.issubset(sales.columns):
    raise ValueError("Dataset is missing required columns")
if sales[list(required)].isna().any().any():
    raise ValueError("Missing values need review")
sales["revenue"] = pd.to_numeric(sales["revenue"], errors="raise")
summary = sales.groupby("region")["revenue"].sum().sort_values()
summary.to_csv(base / "regional-summary.csv")
ax = summary.plot.bar(color="#2563EB", rot=0)
ax.set(title="Synthetic regional revenue", xlabel="Region", ylabel="Revenue (illustrative units)")
plt.tight_layout()
plt.savefig(base / "regional-revenue.png", dpi=180)
print(summary.to_string())
