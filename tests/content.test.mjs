import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {services,software,samples} from '../lib/data.ts';
import {serviceDetails,toolDetails,sampleDetails,assistanceTypes,pricingPlans} from '../lib/details.ts';
import {filterDirectory} from '../lib/search.ts';

test('all existing disciplines, tools and samples are preserved with unique routes',()=>{assert.equal(services.length,4);assert.equal(software.length,20);assert.equal(samples.length,4);for(const items of [services,software,samples])assert.equal(new Set(items.map(s=>s.slug)).size,items.length);});
test('every detail page has structured content',()=>{for(const s of services){assert.ok(serviceDetails[s.slug].overview.length>100);assert.ok(serviceDetails[s.slug].faqs.length>=2);for(const name of s.tools)assert.ok(software.some(t=>t.name===name));}for(const t of software)assert.ok(toolDetails[t.slug]?.[1].length);for(const s of samples){const d=sampleDetails[s.slug];assert.ok(d.objectives.length&&d.methodology.length&&d.outcomes.length);for(const f of d.downloads)assert.ok(existsSync('public/samples/'+f.file));assert.ok(existsSync('public/samples/'+s.slug+'.pdf'));}});
test('search is case insensitive, whitespace tolerant, category-aware and returns empty results',()=>{assert.equal(filterDirectory(software,'pYtHoN','All')[0].name,'Python');assert.equal(filterDirectory(software,'  power   bi  ','All')[0].name,'Power BI');assert.equal(filterDirectory(software,'Python','Civil Engineering').length,0);assert.equal(filterDirectory(software,'no-such-software','All').length,0);assert.equal(filterDirectory(software,'','All').length,20);assert.equal(filterDirectory(samples,'pandas','All')[0].slug,'python-data-analysis');});
test('backend and frontend agree on selectable assistance and plans',()=>{const server=readFileSync('server/enquiries.mjs','utf8');for(const value of [...assistanceTypes,...pricingPlans])assert.ok(server.includes(value));});
function luminance(hex){const rgb=hex.replace('#','').match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
function contrast(a,b){const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
test('core text and button colour pairs meet WCAG AA normal-text contrast',()=>{for(const[a,b]of [['#172033','#ffffff'],['#526174','#f7f9fc'],['#0d7f75','#ffffff'],['#2563eb','#ffffff'],['#f1f5f9','#1e293b'],['#cbd5e1','#0f172a'],['#5eead4','#1e293b'],['#8ab4ff','#1e293b']])assert.ok(contrast(a,b)>=4.5,a+' on '+b);});
