# Global Study Support - Project Context and Handoff

Last updated: 26 October 2026 (Asia/Calcutta).

Current production-improvement work is documented in PRODUCTION_REPORT.md.
The site now has a server-side enquiry integration; sending stays unavailable
until delivery/security settings are configured. Preserve the design and the
single theme button. See the current architecture and enquiry notes below.

Read this file at the start of a new chat about this repository. It explains the
project's purpose, what has been implemented, the decisions behind it, and what
still needs attention. Check the current source and Git status before making
changes: this document is a snapshot and can become stale.

## 1. Project purpose and user requirements

Global Study Support is an academic and professional support website for
students, researchers and working professionals worldwide.

The final agreed initial scope is eight main pages, plus individual service,
software and sample pages. The user requested Next.js, TypeScript and Tailwind
CSS; a premium, international, light-first appearance; a fully supported optional
dark theme; a searchable software directory; and a prominent samples portfolio.

The original four service disciplines (preserved) are:

- Information Technology.
- Mechanical Engineering.
- Civil Engineering.
- Finance & Accounting.

The owner confirmed all eight categories and listed topics on 26 October 2026.
Management & Business, Statistics & Data Analytics, Academic Writing & Research,
and Professional Projects & Documentation are now main service disciplines.
See EXPANSION_REPORT.md and the expansion handoff below for the current state.

Explicit content and scope constraints:

- Use the supplied `Logo.png` from the workspace root.
- The user asked for images from Google/the web and explicitly said not to
  generate images. Implementation uses downloaded Pexels stock photographs,
  discovered through web search; it does not claim a Google Images-specific
  sourcing workflow. No AI image generation was used.
- No admin dashboard, admin authentication, blog or blog database in this phase.
- Store editable service, software and sample content in source files.
- Position academic support around tutoring, guidance, editing, debugging,
  feedback and original reference examples.
- Do not invent testimonials, client projects, credentials or business statistics.
- Clearly distinguish demonstration content from actual client work.

The user supplied the business email in chat:
`support@globalstudysupport.com`.
No WhatsApp number or form-provider/CRM configuration was supplied.

## 2. Current implementation status

The initial website implementation is complete and has been deployed as an
owner-private review site. This does not mean every requested production
integration is connected or that browser QA has been completed.

Implemented:

- Eight main pages with shared navigation and footer.
- Eight category pages and 45 topic-specific service pages with structured local data.
- Eighty unique software detail pages with multi-category search and filtering.
- Eleven preserved portfolio entries: four demonstrations and seven owner-supplied references.
- Preview-only sample pages with existing watermarks, code illustrations and financial demo.
  Original files remain private; older download descriptions later in this file are historical.
- An interactive financial reporting example with period selection.
- Light, Dark and System theme selection with locally saved preference.
- Responsive CSS layouts and a collapsible mobile navigation.
- Enquiry form validation, email preparation, copy and text download options.
- FAQ, Privacy Policy, Terms of Service, Academic Integrity and Image Credits.
- Page titles/descriptions, canonical URLs, sitemap and robots output.

Not implemented or not yet configured:

- Live email delivery credentials and a verified end-to-end delivery check (the server integration is implemented).
- Live attachment screening credentials (validated/scanned email attachments are implemented but disabled until configured). Persistent enquiry storage is intentionally not added.
- WhatsApp integration, because a verified number is missing.
- Admin, blog, database, payments, accounts or analytics.
- Native CAD, BIM, ETABS or Power BI downloadable project files.
- Real client portfolio projects or testimonials.

## 3. Technology and architecture

The application is in `website/` beneath the original workspace directory.

| Technology | Current declaration / use |
| --- | --- |
| Next.js | 16.4.3, App Router |
| React / React DOM | 19.2.4 |
| TypeScript | ^5.9.3, strict checking |
| Tailwind CSS | Version 4 with `@tailwindcss/postcss` |
| Styling | Global CSS, semantic theme variables and custom component classes |
| Icons | `lucide-react` |
| Fonts | Plus Jakarta Sans for headings; Inter for body text, locally hosted WOFF2 |
| Rendering | Native Next server by default; exported Next frontend with shared Worker backend for Sites |
| Export directory | `out/` |
| PDF generation | Python 3 and ReportLab |
| PDF inspection used | PyMuPDF rendering followed by image inspection |

The dynamic /api/enquiries/ endpoint is implemented in app/api/enquiries/route.ts
and delegates to server/enquiries.mjs. Native production uses npm run build and
npm start. Sites uses npm run build:sites to combine the same exported frontend
with the shared backend in a Worker. No database or server actions are used.
Delivery/security environment settings are listed in .env.example. Image assets
are pre-optimised responsive WebP files and served without a runtime optimiser.

The installed Next.js version includes local documentation at
`node_modules/next/dist/docs/`. Follow the generated Next.js guidance in
`AGENTS.md` and read relevant local guides when changing framework behavior.

## 4. Routes and page responsibilities

| Route | Purpose |
| --- | --- |
| `/` | Hero, service cards, software links, featured demonstrations, process and enquiry CTA |
| `/about/` | Purpose, approach, mission, vision and commitments |
| `/services/` | Four disciplines with expandable support topics |
| `/software/` | Search and category-filtered software directory |
| `/samples/` | Search and category-filtered demonstration portfolio |
| `/how-it-works/` | Requirements, consultation, guidance and follow-up |
| `/pricing/` | Three quotation-based support options and pricing factors |
| `/contact/` | Enquiry form and configured business email |
| `/services/[slug]/` | Individual discipline details |
| `/software/[slug]/` | Tool-specific support information |
| `/samples/[slug]/` | Demonstration overview, downloads and PDF preview |
| `/faq/` | Common questions and academic support boundaries |
| `/privacy/` | Form, local preference and external-service information |
| `/terms/` | Website and proposed service expectations |
| `/academic-integrity/` | Permitted assistance and integrity commitments |
| `/image-credits/` | Stock image provenance and illustration disclosures |
| `/sitemap.xml` | Main, service, software, sample and policy URLs |
| `/robots.txt` | Crawl rules and sitemap reference |

Main and policy page content is rendered through `app/[page]/page.tsx`; specific
service, software and sample routes each have their own detail-page template.
`generateStaticParams` enumerates these routes at build time.

## 5. File map and where to make changes

| File / directory | Responsibility |
| --- | --- |
| `AGENTS.md` | Agent entry point; contains a pointer to this handoff |
| `README.md` | Short setup, editing and launch instructions |
| `PROJECT_CONTEXT.md` | Detailed project memory; keep current |
| `package.json`, `package-lock.json` | Commands and dependency versions |
| `next.config.ts` | Static export, slash handling and image configuration |
| `postcss.config.mjs` | Tailwind PostCSS integration |
| `app/layout.tsx` | Shared shell, metadata, fonts and initial theme script |
| `app/globals.css` | Theme tokens, typography, components and responsive CSS |
| `app/page.tsx` | Homepage composition and copy |
| `app/[page]/page.tsx` | Main pages, FAQ, policy and credit content |
| `app/services/[slug]/page.tsx` | Service detail template |
| `app/software/[slug]/page.tsx` | Software detail template |
| `app/samples/[slug]/page.tsx` | Sample details and embedded PDF containers |
| `app/not-found.tsx` | Custom 404 page |
| `app/robots.ts`, `app/sitemap.ts` | Static SEO outputs |
| `lib/data.ts` | Services, software, sample entries, process steps and FAQs |
| `components/site.tsx` | Header, footer, brand, theme control, cards, CTA and shared previews |
| `components/theme-toggle.tsx` | Single-button Light / Dark / System theme cycle |
| `components/directory.tsx` | Search, filters, result counts and empty states |
| `components/enquiry.tsx` | Contact form, validation and email/copy/download behavior |
| `components/financial-demo.tsx` | Interactive synthetic financial metrics |
| `public/logo.png` | Copy of the user-supplied brand image |
| `public/images/` | Local stock photos: hero, IT, mechanical, civil and finance |
| `public/samples/` | PDFs, notes, code and CSV downloads |
| `scripts/create-samples.py` | Rebuild reference PDFs and supporting downloads |
| `scripts/check-export.mjs` | Check local link/asset targets in exported HTML |
| `.openai/hosting.json` | Existing Sites identity and static hosting directory |

`node_modules/`, `.next/`, `out/`, `tmp/`, environment files and TypeScript build
cache are ignored. Do not put secrets into any tracked file.

## 6. Visual design and theme behavior

The direction is spacious, minimal, blue-led and professional. The homepage uses
an asymmetric photograph-led hero, service imagery, a software section, sample
previews and a four-step process. Gold is a restrained decorative accent.

| Token purpose | Light | Dark |
| --- | --- | --- |
| Background | `#F7F9FC` | `#0F172A` |
| Surface | `#FFFFFF` | `#1E293B` |
| Heading | `#172033` | `#F1F5F9` |
| Secondary text | `#526174` | `#CBD5E1` |
| Border | `#E2E8F0` | `#334155` |
| Primary | `#2563EB` | `#2563EB` |
| Teal text/accent | `#0D7F75` | `#5EEAD4` |

Brand navy is `#142B49`; decorative gold is `#D4A64A`. Light teal was adjusted
from the brief's `#0D9488` to a darker text/accent tone. Do not interpret that as
proof of a complete accessibility contrast audit.

Theme selection is stored under `gss-theme` in localStorage. Light is the default;
System follows `prefers-color-scheme`. A script in the root layout applies the
saved choice before the page renders to reduce flashes of the wrong theme.
The header now uses one circular icon button instead of a dropdown. Clicking
cycles Light -> Dark -> System -> Light. The sun, moon or monitor icon indicates
the current setting; the accessible label and tooltip describe the next action.
Keyboard activation uses the native button behavior. If browser storage is
unavailable, switching still works for the current visit.

Implemented accessibility provisions include semantic landmarks, a skip link,
visible focus outlines, labelled inputs, native validation, filter pressed states,
live result/status text, reduced-motion CSS and alternative image descriptions.
WCAG AA compliance and cross-browser usability have not been formally audited.

The header displays an optimised local brandmark.webp derived from the supplied
logo, with readable text beside it. The full source remains in public/logo.png
and the original workspace Logo.png. A favicon derived from that emblem exists.
Inter and Plus Jakarta Sans are now locally hosted variable WOFF2 fonts with
OFL licences in public/fonts; the browser no longer requests Google Fonts.
Dark-theme link text uses #8AB4FF for normal-text contrast against dark surfaces.

## 7. Software directory and service content

Initial catalogue of 20 tools:

- IT: Python, Java, React, AWS, Docker.
- Mechanical: MATLAB, SolidWorks, ANSYS.
- Civil: AutoCAD, Revit, ETABS, STAAD.Pro.
- Finance: Excel, Power BI, QuickBooks.
- Management: Microsoft Project, Jira.
- Statistics: SPSS, R, Stata.

Search and category filters work together in the client component, update the
result count, and provide a reset option when no results match. Tool detail pages
link to enquiries with tool/category query parameters that prefill the form.

This catalogue came from the user's proposed list; actual team capabilities and
supported software versions have not been independently verified. The website
states that scope and availability are confirmed during consultation.

## 8. Portfolio and demonstration downloads

All four entries are original learning demonstrations, not client engagements:

| Sample slug | Available material |
| --- | --- |
| `python-data-analysis` | PDF, executable Python example and `sales.csv` |
| `cad-assembly-design` | Conceptual bracket reference PDF and `cad-study.txt` |
| `building-structural-model` | Conceptual frame reference PDF and `structural-study.txt` |
| `financial-dashboard` | Financial reference PDF, `financial-data.csv` and browser metric demo |

The Python example uses pandas and Matplotlib to validate data, aggregate regional
revenue and export a CSV and bar chart. Those packages are needed to run the
downloaded demonstration, not to run the website.

The financial demo uses synthetic 2025 data: full-year revenue is GBP 128,000,
direct costs GBP 79,600 and gross margin approximately 37.8%. First-half and
second-half filters show the corresponding totals. These are invented figures,
not Global Study Support financial results.

Engineering entries are conceptual study notes. Do not claim that native CAD/BIM
models, verified engineering designs or construction-ready documents exist.
Stock photos are labelled as illustrative. Code/dashboard interface previews
are original code-rendered elements, not screenshots of completed client work.

Regenerate the PDFs/downloads from the project directory with:

```powershell
py -3.10 scripts/create-samples.py
```

Use a suitable Python 3 executable on other machines. The bare `python` command
on the original authoring machine resolved to an old MGLTools interpreter, so
`py -3.10` was used. ReportLab generates the files; PyMuPDF was used to render
them for inspection. The initial PDFs were all one page and visually checked.

## 9. Current enquiry implementation

Read server/enquiries.mjs, components/enquiry.tsx, .env.example and README.md.

- GET /api/enquiries/ returns public availability, site key and attachment flag.
- POST validates origin, bounded multipart body, fields/enums, deadlines, consent,
  a honeypot and a server-verified Turnstile token (hostname and action included).
- Rate limiting is in memory per process/isolate; a shared edge limit is still
  needed before scaling publicly. Trust forwarded IP headers only at a controlled proxy.
- Resend is called via fetch with a configured sender/recipient, validated reply-to
  address, plain-text body and deterministic idempotency key.
- A provider receipt is required for success. The message states provider acceptance
  for delivery, not guaranteed arrival. Failures retain the visitor's input.
- Name, email, category, assistance, software, deadline, description and optional
  pricing plan are captured. Service/software/plan query prefills are supported.
- Attachments remain disabled until a scanner URL and API key are configured.
  One PDF/PNG/JPEG/UTF-8 TXT/CSV, maximum 3 MB, is checked by size/signature/type
  and must receive a clean response from the HTTPS scanner before forwarding.
  No public download URL or persistent upload storage is created.
- Email-app preparation, copy and text-download alternatives remain available.
- Missing credentials produce an unavailable state. No API key or WhatsApp number
  was invented and no real delivery has been tested.

Required server settings: ENQUIRY_ALLOWED_ORIGIN, ENQUIRY_TO_EMAIL,
ENQUIRY_FROM_EMAIL, RESEND_API_KEY, TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY.
Optional screening: ATTACHMENT_SCAN_URL, ATTACHMENT_SCAN_API_KEY.
Public build configuration: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_CONTACT_EMAIL.
Never put delivery secrets in NEXT_PUBLIC_ variables, tracked files or output.

## 10. Local development and checks

Run commands from `website/`:

```powershell
npm install
npm run dev
```

The usual development URL is `http://localhost:3000`. The development server
started in the initial implementation session was stopped after deployment.

```powershell
npm run build
npm run typecheck
node scripts/check-export.mjs
```

Run npm test for the Node/tsx/jsdom suite. There is no configured lint script.
Run npm run build:sites for the Sites artifact, then node scripts/check-worker.mjs.
Do not run native and Sites builds simultaneously because they share .next/.

The export checker requires an existing `out/` from a successful Sites build. It checks
local `href` and `src` targets; it is not a browser interaction or accessibility
test. Rebuild after changing public assets so the export contains those changes.

Initial implementation validation on 26 October 2026:

- Production build passed; Next.js reported 45 generated pages/routes.
- TypeScript check passed.
- Export link/asset checker passed across 44 HTML files. The count differs from
  the build because these commands count different outputs.
- Local homepage HTTP request returned 200.
- Four PDF reference files were rendered and visually inspected.
- Main hero and mechanical photographs were visually inspected.
- Browser UI checks were unavailable: connected browser/app inventory was empty.
- No desktop/mobile screenshots or live interaction checks were completed.

The initial build emitted a warning about ignoring a parent home-directory
`package-lock.json`. It did not prevent a successful build. If addressing the
warning, read the installed Next.js guidance before changing `turbopack.root`.

This documentation-only handoff update does not imply these checks were rerun.

## 11. Deployment and existing Site identity

The initial version was published through the Sites plugin as an owner-private
review site. Preserve this identity when updating; do not create a duplicate Site.

- URL: `https://global-study-support.patelprincem2000.chatgpt.site`
- Project ID: `appgprj_6adeefd92d4c819182845181794da57a`
- Manifest: `.openai/hosting.json`. The current source removes static configuration because the Sites build now includes the backend Worker. The original deployment was static.
- Initial pushed source commit: `1e60aa7359b1074ef02f8a9dbfa6479179d0fe0e`.
- Initial saved version:
  `appgprj_6adeefd92d4c819182845181794da57a~appgver_a1c9e0af03dc8191b28b5b5bfe456677`.
- Initial deployment ID: `appgdep_6adef2fcbc048191afbc249e6699d0ec`.
- The deployment tool returned `succeeded` with the URL above.
- The initial deployment archive was created beside `website/` as
  `global-study-support.tar.gz`.

These are historical facts, not a live deployment status check. The custom
business domain has not been connected. Owner-private deployment is not a public
customer launch. Read the current Sites skill and access state before future
publication; preserve the current audience unless the user requests a change.
Obtain fresh source credentials through the tools when needed. Never put
credentials or tokens into this document, source files, command output or Git.

The handoff documentation was added after the initial deployment. A subsequent
source publication can include it alongside feature updates; consult the latest
deployment record rather than assuming the initial commit is still current.

### Theme button update - 26 October 2026

- The user disliked the theme dropdown and requested a button control.
- Replaced the dropdown, popup state and dismiss overlay with a circular theme
  button in `components/theme-toggle.tsx`, connected through the shared Header.
- Removed obsolete dropdown CSS and added theme-aware button styling.
- Preserved all three preferences and the existing localStorage key.
- Prevented the initial client effect from applying a temporary default theme
  while the saved preference is being loaded.
- Browser inventory was checked again; no connected browser was available, so
  interactive/visual browser verification remains outstanding.
- Production build passed, including TypeScript validation and 45 generated
  pages/routes. Exported links/assets passed across 44 HTML files.
- `git diff --check` passed; Git emitted only line-ending conversion notices.

### Production improvement update - 26 October 2026

- Expanded all four service pages with structured overviews and FAQs and all 20
  software pages with specific topics. Added Python/React logos with notices.
- Sample detail pages now show structured objectives, methodology and learning
  outcomes; PDF/download controls require actual files. No real screenshots were
  fabricated. The private sample/ folder of Word source documents is ignored and
  excluded from publication pending owner permission/content/privacy review.
- Added quote-plan prefills and server-side enquiries as described in section 9.
- Optimised photos, brand emblem and favicon; self-hosted fonts; added response
  security headers, active navigation attributes and mobile Escape/focus support.
- Added DOM interaction and backend tests using test-only tsx/jsdom/@types/jsdom.
  No runtime dependencies, admin, login, blog or payments were added.
- 18 tests passed, native and Sites production builds passed, TypeScript passed,
  44 exported HTML pages passed the asset/link check, Worker smoke checks passed,
  and native production HTTP smoke checks passed. Production npm audit reported
  zero vulnerabilities. No lint script exists, so no lint pass is claimed.
- Browser inventory remained empty: real viewport/console/Core Web Vitals checks
  are outstanding. DOM tests cover controls and theme hydration, not real layout.
- See PRODUCTION_REPORT.md for changed file groups, exact checks, limitations and
  prerequisites. See README.md for native/Sites build and secret setup instructions.

## 12. Remaining work and useful next steps

1. Review the actual website in desktop and mobile browsers, including navigation,
   theme persistence, System theme changes, keyboard use and PDF fallbacks.
2. Review typography sizing, contrast and layouts against the user's premium
   design goals. Formal accessibility verification remains outstanding.
3. Obtain the verified WhatsApp number if that contact option is required.
4. Configure the implemented Resend/Turnstile integration and optional scanner;
   verify real provider acceptance and delivery. Add shared edge abuse limits
   before scaling publicly. UI/privacy now describe the actual integration.
5. Confirm supported tools, service availability and business policy details with
   the owner before public launch.
6. Add authorised original portfolio work and native project files if available;
   preserve clear distinctions between demonstrations and client case studies.
7. Connect the preferred domain and set the desired audience when requested.
   Update hard-coded origin URLs in metadata, sitemap and robots if it changes.

Do not add a blog, dashboard, authentication or database simply because these
were mentioned as possible later phases. They were explicitly excluded from the
current phase.

## 13. Instructions for maintaining this handoff

After meaningful work, update the relevant sections rather than leaving
contradictory historical claims. Record:

- What changed and why.
- Features added, changed or removed.
- Files or integrations involved.
- Checks actually performed and their results.
- Unverified behavior and remaining limitations.
- Deployment version/status only when verified by a tool.

Keep README concise and this file comprehensive. Keep AGENTS.md's pointer to
this file outside the generated Next.js rules block. Never treat a to-do item
as completed merely because it is described here.

New files to know: lib/details.ts, lib/config.ts, lib/search.ts, lib/sample-files.ts,
components/photo.tsx, components/software-mark.tsx, server/, tests/,
scripts/build-sites.mjs, scripts/check-worker.mjs, PRODUCTION_REPORT.md and .env.example.

## Latest verified deployment

The production-improvement update was deployed successfully on 26 October 2026.
The native tool returned `succeeded` and the existing URL:
https://global-study-support.patelprincem2000.chatgpt.site

- Pushed runtime source: `494ea5aa06744bd2d3182d41b4d8c226b055b344`.
- Version: `appgprj_6adeefd92d4c819182845181794da57a~appgver_774b19c64d7481918d3bf27daaf5edec`.
- Deployment: `appgdep_6adf04c6f23881919ca97bdc7463ed74`.
- Audience preserved as owner-private. Runtime environment revision was zero;
  email/security credentials were not configured by this task.
- Archive: `../global-study-support-production.tar.gz`.

Both final builds, all 18 tests, the 44-page exported-link/asset check and the
Worker smoke check passed inside the source-packaging workflow before publication.
This local deployment record was written after publication; it does not change
the runtime artifact from the commit above. No real email or public launch was
performed. Browser inventory was empty; remaining verification is listed in
PRODUCTION_REPORT.md.

## Watermarked preview and software image update - 26 October 2026

The owner explicitly authorised converting the Word sample folder and requested
watermarks, no DOCX publication, no download buttons, and preview-only viewing.
This supersedes earlier notes about downloadable portfolio files and holding the
Word reports pending approval.

- All 20 software entries use locally stored sourced PNG logo/product/vendor
  images, with vector sources/notices retained. STAAD.Pro uses the Bentley vendor
  mark (not a claimed STAAD-specific application icon).
- Seven Word reports were converted locally; the existing four demos were also
  watermarked. 11 image-only PDFs contain 141 pages in total.
- PDFs are stored in ignored output/pdf/, with no text layer and PDF copy/print
  permissions disabled. Original Word sources remain unchanged in ignored sample/.
- Only watermarked page WebP files in public/previews/ are served. The custom
  components/sample-preview.tsx viewer has page selection and zoom, no native PDF
  toolbar/download link, no text layer and non-draggable page images.
- Source DOCX, PDF, code and CSV files were removed from public/samples/ and kept
  in private/reference-source/ where applicable. The source generator now writes
  there, and the Sites builder rejects exposed raw sample documents.
- Seven new owner-reference cards are separate from four original demonstrations;
  descriptions do not claim verified client work. Management is filterable.
- Explicit student identifier lines and text emails are redacted from viewing
  copies, and PDF metadata is replaced. No claim of a forensic privacy audit or
  rights verification for embedded third-party images is made.
- Absolute copy protection is impossible for displayed content: screenshots,
  OCR and determined asset extraction remain possible. Do not tell the owner
  otherwise. These restrictions also limit screen-reader access to full report
  text; page summaries and report descriptions remain available.
- Conversion scripts: scripts/prepare-previews.py, plus local headless Word/LO
  conversion to tmp/word-pdf/. The signed LibreOffice converter was extracted only
  into the ignored temporary workspace after Word export stalled.
- Current tests cover 11 samples, 20 image assets, preview navigation/zoom and
  absence of public raw documents. Current validation/deployment results follow
  when the task completes.

Preview update validation: 19 tests passed; TypeScript passed; exported links and
assets passed across 51 HTML pages. All 11 local PDFs were checked to contain no
extractable text and to disable PDF copy/print permissions. Full-page first/last
renders and contact sheets covering all 141 pages were visually inspected.
The source sample folder changed externally during the task from the original
seven DOCX files to seven *_watermark.pdf files. This task did not delete or
replace those source files. Conversion used the earlier DOCX snapshot; originals
were never published. The converted raw PDFs in ignored tmp/word-pdf/ allow
regeneration without the Word files. The temporary converter/installer cleanup
was rejected by automatic approval review (generic blocked-by-policy reason),
so ignored tmp/tools/ remains local and is excluded from source/publication.

Preview update publication completed on 26 October 2026:
- Native production build, Sites build, all 19 tests, TypeScript, 51-page export checks and 25-route/asset Worker checks passed.
- Deployment status: succeeded; existing owner-private audience preserved.
- URL: https://global-study-support.patelprincem2000.chatgpt.site
- Source commit: 794b2d0302889f9680ce5ff5ddcc7ddd27d2c4f6
- Saved version: appgprj_6adeefd92d4c819182845181794da57a~appgver_e58ae5096f048191865ffb3e3cb99b72
- Deployment: appgdep_6adf132c67f48191b805a1fafe14f2ba
- This deployment record was appended locally after publication. No live browser interaction test or real email delivery was performed.

26 October 2026 label refinement: removed the word Watermarked from sample headings, loading text, captions, descriptions, deliverable labels and accessible image labels at the owner's request. Document watermark images, PDF restrictions and preview-only behavior remain unchanged.
Label refinement validation: all 19 tests passed; Sites production build and TypeScript passed; 51-page link/asset check and 25-route Worker smoke checks passed. Published successfully with owner-private access preserved. Commit c524b27387ae2c2ccad8e8effde3abe1d5a6e096, deployment appgdep_6adf22fcfbd08191aafea8044ed34b56. This result note was appended locally after publication.


## Expansion handoff ? 26 October 2026

Owner confirmation: all eight requested service categories and listed topics are
supported. No independent certifications or vendor affiliations are claimed.

- lib/service-catalog.ts defines eight-category additions and 45 topic-specific
  offerings, their topics, preparation guidance, deliverables, FAQs and exact
  related sample slugs. published=false excludes a candidate; an unpublished
  parent category also excludes its offerings. unpublishedServiceCandidates is
  reserved for future unconfirmed entries and is empty for this confirmed scope.
- lib/data.ts retains the four original categories, original 20 software records
  and all 11 samples. It combines expanded catalogues without duplicate slugs.
- lib/software-catalog.ts adds 60 tools (80 total), primary source links and
  explicit multiple categories. lib/search.ts supports categories and topics.
- components/service-directory.tsx adds eight category cards, keyword search,
  category buttons and reset/empty states. Existing header and theme reused.
- app/services/[slug]/page.tsx renders 8 categories plus 45 useful subservices.
  Existing service slugs remain. Related samples are links to existing entries.
- Academic writing, research planning, methodology, referencing, formatting and
  editing are services. lib/academic.ts and components/academic-support.tsx
  explain nine citation styles and distinguish font choice, layout and citation
  conventions. Original citation illustrations use Darwin's historical book;
  they are educational examples, not invented portfolio projects.
- Software detail routes retain the original 20 slugs and link to directly
  relevant services and samples that explicitly use the named tool. Security
  tools are described for authorised educational/defensive use.
- 32 additional Devicon icons (52 sourced marks total) are locally rasterised.
  All others use a neutral AppWindow icon. React Native uses the React symbol.
  Sources/licence retained in public/software-logos; no AI images generated.
- components/enquiry.tsx adds category-aware specific services, academic/research/
  professional context, optional reference style and formatting requirements.
  Service and software CTAs prefill the existing form. Changing category clears
  a stale service selection. Academic fields appear for writing or research work.
- scripts/sync-enquiry-options.ts generates lib/enquiry-options.json from TS
  catalogues for server validation. Run npm run sync:catalog after content edits.
  npm prebuild/prebuild:sites/pretest run it automatically. Never hand-edit JSON.
- server/enquiries.mjs validates category/service compatibility, context and
  bounded academic fields and includes them in the Resend email body. Existing
  receipt-based success, origin checks, Turnstile, honeypot, rate limit and scanned
  attachments are preserved. No real email was sent by the implementation.
- The standalone Sites Worker now packs repeated HTML/RSC text as a compressed
  fragment dictionary, lazily reconstructs exact bytes and negotiates gzip.
  Binary assets, especially portfolio previews, are unchanged. The original
  separately compressed page copies exceeded the hosting budget; dictionary
  packing fits the existing 9.5 MiB budget without lowering image quality.
- No blog, admin, authentication, payments or new application dependency added.

Portfolio preservation: no changes to app/samples/[slug]/page.tsx,
components/sample-preview.tsx, lib/owner-samples.ts, lib/preview-manifest.json,
sample images or private source files. Existing shared directory controls/cards
are reused. The previous preview-only/no-public-download requirements remain.

Validation and publication are recorded in EXPANSION_REPORT.md. No connected
browser was available (empty browser/app inventory); DOM tests and static checks
cannot establish real-device layout, absence of every console warning or full
WCAG conformance. Email/Turnstile and optional scanner credentials remain needed.

## Final publication result

Published successfully on 26 October 2026, preserving owner-private access.
URL: https://global-study-support.patelprincem2000.chatgpt.site
Source commit: 7e908e9bc4709c0d564e41abcb799fce840d45af
Saved version: appgprj_6adeefd92d4c819182845181794da57a~appgver_3c446888fe008191816a2915fed51274
Deployment: appgdep_6adf2964d9508191bac29598d6b53461

Final validation: npm test passed all 25 tests; npm run build passed; npm run
typecheck passed independently. The final Sites package passed its production
build, TypeScript, 159-file link check, 156-page SEO check and lossless comparison
of every one of 1,040 assets. Final gzip Worker size was 9,305 KB. A transient
Windows process-cleanup EPERM during the first packaging attempt was resolved
by retrying; no code workaround or permission change was required. No lint script
is configured. Browser/device QA and real email delivery remain unverified.

This publication record was appended locally after the deployed source snapshot.


26 October 2026 - Software More disclosure: all 80 software records remain.
The directory now shows the 52 entries with sourced logos in the main grid.
The 28 fallback-icon entries are in a native, collapsed More disclosure, opened
by click or keyboard. Search/category filters apply to both groups. A search
with only fallback entries points to More; changing results resets it closed.
Logo availability comes from hasSoftwareLogo in components/software-mark.tsx,
so adding an actual logo automatically promotes the entry into the main grid.
Sample cards, filters, detail pages and previews were not changed.
Software More update validation: all 25 tests passed, including collapsed/default groups, open/close and a search matching only an entry inside More. Production build/TypeScript passed, links checked across 159 HTML files, all 1040 Worker assets verified losslessly. Published with owner-private audience preserved: commit f9c6410aea054b89215305f9b3dffdb59981c472; deployment appgdep_6adf2c2445c8819180cd6dc8e53bd3fa succeeded. This deployment note was appended locally after publication.


26 October 2026 - Relevant service photography: the eight service cards now use
unique subject-specific images. Kept IT coding and civil architecture; six new
Pexels photos show CNC manufacturing, financial paperwork/calculator, business
planning, statistical charts, writing/research notes and project document review.
lib/service-photos.json records source URLs, photographers, image names and alt
text. lib/data.ts maps these only to service categories. Service cards and category
detail pages reuse the same relevant imagery. Photo supports correct intrinsic
sizes and responsive WebP variants. Image credits list all new sources. Original
photos remain in place for existing portfolio illustrations; sample data and
preview assets were not changed. No AI-generated images were used.


26 October 2026 - Professional policy expansion: lib/policies.ts stores structured
Privacy Policy and Terms of Service copy, rendered by components/policy-document.tsx
on existing /privacy/ and /terms/ routes. Includes revision date, section links,
readable data-category table, enquiry/attachment/provider handling, retention
criteria, localStorage, conditional privacy rights, security and contact details;
terms cover scope, academic integrity, authorised security use, quotations,
revisions, cancellation and mandatory rights, IP, professional limits and disputes.
Provider links and regulator guidance were checked; no compliance certification,
fixed refund rule, invented legal entity, country, jurisdiction or retention period
was asserted. The owner was asked for business identity/country and retention
schedule; those details and jurisdiction-specific review remain outstanding until
confirmed. Existing business email, policy/footer links and form are preserved.
