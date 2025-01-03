import { ResponseDTO } from "@/dto/helper.dto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("API Entry: POST /payments", { method: req.method });
  try {
    // Parse the incoming request body as JSON
    const request = await req.json();

    // Send a POST request to the backend API to create a new booking
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    // If the response from the backend is not OK, throw an error
    if (!response.ok) {
      console.log(await response.json())
      throw new Error("Failed to create stripe order");
    }

    // Parse the response data from the backend
    const data = await response.json();

    // Return the parsed data in the Next.js response
    return NextResponse.json(data as ResponseDTO);
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