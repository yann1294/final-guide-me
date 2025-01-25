import { ResponseDTO } from "@/dto/helper.dto";
import { handleDELETE, handleGET, handlePATCH } from "@/lib/utils/apiHandler";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  return await handleGET(`${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/${params.id}`);
}

export async function PATCH(req: Request) {
  let body: any = await req.json();
  console.log(body);
  return await handlePATCH(`${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/${body['id']}/tours`, req, JSON.stringify(body));
}

export async function DELETE(req: Request, { params }: any) {
  return await handleDELETE(`${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/${params.id}`)
}