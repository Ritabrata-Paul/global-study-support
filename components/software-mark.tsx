const logos: Record<string,string> = {python:'/software-logos/python.svg',react:'/software-logos/react.svg'};

export default function SoftwareMark({name,mark,slug}:{name:string;mark:string;slug:string}) {
  return <span className={'tool-mark tool-'+mark} aria-hidden="true">{logos[slug]?<img src={logos[slug]} alt="" width={32} height={32}/>:<span title={name}>{mark}</span>}</span>;
}
