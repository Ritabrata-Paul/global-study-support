import {handleEnquiry} from '@/server/enquiries.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export function GET(request: Request) {return handleEnquiry(request, process.env);}
export function POST(request: Request) {return handleEnquiry(request, process.env);}
