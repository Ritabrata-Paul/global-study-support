import {spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,readdirSync,statSync,mkdirSync,copyFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';

// Keep Next.js as the page renderer. The small Web-API backend is shared with
// the native Next server and bundled into a Worker for the existing Sites host.
if(existsSync('public/samples')&&files('public/samples').length)throw new Error('Public sample source files are forbidden; use watermarked page previews.');
const result=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build'],{stdio:'inherit',env:{...process.env,GSS_EXPORT:'true'}});
if(result.status!==0)process.exit(result.status||1);
const origin=(process.env.NEXT_PUBLIC_SITE_URL||'https://global-study-support.patelprincem2000.chatgpt.site').replace(/\/$/,'');
function files(dir){return readdirSync(dir).flatMap(n=>{const p=path.join(dir,n);return statSync(p).isDirectory()?files(p):[p];});}
// The .ts API/metadata routes are intentionally excluded from the static page
// build. The Worker handles the API and these metadata files are produced here.
const routes=files('out').filter(f=>f.endsWith('index.html')).map(f=>'/'+path.relative('out',f).replaceAll('\\','/').replace(/index.html$/,'')).filter(p=>!['/404/','/_not-found/'].includes(p));
writeFileSync('out/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(p=>'<url><loc>'+origin+p+'</loc></url>').join('')+'</urlset>');
writeFileSync('out/robots.txt','User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+origin+'/sitemap.xml\n');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.pdf':'application/pdf','.csv':'text/csv; charset=utf-8','.py':'text/plain; charset=utf-8','.ico':'image/x-icon'};
// Intern repeated text fragments before compression. Many exported HTML/RSC
// pages share navigation and catalogue content; storing separately compressed
// copies wastes the standalone Worker's limited module size. Raster assets and
// document previews remain byte-for-byte unchanged.
const assets={};const fragments=[];const fragmentIds=new Map();const refs={};
for(const file of files('out')){
 const key='/'+path.relative('out',file).replaceAll('\\','/');
 if(key==='/logo.png'||/^\/images\/.*\.jpg$/.test(key))continue;
 // Next's generated RSC .txt payloads are page data, not report sources.
 if(/\.(docx?|pdf)$/i.test(key)||/^\/samples\/[^/]+\.(csv|py)$/i.test(key))throw new Error('Private sample source found in export: '+key);
 const bytes=readFileSync(file);const mime=types[path.extname(file)]||'application/octet-stream';const textual=/text|javascript|json|xml|svg/.test(mime);
 if(textual)refs[key]=bytes.toString('utf8').split(/(?<=[>,{}\n])/).map(fragment=>{let id=fragmentIds.get(fragment);if(id===undefined){id=fragments.length;fragmentIds.set(fragment,id);fragments.push(fragment);}return id;});
 assets[key]=[textual?null:bytes.toString('base64'),mime,textual,createHash('sha256').update(bytes).digest('hex').slice(0,24)];
}
let handler=readFileSync('server/enquiries.mjs','utf8').replace("import catalogue from '../lib/enquiry-options.json' with {type:'json'};",'const catalogue='+readFileSync('lib/enquiry-options.json','utf8')+';').replaceAll('export function ','function ').replaceAll('export async function ','async function ');
let security=readFileSync('server/security.mjs','utf8').replace('export const securityHeaders','const securityHeaders');
const textBundle=gzipSync(JSON.stringify({fragments,refs})).toString('base64');
const worker=`${handler}\n${security}\nconst assets=${JSON.stringify(assets)};\nconst packedText=${JSON.stringify(textBundle)};\n`+readFileSync('server/sites-worker.mjs','utf8');
if(gzipSync(worker).length>9.5*1024*1024)throw new Error('Worker bundle exceeds project size budget. Use asset bindings before adding more assets.');
mkdirSync('dist/server',{recursive:true});mkdirSync('dist/.openai',{recursive:true});
writeFileSync('dist/server/index.js',worker);copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
console.log('Sites Worker built with '+Object.keys(assets).length+' assets; gzip bundle '+Math.round(gzipSync(worker).length/1024)+' KB.');
