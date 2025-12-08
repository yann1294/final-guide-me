import { handleGET } from "@/lib/utils/apiHandler";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return await handleGET(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${id}`);
}
