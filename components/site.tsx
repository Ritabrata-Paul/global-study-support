'use client';
import Photo from '@/components/photo';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {ArrowUpRight,ArrowRight,Menu,X,Globe2,Check,Code2,Cog,Building2,ChartNoAxesCombined,ChevronDown} from 'lucide-react';
import {services,samples} from '@/lib/data';
import ThemeToggle from './theme-toggle';
import {contactEmail} from '@/lib/config';
export const Arrow=ArrowUpRight;
const nav=[['Home','/'],['About','/about/'],['Services','/services/'],['All Software','/software/'],['Samples','/samples/'],['How It Works','/how-it-works/'],['Pricing','/pricing/']];
export function Brand(){return <Link href="/" className="brand" aria-label="Global Study Support home"><span className="brand-logo"><img src="/brandmark.webp" alt="" width={48} height={42}/></span><span>Global Study<span className="brand-sub">SUPPORT</span></span></Link>}
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if(e.key === 'Escape') { setOpen(false); document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus(); } };
    document.addEventListener('keydown',close);
    return () => document.removeEventListener('keydown',close);
  },[open]);

  return <header className="site-header">
    <div className="nav-wrap">
      <Brand />
      <nav className={open ? 'main-nav is-open' : 'main-nav'} id="primary-navigation" aria-label="Main navigation">
        {nav.map(([label, href]) => <Link key={href} href={href} aria-current={path === href || href !== '/' && path.startsWith(href) ? 'page' : undefined} className={path === href || href !== '/' && path.startsWith(href) ? 'active' : ''}>{label}</Link>)}
        <Link href="/contact/" className={'mobile-contact '+(path==='/contact/'?'active':'')} aria-current={path==='/contact/'?'page':undefined}>Contact</Link>
      </nav>
      <div className="nav-actions">
        <ThemeToggle />
        <Link className="button small nav-contact" href="/contact/" aria-current={path==='/contact/'?'page':undefined}>Let's Talk <ArrowUpRight size={15}/></Link>
        <button className="icon-btn menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>
  </header>;
}
export function Footer(){return <footer><div className="container footer-grid"><div><Brand/><p>Clear guidance. Practical solutions.<br/>A world of possibilities.</p><div className="global-note"><Globe2 size={15}/> Supporting ambition, worldwide.</div><a className="footer-email" href={'mailto:'+contactEmail}>{contactEmail}</a></div><div><h4>Explore</h4><Link href="/about/">About us</Link><Link href="/services/">Our services</Link><Link href="/software/">Software directory</Link><Link href="/samples/">Work samples</Link></div><div><h4>Get started</h4><Link href="/how-it-works/">How it works</Link><Link href="/pricing/">Pricing & plans</Link><Link href="/faq/">Frequently asked questions</Link><Link href="/contact/">Contact us</Link></div><div className="footer-last"><h4>Learn with integrity.</h4><p>Support that builds your understanding and respects academic and professional standards.</p><Link className="text-link" href="/academic-integrity/">Our commitment <ArrowUpRight size={14}/></Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Global Study Support</span><div><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms of service</Link><Link href="/image-credits/">Image credits</Link></div></div></footer>}
export function Icon({name,size=22}:{name:string,size?:number}){const I=name==='code'?Code2:name==='cog'?Cog:name==='building'?Building2:ChartNoAxesCombined;return <I size={size}/>}
export function ServiceCards(){return <div className="service-grid">{services.map((s,i)=><Link key={s.slug} href={'/services/'+s.slug+'/'} className="service-card"><div className="service-image"><Photo name={s.image} alt={s.title+' workspace'}/><span className="image-number">0{i+1}</span></div><div className="service-body"><span className={'service-icon tone-'+i}><Icon name={s.icon}/></span><h3>{s.short}</h3><p>{s.tags.join(', ')}</p><span className="card-link">Explore expertise <ArrowUpRight size={17}/></span></div></Link>)}</div>}
export function SampleCards({items=samples.slice(0,3)}:{items?:typeof samples}){return <div className="samples-grid">{items.map((s,i)=><Link href={'/samples/'+s.slug+'/'} className="sample-card" key={s.slug}><div className={'sample-cover cover-'+i}>{s.kind==='owner-supplied'?<img src={'/previews/'+s.slug+'/page-1.webp'} alt={s.title+' report preview'} width={1080} height={1528} loading="lazy"/>:s.slug==='financial-dashboard'?<Dashboard/>:s.slug==='python-data-analysis'?<CodePreview/>:<Photo name={s.image} alt={'Illustrative '+s.category+' photograph'}/>}<span className="sample-label">{s.kind==='owner-supplied'?'OWNER-SUPPLIED REFERENCE':'DEMONSTRATION'}</span><span className="sample-open"><ArrowUpRight size={19}/></span></div><div className="sample-body"><span className="eyebrow">{s.category}</span><h3>{s.title}</h3><p>{s.type}</p><div className="tags">{s.tools.map(t=><span key={t}>{t}</span>)}</div></div></Link>)}</div>}
export function CodePreview(){return <div className="code-window"><div className="window-top"><i/><i/><i/><span>sales_analysis.py</span></div><div className="code-content"><p><b>import</b> pandas <b>as</b> pd</p><p><b>import</b> matplotlib.pyplot <b>as</b> plt</p><br/><p className="comment"># Turn data into understanding</p><p>sales = pd.read_csv(<em>'sales.csv'</em>)</p><p>summary = sales.groupby(<em>'region'</em>)</p><p>&nbsp; .revenue.sum()</p><br/><p>summary.plot(kind=<em>'bar'</em>)</p></div><div className="mini-bars">{[40,66,48,88,72,95,63,83].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div></div>}
export function Dashboard(){return <div className="dashboard-preview"><div className="dash-header">Financial overview <span>FY 2025 · DEMO</span></div><div className="dash-stats"><div><small>REVENUE</small><b>£128,000</b><em>Synthetic dataset</em></div><div><small>GROSS MARGIN</small><b>37.8%</b><em>Illustrative reporting</em></div></div><div className="dash-chart"><span>Monthly performance</span><div>{[40,52,45,64,59,72,67,78,71,85,80,96].map((h,i)=><div key={i}><i style={{height:h+'%'}}/><i style={{height:h*.62+'%'}}/></div>)}</div><small>JAN &nbsp; FEB &nbsp; MAR &nbsp; APR &nbsp; MAY &nbsp; JUN &nbsp; JUL &nbsp; AUG &nbsp; SEP &nbsp; OCT &nbsp; NOV &nbsp; DEC</small></div></div>}
export function CTA(){return <section className="container cta-section"><div><span className="eyebrow">YOUR NEXT STEP STARTS HERE</span><h2>A challenge in mind?<br/>Let’s work through it.</h2><p>Share your goals. We’ll help you find a clear way forward.</p></div><Link href="/contact/" className="button">Tell us what you need <ArrowUpRight size={18}/></Link><span className="cta-orbit" aria-hidden="true"/></section>}
export function PageIntro({eyebrow,title,description}:{eyebrow:string,title:string,description:string}){return <section className="page-intro container"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span>{eyebrow}</div><span className="eyebrow"><i className="tiny-line"/>{eyebrow}</span><h1>{title}</h1><p>{description}</p></section>}
export function FAQ({items}:{items:string[][]}){return <div className="faq-list">{items.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div>}
