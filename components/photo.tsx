export default function Photo({name,alt,className,priority=false}:{name:string;alt:string;className?:string;priority?:boolean}) {
  const height=name==='finance'?934:name==='it'?930:933;
  return <img className={className} src={'/images/'+name+'.webp'} srcSet={'/images/'+name+'-small.webp 640w, /images/'+name+'.webp 1280w'} sizes="(max-width:600px) 100vw, (max-width:850px) 50vw, 600px" width={1400} height={height} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async"/>;
}
