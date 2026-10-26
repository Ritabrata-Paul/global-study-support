# Production improvement report

Date: 26 October 2026. Existing site improved in place; design and all 20 tools
preserved. This is an implementation and verification record, not a public launch
or a claim of complete WCAG certification.

## Phase 1 - inspection, branding and navigation

Inspected architecture, routes, shared components, local assets, dependencies,
existing theme behavior and prior deployment. Reused the existing palette,
typography, layouts and shared components.

- Optimised the supplied emblem and added a favicon.
- Added active-link accessibility attributes and mobile-menu controls.
- Escape closes the mobile menu and returns focus to its button.
- Retained the Light / Dark / System button and saved preferences.
- Replaced search over arbitrary JSON with a dedicated case-insensitive filter.
- Removed a gallery CSS rule that hid the third entry at some widths.

Files: `components/site.tsx`, `components/directory.tsx`, `components/software-mark.tsx`,
`lib/search.ts`, `app/globals.css`, `public/brandmark.webp`, `public/favicon.png`.

## Phase 2 - service, software, portfolio and pricing content

- Added structured discipline overviews and FAQs for all four service pages.
- Added specific overviews and support topics for every software entry.
- Added original Python/React logo assets with notices; retained text identifiers
  for products whose approved assets have not been verified.
- Added sample objectives, tools, methodology, learning outcomes and a defined
  location for authorised screenshots, without fabricating project images.
- Kept all four demonstration cards and their original reference files.
- Download buttons and PDF previews require real files at page-generation time.
- Each pricing option prefills Contact with its selected quotation plan.

Files: `lib/details.ts`, `lib/sample-files.ts`, service/software/sample detail
templates, `app/[page]/page.tsx`, `public/software-logos/`.

## Phase 3 - enquiry delivery and secure attachment handling

- Added a native Next route and shared Web-API backend.
- Added strict server-side field/enumeration/date/consent validation, origin
  checks, request limits, honeypot, per-runtime rate limiting and server-side
  Turnstile verification including hostname and action.
- Added Resend email integration through configurable server-only settings.
- Added idempotency keys and provider-receipt checks. Failure/timeout never
  produces a success claim; provider acceptance is distinguished from arrival.
- Added unavailable, loading, validation, submission, provider-error and receipt
  states. Email preparation, copy and download alternatives remain.
- Optional files require limits, signature checks and a configured HTTPS scanner
  returning a clean result. Files are not published at public URLs.
- Added a Sites Worker build around the existing Next pages so the endpoint can
  run on the existing host. Local development uses the native Next route.

Files: `components/enquiry.tsx`, `app/api/enquiries/route.ts`, `server/enquiries.mjs`,
`server/security.mjs`, `server/sites-worker.mjs`, `scripts/build-sites.mjs`,
`next.config.ts`, `.env.example`, `.openai/hosting.json`.

## Phase 4 - performance, accessibility and SEO

- Preserved Plus Jakarta Sans and Inter; hosted variable Latin WOFF2 files
  locally with licences and preload hints.
- Added responsive WebP photo variants, image dimensions, lazy loading and hero
  priority through a shared component.
- Added theme-appropriate link text colour for dark-surface contrast.
- Retained semantic landmarks, focus indicators, skip link and reduced-motion
  styling; added labelled field errors and submission state announcements.
- Centralised configurable site origin/contact details, retained page metadata,
  canonical URLs, sitemap and robots, and updated privacy content to match the
  new optional delivery/scanning providers.
- Added production response security headers and disabled Next development UI.

Files: `app/layout.tsx`, `app/fonts.css`, `app/globals.css`, `app/robots.ts`,
`app/sitemap.ts`, `lib/config.ts`, `components/photo.tsx`, `public/fonts/`,
`public/images/*webp`, `README.md`, `PROJECT_CONTEXT.md`.

## Executed validation

| Check | Observed result |
| --- | --- |
| `npm test` | 18 tests passed; zero failed |
| `npm run typecheck` | Passed |
| Native `npm run build` | Passed; includes dynamic enquiry API |
| `npm run build:sites` | Passed; Worker bundle produced |
| `node scripts/check-export.mjs` | Passed across 44 HTML pages |
| `node scripts/check-worker.mjs` | Passed: 22 routes/assets plus 404, redirect, methods, HEAD, ETag, gzip and disabled API |
| Native production HTTP smoke | Passed: 14 pages/assets, disabled API, 404 and security headers |
| `git diff --check` | Passed; line-ending conversion notices only |
| `npm audit --omit=dev` | Zero reported vulnerabilities at check time |
| `npm run lint --if-present` | No lint script exists; no lint pass claimed |

Tests cover data preservation, related content/files, case-insensitive search,
category/empty/reset states, core text/button contrast pairs, malformed requests,
cross-origin rejection, deadlines, consent, injection attempts, spam fields,
rate limiting, attachment checks, scanner rejection, invalid security tokens,
provider failures/timeouts and mocked acceptance receipts.

DOM tests exercise the actual React components: saved theme loading, theme cycle,
system preference events, theme hydration with console-error capture, active
navigation, mobile-menu toggle/Escape/focus, directory inputs/filters, pricing and
software prefills, online-unavailable state, sending state, provider failure and
receipt-only success. External security/scanner/email responses are mocked.

## Remaining before public launch

1. Configure Resend API key, verified sender, recipient, exact allowed origin and
   Turnstile keys. Set secrets in hosting settings or untracked `.env.local`.
   The owner supplied `support@globalstudysupport.com`; no new address was invented.
2. Configure and approve the optional scanning service before allowing attachments.
   The scanner contract and environment names are in README and `.env.example`.
3. Verify a real security challenge and a real email delivery with the owner’s
   configured providers. No real enquiry was sent during this implementation.
4. Run real-browser desktop/tablet/mobile checks, full-site hydration/console
   inspection, keyboard review, accessibility audit and layout-shift measurement.
   The available browser/app inventory was empty. jsdom cannot verify layout,
   rendered contrast throughout the site, or Core Web Vitals.
5. Review business policies/retention, actual tool availability and any real samples
   with the owner. Four local Word files in `sample/` were kept out of Git and
   deployment pending permission, confidentiality and content checks.
6. Provide authorised project screenshots/native files if desired. No screenshots
   were invented to imply completed client work. Supply a verified WhatsApp number
   only if that channel is required.
7. Add shared edge rate limiting before a multi-instance public deployment. Current
   rate limits are process/isolate-local in addition to mandatory Turnstile checks.
8. Preserve private audience until public sharing/domain configuration is requested.

No admin dashboard, blog, login, registration, payment gateway or runtime SDK was
added. Test-only dependencies: `tsx`, `jsdom`, `@types/jsdom`.

## Preview-only samples update

The owner subsequently requested real software images, conversion of all Word
samples to watermarked PDFs, no published DOCX and no sample download controls.
This supersedes the earlier download/permission-pending notes above.

- 20 tools now have sourced raster logo/product/vendor images with notices.
- Seven supplied reports were converted locally, together with four existing
  demonstrations, into 11 image-only watermarked PDFs (141 pages).
- Local PDFs are under ignored output/pdf/ with copying and printing permissions
  disabled; no text/OCR layer was added. These files are not public URLs.
- Website previews use rendered watermarked pages with pagination and zoom.
  No PDF toolbar, PDF link, DOCX, source code or dataset downloads are exposed.
- Source-file publication checks and UI tests protect this preview-only behavior.
- 19 tests, TypeScript and the 51-page exported link/asset check passed.
- PDF restrictions were programmatically checked; full-size page samples and
  all-page contact sheets were visually reviewed.
- Screenshots/OCR/determined image extraction remain possible. No absolute copy
  protection is promised. Full report text is not screen-reader accessible.
- The source folder changed externally to *_watermark.pdf files during the task;
  no source DOCX was deleted by this implementation.
- Automatic approval review blocked optional temporary-converter cleanup with
  a generic policy rejection. Those files remain ignored in tmp/tools/.

Key changed files: components/software-mark.tsx, components/sample-preview.tsx,
app/samples/[slug]/page.tsx, components/site.tsx, components/directory.tsx,
lib/owner-samples.ts, lib/preview-manifest.json, lib/data.ts, lib/details.ts,
scripts/prepare-previews.py, scripts/create-samples.py, scripts/build-sites.mjs,
scripts/check-worker.mjs, tests/, public/software-logos/, public/previews/,
app/globals.css and the handoff documentation.

The preview update Sites build passed (466 hosted assets, 9412 KB gzip Worker).
Worker checks passed for 25 pages/assets and rejected direct source Word/PDF URLs.
The final source-packaging workflow also validates the native build and tests.
