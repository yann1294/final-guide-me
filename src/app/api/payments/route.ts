import { handlePOST } from "@/lib/utils/apiHandler";

export async function POST(req: Request) {
  return await handlePOST(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments`, req);
}