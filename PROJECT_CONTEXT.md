# Global Study Support - Project Context and Handoff

Last updated: 26 October 2026 (Asia/Calcutta).

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

The four primary service disciplines are:

- Information Technology.
- Mechanical Engineering.
- Civil Engineering.
- Finance & Accounting.

Management and Statistics are additional software filter categories, not primary
service disciplines in this version.

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
- Four service detail pages with areas of support and relevant tools.
- Twenty software detail pages and a searchable, filterable directory.
- Four clearly labelled original demonstration entries in the sample portfolio.
- PDF previews and downloads, reference notes, Python code and synthetic data.
- An interactive financial reporting example with period selection.
- Light, Dark and System theme selection with locally saved preference.
- Responsive CSS layouts and a collapsible mobile navigation.
- Enquiry form validation, email preparation, copy and text download options.
- FAQ, Privacy Policy, Terms of Service, Academic Integrity and Image Credits.
- Page titles/descriptions, canonical URLs, sitemap and robots output.

Not implemented or not yet configured:

- Direct server-side enquiry submission to an inbox or CRM.
- Secure attachment uploads or persistent enquiry storage.
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
| Fonts | Plus Jakarta Sans for headings; Inter for body text, via Google Fonts |
| Rendering | Static export, `output: 'export'`, `trailingSlash: true` |
| Export directory | `out/` |
| PDF generation | Python 3 and ReportLab |
| PDF inspection used | PyMuPDF rendering followed by image inspection |

There are no API routes, server actions, database connections or application
environment variables required by the current implementation. Next image
optimisation is disabled for compatibility with the static export.

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

The header displays the emblem portion of the supplied square logo with text
beside it. The full original image remains in `public/logo.png`.

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

## 9. Enquiry behavior - important production limitation

The contact form is a static, browser-side email preparation flow. It does not
send an enquiry automatically and has no secure upload backend.

It collects name, email, category, service, optional software, optional deadline,
requirements, optional attachment selections and consent. It includes required
field validation, an email input, requirements length limits and a 10 MB per-file
selection limit. These are client-side checks, not server security controls.

Actions:

- Prepare Email Enquiry opens a `mailto:` URL for the configured business inbox.
- Copy details writes the prepared enquiry to the clipboard where available.
- Download enquiry saves the prepared text locally.
- Selected file names are included in the message. The files themselves remain
  on the visitor's device and must be attached manually in the email application.

Do not describe this as a working automatic submission or secure upload service.
Do not invent a WhatsApp number. Direct submission requires an agreed backend or
form provider, configuration/credentials and appropriate handling for uploads.

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

The export checker requires an existing `out/` from a successful build. It checks
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
- Manifest: `.openai/hosting.json`, static directory `out`.
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

## 12. Remaining work and useful next steps

1. Review the actual website in desktop and mobile browsers, including navigation,
   theme persistence, System theme changes, keyboard use and PDF fallbacks.
2. Review typography sizing, contrast and layouts against the user's premium
   design goals. Formal accessibility verification remains outstanding.
3. Obtain the verified WhatsApp number if that contact option is required.
4. Choose and configure a form backend/CRM and secure upload storage if direct
   submission is required. Update the UI and privacy content to match reality.
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
