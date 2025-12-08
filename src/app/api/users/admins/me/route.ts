import { handleGET } from "@/lib/utils/apiHandler";

export async function GET(req: Request, { params }: any) {
  return await handleGET(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${params.id}`,
  );
}
