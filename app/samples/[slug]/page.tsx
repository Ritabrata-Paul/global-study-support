import Photo from '@/components/photo';
import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Check,Download,ArrowUpRight,FileText} from 'lucide-react';
import {samples,services} from '@/lib/data';
import {sampleDetails} from '@/lib/details';
import {sampleFileExists} from '@/lib/sample-files';
import {PageIntro,CodePreview,Dashboard,CTA} from '@/components/site';
import FinancialDemo from '@/components/financial-demo';
export function generateStaticParams(){return samples.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;const s=samples.find(s=>s.slug===slug);return {title:s?.title+' | Reference Sample',description:s?.description,alternates:{canonical:'/samples/'+slug+'/'}}}
export default async function Sample({params}:{params:Promise<{slug:string}>}){
 const{slug}=await params;const s=samples.find(s=>s.slug===slug);if(!s)notFound();
 const detail=sampleDetails[slug];const service=services.find(x=>x.title===s.category);
 const pdf=sampleFileExists(slug+'.pdf')?'/samples/'+slug+'.pdf':null;
 const downloads=detail.downloads.filter(d=>sampleFileExists(d.file));
 return <><PageIntro eyebrow="Original demonstration" title={s.title} description={s.description}/><section className="container inner-section"><div className="sample-detail"><div>
 <div className="sample-cover">{slug==='python-data-analysis'?<CodePreview/>:slug==='financial-dashboard'?<Dashboard/>:<Photo name={s.image} alt="Illustrative stock photograph; no verified CAD or BIM project screenshot is available"/>}<span className="sample-label">ILLUSTRATIVE DEMONSTRATION</span></div>
 <div className="sample-overview"><h2>Project overview</h2><p>{s.description}</p><p className="demo-disclosure">Original reference demonstration using synthetic information or conceptual assumptions. This is not verified client work. Engineering material is not approved for manufacturing or construction.</p>
 <h2>Objectives</h2><ul className="check-list">{detail.objectives.map(t=><li key={t}><Check size={15}/>{t}</li>)}</ul>
 <h2>Tools and concepts</h2><div className="tags">{s.tools.map(t=><span key={t}>{t}</span>)}</div>
 <h2>Methodology</h2><ol className="methodology-list">{detail.methodology.map(t=><li key={t}>{t}</li>)}</ol>
 {slug==='financial-dashboard'&&<><h2>Interactive demonstration</h2><FinancialDemo/></>}
 <h2>Project images and screenshots</h2>{detail.screenshots.length?<div className="sample-screenshots">{detail.screenshots.map(image=><figure key={image.src}><img src={image.src} alt={image.alt} width={900} height={600}/><figcaption>{image.caption}</figcaption></figure>)}</div>:<p>No verified project screenshots have been supplied for this reference. The photograph or code-based preview above is illustrative. Read the available reference files to review the methodology.</p>}
 <h2>Learning outcomes</h2><ul className="check-list">{detail.outcomes.map(t=><li key={t}><Check size={15}/>{t}</li>)}</ul>
 {pdf?<><h2>Reference preview</h2><a className="text-link" href={pdf} target="_blank" rel="noreferrer"><FileText size={16}/>Open reference PDF <ArrowUpRight size={15}/></a><iframe className="pdf-preview" src={pdf} loading="lazy" title={s.title+' reference PDF'}/><p className="field-note">If your browser cannot display PDFs, open or download the reference.</p></>:<p>Reference PDF is not currently available.</p>}
 </div></div><aside><div className="info-panel"><span className="eyebrow">{s.category}</span><h3 style={{marginTop:14}}>Available deliverables</h3><ul className="check-list">{s.deliverables.map(d=><li key={d}><Check size={15}/>{d}</li>)}</ul><div className="sample-downloads">{pdf&&<a className="button" href={pdf} download><Download size={16}/>Download reference PDF</a>}{downloads.map(d=><a className="button secondary" href={'/samples/'+d.file} download key={d.file}><Download size={16}/>{d.label}</a>)}</div><p className="field-note" style={{marginTop:22}}>No native CAD, BIM or Power BI model is included. Availability of downloads is checked when this page is built.</p>{service&&<Link className="text-link" style={{marginTop:18}} href={'/services/'+service.slug+'/'}>Related service <ArrowUpRight size={15}/></Link>}<Link className="text-link" style={{marginTop:18}} href={'/contact/?category='+encodeURIComponent(s.category)+'&software='+encodeURIComponent(s.tools[0])}>Discuss similar support <ArrowUpRight size={15}/></Link></div></aside>
 </div></section><CTA/></>;
}
