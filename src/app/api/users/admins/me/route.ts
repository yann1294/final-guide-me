import { handleGET, handlePATCHProfile } from "@/lib/utils/apiHandler";

// GET current admin profile
export async function GET() {
  return handleGET(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`);
}

// PATCH current admin profile
export async function PATCH(req: Request) {
  console.log("Proxying PROFILE-PATCH for admin me");
  return handlePATCHProfile(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
    req,
  );
}
