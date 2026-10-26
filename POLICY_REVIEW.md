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

The owner was asked for the legal business name, country of operation and an
agreed enquiry-retention period. No answer had arrived when this draft was
prepared. The copy uses the supplied Global Study Support service name and
`support@globalstudysupport.com`. No address, registration number, jurisdiction,
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
