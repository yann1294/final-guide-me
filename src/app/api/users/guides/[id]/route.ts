import {
  handleGET,
  handlePATCH,
  handlePATCHProfile,
} from "@/lib/utils/apiHandler";

export async function GET(req: Request, { params }: any) {
  return await handleGET(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/guides/${params.id}`,
  );
}

export async function PATCH(req: Request, { params }: any) {
  console.log(`Proxying PROFILE-PATCH for tourists ${params.id}`);
  return await handlePATCHProfile(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
    req,
  );
}
