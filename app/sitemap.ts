import {siteUrl} from '@/lib/config';
import type {MetadataRoute} from 'next';
import {services,software,samples} from '@/lib/data';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{const origin=siteUrl;return ['/','/about/','/services/','/software/','/samples/','/how-it-works/','/pricing/','/contact/','/faq/','/privacy/','/terms/','/academic-integrity/','/image-credits/',...services.map(s=>'/services/'+s.slug+'/'),...software.map(s=>'/software/'+s.slug+'/'),...samples.map(s=>'/samples/'+s.slug+'/')].map(path=>({url:origin+path}))}
