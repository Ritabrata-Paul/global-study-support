const logoSlugs = ['python','java','react','aws','docker','matlab','solidworks','ansys','autocad','revit','etabs','staad-pro','excel','power-bi','quickbooks','microsoft-project','jira','spss','r','stata'];
const logos = Object.fromEntries(logoSlugs.map(slug=>[slug,'/software-logos/'+slug+'.png']));

export default function SoftwareMark({name,mark,slug}:{name:string;mark:string;slug:string}) {
  return <span className={'tool-mark software-logo software-logo-'+slug} aria-hidden="true">{logos[slug]?<img src={logos[slug]} alt="" title={slug==='staad-pro'?'STAAD.Pro - Bentley vendor mark':name} width={80} height={48}/>:<span title={name}>{mark}</span>}</span>;
}
