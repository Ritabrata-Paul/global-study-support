import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site';
import './fonts.css';
import './globals.css';
import {siteUrl} from '@/lib/config';
export const metadata: Metadata = {metadataBase:new URL(siteUrl),title:{default:'Global Study Support | Your Growth. Our Expertise.',template:'%s | Global Study Support'},alternates:{canonical:'/'},icons:{icon:'/favicon.png',apple:'/favicon.png'},openGraph:{type:'website',siteName:'Global Study Support',locale:'en_GB'},description:'Practical academic and professional guidance in IT, mechanical engineering, civil engineering, finance and data analytics.'};
const themeScript = `(function(){try{var t=localStorage.getItem('gss-theme');if(t!=='dark'&&t!=='system')t='light';document.documentElement.dataset.theme=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t}catch(e){}})()`;
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/><link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/jakarta-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html>}
