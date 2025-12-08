import { handlePATCHProfile } from "@/lib/utils/apiHandler";

// export async function PATCH(req: Request, { params }: any) {
//   console.log(`Proxying PROFILE-PATCH for guides ${params.id}`);
//   return await handlePATCHProfile(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
//     req,
//   );
// }
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  console.log(`Proxying PROFILE-PATCH for admin ${params.id}`);

  return handlePATCHProfile(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${params.id}`,
    req,
  );
}
