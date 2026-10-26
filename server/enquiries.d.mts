export function deliveryConfiguration(env: Record<string,string|undefined>): {available:boolean;attachmentsAllowed:boolean;siteKey:string};
export function handleEnquiry(request:Request,env?:Record<string,string|undefined>,deps?:Record<string,unknown>):Promise<Response>;
