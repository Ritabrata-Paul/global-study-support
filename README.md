# Global Study Support

Eight-page academic and professional services website built with Next.js 16, TypeScript, React and Tailwind CSS 4. Includes service and software detail pages, an illustrative portfolio, policy pages and FAQ.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` for the static export in `out/`. Run `npm run typecheck` to check types.

## Edit content

- `lib/data.ts`: services, 20 software tools, demonstrations, FAQs and process steps.
- `app/page.tsx`: homepage.
- `app/[page]/page.tsx`: main pages and policies.
- `app/globals.css`: design tokens and responsive layouts.
- `public/logo.png`: supplied logo. The header displays its emblem alongside accessible brand text.
- `public/images`: locally stored Pexels photos; see the website's image credits page.
- `public/samples`: downloadable reference PDFs, code, notes and synthetic datasets.
- `scripts/create-samples.py`: regenerate references with Python 3 and reportlab.

Light is the default. Light, Dark and System preferences are available in the header and saved in localStorage.

## Enquiries and launch configuration

The configured business address is support@globalstudysupport.com. The form validates fields and prepares a mailto enquiry; it does not send an email or upload files. Visitors can copy or download their enquiry and manually attach files in their email app. For direct inbox submission and secure uploads, connect a backend or form service with appropriate credentials, validation, rate limiting and storage controls. No unconfigured service is presented as working.

No WhatsApp number was supplied, so no WhatsApp button is shown. Add the verified business number before enabling that channel.

The software list is an initial catalogue from the brief, with scope and availability confirmed on enquiry. Portfolio entries are original conceptual demonstrations, not client work. No native SolidWorks, ETABS, Revit or Power BI project files are claimed. Replace or extend these entries with approved original portfolio work when available.

No admin, authentication, blog, payment collection, database or analytics is included.

## Verification

Production build and TypeScript checks passed. Reference PDFs were rendered and visually checked. Browser UI verification could not run because no browser was connected in the authoring session. Review mobile layouts, keyboard interactions, theme preferences, PDF rendering and email-app behavior in your target browsers before public launch.
