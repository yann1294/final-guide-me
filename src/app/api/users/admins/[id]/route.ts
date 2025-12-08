import { handlePATCHProfile } from "@/lib/utils/apiHandler";

export async function PATCH(req: Request, { params }: any) {
  console.log(`Proxying PROFILE-PATCH for guides ${params.id}`);
  return await handlePATCHProfile(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
    req,
  );
}
