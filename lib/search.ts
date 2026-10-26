type Searchable = {name?:string;title?:string;category:string;tools?:string[];description?:string};
export function filterDirectory<T extends Searchable>(items:readonly T[],query:string,category:string):T[] {
  const terms=query.trim().toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
  return items.filter(item=>(category==='All'||item.category===category)&&terms.every(term=>[item.name,item.title,item.category,item.description,...(item.tools||[])].filter(Boolean).join(' ').toLocaleLowerCase('en').includes(term)));
}
