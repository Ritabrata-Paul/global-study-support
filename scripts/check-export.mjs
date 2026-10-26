import {readFileSync,readdirSync,existsSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve('out');
function walk(d){return readdirSync(d).flatMap(n=>{const p=join(d,n);return statSync(p).isDirectory()?walk(p):[p]})}
const files=walk(root).filter(p=>p.endsWith('.html'));
const missing=[];
for(const file of files){const html=readFileSync(file,'utf8');for(const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)){const url=m[1];if(url.startsWith('//'))continue;const p=join(root,decodeURIComponent(url));if(!existsSync(p)&&!existsSync(join(p,'index.html')))missing.push({file,url})}}
if(missing.length){console.error(missing);process.exit(1)}
console.log(`Verified internal links and assets across ${files.length} exported HTML pages.`);
