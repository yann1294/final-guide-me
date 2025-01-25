import { ResponseDTO } from "@/dto/helper.dto";
import { handleGET } from "@/lib/utils/apiHandler";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  return await handleGET(`${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/${ params.id }`);
}