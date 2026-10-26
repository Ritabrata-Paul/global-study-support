type Searchable = {name?:string;title?:string;category:string;categories?:string[];tools?:string[];topics?:string[];description?:string};
export function filterDirectory<T extends Searchable>(items:readonly T[],query:string,category:string):T[] {
  const terms=query.trim().toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
  return items.filter(item=>(category==='All'||item.category===category||item.categories?.includes(category))&&terms.every(term=>[item.name,item.title,item.category,item.description,...(item.categories||[]),...(item.tools||[]),...(item.topics||[])].filter(Boolean).join(' ').toLocaleLowerCase('en').includes(term)));
}
