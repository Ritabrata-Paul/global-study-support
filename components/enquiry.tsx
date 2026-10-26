'use client';

import {useEffect,useRef,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Script from 'next/script';
import {ArrowUpRight,Copy,Download,LoaderCircle} from 'lucide-react';
import {services,software} from '@/lib/data';
import {publishedOfferings,canonicalCategory} from '@/lib/service-catalog';
import {referenceStyles} from '@/lib/academic';
import {assistanceTypes,pricingPlans} from '@/lib/details';
import {contactEmail} from '@/lib/config';

type Config={available:boolean;attachmentsAllowed:boolean;siteKey:string};
type Turnstile={render:(node:HTMLElement,options:Record<string,unknown>)=>string;remove:(id:string)=>void;reset:(id:string)=>void};
declare global {interface Window {turnstile?:Turnstile}}

export default function Enquiry(){
 const params=useSearchParams();
 const selectedOffering=publishedOfferings.find(s=>s.slug===(params.get('specificService')||params.get('service')));
 const initialCategory=canonicalCategory(params.get('category')||selectedOffering?.category||'');
 const [category,setCategory]=useState(services.some(s=>s.title===initialCategory)?initialCategory:'');
 const [specificService,setSpecificService]=useState(selectedOffering?.category===initialCategory?selectedOffering.slug:'');
 const [context,setContext]=useState('');
 const academic=category==='Academic Writing & Research'||context==='Academic learning'||context==='Research';
 const availableServices=publishedOfferings.filter(s=>s.category===category);
 const [config,setConfig]=useState<Config|null>(null);
 const [configError,setConfigError]=useState(false);
 const [sending,setSending]=useState(false);
 const [status,setStatus]=useState('');
 const [receipt,setReceipt]=useState('');
 const [errors,setErrors]=useState<Record<string,string>>({});
 const [token,setToken]=useState('');
 const [ready,setReady]=useState(false);
 const [today,setToday]=useState('');
 const [text,setText]=useState('');
 const widget=useRef<HTMLDivElement>(null);
 const widgetId=useRef<string|null>(null);
 const requestId=useRef('');
 const formRef=useRef<HTMLFormElement>(null);
 const [reload,setReload]=useState(0);

 useEffect(()=>{requestId.current=crypto.randomUUID();const d=new Date();setToday(d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'));},[]);
 useEffect(()=>{const abort=new AbortController();setConfigError(false);fetch('/api/enquiries/',{signal:abort.signal,cache:'no-store'}).then(async r=>{if(!r.ok)throw new Error();const c=await r.json();if(typeof c.available!=='boolean'||typeof c.siteKey!=='string')throw new Error();setConfig(c);}).catch(()=>{if(!abort.signal.aborted){setConfigError(true);setConfig(null);}});return()=>abort.abort();},[reload]);
 useEffect(()=>{
  if(!ready||!config?.available||!widget.current||!window.turnstile)return;
  widgetId.current=window.turnstile.render(widget.current,{sitekey:config.siteKey,action:'enquiry',theme:'auto',callback:(value:string)=>setToken(value),'expired-callback':()=>setToken(''),'error-callback':()=>{setToken('');setStatus('The security check could not load. Please retry or email us directly.');}});
  return()=>{if(widgetId.current&&window.turnstile)window.turnstile.remove(widgetId.current);widgetId.current=null;};
 },[ready,config]);
 function resetChallenge(){setToken('');if(widgetId.current&&window.turnstile)window.turnstile.reset(widgetId.current);}
 function prepare(){const f=formRef.current;if(!f?.reportValidity())return null;const d=new FormData(f);const file=d.get('attachment');const body=['GLOBAL STUDY SUPPORT ENQUIRY','','Name: '+d.get('name'),'Email: '+d.get('email'),'Category: '+d.get('category'),'Specific service: '+(publishedOfferings.find(s=>s.slug===d.get('specificService'))?.title||'Help me choose'),'Context: '+d.get('context'),'Referencing style: '+(d.get('referencingStyle')||'Not specified'),'Formatting: '+(d.get('formatting')||'Not specified'),'Assistance: '+d.get('service'),'Software: '+d.get('software'),'Plan: '+d.get('plan'),'Deadline: '+(d.get('deadline')||'Flexible'),'','Requirements:',String(d.get('requirements')),'','File to attach manually: '+(file instanceof File&&file.size?file.name:'None')].join('\n');setText(body);return body;}
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(sending||receipt)return;
  setErrors({});setStatus('');
  if(!token){setStatus('Complete the security check before sending.');return;}
  const data=new FormData(e.currentTarget);data.set('requestId',requestId.current);data.set('cf-turnstile-response',token);
  setSending(true);
  try {const response=await fetch('/api/enquiries/',{method:'POST',body:data,signal:AbortSignal.timeout(45000)});const result=await response.json();if(!response.ok||typeof result.receipt!=='string'||!result.receipt){setErrors(result.fields||{});setStatus(result.error||'We could not confirm receipt. Please try again or email us directly.');return;}setReceipt(result.receipt);setStatus(result.message);}
  catch {setStatus('We could not confirm receipt. Your details are still here. Please retry or email us directly.');}
  finally {setSending(false);resetChallenge();}
 }
 const described=(name:string)=>errors[name]?name+'-error':undefined;
 const error=(name:string)=>errors[name]?<span className="field-error" id={name+'-error'}>{errors[name]}</span>:null;
 return <form ref={formRef} className="enquiry-form" onSubmit={submit} aria-busy={sending}>
 <h2>Tell us about your project.</h2><p className="form-description">A little context helps us offer the right guidance.</p>
 {config===null&&!configError&&<p role="status" className="form-notice">Checking online enquiry availability...</p>}
 {(configError||config&&!config.available)&&<div className="form-notice"><p>Online sending is currently unavailable. You can still prepare, copy or download your enquiry and email <a href={'mailto:'+contactEmail}>{contactEmail}</a>.</p>{configError&&<button type="button" className="text-link" onClick={()=>setReload(v=>v+1)}>Check again</button>}</div>}
 <fieldset disabled={sending||Boolean(receipt)} className="form-fieldset"><legend className="sr-only">Your contact details and requirements</legend><div className="form-grid">
 <div className="form-field"><label htmlFor="name">Your name *</label><input name="name" id="name" autoComplete="name" required maxLength={120} placeholder="Full name" aria-invalid={Boolean(errors.name)} aria-describedby={described('name')}/>{error('name')}</div>
 <div className="form-field"><label htmlFor="email">Email address *</label><input name="email" id="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={described('email')}/>{error('email')}</div>
 <div className="form-field"><label htmlFor="category">Support category *</label><select name="category" id="category" required value={category} onChange={e=>{setCategory(e.target.value);setSpecificService('');}} aria-invalid={Boolean(errors.category)} aria-describedby={described('category')}><option value="" disabled>Select a category</option>{services.map(s=><option key={s.slug}>{s.title}</option>)}</select>{error('category')}</div>
 <div className="form-field"><label htmlFor="specificService">Specific service</label><select name="specificService" id="specificService" value={specificService} onChange={e=>setSpecificService(e.target.value)} aria-invalid={Boolean(errors.specificService)} aria-describedby={described('specificService')}><option value="">{category?'Help me choose':'Choose a category first'}</option>{availableServices.map(s=><option key={s.slug} value={s.slug}>{s.title}</option>)}</select>{error('specificService')}</div>
 <div className="form-field"><label htmlFor="context">Academic or professional context *</label><select name="context" id="context" required value={context} onChange={e=>setContext(e.target.value)} aria-invalid={Boolean(errors.context)} aria-describedby={described('context')}><option value="" disabled>Select your context</option>{['Academic learning','Research','Professional'].map(c=><option key={c}>{c}</option>)}</select>{error('context')}</div>
 <div className="form-field"><label htmlFor="service">Type of assistance *</label><select name="service" id="service" required defaultValue={assistanceTypes.includes(params.get('service')||'')?params.get('service')!:''} aria-invalid={Boolean(errors.service)} aria-describedby={described('service')}><option value="" disabled>How can we help?</option>{assistanceTypes.map(s=><option key={s}>{s}</option>)}</select>{error('service')}</div>
 <div className="form-field"><label htmlFor="software">Software / technology</label><input name="software" id="software" list="software-options" defaultValue={(params.get('software')||'').slice(0,200)} maxLength={200} placeholder="e.g. Python, AutoCAD, Excel" aria-invalid={Boolean(errors.software)} aria-describedby={described('software')}/><datalist id="software-options">{software.map(s=><option key={s.slug} value={s.name}/>)}</datalist>{error('software')}</div>
 <div className="form-field"><label htmlFor="deadline">Preferred deadline</label><input name="deadline" id="deadline" type="date" min={today||undefined} aria-invalid={Boolean(errors.deadline)} aria-describedby={described('deadline')}/>{error('deadline')}</div>
 <div className="form-field full"><label htmlFor="plan">Pricing option (optional)</label><select name="plan" id="plan" defaultValue={pricingPlans.includes(params.get('plan')||'')?params.get('plan')!:''} aria-invalid={Boolean(errors.plan)} aria-describedby={described('plan')}><option value="">Help me choose</option>{pricingPlans.map(p=><option key={p}>{p}</option>)}</select>{error('plan')}</div>
 {academic&&<fieldset className="academic-fields"><legend>Referencing and document requirements (optional)</legend><div className="form-field"><label htmlFor="referencingStyle">Referencing style</label><select id="referencingStyle" name="referencingStyle" aria-invalid={Boolean(errors.referencingStyle)} aria-describedby={described('referencingStyle')}><option value="">Not applicable / help me choose</option>{referenceStyles.map(s=><option key={s.name}>{s.name}</option>)}<option>Other / institutional guide</option></select>{error('referencingStyle')}</div><div className="form-field"><label htmlFor="formatting">Font and document formatting requirements</label><textarea id="formatting" name="formatting" maxLength={1000} placeholder="e.g. Arial 12 pt, 1.5 spacing, page margins, headings, university template" aria-invalid={Boolean(errors.formatting)} aria-describedby={['formatting-note',described('formatting')].filter(Boolean).join(' ')}/><span className="field-note" id="formatting-note">Fonts, page layout and citation styles are separate requirements. Follow your institution?s guide.</span>{error('formatting')}</div></fieldset>}
 <div className="form-field full"><label htmlFor="requirements">Project description *</label><textarea name="requirements" id="requirements" required minLength={20} maxLength={8000} placeholder="Describe your goals, questions and the support you need (20-8000 characters)." aria-invalid={Boolean(errors.requirements)} aria-describedby={described('requirements')}/>{error('requirements')}</div>
 <div className="form-field full"><label htmlFor="attachment">Optional secure attachment</label><input type="file" name="attachment" id="attachment" accept=".pdf,.png,.jpg,.jpeg,.txt,.csv" disabled={!config?.attachmentsAllowed||!config.available} aria-describedby="attachment-note" onChange={e=>{const f=e.target.files?.[0];if(f&&f.size>3*1024*1024){e.target.value='';setStatus('Choose a file smaller than 3 MB.');}}}/><span className="field-note" id="attachment-note">{config?.available&&config.attachmentsAllowed?'One PDF, PNG, JPEG, UTF-8 TXT or CSV, up to 3 MB. Screened before email delivery; no public file URL is created.':'Attachments are unavailable until secure screening is configured. Please describe your files in the enquiry.'}</span></div>
 <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input name="website" id="website" tabIndex={-1} autoComplete="off"/></div>
 </div><label className="checkbox-field"><input type="checkbox" name="consent" required aria-invalid={Boolean(errors.consent)} aria-describedby={described('consent')}/><span>I have read the <a href="/privacy/">Privacy Policy</a> and <a href="/academic-integrity/">Academic Integrity Policy</a> and consent to processing this enquiry. *</span></label>{error('consent')}</fieldset>
 {config?.available&&<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={()=>setReady(true)} onError={()=>setStatus('The security check could not load. You can email us directly.')} strategy="afterInteractive"/><div ref={widget} className="security-check" aria-label="Enquiry security check"/></>}
 <div className="form-actions"><button className="button" type="submit" disabled={!config?.available||!token||sending||Boolean(receipt)}>{sending?<><LoaderCircle size={17} className="loading-icon"/>Sending...</>:<>Send Enquiry <ArrowUpRight size={17}/></>}</button><button type="button" className="button secondary" disabled={sending||Boolean(receipt)} onClick={async()=>{const body=prepare();if(!body)return;try{await navigator.clipboard.writeText(body);setStatus('Details copied. Paste them into an email to '+contactEmail+'.');}catch{setStatus('Clipboard unavailable. Download your enquiry below.');}}}><Copy size={15}/>Copy details</button></div>
 <p className="file-notice">We confirm acceptance only after the email provider returns a receipt. Do not send passwords or confidential identifiers.</p>
 {status&&<div className={'form-status '+(!receipt?'status-pending':'')} role="status" aria-live="polite">{status}{receipt&&<p>Reference: <strong>{receipt}</strong></p>}</div>}
 {receipt&&<button type="button" className="text-link" style={{marginTop:18}} onClick={()=>{setReceipt('');setStatus('');requestId.current=crypto.randomUUID();formRef.current?.reset();setText('');}}>Start a new enquiry</button>}
 {!receipt&&<div className="form-fallback"><a className="text-link" href={'mailto:'+contactEmail} onClick={e=>{if(!prepare()){e.preventDefault();return;}e.currentTarget.href='mailto:'+contactEmail+'?subject=Global%20Study%20Support%20enquiry&body='+encodeURIComponent(prepare()||'');}}>Prepare in my email app <ArrowUpRight size={15}/></a>{text&&<a className="text-link" href={'data:text/plain;charset=utf-8,'+encodeURIComponent(text)} download="global-study-support-enquiry.txt"><Download size={15}/>Download enquiry text</a>}</div>}
 </form>;
}
