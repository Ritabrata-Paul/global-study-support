import {writeFileSync} from 'node:fs';
import {services} from '../lib/data';
import {publishedOfferings,categoryAliases} from '../lib/service-catalog';
import {referenceStyles} from '../lib/academic';
const options={categories:services.map(s=>s.title),aliases:categoryAliases,services:publishedOfferings.map(s=>({slug:s.slug,title:s.title,category:s.category})),contexts:['Academic learning','Research','Professional'],referenceStyles:referenceStyles.map(s=>s.name).concat(['Other / institutional guide'])};
writeFileSync('lib/enquiry-options.json',JSON.stringify(options,null,2)+'\n');
console.log('Synced enquiry categories, services and reference styles from TypeScript catalogue.');
