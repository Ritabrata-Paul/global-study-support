// Optional authoring utility; no runtime downloads or new application dependency.
// Uses the project's existing Sharp image tooling. Original twenty assets stay intact.
import sharp from 'sharp';
import {writeFileSync} from 'node:fs';
const icons={javascript:'javascript',typescript:'typescript','next-js':'nextjs','node-js':'nodejs',angular:'angular',flutter:'flutter','android-studio':'androidstudio',git:'git',github:'github',kubernetes:'kubernetes',jenkins:'jenkins',postman:'postman','visual-studio-code':'vscode',linux:'linux',mysql:'mysql',postgresql:'postgresql',mongodb:'mongodb','microsoft-azure':'azure','google-cloud':'googlecloud',terraform:'terraform','azure-devops':'azuredevops',trello:'trello',asana:'asana',notion:'notion',rstudio:'rstudio',c:'c',cpp:'cplusplus',csharp:'csharp',html:'html5',css:'css3',express:'express',kotlin:'kotlin','react-native':'react'};
const entries=Object.entries(icons);const assets={};const sources={};
for(let i=0;i<entries.length;i+=5)await Promise.all(entries.slice(i,i+5).map(async([slug,icon])=>{
 for(const variant of ['original','original-wordmark','plain']){
  const source=`https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/${icon}/${icon}-${variant}.svg`;
  try{const r=await fetch(source,{signal:AbortSignal.timeout(20000)});if(!r.ok)continue;const svg=Buffer.from(await r.arrayBuffer());if(!svg.toString().includes('<svg'))continue;
   const png=await sharp(svg,{density:160}).resize(160,96,{fit:'inside',withoutEnlargement:false}).extend({top:4,bottom:4,left:4,right:4,background:{r:255,g:255,b:255,alpha:0}}).png().toBuffer();
   writeFileSync(`public/software-logos/${slug}.png`,png);assets[slug]=`/software-logos/${slug}.png`;sources[slug]=source;return;
  }catch{}
 }
 console.log('Using fallback icon:',slug);
}));
writeFileSync('lib/software-logo-assets.json',JSON.stringify(assets,null,2)+'\n');
writeFileSync('public/software-logos/expanded-sources.json',JSON.stringify(sources,null,2)+'\n');
console.log(`Prepared ${Object.keys(assets).length} additional sourced product icons.`);
