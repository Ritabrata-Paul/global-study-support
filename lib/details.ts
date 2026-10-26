// Editable descriptions: scope is confirmed on enquiry, not a claim of certification.
export const serviceDetails: Record<string, {overview:string;faqs:string[][]}> = {
 'information-technology': {overview:'Work through software problems with a clearer view of the underlying concepts. Sessions can cover code structure, debugging, database design and deployment workflows. Bring a reproducible example, your current approach and the specific behaviour you want to understand. Support is scoped to the technology and version involved.',faqs:[['What should I share for debugging?','Provide a minimal code example, expected and actual results, error messages and software versions. Remove secrets, passwords and private data.'],['Can you support graded programming work?','We can explain concepts, review your approach and guide debugging within your institution’s rules. You remain responsible for the code you submit.']]},
 'mechanical-engineering': {overview:'Connect engineering theory with modelling decisions. Guidance can cover CAD constraints, design assumptions, meshing and interpretation of simulation results. We start with units, objectives, available material data and boundary conditions. Conceptual guidance does not replace verification by a qualified engineer for physical manufacture or safety decisions.',faqs:[['Can you review a simulation?','Share the objective, geometry context, material properties, loads, constraints and software version. We discuss assumptions before interpreting output.'],['Are demonstrations ready for manufacturing?','No. Portfolio engineering references are conceptual learning material. Manufacturing requires verified dimensions, tolerances, material specifications and professional review.']]},
 'civil-engineering': {overview:'Develop a methodical approach to structural modelling and construction information. Support can cover load paths, analysis assumptions, BIM organisation and calculation review. Provide the project context and applicable requirements so the scope can be assessed. Construction or regulated design always needs appropriate qualified review and approval.',faqs:[['What information helps a model review?','Include units, geometry, support conditions, material assumptions, load cases, software version and the question you need to resolve.'],['Do you provide certified construction designs?','The website does not offer or imply professional certification. Any regulated design or construction use requires a separately agreed scope and qualified sign-off.']]},
 'finance-accounting': {overview:'Build financial models and reports that make assumptions visible. Support can cover spreadsheet logic, budgets, ratio analysis and dashboard measures. Start with the decision you want to inform and the definitions behind your figures. Use anonymised or synthetic data in an initial enquiry; examples are educational and are not investment advice.',faqs:[['Can I share business financial data?','Use anonymised or synthetic information for the first enquiry. Agree appropriate confidentiality and data handling before sharing authorised private records.'],['Does support include investment recommendations?','No. The listed assistance concerns learning, modelling and reporting. Demonstrations are not audited statements, tax advice or personalised investment recommendations.']]},
};

export const toolDetails: Record<string, [string,string[]]> = {
 python:['A general-purpose programming language used for automation, data analysis and application development.',['Python fundamentals and modular code','pandas data cleaning and analysis','Debugging and reproducible scripts','Chart interpretation and documentation']],
 java:['An object-oriented language used for applications and backend systems.',['Classes, interfaces and collections','Exception handling and debugging','Unit-test concepts and code organisation','Application design and documentation']],
 react:['A library for building interfaces from reusable components.',['Components, props and state','Forms and accessible interactions','Data loading and rendering behaviour','Debugging component workflows']],
 aws:['A cloud platform offering compute, storage and managed infrastructure services.',['Cloud architecture concepts','Identity and least-privilege principles','Deployment and monitoring workflows','Cost and resource assumptions']],
 docker:['A platform for packaging applications into containers.',['Dockerfile structure and images','Container networking and volumes','Reproducible development environments','Build and runtime troubleshooting']],
 matlab:['A numerical computing environment for engineering and analysis.',['Matrix operations and scripts','Numerical methods and plotting','Model interpretation','Validation and reproducible calculations']],
 solidworks:['A parametric CAD environment for parts, assemblies and drawings.',['Sketch constraints and features','Assembly relationships','Drawing and tolerance concepts','Design review and modelling workflow']],
 ansys:['An engineering simulation platform used to investigate physical behaviour.',['Boundary conditions and units','Meshing and convergence concepts','Material and load assumptions','Interpreting results and limitations']],
 autocad:['A CAD tool used for technical drafting and drawing organisation.',['Layers, blocks and dimensions','Drawing setup and units','Plotting and documentation','Draft review and consistency']],
 revit:['A building information modelling tool for coordinated building models.',['Model elements and families','Views, sheets and schedules','Coordination workflows','BIM model organisation']],
 etabs:['A structural analysis and modelling tool commonly used for building systems.',['Geometry and connectivity','Loads and support assumptions','Analysis checks and equilibrium','Result interpretation']],
 'staad-pro':['A structural analysis tool for modelling frames and related structures.',['Member definition and releases','Load cases and combinations','Support and unit checks','Analysis output review']],
 excel:['A spreadsheet tool for calculations, modelling and reporting.',['Formulas and lookup functions','Data validation and cleaning','Budget and scenario models','Charting and spreadsheet review']],
 'power-bi':['A business intelligence platform for data models and interactive reporting.',['Power Query transformation','Relationships and model structure','DAX measures and filter context','Accessible dashboards and KPI definitions']],
 quickbooks:['Accounting software for bookkeeping workflows and financial reporting.',['Bookkeeping concepts','Transaction categorisation','Reconciliation principles','Report interpretation']],
 'microsoft-project':['A scheduling tool for organising project tasks and resources.',['Work breakdown structures','Dependencies and critical paths','Resource and baseline concepts','Progress reporting']],
 jira:['A tool for issue tracking and collaborative project workflows.',['Issue organisation and boards','Workflow concepts','Backlog and sprint planning','Filters and reporting']],
 spss:['A statistical analysis environment for data management and research workflows.',['Variable definitions and coding','Descriptive statistics','Test assumptions and interpretation','Reproducible analysis documentation']],
 r:['A language and environment for statistical computing and graphics.',['Data import and transformation','Exploratory analysis and plotting','Statistical assumptions','Reproducible scripts and reporting']],
 stata:['A statistical software environment for data management and quantitative analysis.',['Do-file organisation','Data cleaning and validation','Model assumptions and diagnostics','Interpreting estimates responsibly']],
};

export const sampleDetails: Record<string, {objectives:string[];methodology:string[];outcomes:string[];downloads:{label:string;file:string}[];screenshots:{src:string;alt:string;caption:string}[]}> = {
 'python-data-analysis': {
  objectives:['Validate a small synthetic sales dataset.','Compare regional revenue without overstating the result.'],
  methodology:['Read the CSV and check required fields, missing values and numeric revenue.','Aggregate revenue by region and export a sorted summary.','Plot regional totals and document the limits of six synthetic observations.'],
  outcomes:['Recognise data-quality checks before analysis.','Explain a group-by aggregation and its limitations.'],
  downloads:[{label:'Python script',file:'python-analysis.py'},{label:'Synthetic sales CSV',file:'sales.csv'}],screenshots:[],
 },
 'cad-assembly-design': {
  objectives:['Identify assembly relationships in an invented bracket study.','Record assumptions before modelling or simulation.'],
  methodology:['Define illustrative base and upright dimensions.','Outline a part, constraint and interference review workflow.','List missing material, load and tolerance information.'],
  outcomes:['Understand why fully constrained geometry matters.','Distinguish a conceptual workflow from a verified manufacturing design.'],
  downloads:[{label:'Concept study notes',file:'cad-study.txt'}],screenshots:[],
 },
 'building-structural-model': {
  objectives:['Trace load paths in an idealised single-span beam example.','Check simple reactions and bending moments independently.'],
  methodology:['State geometry, units and a hypothetical uniform load.','Calculate idealised reactions and maximum moment.','Review modelling questions before accepting software results.'],
  outcomes:['Check equilibrium in a simple example.','Identify what a conceptual reference cannot establish about structural adequacy.'],
  downloads:[{label:'Structural study notes',file:'structural-study.txt'}],screenshots:[],
 },
 'financial-dashboard': {
  objectives:['Define revenue, direct costs and gross margin consistently.','Compare full-year and half-year synthetic figures.'],
  methodology:['Use one invented record per month for 2025.','Calculate period totals before calculating the margin.','Compare reporting periods and explain excluded operating costs.'],
  outcomes:['Distinguish gross profit from net profit.','Avoid averaging monthly margins to calculate a period margin.'],
  downloads:[{label:'Synthetic financial CSV',file:'financial-data.csv'}],screenshots:[],
 },
};

export const assistanceTypes = ['Tutoring & concept guidance','Debugging & technical review','Modelling & simulation guidance','Data analysis & reporting','Professional project assistance','Editing & documentation feedback'];
export const pricingPlans = ['Focused guidance','Project support','Professional support'];

// Adjacent disciplines for tools outside the four primary service categories.
export const adjacentServices:Record<string,string[]> = {
 'microsoft-project':['civil-engineering'],
 jira:['information-technology'],
 spss:['finance-accounting','information-technology'],
 r:['information-technology','finance-accounting'],
 stata:['finance-accounting'],
};
