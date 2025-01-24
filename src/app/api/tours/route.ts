import { handlePOST, handleGET } from "@/lib/utils/apiHandler";

const tourURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours`;

// handles get request to fetch all tours
export async function GET(req: Request) {
    return await handleGET(tourURL);
}

// handles post request to create a tour
export async function POST(req: Request) {
    return await handlePOST(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tours`, req);
}
  