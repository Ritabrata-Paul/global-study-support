import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {readFileSync} from 'node:fs';
const source=readFileSync('dist/server/index.js');
// data import makes ESM explicit without changing the app's package module type.
const {default:worker}=await import('data:text/javascript;base64,'+source.toString('base64'));
const origin='https://example.test';
const routes=['/','/about/','/services/','/software/','/samples/','/how-it-works/','/pricing/','/contact/','/faq/','/privacy/','/terms/','/academic-integrity/'];
let count=0;
for(const route of routes){const r=await worker.fetch(new Request(origin+route),{});assert.equal(r.status,200,route);const html=await r.text();assert.match(html,/<main/);assert.ok(r.headers.get('content-security-policy'));count++;}
for(const route of ['/software/python/','/software/power-bi/','/services/civil-engineering/','/samples/financial-dashboard/','/samples/revit-bim-coordination-report/','/samples/talent-management-report/','/previews/revit-bim-coordination-report/page-35.webp','/previews/python-data-analysis/page-1.webp','/software-logos/python.svg','/fonts/jakarta-latin.woff2','/favicon.png','/sitemap.xml','/robots.txt']){const r=await worker.fetch(new Request(origin+route),{});assert.equal(r.status,200,route);assert.ok((await r.arrayBuffer()).byteLength);count++;}
for(const path of ['/missing-page/','/samples/python-data-analysis.pdf','/sample/Excel_sample.docx'])assert.equal((await worker.fetch(new Request(origin+path),{})).status,404);
assert.equal((await worker.fetch(new Request(origin+'/services'),{})).status,308);
assert.equal((await worker.fetch(new Request(origin+'/',{method:'POST'}),{})).status,405);
const head=await worker.fetch(new Request(origin+'/',{method:'HEAD'}),{});assert.equal((await head.text()).length,0);
const first=await worker.fetch(new Request(origin+'/'),{});assert.equal((await worker.fetch(new Request(origin+'/',{headers:{'if-none-match':first.headers.get('etag')}}),{})).status,304);
const zipped=await worker.fetch(new Request(origin+'/',{headers:{'accept-encoding':'gzip'}}),{});assert.equal(zipped.headers.get('content-encoding'),'gzip');
const cfg=await worker.fetch(new Request(origin+'/api/enquiries/'),{});assert.equal((await cfg.json()).available,false);
const blocked=await worker.fetch(new Request(origin+'/api/enquiries/',{method:'POST',headers:{origin},body:new FormData()}),{});assert.ok(blocked.status>=400);
console.log(`Worker smoke checks passed: ${count} pages/assets plus 404, redirects, methods, HEAD, ETag, gzip and fail-closed API.`);
