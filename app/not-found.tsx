import Link from 'next/link';
export default function NotFound(){return <section className="container section"><span className="eyebrow">404 — PAGE NOT FOUND</span><h1 style={{margin:'20px 0'}}>Let’s find your way back.</h1><p>The page you’re looking for may have moved.</p><Link href="/" className="button" style={{marginTop:25}}>Back to home</Link></section>}
