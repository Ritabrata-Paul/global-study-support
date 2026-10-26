// Appended by build-sites.mjs after the shared handler, headers and asset map.
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname==='/api/enquiries/'||url.pathname==='/api/enquiries')return handleEnquiry(request,env,{ip:request.headers.get('cf-connecting-ip')||'shared'});
  if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD',...securityHeaders}});
  let key;try{key=decodeURIComponent(url.pathname);}catch{return new Response('Invalid URL',{status:400});}
  let asset=assets[key];
  if(!asset&&!pathHasExtension(key)){
   const directory=key.replace(/\/$/,'')+'/index.html';
   if(assets[directory]&&!key.endsWith('/'))return Response.redirect(url.origin+key+'/'+url.search,308);
   key=directory;asset=assets[key];
  }
  if(url.pathname==='/'){key='/index.html';asset=assets[key];}
  const status=asset?200:404;
  asset=asset||assets['/404.html'];
  if(!asset)return new Response('Not found',{status:404,headers:securityHeaders});
  const headers=new Headers({...securityHeaders,'Content-Type':asset[1],'Cache-Control':key.startsWith('/_next/')?'public, max-age=31536000, immutable':'public, max-age=0, must-revalidate',ETag:'W/"'+asset[3]+'"'});
  if(asset[2])headers.set('Vary','Accept-Encoding');
  if(status===200&&request.headers.get('if-none-match')===headers.get('etag'))return new Response(null,{status:304,headers});
  const bytes=Uint8Array.from(atob(asset[0]),c=>c.charCodeAt(0));
  let body=bytes;
  if(asset[2]){
   if(acceptsGzip(request.headers.get('accept-encoding')||''))headers.set('Content-Encoding','gzip');
   else body=new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
  }
  headers.set('Content-Length',String(body.byteLength));
  return new Response(request.method==='HEAD'?null:body,{status,headers});
 }
};
function pathHasExtension(value){return /\.[a-z0-9]+$/i.test(value);}
function acceptsGzip(value){const encodings=value.toLowerCase().split(',').map(v=>v.trim().split(';'));const entry=encodings.find(([name])=>name==='gzip')||encodings.find(([name])=>name==='*');return Boolean(entry&&!entry.slice(1).some(p=>/^q\s*=\s*0(?:\.0*)?$/.test(p.trim())));}
