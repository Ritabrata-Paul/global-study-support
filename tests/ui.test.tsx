import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';

// DOM-level interaction tests; these do not measure real browser layout.
test('directory, mobile navigation, persisted theme, hydration and enquiry states',async()=>{
 try {
 const dom=new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>',{url:'https://example.test/'});
 Object.assign(globalThis,{window:dom.window,self:dom.window,document:dom.window.document,localStorage:dom.window.localStorage,HTMLElement:dom.window.HTMLElement,HTMLInputElement:dom.window.HTMLInputElement,HTMLSelectElement:dom.window.HTMLSelectElement,Event:dom.window.Event,MouseEvent:dom.window.MouseEvent,KeyboardEvent:dom.window.KeyboardEvent,FormData:dom.window.FormData,File:dom.window.File,IS_REACT_ACT_ENVIRONMENT:true});
 Object.defineProperty(globalThis,'navigator',{value:dom.window.navigator,configurable:true});
 let dark=false;const listeners=new Set<()=>void>();
 const media={get matches(){return dark;},addEventListener:(_type:string,fn:()=>void)=>listeners.add(fn),removeEventListener:(_type:string,fn:()=>void)=>listeners.delete(fn)};
 Object.assign(globalThis,{matchMedia:()=>media});Object.assign(window,{matchMedia:()=>media});
 const React=await import('react');const {act}=React;
 const {createRoot,hydrateRoot}=await import('react-dom/client');
 const {renderToString}=await import('react-dom/server');
 const {PathnameContext,SearchParamsContext}=await import('next/dist/shared/lib/hooks-client-context.shared-runtime.js');
 const {default:ThemeToggle}=await import('../components/theme-toggle');
 const {software}=await import('../lib/data');
 const {default:ServiceDirectory}=await import('../components/service-directory');
 const {default:Directory}=await import('../components/directory');
 const {Header}=await import('../components/site');
 const {default:Enquiry}=await import('../components/enquiry');
 const {default:SamplePreview}=await import('../components/sample-preview');
 const container=document.getElementById('root')!;
 let root=createRoot(container);
 const render=async(node:React.ReactNode)=>{await act(async()=>{root.render(node);});};
 const click=async(el:Element)=>{await act(async()=>{el.dispatchEvent(new dom.window.MouseEvent('click',{bubbles:true}));});};
 function button(text:string){return Array.from(container.querySelectorAll('button')).find(b=>b.textContent?.includes(text))!;}
 async function setValue(el:HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement,value:string){const proto=el.tagName==='SELECT'?dom.window.HTMLSelectElement.prototype:el.tagName==='TEXTAREA'?dom.window.HTMLTextAreaElement.prototype:dom.window.HTMLInputElement.prototype;await act(async()=>{Object.getOwnPropertyDescriptor(proto,'value')!.set!.call(el,value);el.dispatchEvent(new dom.window.Event(el.tagName==='SELECT'?'change':'input',{bubbles:true}));});}

 localStorage.setItem('gss-theme','dark');await render(<ThemeToggle/>);
 assert.equal(document.documentElement.dataset.theme,'dark');
 await click(container.querySelector('button')!);assert.equal(localStorage.getItem('gss-theme'),'system');assert.equal(document.documentElement.dataset.theme,'light');
 dark=true;await act(async()=>listeners.forEach(f=>f()));assert.equal(document.documentElement.dataset.theme,'dark');
 await click(container.querySelector('button')!);assert.equal(document.documentElement.dataset.theme,'light');
 await act(async()=>root.unmount());
 container.innerHTML=renderToString(<ThemeToggle/>);localStorage.setItem('gss-theme','dark');
 const warnings:unknown[][]=[];const previous=console.error;console.error=(...args)=>{warnings.push(args);};
 try{await act(async()=>{root=hydrateRoot(container,<ThemeToggle/>);});assert.equal(warnings.length,0);assert.equal(document.documentElement.dataset.theme,'dark');}finally{console.error=previous;}

 await render(<PathnameContext.Provider value="/software/python/"><Header/></PathnameContext.Provider>);
 assert.equal(container.querySelector('a[aria-current="page"]')?.textContent,'All Software');
 const menu=container.querySelector<HTMLButtonElement>('.menu-toggle')!;
 await click(menu);assert.equal(menu.getAttribute('aria-expanded'),'true');
 await act(async()=>document.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true})));assert.equal(menu.getAttribute('aria-expanded'),'false');assert.equal(document.activeElement,menu);

 await render(<Directory kind="software"/>);assert.equal(container.querySelectorAll('.tool-card').length,software.length);
 await setValue(container.querySelector('input[type="search"]')!,'pYtHoN');assert.equal(container.querySelectorAll('.tool-card').length,1);assert.match(container.querySelector('.tool-card')!.textContent!,/Python/);
 await click(button('Civil Engineering'));assert.ok(container.querySelector('.empty-state'));
 await click(button('Clear filters'));assert.equal(container.querySelectorAll('.tool-card').length,software.length);
 await render(<ServiceDirectory/>);assert.equal(container.querySelectorAll('.category-overview-card').length,8);
 await setValue(container.querySelector('input[type="search"]')!,'CYBERSECURITY');assert.ok(container.querySelectorAll('.offering-card').length>0);
 await click(button('Finance & Accounting'));assert.ok(container.querySelector('.empty-state'));
 await click(button('Clear service filters'));assert.ok(container.querySelectorAll('.offering-card').length>30);
 await render(<Directory kind="samples"/>);assert.equal(container.querySelectorAll('.sample-card').length,11);
 await click(button('Management'));assert.equal(container.querySelectorAll('.sample-card').length,2);
 await render(<SamplePreview slug="example" title="Test report" pages={3}/>);
 assert.equal(container.querySelector<HTMLButtonElement>('[aria-label="Previous preview page"]')!.disabled,true);
 await click(container.querySelector('[aria-label="Next preview page"]')!);assert.match(container.querySelector('img')!.getAttribute('src')!,/page-2.webp/);
 await click(container.querySelector('[aria-label="Zoom in preview"]')!);assert.match(container.textContent!,/125%/);
 assert.equal(container.querySelectorAll('a[download],iframe').length,0);
 assert.equal(container.querySelector('img')!.draggable,false);

 let available=false;let delivery:'success'|'error'|'pending'='error';let finishDelivery:()=>void=()=>{};
 const requests:string[]=[];
 globalThis.fetch=async(input,options)=>{requests.push(String(input));if(!options?.method)return Response.json({available,attachmentsAllowed:false,siteKey:available?'mock-site-key':''});if(delivery==='pending')return new Promise<Response>(resolve=>{finishDelivery=()=>resolve(Response.json({error:'Mock provider rejected this enquiry.'},{status:502}));});return delivery==='success'?Response.json({receipt:'mock-receipt',message:'The email service accepted your enquiry for delivery.'}):Response.json({error:'Mock provider rejected this enquiry.'},{status:502});};
 const enquiry=(key:string)=><SearchParamsContext.Provider value={new URLSearchParams('plan=Project+support&software=Python&category=Information+Technology')}><Enquiry key={key}/></SearchParamsContext.Provider>;
 await render(enquiry('unavailable'));assert.match(container.textContent!,/Online sending is currently unavailable/);assert.ok(button('Send Enquiry').disabled);assert.equal(container.querySelector<HTMLSelectElement>('#plan')!.value,'Project support');assert.equal(container.querySelector<HTMLInputElement>('#software')!.value,'Python');
 await render(<SearchParamsContext.Provider value={new URLSearchParams('specificService=academic-referencing')}><Enquiry key="academic"/></SearchParamsContext.Provider>);
 assert.equal(container.querySelector<HTMLSelectElement>('#category')!.value,'Academic Writing & Research');assert.equal(container.querySelector<HTMLSelectElement>('#specificService')!.value,'academic-referencing');assert.ok(container.querySelector('#referencingStyle'));assert.ok(container.querySelector('#formatting'));
 await setValue(container.querySelector('#category')!,'Finance & Accounting');assert.equal(container.querySelector<HTMLSelectElement>('#specificService')!.value,'');assert.ok(!container.querySelector('#referencingStyle'));assert.match(container.querySelector('#specificService')!.textContent!,/Advanced Excel/);assert.ok(!container.querySelector('#specificService')!.textContent!.includes('Cybersecurity'));
 available=true;let solve:(value:string)=>void=()=>{};
 Object.assign(window,{turnstile:{render:(_el:HTMLElement,options:{callback:(v:string)=>void})=>{solve=options.callback;return 'mock-widget';},remove:()=>{},reset:()=>{}}});
 await render(enquiry('available'));
 const script=document.querySelector('script[src*="turnstile"]');assert.ok(script);
 await act(async()=>script.dispatchEvent(new dom.window.Event('load')));
 await act(async()=>solve('mock-token'));
 await setValue(container.querySelector('#name')!,'Visitor');await setValue(container.querySelector('#email')!,'visitor@example.test');await setValue(container.querySelector('#context')!,'Academic learning');await setValue(container.querySelector('#service')!,'Debugging & technical review');await setValue(container.querySelector('#requirements')!,'Please explain this small programming problem.');await click(container.querySelector('input[name="consent"]')!);
 delivery='pending';
 await act(async()=>container.querySelector('form')!.dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true})));
 assert.equal(container.querySelector('form')!.getAttribute('aria-busy'),'true');assert.ok(button('Sending').disabled);assert.ok(!container.textContent!.includes('Reference:'));await act(async()=>finishDelivery());
 assert.match(container.querySelector('[role="status"]')!.textContent!,/Mock provider rejected/);assert.ok(!container.textContent!.includes('Reference:'));
 await act(async()=>solve('another-mock-token'));delivery='success';
 await act(async()=>container.querySelector('form')!.dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true})));
 assert.match(container.textContent!,/Reference: mock-receipt/);assert.ok(button('Send Enquiry').disabled);
 assert.ok(requests.length>=4);
 await act(async()=>root.unmount());dom.window.close();
 } catch(error) {if(error instanceof AggregateError) console.error(error.errors);throw error;}
});
