import { handleDELETE, handleGET, handlePATCH } from "@/lib/utils/apiHandler";

export async function GET(req: Request, { params }: any) {
  return await handleGET(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/${params.id}`,
  );
}

export async function DELETE(req: Request, { params }: any) {
  return await handleDELETE(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/${params.id}`,
  );
}

// export async function PATCH(req: Request) {
//   let body: any = await req.json();
//   return await handlePATCH(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/${body['id']}`, req);
// }

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  console.log(`Proxying TOUR‐PATCH for tour ${params.id}`);
  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/${params.id}`;
  return await handlePATCH(backendUrl, req);
}
