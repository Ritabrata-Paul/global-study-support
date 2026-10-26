// Website-specific policy copy. Business identity, retention schedules and any
// jurisdiction-specific engagement terms must be confirmed by the owner.
export type PolicySection={id:string;title:string;paragraphs:string[];bullets?:string[];links?:{label:string;href:string}[];table?:{caption:string;columns:string[];rows:string[][]}};
export type PolicyDocument={updated:string;summary:string;sections:PolicySection[]};
export const privacyPolicy:PolicyDocument={
 updated:'26 October 2026',
 summary:'This policy explains what information Global Study Support handles, why it is used, how it is shared and the choices available to you when visiting our website or contacting us.',
 sections:[
  {id:'privacy-scope',title:'1. Who this policy covers',paragraphs:[
   'Global Study Support is the service name used on this website. This policy applies when you browse the site, contact us, request a quotation or share material for an agreed academic or professional support enquiry. Contact us using the business email below with questions about your information.',
   'A separate written agreement may set out additional confidentiality and data-handling arrangements for an engagement. This notice does not replace the privacy notices of your email provider, the hosting platform or other third-party websites you choose to visit.'
  ]},
  {id:'privacy-information',title:'2. Information we handle',paragraphs:['Please provide only what is necessary to explain your request. Initial enquiries should use anonymised examples wherever possible.'],table:{caption:'Information associated with browsing and enquiries',columns:['Information','Examples and source'],rows:[
   ['Contact information','Your name, email address and information you include in correspondence.'],
   ['Enquiry details','Selected discipline, specific service, software, academic or professional context, referencing style, formatting requirements, project description, preferred deadline and pricing option.'],
   ['Optional supporting material','An attachment you choose to submit when secure file screening is enabled, and any authorised material shared later through an agreed channel.'],
   ['Technical and security information','IP address and request/device information processed by hosting or security providers, security-check results and temporary abuse-prevention identifiers.'],
   ['Browser preference','Your Light, Dark or System theme preference, saved on your device.']
  ]}},
  {id:'privacy-purposes',title:'3. Why information is used',paragraphs:[
   'We use enquiry information to understand your requirements, answer questions, assess feasibility, prepare quotations and communicate about agreed support. Information may also be needed to maintain appropriate business records, resolve complaints and protect the website against misuse.',
   'Where applicable privacy law requires a legal basis, the relevant basis depends on the purpose: steps you request before an agreement or performance of that agreement; legitimate interests in responding to correspondence and maintaining security, subject to your rights; compliance with legal obligations; or consent where it is required. You may withdraw consent for processing that relies on consent without affecting its lawfulness before withdrawal.',
   'An enquiry does not subscribe you to a marketing list. We do not sell personal information, use this website for behavioural advertising or make automated decisions about eligibility for support that have legal or similarly significant effects.'
  ]},
  {id:'privacy-delivery',title:'4. Enquiries, email delivery and attachments',paragraphs:[
   'When online sending is enabled, the form transmits your enquiry to the server over HTTPS. The server validates the fields and security check before requesting email delivery through Resend to the configured business inbox. A confirmation reference means the delivery provider accepted the email; it does not guarantee arrival in the inbox.',
   'If online sending is unavailable, you can contact us directly by email or use the form’s preparation, copy or text-download options. Preparing or copying an enquiry does not itself submit it to our inbox. Your chosen email provider handles any message you send through your own email application.',
   'Attachments are accepted only when security screening is configured. The current form permits one PDF, PNG, JPEG, UTF-8 TXT or CSV file up to 3 MB. File size, type and signature are checked, and the file is sent to the configured screening service before it can be forwarded by email. A submitted attachment is not published as a public download.',
   'Do not send passwords, authentication keys, payment-card details, identity documents, student identifiers or sensitive participant/client records in an initial enquiry. Remove unrelated third-party information and share only material you are authorised to disclose.'
  ]},
  {id:'privacy-sharing',title:'5. Access and service providers',paragraphs:[
   'Information is shared only as needed to respond to your request, provide agreed support, operate the website, maintain security or meet legal requirements. This can include authorised people handling your enquiry and providers acting in their relevant service roles. We may disclose information when required by a lawful request or when reasonably necessary to establish, exercise or defend legal rights.',
   'The current technical setup uses a hosted website platform and Cloudflare infrastructure. Cloudflare Turnstile processes security checks when online enquiries are enabled. Resend processes enquiry email delivery when configured. An attachment-screening provider receives files only when that feature is enabled. Business email providers process messages stored in or sent from the inbox.',
   'Fonts and website images are served locally by this site; opening a page does not require a request to Google Fonts or Pexels. Following external links takes you to services with their own privacy practices.'
  ],links:[{label:'Cloudflare privacy policy',href:'https://www.cloudflare.com/privacypolicy/'},{label:'Cloudflare Turnstile Privacy Addendum',href:'https://www.cloudflare.com/turnstile-privacy-policy/'},{label:'Resend privacy policy',href:'https://resend.com/legal/privacy-policy'}]},
  {id:'privacy-storage',title:'6. Storage, retention and international processing',paragraphs:[
   'The website does not maintain a separate database of enquiries or a public upload archive. Enquiry messages and attachments accepted for delivery may be retained in the business inbox and by the relevant email or screening provider. Later project materials are handled under the arrangements agreed for that engagement.',
   'Retention is determined by whether a request is still active, whether an engagement follows, the need to document agreed work or resolve a complaint, and applicable legal record-keeping requirements. Contact us for information about records associated with your enquiry or to request deletion. Deletion requests may be subject to a specific legal obligation or a documented need to retain material for a dispute.',
   'Abuse-prevention records in the application are temporary, use hashed identifiers and expire after a ten-minute rate-limit window. Expired records are removed during subsequent requests or when the running instance resets. Hosting logs and provider-held records are separate and follow the relevant provider’s retention practices.',
   'Hosting, security, screening and email services may process information in countries other than your own. Applicable transfer requirements depend on the people and providers involved. Any international sharing of sensitive project material, and any required transfer safeguards, must be addressed before that material is supplied. Contact us if your institution or organisation requires a particular processing location or data agreement.'
  ]},
  {id:'privacy-preferences',title:'7. Cookies and local preferences',paragraphs:[
   'The site saves the theme preference in localStorage under “gss-theme”. It remains on your device until you change it or clear browser storage. You can switch between Light, Dark and System from the navigation.',
   'No analytics or advertising trackers have been added to this website. Hosting access controls and security providers may use their own necessary technologies. When Turnstile is enabled, its processing is described in the linked privacy addendum. This notice will be updated if the website introduces additional tracking or optional features.'
  ]},
  {id:'privacy-security',title:'8. Security and confidentiality',paragraphs:[
   'The website includes server-side validation, origin checks, spam controls and restricted, screened attachments when enabled. These measures reduce risk but cannot guarantee that every transmission, email account or third-party service will be free from misuse.',
   'Do not use an initial enquiry for confidential research datasets or production credentials. Ask us to agree an appropriate scope, confidentiality arrangements and a suitable transfer method first. Submitting a file for an enquiry does not give permission to publish it as a portfolio example.'
  ]},
  {id:'privacy-rights',title:'9. Your choices and privacy requests',paragraphs:[
   'Depending on the laws that apply to you, you may have rights to request access, correction, deletion, restriction or a portable copy of certain personal information, to object to certain processing, or to withdraw consent. These rights can be subject to conditions and exceptions.',
   'Email the business contact below with enough information to identify your enquiry and the request you want us to consider. We may need proportionate verification before disclosing or changing personal information. Please do not send identity documents unless a suitable verification method has been agreed.',
   'We will respond in accordance with applicable requirements. You may also raise concerns with the relevant data-protection authority where local law provides that right. A complaint to us does not prevent you from exercising that right.'
  ]},
  {id:'privacy-younger-visitors',title:'10. Younger visitors and third-party information',paragraphs:[
   'If you are below the age at which you can independently consent to relevant processing or enter an agreement in your location, involve a parent, guardian or authorised institution before requesting support. Do not send personal information about another person without a lawful basis or appropriate permission.',
   'If you believe information about a child or another person has been shared inappropriately, contact us so the issue can be reviewed.'
  ]},
  {id:'privacy-updates',title:'11. Changes and contact',paragraphs:[
   'We may update this notice when website features, providers, practices or applicable requirements change. The date above identifies the latest revision. Where required, material changes will be communicated before they apply. Contact Global Study Support using the business email below for questions about this policy or your information.'
  ]}
 ]
};
export const termsOfService:PolicyDocument={
 updated:'26 October 2026',
 summary:'These terms explain use of the Global Study Support website and the principles for requesting academic or professional assistance. Any paid engagement requires a separately agreed written scope and quotation.',
 sections:[
  {id:'terms-scope',title:'1. Scope and agreement',paragraphs:[
   'Global Study Support is the service name used on this website. These terms apply to browsing the site, using its reference materials and making enquiries. Read them together with the Privacy Policy and Academic Integrity Policy.',
   'An enquiry, automated acknowledgement or example on this website does not create a paid service agreement or reserve a specialist. Before work begins, the written quotation or engagement agreement must identify the provider, the customer, scope, deliverables, fees, timetable and any specific conditions. Mandatory legal protections take precedence over a conflicting term.'
  ]},
  {id:'terms-support',title:'2. Nature of our support',paragraphs:[
   'Support can include tutoring, explanations, debugging, modelling feedback, research guidance, editing, documentation and agreed professional project assistance. The exact technologies, software editions, specialist availability and suitable assistance are assessed against your requirements.',
   'Catalogue entries describe areas in which enquiries can be considered. They do not imply vendor certification, a partnership, professional accreditation or support for every feature or version. We do not guarantee grades, publication, employment, investment performance or other outcomes outside the agreed work.'
  ]},
  {id:'terms-integrity',title:'3. Academic integrity and authorised use',paragraphs:[
   'Academic support must comply with your institution’s rules. You retain authorship and responsibility for assessed work. We can explain concepts, review your approach, identify issues and provide original reference examples within the permitted scope.'
  ],bullets:[
   'Do not request impersonation, examination assistance that breaches assessment rules, or work intended to be submitted as someone else’s own.',
   'Do not request fabricated sources, research observations, participant responses, qualifications or client results.',
   'Security and forensic tools may be used only in authorised educational labs or on systems you own or have explicit permission to assess.',
   'Follow software licences, data-access permissions, research ethics requirements and any professional approval obligations.'
  ],links:[{label:'Read the Academic Integrity Policy',href:'/academic-integrity/'}]},
  {id:'terms-information',title:'4. Your responsibilities and materials',paragraphs:[
   'Provide an accurate brief, relevant software versions, required standards and a realistic deadline. Explain any restrictions on external assistance, confidential information or permitted tools before agreeing the scope.',
   'You must have the rights and permissions needed to share code, documents, datasets and other materials. Use anonymised examples for the initial enquiry and remove secrets, student identifiers and unnecessary personal information. Keep your own copies of project files.',
   'Information you provide may affect feasibility, quality and timing. If requirements, source material or assumptions change, we will discuss the effect on the scope and quotation before proceeding with additional work.'
  ]},
  {id:'terms-quotes',title:'5. Quotations, fees and payment',paragraphs:[
   'Pricing is quotation-based. A quotation should state the agreed work, currency, total fees, any applicable taxes or third-party costs, payment arrangements and the period for which the quotation remains valid. No fixed price is created by a directory entry or a pricing-plan label.',
   'The website does not collect payment-card information or process payments. Any payment method, staged payment or licence cost must be set out in the written agreement. Additional chargeable work requires your agreement; a change in scope does not automatically authorise an extra charge.'
  ]},
  {id:'terms-delivery',title:'6. Timelines, delivery and revisions',paragraphs:[
   'Your preferred deadline is a request until it has been accepted in writing. Timelines depend on the agreed scope, specialist availability and receipt of the information or feedback needed to perform the work. If a material delay becomes apparent, its effect and available options should be communicated.',
   'The agreed scope should explain delivery formats, review points, included clarifications or revisions and how you should report an issue. Changes to the original requirements may need a separate quotation. A revision allowance does not limit a remedy required by applicable law.',
   'An online enquiry confirmation is issued only when the email provider returns an acceptance reference. It is not a guarantee of inbox arrival or acceptance of the proposed engagement. If no reference is shown, do not assume the enquiry has been received.'
  ]},
  {id:'terms-cancellation',title:'7. Changes, cancellation and refunds',paragraphs:[
   'Ask about cancellation, postponement and refunds before accepting a quotation. The written engagement terms should explain how a cancellation request is made, how any work already performed is assessed and how any refund is calculated.',
   'Charges must reflect the agreed work and applicable law. Nothing on this website creates an automatic “no refunds” rule, forfeits every advance payment or removes a statutory cancellation or remedy right. Where an applicable cooling-off right or consent requirement affects the start of work, it must be addressed before the engagement begins.'
  ]},
  {id:'terms-intellectual-property',title:'8. Intellectual property and portfolio materials',paragraphs:[
   'Website branding, written content, illustrations and reference materials are protected by the rights of their respective owners. Software names, vendor marks and sourced photographs remain subject to their owners’ rights and relevant licences. They do not imply endorsement of Global Study Support.',
   'You may view sample previews for personal learning and evaluation. Unless a separate licence or applicable law allows it, do not republish, sell, redistribute, remove attribution from or present these materials as your own assessed work or verified client experience. Any wider use requires the appropriate permission.',
   'You retain rights in materials you lawfully provide. Sharing them for an enquiry permits their use only as reasonably needed to assess and respond to that request; any broader rights for an engagement must be agreed in writing. Client or student materials must not be added to the public portfolio without permission and appropriate removal of private information.'
  ]},
  {id:'terms-professional-limits',title:'9. Reference examples and professional review',paragraphs:[
   'Portfolio entries distinguish original demonstrations from owner-supplied reference reports. Illustrative photographs are not evidence of completed client work. A preview does not establish the provenance, professional approval or suitability of an underlying project for a particular real-world use.',
   'Engineering and simulation examples are not construction-ready or manufacturing-certified designs. Financial and statistical examples are not audited statements, personalised investment recommendations, local tax advice or proof of a research conclusion. Safety-critical, regulated or professional decisions require appropriately qualified review.',
   'These descriptions define the scope of reference guidance; they do not excuse a failure to perform agreed services with the care and skill required by applicable law.'
  ]},
  {id:'terms-website-use',title:'10. Website access and acceptable conduct',paragraphs:[
   'Use the website lawfully and without interfering with other visitors or its operation. Do not submit malicious files, spam or misleading requests, attempt unauthorised access, bypass security controls or collect other people’s information without permission.',
   'We may restrict a request or access where reasonably necessary to address misuse, security concerns or a legal obligation. Website features may be unavailable during maintenance or provider interruptions. Material changes to an agreed engagement remain subject to that agreement and applicable law.',
   'External sites and third-party software operate under their own terms and availability. You are responsible for obtaining any licences and permissions needed for your own software environment unless a written agreement expressly states otherwise.'
  ]},
  {id:'terms-rights',title:'11. Responsibility and mandatory rights',paragraphs:[
   'Each party remains responsible for obligations imposed by the agreement and applicable law. A specific allocation or limitation of responsibility for a paid engagement must be fair, clearly explained and agreed in writing; these website terms do not impose a general exclusion of liability or a monetary cap on your remedies.',
   'Nothing in these terms excludes liability that cannot lawfully be excluded, including responsibility for fraud, or limits mandatory consumer rights. Any applicable rights relating to negligent injury or other non-excludable liability are preserved. Your responsibility to verify reference material does not remove our responsibility for agreed services.'
  ]},
  {id:'terms-complaints',title:'12. Questions, complaints and disputes',paragraphs:[
   'Contact the business email below with the relevant quotation or enquiry reference, a description of the issue and the outcome you are seeking. We will review the concern and discuss an appropriate resolution. Please avoid including unnecessary private information.',
   'An engagement agreement should identify the applicable law and any agreed dispute procedure. Nothing in these terms requires you to waive access to courts, regulators or remedies available under mandatory local protections. If a term cannot be enforced, the remaining terms continue only to the extent they can fairly operate without it.'
  ]},
  {id:'terms-updates',title:'13. Changes to these terms',paragraphs:[
   'The revision date above identifies the latest website terms. Updates apply prospectively to website use after publication. A change to these pages does not automatically rewrite an existing engagement agreement; material changes to agreed work must follow that agreement and applicable law. Contact Global Study Support before proceeding if any term or proposed scope is unclear.'
  ]}
 ]
};
