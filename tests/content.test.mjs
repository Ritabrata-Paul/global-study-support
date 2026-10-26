import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {services,software,samples} from '../lib/data.ts';
import {serviceDetails,toolDetails,sampleDetails,assistanceTypes,pricingPlans} from '../lib/details.ts';
import {publishedOfferings} from '../lib/service-catalog.ts';
import {softwareCategoryOptions} from '../lib/software-catalog.ts';
import {referenceStyles} from '../lib/academic.ts';
import {createHash} from 'node:crypto';

import {filterDirectory} from '../lib/search.ts';

test('all existing disciplines, tools and samples are preserved with unique routes',()=>{assert.equal(services.length,8);assert.ok(software.length>70);assert.equal(samples.length,11);assert.equal(samples.filter(s=>s.kind==='owner-supplied').length,7);for(const items of [services,software,samples])assert.equal(new Set(items.map(s=>s.slug)).size,items.length);});
test('every detail page has structured content',()=>{for(const s of services){if(serviceDetails[s.slug]){assert.ok(serviceDetails[s.slug].overview.length>100);assert.ok(serviceDetails[s.slug].faqs.length>=2);}assert.ok(publishedOfferings.some(o=>o.category===s.title));for(const name of s.tools)assert.ok(software.some(t=>t.name===name));}for(const t of software)assert.ok(toolDetails[t.slug]?.[1].length);for(const s of samples){const d=sampleDetails[s.slug];assert.ok(d.objectives.length&&d.methodology.length&&d.outcomes.length);const manifest=JSON.parse(readFileSync('lib/preview-manifest.json'));assert.ok(manifest[s.slug]?.pages>0);for(let page=1;page<=manifest[s.slug].pages;page++)assert.ok(existsSync('public/previews/'+s.slug+'/page-'+page+'.webp'));}});
test('search is case insensitive, whitespace tolerant, category-aware and returns empty results',()=>{assert.equal(filterDirectory(software,'pYtHoN','All')[0].name,'Python');assert.equal(filterDirectory(software,'  power   bi  ','All')[0].name,'Power BI');assert.equal(filterDirectory(software,'Python','Civil Engineering').length,0);assert.equal(filterDirectory(software,'no-such-software','All').length,0);assert.equal(filterDirectory(software,'','All').length,software.length);assert.equal(filterDirectory(samples,'pandas','All')[0].slug,'python-data-analysis');});
test('backend and frontend agree on selectable assistance and plans',()=>{const server=readFileSync('server/enquiries.mjs','utf8');for(const value of [...assistanceTypes,...pricingPlans])assert.ok(server.includes(value));});
function luminance(hex){const rgb=hex.replace('#','').match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
function contrast(a,b){const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
test('core text and button colour pairs meet WCAG AA normal-text contrast',()=>{for(const[a,b]of [['#172033','#ffffff'],['#526174','#f7f9fc'],['#0d7f75','#ffffff'],['#2563eb','#ffffff'],['#f1f5f9','#1e293b'],['#cbd5e1','#0f172a'],['#5eead4','#1e293b'],['#8ab4ff','#1e293b']])assert.ok(contrast(a,b)>=4.5,a+' on '+b);});

test('all 20 tools use real image assets and no source documents are public',()=>{for(const s of software.slice(0,20))assert.ok(existsSync('public/software-logos/'+s.slug+'.png'),s.name);function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]);}assert.ok(!walk('public').some(f=>/\.(docx?|pdf)$/i.test(f)));const template=readFileSync('app/samples/[slug]/page.tsx','utf8');assert.ok(!template.includes(' download'));assert.ok(!template.includes('<iframe'));});

test('expanded catalogue has unique meaningful pages and only valid relevant connections',()=>{
 const routes=[...services,...publishedOfferings];assert.equal(new Set(routes.map(s=>s.slug)).size,routes.length);
 for(const o of publishedOfferings){assert.ok(o.description.length>90);assert.ok(o.topics.length>=4);assert.ok(o.deliverables.length>=3);assert.ok(o.question&&o.answer&&o.preparation);assert.ok(services.some(c=>c.title===o.category));for(const name of o.tools)assert.ok(software.some(t=>t.name===name),name);for(const slug of o.samples)assert.ok(samples.some(s=>s.slug===slug),slug);}
 for(const t of software){assert.ok(t.description.length>35,t.name);assert.ok(t.topics.length>=3,t.name);assert.match(t.source,/^https:\/\//);for(const c of t.categories)assert.ok(softwareCategoryOptions.includes(c),c);}
});
test('multi-category software filters reuse one software record and search topic descriptions',()=>{
 assert.equal(software.filter(t=>t.name==='AutoCAD').length,1);
 for(const category of ['Civil Engineering','Mechanical Engineering'])assert.ok(filterDirectory(software,'AutoCAD',category).some(s=>s.slug==='autocad'));
 for(const category of ['Finance & Accounting','Statistics & Data Analytics'])assert.ok(filterDirectory(software,'Power BI',category).some(s=>s.slug==='power-bi'));
 assert.ok(filterDirectory(software,'reference-management','Academic Writing & Research').length>0);
});
test('backend catalogue matches published services and all nine citation styles',()=>{
 const options=JSON.parse(readFileSync('lib/enquiry-options.json'));assert.deepEqual(options.categories,services.map(s=>s.title));assert.deepEqual(options.services,publishedOfferings.map(({slug,title,category})=>({slug,title,category})));assert.equal(referenceStyles.length,9);for(const s of referenceStyles){assert.ok(options.referenceStyles.includes(s.name));assert.ok(s.reference&&s.inline&&s.citations&&s.bibliography&&s.conventions&&s.disciplines);}
});
test('existing portfolio templates, manifest and sample data stay unchanged during expansion',()=>{
 const baseline={"app/samples/[slug]/page.tsx": "e71dd9a3e8f9af6bb5e2cd96f5a5a10f4aeca189e2df694d4ab9e8f03cd930bc", "components/sample-preview.tsx": "43ca5eff73384dbd2ff7cbdad7b48db96f0be3f9d26521da75059f7cdc1865ee", "lib/owner-samples.ts": "21da188cf7d2da983ed147fb804911771f20ceac20630dec99d7d0631ce84fa0", "lib/preview-manifest.json": "74048c003173f7489a6d39a32e986c45c14d98ce9de1eb18ac801167f905a4fe"};
 for(const [file,hash] of Object.entries(baseline)){const bytes=readFileSync(file,'utf8').replace(/\r\n/g,'\n');assert.equal(createHash('sha256').update(bytes).digest('hex'),hash,file);}
});
