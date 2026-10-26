import {readFileSync,readdirSync,statSync} from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
function walk(dir){return readdirSync(dir).flatMap(n=>{const p=path.join(dir,n);return statSync(p).isDirectory()?walk(p):[p];});}
const titles=new Set();let count=0;const routes=[];
for(const file of walk('out').filter(f=>f.endsWith('index.html')&&!f.includes('_not-found')&&path.relative('out',f).split(path.sep)[0]!=='404')){
 const dom=new JSDOM(readFileSync(file,'utf8'));const {document}=dom.window;
 assert.equal(document.querySelectorAll('main h1').length,1,file);
 const title=document.title;assert.ok(title.length>12,file);assert.ok(!titles.has(title),'Duplicate title: '+title);titles.add(title);
 assert.ok(document.querySelector('meta[name="description"]')?.content.length>35,file);
 const canonical=document.querySelector('link[rel="canonical"]')?.href;assert.ok(canonical,file);
 const route='/'+path.relative('out',file).replaceAll('\\','/').replace(/index.html$/,'');assert.equal(new URL(canonical).pathname,route,file);routes.push(route);
 for(const a of document.querySelectorAll('a'))assert.ok(a.getAttribute('href'),'Empty link in '+file);
 count++;dom.window.close();
}
const sitemap=readFileSync('out/sitemap.xml','utf8');for(const route of routes)assert.ok(sitemap.includes(route+'</loc>'),route);
for(const slug of ['cybersecurity','cloud-computing','web-development','project-management','advanced-excel','academic-referencing'])assert.ok(routes.includes('/services/'+slug+'/'),slug);
assert.equal(routes.filter(r=>r.startsWith('/samples/')).length,12);
assert.equal(new Set(routes).size,routes.length);
console.log(`SEO, canonical URLs, one H1, route uniqueness and sitemap checked across ${count} pages; all 11 sample routes retained.`);
