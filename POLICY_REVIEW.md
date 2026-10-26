# Policy content handoff — 26 October 2026

The existing `/privacy/` and `/terms/` pages now use structured copy from
`lib/policies.ts` through `components/policy-document.tsx`. They retain the site’s
design tokens, fonts, themes and footer links. New presentation includes a revision
date, section navigation, accessible data-category table and contact links.

Privacy describes the actual enquiry fields, optional screened attachments,
provider-acceptance receipt, Resend, Turnstile, hosting, localStorage theme setting,
temporary rate-limit records, mailbox/provider retention and conditional rights.
It does not claim that enquiry sending or screening is configured, that a provider
receipt guarantees inbox arrival, or that the website has an enquiry database.

Terms cover website use, scope/quotations, academic integrity, authorised security
work, shared materials, fees, delivery/revisions, cancellation, intellectual
property, portfolio limitations, professional review and complaint handling.
They preserve mandatory consumer rights and do not add an automatic no-refund
rule, sweeping indemnity, compulsory arbitration, invented liability cap or
unconfirmed governing jurisdiction.

## Business details still needed

The owner confirmed the business name as Global Study Support. The country of
operation and an agreed enquiry-retention period remain unconfirmed. The copy
uses that supplied name and `support@globalstudysupport.com`. No address,
registration number, jurisdiction,
named regulator, exact retention schedule or specific statutory deadline was
invented. Retention criteria are described in place of a made-up period.

Before a public business launch, confirm the operator’s full identity/contact
requirements, applicable law, real retention/deletion procedures, international
processing/safeguards, actual provider arrangements and engagement-specific
payment/cancellation terms. Obtain jurisdiction-specific legal review; this is
a website-specific drafting update, not a compliance certification.

## Drafting references checked

- [ICO: privacy information to provide](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/)
- [CMA: writing a fair contract](https://www.gov.uk/guidance/writing-a-fair-contract-for-customers)
- [Cloudflare Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/)
- [Resend privacy policy](https://resend.com/legal/privacy-policy)

The regulator references informed transparency and fairness checks. They do not
establish that UK law governs this business. Application-specific statements were
checked against `components/enquiry.tsx`, `server/enquiries.mjs`, the configuration
and existing hosting implementation.

Publication completed on 26 October 2026. Business name confirmed by the owner:
Global Study Support. Country of operation and fixed enquiry-retention period
remain unconfirmed; the published copy uses retention criteria and does not
choose a specific governing jurisdiction.

Six relevant service photos were visually reviewed at card size; original
portfolio imagery and previews were preserved. All 25 tests passed. Final Sites
production build and TypeScript passed, links/assets checked across 159 HTML
files, SEO verified across 156 content pages, and all 1052 served assets compared
losslessly. Bundle size: 9616 KB gzip. A Windows process-cleanup EPERM in one
packaging attempt was resolved by retrying. No real browser/device audit or
jurisdiction-specific legal certification was performed.

Published successfully, preserving owner-private access:
https://global-study-support.patelprincem2000.chatgpt.site
Source commit: 9c30481ac8a3b8a46bb0d84112e7a7aa1b876920
Saved version: appgprj_6adeefd92d4c819182845181794da57a~appgver_a93d9eb5a2148191bce3217d54be067f
Deployment: appgdep_6adf3a673ce48191be00eacee93df18d

This verification record and the owner-name confirmation were updated locally
after the published source snapshot; the website already uses the confirmed name.
