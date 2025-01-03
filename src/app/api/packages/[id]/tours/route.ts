import { ResponseDTO } from "@/dto/helper.dto";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  // Log entry into the API
  console.log("API Entry: GET /packages/:id/tours", { method: req.method, params });

  try {
    // Send a GET request to the backend API to get all tours
    const response = await axios.get<ResponseDTO>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/${params.id}/tours`);
    
    if (response.data.status !== "success") {
      throw new Error("Failed to fetch tours");
    }

    // Return the parsed data in the Next.js response
    return NextResponse.json(response.data);
  } catch (error) {
    // Log the error to the console
    console.error("API Error:", error);

    // Return an error response with status 500
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: error,
      data: null,
    } as ResponseDTO, { status: 500 });
  }
}