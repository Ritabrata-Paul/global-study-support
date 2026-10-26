import type { NextConfig } from 'next';
import {securityHeaders} from './server/security.mjs';
const exporting = process.env.GSS_EXPORT === 'true';
const config: NextConfig = {
  ...(exporting ? {output:'export',pageExtensions:['tsx']} : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
  poweredByHeader: false,
  turbopack: {root:process.cwd()},
  ...(!exporting ? {async headers(){return [{source:'/(.*)',headers:Object.entries(securityHeaders).filter(([key])=>process.env.NODE_ENV==='production'||key!=='Content-Security-Policy').map(([key,value])=>({key,value}))}];}} : {}),
};
export default config;
