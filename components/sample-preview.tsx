'use client';

import {useState} from 'react';
import {ChevronLeft,ChevronRight,ZoomIn,ZoomOut} from 'lucide-react';

export default function SamplePreview({slug,title,pages,width=1080,height=1528}:{slug:string;title:string;pages:number;width?:number;height?:number}) {
 const [page,setPage]=useState(1);
 const [zoom,setZoom]=useState(100);
 const [loaded,setLoaded]=useState(false);
 const [failed,setFailed]=useState(false);
 function change(value:number){setPage(value);setLoaded(false);setFailed(false);}
 return <section className="document-preview" aria-label={title+' watermarked PDF preview'} onContextMenu={e=>e.preventDefault()}>
  <div className="preview-toolbar">
   <div className="preview-pagination"><button type="button" className="icon-btn" aria-label="Previous preview page" disabled={page===1} onClick={()=>change(page-1)}><ChevronLeft size={19}/></button><label className="preview-page-label">Page <select aria-label="Preview page" value={page} onChange={e=>change(Number(e.target.value))}>{Array.from({length:pages},(_,i)=><option key={i+1}>{i+1}</option>)}</select> of {pages}</label><button type="button" className="icon-btn" aria-label="Next preview page" disabled={page===pages} onClick={()=>change(page+1)}><ChevronRight size={19}/></button></div>
   <div className="preview-zoom"><button type="button" className="icon-btn" aria-label="Zoom out preview" disabled={zoom===100} onClick={()=>setZoom(v=>v-25)}><ZoomOut size={18}/></button><span>{zoom}%</span><button type="button" className="icon-btn" aria-label="Zoom in preview" disabled={zoom===200} onClick={()=>setZoom(v=>v+25)}><ZoomIn size={18}/></button></div>
  </div>
  <div className="preview-canvas" onCopy={e=>e.preventDefault()}>
   {!loaded&&!failed&&<p className="preview-loading" role="status">Loading watermarked page...</p>}
   {failed?<p className="preview-loading" role="status">This page could not load. <button className="text-link" type="button" onClick={()=>{setFailed(false);setLoaded(false);}}>Try again</button></p>:<img key={page+'-'+failed} src={'/previews/'+slug+'/page-'+page+'.webp'} alt={title+' - watermarked preview page '+page+' of '+pages} width={width} height={height} style={{width:zoom+'%',maxWidth:'none'}} draggable={false} onLoad={()=>setLoaded(true)} onError={()=>setFailed(true)}/>}
  </div>
  <p className="preview-caption" aria-live="polite">Page {page} of {pages}. Watermarked reference preview.</p>
 </section>;
}
