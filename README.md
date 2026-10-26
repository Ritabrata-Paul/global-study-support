# Global Study Support

Existing Next.js 16 / TypeScript / Tailwind CSS website, improved in place.
No admin, blog, authentication, database or payment gateway was added.

## Local development

Run from this directory with Node.js 22 or later:

~~~powershell
npm install
npm run dev
~~~

Open http://localhost:3000. The enquiry form checks server availability and
provides email/copy/download alternatives while delivery is unconfigured.

## Production server

~~~powershell
npm run build
npm start
~~~

The default build is a native Next.js server with a dynamic /api/enquiries/
endpoint. Static exports alone cannot receive enquiries.

## Configure delivery

Copy .env.example to .env.local for local development and fill the server settings.
For hosting, set the same names in the hosting provider's secret/environment
settings. Never commit secrets or prefix delivery credentials with NEXT_PUBLIC_.

Required for online sending:

- ENQUIRY_ALLOWED_ORIGIN: exact public origin, with no trailing slash.
- ENQUIRY_TO_EMAIL: recipient inbox; the owner supplied support@globalstudysupport.com.
- ENQUIRY_FROM_EMAIL: sender email verified with Resend (plain email address).
- RESEND_API_KEY: server-only delivery key.
- TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY: keys valid for the website hostname.

Public branding/metadata configuration: NEXT_PUBLIC_SITE_URL and
NEXT_PUBLIC_CONTACT_EMAIL. Public values are used when the pages are built; rebuild
if changing them. The contact email default was supplied by the owner.

Uploads are optional and disabled until ATTACHMENT_SCAN_URL and
ATTACHMENT_SCAN_API_KEY are set. The scanner contract is HTTPS POST of raw file
bytes with a Bearer token; it must return JSON {"clean":true} only for a clean file.
The handler checks size, extension, type and signature before scanning. One PDF,
PNG, JPEG, UTF-8 TXT or CSV up to 3 MB is allowed; no public URL is created.

The handler checks origin, request size, consent, fields, security token hostname
and action; applies a honeypot and a temporary per-runtime rate limit; and sends
plain-text email through Resend with an idempotency key. It reports provider
acceptance only after a receipt is returned. This does not guarantee inbox arrival.
Failures retain the visitor's form details. Tests mock all external calls and do
not send messages. Real provider delivery still needs an owner-configured test.

For multiple instances, apply a shared rate limit at the hosting firewall/API
edge in addition to the in-memory limit. ENQUIRY_TRUST_PROXY must be true only
behind a proxy that overwrites forwarded IP headers; otherwise native Next.js
uses a conservative shared rate bucket. Sites uses its Cloudflare client IP.

## Existing Sites deployment

The project identity is retained in .openai/hosting.json. The host now needs a
Worker rather than a static-only manifest so the server endpoint can run.

~~~powershell
npm run build:sites
node scripts/check-export.mjs
node scripts/check-worker.mjs
~~~

This builds the same Next.js pages as a static frontend and bundles them with
the shared Web-API enquiry handler into dist/server/index.js. The native Next
API route is excluded only during that frontend export. Sitemap/robots are
emitted by the Sites builder. Assets are embedded with gzip and caching metadata,
without a runtime bundler dependency. The builder enforces a 9.5 MB gzip size
budget and rejects raw DOCX/PDF sample files in the export. It omits unused
full-size source logo/JPEG assets from the hosted bundle. Move assets to native
bindings/CDN storage before significant growth.
Do not run native and Sites builds simultaneously: they share .next/.

Use the Sites skill and source helper to package and publish, preserve the existing
Site ID and audience, and never put runtime credentials in the hosting manifest.

## Edit content

- lib/data.ts: existing categories, tools, sample cards, FAQs and process steps.
- lib/details.ts: detailed service/tool content, sample objectives, methodology,
  learning outcomes, optional screenshots and download definitions.
- app/[page]/page.tsx: main pages, pricing and policies.
- app/globals.css: existing design tokens and responsive rules.
- components/site.tsx: shared header/footer, cards and CTA.
- components/theme-toggle.tsx: circular Light -> Dark -> System button.
- components/enquiry.tsx: frontend enquiry states and prefills.
- server/enquiries.mjs: validation, abuse checks, screening and delivery.
- public/samples/: four original learning references and actual downloads.

The portfolio is preview-only. Seven owner-supplied Word reports have been
converted to watermarked image-only PDFs, alongside the four original reference
demonstrations (11 PDFs / 141 pages). Local PDFs are in output/pdf/ and remain
outside public/ and Git. The website serves watermarked WebP pages through a
custom page/zoom viewer; no DOCX, raw PDF, code, CSV or sample download buttons
are published. Original documents remain unchanged in ignored sample/.

scripts/prepare-previews.py creates the watermarked PDFs and public page renders
from local converted PDFs in tmp/word-pdf/. It requires PyMuPDF and Pillow.
The current Word conversions were performed locally with a signed, extracted
LibreOffice runtime after Word automation stalled. No external conversion service
received the documents. Explicit student identifier fields and text emails are
redacted in viewing copies; document metadata is replaced before publication.

PDFs have no text layer and copying/printing permissions are disabled. The web
viewer has no PDF toolbar or download action, no selectable report text, and
prevents dragging/context-menu copying inside the preview. These controls do not
prevent screenshots, OCR or determined extraction of displayed content. Do not
promise absolute copy protection.

New preview metadata: lib/owner-samples.ts and lib/preview-manifest.json.
All 20 software entries now show sourced image assets; STAAD.Pro currently uses
the Bentley vendor mark, identified as such in asset notices. Existing demo
cards remain; owner-supplied reports are labelled separately and Management is
available as a portfolio filter.

Photography, fonts, logo and icon assets are hosted locally. Font licences are in
public/fonts/; software logo notices are in public/software-logos/. Other software
retains text identifiers until approved logo assets are available.

## Validation

~~~powershell
npm test
npm run typecheck
npm run build
~~~

The tests use Node test runner, tsx and jsdom (development-only). They cover content,
search, core contrast pairs, server validation/failures, the actual React menu,
theme, theme hydration and enquiry states. There is no configured lint script;
npm run lint --if-present does not perform linting. See PRODUCTION_REPORT.md for
executed checks and remaining real-browser/live-provider verification.

Read PROJECT_CONTEXT.md at the start of a new project chat and maintain it after
meaningful changes.
