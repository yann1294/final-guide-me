import { handleGET, handlePATCH } from "@/lib/utils/apiHandler";

export async function GET(req: Request, { params }: any) {
  return await handleGET(`${process.env.NEXT_PUBLIC_BACKEND_URL}/guides/${params.id}`);
}

export async function PATCH(req: Request, { params }: any) {
  console.log(`API route:/admin/guides/approve/:uid`, params);
  let body: any = await req.json();
  if (body['approvalStatus'] === 'approved') {
    return await handlePATCH(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/guides/approve/${params.id}`, req, "");
  } else {
    return await handlePATCH(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/guides/reject/${params.id}`, req, "");
  }
}