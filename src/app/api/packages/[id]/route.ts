import { ResponseDTO } from "@/dto/helper.dto";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  
  try {
    // Send a GET request to the backend API to get all packages
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/${ params.id }`);

    // If the response from the backend is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch packages");
    }

    // Parse the response data from the backend
    const data = await response.json();

    // Return the parsed data in the Next.js response
    return NextResponse.json(data);
  } catch (error) {
    // Log the error to the console
    console.error(error);

    // Return an error response with status 500
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: error,
      data: null,
    } as ResponseDTO, { status: 500 });
  }
}