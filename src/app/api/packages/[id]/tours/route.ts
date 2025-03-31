import { handleGET } from "@/lib/utils/apiHandler";

export async function GET(req: Request, { params }: any) {
  // Log entry into the API
  return await handleGET(`${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/${params.id}/tours`);
}