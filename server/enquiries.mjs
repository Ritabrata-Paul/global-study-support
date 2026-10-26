// Shared by Next.js and the Sites Worker. Uses Web APIs, no provider SDK.
const MAX_FILE = 3 * 1024 * 1024;
const MAX_BODY = MAX_FILE + 64 * 1024;
const windowMs = 10 * 60 * 1000;
const categories = ['Information Technology','Mechanical Engineering','Civil Engineering','Finance & Accounting','Management','Statistics'];
const assistance = ['Tutoring & concept guidance','Debugging & technical review','Modelling & simulation guidance','Data analysis & reporting','Professional project assistance','Editing & documentation feedback'];
const plans = ['Focused guidance','Project support','Professional support'];
const buckets = new Map();
const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;

export function deliveryConfiguration(env) {
  const origin = safeOrigin(env.ENQUIRY_ALLOWED_ORIGIN);
  return {
    available: Boolean(origin && env.RESEND_API_KEY && emailPattern.test(env.ENQUIRY_FROM_EMAIL || '') && emailPattern.test(env.ENQUIRY_TO_EMAIL || '') && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY),
    attachmentsAllowed: Boolean(safeHttps(env.ATTACHMENT_SCAN_URL) && env.ATTACHMENT_SCAN_API_KEY),
    siteKey: env.TURNSTILE_SITE_KEY || '',
  };
}

function safeOrigin(value) { try { const u = new URL(value); return (u.protocol === 'https:' || u.protocol === 'http:' && (u.hostname === 'localhost' || u.hostname === '127.0.0.1')) && u.origin === value ? u.origin : null; } catch { return null; } }
function safeHttps(value) { try { return new URL(value).protocol === 'https:'; } catch { return false; } }
function json(value, status = 200, headers = {}) { return Response.json(value, {status, headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}}); }
function text(form, key, max) { const v = form.get(key); return typeof v === 'string' && v.length <= max ? v.trim() : null; }

export function validateEnquiry(form, today = new Date().toISOString().slice(0,10)) {
  const fields = {};
  const limits = {name:120,email:200,category:80,service:100,software:200,deadline:10,requirements:8000,plan:80,website:200,requestId:36};
  const data = Object.fromEntries(Object.entries(limits).map(([key,max])=>[key,text(form,key,max)]));
  if (!data.name || /[\r\n\x00-\x1f]/.test(data.name)) fields.name='Enter a valid name (up to 120 characters).';
  if (!data.email || !emailPattern.test(data.email)) fields.email='Enter a valid email address.';
  if (!categories.includes(data.category)) fields.category='Choose a support category.';
  if (!assistance.includes(data.service)) fields.service='Choose a type of assistance.';
  if (data.software === null || /[\r\n\x00-\x1f]/.test(data.software)) fields.software='Use up to 200 characters without line breaks.';
  if (!data.requirements || data.requirements.length < 20 || /\x00/.test(data.requirements)) fields.requirements='Describe your requirements in 20–8000 characters.';
  if (data.plan === null || data.plan && !plans.includes(data.plan)) fields.plan='Choose an available pricing plan.';
  if (data.deadline === null || data.deadline && (!/^\d{4}-\d{2}-\d{2}$/.test(data.deadline) || !Number.isFinite(Date.parse(data.deadline)) || new Date(data.deadline).toISOString().slice(0,10)!==data.deadline || data.deadline < today)) fields.deadline='Choose today or a future date.';
  if (form.get('consent') !== 'on') fields.consent='Please accept the privacy and integrity notices.';
  if (data.website !== '') fields.website='Unable to accept this enquiry.';
  if (!data.requestId || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId)) fields.requestId='Refresh the form and try again.';
  return {data,fields};
}

export async function inspectAttachment(file) {
  if (!file || typeof file === 'string' || !file.size) return null;
  if (file.size > MAX_FILE) throw new Error('The attachment must be 3 MB or smaller.');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const name = file.name.replace(/[^a-zA-Z0-9._-]/g,'_').slice(-100);
  const ext = name.split('.').pop()?.toLowerCase();
  let valid = false;
  let type = '';
  if (ext === 'pdf') { valid = new TextDecoder().decode(bytes.slice(0,5)) === '%PDF-'; type = 'application/pdf'; }
  if (ext === 'png') { valid = [137,80,78,71,13,10,26,10].every((n,i)=>bytes[i]===n); type='image/png'; }
  if (ext === 'jpg' || ext === 'jpeg') { valid = bytes[0]===255 && bytes[1]===216 && bytes[2]===255; type='image/jpeg'; }
  if (ext === 'txt' || ext === 'csv') { try { const t=new TextDecoder('utf-8',{fatal:true}).decode(bytes); valid=!/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(t); } catch {} type=ext==='txt'?'text/plain':'text/csv'; }
  if (!valid || file.type && !['application/octet-stream',type,ext==='jpg'?'image/jpeg':type].includes(file.type)) throw new Error('Use a valid PDF, PNG, JPEG, UTF-8 TXT or CSV file.');
  return {bytes,name,type};
}

async function readForm(request) {
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) throw new Error('Use the enquiry form to submit your request.');
  if (Number(request.headers.get('content-length')) > MAX_BODY) throw new RangeError('Enquiry is too large.');
  const reader=request.body?.getReader();
  if (!reader) throw new Error('Missing enquiry data.');
  const chunks=[]; let size=0;
  while (true) { const {value,done}=await reader.read(); if(done) break; size+=value.byteLength; if(size>MAX_BODY) {await reader.cancel();throw new RangeError('Enquiry is too large.');} chunks.push(value); }
  const blob=new Blob(chunks,{type:request.headers.get('content-type')});
  return new Response(blob).formData();
}

async function hash(value) { return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',typeof value==='string'?new TextEncoder().encode(value):value)),b=>b.toString(16).padStart(2,'0')).join(''); }
function limited(key, now) {
  for(const [k,v] of buckets) if(v.until<=now) buckets.delete(k);
  if(buckets.size>5000) return true;
  const record=buckets.get(key) || {count:0,until:now+windowMs}; record.count++;buckets.set(key,record);
  return record.count>5;
}
function base64(bytes) { let out='';for(let i=0;i<bytes.length;i+=8192)out+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(out); }

export async function handleEnquiry(request, env = {}, deps = {}) {
  const send = deps.fetch || fetch;
  const config=deliveryConfiguration(env);
  if(request.method==='GET') return json(config);
  if(request.method!=='POST') return json({error:'Method not allowed.'},405,{Allow:'GET, POST'});
  const origin=safeOrigin(env.ENQUIRY_ALLOWED_ORIGIN);
  if(!origin || request.headers.get('origin')!==origin || request.headers.get('sec-fetch-site')==='cross-site') return json({error:'This request must come from the website enquiry form.'},403);
  if(!config.available) return json({error:'Online enquiries are not configured yet. Please use the business email shown on the contact page.'},503);
  const ip=deps.ip || (env.ENQUIRY_TRUST_PROXY==='true' ? request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0].trim() : null) || 'shared';
  if(limited(await hash(ip),(deps.now || Date.now)())) return json({error:'Too many attempts. Please wait 10 minutes before trying again.'},429,{'Retry-After':'600'});
  let form;
  try {form=await readForm(request);} catch(e) { return json({error:e instanceof RangeError?'Enquiry is too large.':'Unable to read the form. Please review your fields and attachment.'},e instanceof RangeError?413:400); }
  const {data,fields}=validateEnquiry(form);
  if(Object.keys(fields).length) return json({error:'Please review the highlighted fields.',fields},422);
  const token=text(form,'cf-turnstile-response',2048);
  if(!token) return json({error:'Complete the security check before sending.'},422);
  const files=form.getAll('attachment').filter(f=>typeof f!=='string'&&f.size>0);
  if(files.length>1) return json({error:'Attach one file only.'},422);
  let attachment;
  try { attachment=await inspectAttachment(files[0]); } catch(e) {return json({error:e.message},422);}
  if(attachment && !config.attachmentsAllowed) return json({error:'Attachments are not enabled. Remove the file to send your enquiry.'},422);
  try {
    const verification=await send('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:token}),signal:AbortSignal.timeout(10000)});
    const check=await verification.json();
    if(!verification.ok || check.success!==true || check.hostname!==new URL(origin).hostname || check.action!=='enquiry') return json({error:'The security check expired or could not be verified. Please try it again.'},422);
    if(attachment) {
      const scan=await send(env.ATTACHMENT_SCAN_URL,{method:'POST',headers:{Authorization:'Bearer '+env.ATTACHMENT_SCAN_API_KEY,'Content-Type':'application/octet-stream'},body:attachment.bytes,signal:AbortSignal.timeout(15000)});
      if(!scan.ok || (await scan.json()).clean!==true) return json({error:'The attachment could not pass security screening. Remove it or choose another file.'},422);
    }
    const body=`GLOBAL STUDY SUPPORT ENQUIRY\n\nName: ${data.name}\nEmail: ${data.email}\nCategory: ${data.category}\nAssistance: ${data.service}\nSoftware: ${data.software || 'Not specified'}\nPlan: ${data.plan || 'Not selected'}\nDeadline: ${data.deadline || 'Flexible'}\n\nRequirements:\n${data.requirements}`;
    const fingerprint=await hash(body+(attachment?await hash(attachment.bytes):''));
    const response=await send('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':`gss-${data.requestId}-${fingerprint}`},body:JSON.stringify({from:env.ENQUIRY_FROM_EMAIL,to:[env.ENQUIRY_TO_EMAIL],reply_to:data.email,subject:'Global Study Support enquiry: '+data.category,text:body,...(attachment?{attachments:[{filename:attachment.name,content:base64(attachment.bytes),content_type:attachment.type}]}:{})}),signal:AbortSignal.timeout(15000)});
    const result=await response.json();
    if(!response.ok || typeof result.id!=='string' || !result.id) return json({error:'The email service could not accept your enquiry. Your details are still on this page; please try again or email us directly.'},502);
    return json({receipt:result.id,message:'The email service accepted your enquiry for delivery. This confirms acceptance, not arrival in the inbox. Please keep this reference.'});
  } catch {return json({error:'We could not confirm email acceptance. Your details have been kept on this page. Retry with the same details or contact us directly.'},502);}
}
