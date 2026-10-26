from pathlib import Path
import csv
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4

root=Path(__file__).resolve().parents[1]
out=root/'public'/'samples'
out.mkdir(parents=True,exist_ok=True)
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='Brand',fontName='Helvetica-Bold',fontSize=10,textColor=colors.HexColor('#0d7f75'),spaceAfter=26))
styles['Title'].fontName='Helvetica-Bold'; styles['Title'].fontSize=27; styles['Title'].leading=33; styles['Title'].textColor=colors.HexColor('#142b49'); styles['Title'].alignment=0
styles['BodyText'].fontSize=10; styles['BodyText'].leading=16; styles['BodyText'].spaceAfter=12
styles['Heading2'].fontSize=14; styles['Heading2'].textColor=colors.HexColor('#142b49'); styles['Heading2'].spaceBefore=18

def footer(c,d):
 c.setStrokeColor(colors.HexColor('#e2e8f0'));c.line(48,48,547,48)
 c.setFillColor(colors.HexColor('#526174'));c.setFont('Helvetica',8)
 c.drawString(48,33,'GLOBAL STUDY SUPPORT | Original learning reference | Synthetic / conceptual data')
 c.drawRightString(547,33,str(d.page))

def make(slug,title,sections,rows=None):
 doc=SimpleDocTemplate(str(out/(slug+'.pdf')),pagesize=A4,rightMargin=48,leftMargin=48,topMargin=48,bottomMargin=65)
 flow=[Paragraph('GLOBAL STUDY SUPPORT / REFERENCE SERIES',styles['Brand']),Paragraph(title,styles['Title']),Spacer(1,12),Paragraph('ILLUSTRATIVE DEMONSTRATION - NOT CLIENT WORK',styles['Brand'])]
 for heading,body in sections:
  flow.extend([Paragraph(heading,styles['Heading2']),Paragraph(body,styles['BodyText'])])
 if rows:
  table=Table(rows,hAlign='LEFT',colWidths=[170,165,164]);table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#142b49')),('TEXTCOLOR',(0,0),(-1,0),colors.white),('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),10),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.HexColor('#f7f9fc'),colors.white]),('LINEBELOW',(0,0),(-1,-1),.5,colors.HexColor('#e2e8f0'))]));flow.append(table)
 doc.build(flow,onFirstPage=footer,onLaterPages=footer)

make('python-data-analysis','Python Data Analysis',[
 ('Objective','Explore a fictional sales dataset using a transparent, reproducible workflow. The example compares total revenue across three regions and creates a simple bar chart.'),
 ('Workflow','1. Load sales.csv with pandas.<br/>2. Verify required columns, missing values and numeric revenue.<br/>3. Group revenue by region.<br/>4. Export a summary and create a labelled chart.<br/>5. Explain the result and the limits of the small dataset.'),
 ('Run the example','Install pandas and matplotlib in your Python environment. Place python-analysis.py and sales.csv in the same directory. Run: python python-analysis.py. The script writes regional-summary.csv and regional-revenue.png.'),
 ('Interpretation and limitations','North has revenue of 8,200, South 7,300 and West 9,500 in the invented dataset. West contributes 38% of the total 25,000. These six observations are insufficient for forecasting, causal inference or a real business decision. All records are synthetic.')], [['Region','Revenue (illustrative)','Share'],['North','8,200','32.8%'],['South','7,300','29.2%'],['West','9,500','38.0%']])
make('cad-assembly-design','Conceptual Bracket Assembly',[
 ('Objective','Introduce the questions involved in a simple bracket-and-plate assembly. This is a workflow reference, not a finished CAD model or a validated mechanical design.'),
 ('Illustrative assumptions','Consider a flat base plate of 100 x 60 x 8 mm and an upright plate of 60 x 50 x 6 mm. Material is unspecified. Dimensions are invented to support discussion and must not be treated as a specification.'),
 ('Modelling sequence','Sketch the base profile and extrude. Create a second part for the upright. Add mounting features only after defining the intended load path and edge distances. Assemble using fully defined, non-redundant mates. Review interference and access for fasteners.'),
 ('Design review checklist','Confirm units, intended loads, support conditions, material properties, tolerances, manufacturing constraints and fastening method. A simulation needs a justified mesh and boundary conditions before its results are meaningful.'),
 ('Available deliverable and limits','This demonstration contains reference notes and a PDF only. No native SolidWorks assembly, manufacturing drawing or simulation result is supplied. Seek competent engineering review before any physical use.')])
make('building-structural-model','Low-Rise Frame Concept Study',[
 ('Objective','Understand how assumptions connect geometry, loading and structural behaviour in an invented one-bay frame. This is an introductory reference, not a construction design or certified analysis.'),
 ('Illustrative geometry','Assume one span of 5 m and a storey height of 3 m. Use consistent units. Define connectivity and supports before introducing member properties. No material grade or design code is selected in this conceptual example.'),
 ('Simple load illustration','For a simply supported 5 m beam under a uniform 10 kN/m load, the idealised reactions are wL/2 = 25 kN each. The maximum bending moment is wL squared/8 = 31.25 kNm. These idealised expressions do not establish member adequacy.'),
 ('Review before analysis','Confirm load path, end releases, support restraints, member orientation, diaphragm assumptions and self-weight treatment. Check equilibrium and deformation qualitatively before accepting a software output.'),
 ('Available deliverable and limits','This PDF and the study notes are the available deliverables. No Revit or ETABS model, code compliance assessment or reinforcement design is included. Actual design needs site data, applicable standards and qualified professional verification.')])
make('financial-dashboard','Financial Performance Dashboard',[
 ('Objective','Demonstrate a simple financial reporting model with invented monthly revenue and direct costs. Download financial-data.csv to reproduce the calculations in a spreadsheet or business intelligence tool.'),
 ('Metric definitions','Revenue = sum of monthly revenue. Gross profit = revenue minus direct costs. Gross margin = gross profit divided by revenue. Calculate period margin from period totals rather than averaging monthly margins.'),
 ('Data model and interaction','The dataset contains one row for each month in 2025. In Power BI, use a month dimension with chronological sorting and measures for revenue, costs and gross margin. The website preview lets you compare the full year and half-year totals.'),
 ('Scope and limitations','All data is synthetic. Direct costs exclude operating expenses, tax, interest and depreciation. This is not a complete income statement, investment recommendation or audited financial report. No native Power BI file is included.')], [['Period','Revenue / Direct costs','Gross margin'],['Jan-Jun','54,000 / 34,800','35.6%'],['Jul-Dec','74,000 / 44,800','39.5%'],['Full year','128,000 / 79,600','37.8%']])
(out/'sales.csv').write_text('region,month,revenue\nNorth,Jan,4000\nNorth,Feb,4200\nSouth,Jan,3500\nSouth,Feb,3800\nWest,Jan,4500\nWest,Feb,5000\n')
(out/'python-analysis.py').write_text('''"""Original demonstration. Uses synthetic sales data only."""
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
''')
months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
revenues=[7000,8000,8500,9500,10000,11000,10500,11500,12000,12500,13000,14500]
costs=[4800,5200,5500,6000,6400,6900,6500,7000,7200,7400,7900,8800]
with (out/'financial-data.csv').open('w',newline='') as f:
 w=csv.writer(f);w.writerow(['month','revenue_gbp','direct_costs_gbp']);w.writerows(zip(months,revenues,costs))
for slug,file in [('cad-assembly-design','cad-study.txt'),('building-structural-model','structural-study.txt')]:
 (out/file).write_text('GLOBAL STUDY SUPPORT - CONCEPTUAL REFERENCE\n\nRead '+slug+'.pdf for the complete original study.\nNo native CAD/BIM model is included.\nNot for manufacture, construction or safety decisions.\n')
assert sum(revenues)==128000 and sum(costs)==79600
print('Created four reference PDFs and five supporting downloads.')
