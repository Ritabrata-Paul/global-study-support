import expandedLogos from '@/lib/software-logo-assets.json';
import {AppWindow} from 'lucide-react';
const logoSlugs = ['python','java','react','aws','docker','matlab','solidworks','ansys','autocad','revit','etabs','staad-pro','excel','power-bi','quickbooks','microsoft-project','jira','spss','r','stata'];
const logos:Record<string,string> = {...Object.fromEntries(logoSlugs.map(slug=>[slug,'/software-logos/'+slug+'.png'])),...expandedLogos};

export default function SoftwareMark({name,slug}:{name:string;mark:string;slug:string}) {
  return <span className={'tool-mark software-logo software-logo-'+slug} aria-hidden="true">{logos[slug]?<img src={logos[slug]} alt="" title={slug==='staad-pro'?'STAAD.Pro - Bentley vendor mark':name} width={80} height={48} loading="lazy"/>:<AppWindow size={30}/>}</span>;
}
