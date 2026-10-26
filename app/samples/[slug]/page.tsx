import Photo from '@/components/photo';
import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Check,ArrowUpRight} from 'lucide-react';
import {samples,services} from '@/lib/data';
import {sampleDetails} from '@/lib/details';
import SamplePreview from '@/components/sample-preview';
import previewManifest from '@/lib/preview-manifest.json';
import {PageIntro,CodePreview,Dashboard,CTA} from '@/components/site';
import FinancialDemo from '@/components/financial-demo';
export function generateStaticParams(){return samples.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;const s=samples.find(s=>s.slug===slug);return {title:s?.title+' | Reference Sample',description:s?.description,alternates:{canonical:'/samples/'+slug+'/'}}}
export default async function Sample({params}:{params:Promise<{slug:string}>}){
 const{slug}=await params;const s=samples.find(s=>s.slug===slug);if(!s)notFound();
 const detail=sampleDetails[slug];const service=services.find(x=>x.title===s.category);
 const preview=(previewManifest as Record<string,{pages:number;width:number;height:number}>)[slug];
 const ownerSupplied=s.kind==='owner-supplied';
 return <><PageIntro eyebrow={ownerSupplied?'Owner-supplied reference':'Original demonstration'} title={s.title} description={s.description}/><section className="container inner-section"><div className="sample-detail"><div>
 <div className="sample-cover">{ownerSupplied?<img src={'/previews/'+slug+'/page-1.webp'} width={1080} height={1528} alt={s.title+' first page'} loading="lazy"/>:slug==='python-data-analysis'?<CodePreview/>:slug==='financial-dashboard'?<Dashboard/>:<Photo name={s.image} alt="Illustrative stock photograph; no verified CAD or BIM project screenshot is available"/>}<span className="sample-label">{ownerSupplied?'OWNER-SUPPLIED REFERENCE':'ILLUSTRATIVE DEMONSTRATION'}</span></div>
 <div className="sample-overview"><h2>Project overview</h2><p>{s.description}</p><p className="demo-disclosure">{ownerSupplied?'Owner-supplied reference report, converted for viewing. This is not presented as a verified client engagement. Engineering reports do not establish approval for construction or manufacture.':'Original demonstration using synthetic information or conceptual assumptions. This is not verified client work. Engineering material is not approved for manufacturing or construction.'}</p>
 <h2>Objectives</h2><ul className="check-list">{detail.objectives.map(t=><li key={t}><Check size={15}/>{t}</li>)}</ul>
 <h2>Tools and concepts</h2><div className="tags">{s.tools.map(t=><span key={t}>{t}</span>)}</div>
 <h2>Methodology</h2><ol className="methodology-list">{detail.methodology.map(t=><li key={t}>{t}</li>)}</ol>
 {slug==='financial-dashboard'&&<><h2>Interactive demonstration</h2><FinancialDemo/></>}
 <h2>Preview context</h2>{detail.screenshots.length?<div className="sample-screenshots">{detail.screenshots.map(image=><figure key={image.src}><img src={image.src} alt={image.alt} width={900} height={600}/><figcaption>{image.caption}</figcaption></figure>)}</div>:<p>{ownerSupplied?'The page preview shows the supplied report itself. Any images within the report are reproduced as part of that reference; no separate project files or verified client screenshots are claimed.':'The photograph or code-based preview above is illustrative. The PDF pages below contain the reference material.'}</p>}
 <h2>Learning outcomes</h2><ul className="check-list">{detail.outcomes.map(t=><li key={t}><Check size={15}/>{t}</li>)}</ul>
 <h2>PDF preview</h2>{preview?<SamplePreview slug={slug} title={s.title} pages={preview.pages} width={preview.width} height={preview.height}/>:<p>This reference preview is being prepared.</p>}<p className="field-note">Reference for viewing and evaluation only. Contact us to discuss guidance for a similar project.</p>
 </div></div><aside><div className="info-panel"><span className="eyebrow">{s.category}</span><h3 style={{marginTop:14}}>Reference contents</h3><ul className="check-list">{s.deliverables.map(d=><li key={d}><Check size={15}/>{d}</li>)}</ul><p className="field-note" style={{marginTop:22}}>Preview only. Source files are not provided through this portfolio.</p>{service&&<Link className="text-link" style={{marginTop:18}} href={'/services/'+service.slug+'/'}>Related service <ArrowUpRight size={15}/></Link>}<Link className="text-link" style={{marginTop:18}} href={'/contact/?category='+encodeURIComponent(s.category)+'&software='+encodeURIComponent(s.tools[0])}>Discuss similar support <ArrowUpRight size={15}/></Link></div></aside>
 </div></section><CTA/></>;
}
