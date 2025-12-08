import { handleGET, handlePATCH } from "@/lib/utils/apiHandler";

export async function GET(req: Request, { params }: any) {
  // Log entry into the API
  return await handleGET(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/${params.id}/tours`,
  );
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  // Backend URL:  http://localhost:8000/packages/{id}/tours
  // (NEXT_PUBLIC_BACKEND_URL is already http://localhost:8000)
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/${params.id}/tours`;

  // Delegate the heavy lifting to the shared proxy helper
  return handlePATCH(url, req);
}
